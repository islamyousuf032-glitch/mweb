// =============================================================================
//  YOUSUF UNBOUND — EMPIRE DATA
//  All content lives here so the homepage can stay declarative.
// =============================================================================

export const REALMS = [
  { id: 'film-vault',    name: 'Film Vault',     sub: 'Film Gallery',   icon: 'film',   page: 'film-vault.html',    status: 'ONLINE',      featured: '12 Clips',  fresh: '3 Drops',     btn: 'Open Vault',        tagline: 'Cinematic frames, edits, stories and motion archives.', transition: 'OPENING FILM VAULT...' },
  { id: 'shadow-frames', name: 'Shadow Frames',  sub: 'Photo Gallery',  icon: 'frame',  page: 'shadow-frames.html', status: 'ACTIVE',      featured: '24 Frames', fresh: '7 Shots',     btn: 'View Frames',       tagline: 'Dark portraits, noir shots and immortal moments.',     transition: 'ENTERING SHADOW FRAMES...' },
  { id: 'sound-chamber', name: 'Sound Chamber',  sub: 'Music Gallery',  icon: 'wave',   page: 'sound-chamber.html', status: 'LIVE',        featured: '9 Tracks',  fresh: '2 Beats',     btn: 'Enter Chamber',     tagline: 'Bass, atmosphere, dark frequencies and audio drops.',  transition: 'TUNING SOUND CHAMBER...' },
  { id: 'ai-dreamforge', name: 'AI Dreamforge',  sub: 'AI Art Gallery', icon: 'spark',  page: 'ai-dreamforge.html', status: 'GENERATING',  featured: '31 Arts',   fresh: '11 Visions',  btn: 'Open Dreamforge',   tagline: 'Machine-made visions from the impossible.',            transition: 'ACTIVATING AI DREAMFORGE...' },
  { id: 'game-district', name: 'Game District',  sub: 'Games',          icon: 'game',   page: 'game-district.html', status: 'READY',       featured: '5 Games',   fresh: '1 Challenge', btn: 'Start Mission',     tagline: 'Interactive challenges, mini games and shadow missions.', transition: 'LAUNCHING GAME DISTRICT...' },
  { id: 'black-market',  name: 'Black Market',   sub: 'Shop',           icon: 'tag',    page: 'black-market.html',  status: 'DROPS OPEN',  featured: '14 Items',  fresh: '4 Products',  btn: 'Browse Market',     tagline: 'Exclusive digital drops, merch, wallpapers and packs.', transition: 'ACCESSING BLACK MARKET...' },
  { id: 'app-arsenal',   name: 'App Arsenal',    sub: 'Apps',           icon: 'grid',   page: 'app-arsenal.html',   status: 'TOOLS LOADED',featured: '8 Apps',    fresh: '2 Tools',     btn: 'Launch Arsenal',    tagline: 'Tools, apps and creative utilities forged for power.', transition: 'LOADING APP ARSENAL...' },
  { id: 'the-origin',    name: 'The Origin',     sub: 'About',          icon: 'crown',  page: 'the-origin.html',    status: 'CLASSIFIED',  featured: '1 Story',   fresh: 'New Vision',  btn: 'Reveal Origin',     tagline: 'The story behind the empire.',                          transition: 'REVEALING THE ORIGIN...' },
];

export const TRENDING = [
  { id: 't1', title: 'Midnight Chase',        cat: 'Film Vault',    type: 'Cinematic Clip',   pop: 98, views: 184320, hot: true },
  { id: 't2', title: 'Red Silence',           cat: 'AI Dreamforge', type: 'AI Artwork',       pop: 94, views: 152110, hot: true },
  { id: 't3', title: 'Dark Frequency Vol. 1', cat: 'Sound Chamber', type: 'Music Drop',       pop: 91, views: 133904, hot: false },
  { id: 't4', title: 'Neon Hunter',           cat: 'Game District', type: 'Mini Game',        pop: 89, views: 121778, hot: false },
  { id: 't5', title: 'Empire Wallpaper Pack', cat: 'Black Market',  type: 'Digital Drop',     pop: 87, views: 110233, hot: false },
  { id: 't6', title: 'Shadow Portrait Series',cat: 'Shadow Frames', type: 'Photo Collection', pop: 85, views: 98450,  hot: false },
];

