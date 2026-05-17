// epr/v2-pages.jsx — main pages: Dashboard, Requests, RequestDetail, Residents, Team, Bulk, Login, Pending
const { useState: pgS, useMemo: pgM } = React;

// ── Dashboard ───────────────────────────────────────────────────
function DashboardPage({ openRequest, goPage }) {
  const d = window.eprData; const I = window.EprIcon;
  const brand = window.useEprBranding ? window.useEprBranding() : {};
  if (window.useEprLang) window.useEprLang();
  const t = window.eprT || ((s)=>s);
  const kpis = [
    { k:t('פניות פתוחות'), v:d.stats.open.v, delta:d.stats.open.delta, spark:d.stats.open.spark, sub:t('מאתמול'), tone:'teal', low:false },
    { k:t('עמידה ב-SLA'), v:d.stats.sla.v+'%', delta:d.stats.sla.delta, spark:d.stats.sla.spark, sub:t('שבוע'), tone:'green', low:false },
    { k:t('זמן טיפול ממוצע'), v:d.stats.avg.v, unit:d.stats.avg.unit, delta:d.stats.avg.delta, spark:d.stats.avg.spark, sub:t('שיפור'), tone:'green', low:true },
    { k:t('פניות דחופות'), v:d.stats.urg.v, delta:d.stats.urg.delta, spark:d.stats.urg.spark, sub:t('שבוע'), tone:'amber', low:true },
  ];
  return (<>
    <section className="ep-hero">
      <div className="ep-hero-brand">
        <div className="ep-hero-logo" aria-hidden="true" style={brand.logoDataUrl?{backgroundImage:`url(${brand.logoDataUrl})`,backgroundSize:'contain',backgroundRepeat:'no-repeat',backgroundPosition:'center'}:undefined}/>
        <div className="ep-hero-brand-txt">
          <div className="ep-hero-brand-name">{brand.appName ? brand.appName.split(' - ')[0].split(' – ')[0] : 'EPR'}</div>
          <div className="ep-hero-brand-sub">{brand.slogan || t('הבית הדיגיטלי שלך')}</div>
        </div>
      </div>
      <div className="ep-hero-title">
        <h1>{t('שלום')} {d.me.name.split(' ')[0]}, <b>23 {t('פניות דחופות')}</b></h1>
        <p>{t('ניהול מוקד השירות של העיר במקום אחד.')}</p>
      </div>
      <div className="ep-hero-cta">
        <button className="ep-btn ep-btn-primary" onClick={()=>window.dispatchEvent(new Event('open-new-request'))}>{t('‹ פנייה חדשה')}</button>
        <button className="ep-btn ep-btn-ghost" onClick={()=>goPage('settings/business-calendar')}>{t('‹ יומן מלא')}</button>
      </div>
    </section>

    <section className="ep-kpis">
      {kpis.map((k,ki) => { const up=k.delta>0, good=(up && !k.low)||(!up && k.low);
        const targets = ['requests','requests','requests','requests'];
        return (
        <button key={k.k} className="ep-kpi" onClick={()=>goPage(targets[ki])}>
          <div className="ep-kpi-head"><span className="ep-kpi-lbl">{k.k}</span><span className={`ep-delta ${good?'up':'dn'}`}>{up?<I.up width={10} height={10}/>:<I.down width={10} height={10}/>}{Math.abs(k.delta)}%</span></div>
          <div className="ep-kpi-val">{k.v}{k.unit && <small>{k.unit}</small>}</div>
          <div className="ep-kpi-foot"><Sparkline data={k.spark} tone={k.tone} w={132} h={32}/><span className="ep-kpi-sub">{k.sub}</span></div>
        </button>
      )})}
    </section>

    <WidgetsGrid goPage={goPage}/>

    <div className="ep-row2">
      <section className="ep-card">
        <div className="ep-card-head">
          <div><div className="ep-card-eb">{t('פניות פעילות')}</div><h3 className="ep-card-title">{t('דורש את תשומת לבכם עכשיו')}</h3></div>
          <div style={{display:'flex',gap:8}}><button className="ep-btn ep-btn-ghost ep-btn-sm" onClick={()=>goPage('requests')}>{t('הצג הכל ‹')}</button><button className="ep-btn ep-btn-primary ep-btn-sm" onClick={()=>window.dispatchEvent(new Event('open-new-request'))}><I.plus width={12} height={12}/>{t('חדש')}</button></div>
        </div>
        <div className="ep-table-wrap"><table className="ep-table"><thead><tr><th className="ep-th">{t('מזהה')}</th><th className="ep-th">{t('פנייה')}</th><th className="ep-th">{t('מחלקה')}</th><th className="ep-th">{t('עדיפות')}</th><th className="ep-th">SLA</th><th className="ep-th">{t('אחראי')}</th><th className="ep-th">{t('סטטוס')}</th></tr></thead><tbody>
          {d.requests.slice(0,7).map(r => (
            <tr key={r.id} className="ep-row" onClick={()=>openRequest(r)}>
              <td className="ep-mono">{r.id}</td>
              <td><div className="ep-cell-title">{r.title}</div><div className="ep-cell-sub">{r.resident}</div></td>
              <td><span className="ep-tag">{r.dept}</span></td>
              <td><span className="ep-pri"><span className={`ep-pri-dot ${r.priority}`}/>{t(r.priority)}</span></td>
              <td className="ep-sla"><div className="ep-sla-bar"><div className={`ep-sla-fill ${r.sla<30?'low':r.sla<60?'mid':''}`} style={{width:`${r.sla}%`}}/></div><span className="ep-sla-txt">{r.slaText}</span></td>
              <td>{r.clerk}</td>
              <td><span className={`ep-status ep-status-${r.status}`}>{t(r.status)}</span></td>
            </tr>
          ))}
        </tbody></table></div>
      </section>

      <section className="ep-card">
        <div className="ep-card-head"><div><div className="ep-card-eb">{t('עומס לפי מחלקה')}</div><h3 className="ep-card-title">{t('פניות פתוחות ו-SLA')}</h3></div></div>
        <div style={{display:'flex',flexDirection:'column',gap:10}}>
          {d.departments.map(dep => { const max=Math.max(...d.departments.map(x=>x.open)); return (
            <div key={dep.name} className="ep-dept">
              <div>{dep.name}</div>
              <div className="ep-dept-bar"><div style={{width:`${(dep.open/max)*100}%`,background:dep.color}}/></div>
              <div className="ep-dept-val">{dep.open}</div>
              <div className={`ep-dept-sla ${dep.sla>=93?'good':dep.sla>=88?'ok':'warn'}`}>{dep.sla}%</div>
            </div>
          )})}
        </div>
      </section>
    </div>

    <div className="ep-row2">
      <section className="ep-card">
        <div className="ep-card-head"><div><div className="ep-card-eb">{t('ביצועי מצטיינים')}</div><h3 className="ep-card-title">{t('6 אחראים מובילים · אפריל')}</h3></div><button className="ep-btn ep-btn-ghost ep-btn-sm" onClick={()=>goPage('team')}>{t('כל הצוות ‹')}</button></div>
        <div className="ep-table-wrap"><table className="ep-table"><thead><tr><th className="ep-th">{t('שם')}</th><th className="ep-th">{t('מחלקה')}</th><th className="ep-th">{t('טופלו')}</th><th className="ep-th">SLA</th><th className="ep-th">{t('זמן ממוצע')}</th></tr></thead><tbody>
          {d.performers.map(p => (
            <tr key={p.name}>
              <td><div style={{display:'flex',alignItems:'center',gap:10}}><div className="ep-avatar" style={{width:28,height:28,fontSize:11}}>{p.avatar}</div>{p.name}</div></td>
              <td><span className="ep-tag">{p.dept}</span></td>
              <td><b>{p.handled}</b></td>
              <td><span className={`ep-dept-sla ${p.sla>=95?'good':p.sla>=90?'ok':'warn'}`}>{p.sla}%</span></td>
              <td className="ep-muted">{p.avg}</td>
            </tr>
          ))}
        </tbody></table></div>
      </section>

      <section className="ep-card">
        <div className="ep-card-head"><div><div className="ep-card-eb">{t('פעילות אחרונה')}</div><h3 className="ep-card-title">{t('היום במערכת')}</h3></div></div>
        <ul className="ep-feed">
          {d.activity.map((a,i)=>{const iconMap={check:<I.check/>,note:<I.note/>,pay:<I.pay/>,x:<I.close/>,report:<I.doc/>,user:<I.users/>,alert:<I.alert/>}; return (
            <li key={i}><span className={`ep-feed-ic ic-${a.icon}`}>{iconMap[a.icon]||<I.check/>}</span><div className="ep-feed-txt"><div><b>{a.who}</b> {a.txt}</div><div className="ep-feed-t">{a.t}</div></div></li>
          )})}
        </ul>
      </section>
    </div>
  </>);
}

