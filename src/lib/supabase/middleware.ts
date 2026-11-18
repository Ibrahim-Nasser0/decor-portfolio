import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

const TOKEN_COOKIE_REGEX = /^sb-[a-zA-Z0-9_-]+-auth-token(?:\.(\d+))?$/

function decodeBase64URL(str: string): string {
  try {
    if (typeof Buffer !== 'undefined') {
      return Buffer.from(str, 'base64url').toString('utf-8')
    }
    let base64 = str.replace(/-/g, '+').replace(/_/g, '/')
    while (base64.length % 4 !== 0) {
      base64 += '='
    }
    if (typeof atob === 'function') {
      return decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      )
    }
  } catch {
    // ignore
  }
  return ''
}

// Fast local validation of Supabase session JWT to avoid network roundtrips on every click (< 1ms)
function isSessionLocallyValid(allCookies: { name: string; value: string }[]): boolean {
  try {
    const authCookies = allCookies
      .filter((c) => TOKEN_COOKIE_REGEX.test(c.name))
      .sort((a, b) => {
        const idxA = parseInt(a.name.match(TOKEN_COOKIE_REGEX)?.[1] || '0', 10)
        const idxB = parseInt(b.name.match(TOKEN_COOKIE_REGEX)?.[1] || '0', 10)
        return idxA - idxB
      })

    if (authCookies.length === 0) return false

    let rawValue = authCookies.map((c) => c.value).join('')
    if (rawValue.startsWith('base64-')) {
      rawValue = decodeBase64URL(rawValue.slice(7))
    } else if (rawValue.startsWith('%7B')) {
      rawValue = decodeURIComponent(rawValue)
    }

    let parsed: any = null
    try {
      parsed = JSON.parse(rawValue)
    } catch {
      return false
    }

    if (!parsed) return false

    // 1. Direct check: parsed.expires_at (Unix timestamp in seconds)
    if (typeof parsed.expires_at === 'number' && parsed.expires_at * 1000 > Date.now() + 60000) {
      return true
    }

    // 2. Fallback check: extract access_token and decode JWT exp
    let token = ''
    if (Array.isArray(parsed) && parsed[0]) {
      token = parsed[0]
    } else if (typeof parsed.access_token === 'string') {
      token = parsed.access_token
    }

    if (!token || !token.includes('.')) return false

    const parts = token.split('.')
    if (parts.length < 2) return false

    const payloadStr = decodeBase64URL(parts[1])
    if (!payloadStr) return false

    const payload = JSON.parse(payloadStr)
    if (payload.exp && payload.exp * 1000 > Date.now() + 60000) {
      return true
    }
  } catch {
    // Fall back to remote validation on error
  }
  return false
}

export async function updateSession(request: NextRequest) {
  try {
    const pathname = request.nextUrl.pathname

    // 1. Fast-path: Only /admin routes require authentication
    if (!pathname.startsWith('/admin')) {
      return NextResponse.next({ request })
    }

    // 2. Fast-path: Check for Supabase session cookies before doing any network calls
    const allCookies = request.cookies.getAll()
    const hasAuthCookie = allCookies.some((c) => TOKEN_COOKIE_REGEX.test(c.name))

    // If visiting /admin/login without cookies, allow immediate access with 0ms network latency
    if (pathname === '/admin/login' && !hasAuthCookie) {
      return NextResponse.next({ request })
    }

    // If trying to access protected /admin without cookies, immediately redirect to /admin/login
    if (pathname !== '/admin/login' && !hasAuthCookie) {
      const loginUrl = request.nextUrl.clone()
      loginUrl.pathname = '/admin/login'
      return NextResponse.redirect(loginUrl)
    }

    // 3. Ultra fast-path: If the JWT is valid locally, bypass remote network call completely (< 1ms!)
    if (isSessionLocallyValid(allCookies)) {
      if (pathname === '/admin/login') {
        const url = request.nextUrl.clone()
        url.pathname = '/admin'
        return NextResponse.redirect(url)
      }
      return NextResponse.next({ request })
    }

    // 4. Token needs refresh or validation: run remote check
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://doagrgbkcmftsxzckimk.supabase.co'
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable__gAlNoRbvX6VIjNvsfx_-A_ReBjh1Q7'

    let supabaseResponse = NextResponse.next({
      request,
    })

    const supabase = createServerClient(
      supabaseUrl,
      supabaseAnonKey,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value)
            )
            supabaseResponse = NextResponse.next({
              request,
            })
            cookiesToSet.forEach(({ name, value, options }) =>
              supabaseResponse.cookies.set(name, value, options)
            )
          },
        },
      }
    )

    const {
      data: { user },
    } = await supabase.auth.getUser()

    // Guard /admin routes (except /admin/login)
    if (pathname !== '/admin/login') {
      if (!user) {
        const url = request.nextUrl.clone()
        url.pathname = '/admin/login'
        return NextResponse.redirect(url)
      }
    }

    // If already logged in and visiting /admin/login, redirect to /admin
    if (pathname === '/admin/login' && user) {
      const url = request.nextUrl.clone()
      url.pathname = '/admin'
      return NextResponse.redirect(url)
    }

    return supabaseResponse
  } catch (err) {
    console.error('Unhandled session update error:', err)
    // Never throw a 500; gracefully redirect unauthenticated visitors to login
    if (request.nextUrl.pathname.startsWith('/admin') && request.nextUrl.pathname !== '/admin/login') {
      const url = request.nextUrl.clone()
      url.pathname = '/admin/login'
      return NextResponse.redirect(url)
    }
    return NextResponse.next({ request })
  }
}
