import React, { useEffect } from 'react';
import { Icon } from '../icons.jsx';

export default function Lightbox({ item, onClose, onNav }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNav?.(1);
      if (e.key === 'ArrowLeft') onNav?.(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, onNav]);

  if (!item) return null;
  return (
    <div className="eu-lightbox" onClick={onClose}>
      <div className="eu-lightbox-card" onClick={(e) => e.stopPropagation()}>
        <button className="eu-lightbox-close" data-cursor="button" onClick={onClose} aria-label="Close"><Icon name="close" width="18" height="18" /></button>
        <div className="eu-lightbox-visual">{item.title}</div>
        {onNav && (
          <div className="eu-lightbox-arrows">
            <button data-cursor="button" onClick={() => onNav(-1)} aria-label="Previous"><Icon name="arrow" width="18" height="18" style={{ transform: 'rotate(180deg)' }} /></button>
            <button data-cursor="button" onClick={() => onNav(1)} aria-label="Next"><Icon name="arrow" width="18" height="18" /></button>
          </div>
        )}
        <div className="eu-lightbox-body">
          <div className="lb-cat">{item.cat}{item.type ? ' · ' + item.type : ''}</div>
          <div className="lb-title">{item.title}</div>
          <div className="lb-desc">{item.desc}</div>
          <div style={{ marginTop: 18 }}><button className="eu-btn primary" data-cursor="button">Open Full Page</button></div>
        </div>
      </div>
    </div>
  );
}
