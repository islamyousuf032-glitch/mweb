import React, { useRef, useCallback } from 'react';
import { Audio } from '../audio.js';

// A button that magnetically pulls toward the cursor (desktop only).
// Uses pointer offset math; gracefully no-ops on touch devices.
export default function MagneticButton({ children, className = '', strength = 0.35, sound = 'click', onClick, ...rest }) {
  const ref = useRef(null);

  const onMove = useCallback((e) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
  }, [strength]);

  const onLeave = useCallback(() => {
    const el = ref.current; if (el) el.style.transform = '';
  }, []);

  return (
    <button
      ref={ref}
      className={`eu-btn eu-magnetic ${className}`}
      data-cursor="button"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={(e) => { if (sound) Audio.sfx(sound); onClick?.(e); }}
      {...rest}
    >
      <span className="mag-inner">{children}</span>
    </button>
  );
}
