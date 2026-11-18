import React from "react";

export function BehanceIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-label="Behance">
      <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-4.976 3-3.411 0-5.75-2.529-5.75-5.918 0-3.484 2.378-6.082 5.688-6.082 3.256 0 5.281 2.302 5.281 5.612 0 .546-.077 1.077-.14 1.388h-8.08c.077 1.761 1.455 2.875 3.125 2.875 1.541 0 2.455-.785 2.852-1.875h2zm-7.382-3.8h5.367c-.078-1.554-1.127-2.42-2.656-2.42-1.529 0-2.633.866-2.711 2.42zM8.172 11.082c1.237-.417 1.953-1.375 1.953-2.697 0-2.348-1.764-3.385-4.328-3.385H0v14h6.047c2.812 0 4.672-1.285 4.672-3.867 0-1.867-1.139-3.312-2.547-4.051zm-5.422-4.07h2.906c1.281 0 2.078.531 2.078 1.688 0 1.219-.891 1.797-2.141 1.797H2.75V7.012zm3.156 9.977H2.75v-4.188h3.156c1.453 0 2.391.688 2.391 2.062 0 1.422-.984 2.126-2.391 2.126z" />
    </svg>
  );
}

export function LinkedinIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-label="LinkedIn">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.79v8.37H6.46v-8.37M7.86 6.31a1.63 1.63 0 1 0 0 3.26 1.63 1.63 0 0 0 0-3.26z" />
    </svg>
  );
}

export function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-label="Instagram"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export function WhatsappIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-label="WhatsApp">
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24M8.53 7.33c-.16 0-.42.06-.64.3-.22.24-.85.83-.85 2.03 0 1.2.87 2.36 1 2.53.12.17 1.7 2.6 4.12 3.65.58.25 1.02.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.45-.59 1.65-1.17.2-.57.2-1.07.14-1.17-.06-.1-.22-.16-.47-.28-.24-.12-1.45-.72-1.68-.8-.22-.09-.39-.13-.55.12-.16.25-.63.8-.78.96-.14.16-.29.18-.54.06-.24-.12-1.04-.38-1.98-1.22-.73-.65-1.23-1.46-1.37-1.7-.14-.25-.01-.38.11-.5.11-.11.24-.29.37-.43.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.55-1.33-.76-1.82-.2-.48-.41-.42-.55-.43l-.47-.01z" />
    </svg>
  );
}

export interface SocialLinksProps {
  whatsappNumber?: string;
  instagram?: string;
  linkedin?: string;
  behance?: string;
  className?: string;
  iconClassName?: string;
  itemClassName?: string;
}

export default function SocialLinks({
  whatsappNumber = "201000000000",
  instagram = "https://instagram.com/alaaissa.interiors",
  linkedin = "https://linkedin.com/in/alaa-issa",
  behance = "https://behance.net/alaaissa",
  className = "flex items-center gap-3",
  iconClassName = "w-4 h-4",
  itemClassName = "w-9 h-9 rounded border border-neutral-300 hover:border-black flex items-center justify-center text-neutral-700 hover:text-black hover:bg-neutral-100 transition-colors",
}: SocialLinksProps) {
  const instagramUrl = instagram.startsWith("http")
    ? instagram
    : `https://instagram.com/${instagram.replace("@", "")}`;
  const linkedinUrl = linkedin.startsWith("http")
    ? linkedin
    : `https://linkedin.com/in/${linkedin.replace("@", "")}`;
  const behanceUrl = behance.startsWith("http")
    ? behance
    : `https://behance.net/${behance.replace("@", "")}`;
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;

  const links = [
    { name: "Behance", href: behanceUrl, icon: BehanceIcon },
    { name: "LinkedIn", href: linkedinUrl, icon: LinkedinIcon },
    { name: "Instagram", href: instagramUrl, icon: InstagramIcon },
    { name: "WhatsApp", href: whatsappUrl, icon: WhatsappIcon },
  ];

  return (
    <div className={className}>
      {links.map((link) => {
        const IconComponent = link.icon;
        return (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.name}
            title={link.name}
            className={itemClassName}
          >
            <IconComponent className={iconClassName} />
          </a>
        );
      })}
    </div>
  );
}
