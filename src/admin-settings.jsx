// epr/v3-admin-settings.jsx — Settings (14), Admin reports, Users management, ResetPassword

const { useState: asS, useEffect: asE, useRef: asR } = React;

// ── Persisted settings store (localStorage) ─────────────────────
const EPR_STORE_KEY = 'epr-settings-v1';
const EPR_DEFAULTS = {
  general: {
    orgName:'עיריית הירוקה', taxId:'500123456', phone:'106',
    email:'moked@city.gov.il', address:'רחוב העירייה 12, ת.ד 1500',
    tz:'Asia/Jerusalem', lang:'he',
    dateFmt:'DD/MM/YYYY', timeFmt:'24h', currency:'₪ ILS', reqFmt:'REQ-{YEAR}-{####}',
  },
  branding: {
    accent:'#0F968C',
    logoDataUrl:null, logoName:'logo.svg', logoSize:'120×40px · SVG',
    appName:'עיריית הירוקה - שירות לתושב',
    slogan:'העיר שלך, בלחיצה אחת',
  },
  sla: {
    rows:[
      {label:'דחוף', first:'2 שעות',   resolve:'4 שעות',   esc:'30 דקות', color:'#E15454'},
      {label:'גבוה', first:'4 שעות',   resolve:'24 שעות',  esc:'2 שעות',  color:'#F2B134'},
      {label:'רגיל', first:'24 שעות',  resolve:'5 ימים',   esc:'3 ימים',  color:'#5C8DDB'},
      {label:'נמוך', first:'3 ימים',   resolve:'14 יום',   esc:'7 ימים',  color:'#8B97A8'},
    ],
  },
};
function eprLoadStore() {
  try {
    const raw = localStorage.getItem(EPR_STORE_KEY);
    if (!raw) return JSON.parse(JSON.stringify(EPR_DEFAULTS));
    const parsed = JSON.parse(raw);
    return {
      general:  {...EPR_DEFAULTS.general,  ...(parsed.general||{})},
      branding: {...EPR_DEFAULTS.branding, ...(parsed.branding||{})},
      sla:      {...EPR_DEFAULTS.sla,      ...(parsed.sla||{}),
                 rows:(parsed.sla&&parsed.sla.rows)?parsed.sla.rows:EPR_DEFAULTS.sla.rows},
    };
  } catch(_) { return JSON.parse(JSON.stringify(EPR_DEFAULTS)); }
}
function eprSaveSection(section, value) {
  try {
    const all = eprLoadStore();
    all[section] = value;
    localStorage.setItem(EPR_STORE_KEY, JSON.stringify(all));
  } catch(_) {}
}
function eprApplyBranding(b) {
  if (!b) return;
  const root = document.documentElement;
  if (b.accent) {
    root.style.setProperty('--accent', b.accent);
    root.style.setProperty('--teal', b.accent);
    root.style.setProperty('--teal-500', b.accent);
  }
  if (b.logoDataUrl) window.eprLogoDataUrl = b.logoDataUrl;
  else delete window.eprLogoDataUrl;
  window.dispatchEvent(new CustomEvent('epr-branding-updated', { detail:b }));
}
try { eprApplyBranding(eprLoadStore().branding); } catch(_) {}

// Generic settings layout
function SettingsLayout({ tab, setTab, items, children }) {
  return (
    <div style={{display:'grid',gridTemplateColumns:'240px 1fr',gap:20,alignItems:'flex-start'}}>
      <aside className="ep-card" style={{padding:8,position:'sticky',top:84,maxHeight:'calc(100vh - 110px)',overflowY:'auto'}}>
        <div style={{padding:'8px 12px 6px',fontSize:10,fontWeight:700,color:'var(--muted)',textTransform:'uppercase',letterSpacing:'.08em'}}>הגדרות מערכת</div>
        <ul style={{listStyle:'none',margin:0,padding:0}}>
          {items.map(it => (
            <li key={it.id}><button onClick={()=>setTab(it.id)} className="ep-nav-link" style={{background:tab===it.id?'rgba(15,150,140,.1)':'transparent',color:tab===it.id?'var(--accent)':'var(--text)',fontWeight:tab===it.id?600:500,width:'100%',textAlign:'inherit',padding:'9px 12px',borderRadius:7,marginBottom:1}}>{it.label}</button></li>
          ))}
        </ul>
      </aside>
      <div style={{display:'flex',flexDirection:'column',gap:18}}>{children}</div>
    </div>
  );
}

const SET_ITEMS = [
  {id:'general',label:'כללי'},
  {id:'business-calendar',label:'יומן עסקי'},
  {id:'organization',label:'מבנה ארגוני'},
  {id:'topics',label:'נושאי פנייה'},
  {id:'sla',label:'הגדרות SLA'},
  {id:'forms',label:'טפסי פנייה'},
  {id:'channels',label:'ערוצי כניסה'},
  {id:'auto-routing',label:'ניתוב אוטומטי'},
  {id:'templates',label:'תבניות הודעה'},
  {id:'integrations',label:'אינטגרציות'},
  {id:'security',label:'אבטחה והרשאות'},
  {id:'notifications',label:'התראות'},
  {id:'branding',label:'מיתוג ופורטל'},
  {id:'audit',label:'יומן ביקורת'},
];

function AdminSettingsPage({ initialTab='general' }) {
  const I = window.EprIcon;
  const [tab,setTab] = asS(initialTab);
  asE(() => { setTab(initialTab); }, [initialTab]);
  return (<>
    <PageHeader title="הגדרות מערכת" icon="gear" subtitle="קונפיגורציה כוללת של EPR — מבנה ארגוני, SLA, ערוצים, התראות והרשאות"/>
    <SettingsLayout tab={tab} setTab={setTab} items={SET_ITEMS}>
      {tab==='general' && <GeneralSettings/>}
      {tab==='business-calendar' && <BusinessCalendarSettings/>}
      {tab==='organization' && <OrganizationSettings/>}
      {tab==='topics' && <TopicsSettings/>}
      {tab==='sla' && <SlaSettings/>}
      {tab==='forms' && <FormsSettings/>}
      {tab==='channels' && <ChannelsSettings/>}
      {tab==='auto-routing' && <RoutingSettings/>}
      {tab==='templates' && <TemplatesSettings/>}
      {tab==='integrations' && <IntegrationsSettings/>}
      {tab==='security' && <SecuritySettings/>}
      {tab==='notifications' && <NotificationsSettings/>}
      {tab==='branding' && <BrandingSettings/>}
      {tab==='audit' && <AuditSettings/>}
    </SettingsLayout>
  </>);
}

// Validation helpers
function eprValidEmail(s) { return !s || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(s).trim()); }
function eprValidPhone(s) { return !s || /^[0-9+\-\s()]{3,18}$/.test(String(s).trim()); }
function eprValidUrl(s) { try { if(!s) return true; const u = new URL(s); return /^https?:$/.test(u.protocol); } catch(_) { return false; } }
function FieldError({ children }) {
  if (!children) return null;
  return <div role="alert" style={{fontSize:11,color:'var(--red,#B23838)',marginTop:4}}>{children}</div>;
}