// ── Requests List ───────────────────────────────────────────────────
function RequestsPage({ openRequest, goPage }) {
  const d = window.eprData; const I = window.EprIcon;
  if (window.useEprLang) window.useEprLang();
  const t = window.eprT || ((s)=>s);
  const [tab,setTab]=pgS('all'); const [q,setQ]=pgS(''); const [dept,setDept]=pgS('הכול');
  const filtered=pgM(()=>{let o=d.requests; if(tab==='open') o=o.filter(r=>!['מאושר','חיצוני'].includes(r.status)); if(tab==='urgent') o=o.filter(r=>r.priority==='דחוף'); if(tab==='overdue') o=o.filter(r=>r.sla<40); if(dept!=='הכול') o=o.filter(r=>r.dept===dept); if(q) o=o.filter(r=>r.title.includes(q)||r.id.includes(q)||r.resident.includes(q)); return o;},[tab,q,dept]);
  return (<>
    <PageHeader title={t('ניהול פניות')} subtitle={`${d.requests.length} ${t('פניות')} · ${d.requests.filter(r=>r.priority==='דחוף').length} ${t('דחופות')} · ${d.requests.filter(r=>r.sla<40).length} ${t('חורגות SLA')}`} icon="inbox"
      actions={<><button className="ep-btn ep-btn-ghost" onClick={()=>goPage('my-reports')}><I.chart width={14} height={14}/>{t('דוחות שמורים')}</button><button className="ep-btn ep-btn-ghost"><I.download width={14} height={14}/>{t('ייצוא Excel')}</button><button className="ep-btn ep-btn-primary" onClick={()=>window.dispatchEvent(new Event('open-new-request'))}><I.plus width={14} height={14}/>{t('פנייה חדשה')}</button></>}/>
    <div className="row">
      <div className="ep-tabs">
        {[['all','כל הפניות'],['open','פתוחות'],['urgent','דחופות'],['overdue','חורגות SLA']].map(([v,lbl])=>(<button key={v} className={tab===v?'active':''} onClick={()=>setTab(v)}>{t(lbl)}</button>))}
      </div>
      <div className="end row">
        <div className="ep-input-wrap"><I.search width={14} height={14}/><input placeholder={t('חיפוש…')} value={q} onChange={e=>setQ(e.target.value)}/></div>
        <div className="ep-input-wrap"><I.filter width={14} height={14}/><select value={dept} onChange={e=>setDept(e.target.value)}><option value="הכול">{t('הכול')}</option>{d.departments.map(x=><option key={x.name} value={x.name}>{x.name}</option>)}</select></div>
      </div>
    </div>
    <section className="ep-card">
      {filtered.length===0 ? (
        <EmptyState icon="inbox" title={t('לא נמצאו פניות')} hint={q?`${t('לא נמצאו תוצאות')} · "${q}"`:t('נסה לשנות את הסינון')} action={(q||dept!=='הכול'||tab!=='all')&&<button className="ep-btn ep-btn-ghost ep-btn-sm" onClick={()=>{setQ('');setDept('הכול');setTab('all');}} data-toast="off">{t('נקה סינון')}</button>}/>
      ) : (
      <div className="ep-table-wrap"><table className="ep-table"><thead><tr><th className="ep-th">{t('מזהה')}</th><th className="ep-th">{t('פנייה')}</th><th className="ep-th">{t('מחלקה')}</th><th className="ep-th">{t('עדיפות')}</th><th className="ep-th">SLA</th><th className="ep-th">{t('אחראי')}</th><th className="ep-th">{t('ערוץ')}</th><th className="ep-th">{t('נוצר')}</th><th className="ep-th">{t('סטטוס')}</th></tr></thead><tbody>
        {filtered.map(r=>(
          <tr key={r.id} className="ep-row" onClick={()=>openRequest(r)}>
            <td className="ep-mono">{r.id}</td>
            <td><div className="ep-cell-title">{r.title}</div><div className="ep-cell-sub">{r.resident}</div></td>
            <td><span className="ep-tag">{r.dept}</span></td>
            <td><span className="ep-pri"><span className={`ep-pri-dot ${r.priority}`}/>{t(r.priority)}</span></td>
            <td className="ep-sla"><div className="ep-sla-bar"><div className={`ep-sla-fill ${r.sla<30?'low':r.sla<60?'mid':''}`} style={{width:`${r.sla}%`}}/></div><span className="ep-sla-txt">{r.slaText}</span></td>
            <td>{r.clerk}</td>
            <td className="ep-muted">{r.channel}</td>
            <td className="ep-muted">{r.created}</td>
            <td><span className={`ep-status ep-status-${r.status}`}>{t(r.status)}</span></td>
          </tr>
        ))}
      </tbody></table></div>
      )}
    </section>
  </>);
}


