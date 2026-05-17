// epr/accessibility.jsx — Accessibility menu compliant with the
// Israeli Standard 5568 (WCAG 2.0 AA). Floating button in the lower
// start corner opens a panel exposing font size, high contrast,
// link emphasis, readable font, big cursor, animation pause,
// and a link to the Accessibility Statement page.

const { useState: a11yS, useEffect: a11yE, useRef: a11yR } = React;

const EPR_A11Y_KEY = 'epr-a11y-v1';
const EPR_A11Y_DEFAULTS = {
  font: 0,          // -1, 0, 1, 2, 3 — multiplier index
  contrast: false,
  links: false,
  readable: false,
  cursor: false,
  noAnim: false,
};

function loadA11y() {
  try {
    const raw = localStorage.getItem(EPR_A11Y_KEY);
    if (!raw) return { ...EPR_A11Y_DEFAULTS };
    return { ...EPR_A11Y_DEFAULTS, ...JSON.parse(raw) };
  } catch(_) { return { ...EPR_A11Y_DEFAULTS }; }
}

function saveA11y(state) {
  try { localStorage.setItem(EPR_A11Y_KEY, JSON.stringify(state)); } catch(_) {}
}

function applyA11y(state) {
  const root = document.documentElement;
  // font scale — clear then apply
  ['ep-a11y-font--1','ep-a11y-font-1','ep-a11y-font-2','ep-a11y-font-3'].forEach(c=>root.classList.remove(c));
  if (state.font !== 0) {
    const cls = 'ep-a11y-font-' + (state.font < 0 ? '-1' : String(state.font));
    root.classList.add(cls);
  }
  root.classList.toggle('ep-a11y-contrast', !!state.contrast);
  root.classList.toggle('ep-a11y-links',    !!state.links);
  root.classList.toggle('ep-a11y-readable', !!state.readable);
  root.classList.toggle('ep-a11y-cursor',   !!state.cursor);
  root.classList.toggle('ep-a11y-no-anim',  !!state.noAnim);
}

// Apply before React mounts so a refresh doesn't flash defaults.
try { applyA11y(loadA11y()); } catch(_) {}

