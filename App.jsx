import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ToastProvider, useToast } from './components/Toasts.jsx';
import AccessGate from './components/AccessGate.jsx';
import Loader from './components/Loader.jsx';
import Background from './components/Background.jsx';
import Cursor from './components/Cursor.jsx';
import CommandVault from './components/CommandVault.jsx';
import Hero from './components/Hero.jsx';
import Marquee from './components/Marquee.jsx';
import Realms from './components/Realms.jsx';
import Trending from './components/Trending.jsx';
import Slider from './components/Slider.jsx';
import Drops from './components/Drops.jsx';
import Recommendations from './components/Recommendations.jsx';
import EmpireMap from './components/EmpireMap.jsx';
import Feed from './components/Feed.jsx';
import VisualWall from './components/VisualWall.jsx';
import ComingSoon from './components/ComingSoon.jsx';
import Console from './components/Console.jsx';
import Story from './components/Story.jsx';
import QuoteGen from './components/QuoteGen.jsx';
import Join from './components/Join.jsx';
import Footer from './components/Footer.jsx';
import Lightbox from './components/Lightbox.jsx';
import RealmPage from './components/RealmPage.jsx';
import Settings from './components/Settings.jsx';
import { FabControls, AuraIndicator, BladeProgress, AlertBanner, MobileBar, PageTransition } from './components/Controls.jsx';

import { REALMS, RANKS, RANK_LADDER } from './data.js';
import { Audio } from './audio.js';
import { getCore } from './wasm/core.js';
import { useScrollProgress, usePrefersReducedMotion } from './hooks.js';

const DEFAULT_SETTINGS = {
  music: false, sfx: true, volume: 70, cursor: true,
  deepNoir: false, immersive: false, reducedMotion: false,
};