export const DROPS = [
  { id: 'd1', when: 'Today',       title: 'Blood Moon Poster Pack',  cat: 'AI Dreamforge', desc: 'New AI-generated cinematic poster collection.', status: 'NEW' },
  { id: 'd2', when: 'Today',       title: 'Dark Pulse Beat',         cat: 'Sound Chamber', desc: 'A low bass cinematic sound drop.',              status: 'NEW' },
  { id: 'd3', when: 'Yesterday',   title: 'Noir Street Frames',      cat: 'Shadow Frames', desc: 'Urban photography with shadow and red light.',  status: 'LIVE' },
  { id: 'd4', when: 'This Week',   title: 'Unbound Mini Game Demo',  cat: 'Game District', desc: 'A dark reflex-based browser game.',             status: 'LIVE' },
  { id: 'd5', when: 'Coming Soon', title: 'Empire Merch Preview',    cat: 'Black Market',  desc: 'Exclusive YOUSUF UNBOUND visual identity drops.', status: 'SOON' },
];

export const SLIDES = [
  { id: 's1', title: 'THE UNBOUND CUT',    cat: 'Film Vault',    desc: 'A cinematic archive built for the fearless.' },
  { id: 's2', title: 'BLOOD MOON SAMURAI', cat: 'AI Dreamforge', desc: 'An impossible warrior forged by machine imagination.' },
  { id: 's3', title: 'DARK PULSE',         cat: 'Sound Chamber', desc: 'Feel the bass of the underworld.' },
  { id: 's4', title: 'NEON HUNTER',        cat: 'Game District', desc: 'Enter the district. Survive the glow.' },
  { id: 's5', title: 'BLACK MARKET DROP 01', cat: 'Shop',        desc: 'Exclusive visuals, packs and empire goods.' },
];

export const FEED = [
  { id: 'f1', title: 'Midnight Chase',        cat: 'Films',  flags: ['Trending', 'Featured'], pop: 98, latest: 5 },
  { id: 'f2', title: 'Red Silence',           cat: 'AI Art', flags: ['Trending', 'New'],      pop: 94, latest: 9 },
  { id: 'f3', title: 'Dark Frequency Vol. 1', cat: 'Music',  flags: ['Trending'],             pop: 91, latest: 12 },
  { id: 'f4', title: 'Neon Hunter',           cat: 'Games',  flags: ['New', 'Featured'],      pop: 89, latest: 3 },
  { id: 'f5', title: 'Empire Wallpaper Pack', cat: 'Shop',   flags: ['New'],                  pop: 87, latest: 2 },
  { id: 'f6', title: 'Shadow Portrait Series',cat: 'Photos', flags: ['Featured'],             pop: 85, latest: 18 },
  { id: 'f7', title: 'Void Walker Reel',      cat: 'Films',  flags: ['New'],                  pop: 80, latest: 1 },
  { id: 'f8', title: 'Crimson Mask',          cat: 'AI Art', flags: ['Featured'],             pop: 78, latest: 22 },
  { id: 'f9', title: 'Aura Sampler',          cat: 'Music',  flags: ['New'],                  pop: 76, latest: 4 },
  { id: 'f10', title: 'Cursor FX Tool',       cat: 'Apps',   flags: ['Featured', 'New'],      pop: 74, latest: 6 },
  { id: 'f11', title: 'Smoke Brushes Pack',   cat: 'Shop',   flags: ['Featured'],             pop: 71, latest: 30 },
  { id: 'f12', title: 'Reflex Trainer',       cat: 'Games',  flags: ['New'],                  pop: 69, latest: 7 },
];

export const FEED_FILTERS = ['All', 'Featured', 'New', 'Trending', 'Films', 'Photos', 'Music', 'AI Art', 'Games', 'Shop', 'Apps'];