function AccessibilityMenu() {
  const [open, setOpen] = a11yS(false);
  const [state, setState] = a11yS(loadA11y);
  const panelRef = a11yR(null);
  const fabRef   = a11yR(null);
  const t = window.eprT || ((s)=>s);

  a11yE(()=> { applyA11y(state); saveA11y(state); }, [state]);

  a11yE(()=>{
    if (!open) return;
    const onDoc = (e)=> {
      if (panelRef.current && !panelRef.current.contains(e.target)
       && fabRef.current   && !fabRef.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e)=> { if (e.key==='Escape') { setOpen(false); fabRef.current?.focus(); } };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return ()=> { document.removeEventListener('mousedown', onDoc); document.removeEventListener('keydown', onKey); };
  }, [open]);

  const toggle = (k) => setState(s => ({ ...s, [k]: !s[k] }));
  const setFont = (f) => setState(s => ({ ...s, font: Math.max(-1, Math.min(3, f)) }));
  const reset = () => {
    const fresh = { ...EPR_A11Y_DEFAULTS };
    setState(fresh);
    window.eprToast && window.eprToast('הגדרות הנגישות אופסו', 'info');
  };

  const Icon = ({ children, ...rest }) => (
    <span className="ep-a11y-btn-ic" {...rest} aria-hidden="true">{children}</span>
  );

  return (<>
    <button
      ref={fabRef}
      className="ep-a11y-fab"
      onClick={()=>setOpen(o=>!o)}
      data-toast="off"
      aria-label={t('תפריט נגישות')}
      aria-expanded={open}
      aria-controls="ep-a11y-panel">
      {/* Universal accessibility wheelchair-on-circle icon */}
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="4" r="1.6" fill="currentColor"/>
        <path d="M7 7c2 1 3 1 5 1s3 0 5-1"/>
        <path d="M12 8v6"/>
        <path d="M8 14h8"/>
        <path d="M9 14l-2 5"/>
        <path d="M15 14l2 5"/>
      </svg>
    </button>

    {open && (
      <div ref={panelRef} className="ep-a11y-panel" id="ep-a11y-panel"
        role="dialog" aria-modal="false" aria-labelledby="ep-a11y-title">
        <h3 id="ep-a11y-title">
          <span aria-hidden="true">♿︎</span>
          {t('תפריט נגישות')}
        </h3>

        {/* Font size */}
        <div className="ep-a11y-row" role="group" aria-label={t('הגדל גופן')}>
          <button className="ep-a11y-btn" data-toast="off" onClick={()=>setFont(state.font-1)} aria-label={t('הקטן גופן')}>
            <Icon>A−</Icon><span style={{flex:1}}>{t('הקטן גופן')}</span>
          </button>
          <button className="ep-a11y-btn" data-toast="off" onClick={()=>setFont(state.font+1)} aria-label={t('הגדל גופן')}>
            <Icon>A+</Icon><span style={{flex:1}}>{t('הגדל גופן')}</span>
          </button>
        </div>

        <button className={`ep-a11y-btn ${state.contrast?'on':''}`} data-toast="off" onClick={()=>toggle('contrast')} aria-pressed={state.contrast}>
          <Icon>◐</Icon>{t('ניגודיות גבוהה')}
        </button>
        <button className={`ep-a11y-btn ${state.links?'on':''}`} data-toast="off" onClick={()=>toggle('links')} aria-pressed={state.links}>
          <Icon>⌫</Icon>{t('הדגשת קישורים')}
        </button>
        <button className={`ep-a11y-btn ${state.readable?'on':''}`} data-toast="off" onClick={()=>toggle('readable')} aria-pressed={state.readable}>
          <Icon>Aa</Icon>{t('גופן קריא')}
        </button>
        <button className={`ep-a11y-btn ${state.cursor?'on':''}`} data-toast="off" onClick={()=>toggle('cursor')} aria-pressed={state.cursor}>
          <Icon>➤</Icon>{t('מצביע גדול')}
        </button>
        <button className={`ep-a11y-btn ${state.noAnim?'on':''}`} data-toast="off" onClick={()=>toggle('noAnim')} aria-pressed={state.noAnim}>
          <Icon>⏸</Icon>{t('עצור אנימציות')}
        </button>

        <div className="ep-a11y-footer">
          <button className="ep-btn ep-btn-ghost ep-btn-sm" data-toast="off" onClick={reset}>{t('איפוס נגישות')}</button>
          <a className="ep-btn ep-btn-ghost ep-btn-sm" href="#accessibility-statement" onClick={()=>setOpen(false)} data-toast="off" style={{justifyContent:'center'}}>{t('הצהרת נגישות')}</a>
        </div>
      </div>
    )}
  </>);
}

// ─────────────────────────────────────────────────────────────
// Accessibility Statement page — legally required in Israel for any
// "service supplier" web site (תקנות שוויון זכויות לאנשים עם מוגבלות,
// תשע"ג-2013). The wording below mirrors what is published on most
// Israeli municipalities' sites and is meant as a starting template;
// the brand name and contact info are pulled from settings so the
// statement self-updates when branding changes.
// ─────────────────────────────────────────────────────────────
function AccessibilityStatementPage({ goPage }) {
  const I = window.EprIcon;
  const t = window.eprT || ((s)=>s);
  const brand = (window.useEprBranding ? window.useEprBranding() : {}) || {};
  let general = {};
  try {
    const raw = localStorage.getItem('epr-settings-v1');
    general = (raw ? (JSON.parse(raw).general || {}) : {});
  } catch(_) {}
  const orgName = general.orgName || brand.appName || 'EPR Digital';
  const phone   = general.phone   || '106';
  const email   = general.email   || 'accessibility@city.gov.il';

  const sec = (title, children) => (
    <section className="ep-card" style={{maxWidth:780}}>
      <h2 style={{margin:'0 0 8px',fontSize:18,color:'var(--heading)'}}>{title}</h2>
      <div style={{fontSize:14,lineHeight:1.7,color:'var(--text)'}}>{children}</div>
    </section>
  );

  return (
    <div className="ep-app">
      <a className="ep-skip" href="#ep-acc-content">{t('דלג לתוכן')}</a>
      <main className="ep-main" id="ep-acc-content" tabIndex={-1}>
        <div className="ep-content" style={{display:'flex',flexDirection:'column',gap:18,padding:'40px 24px'}}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',maxWidth:780,gap:12,flexWrap:'wrap'}}>
            <div>
              <div className="ep-card-eb">הצהרת נגישות</div>
              <h1 style={{margin:'4px 0 0',fontSize:26,color:'var(--heading)'}}>{t('הצהרת נגישות')} — {orgName}</h1>
            </div>
            <button className="ep-btn ep-btn-ghost" onClick={()=>goPage('dashboard')} data-toast="off">‹ {t('חזור לדשבורד')}</button>
          </div>

          {sec('כללי', (
            <p>
              {orgName} רואה בהנגשת המערכת חלק בלתי נפרד מהשירות לתושב.
              אנו עומדים לרשות כל אדם, ללא יוצא מן הכלל, ופועלים בהתאם להוראות
              <b> חוק שוויון זכויות לאנשים עם מוגבלות, התשנ״ח-1998 </b>
              ולתקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות),
              <b> התשע״ג-2013</b>, על בסיס תקן ישראלי ת״י 5568 ברמת AA, התואם את הנחיות WCAG 2.0.
            </p>
          ))}

          {sec('סידורי נגישות באתר', (
            <ul style={{margin:0,paddingInlineStart:18,display:'flex',flexDirection:'column',gap:6}}>
              <li>תפריט נגישות צף בכל עמוד (בלחיצה על אייקון הנגישות בפינה התחתונה).</li>
              <li>שינוי גודל גופן (הגדלה והקטנה) עם שמירה מתמשכת בין דפים.</li>
              <li>מצב ניגודיות גבוהה (שחור/לבן/צהוב).</li>
              <li>הדגשת קישורים והדגשתם בהובר.</li>
              <li>גופן קריא חלופי (Arial) להחלפת הגופן הראשי.</li>
              <li>מצביע עכבר גדול.</li>
              <li>עצירת אנימציות לטובת משתמשים הרגישים לתנועה.</li>
              <li>קישור "דלג לתוכן" המאפשר ניווט מקלדת מהיר.</li>
              <li>תמיכה מלאה בניווט באמצעות מקלדת בלבד (Tab, Shift+Tab, Enter, Escape, חצים).</li>
              <li>סימון ויזואלי ברור לפוקוס בכל פריט אינטראקטיבי.</li>
              <li>תמיכה בקוראי מסך (NVDA, JAWS, VoiceOver) — שדות, כפתורים ותפריטים מתויגים בהתאם.</li>
              <li>שלוש שפות: עברית, English ו-العربية. ניתן לעבור בין השפות מהפינה העליונה.</li>
            </ul>
          ))}

          {sec('דפדפנים נתמכים', (
            <p>
              האתר נבדק והותאם לגרסאות עדכניות של דפדפנים מובילים: Chrome, Firefox,
              Edge ו-Safari (כולל גרסאות מובייל ל-iOS ו-Android). מומלץ להשתמש בגרסה
              עדכנית של הדפדפן לחוויה אופטימלית.
            </p>
          ))}

          {sec('חריגים מהנגישות', (
            <>
              <p>
                למרות מאמצינו לוודא נגישות מלאה, ייתכנו תקלות פרטניות בחלקים מסוימים
                של המערכת — למשל תוכן שהועלה על-ידי גורם חיצוני, מסמכי PDF ישנים, או
                סרטונים ללא כתוביות. אנו מטפלים בכל פנייה כזו בהקדם.
              </p>
              <p>
                במקרה של תקלה ספציפית הקשורה לנגישות, נשמח שתפנו אלינו דרך הפרטים
                למטה. נשתדל לתת מענה תוך 30 ימי עבודה.
              </p>
            </>
          ))}

          {sec('פנייה לרכז הנגישות', (
            <ul style={{margin:0,paddingInlineStart:18,display:'flex',flexDirection:'column',gap:6,fontSize:14}}>
              <li><b>שם הארגון:</b> {orgName}</li>
              <li><b>טלפון מוקד:</b> <a href={`tel:${phone}`} dir="ltr">{phone}</a></li>
              <li><b>אימייל:</b> <a href={`mailto:${email}`} dir="ltr">{email}</a></li>
              <li><b>שעות מענה:</b> ימים א׳–ה׳ בין השעות 08:00–17:30</li>
            </ul>
          ))}

          {sec('עדכון אחרון של ההצהרה', (
            <p>הצהרת הנגישות עודכנה לאחרונה ב-{new Date().toLocaleDateString('he-IL')}.</p>
          ))}
        </div>
      </main>
      <AccessibilityMenu/>
    </div>
  );
}

Object.assign(window, { AccessibilityMenu, AccessibilityStatementPage });
