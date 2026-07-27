// Centralised line-icon set. Usage: <Icon name="search" />
// `name` matches the same icon vocabulary used throughout the app (search, pin, cal, star, ...).
const PATHS = {
  search: <><circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.6" y2="16.6" /></>,
  pin: <><path d="M12 21s7-6.3 7-12a7 7 0 1 0-14 0c0 5.7 7 12 7 12z" /><circle cx="12" cy="9" r="2.4" /></>,
  cal: <><rect x="3.5" y="5" width="17" height="16" rx="3" /><line x1="3.5" y1="9.5" x2="20.5" y2="9.5" /><line x1="8" y1="2.5" x2="8" y2="6.5" /><line x1="16" y1="2.5" x2="16" y2="6.5" /></>,
  star: <path d="M12 3.2l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.1-5.4 3.1 1.3-6-4.6-4.1 6.1-.6z" />,
  ticket: <><path d="M3 9.5a2.5 2.5 0 0 1 0 5V17a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2.5a2.5 2.5 0 0 1 0-5V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z" /><line x1="13" y1="6" x2="13" y2="18" strokeDasharray="2 2" /></>,
  heart: <path d="M12 20.5s-8-5-8-11.2A4.8 4.8 0 0 1 12 6.3a4.8 4.8 0 0 1 8 3c0 6.2-8 11.2-8 11.2z" />,
  bell: <><path d="M6 9a6 6 0 1 1 12 0c0 4 1.5 5.5 1.5 6.5H4.5C4.5 14.5 6 13 6 9z" /><path d="M9.5 19a2.5 2.5 0 0 0 5 0" /></>,
  user: <><circle cx="12" cy="8" r="3.6" /><path d="M4.5 20c1-3.6 4-5.5 7.5-5.5s6.5 1.9 7.5 5.5" /></>,
  menu: <><line x1="4" y1="7" x2="20" y2="7" /><line x1="4" y1="12.5" x2="20" y2="12.5" /><line x1="4" y1="18" x2="20" y2="18" /></>,
  x: <><line x1="6" y1="6" x2="18" y2="18" /><line x1="18" y1="6" x2="6" y2="18" /></>,
  'chev-d': <polyline points="6 9 12 15 18 9" />,
  'chev-l': <polyline points="15 6 9 12 15 18" />,
  'chev-r': <polyline points="9 6 15 12 9 18" />,
  check: <polyline points="5 13 9.5 17.5 19 7" />,
  upload: <><path d="M12 16V4M8 8l4-4 4 4" /><path d="M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" /></>,
  download: <><path d="M12 4v12M8 12l4 4 4-4" /><path d="M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" /></>,
  edit: <><path d="M4 19.5l1-4 11-11 3 3-11 11-4 1z" /><line x1="14" y1="6.5" x2="17.5" y2="10" /></>,
  trash: <path d="M5 7h14M9 7V5a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 5v2m-8 0 1 12.5A1.5 1.5 0 0 0 9.5 21h5a1.5 1.5 0 0 0 1.5-1.5L17 7" />,
  plus: <><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></>,
  minus: <line x1="5" y1="12" x2="19" y2="12" />,
  grid: <><rect x="3.5" y="3.5" width="7" height="7" rx="1.5" /><rect x="13.5" y="3.5" width="7" height="7" rx="1.5" /><rect x="3.5" y="13.5" width="7" height="7" rx="1.5" /><rect x="13.5" y="13.5" width="7" height="7" rx="1.5" /></>,
  logout: <><path d="M9 19H5.5A1.5 1.5 0 0 1 4 17.5v-11A1.5 1.5 0 0 1 5.5 5H9" /><path d="M16 16l4-4-4-4M20 12H9" /></>,
  music: <><circle cx="6.5" cy="17.5" r="2.5" /><circle cx="17.5" cy="15.5" r="2.5" /><path d="M9 17.5V5l11-2v12.5" /></>,
  cpu: <><rect x="6.5" y="6.5" width="11" height="11" rx="2" /><rect x="10" y="10" width="4" height="4" /><line x1="6.5" y1="2.5" x2="6.5" y2="6.5" /><line x1="12" y1="1.5" x2="12" y2="6.5" /><line x1="17.5" y1="2.5" x2="17.5" y2="6.5" /><line x1="6.5" y1="17.5" x2="6.5" y2="21.5" /><line x1="12" y1="17.5" x2="12" y2="22.5" /><line x1="17.5" y1="17.5" x2="17.5" y2="21.5" /><line x1="2.5" y1="6.5" x2="6.5" y2="6.5" /><line x1="1.5" y1="12" x2="6.5" y2="12" /><line x1="2.5" y1="17.5" x2="6.5" y2="17.5" /><line x1="17.5" y1="6.5" x2="21.5" y2="6.5" /><line x1="17.5" y1="12" x2="22.5" y2="12" /><line x1="17.5" y1="17.5" x2="21.5" y2="17.5" /></>,
  briefcase: <><rect x="3" y="8" width="18" height="11" rx="2" /><path d="M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><line x1="3" y1="13" x2="21" y2="13" /></>,
  mic: <><path d="M9 5.5a3 3 0 0 1 6 0v6a3 3 0 0 1-6 0z" /><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21M9 21h6" /></>,
  image: <><rect x="3.5" y="4.5" width="17" height="15" rx="2.5" /><circle cx="9" cy="10" r="1.6" /><path d="M5 17l4.5-5 3.5 3.5 2.5-2.5 4 4" /></>,
  coffee: <><path d="M5 9h13v5a5 5 0 0 1-5 5H10a5 5 0 0 1-5-5z" /><path d="M18 10.5h1.5a2 2 0 1 1 0 4H18" /><path d="M8 4.5s-1 1-1 2 1 2 1 2M12 4.5s-1 1-1 2 1 2 1 2" /></>,
  leaf: <><path d="M5 19c-1-7 3-14 14-14 1 9-5 14-14 14z" /><line x1="5" y1="19" x2="14" y2="10" /></>,
  trophy: <><path d="M8 4.5h8v6a4 4 0 0 1-8 0z" /><path d="M8 6H5.5A2 2 0 0 0 5.5 10H8M16 6h2.5a2 2 0 0 1 0 4H16" /><line x1="12" y1="14.5" x2="12" y2="18" /><line x1="8.5" y1="20.5" x2="15.5" y2="20.5" /></>,
  mail: <><rect x="3.5" y="5.5" width="17" height="13" rx="2.5" /><path d="M4.5 7l7.5 6 7.5-6" /></>,
  phone: <path d="M6 4.5h3l1.5 4-2 2a11 11 0 0 0 5 5l2-2 4 1.5v3a1.5 1.5 0 0 1-1.6 1.5C11 19.7 4.3 13 4.5 6.1A1.5 1.5 0 0 1 6 4.5z" />,
  'arrow-r': <><line x1="4" y1="12" x2="20" y2="12" /><polyline points="14 6 20 12 14 18" /></>,
  clock: <><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></>,
  bookmark: <path d="M6 3.5h12v17l-6-4-6 4z" />,
  settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 13.5a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.9 2.9l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6V20a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.9-2.9l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.6-1H4a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.9-2.9l.1.1a1.7 1.7 0 0 0 1.9.3H10a1.7 1.7 0 0 0 1-1.6V4a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.9 2.9l-.1.1a1.7 1.7 0 0 0-.3 1.9V10a1.7 1.7 0 0 0 1.6 1H20a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.6 1z" /></>,
  analytics: <><path d="M4 20V10M11 20V4M18 20v-7" /><line x1="2.5" y1="20" x2="21.5" y2="20" /></>,
  users: <><circle cx="9" cy="8" r="3.3" /><path d="M3 19c.7-3.3 3-5 6-5s5.3 1.7 6 5" /><circle cx="17.5" cy="9" r="2.6" /><path d="M15.5 14.2c2.3.3 4 1.7 4.5 4.3" /></>,
  rupee: <path d="M6 4.5h12M6 9h12M6 4.5c4 0 6 1.5 6 4.5s-2 4.5-6 4.5h-1L16 19.5" />,
};

export default function Icon({ name, className, style, filled = false }) {
  const content = PATHS[name];
  if (!content) return null;
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {content}
    </svg>
  );
}
