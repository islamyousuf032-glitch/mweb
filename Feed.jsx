import React, { useState, useMemo, useEffect } from 'react';
import { FEED, FEED_FILTERS } from '../data.js';
import { SectionHeader, Reveal } from './Reveal.jsx';
import { Icon } from '../icons.jsx';
import { Audio } from '../audio.js';

export default function Feed({ onOpen }) {
  const [filter, setFilter] = useState('All');
  const [sort, setSort] = useState('Popular');
  const [q, setQ] = useState('');
  const [limit, setLimit] = useState(8);
  const [loading, setLoading] = useState(false);

  const filtered = useMemo(() => {
    let list = FEED.filter((f) => {
      if (q && !f.title.toLowerCase().includes(q.toLowerCase())) return false;
      if (filter === 'All') return true;
      if (['Featured', 'New', 'Trending'].includes(filter)) return f.flags.includes(filter);
      return f.cat === filter;
    });
    list = [...list].sort((a, b) => (sort === 'Latest' ? a.latest - b.latest : sort === 'Featured' ? (b.flags.includes('Featured') - a.flags.includes('Featured')) : b.pop - a.pop));
    return list;
  }, [filter, sort, q]);

  useEffect(() => { setLimit(8); }, [filter, sort, q]);

  const visible = filtered.slice(0, limit);

  const loadMore = () => {
    setLoading(true); Audio.sfx('beep');
    setTimeout(() => { setLimit((l) => l + 4); setLoading(false); }, 600);
  };

  return (
    <section className="eu-section" id="feed">
      <div className="wrap">
        <SectionHeader kicker="Mixed Signal" title="The Unbound Feed"
          sub="Filter the empire. Sort the shadows." />

        <div className="eu-feed-controls">
          {FEED_FILTERS.map((f) => (
            <button key={f} className={`eu-filter ${filter === f ? 'active' : ''}`} data-cursor="button"
              onClick={() => { setFilter(f); Audio.sfx('click'); }}>{f}</button>
          ))}
          <label className="eu-feed-search">
            <Icon name="search" width="14" height="14" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search feed..." data-cursor="text" />
          </label>
        </div>

        <div style={{ display: 'flex', gap: 10, marginTop: 12, flexWrap: 'wrap' }}>
          {['Popular', 'Latest', 'Featured'].map((s) => (
            <button key={s} className={`eu-filter ${sort === s ? 'active' : ''}`} data-cursor="button"
              onClick={() => setSort(s)}>Sort: {s}</button>
          ))}
        </div>

        {visible.length ? (
          <div className="eu-feed-grid">
            {visible.map((f, i) => (
              <div key={f.id} className="eu-feed-card" data-cursor="card" style={{ animationDelay: `${(i % 4) * 0.05}s` }}
                onClick={() => onOpen({ title: f.title, cat: f.cat, type: f.flags.join(' · '), desc: `A ${f.cat} signal pulsing at ${f.pop}% across the empire.` })}>
                <div>
                  <div className="f-cat">{f.cat}</div>
                  <div className="f-title">{f.title}</div>
                </div>
                <div className="f-flags">{f.flags.map((fl) => <span key={fl} className="f-flag">{fl}</span>)}</div>
              </div>
            ))}
            {loading && Array.from({ length: 4 }).map((_, i) => <div key={'sk' + i} className="eu-skel" />)}
          </div>
        ) : (
          <div className="eu-empty">Nothing Found In The Shadows</div>
        )}

        {visible.length < filtered.length && !loading && (
          <div style={{ textAlign: 'center', marginTop: 28 }}>
            <button className="eu-btn" data-cursor="button" onClick={loadMore}>Load More</button>
          </div>
        )}
      </div>
    </section>
  );
}
