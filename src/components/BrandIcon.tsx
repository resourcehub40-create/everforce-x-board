type Brand = "figma" | "figjam" | "gdocs" | "gsheets" | "github" | "slack" | "mobbin" | "audit" | "link";

export default function BrandIcon({ brand, className = "w-5 h-5" }: { brand: Brand; className?: string }) {
  switch (brand) {
    case "figma":
      return (
        <svg viewBox="0 0 38 57" className={className} aria-hidden>
          <path fill="#1ABCFE" d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0Z"/>
          <path fill="#0ACF83" d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0Z"/>
          <path fill="#FF7262" d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19Z"/>
          <path fill="#F24E1E" d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5Z"/>
          <path fill="#A259FF" d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5Z"/>
        </svg>
      );
    case "figjam":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
          <rect width="24" height="24" rx="6" fill="#FFC700"/>
          <circle cx="8" cy="9" r="2" fill="#fff"/>
          <circle cx="16" cy="9" r="2" fill="#fff"/>
          <path d="M7 14c1 2 3 3 5 3s4-1 5-3" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" fill="none"/>
        </svg>
      );
    case "gdocs":
      return (
        <svg viewBox="0 0 24 32" className={className} aria-hidden>
          <path fill="#4285F4" d="M14 0H3a3 3 0 0 0-3 3v26a3 3 0 0 0 3 3h18a3 3 0 0 0 3-3V10L14 0Z"/>
          <path fill="#A1C2FA" d="M14 0v7a3 3 0 0 0 3 3h7L14 0Z"/>
          <path fill="#fff" d="M5 16h14v2H5zM5 20h14v2H5zM5 24h10v2H5z"/>
        </svg>
      );
    case "gsheets":
      return (
        <svg viewBox="0 0 24 32" className={className} aria-hidden>
          <path fill="#0F9D58" d="M14 0H3a3 3 0 0 0-3 3v26a3 3 0 0 0 3 3h18a3 3 0 0 0 3-3V10L14 0Z"/>
          <path fill="#87CEAC" d="M14 0v7a3 3 0 0 0 3 3h7L14 0Z"/>
          <path fill="#fff" d="M5 15h14v9H5v-9Zm1.5 1.5v2h4v-2h-4Zm5.5 0v2h5v-2h-5Zm-5.5 3.5v2h4v-2h-4Zm5.5 0v2h5v-2h-5Z"/>
        </svg>
      );
    case "github":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
          <path fill="#1A1325" fillRule="evenodd" clipRule="evenodd"
            d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.4.7-4.1-1.6-4.1-1.6-.5-1.4-1.3-1.8-1.3-1.8-1.1-.7.1-.7.1-.7 1.2 0 1.9 1.2 1.9 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.6-1.4-5.6-6.1 0-1.4.5-2.5 1.2-3.3-.1-.4-.6-1.6.1-3.3 0 0 1-.3 3.4 1.2a11.5 11.5 0 0 1 6.2 0c2.4-1.6 3.4-1.2 3.4-1.2.7 1.7.2 2.9.1 3.3.8.8 1.2 1.9 1.2 3.3 0 4.7-2.9 5.7-5.6 6 .4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3"/>
        </svg>
      );
    case "slack":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
          <path fill="#E01E5A" d="M5 15a2 2 0 1 0 2 2v-2H5Zm1 0a2 2 0 0 1 4 0v5a2 2 0 1 1-4 0v-5Z"/>
          <path fill="#36C5F0" d="M9 5a2 2 0 1 0-2 2h2V5Zm0 1a2 2 0 0 1 0 4H4a2 2 0 1 1 0-4h5Z"/>
          <path fill="#2EB67D" d="M19 9a2 2 0 1 0-2-2v2h2Zm-1 0a2 2 0 0 1-4 0V4a2 2 0 1 1 4 0v5Z"/>
          <path fill="#ECB22E" d="M15 19a2 2 0 1 0 2-2h-2v2Zm0-1a2 2 0 0 1 0-4h5a2 2 0 1 1 0 4h-5Z"/>
        </svg>
      );
    case "mobbin":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
          <rect width="24" height="24" rx="6" fill="#1A1325"/>
          <path fill="#fff" d="M6 8h2.5l1.5 4 1.5-4H14v8h-1.8v-5.2L10.5 16H9.5l-1.7-5.2V16H6V8Zm10 0h2v8h-2V8Z"/>
        </svg>
      );
    case "audit":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
          <rect width="24" height="24" rx="6" fill="#6F2DBD"/>
          <circle cx="11" cy="11" r="4.5" stroke="#fff" strokeWidth="1.6" fill="none"/>
          <path stroke="#fff" strokeWidth="1.8" strokeLinecap="round" d="m14.5 14.5 3.5 3.5"/>
        </svg>
      );
    case "link":
    default:
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden>
          <rect width="24" height="24" rx="6" fill="#E5E2EE"/>
          <path stroke="#6B6379" strokeWidth="1.6" strokeLinecap="round" fill="none"
            d="M10 14 14 10 M9.5 8.5l-2 2a2.8 2.8 0 1 0 4 4l1-1 M14.5 15.5l2-2a2.8 2.8 0 1 0-4-4l-1 1"/>
        </svg>
      );
  }
}
