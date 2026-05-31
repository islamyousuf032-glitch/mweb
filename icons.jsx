// Inline SVG icons — no external assets, so they render inside the sandbox.
import React from 'react';

const wrap = (children, props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
       strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
    {children}
  </svg>
);

export const Icon = ({ name, ...props }) => {
  switch (name) {
    case 'film':  return wrap(<><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 4v16M17 4v16M3 9h4M3 15h4M17 9h4M17 15h4"/></>, props);
    case 'frame': return wrap(<><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-5-5L5 21"/></>, props);
    case 'wave':  return wrap(<><path d="M3 12h2l2-7 4 16 3-11 2 4h5"/></>, props);
    case 'spark': return wrap(<><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18"/><circle cx="12" cy="12" r="2.5"/></>, props);
    case 'game':  return wrap(<><rect x="2" y="7" width="20" height="11" rx="4"/><path d="M7 11v3M5.5 12.5h3M15.5 12h.01M18 14h.01"/></>, props);
    case 'tag':   return wrap(<><path d="M3 7v5l9 9 7-7-9-9H4z"/><circle cx="7" cy="11" r="1.2"/></>, props);
    case 'grid':  return wrap(<><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>, props);
    case 'crown': return wrap(<><path d="M3 7l4 4 5-6 5 6 4-4v11H3z"/><path d="M3 21h18"/></>, props);
    case 'search':return wrap(<><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></>, props);
    case 'sound': return wrap(<><path d="M4 9v6h4l5 4V5L8 9z"/><path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8 8 0 0 1 0 12"/></>, props);
    case 'mute':  return wrap(<><path d="M4 9v6h4l5 4V5L8 9z"/><path d="m17 9 4 6M21 9l-4 6"/></>, props);
    case 'cursor':return wrap(<><path d="M5 3l14 7-6 2-2 6z"/></>, props);
    case 'close': return wrap(<><path d="M6 6l12 12M18 6 6 18"/></>, props);
    case 'arrow': return wrap(<><path d="M5 12h14M13 6l6 6-6 6"/></>, props);
    case 'bolt':  return wrap(<><path d="M13 2 4 14h7l-1 8 9-12h-7z"/></>, props);
    default: return null;
  }
};
