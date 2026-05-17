// epr/v2-shared.jsx — shared shell components
const { useState: vS, useEffect: vE, useMemo: vM, useRef: vR } = React;

function Sparkline({ data, tone='teal', h=36, w=120 }) {
  const min=Math.min(...data), max=Math.max(...data), r=max-min||1, step=w/(data.length-1);
  const pts=data.map((v,i)=>[i*step, h-((v-min)/r)*(h-6)-3]);
  const d=pts.map((p,i)=>`${i?'L':'M'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');
  const stroke={teal:'#2AA7B8',green:'#3BB76E',amber:'#F2B134',red:'#E24B4B'}[tone];
  const fill={teal:'rgba(42,167,184,.12)',green:'rgba(59,183,110,.12)',amber:'rgba(242,177,52,.12)',red:'rgba(226,75,75,.12)'}[tone];
  return <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h} className="ep-spark"><path d={`${d} L${w},${h} L0,${h} Z`} fill={fill}/><path d={d} fill="none" stroke={stroke} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/><circle cx={pts[pts.length-1][0]} cy={pts[pts.length-1][1]} r="3" fill={stroke}/></svg>;
}

// ── Sidebar v2: nested groups matching the actual eprdigital routes ──
// Labels are kept in Hebrew (canonical) and translated at render time via eprT().
const NAV_GROUPS = [
  { id:'dashboard', icon:'home', label:'תמונת מצב' },
  {
    id:'requests', icon:'inbox', label:'ניהול פניות', badge:284,
    children:[
      { id:'requests',         label:'כל הפניות' },
      { id:'saved-reports',    label:'דוחות שמורים', icon:'chart' },
      { id:'my-reports',       label:'הדוחות שלי',   icon:'chart' },
    ],
  },
  { id:'team',      icon:'chart',  label:'ביצועי צוות' },
  { id:'bulk',      icon:'msg',    label:'הודעות מרוכזות' },
  { id:'residents', icon:'users',  label:'תושבים', badge:1284 },
  { id:'users',     icon:'shield', label:'ניהול משתמשים', adminOnly:true },
  {
    id:'settings', icon:'gear', label:'הגדרות', adminOnly:true,
    children:[
      { id:'settings/general',           label:'כללי',              icon:'gear' },
      { id:'settings/business-calendar', label:'יומן עסקי',          icon:'calendar' },
      { id:'settings/organization',      label:'מבנה ארגוני',       icon:'building' },
      { id:'settings/topics',            label:'נושאי פנייה',       icon:'inbox' },
      { id:'settings/sla',               label:'זמני SLA',          icon:'clock' },
      { id:'settings/forms',             label:'טפסי פנייה',        icon:'doc' },
      { id:'settings/channels',          label:'ערוצי כניסה',        icon:'phone' },
      { id:'settings/auto-routing',      label:'ניתוב אוטומטי',     icon:'send' },
      { id:'settings/templates',         label:'תבניות הודעה',      icon:'mail' },
      { id:'settings/integrations',      label:'אינטגרציות',         icon:'shield' },
      { id:'settings/security',          label:'אבטחה והרשאות',     icon:'shield' },
      { id:'settings/notifications',     label:'התראות',            icon:'bell' },
      { id:'settings/branding',          label:'מיתוג ופורטל',       icon:'building' },
      { id:'settings/audit',             label:'יומן ביקורת',        icon:'doc' },
    ],
  },
  { id:'install',   icon:'download', label:'התקנת אפליקציה' },
];

function useEprBranding() {
  const [b, setB] = vS(()=>{
    try {
      const raw = localStorage.getItem('epr-settings-v1');
      const parsed = raw ? JSON.parse(raw) : {};
      return parsed.branding || {};
    } catch(_) { return {}; }
  });
  vE(()=>{
    const onUpdate = (e)=> setB(e.detail || {});
    window.addEventListener('epr-branding-updated', onUpdate);
    return ()=> window.removeEventListener('epr-branding-updated', onUpdate);
  },[]);
  return b;
}

// ── Language (re-render trigger when settings.general.lang changes) ──
function useEprLang() {
  const [lang, setLang] = vS(()=> (window.eprCurrentLang ? window.eprCurrentLang() : 'he'));
  vE(()=>{
    const onUpdate = (e)=> setLang(e.detail || (window.eprCurrentLang ? window.eprCurrentLang() : 'he'));
    window.addEventListener('epr-lang-updated', onUpdate);
    return ()=> window.removeEventListener('epr-lang-updated', onUpdate);
  }, []);
  return lang;
}

// ── Theme (light / dark) ────────────────────────────────────────
function readEprTheme() {
  try { return localStorage.getItem('epr-theme') || 'light'; } catch(_) { return 'light'; }
}
function applyEprTheme(theme) {
  document.documentElement.dataset.theme = theme === 'dark' ? 'dark' : 'light';
}
function useEprTheme() {
  const [theme, setTheme] = vS(readEprTheme);
  vE(()=> { applyEprTheme(theme); try { localStorage.setItem('epr-theme', theme); } catch(_){} }, [theme]);
  return [theme, setTheme];
}
// Apply on initial load (before React mounts)
try { applyEprTheme(readEprTheme()); } catch(_) {}

function Sidebar({ page, setPage }) {
  const I = window.EprIcon;
  const brand = useEprBranding();
  const [theme, setTheme] = useEprTheme();
  useEprLang();
  const t = window.eprT || ((s)=>s);
  const [collapsed, setCollapsed] = vS(()=> {
    try { return localStorage.getItem('epr-sb-collapsed') === '1'; } catch(_) { return false; }
  });
  const [mobileOpen, setMobileOpen] = vS(false);
  vE(()=>{
    const onOpen = ()=> setMobileOpen(true);
    window.addEventListener('epr-mobile-nav-open', onOpen);
    return ()=> window.removeEventListener('epr-mobile-nav-open', onOpen);
  }, []);
  vE(()=>{
    if (!mobileOpen) return;
    const onKey = (e)=> { if (e.key==='Escape') setMobileOpen(false); };
    document.addEventListener('keydown', onKey);
    document.documentElement.classList.add('ep-mobile-nav-open');
    return ()=> {
      document.removeEventListener('keydown', onKey);
      document.documentElement.classList.remove('ep-mobile-nav-open');
    };
  }, [mobileOpen]);
  const handlePageClick = (id) => { setPage(id); setMobileOpen(false); };
  vE(()=>{
    try { localStorage.setItem('epr-sb-collapsed', collapsed?'1':'0'); } catch(_) {}
    document.documentElement.classList.toggle('ep-sb-collapsed', collapsed);
  }, [collapsed]);
  const [open,setOpen] = vS(()=>{
    const initial = {};
    NAV_GROUPS.forEach(g=>{
      if(g.children?.some(c=>page===c.id)) initial[g.id]=true;
    });
    return initial;
  });
  const isActive = (id) => page===id || (id==='requests' && page==='request-detail');
  return (<>
    {mobileOpen && <div className="ep-sb-scrim" onClick={()=>setMobileOpen(false)} aria-hidden="true"/>}
    <aside className={`ep-sb ${collapsed?'collapsed':''} ${mobileOpen?'mobile-open':''}`}
      aria-label={t('ניווט')}
      role="navigation">
      <div className="ep-brand">
        <div className="ep-logo" style={{overflow:'hidden'}}>
          {brand.logoDataUrl
            ? <img src={brand.logoDataUrl} alt="לוגו" style={{width:'100%',height:'100%',objectFit:'contain',display:'block'}}/>
            : 'E'}
        </div>
        <div className="ep-brand-txt">
          <div className="ep-brand-name">{brand.appName || 'EPR Digital'}</div>
          <div className="ep-brand-sub">{brand.slogan ? brand.slogan : 'בק אופיס · רעננה'}</div>
        </div>
        <button
          className="ep-sb-toggle"
          onClick={()=>setCollapsed(c=>!c)}
          data-toast="off"
          title={collapsed?'פתח סרגל':'כווץ סרגל'}
          aria-label={collapsed?'פתח סרגל':'כווץ סרגל'}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d={collapsed ? "M9 6l6 6-6 6" : "M15 6l-6 6 6 6"}/>
          </svg>
        </button>
      </div>
      <div className="ep-sb-sect">{t('ניווט')}</div>
      <nav className="ep-nav">
        {NAV_GROUPS.map(g=>{
          const hasChildren = !!g.children?.length;
          const groupActive = isActive(g.id) || g.children?.some(c=>page===c.id);
          const isOpen = open[g.id] ?? groupActive;
          const lbl = t(g.label);
          return (
            <div key={g.id}>
              {hasChildren ? (
                <a href="#" className={groupActive?'active':''} title={collapsed?lbl:undefined}
                   onClick={e=>{e.preventDefault();
                     if(collapsed){ setCollapsed(false); setOpen({...open,[g.id]:true}); }
                     else setOpen({...open,[g.id]:!isOpen});
                   }}>
                  <span className="ep-nav-ic">{I[g.icon]?React.createElement(I[g.icon]):null}</span>
                  <span className="ep-nav-lbl">{lbl}</span>
                  {g.badge!=null && <span className="ep-nav-badge">{g.badge.toLocaleString('he-IL')}</span>}
                  <span className={`ep-nav-chev ${isOpen?'open':''}`} aria-hidden="true"><I.chevD width={12} height={12}/></span>
                </a>
              ) : (
                <a href="#" className={isActive(g.id)?'active':''} title={collapsed?lbl:undefined}
                   onClick={e=>{e.preventDefault();handlePageClick(g.id)}}>
                  <span className="ep-nav-ic">{I[g.icon]?React.createElement(I[g.icon]):null}</span>
                  <span className="ep-nav-lbl">{lbl}</span>
                  {g.badge!=null && <span className="ep-nav-badge">{g.badge.toLocaleString('he-IL')}</span>}
                </a>
              )}
              {hasChildren && isOpen && !collapsed && (
                <div className="ep-nav-children">
                  {g.children.map(c=>(
                    <a key={c.id} href="#" className={`child ${page===c.id?'active':''}`} onClick={e=>{e.preventDefault();handlePageClick(c.id)}}>
                      {c.icon && I[c.icon] && <span className="ep-nav-ic">{React.createElement(I[c.icon])}</span>}
                      {c.icon && !I[c.icon] && <span className="ep-nav-bullet"/>}
                      {!c.icon && <span className="ep-nav-bullet"/>}
                      <span className="ep-nav-lbl">{t(c.label)}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>
      <div className="ep-sb-bot">
        <div className="ep-sb-user">
          <div className="ep-avatar">מע</div>
          <div className="ep-sb-user-txt">
            <div className="ep-sb-user-name">מיכל עמרן</div>
            <div className="ep-sb-user-role">מנהלת בק אופיס</div>
          </div>
          <button
            className="ep-icon-btn ep-theme-toggle"
            title={theme==='dark'?'מצב בהיר':'מצב כהה'}
            aria-label={theme==='dark'?'החלף למצב בהיר':'החלף למצב כהה'}
            onClick={()=>setTheme(theme==='dark'?'light':'dark')}
            data-toast="off">
            {theme==='dark'
              ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>
              : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>}
          </button>
          <button className="ep-icon-btn" title="התנתקות" style={{width:30,height:30}}><I.logout width={16} height={16}/></button>
        </div>
      </div>
    </aside>
  </>);
}

function LangSwitcher() {
  const lang = useEprLang();
  const [open, setOpen] = vS(false);
  const ref = vR(null);
  const t = window.eprT || ((s)=>s);
  const langs = window.EPR_LANGS || ['he','en','ar'];
  const labels = window.EPR_LANG_LABELS || {he:'עברית',en:'English',ar:'العربية'};
  const flags  = window.EPR_LANG_FLAGS  || {he:'IL',en:'EN',ar:'AR'};
  vE(()=>{
    if (!open) return;
    const onDoc = (e)=> { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    const onKey = (e)=> { if (e.key==='Escape') setOpen(false); };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return ()=> { document.removeEventListener('mousedown', onDoc); document.removeEventListener('keydown', onKey); };
  }, [open]);
  const choose = (L)=> { window.eprSetLang && window.eprSetLang(L); setOpen(false); };
  return (
    <div ref={ref} style={{position:'relative'}}>
      <button className="ep-icon-btn"
        title={t('שפה')}
        aria-label={t('שפה')}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={()=>setOpen(o=>!o)}
        data-toast="off"
        style={{minWidth:36,padding:'0 8px',fontWeight:700,fontSize:12,letterSpacing:'.04em'}}>
        {String(lang||'he').toUpperCase()}
      </button>
      {open && (
        <ul role="listbox" aria-label={t('שפה')}
          style={{position:'absolute',top:'calc(100% + 6px)',insetInlineEnd:0,zIndex:60,background:'var(--surface)',border:'1px solid var(--border)',borderRadius:10,boxShadow:'0 10px 28px rgba(0,0,0,.14)',padding:6,minWidth:180,listStyle:'none',margin:0}}>
          {langs.map(L=>(
            <li key={L} role="option" aria-selected={lang===L}>
              <button type="button" data-toast="off" onClick={()=>choose(L)}
                style={{display:'flex',alignItems:'center',gap:10,width:'100%',padding:'8px 10px',border:'none',background:lang===L?'rgba(15,150,140,.1)':'transparent',borderRadius:7,cursor:'pointer',fontSize:13.5,textAlign:'inherit',color:'var(--text)'}}>
                <span aria-hidden="true" style={{fontSize:16}}>{flags[L]}</span>
                <span style={{flex:1}}>{labels[L]}</span>
                {lang===L && <window.EprIcon.check width={12} height={12} style={{color:'var(--accent)'}}/>}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function TopBar({ crumbs, onSearch, goPage }) {
  const I = window.EprIcon;
  useEprLang();
  const t = window.eprT || ((s)=>s);
  return (
    <header className="ep-top">
      <button className="ep-icon-btn ep-mobile-menu" data-toast="off"
        title={t('פתח סרגל')} aria-label={t('פתח סרגל')}
        onClick={()=>window.dispatchEvent(new Event('epr-mobile-nav-open'))}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
        </svg>
      </button>
      <div className="ep-crumbs">
        <a href="#dashboard" className="ep-crumb-link" onClick={e=>{e.preventDefault();goPage&&goPage('dashboard')}}>{t('בק אופיס')}</a>
        {crumbs.map((c,i)=>{
          const isLast = i===crumbs.length-1;
          let target = null;
          if(!isLast){
            if(c==='הגדרות') target = 'settings/general';
            else if(c==='ניהול פניות') target = 'requests';
          }
          const label = t(c);
          return (
            <React.Fragment key={i}>
              <I.chevL width={12} height={12} aria-hidden="true"/>
              {isLast
                ? <b>{label}</b>
                : <a href="#" className="ep-crumb-link" onClick={e=>{e.preventDefault();target&&goPage&&goPage(target)}}>{label}</a>}
            </React.Fragment>
          );
        })}
      </div>
      <button className="ep-search" style={{marginInlineStart:20}} data-toast="off"
        onClick={()=>window.dispatchEvent(new Event('open-ai-search'))}
        title="⌘K"
        aria-label={t('חפש תושב, פנייה או רחוב · או שאל את ה-AI…')}>
        <I.search width={16} height={16} aria-hidden="true"/>
        <span>{t('חפש תושב, פנייה או רחוב · או שאל את ה-AI…')}</span>
        <span className="ep-ai-pill" aria-hidden="true">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3zm7 11l.9 2.7 2.7.9-2.7.9-.9 2.7-.9-2.7-2.7-.9 2.7-.9.9-2.7z"/>
          </svg>
          AI
        </span>
        <kbd className="ep-kbd" aria-hidden="true">⌘K</kbd>
      </button>
      <div className="ep-top-right">
        <LangSwitcher/>
        <button className="ep-icon-btn" title={t('ממתינים לאישור')} aria-label={t('ממתינים לאישור')}><I.shield aria-hidden="true"/><span className="ep-dot" style={{background:'var(--amber)'}}/></button>
        <button className="ep-icon-btn" title={t('יומן')} aria-label={t('יומן')}><I.calendar aria-hidden="true"/></button>
        <button className="ep-icon-btn" title={t('התראות')} aria-label={t('התראות')}><I.bell aria-hidden="true"/><span className="ep-dot"/></button>
      </div>
    </header>
  );
}

function PageHeader({ title, subtitle, actions, icon }) {
  const I = window.EprIcon;
  return (
    <div className="ep-ph">
      <div style={{display:'flex',alignItems:'center',gap:12}}>
        {icon && I[icon] && <div className="ep-ph-icon">{React.createElement(I[icon])}</div>}
        <div><h1>{title}</h1>{subtitle && <p>{subtitle}</p>}</div>
      </div>
      {actions && <div className="ep-ph-actions">{actions}</div>}
    </div>
  );
}

function EmptyState({ icon='search', title, hint, action }) {
  const I = window.EprIcon;
  const IconComp = (icon && I[icon]) || I.search;
  return (
    <div style={{padding:'40px 20px',textAlign:'center',color:'var(--muted)'}}>
      <div style={{width:48,height:48,borderRadius:12,background:'rgba(15,150,140,.08)',color:'var(--accent)',display:'inline-grid',placeItems:'center',marginBottom:12}}>
        <IconComp width={22} height={22}/>
      </div>
      <div style={{fontSize:14,fontWeight:600,color:'var(--text)',marginBottom:4}}>{title}</div>
      {hint && <div style={{fontSize:12.5}}>{hint}</div>}
      {action && <div style={{marginTop:14}}>{action}</div>}
    </div>
  );
}

Object.assign(window, { Sparkline, Sidebar, TopBar, PageHeader, useEprBranding, useEprTheme, useEprLang, EmptyState });