export const VISUAL_WALL = [
  { id: 'v1', label: 'BLOOD MOON',   cat: 'AI Art', span: 'tall' },
  { id: 'v2', label: 'NOIR STREET',  cat: 'Photo',  span: 'wide' },
  { id: 'v3', label: 'THE THRONE',   cat: 'Film',   span: '' },
  { id: 'v4', label: 'DARK PULSE',   cat: 'Music',  span: '' },
  { id: 'v5', label: 'NEON HUNTER',  cat: 'Game',   span: 'tall' },
  { id: 'v6', label: 'CRIMSON MASK', cat: 'AI Art', span: '' },
  { id: 'v7', label: 'ASH RAIN',     cat: 'Photo',  span: '' },
  { id: 'v8', label: 'EMPIRE CORE',  cat: 'Art',    span: 'wide' },
  { id: 'v9', label: 'VOID WALKER',  cat: 'Film',   span: '' },
  { id: 'v10', label: 'SHADOW KING', cat: 'AI Art', span: 'tall' },
  { id: 'v11', label: 'RED SIGNAL',  cat: 'Art',    span: '' },
  { id: 'v12', label: 'GHOST GLASS', cat: 'Photo',  span: '' },
];

export const COMING_SOON = [
  'Dark Comics', 'Short Stories', 'Creator Studio', 'Live Events',
  'Wallpaper Engine', 'Premium Membership', 'Unbound AI Assistant', 'Secret Archive',
  'Dark Academy', 'Community Realm', 'Cinematic Blog', 'Collectible Gallery',
  'Download Zone', 'Creator Challenges',
];

export const QUOTES = [
  'Power is quiet until it decides to speak.',
  'The shadows are not empty. They are waiting.',
  'Create like a king. Move like a ghost.',
  'No empire asks for permission.',
  'The ordinary scroll. The unbound enter.',
  'Darkness is not the end. It is the beginning.',
  'If they can predict you, you are already chained.',
];

export const CHAPTERS = [
  { n: '01', title: 'The Signal',  text: 'Somewhere in the digital darkness, a signal awakened.' },
  { n: '02', title: 'The Realms',  text: 'Films, frames, sound, art, games and tools formed the empire.' },
  { n: '03', title: 'The Unbound', text: 'No chains. No limits. Only creation.' },
];

export const RANKS = [
  'Shadow Guest', 'Noir Walker', 'Dark Visitor', 'Red Signal',
  'Vault Seeker', 'Dreamforge Witness', 'Unbound Candidate',
];

export const RANK_LADDER = ['Shadow Guest', 'Vault Seeker', 'Realm Walker', 'Unbound Member'];

export const AI_SUGGESTIONS = [
  'Start with Blood Moon Samurai.',
  'Dark Pulse is trending in your realm.',
  'Shadow Frames updated recently.',
  'Neon Hunter awaits your reflexes.',
  'The Origin holds a classified vision.',
];

export const TAGLINES = [
  'Enter The Realm Where Shadows Become Power.',
  'Cinema. AI. Sound. Games. Art. Darkness. One Empire.',
  'This Is Not A Website. This Is An Experience.',
  'No Chains. No Rules. No Boundaries.',
  'A Dark Universe Built For The Unbound.',
];