// 1. General
function GeneralSettings() {
  const [g, setG] = asS(()=> eprLoadStore().general);
  const [dirty, setDirty] = asS(false);
  const set = (k,v) => { setG(prev=>({...prev,[k]:v})); setDirty(true); };
  const emailErr = !eprValidEmail(g.email) ? 'כתובת אימייל לא תקינה' : null;
  const phoneErr = !eprValidPhone(g.phone) ? 'מספר טלפון לא תקין' : null;
  const valid = !emailErr && !phoneErr && g.orgName.trim().length > 0;
  const save = () => {
    if (!valid) {
      window.eprToast && window.eprToast('יש לתקן את השדות שמסומנים באדום לפני שמירה', 'danger');
      return;
    }
    eprSaveSection('general', g);
    setDirty(false);
    window.eprToast && window.eprToast(`הגדרות "${g.orgName}" נשמרו`, 'success');
  };
  return (<>
    <div className="ep-card">
      <div className="ep-card-head"><div><div className="ep-card-eb">פרטי הארגון</div><h3 className="ep-card-title">מידע כללי</h3></div><button className="ep-btn ep-btn-primary ep-btn-sm" disabled={!dirty||!valid} onClick={save} data-toast="off">{dirty?'שמירה':'נשמר'}</button></div>
      <div className="ep-detail-grid">
        <div className="ep-field"><label>שם הארגון</label><input value={g.orgName} onChange={e=>set('orgName',e.target.value)} aria-invalid={!g.orgName.trim()}/>{!g.orgName.trim()&&<FieldError>שם הארגון נדרש</FieldError>}</div>
        <div className="ep-field"><label>מספר ח״פ</label><input value={g.taxId} onChange={e=>set('taxId',e.target.value)}/></div>
        <div className="ep-field"><label>טלפון מוקד</label><input value={g.phone} onChange={e=>set('phone',e.target.value)} style={{direction:'ltr'}} aria-invalid={!!phoneErr}/><FieldError>{phoneErr}</FieldError></div>
        <div className="ep-field"><label>אימייל ראשי</label><input value={g.email} onChange={e=>set('email',e.target.value)} style={{direction:'ltr'}} aria-invalid={!!emailErr}/><FieldError>{emailErr}</FieldError></div>
        <div className="ep-field full"><label>כתובת</label><input value={g.address} onChange={e=>set('address',e.target.value)}/></div>
        <div className="ep-field"><label>אזור זמן</label><select value={g.tz} onChange={e=>set('tz',e.target.value)}><option>Asia/Jerusalem</option><option>UTC</option></select></div>
        <div className="ep-field"><label>שפת ברירת מחדל</label><select value={g.lang} onChange={e=>set('lang',e.target.value)}><option value="he">עברית</option><option value="ar">العربية</option><option value="en">English</option><option value="ru">Русский</option></select></div>
      </div>
    </div>
    <div className="ep-card">
      <div className="ep-card-head"><div><div className="ep-card-eb">מערכת</div><h3 className="ep-card-title">ברירות מחדל ופורמטים</h3></div></div>
      <div className="ep-detail-grid">
        <div className="ep-field"><label>פורמט תאריך</label><select value={g.dateFmt} onChange={e=>set('dateFmt',e.target.value)}><option>DD/MM/YYYY</option><option>MM/DD/YYYY</option></select></div>
        <div className="ep-field"><label>שעה</label><select value={g.timeFmt} onChange={e=>set('timeFmt',e.target.value)}><option>24h</option><option>12h</option></select></div>
        <div className="ep-field"><label>מטבע</label><select value={g.currency} onChange={e=>set('currency',e.target.value)}><option>₪ ILS</option><option>$ USD</option></select></div>
        <div className="ep-field"><label>מספור פניות</label><input value={g.reqFmt} onChange={e=>set('reqFmt',e.target.value)}/></div>
      </div>
    </div>
  </>);
}

// 2. Business Calendar
function BusinessCalendarSettings() {
  const days=['ראשון','שני','שלישי','רביעי','חמישי','שישי','שבת'];
  return (<>
    <div className="ep-card">
      <div className="ep-card-head"><div><div className="ep-card-eb">שעות פעילות</div><h3 className="ep-card-title">שעות מוקד שבועיות</h3></div><button className="ep-btn ep-btn-primary ep-btn-sm" onClick={()=>window.eprToast && window.eprToast('שעות המוקד נשמרו', 'success')} data-toast="off">שמירה</button></div>
      <table className="ep-table">
        <thead><tr><th className="ep-th">יום</th><th className="ep-th">פעיל?</th><th className="ep-th">פתיחה</th><th className="ep-th">סגירה</th><th className="ep-th">הפסקה</th></tr></thead>
        <tbody>{days.map((d,i)=>(<tr key={d}><td><b>{d}</b></td><td><Toggle defaultChecked={i!==6}/></td><td><input style={{direction:'ltr',padding:'6px 10px',border:'1px solid var(--border)',borderRadius:6,width:90}} defaultValue={i===5?'08:00':'08:30'}/></td><td><input style={{direction:'ltr',padding:'6px 10px',border:'1px solid var(--border)',borderRadius:6,width:90}} defaultValue={i===5?'13:00':'17:30'}/></td><td className="ep-muted" style={{fontSize:12}}>13:00–14:00</td></tr>))}</tbody>
      </table>
    </div>
    <div className="ep-card">
      <div className="ep-card-head"><div><div className="ep-card-eb">חגים וחופשות</div><h3 className="ep-card-title">ימים שאינם נכללים ב-SLA</h3></div><button className="ep-btn ep-btn-ghost ep-btn-sm" onClick={()=>window.dispatchEvent(new CustomEvent('open-create-entity',{detail:{kind:'holiday'}}))}>+ הוסף יום</button></div>
      <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
        {['פסח (4 ימים)','שבועות','ראש השנה (2)','יום כיפור','סוכות (4)','חנוכה','פורים','עצמאות','ל״ג בעומר','ערב חג'].map(h=>(<span key={h} className="ep-tag" style={{padding:'7px 14px',fontSize:13}}>{h}<span style={{marginRight:6,opacity:.5,cursor:'pointer'}}>×</span></span>))}
      </div>
    </div>
  </>);
}