// ── Residents ───────────────────────────────────────────────────
function ResidentsPage() {
  const d = window.eprData; const I=window.EprIcon; const [q,setQ]=pgS('');
  if (window.useEprLang) window.useEprLang();
  const t = window.eprT || ((s)=>s);
  const filtered=pgM(()=>q?d.residents.filter(r=>r.name.includes(q)||r.id.includes(q)||r.phone.includes(q)):d.residents,[q]);
  return (<>
    <PageHeader title={t('תושבים')} icon="users" subtitle={`${d.residents.length.toLocaleString('he-IL')} ${t('תושבים')} · ${d.residents.filter(r=>r.open>0).length} ${t('פניות פתוחות')}`} actions={<><button className="ep-btn ep-btn-ghost"><I.download width={14} height={14}/>{t('ייצוא')}</button><button className="ep-btn ep-btn-primary"><I.plus width={14} height={14}/>{t('תושב חדש')}</button></>}/>
    <div className="row">
      <div className="ep-input-wrap" style={{flex:1,maxWidth:400}}><I.search width={14} height={14}/><input placeholder={t('חיפוש לפי שם / ת״ז / טלפון…')} value={q} onChange={e=>setQ(e.target.value)}/></div>
      <button className="ep-btn ep-btn-ghost"><I.filter width={14} height={14}/>{t('מסננים מתקדמים')}</button>
    </div>
    <section className="ep-card">
      {filtered.length===0 ? (
        <EmptyState icon="users" title={t('לא נמצאו תושבים')} hint={q?`${t('לא נמצאו תוצאות')} · "${q}"`:t('נסה לשנות את החיפוש')} action={q&&<button className="ep-btn ep-btn-ghost ep-btn-sm" onClick={()=>setQ('')} data-toast="off">{t('נקה חיפוש')}</button>}/>
      ) : (
      <div className="ep-table-wrap"><table className="ep-table"><thead><tr><th className="ep-th">{t('ת״ז')}</th><th className="ep-th">{t('שם')}</th><th className="ep-th">{t('אימייל')}</th><th className="ep-th">{t('טלפון')}</th><th className="ep-th">{t('כתובת')}</th><th className="ep-th">{t('פניות פתוחות')}</th><th className="ep-th">{t('סה״כ')}</th><th className="ep-th">{t('אימות')}</th></tr></thead><tbody>
        {filtered.map(r=>(
          <tr key={r.id} className="ep-row">
            <td className="ep-mono">{r.id}</td>
            <td><div style={{display:'flex',alignItems:'center',gap:10}}><div className="ep-avatar" style={{width:28,height:28,fontSize:11}}>{r.name.split(' ').map(s=>s[0]).slice(0,2).join('')}</div><b>{r.name}</b></div></td>
            <td className="ep-muted">{r.email}</td>
            <td className="ep-muted" style={{direction:'ltr',textAlign:'end'}}>{r.phone}</td>
            <td className="ep-muted">{r.addr}</td>
            <td>{r.open>0?<span className="ep-tag amber">{r.open}</span>:<span className="ep-muted">0</span>}</td>
            <td><b>{r.total}</b></td>
            <td>{r.verified?<span className="ep-tag green">{t('✓ מאומת')}</span>:<span className="ep-tag slate">{t('ממתין')}</span>}</td>
          </tr>
        ))}
      </tbody></table></div>
      )}
    </section>
  </>);
}