// =============================================================================
//  REALM PAGE CONTENT — full content for each of the 8 realm sub-pages
// =============================================================================
export const REALM_CONTENT = {
  'film-vault': {
    hero: 'Cinematic frames forged in shadow. Motion archives for the fearless.',
    intro: 'Inside the Film Vault, every frame is a weapon. Edits, stories, trailers and motion experiments — captured in noir light and crimson fog.',
    stat: [['Clips', '12'], ['New Drops', '03'], ['Total Views', '184K'], ['Runtime', '2.4h']],
    items: [
      { t: 'The Unbound Cut', m: 'Cinematic · 4:12', d: 'A signature reel of the empire.', accent: 0 },
      { t: 'Midnight Chase', m: 'Action · 2:08', d: 'Neon streets, no rules.', accent: 1 },
      { t: 'Void Walker Reel', m: 'Experimental · 1:44', d: 'Movement through darkness.', accent: 2 },
      { t: 'Throne Room', m: 'Mood · 3:30', d: 'Power, silence, weight.', accent: 0 },
      { t: 'Red Rain', m: 'Atmosphere · 2:55', d: 'Storm over the empire.', accent: 1 },
      { t: 'Ash & Steel', m: 'Cinematic · 3:01', d: 'Forged in fire.', accent: 2 },
    ],
  },
  'shadow-frames': {
    hero: 'Dark portraits. Noir shots. Immortal moments held in crimson light.',
    intro: 'Shadow Frames is the empire\'s photographic archive — urban noir, dramatic portraits and moments that refuse to fade.',
    stat: [['Frames', '24'], ['New Shots', '07'], ['Collections', '05'], ['Resolution', '8K']],
    items: [
      { t: 'Noir Street', m: 'Urban · Series', d: 'Wet asphalt, red glow.', accent: 1 },
      { t: 'Shadow Portrait', m: 'Portrait · Series', d: 'Faces in the dark.', accent: 0 },
      { t: 'Ghost Glass', m: 'Abstract', d: 'Reflections of the unseen.', accent: 2 },
      { t: 'Crimson Alley', m: 'Urban', d: 'A path into power.', accent: 1 },
      { t: 'Silent King', m: 'Portrait', d: 'Authority without a word.', accent: 0 },
      { t: 'Rain Signal', m: 'Mood', d: 'Drops on cold steel.', accent: 2 },
    ],
  },
  'sound-chamber': {
    hero: 'Bass. Atmosphere. Dark frequencies pulled from the underworld.',
    intro: 'The Sound Chamber is where the empire\'s frequencies are forged — deep bass, cinematic drones and dark ambient drops.',
    stat: [['Tracks', '09'], ['New Beats', '02'], ['Total Plays', '133K'], ['BPM Range', '60-140']],
    items: [
      { t: 'Dark Pulse', m: 'Bass · 3:20', d: 'Feel the underworld.', accent: 1 },
      { t: 'Dark Frequency Vol.1', m: 'Album · 8 tracks', d: 'A descent in sound.', accent: 0 },
      { t: 'Aura Sampler', m: 'Ambient · 4:01', d: 'Breathing darkness.', accent: 2 },
      { t: 'Underworld Bass', m: 'Bass · 2:48', d: 'Low. Heavy. Endless.', accent: 1 },
      { t: 'Throne Drone', m: 'Cinematic · 5:10', d: 'The weight of power.', accent: 0 },
      { t: 'Red Heartbeat', m: 'Pulse · 1:59', d: 'The empire\'s rhythm.', accent: 2 },
    ],
  },
  'ai-dreamforge': {
    hero: 'Machine-made visions from the impossible. Forged by dark imagination.',
    intro: 'AI Dreamforge generates what the human eye cannot — impossible warriors, blood moons and crimson dreamscapes born of machine intelligence.',
    stat: [['Artworks', '31'], ['New Visions', '11'], ['Models', '04'], ['Status', 'GENERATING']],
    items: [
      { t: 'Blood Moon Samurai', m: 'AI Art · 4K', d: 'An impossible warrior.', accent: 1 },
      { t: 'Red Silence', m: 'AI Art · 4K', d: 'Stillness with power.', accent: 0 },
      { t: 'Crimson Mask', m: 'AI Art · 4K', d: 'The face of the empire.', accent: 2 },
      { t: 'Shadow King', m: 'AI Art · 4K', d: 'Born from the void.', accent: 1 },
      { t: 'Neon Oracle', m: 'AI Art · 4K', d: 'It sees the future.', accent: 0 },
      { t: 'Empire Core', m: 'AI Art · 4K', d: 'The heart of darkness.', accent: 2 },
    ],
  },
  'game-district': {
    hero: 'Enter the district. Survive the glow. Reflex missions in the dark.',
    intro: 'Game District holds the empire\'s interactive challenges — reflex trainers, shadow missions and mini-games built to test the unbound.',
    stat: [['Games', '05'], ['New Challenge', '01'], ['Players', '121K'], ['Top Score', '99,999']],
    items: [
      { t: 'Neon Hunter', m: 'Reflex · Playable', d: 'Survive the glow.', accent: 1, play: true },
      { t: 'Reflex Trainer', m: 'Skill · Playable', d: 'Sharpen your edge.', accent: 0, play: true },
      { t: 'Shadow Mission', m: 'Stealth · Soon', d: 'Move unseen.', accent: 2 },
      { t: 'Glow Runner', m: 'Endless · Soon', d: 'Never stop.', accent: 1 },
      { t: 'Void Reflex', m: 'Reaction · Soon', d: 'Speed in darkness.', accent: 0 },
      { t: 'Crimson Strike', m: 'Arcade · Soon', d: 'One hit. One chance.', accent: 2 },
    ],
  },
  'black-market': {
    hero: 'Exclusive digital drops, merch, wallpapers and empire goods.',
    intro: 'The Black Market is where the empire\'s exclusive goods surface — wallpaper packs, brushes, merch previews and limited digital drops.',
    stat: [['Items', '14'], ['New Products', '04'], ['Sold', '2,310'], ['Status', 'DROPS OPEN']],
    items: [
      { t: 'Empire Wallpaper Pack', m: 'Pack · $9', d: '12 cinematic wallpapers.', accent: 1, price: true },
      { t: 'Blood Moon Poster Pack', m: 'Pack · $7', d: 'AI poster collection.', accent: 0, price: true },
      { t: 'Smoke Brushes Pack', m: 'Tools · $5', d: 'For dark creators.', accent: 2, price: true },
      { t: 'Merch Preview', m: 'Apparel · Soon', d: 'Empire identity wear.', accent: 1 },
      { t: 'Crimson Icon Set', m: 'Assets · $4', d: '40 noir icons.', accent: 0, price: true },
      { t: 'Sound FX Pack', m: 'Audio · $6', d: 'Cinematic SFX library.', accent: 2, price: true },
    ],
  },
  'app-arsenal': {
    hero: 'Tools, apps and creative utilities forged for power.',
    intro: 'App Arsenal is the empire\'s toolbox — apps and utilities built to give creators an unbound edge.',
    stat: [['Apps', '08'], ['New Tools', '02'], ['Downloads', '18K'], ['Platforms', 'Web']],
    items: [
      { t: 'Cursor FX Tool', m: 'Utility · Live', d: 'Custom cursor effects.', accent: 1 },
      { t: 'Aura Generator', m: 'Creative · Live', d: 'Build dark gradients.', accent: 0 },
      { t: 'Noise Forge', m: 'Generative · Live', d: 'Procedural textures.', accent: 2 },
      { t: 'Beat Visualizer', m: 'Audio · Live', d: 'See your sound.', accent: 1 },
      { t: 'Grain Studio', m: 'Photo · Soon', d: 'Film grain engine.', accent: 0 },
      { t: 'Empire Palette', m: 'Color · Live', d: 'Noir color tools.', accent: 2 },
    ],
  },
  'the-origin': {
    hero: 'The story behind the empire. Classified. Now revealed.',
    intro: 'Every empire begins in silence. The Origin is the lore of YOUSUF UNBOUND — a creator who refused chains and built a universe beyond limits.',
    stat: [['Story', '01'], ['Chapters', '03'], ['Vision', 'UPDATED'], ['Status', 'CLASSIFIED']],
    items: [
      { t: 'The Signal', m: 'Chapter 01', d: 'A signal awakened in the dark.', accent: 1 },
      { t: 'The Realms', m: 'Chapter 02', d: 'Eight realms formed the empire.', accent: 0 },
      { t: 'The Unbound', m: 'Chapter 03', d: 'No chains. No limits. Only creation.', accent: 2 },
      { t: 'The Creator', m: 'Profile', d: 'Building beyond limits.', accent: 1 },
      { t: 'The Vision', m: 'Manifesto', d: 'Where shadows become power.', accent: 0 },
      { t: 'The Future', m: 'Roadmap', d: 'The empire is expanding.', accent: 2 },
    ],
  },
};