// 3. Organization
function OrganizationSettings() {
  const d = window.eprData;
  const I = window.EprIcon;
  return (<>
    <div className="ep-card">
      <div className="ep-card-head"><div><div className="ep-card-eb">יחידות ארגוניות</div><h3 className="ep-card-title">היררכיית מחלקות</h3></div><button className="ep-btn ep-btn-primary ep-btn-sm" onClick={()=>window.dispatchEvent(new CustomEvent('open-create-entity',{detail:{kind:'department'}}))}><I.plus width={12} height={12}/>מחלקה חדשה</button></div>
      <div style={{display:'flex',flexDirection:'column',gap:10}}>
        {d.departments.map(dep=>(
          <div key={dep.name} style={{display:'flex',alignItems:'center',gap:12,padding:'12px 14px',border:'1px solid var(--border)',borderRadius:8}}>
            <div style={{width:6,height:36,background:dep.color,borderRadius:3}}/>
            <div style={{flex:1}}><b>{dep.name}</b><div className="ep-muted" style={{fontSize:11,marginTop:2}}>{dep.open} פניות פתוחות · SLA {dep.sla}%</div></div>
            <button className="ep-btn ep-btn-ghost ep-btn-sm" onClick={()=>window.eprToast && window.eprToast(`רשימת הצוותים של "${dep.name}"`, 'info')} data-toast="off">צוותים</button>
            <button className="ep-icon-btn" style={{width:30,height:30}} title="ערוך" aria-label={`ערוך ${dep.name}`} onClick={()=>window.dispatchEvent(new CustomEvent('open-create-entity',{detail:{kind:'department'}}))} data-toast="off"><I.note width={13} height={13}/></button>
            <button className="ep-icon-btn" style={{width:30,height:30}} title="מחק" aria-label={`מחק ${dep.name}`} onClick={async()=>{
              const ok = window.eprConfirm
                ? await window.eprConfirm({ title:'מחיקת מחלקה', message:`המחלקה "${dep.name}" תוסר מהמערכת. פעולה זו תשפיע על השיוך של ${dep.open} פניות פתוחות. להמשיך?`, danger:true, confirmText:'מחק מחלקה' })
                : window.confirm(`למחוק את המחלקה "${dep.name}"?`);
              if (ok) window.eprToast && window.eprToast(`המחלקה "${dep.name}" נמחקה`, 'danger');
            }} data-toast="off"><I.close width={13} height={13}/></button>
          </div>
        ))}
      </div>
    </div>
    <div className="ep-card">
      <div className="ep-card-head"><div><div className="ep-card-eb">תפקידים</div><h3 className="ep-card-title">הגדרת תפקידים בארגון</h3></div></div>
      <div className="ep-row3" style={{gap:12}}>
        {[['מנהל מחלקה','עריכה מלאה',12],['ראש צוות','אישורים, שיבוץ',8],['רכז',' עריכה בסיסית',24],['מוקדן','קריאה ופתיחת פניות',18]].map(([t,p,n])=>(<div key={t} className="ep-feature"><b>{t}</b><p className="ep-muted" style={{margin:0,fontSize:12}}>{p}</p><div style={{fontSize:18,fontWeight:700,marginTop:6}}>{n} <span style={{fontSize:11,fontWeight:400,color:'var(--muted)'}}>משתמשים</span></div></div>))}
      </div>
    </div>
  </>);
}

