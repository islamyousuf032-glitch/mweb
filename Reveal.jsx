import React from 'react';
import { useReveal } from '../hooks.js';

export function Reveal({ children, dir = '', as: Tag = 'div', className = '', delay = 0, ...rest }) {
  const [ref, shown] = useReveal();
  return (
    <Tag
      ref={ref}
      className={`reveal ${dir} ${shown ? 'in' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export function SectionHeader({ kicker, title, sub }) {
  return (
    <Reveal>
      {kicker && <span className="eu-kicker">{kicker}</span>}
      <h2 className="eu-h2 glitch-on-hover">{title}</h2>
      {sub && <p className="eu-sub">{sub}</p>}
    </Reveal>
  );
}
