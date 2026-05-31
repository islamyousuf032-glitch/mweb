import React from 'react';

const SETS = {
  default: ['NO CHAINS', 'NO LIMITS', 'NO FEAR', 'YOUSUF UNBOUND', 'ENTER THE EMPIRE'],
  gold: ['CINEMA', 'AI', 'SOUND', 'GAMES', 'ART', 'DARKNESS', 'ONE EMPIRE'],
};

export default function Marquee({ variant = 'default', reverse = false }) {
  const words = SETS[variant] || SETS.default;
  const item = (
    <span>
      {words.map((w, i) => (
        <React.Fragment key={i}>{w} <b>•</b> </React.Fragment>
      ))}
    </span>
  );
  const cls = `eu-marquee ${variant === 'gold' ? 'alt' : ''} ${reverse ? 'reverse' : ''}`;
  return (
    <div className={cls} aria-hidden="true">
      <div className="track">{item}{item}{item}{item}</div>
    </div>
  );
}
