/**
 * Tactile Haptic Feedback Utility for Native-Feel Touch Interactions
 * Uses Web Vibration API safely with automatic fallback
 */

export function triggerHaptic(type: 'selection' | 'light' | 'medium' | 'heavy' | 'success' | 'warning' = 'light') {
  if (typeof window === 'undefined' || !('vibrate' in navigator)) return
  try {
    switch (type) {
      case 'selection':
        navigator.vibrate(8)
        break
      case 'light':
        navigator.vibrate(12)
        break
      case 'medium':
        navigator.vibrate(22)
        break
      case 'heavy':
        navigator.vibrate(40)
        break
      case 'success':
        navigator.vibrate([15, 40, 20])
        break
      case 'warning':
        navigator.vibrate([30, 50, 30])
        break
    }
  } catch {
    // Non-vibrating devices or disabled permissions
  }
}