function Experience() {
  const toast = useToast();

  const [stage, setStage] = useState('gate'); // gate -> loader -> live
  const [soundChosen, setSoundChosen] = useState(false);

  const [route, setRoute] = useState({ view: 'home', realm: null }); // home | realm
  const [vaultOpen, setVaultOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);

  const [auraLevel, setAuraLevel] = useState(1);
  const [lightbox, setLightbox] = useState(null);
  const [transition, setTransition] = useState(null); // {state,text}
  const [alert, setAlert] = useState(false);
  const [rankIdx, setRankIdx] = useState(0);
  const [kingMode, setKingMode] = useState(false);
  const [lightning, setLightning] = useState(false);
  const [backend, setBackend] = useState('js');

  const progress = useScrollProgress();
  const sysReduced = usePrefersReducedMotion();
  const reduced = sysReduced || settings.reducedMotion;

  // refs shared with rAF loops
  const progressRef = useRef(0);
  const auraGlowRef = useRef(0);
  const musicOnRef = useRef(false);
  const spotXRef = useRef(0.5);
  const spotYRef = useRef(0.3);
  const searchFocusRef = useRef(() => {});
  const logoClicks = useRef(0);
  const musicHoldTimer = useRef(null);
  const coreRef = useRef(null);

  const musicOn = settings.music;
  const cursorOn = settings.cursor;

  useEffect(() => { getCore().then((c) => { coreRef.current = c; setBackend(c.backend); }); }, []);
  useEffect(() => { musicOnRef.current = musicOn; }, [musicOn]);

  // ---- settings helper ----------------------------------------------------
  const set = useCallback((key, value) => {
    setSettings((s) => {
      const next = { ...s, [key]: value };
      // side effects
      if (key === 'music') { if (value) { Audio.startMusic(); toast('Music Enabled', 'sound'); } else { Audio.stopMusic(); toast('Music Off', 'mute'); } }
      if (key === 'sfx') { Audio.setSfxEnabled(value); toast(value ? 'SFX Enabled' : 'SFX Off', value ? 'sound' : 'mute'); }
      if (key === 'volume') { Audio.setMasterVolume(value / 100); }
      if (key === 'cursor') { toast(value ? 'Cursor Aura Activated' : 'Default Cursor', 'cursor'); }
      if (key === 'deepNoir') { document.body.classList.toggle('deep-noir', value); toast(value ? 'Deep Noir Mode' : 'Deep Noir Off', 'film'); }
      if (key === 'immersive') { document.body.classList.toggle('immersive', value); toast(value ? 'Immersive Mode' : 'Immersive Off', 'bolt'); }
      if (key === 'reducedMotion') { toast(value ? 'Reduced Motion On' : 'Reduced Motion Off', 'bolt'); }
      return next;
    });
  }, [toast]);

  // ---- aura level + glow from scroll --------------------------------------
  useEffect(() => {
    progressRef.current = progress;
    const core = coreRef.current;
    const lvl = core ? core.auraLevel(progress) : Math.min(5, 1 + Math.floor(progress * 4.999));
    const glow = core ? core.auraGlow(progress) : progress * progress;
    auraGlowRef.current = glow;
    document.documentElement.style.setProperty('--aura', String(lvl));
    document.documentElement.style.setProperty('--aura-glow', glow.toFixed(3));
    setAuraLevel((prev) => {
      if (lvl !== prev) {
        if (lvl > prev && stage === 'live' && route.view === 'home') { toast(`Aura Level Increased — ${lvl >= 5 ? 'UNBOUND' : lvl}`); Audio.sfx('section'); }
        return lvl;
      }
      return prev;
    });
  }, [progress, stage, route.view]); // eslint-disable-line

  // ---- visitor rank: random on entry, upgrades with depth -----------------
  const [rankName, setRankName] = useState(RANKS[0]);
  useEffect(() => {
    if (stage !== 'live') return;
    // assign a random starting rank once when entering
    const core = coreRef.current;
    const idx = core ? core.randRange(0, RANKS.length) : Math.floor(Math.random() * RANKS.length);
    setRankName(RANKS[idx]);
    toast(`Visitor Identified — ${RANKS[idx]}`, 'crown');
  }, [stage]); // eslint-disable-line

  useEffect(() => {
    if (stage !== 'live' || route.view !== 'home') return;
    const lp = Math.min(RANK_LADDER.length - 1, Math.floor(progress * RANK_LADDER.length));
    if (lp !== rankIdx) {
      setRankIdx(lp);
      if (lp > 0) { setRankName(RANK_LADDER[lp]); toast(`Rank Upgraded — ${RANK_LADDER[lp]}`, 'crown'); }
    }
  }, [progress, stage, route.view]); // eslint-disable-line

  // ---- midnight mode ------------------------------------------------------
  useEffect(() => {
    const h = new Date().getHours();
    if (h >= 0 && h < 5) document.documentElement.style.setProperty('--crimson', '#ff1a44');
  }, []);

  const scrollTo = useCallback((id) => {
    if (route.view !== 'home') { setRoute({ view: 'home', realm: null }); setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 700); return; }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  }, [reduced, route.view]);

  // ---- realm navigation with cinematic page transition --------------------
  const navigate = useCallback((realm) => {
    const r = typeof realm === 'string' ? REALMS.find((x) => x.id === realm) : realm;
    if (!r) return;
    setVaultOpen(false);
    Audio.sfx('whoosh');
    setTransition({ state: 'in', text: r.transition });
    setTimeout(() => {
      setRoute({ view: 'realm', realm: r });
      window.scrollTo(0, 0);
      window.dispatchEvent(new Event('scroll')); // resync progress for new page height
      setTransition({ state: 'out', text: r.transition });
      toast(`Realm Loaded — ${r.name}`, 'bolt');
      setTimeout(() => setTransition(null), 600);
    }, 1100);
  }, [toast]);

  const goHome = useCallback(() => {
    Audio.sfx('whoosh');
    setTransition({ state: 'in', text: 'RETURNING TO EMPIRE...' });
    setTimeout(() => {
      setRoute({ view: 'home', realm: null });
      window.scrollTo(0, 0);
      window.dispatchEvent(new Event('scroll')); // resync progress
      setTransition({ state: 'out', text: 'RETURNING TO EMPIRE...' });
      setTimeout(() => setTransition(null), 600);
    }, 900);
  }, []);

  // ---- music / cursor toggles (wired to settings) -------------------------
  const toggleMusic = useCallback(() => set('music', !settings.music), [set, settings.music]);
  const toggleCursor = useCallback(() => set('cursor', !settings.cursor), [set, settings.cursor]);

  // ---- easter eggs --------------------------------------------------------
  const onLogoClick = useCallback(() => {
    logoClicks.current++;
    if (route.view === 'home') scrollTo('top'); else goHome();
    if (logoClicks.current === 5) { toast('THE UNBOUND SEES YOU', 'bolt'); logoClicks.current = 0; }
  }, [scrollTo, toast, route.view, goHome]);

  const musicHoldStart = useCallback(() => {
    musicHoldTimer.current = setTimeout(() => { toast('Deep Cinema Mode', 'film'); set('deepNoir', true); Audio.sfx('granted'); }, 3000);
  }, [toast, set]);
  const musicHoldEnd = useCallback(() => { clearTimeout(musicHoldTimer.current); }, []);

  const triggerKing = useCallback(() => {
    setKingMode(true); Audio.sfx('granted');
    setTimeout(() => setKingMode(false), 2200);
  }, []);

  // ---- keyboard: konami + shortcuts ---------------------------------------
  useEffect(() => {
    const seq = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let pos = 0;
    const onKey = (e) => {
      if (document.activeElement?.tagName === 'INPUT') {
        if (e.key === 'Escape') document.activeElement.blur();
        return;
      }
      const k = e.key;
      if (k === seq[pos] || k.toLowerCase() === seq[pos]) {
        pos++;
        if (pos === seq.length) { pos = 0; setLightning(true); toast('Konami Unlocked — Secret Card', 'bolt'); setTimeout(() => setLightning(false), 600); }
      } else pos = 0;

      if (stage !== 'live') return;
      switch (k.toLowerCase()) {
        case 'm': toggleMusic(); break;
        case 'c': toggleCursor(); break;
        case 's': setSettingsOpen((o) => !o); break;
        case 'v': setVaultOpen((o) => !o); break;
        case 't': scrollTo('trending'); break;
        case 'd': scrollTo('drops'); break;
        case '/': e.preventDefault(); searchFocusRef.current(); break;
        case 'escape': setVaultOpen(false); setLightbox(null); setSettingsOpen(false); if (route.view === 'realm') goHome(); break;
        default: break;
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [stage, toggleMusic, toggleCursor, scrollTo, toast, route.view, goHome]);

  // ---- red alert banner ---------------------------------------------------
  useEffect(() => {
    if (stage !== 'live') return;
    const t1 = setTimeout(() => setAlert(true), 3500);
    const t2 = setTimeout(() => setAlert(false), 9000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [stage]);

  const auraLabel = () => (auraLevel >= 5 ? 'UNBOUND' : `0${auraLevel} / RISING`);

  const consoleApi = {
    openVault: () => setVaultOpen(true),
    scrollTo,
    openRealm: navigate,
    music: (on) => { if (on !== settings.music) set('music', on); },
    auraLabel,
    rank: () => rankName,
    backend: () => backend,
    toast,
    kingMode: triggerKing,
  };

  // ---- render -------------------------------------------------------------
  if (stage === 'gate') {
    return <AccessGate onEnter={(snd) => { setSoundChosen(snd); setSettings((s) => ({ ...s, music: snd })); setStage('loader'); }} />;
  }

  const onRealm = route.view === 'realm';

  return (
    <>
      <Background progressRef={progressRef} auraGlowRef={auraGlowRef} musicOn={musicOnRef} />
      <div className="eu-ambient-pulse" aria-hidden="true" />
      {!settings.immersive && <><div className="eu-letterbox top" /><div className="eu-letterbox bottom" /></>}
      <div className="eu-vignette" aria-hidden="true" />
      <div className="eu-grain" aria-hidden="true" />

      {stage === 'loader' && <Loader soundOn={soundChosen} onDone={() => setStage('live')} />}

      <BladeProgress progress={progress} />
      {!settings.immersive && !onRealm && <AuraIndicator level={auraLevel} />}
      <AlertBanner show={alert && !onRealm} text="NEW DROP DETECTED: BLOOD MOON COLLECTION" />

      <CommandVault
        open={vaultOpen}
        setOpen={setVaultOpen}
        onNavigate={navigate}
        onLogoClick={onLogoClick}
        searchFocusRef={searchFocusRef}
      />

      {onRealm ? (
        <RealmPage realm={route.realm} onBack={goHome} onNavigate={navigate} onOpen={setLightbox} />
      ) : (
        <>
          <main>
            <Hero rank={rankName} onScrollTo={scrollTo} onEnter={() => scrollTo('realms')} onVault={() => setVaultOpen(true)} />
            <Marquee />
            <Realms onNavigate={navigate} />
            <div className="eu-divider" />
            <Trending
              onOpen={(t) => setLightbox({ title: t.title, cat: t.cat, type: t.type, desc: `${t.title} is pulsing at ${t.pop}% popularity across the empire.` })}
              onShare={(t) => toast(`Signal Shared — ${t.title}`, 'bolt')}
            />
            <Slider />
            <Drops />
            <Recommendations />
            <EmpireMap onNavigate={navigate} />
            <Feed onOpen={setLightbox} />
            <VisualWall onOpen={setLightbox} />
            <Marquee variant="gold" reverse />
            <ComingSoon />
            <Console api={consoleApi} />
            <Story />
            <QuoteGen />
            <Join onSubmit={() => toast('Welcome To The Shadow List')} />
          </main>
          <Footer onNavigate={navigate} onEmblem={() => toast('Every empire begins in silence.')} />
        </>
      )}

      {!settings.immersive && (
        <FabControls
          musicOn={musicOn} toggleMusic={toggleMusic}
          cursorOn={cursorOn} toggleCursor={toggleCursor}
          musicHoldStart={musicHoldStart} musicHoldEnd={musicHoldEnd}
          onSettings={() => { setSettingsOpen(true); Audio.sfx('menu'); }}
        />
      )}
      {!onRealm && <MobileBar onHome={() => scrollTo('top')} onScrollTo={scrollTo} onVault={() => setVaultOpen(true)} />}

      <Settings open={settingsOpen} onClose={() => setSettingsOpen(false)} settings={settings} set={set} />

      {cursorOn && <Cursor enabled={cursorOn} musicOn={musicOnRef} spotXRef={spotXRef} spotYRef={spotYRef} />}

      {lightbox && <Lightbox item={lightbox} onClose={() => setLightbox(null)} />}
      <PageTransition state={transition?.state} text={transition?.text} />

      {lightning && <div className="eu-lightning flash" />}
      {kingMode && <div className="eu-king"><div className="k-text">KING MODE</div></div>}
    </>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <Experience />
    </ToastProvider>
  );
}