// 4. Topics (Categories)
function TopicsSettings() {
  const I = window.EprIcon;
  const cats=[
    {n:'תשתיות וכבישים',sub:['מפגעי בטיחות','שלטי הכוונה','מהמורות','תאורת רחוב','איי תנועה'],color:'#0F968C'},
    {n:'סביבה וניקיון',sub:['פינוי גזם','פחים שבורים','פסולת מבולגנת','הדברה'],color:'#D4793A'},
    {n:'הנדסה ובנייה',sub:['היתרי בנייה','בנייה בלתי חוקית','אישורי תושב','ועדה מקומית'],color:'#7A6BD8'},
    {n:'גינון ואקולוגיה',sub:['השקיה','גיזום עצים','שתילת עצים','הסדרת גינות'],color:'#5B945C'},
    {n:'חינוך','sub':['הסעות','גנים','בתי ספר','קייטנות'],color:'#3D7BC8'},
  ];
  return (<>
    <div className="ep-card">
      <div className="ep-card-head"><div><div className="ep-card-eb">קטגוריות פניות</div><h3 className="ep-card-title">5 קטגוריות ראשיות · 23 תת-קטגוריות</h3></div><button className="ep-btn ep-btn-primary ep-btn-sm" onClick={()=>window.dispatchEvent(new CustomEvent('open-create-entity',{detail:{kind:'category'}}))}><I.plus width={12} height={12}/>קטגוריה חדשה</button></div>
      <div style={{display:'flex',flexDirection:'column',gap:14}}>
        {cats.map(c=>(
          <div key={c.n} style={{border:'1px solid var(--border)',borderRadius:9,overflow:'hidden'}}>
            <div style={{display:'flex',alignItems:'center',gap:12,padding:'10px 14px',background:c.color+'10',borderBottom:'1px solid var(--border)'}}>
              <div style={{width:10,height:10,borderRadius:'50%',background:c.color}}/>
              <b>{c.n}</b>
              <span className="ep-muted" style={{fontSize:11,marginRight:'auto'}}>{c.sub.length} תת-קטגוריות</span>
              <button className="ep-btn ep-btn-ghost ep-btn-sm" onClick={()=>window.dispatchEvent(new CustomEvent('open-create-entity',{detail:{kind:'category'}}))}>+ הוסף</button>
            </div>
            <div style={{display:'flex',flexWrap:'wrap',gap:6,padding:'10px 14px'}}>
              {c.sub.map(s=>(<span key={s} className="ep-tag" style={{fontSize:12}}>{s}</span>))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </>);
}

// 5. SLA
function SlaSettings() {
  const [rows, setRows] = asS(()=> eprLoadStore().sla.rows);
  const [dirty, setDirty] = asS(false);
  const updateRow = (i, k, v) => {
    setRows(prev => prev.map((r,idx)=> idx===i ? {...r,[k]:v} : r));
    setDirty(true);
  };
  const save = () => {
    eprSaveSection('sla', { rows });
    setDirty(false);
    window.eprToast && window.eprToast('הגדרות SLA נשמרו לכל ארבע העדיפויות', 'success');
  };
  const inputStyle = {padding:'6px 10px',border:'1px solid var(--border)',borderRadius:6,width:120};
  return (<>
    <div className="ep-card">
      <div className="ep-card-head"><div><div className="ep-card-eb">זמני יעד</div><h3 className="ep-card-title">SLA לפי עדיפות</h3></div><button className="ep-btn ep-btn-primary ep-btn-sm" disabled={!dirty} onClick={save} data-toast="off">{dirty?'שמירה':'נשמר'}</button></div>
      <table className="ep-table">
        <thead><tr><th className="ep-th">עדיפות</th><th className="ep-th">זמן תגובה ראשונה</th><th className="ep-th">זמן פתרון</th><th className="ep-th">אסקלציה לאחר</th><th className="ep-th">צבע</th></tr></thead>
        <tbody>
          {rows.map((r,i)=>(
            <tr key={r.label}>
              <td><span className="ep-pri"><span className="ep-pri-dot" style={{background:r.color}}/>{r.label}</span></td>
              <td><input value={r.first} onChange={e=>updateRow(i,'first',e.target.value)} style={inputStyle}/></td>
              <td><input value={r.resolve} onChange={e=>updateRow(i,'resolve',e.target.value)} style={inputStyle}/></td>
              <td><input value={r.esc} onChange={e=>updateRow(i,'esc',e.target.value)} style={inputStyle}/></td>
              <td>
                <label title="בחר צבע" style={{display:'inline-flex',alignItems:'center',gap:6,cursor:'pointer'}}>
                  <input type="color" value={r.color} onChange={e=>updateRow(i,'color',e.target.value)} style={{width:0,height:0,opacity:0,position:'absolute'}} aria-label={`צבע עבור ${r.label}`}/>
                  <span style={{width:24,height:24,background:r.color,borderRadius:4,border:'1px solid var(--border)',display:'inline-block'}}/>
                  <span className="ep-mono ep-muted" style={{fontSize:11}}>{r.color.toUpperCase()}</span>
                </label>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div className="ep-card">
      <div className="ep-card-head"><div><div className="ep-card-eb">חריגות</div><h3 className="ep-card-title">התרעות אסקלציה</h3></div></div>
      <div style={{display:'flex',flexDirection:'column',gap:10}}>
        {[['התראה לראש צוות',true],['העלאת עדיפות אוטומטית',true],['מייל לפונה על עיכוב',false],['דיווח יומי למנהלי מחלקות',true]].map(([t,c])=>(<div key={t} className="row"><Toggle defaultChecked={c}/><span style={{fontSize:14}}>{t}</span></div>))}
      </div>
    </div>
  </>);
}

// 6. Forms
function FormsSettings() {
  const I = window.EprIcon;
  return (<div className="ep-card">
    <div className="ep-card-head"><div><div className="ep-card-eb">טפסי פנייה</div><h3 className="ep-card-title">8 טפסים פעילים</h3></div><button className="ep-btn ep-btn-primary ep-btn-sm" onClick={()=>window.dispatchEvent(new Event('open-form-builder'))}><I.plus width={12} height={12}/>טופס חדש</button></div>
    <table className="ep-table"><thead><tr><th className="ep-th">שם הטופס</th><th className="ep-th">קטגוריה</th><th className="ep-th">שדות</th><th className="ep-th">פעיל?</th><th className="ep-th">שימוש (חודש)</th><th className="ep-th"></th></tr></thead>
      <tbody>{[['דיווח מפגע','תשתיות',8,true,182],['בקשת היתר בנייה','הנדסה',24,true,46],['פינוי גזם','סביבה',5,true,210],['השקיה','גינון',6,true,32],['בעיית הסעות','חינוך',7,true,18],['הצעת ייעול','כללי',4,true,9],['תלונה רשמית','כללי',12,false,24],['תקלת תאורה','תשתיות',5,true,58]].map(([n,c,f,a,u])=>(<tr key={n}><td><b>{n}</b></td><td><span className="ep-tag">{c}</span></td><td>{f} שדות</td><td><Toggle defaultChecked={a}/></td><td><b>{u}</b></td><td className="end"><button className="ep-btn ep-btn-ghost ep-btn-sm" onClick={()=>window.dispatchEvent(new Event('open-form-builder'))} data-toast="off">עריכה</button></td></tr>))}</tbody>
    </table>
  </div>);
}

// 7. Channels
function ChannelsSettings() {
  const I=window.EprIcon;
  const ch=[['טלפון',true,42,'phone'],['אפליקציה',true,28,'phone'],['אתר עירייה',true,18,'doc'],['SMS',true,7,'msg'],['Email',true,3,'mail'],['וואטסאפ',false,0,'msg'],['מוקד 106',true,2,'phone']];
  return (<div className="ep-card">
    <div className="ep-card-head"><div><div className="ep-card-eb">ערוצי קבלת פניות</div><h3 className="ep-card-title">חיבור פניות נכנסות</h3></div></div>
    <div style={{display:'flex',flexDirection:'column',gap:10}}>
      {ch.map(([n,a,p,ic])=>(<div key={n} style={{display:'flex',alignItems:'center',gap:12,padding:'12px 14px',border:'1px solid var(--border)',borderRadius:8}}>
        <div className="ep-feed-ic">{ic==='phone'?<I.phone/>:ic==='mail'?<I.mail/>:ic==='msg'?<I.msg/>:<I.doc/>}</div>
        <div style={{flex:1}}><b>{n}</b><div className="ep-muted" style={{fontSize:11,marginTop:2}}>{a?`${p}% מהפניות הנכנסות`:'לא פעיל'}</div></div>
        <Toggle defaultChecked={a}/>
        <button className="ep-btn ep-btn-ghost ep-btn-sm" onClick={()=>window.eprToast && window.eprToast(`קונפיגורציה של "${n}" נפתחה`, 'info')} data-toast="off">קונפיגורציה</button>
      </div>))}
    </div>
  </div>);
}

// 8. Auto Routing
function RoutingSettings() {
  return (<>
    <div className="ep-card">
      <div className="ep-card-head"><div><div className="ep-card-eb">חוקי ניתוב</div><h3 className="ep-card-title">12 חוקים פעילים</h3></div><button className="ep-btn ep-btn-primary ep-btn-sm" onClick={()=>window.dispatchEvent(new CustomEvent('open-create-entity',{detail:{kind:'rule'}}))}>+ חוק חדש</button></div>
      <table className="ep-table">
        <thead><tr><th className="ep-th">#</th><th className="ep-th">תנאי</th><th className="ep-th">פעולה</th><th className="ep-th">פעיל</th></tr></thead>
        <tbody>{[
          ['קטגוריה = מפגעי בטיחות','שיוך אוטומטי לתשתיות + עדיפות גבוהה'],
          ['מילים: ״סכנת חיים״','עדיפות דחוף + התראה למנהל'],
          ['ערוץ = SMS','תיוג כ״טלפוני״ + ראש מוקד'],
          ['VIP = כן','מנהל המחלקה ישירות'],
          ['אזור גיאוגרפי = רובע מזרחי','שיוך לרכז רובע איתן בן-דוד'],
          ['תושב פנה > 3 פעמים','אסקלציה אוטומטית'],
        ].map((r,i)=>(<tr key={i}><td className="ep-mono">#{i+1}</td><td>{r[0]}</td><td className="ep-muted">{r[1]}</td><td><Toggle defaultChecked={i!==5}/></td></tr>))}</tbody>
      </table>
    </div>
  </>);
}

// 9. Templates
function TemplatesSettings() {
  return (<div className="ep-card">
    <div className="ep-card-head"><div><div className="ep-card-eb">תבניות הודעה</div><h3 className="ep-card-title">SMS, Email ופוש</h3></div><button className="ep-btn ep-btn-primary ep-btn-sm" onClick={()=>window.dispatchEvent(new CustomEvent('open-create-entity',{detail:{kind:'template'}}))}>+ תבנית</button></div>
    <table className="ep-table"><thead><tr><th className="ep-th">שם</th><th className="ep-th">סוג</th><th className="ep-th">משתנים</th><th className="ep-th">שימוש</th></tr></thead>
      <tbody>{[['פתיחת פנייה','SMS','{name}, {ref}',1842],['עדכון סטטוס','Email','{name}, {status}, {clerk}',1108],['סגירת פנייה','SMS','{name}, {ref}',1320],['חריגת SLA - מנהל','Email','{ref}, {dept}, {hours}',92],['התראה לרכז','Push','{ref}, {priority}',428],['תזכורת תשלום','SMS','{name}, {amount}, {due}',512]].map(t=>(<tr key={t[0]}><td><b>{t[0]}</b></td><td><span className="ep-tag">{t[1]}</span></td><td className="ep-mono ep-muted" style={{fontSize:11}}>{t[2]}</td><td><b>{t[3].toLocaleString('he-IL')}</b></td></tr>))}</tbody>
    </table>
  </div>);
}

// 10. Integrations
function IntegrationsSettings() {
  const I = window.EprIcon;
  const ints=[
    {n:'מערכת תשלומים',d:'Pelecard payment gateway',s:true},
    {n:'GIS עירוני',d:'מפת רחובות וגושים',s:true},
    {n:'מערכת אוכלוסין',d:'אימות תושבים מול משרד הפנים',s:true},
    {n:'WhatsApp Business',d:'הודעות דו-כיווניות',s:false},
    {n:'מאסטר ארנונה',d:'נתוני נכסים ותשלומים',s:true},
    {n:'מערכת הנהלת חשבונות',d:'SAP Business One',s:true},
    {n:'Office 365',d:'סנכרון אימייל ויומן',s:false},
    {n:'Twilio SMS',d:'שליחת הודעות SMS',s:true},
  ];
  return (<div className="ep-card">
    <div className="ep-card-head"><div><div className="ep-card-eb">אינטגרציות</div><h3 className="ep-card-title">{ints.filter(i=>i.s).length}/{ints.length} מחוברים</h3></div><button className="ep-btn ep-btn-ghost ep-btn-sm" onClick={()=>window.dispatchEvent(new CustomEvent('open-create-entity',{detail:{kind:'integration'}}))}>+ הוסף אינטגרציה</button></div>
    <div className="ep-row2" style={{gap:12}}>
      {ints.map(it=>(<div key={it.n} style={{padding:14,border:'1px solid var(--border)',borderRadius:9,display:'flex',alignItems:'center',gap:14}}>
        <div className={`ep-feed-ic ic-${it.s?'check':'x'}`}>{it.s?<I.check/>:<I.close/>}</div>
        <div style={{flex:1,minWidth:0}}><b>{it.n}</b><div className="ep-muted" style={{fontSize:11,marginTop:2}}>{it.d}</div></div>
        <span className={`ep-tag ${it.s?'green':'slate'}`}>{it.s?'מחובר':'לא פעיל'}</span>
        <button className="ep-btn ep-btn-ghost ep-btn-sm" onClick={()=>{
          if (it.s) window.eprToast && window.eprToast(`הגדרות "${it.n}" נפתחו`, 'info');
          else window.dispatchEvent(new CustomEvent('open-create-entity',{detail:{kind:'integration'}}));
        }} data-toast="off">{it.s?'הגדרות':'חיבור'}</button>
      </div>))}
    </div>
  </div>);
}

// 11. Security
function SecuritySettings() {
  return (<>
    <div className="ep-card">
      <div className="ep-card-head"><div><div className="ep-card-eb">אבטחה</div><h3 className="ep-card-title">מדיניות סיסמה</h3></div></div>
      <div className="ep-detail-grid">
        <div className="ep-field"><label>אורך מינימלי</label><input defaultValue="10"/></div>
        <div className="ep-field"><label>תוקף סיסמה (ימים)</label><input defaultValue="90"/></div>
        <div className="ep-field"><label>היסטוריית סיסמאות</label><input defaultValue="5"/></div>
        <div className="ep-field"><label>נעילה לאחר ניסיונות</label><input defaultValue="5"/></div>
      </div>
      <div style={{display:'flex',flexDirection:'column',gap:10,marginTop:8}}>
        {[['מורכבות סיסמה (אותיות גדולות + מספרים + סימנים)',true],['אימות דו-שלבי (2FA) חובה למנהלים',true],['SSO (Single Sign-On) דרך SAML',true],['חסימה אוטומטית לאחר 30 דק׳ חוסר פעילות',true],['CAPTCHA בהתחברות',false]].map(([t,c])=>(<div key={t} className="row"><Toggle defaultChecked={c}/><span style={{fontSize:14}}>{t}</span></div>))}
      </div>
    </div>
    <div className="ep-card">
      <div className="ep-card-head"><div><div className="ep-card-eb">הרשאות</div><h3 className="ep-card-title">מטריצת תפקידים</h3></div></div>
      <table className="ep-table"><thead><tr><th className="ep-th">פעולה</th><th className="ep-th">מנהל</th><th className="ep-th">ראש צוות</th><th className="ep-th">רכז</th><th className="ep-th">מוקדן</th></tr></thead>
        <tbody>{[['צפייה בפניות',1,1,1,1],['עריכת פניות',1,1,1,0],['מחיקת פניות',1,0,0,0],['אישור תקציבים',1,1,0,0],['הוספת משתמשים',1,0,0,0],['שינוי הגדרות',1,0,0,0],['ייצוא דוחות',1,1,1,0]].map(r=>(<tr key={r[0]}><td>{r[0]}</td>{r.slice(1).map((v,i)=>(<td key={i}>{v?<span style={{color:'var(--green)'}}>✓</span>:<span style={{color:'var(--border-dark)'}}>—</span>}</td>))}</tr>))}</tbody>
      </table>
    </div>
  </>);
}

// 12. Notifications
function NotificationsSettings() {
  return (<div className="ep-card">
    <div className="ep-card-head"><div><div className="ep-card-eb">התראות</div><h3 className="ep-card-title">מי מקבל מה</h3></div></div>
    <table className="ep-table"><thead><tr><th className="ep-th">אירוע</th><th className="ep-th">Email</th><th className="ep-th">SMS</th><th className="ep-th">Push</th><th className="ep-th">מערכת</th></tr></thead>
      <tbody>{[['פנייה חדשה',1,0,1,1],['חריגת SLA',1,1,1,1],['הקצאה אישית',0,0,1,1],['סגירת פנייה',1,0,0,1],['תגובה מתושב',0,0,1,1],['דוח שבועי',1,0,0,0],['התראת מערכת',1,1,1,1],['בקשת הצטרפות חדשה',1,0,0,1]].map(r=>(<tr key={r[0]}><td>{r[0]}</td>{r.slice(1).map((v,i)=>(<td key={i}><Toggle defaultChecked={v===1}/></td>))}</tr>))}</tbody>
    </table>
  </div>);
}

// 13. Branding
function BrandingSettings() {
  const palette = ['#0F968C','#3D7BC8','#7A6BD8','#D4793A','#5B945C','#E15454','#1A2D2E','#2AA7B8'];
  const [b, setB] = asS(()=> eprLoadStore().branding);
  const [dirty, setDirty] = asS(false);
  const fileRef = asR(null);

  // Live preview: apply changes to CSS variable immediately
  asE(()=>{ eprApplyBranding(b); }, [b.accent, b.logoDataUrl]);

  const set = (k,v) => { setB(prev=>({...prev,[k]:v})); setDirty(true); };

  const onLogoFile = (e) => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    if (!/^image\//.test(f.type)) {
      window.eprToast && window.eprToast('יש לבחור קובץ תמונה (PNG / SVG / JPG)', 'danger');
      return;
    }
    if (f.size > 2 * 1024 * 1024) {
      window.eprToast && window.eprToast('הקובץ חורג מ-2MB', 'danger');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result;
      const ext = (f.name.split('.').pop()||'').toUpperCase();
      const img = new Image();
      img.onload = () => {
        setB(prev=>({
          ...prev,
          logoDataUrl: dataUrl,
          logoName: f.name,
          logoSize: `${img.naturalWidth}×${img.naturalHeight}px · ${ext}`,
        }));
        setDirty(true);
        window.eprToast && window.eprToast(`לוגו ${f.name} נטען לתצוגה מקדימה — לחץ שמירה כדי לאשר`, 'info');
      };
      img.onerror = () => {
        setB(prev=>({ ...prev, logoDataUrl:dataUrl, logoName:f.name, logoSize:`${(f.size/1024).toFixed(0)}KB · ${ext}` }));
        setDirty(true);
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(f);
    e.target.value = '';
  };

  const removeLogo = () => {
    setB(prev=>({...prev, logoDataUrl:null, logoName:'(אין לוגו מותאם)', logoSize:'משתמש בברירת המחדל'}));
    setDirty(true);
  };

  const save = () => {
    eprSaveSection('branding', b);
    eprApplyBranding(b);
    setDirty(false);
    window.eprToast && window.eprToast(`המיתוג נשמר — צבע ראשי ${b.accent.toUpperCase()}`, 'success');
  };

  const reset = () => {
    const defaults = JSON.parse(JSON.stringify(EPR_DEFAULTS.branding));
    setB(defaults);
    eprSaveSection('branding', defaults);
    eprApplyBranding(defaults);
    setDirty(false);
    window.eprToast && window.eprToast('המיתוג שוחזר לברירת המחדל', 'info');
  };

  return (<>
    <div className="ep-card">
      <div className="ep-card-head">
        <div><div className="ep-card-eb">מיתוג</div><h3 className="ep-card-title">לוגו וצבעים</h3></div>
        <div className="row">
          <button className="ep-btn ep-btn-ghost ep-btn-sm" onClick={reset} data-toast="off">איפוס</button>
          <button className="ep-btn ep-btn-primary ep-btn-sm" disabled={!dirty} onClick={save} data-toast="off">{dirty?'שמירה':'נשמר'}</button>
        </div>
      </div>
      <div className="ep-detail-grid">
        <div className="ep-field full">
          <label>לוגו ארגון</label>
          <input ref={fileRef} type="file" accept="image/png,image/svg+xml,image/jpeg,image/webp" onChange={onLogoFile} style={{display:'none'}} aria-label="העלאת קובץ לוגו"/>
          <div style={{display:'flex',alignItems:'center',gap:12,padding:14,border:'1.5px dashed var(--border-dark)',borderRadius:8,background:'var(--cream)'}}>
            <div className="ep-logo" style={{background:b.accent, overflow:'hidden'}}>
              {b.logoDataUrl
                ? <img src={b.logoDataUrl} alt="לוגו" style={{width:'100%',height:'100%',objectFit:'contain',display:'block'}}/>
                : '🏛'}
            </div>
            <div style={{flex:1,minWidth:0}}>
              <b style={{fontSize:13}}>{b.logoName}</b>
              <div className="ep-muted" style={{fontSize:11}}>{b.logoSize}</div>
            </div>
            {b.logoDataUrl && <button className="ep-btn ep-btn-ghost ep-btn-sm" onClick={removeLogo} data-toast="off">הסר</button>}
            <button className="ep-btn ep-btn-ghost ep-btn-sm" onClick={()=>fileRef.current && fileRef.current.click()} data-toast="off">{b.logoDataUrl?'החלף':'העלה לוגו'}</button>
          </div>
        </div>

        <div className="ep-field full">
          <label>צבע עיקרי <span className="ep-muted ep-mono" style={{fontSize:11,fontWeight:400}}>{b.accent.toUpperCase()}</span></label>
          <div style={{display:'flex',gap:8,flexWrap:'wrap',marginTop:4,alignItems:'center'}}>
            {palette.map(c=>(
              <button key={c} type="button" aria-label={`בחר צבע ${c}`} title={c}
                onClick={()=>set('accent',c)} data-toast="off"
                style={{width:30,height:30,borderRadius:6,background:c,cursor:'pointer',transition:'transform .12s',
                        border:b.accent===c?'3px solid var(--text)':'1px solid var(--border)',
                        transform:b.accent===c?'scale(1.08)':'scale(1)'}}/>
            ))}
            <label title="בחר צבע מותאם" style={{display:'inline-flex',alignItems:'center',gap:6,padding:'4px 10px',border:'1px dashed var(--border-dark)',borderRadius:6,cursor:'pointer',fontSize:12}}>
              <input type="color" value={b.accent} onChange={e=>set('accent',e.target.value)} style={{width:24,height:24,border:'none',padding:0,cursor:'pointer',background:'transparent'}} aria-label="בחר צבע מותאם"/>
              <span>צבע מותאם</span>
            </label>
          </div>
        </div>

        <div className="ep-field"><label>שם אפליקציה (פורטל תושב)</label><input value={b.appName} onChange={e=>set('appName',e.target.value)}/></div>
        <div className="ep-field"><label>סלוגן</label><input value={b.slogan} onChange={e=>set('slogan',e.target.value)}/></div>

        <div className="ep-field full">
          <label>תצוגה מקדימה</label>
          <div style={{padding:'18px 20px',borderRadius:10,background:'linear-gradient(135deg, '+b.accent+' 0%, '+b.accent+'cc 100%)',color:'#fff',display:'flex',alignItems:'center',gap:14}}>
            <div style={{width:48,height:48,borderRadius:10,background:'rgba(255,255,255,.18)',display:'grid',placeItems:'center',overflow:'hidden',fontSize:22,fontWeight:800}}>
              {b.logoDataUrl
                ? <img src={b.logoDataUrl} alt="" style={{width:'100%',height:'100%',objectFit:'contain'}}/>
                : 'E'}
            </div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:16,fontWeight:700,letterSpacing:'-.01em'}}>{b.appName||'שם אפליקציה'}</div>
              <div style={{fontSize:12,opacity:.9}}>{b.slogan||'סלוגן'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="ep-card">
      <div className="ep-card-head"><div><div className="ep-card-eb">פורטל תושב</div><h3 className="ep-card-title">מה התושב רואה</h3></div></div>
      <div className="ep-row3" style={{gap:12}}>
        {[['דף פניות','פתיחה ומעקב פניות',true],['דף מסמכים','אישורים והיתרים',true],['דף תשלומים','ארנונה ומיסים',true],['דף אירועים','אירועי עיר ופעילויות',false],['פורום קהילה','דיון בין תושבים',false],['פניית VIP','חבר מועצה / יועץ',true]].map(([n,d,a])=>(<div key={n} className="ep-feature"><div className="row"><b style={{flex:1}}>{n}</b><Toggle defaultChecked={a}/></div><p className="ep-muted" style={{margin:0,fontSize:12}}>{d}</p></div>))}
      </div>
    </div>
  </>);
}

// 14. Audit
function AuditSettings() {
  const events=[
    {t:'08:42',u:'מיכל כהן',a:'התחברות למערכת','d':'IP 10.0.5.21',k:'login'},
    {t:'08:51',u:'מיכל כהן',a:'שינוי הגדרות SLA','d':'עדיפות גבוה: 24→18 שעות',k:'edit'},
    {t:'09:14',u:'אריאל כהן',a:'פתיחת פנייה',d:'REQ-2026-1182',k:'create'},
    {t:'09:23',u:'נועה לביא',a:'שיוך פנייה',d:'REQ-2026-1175 → רחל מאיר',k:'edit'},
    {t:'09:45',u:'מערכת',a:'אסקלציה אוטומטית',d:'REQ-2026-1140 — חריגה',k:'alert'},
    {t:'10:12',u:'מיכל כהן',a:'אישור הוספת משתמש',d:'תמר אבני (מנהל מחלקה)',k:'add'},
    {t:'10:33',u:'אדם דביר',a:'ייצוא דוח',d:'דוח עומסים שבועי · Excel',k:'export'},
    {t:'11:02',u:'מיכל כהן',a:'מחיקת חוק ניתוב',d:'חוק #14 — מיותר',k:'delete'},
  ];
  const I=window.EprIcon;
  const colors={login:'#3D7BC8',edit:'#0F968C',create:'#5B945C',alert:'#E15454',add:'#7A6BD8',export:'#D4793A',delete:'#B23838'};
  return (<>
    <div className="ep-card">
      <div className="ep-card-head"><div><div className="ep-card-eb">יומן ביקורת</div><h3 className="ep-card-title">פעילות היום במערכת · 247 אירועים</h3></div><div className="row"><button className="ep-btn ep-btn-ghost ep-btn-sm"><I.filter width={12} height={12}/>סינון</button><button className="ep-btn ep-btn-ghost ep-btn-sm"><I.download width={12} height={12}/>ייצוא</button></div></div>
      <table className="ep-table"><thead><tr><th className="ep-th">שעה</th><th className="ep-th">משתמש</th><th className="ep-th">פעולה</th><th className="ep-th">פרטים</th></tr></thead>
        <tbody>{events.map((e,i)=>(<tr key={i}><td className="ep-mono">{e.t}</td><td>{e.u}</td><td><span className="ep-tag" style={{background:colors[e.k]+'18',color:colors[e.k]}}>{e.a}</span></td><td className="ep-muted" style={{fontSize:12.5}}>{e.d}</td></tr>))}</tbody>
      </table>
    </div>
  </>);
}

// Toggle component
function Toggle({ defaultChecked }) {
  const [on,setOn]=asS(defaultChecked||false);
  return <button onClick={()=>setOn(!on)} aria-pressed={on} style={{position:'relative',width:36,height:20,borderRadius:10,border:'1px solid '+(on?'var(--accent)':'var(--border-dark)'),background:on?'var(--accent)':'#fff',cursor:'pointer',flexShrink:0,transition:'all .15s'}}><span style={{position:'absolute',top:1,right:on?1:17,width:16,height:16,borderRadius:'50%',background:'#fff',boxShadow:'0 1px 2px rgba(0,0,0,.2)',transition:'right .15s'}}/></button>;
}

// ── Users Management ─────────────────────────────────────────────
function UsersPage() {
  const d=window.eprData; const I=window.EprIcon;
  const [tab,setTab]=asS('active'); const [q,setQ]=asS('');
  const [hidden, setHidden] = asS(()=> {
    try { return JSON.parse(localStorage.getItem('epr-users-hidden')||'{}'); } catch(_) { return {}; }
  });
  const persistHidden = (next) => {
    setHidden(next);
    try { localStorage.setItem('epr-users-hidden', JSON.stringify(next)); } catch(_) {}
  };
  const approve = (u) => {
    persistHidden({...hidden, [u.email]:'approved'});
    window.eprToast && window.eprToast(`${u.name} אושר/ה — נשלחה הזמנה ל-${u.email}`, 'success');
  };
  const reject = async (u) => {
    const ok = window.eprConfirm
      ? await window.eprConfirm({ title:'דחיית בקשת הצטרפות', message:`בקשת ההצטרפות של ${u.name} (${u.email}) תידחה. ניתן לשלוח דחייה חדשה בכל עת.`, danger:true, confirmText:'דחה בקשה' })
      : window.confirm(`לדחות את הבקשה של ${u.name}?`);
    if (!ok) return;
    persistHidden({...hidden, [u.email]:'rejected'});
    window.eprToast && window.eprToast(`הבקשה של ${u.name} נדחתה`, 'danger');
  };
  const editUser = (u) => {
    window.eprToast && window.eprToast(`עריכת המשתמש "${u.name}" נפתחה`, 'info');
  };
  const visible = (u) => !hidden[u.email];
  const list = tab==='pending'
    ? d.users.filter(u=>!u.active && visible(u))
    : d.users.filter(u=>u.active && visible(u));
  const filtered = q ? list.filter(u=>u.name.includes(q)||u.email.includes(q)) : list;
  return (<>
    <PageHeader title="ניהול משתמשים" icon="users" subtitle={`${d.users.filter(u=>u.active).length} פעילים · ${d.users.filter(u=>!u.active).length} ממתינים לאישור`} actions={<><button className="ep-btn ep-btn-ghost"><I.download width={14} height={14}/>ייצוא</button><button className="ep-btn ep-btn-primary" onClick={()=>window.dispatchEvent(new CustomEvent('open-create-entity',{detail:{kind:'user'}}))}><I.plus width={14} height={14}/>משתמש חדש</button></>}/>
    <div className="row">
      <div className="ep-tabs">
        <button className={tab==='active'?'active':''} onClick={()=>setTab('active')}>פעילים ({d.users.filter(u=>u.active).length})</button>
        <button className={tab==='pending'?'active':''} onClick={()=>setTab('pending')}>ממתינים ({d.users.filter(u=>!u.active).length})</button>
      </div>
      <div className="end"><div className="ep-input-wrap"><I.search width={14} height={14}/><input placeholder="חיפוש משתמש…" value={q} onChange={e=>setQ(e.target.value)}/></div></div>
    </div>
    <section className="ep-card">
      {filtered.length===0 ? (
        <window.EmptyState icon="users" title={tab==='pending'?'אין משתמשים שממתינים לאישור':'לא נמצאו משתמשים'} hint={q?`לא נמצאו תוצאות עבור "${q}"`:'הכל בסדר כאן'} action={q&&<button className="ep-btn ep-btn-ghost ep-btn-sm" onClick={()=>setQ('')} data-toast="off">נקה חיפוש</button>}/>
      ) : (
      <div className="ep-table-wrap"><table className="ep-table"><thead><tr><th className="ep-th">שם</th><th className="ep-th">תפקיד</th><th className="ep-th">מחלקה</th><th className="ep-th">אימייל</th><th className="ep-th">כניסה אחרונה</th><th className="ep-th">פניות</th><th className="ep-th">SLA</th><th className="ep-th">סטטוס</th><th className="ep-th"></th></tr></thead><tbody>
        {filtered.map(u=>(
          <tr key={u.email} className="ep-row">
            <td><div style={{display:'flex',alignItems:'center',gap:10}}><div className="ep-avatar" style={{width:30,height:30,fontSize:11}}>{u.avatar}</div><div><b>{u.name}</b></div></div></td>
            <td><span className="ep-tag">{u.role}</span></td>
            <td>{u.dept}</td>
            <td className="ep-muted" style={{direction:'ltr',textAlign:'end'}}>{u.email}</td>
            <td className="ep-muted">{u.last}</td>
            <td><b>{u.handled}</b></td>
            <td>{u.sla>0?<span className={`ep-dept-sla ${u.sla>=92?'good':'ok'}`}>{u.sla}%</span>:<span className="ep-muted">—</span>}</td>
            <td>{u.active?<span className="ep-tag green">פעיל</span>:<span className="ep-tag amber">ממתין</span>}</td>
            <td className="end">{u.active?<button className="ep-btn ep-btn-ghost ep-btn-sm" onClick={()=>editUser(u)} data-toast="off">ערוך</button>:<><button className="ep-btn ep-btn-primary ep-btn-sm" onClick={()=>approve(u)} data-toast="off">אשר</button><button className="ep-btn ep-btn-ghost ep-btn-sm" onClick={()=>reject(u)} data-toast="off">דחה</button></>}</td>
          </tr>
        ))}
      </tbody></table></div>
      )}
    </section>
  </>);
}

// ── Saved Reports / My Reports ────────────────────────────────
function SavedReportsPage() {
  const I=window.EprIcon;
  const reports=[
    {n:'דוח SLA שבועי לפי מחלקה',cat:'ביצועים',owner:'מיכל כהן',shared:8,run:482,upd:'אתמול'},
    {n:'פניות פתוחות מעל 5 ימים',cat:'תפעול',owner:'נועה לביא',shared:5,run:294,upd:'לפני 3 ימים'},
    {n:'תפוקת מוקדנים חודשי',cat:'ביצועים',owner:'תמר אבני',shared:12,run:618,upd:'היום'},
    {n:'פניות לפי שכונה',cat:'גיאוגרפי',owner:'מיכל כהן',shared:3,run:128,upd:'לפני שבוע'},
    {n:'מעקב תשתיות שבועי',cat:'תפעול',owner:'אדם דביר',shared:7,run:340,upd:'לפני 2 ימים'},
    {n:'פניות חוזרות מאותו תושב',cat:'תושבים',owner:'תמר אבני',shared:4,run:112,upd:'לפני 4 ימים'},
    {n:'ערוצי כניסה לפי שעה ביום',cat:'תפעול',owner:'מיכל כהן',shared:6,run:78,upd:'לפני שבועיים'},
    {n:'דוח שביעות רצון תושבים',cat:'תושבים',owner:'נועה לביא',shared:14,run:920,upd:'אתמול'},
    {n:'אסקלציות פעילות',cat:'SLA',owner:'מיכל כהן',shared:9,run:218,upd:'היום'},
  ];
  return (<>
    <PageHeader title="דוחות שמורים" icon="chart" subtitle="ספריית דוחות מוכנים שמשותפים על פני המערכת" actions={<><button className="ep-btn ep-btn-ghost"><I.filter width={14} height={14}/>קטגוריה</button><button className="ep-btn ep-btn-primary" onClick={()=>window.dispatchEvent(new Event('open-report-builder'))}><I.plus width={14} height={14}/>דוח חדש</button></>}/>
    <section className="ep-card">
      <div className="ep-table-wrap"><table className="ep-table"><thead><tr><th className="ep-th">שם הדוח</th><th className="ep-th">קטגוריה</th><th className="ep-th">בעלים</th><th className="ep-th">משותף ל-</th><th className="ep-th">הופעל (חודש)</th><th className="ep-th">עודכן</th><th className="ep-th"></th></tr></thead><tbody>
        {reports.map(r=>(
          <tr key={r.n} className="ep-row">
            <td><div style={{display:'flex',alignItems:'center',gap:10}}><div className="ep-feed-ic ic-report" style={{width:28,height:28}}><I.chart width={13} height={13}/></div><b>{r.n}</b></div></td>
            <td><span className="ep-tag">{r.cat}</span></td>
            <td>{r.owner}</td>
            <td>{r.shared} משתמשים</td>
            <td><b>{r.run}</b></td>
            <td className="ep-muted">{r.upd}</td>
            <td className="end"><button className="ep-btn ep-btn-ghost ep-btn-sm" onClick={()=>window.eprToast && window.eprToast(`הדוח "${r.n}" הופעל — תוצאות יישלחו במייל`, 'success')} data-toast="off">הפעל</button><button className="ep-btn ep-btn-ghost ep-btn-sm" onClick={()=>window.dispatchEvent(new Event('open-report-builder'))} data-toast="off">ערוך</button></td>
          </tr>
        ))}
      </tbody></table></div>
    </section>
  </>);
}

function MyReportsPage() {
  const I=window.EprIcon;
  const reports=[
    {n:'הפניות שלי השבוע',type:'אישי',run:42,sched:'יומי 08:00',upd:'היום'},
    {n:'התראות SLA פתוחות',type:'התראה',run:128,sched:'בזמן אמת',upd:'לפני שעה'},
    {n:'פניות לפי תושב VIP',type:'אישי',run:18,sched:'שבועי שני',upd:'אתמול'},
    {n:'דוח חודשי למנהל',type:'מתוזמן',run:6,sched:'1 לחודש',upd:'1 באפריל'},
    {n:'פניות חורגות בצוות שלי',type:'אישי',run:84,sched:'יומי 16:00',upd:'היום'},
  ];
  return (<>
    <PageHeader title="הדוחות שלי" icon="chart" subtitle="דוחות אישיים, תזמונים והתראות שיצרת" actions={<><button className="ep-btn ep-btn-ghost"><I.download width={14} height={14}/>ייצוא</button><button className="ep-btn ep-btn-primary" onClick={()=>window.dispatchEvent(new Event('open-report-builder'))}><I.plus width={14} height={14}/>דוח חדש</button></>}/>
    <div className="ep-kpis">
      {[['דוחות פעילים','12','+3'],['מתוזמנים','5','+1'],['התראות פעילות','8','-1'],['הפעלות החודש','278','+42']].map(([k,v,dlt],i)=>(<div key={i} className="ep-kpi"><div className="ep-kpi-head"><span className="ep-kpi-lbl">{k}</span><span className={`ep-delta ${dlt.startsWith('-')?'dn':'up'}`}>{dlt}</span></div><div className="ep-kpi-val">{v}</div></div>))}
    </div>
    <section className="ep-card">
      <div className="ep-table-wrap"><table className="ep-table"><thead><tr><th className="ep-th">שם</th><th className="ep-th">סוג</th><th className="ep-th">תזמון</th><th className="ep-th">הפעלות</th><th className="ep-th">עודכן</th><th className="ep-th"></th></tr></thead><tbody>
        {reports.map(r=>(<tr key={r.n} className="ep-row"><td><b>{r.n}</b></td><td><span className={`ep-tag ${r.type==='התראה'?'amber':r.type==='מתוזמן'?'blue':'slate'}`}>{r.type}</span></td><td>{r.sched}</td><td><b>{r.run}</b></td><td className="ep-muted">{r.upd}</td><td className="end"><button className="ep-btn ep-btn-ghost ep-btn-sm" onClick={()=>window.eprToast && window.eprToast(`הדוח "${r.n}" הופעל`, 'success')} data-toast="off">הפעל</button></td></tr>))}
      </tbody></table></div>
    </section>
  </>);
}

// ── Reset Password ─────────────────────────────────────────────
function ResetPasswordPage({ goPage }) {
  const I=window.EprIcon;
  const [step,setStep]=asS('email');
  return (
    <div className="ep-login" style={{gridTemplateColumns:'1fr'}}>
      <div className="ep-login-form" style={{padding:'80px 60px'}}>
        <div className="ep-login-box" style={{margin:'0 auto'}}>
          <div className="ep-logo" style={{marginBottom:8}}>E</div>
          {step==='email' && (<>
            <div><div style={{fontSize:11,fontWeight:700,color:'var(--accent)',textTransform:'uppercase',letterSpacing:'.08em',marginBottom:6}}>איפוס סיסמה</div><h1>שכחת את הסיסמה?</h1><p style={{color:'var(--muted)',margin:'6px 0 0'}}>הזינו את כתובת המייל ונשלח אליכם קישור לאיפוס</p></div>
            <div className="ep-field"><label>אימייל</label><input type="email" placeholder="name@city.gov.il" defaultValue="michal@epr-muni.co.il"/></div>
            <button className="ep-btn ep-btn-primary" style={{padding:'12px 16px',justifyContent:'center'}} onClick={()=>setStep('sent')}>שלח קישור איפוס</button>
            <div style={{textAlign:'center',fontSize:13}}><a href="#" onClick={(e)=>{e.preventDefault();goPage('login')}} style={{color:'var(--accent)',fontWeight:500}}>← חזרה להתחברות</a></div>
          </>)}
          {step==='sent' && (<>
            <div style={{textAlign:'center'}}><div className="ep-feed-ic ic-check" style={{width:56,height:56,margin:'0 auto 12px'}}><I.check width={26} height={26}/></div><h1>בדוק את תיבת הדואר שלך</h1><p style={{color:'var(--muted)',margin:'6px 0 0'}}>שלחנו קישור איפוס ל-michal@epr-muni.co.il. הקישור תקף לשעה.</p></div>
            <button className="ep-btn ep-btn-ghost" style={{padding:'12px 16px',justifyContent:'center'}} onClick={()=>setStep('email')}>שלח שוב</button>
            <button className="ep-btn ep-btn-primary" style={{padding:'12px 16px',justifyContent:'center'}} onClick={()=>goPage('login')}>חזור להתחברות</button>
          </>)}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { AdminSettingsPage, UsersPage, SavedReportsPage, MyReportsPage, ResetPasswordPage });
