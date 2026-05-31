import React, { useState } from 'react';
import { SectionHeader, Reveal } from './Reveal.jsx';
import { Audio } from '../audio.js';

export default function Join({ onSubmit }) {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (!email.includes('@')) return;
    setDone(true); Audio.sfx('granted'); onSubmit?.();
  };

  return (
    <section className="eu-section eu-join" id="join">
      <div className="wrap">
        <SectionHeader kicker="Join The Unbound Circle" title="Request Access"
          sub="Receive secret drops, cinematic updates, AI art releases and empire signals." />
        {!done ? (
          <Reveal>
            <form className="eu-join-form" onSubmit={submit}>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email..." data-cursor="text" required />
              <button className="eu-btn primary" data-cursor="button" type="submit">Request Access</button>
            </form>
          </Reveal>
        ) : (
          <div className="eu-join-ok">ACCESS REQUEST RECEIVED — WELCOME TO THE SHADOW LIST</div>
        )}
      </div>
    </section>
  );
}