// ── Team Performance ───────────────────────────────────────────
function TeamPage() {
  const d = window.eprData; const I=window.EprIcon;
  if (window.useEprLang) window.useEprLang();
  const t = window.eprT || ((s)=>s);
  return (<>
    <PageHeader title={t('ביצועי צוות')} icon="chart" subtitle={t('מעקב עומסים, SLA ותפוקה לפי צוות ולפי עובד')} actions={<><button className="ep-btn ep-btn-ghost"><I.download width={14} height={14}/>{t('דוח מלא')}</button><button className="ep-btn ep-btn-primary"><I.plus width={14} height={14}/>{t('הוספת צוות')}</button></>}/>
    <div className="ep-kpis">
      {[['סה״כ צוותים','5','+1','teal'],['סה״כ עובדים','63','+2','teal'],['עומס ממוצע','78%','-4','green'],['SLA ממוצע','89%','+2','green']].map(([k,v,dlt,tone],i)=>(
        <div key={i} className="ep-kpi"><div className="ep-kpi-head"><span className="ep-kpi-lbl">{t(k)}</span><span className={`ep-delta ${dlt.startsWith('-')?'dn':'up'}`}>{dlt}%</span></div><div className="ep-kpi-val">{v}</div><div className="ep-kpi-foot"><Sparkline data={[60,62,65,68,70,72,74,75,77,78,78,78]} tone={tone} w={132} h={32}/><span className="ep-kpi-sub">{t('חודש')}</span></div></div>
      ))}
    </div>
    <div className="ep-row-ll">
      <section className="ep-card">
        <div className="ep-card-head"><div><div className="ep-card-eb">{t('צוותים')}</div><h3 className="ep-card-title">{t('עומס נוכחי ו-SLA')}</h3></div></div>
        <div style={{display:'flex',flexDirection:'column',gap:14}}>
          {d.teams.map(tm=>(
            <div key={tm.name} style={{borderTop:'1px solid var(--border)',paddingTop:14}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
                <div><b>{tm.name}</b> <span className="ep-muted" style={{fontSize:12}}> · {t('ראש צוות')}: {tm.lead} · {tm.size} {t('חברים')}</span></div>
                <div className="row"><span className={`ep-dept-sla ${tm.sla>=93?'good':tm.sla>=88?'ok':'warn'}`}>SLA {tm.sla}%</span></div>
              </div>
              <div className="ep-dept-bar" style={{height:10}}><div style={{width:`${tm.load}%`,background:tm.load>85?'var(--red)':tm.load>70?'var(--amber)':'var(--teal-500)'}}/></div>
              <div style={{display:'flex',justifyContent:'space-between',marginTop:4,fontSize:11,color:'var(--muted)'}}><span>{t('עומס')}</span><span>{tm.load}%</span></div>
            </div>
          ))}
        </div>
      </section>
      <section className="ep-card">
        <div className="ep-card-head"><div><div className="ep-card-eb">{t('מצטיינים')}</div><h3 className="ep-card-title">{t('Top 6 אפריל')}</h3></div></div>
        {d.performers.map((p,i)=>(
          <div key={p.name} style={{display:'flex',alignItems:'center',gap:10,padding:'10px 0',borderBottom:i<d.performers.length-1?'1px solid var(--border)':'0'}}>
            <div style={{width:20,color:'var(--muted)',fontWeight:700,fontSize:12}}>{i+1}</div>
            <div className="ep-avatar" style={{width:32,height:32,fontSize:12}}>{p.avatar}</div>
            <div style={{flex:1,minWidth:0}}><div style={{fontWeight:500}}>{p.name}</div><div style={{fontSize:11,color:'var(--muted)'}}>{p.dept} · {p.handled} {t('פניות')}</div></div>
            <span className={`ep-dept-sla ${p.sla>=95?'good':'ok'}`}>{p.sla}%</span>
          </div>
        ))}
      </section>
    </div>
  </>);
}

// ── Bulk Messages ───────────────────────────────────────────────
function BulkPage() {
  const d = window.eprData; const I=window.EprIcon;
  if (window.useEprLang) window.useEprLang();
  const t = window.eprT || ((s)=>s);
  return (<>
    <PageHeader title={t('הודעות מרוכזות')} icon="msg" subtitle={t('ניהול קמפיינים, דיוורים והודעות SMS לתושבים')} actions={<><button className="ep-btn ep-btn-ghost"><I.download width={14} height={14}/>{t('דוח')}</button><button className="ep-btn ep-btn-primary"><I.send width={14} height={14}/>{t('קמפיין חדש')}</button></>}/>
    <div className="ep-kpis">
      {[['נשלחו החודש','42.2K','+18','teal'],['אחוז פתיחה','64%','+3','green'],['הקלקות','28%','-2','amber'],['קמפיינים פעילים','3','+1','teal']].map(([k,v,dlt,tone],i)=>(
        <div key={i} className="ep-kpi"><div className="ep-kpi-head"><span className="ep-kpi-lbl">{t(k)}</span><span className={`ep-delta ${dlt.startsWith('-')?'dn':'up'}`}>{dlt}%</span></div><div className="ep-kpi-val">{v}</div><div className="ep-kpi-foot"><Sparkline data={[20,25,28,32,35,38,40,41,42,42,42,42]} tone={tone} w={132} h={32}/><span className="ep-kpi-sub">{t('חודש')}</span></div></div>
      ))}
    </div>
    <section className="ep-card">
      <div className="ep-card-head"><div><div className="ep-card-eb">{t('יצירת קמפיין')}</div><h3 className="ep-card-title">{t('ארבעה שלבים מהטיוטה לשליחה')}</h3></div><button className="ep-btn ep-btn-primary ep-btn-sm">{t('המשך →')}</button></div>
      <div className="row" style={{gap:0,marginBottom:8}}>
        {[['1','קהל יעד'],['2','תוכן ההודעה'],['3','תזמון'],['4','שליחה']].map(([n,lbl],i)=>(
          <React.Fragment key={n}>
            <div className={`ep-step ${i<2?'done':i===2?'active':''}`}><div className="ep-step-num">{i<2?<I.check width={14} height={14}/>:n}</div><div style={{fontSize:13,fontWeight:500}}>{t(lbl)}</div></div>
            {i<3 && <div className={`ep-step-bar ${i<2?'done':''}`}/>}
          </React.Fragment>
        ))}
      </div>
    </section>
    <section className="ep-card">
      <div className="ep-card-head"><div><div className="ep-card-eb">{t('היסטוריה')}</div><h3 className="ep-card-title">{t('קמפיינים אחרונים')}</h3></div></div>
      <div className="ep-table-wrap"><table className="ep-table"><thead><tr><th className="ep-th">{t('שם הקמפיין')}</th><th className="ep-th">{t('קהל יעד')}</th><th className="ep-th">{t('נשלחו')}</th><th className="ep-th">{t('פתיחה')}</th><th className="ep-th">{t('הקלקה')}</th><th className="ep-th">{t('סטטוס')}</th><th className="ep-th">{t('תאריך')}</th></tr></thead><tbody>
        {d.campaigns.map((c,i)=>(
          <tr key={i} className="ep-row">
            <td><b>{c.name}</b></td>
            <td className="ep-muted">{c.audience}</td>
            <td><b>{c.sent.toLocaleString('he-IL')}</b></td>
            <td>{c.opened>0?<span className="ep-tag green">{c.opened}%</span>:<span className="ep-muted">—</span>}</td>
            <td>{c.ctr>0?<span className="ep-tag blue">{c.ctr}%</span>:<span className="ep-muted">—</span>}</td>
            <td><span className={`ep-tag ${c.status==='הושלם'?'green':c.status==='פעיל'?'blue':'slate'}`}>{t(c.status)}</span></td>
            <td className="ep-muted">{c.date}</td>
          </tr>
        ))}
      </tbody></table></div>
    </section>
  </>);
}

// ── Pending Approval / Install / Reset Password / NotFound ───────────
function PendingPage({ goPage }) {
  const I=window.EprIcon;
  if (window.useEprLang) window.useEprLang();
  const t = window.eprT || ((s)=>s);
  return (
    <div className="ep-blank">
      <div className="ep-blank-card">
        <div className="ep-blank-ic" style={{background:'rgba(242,177,52,.18)',color:'#8A5F17'}}><I.clock width={32} height={32}/></div>
        <h2>{t('החשבון שלך ממתין לאישור')}</h2>
        <p>{t('בקשת ההצטרפות התקבלה ונשלחה למנהל המערכת. תקבל התראה במייל ברגע שהחשבון יאושר. בדרך כלל תוך 24 שעות.')}</p>
        <div className="row" style={{justifyContent:'center'}}><button className="ep-btn ep-btn-ghost"><I.mail width={14} height={14}/>{t('שלח תזכורת למנהל')}</button><button className="ep-btn ep-btn-primary" onClick={()=>goPage('login')}>{t('חזור להתחברות')}</button></div>
      </div>
    </div>
  );
}

function InstallPage() {
  const I=window.EprIcon;
  if (window.useEprLang) window.useEprLang();
  const t = window.eprT || ((s)=>s);
  return (<>
    <PageHeader title={t('התקנת האפליקציה')} icon="download" subtitle={t('הוסף את EPR Digital כאפליקציה למסך הבית של המכשיר')}/>
    <div className="ep-row3">
      {[
        {os:'iOS',ic:'phone',steps:['פתח את האתר ב-Safari','לחץ על כפתור השיתוף','בחר ״הוסף למסך הבית״','אשר ולחץ ״הוסף״']},
        {os:'Android',ic:'phone',steps:['פתח את האתר ב-Chrome','לחץ על תפריט שלוש הנקודות','בחר ״התקן אפליקציה״','אשר את ההתקנה']},
        {os:'Desktop',ic:'building',steps:['פתח ב-Chrome / Edge','חפש סמל התקנה בשורת הכתובת','לחץ ״התקן״','האפליקציה תיפתח כחלון נפרד']},
      ].map(p=>(
        <section key={p.os} className="ep-card">
          <div className="ep-card-head"><div><div className="ep-card-eb">{p.os}</div><h3 className="ep-card-title">{t('הוראות התקנה')}</h3></div><div className="ep-feed-ic"><I.phone/></div></div>
          <ol style={{margin:0,padding:'0 18px',display:'flex',flexDirection:'column',gap:10,fontSize:13.5,color:'var(--text)'}}>
            {p.steps.map((s,i)=>(<li key={i}>{t(s)}</li>))}
          </ol>
          <button className="ep-btn ep-btn-primary ep-btn-sm">{t('‹ הוראות מפורטות')}</button>
        </section>
      ))}
    </div>
    <section className="ep-card">
      <div className="ep-card-head"><div><div className="ep-card-eb">{t('יתרונות')}</div><h3 className="ep-card-title">{t('למה להתקין?')}</h3></div></div>
      <div className="ep-row3">
        {[['התראות Push','קבל התראה מיידית על פניות דחופות'],['גישה מחוץ לחיבור','המשך לעבוד גם כשהאינטרנט נפל'],['מהירות פעולה','פתיחה מהירה ב-2 שניות']].map(([title,p])=>(<div key={title} className="ep-feature"><b>{t(title)}</b><p className="ep-muted" style={{margin:0}}>{t(p)}</p></div>))}
      </div>
    </section>
  </>);
}

function NotFoundPage({ goPage }) {
  if (window.useEprLang) window.useEprLang();
  const t = window.eprT || ((s)=>s);
  return (
    <div className="ep-blank">
      <div className="ep-blank-card">
        <div className="ep-blank-num">404</div>
        <h2>{t('הדף שחיפשת לא נמצא')}</h2>
        <p>{t('הקישור שגוי או שהדף הוסר. נסה לחזור לדשבורד או חפש את מה שאתה צריך.')}</p>
        <div className="row" style={{justifyContent:'center'}}><button className="ep-btn ep-btn-ghost" onClick={()=>history.back()}>{t('חזור אחורה')}</button><button className="ep-btn ep-btn-primary" onClick={()=>goPage('dashboard')}>{t('חזור לדשבורד')}</button></div>
      </div>
    </div>
  );
}

// ── Login / Reset Password ───────────────────────────────────
function LoginPage({ onLogin }) {
  const I = window.EprIcon;
  const brand = window.useEprBranding ? window.useEprBranding() : {};
  if (window.useEprLang) window.useEprLang();
  const t = window.eprT || ((s)=>s);
  const brandName = brand.appName ? brand.appName.split(' - ')[0].split(' – ')[0] : 'EPR Digital';
  return (
    <div className="ep-login">
      <div className="ep-login-hero">
        <div style={{display:'flex',alignItems:'center',gap:12,zIndex:1}}><div className="ep-logo" style={{background:'rgba(255,255,255,.2)',width:44,height:44,fontSize:20,overflow:'hidden'}}>{brand.logoDataUrl?<img src={brand.logoDataUrl} alt="" style={{width:'100%',height:'100%',objectFit:'contain'}}/>:'E'}</div><div><div style={{fontWeight:800,fontSize:20}}>{brandName}</div><div style={{fontSize:12,opacity:.8}}>{brand.slogan || t('בק אופיס עירוני')}</div></div></div>
        <svg viewBox="0 0 400 200" style={{position:'absolute',bottom:0,left:0,width:'100%',opacity:.25}} aria-hidden="true"><g fill="none" stroke="#fff" strokeWidth="1.5"><rect x="20" y="100" width="40" height="90"/><rect x="70" y="70" width="50" height="120"/><rect x="130" y="110" width="40" height="80"/><rect x="180" y="50" width="60" height="140"/><rect x="250" y="100" width="40" height="90"/><rect x="300" y="80" width="50" height="110"/><rect x="360" y="60" width="40" height="130"/><path d="M0 190 L400 190"/></g></svg>
        <div style={{zIndex:1}}><h1 style={{fontSize:32,fontWeight:700,margin:'0 0 12px',letterSpacing:'-.02em'}}>{t('ניהול מוקד השירות של העיר במקום אחד.')}</h1><p style={{opacity:.9,fontSize:15,maxWidth:'45ch',lineHeight:1.6}}>{t('ריכוז פניות, מעקב SLA, ניהול תושבים, דיוורים וצוותים — בזרימת עבודה מודרנית שמכבדת את הזמן שלכם.')}</p></div>
        <div style={{zIndex:1,fontSize:12,opacity:.7}}>© 2026 EPR Systems Israel · {t('גרסה')} 4.2.1</div>
      </div>
      <div className="ep-login-form">
        <div className="ep-login-box">
          <div><div style={{fontSize:11,fontWeight:700,color:'var(--accent)',textTransform:'uppercase',letterSpacing:'.08em',marginBottom:6}}>{t('כניסה למערכת')}</div><h1>{t('ברוכים הבאים חזרה')}</h1><p style={{color:'var(--muted)',margin:'6px 0 0'}}>{t('הזינו את פרטי הכניסה שלכם כדי להתחיל')}</p></div>
          <div className="ep-field"><label>{t('אימייל')}</label><input type="email" placeholder="name@city.gov.il" defaultValue="michal@epr-muni.co.il"/></div>
          <div className="ep-field"><label>{t('סיסמה')}</label><input type="password" placeholder="••••••••" defaultValue="••••••••"/></div>
          <div className="row"><label style={{display:'flex',alignItems:'center',gap:6,fontSize:12.5,color:'var(--muted)'}}><input type="checkbox" defaultChecked/>{t('זכרו אותי')}</label><a href="#" className="end" style={{fontSize:12.5,color:'var(--accent)',fontWeight:500}}>{t('שכחתי סיסמה')}</a></div>
          <button className="ep-btn ep-btn-primary" style={{padding:'12px 16px',justifyContent:'center',fontSize:14}} onClick={onLogin}>{t('כניסה ←')}</button>
          <div style={{textAlign:'center',fontSize:12,color:'var(--muted)'}}>{t('אין לכם חשבון?')} <a href="#" style={{color:'var(--accent)',fontWeight:500}}>{t('בקשו גישה')}</a></div>
        </div>
      </div>
    </div>
  );
}

// ── Drawer ───────────────────────────────────────────────────
function RequestDrawer({ row, onClose, onOpenFull }) {
  const I = window.EprIcon;
  if (window.useEprLang) window.useEprLang();
  const t = window.eprT || ((s)=>s);
  if(!row) return null;
  return (<>
    <div className="ep-scrim" onClick={onClose}/>
    <aside className="ep-drawer">
      <header className="ep-drawer-h">
        <div><div className="ep-mono" style={{fontSize:11}}>{row.id}</div><h2>{row.title}</h2><div className="row"><span className="ep-tag">{row.dept}</span><span className="ep-pri"><span className={`ep-pri-dot ${row.priority}`}/>{t(row.priority)}</span><span className={`ep-status ep-status-${row.status}`}>{t(row.status)}</span></div></div>
        <button className="ep-icon-btn" onClick={onClose} aria-label={t('סגור')}><I.close/></button>
      </header>
      <div className="ep-drawer-body">
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
          <div><div style={{fontSize:11,color:'var(--muted)',fontWeight:500,marginBottom:3}}>{t('פונה')}</div><div>{row.resident}</div></div>
          <div><div style={{fontSize:11,color:'var(--muted)',fontWeight:500,marginBottom:3}}>{t('ערוץ')}</div><div>{row.channel}</div></div>
          <div><div style={{fontSize:11,color:'var(--muted)',fontWeight:500,marginBottom:3}}>{t('אחראי')}</div><div>{row.clerk}</div></div>
          <div><div style={{fontSize:11,color:'var(--muted)',fontWeight:500,marginBottom:3}}>{t('נוצר')}</div><div>{row.created}</div></div>
        </div>
        <div>
          <div style={{display:'flex',justifyContent:'space-between',marginBottom:6}}><span style={{fontSize:12,color:'var(--muted)',fontWeight:500}}>{t('עמידה ב-SLA')}</span><span style={{fontSize:11,color:'var(--muted)'}}>{row.slaText}</span></div>
          <div className="ep-sla-bar" style={{height:10}}><div className={`ep-sla-fill ${row.sla<30?'low':row.sla<60?'mid':''}`} style={{width:`${row.sla}%`}}/></div>
        </div>
        <div className="row"><button className="ep-btn ep-btn-primary" onClick={onOpenFull}>{t('פתח תצוגה מלאה ←')}</button><button className="ep-btn ep-btn-ghost">{t('הוספת הערה')}</button><button className="ep-btn ep-btn-ghost"><I.phone width={12} height={12}/>{t('שיחה')}</button><button className="ep-btn ep-btn-danger">{t('סגירה')}</button></div>
      </div>
    </aside>
  </>);
}

Object.assign(window, { DashboardPage, RequestsPage, ResidentsPage, TeamPage, BulkPage, RequestDrawer, LoginPage, PendingPage, InstallPage, NotFoundPage });
