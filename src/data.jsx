// epr/data.jsx — Mock data aligned with eprdigital schemas (requests, residents, teams, SLA, etc.)

/**
 * @typedef {'דחוף'|'גבוה'|'בינוני'|'רגיל'|'נמוך'} EprPriority
 * @typedef {'חדש'|'בטיפול'|'מחכה למסמכים'|'בדיקת מסמכים'|'ממתין לאישור'|'הועבר'|'פתוח'|'מאושר'|'נדחה'|'מוקפא'|'חיצוני'} EprStatus
 *
 * @typedef {Object} EprRequest
 * @property {string}      id        Stable identifier (e.g. "REQ-24193")
 * @property {string}      title     Short human-readable subject
 * @property {string}      resident  Name (or anonymized label) of the requester
 * @property {string}      dept      Department name
 * @property {string}      clerk     Assignee initials or full name; "—" if unassigned
 * @property {EprStatus}   status
 * @property {EprPriority} priority
 * @property {number}      sla       0–100 — % of SLA window remaining
 * @property {string}      slaText   Human label for the SLA bar (e.g. "18 דק׳ לפקיעה")
 * @property {string}      created   Display string for creation timestamp
 * @property {string}      channel   "אפליקציה" | "מוקד 106" | "טלפון" | "אתר" | "SMS" | "Email" | "וואטסאפ"
 *
 * @typedef {Object} EprResident
 * @property {string} id, name, email, phone, addr
 * @property {number} open       Currently-open requests for this resident
 * @property {number} total      Lifetime request count
 * @property {boolean} verified
 *
 * @typedef {Object} EprUser
 * @property {string} name, email, role, dept, last, avatar
 * @property {number} handled    Requests handled in the period
 * @property {number} sla        SLA % achieved (0 if N/A)
 * @property {boolean} active    false = pending approval
 *
 * @typedef {Object} EprDepartment
 * @property {string} name, color
 * @property {number} open       Open requests
 * @property {number} sla        SLA % (0–100)
 *
 * @typedef {Object} EprTeam
 * @property {string} name, lead
 * @property {number} size, load, sla
 *
 * @typedef {Object} EprCampaign
 * @property {string} name, audience, status, date
 * @property {number} sent, opened, ctr
 *
 * @typedef {Object} EprActivity
 * @property {string} t, who, txt, icon
 *
 * @typedef {Object} EprData
 * @property {{name:string,role:string,dept:string,avatar:string,email:string}} me
 * @property {Object<string, {v:number|string, delta:number, spark:number[], unit?:string}>} stats
 * @property {EprRequest[]}    requests
 * @property {EprResident[]}   residents
 * @property {EprUser[]}       users
 * @property {EprDepartment[]} departments
 * @property {EprTeam[]}       teams
 * @property {EprCampaign[]}   campaigns
 * @property {EprActivity[]}   activity
 */

/** @type {EprData} */
const eprData = {
  me: { name: 'מיכל עמרן', role: 'מנהלת בק אופיס', dept: 'מוקד ושירות', avatar: 'מע', email: 'michal@epr-muni.co.il' },
  stats: {
    open: { v: 847, delta: +4.2, spark: [720,742,755,770,781,798,812,820,832,838,845,847] },
    sla:  { v: 91, delta: +1.8, spark: [85,86,87,88,89,88,90,89,91,90,91,91] },
    avg:  { v: '2.4', unit: 'ימים', delta: -8, spark: [3.2,3.0,2.9,2.8,2.7,2.6,2.6,2.5,2.5,2.4,2.4,2.4] },
    urg:  { v: 23, delta: +12, spark: [14,16,18,17,19,20,21,19,22,21,23,23] },
    res:  { v: 1284, delta: +3.1, spark: [1200,1210,1220,1230,1240,1250,1260,1265,1270,1278,1282,1284] },
    msg:  { v: 3421, delta: +22, spark: [2700,2800,2900,3000,3100,3180,3250,3300,3350,3390,3410,3421] },
  },
  requests: [
    { id: 'REQ-24193', title: 'פינוי גזם — ההדרים 12', resident: 'דני אבני', dept: 'תברואה',  clerk: 'אריאל כ.', status: 'בטיפול',   priority: 'דחוף',   sla: 92, slaText: '18 דק׳ לפקיעה', created: '21.04.26 09:14', channel: 'אפליקציה' },
    { id: 'REQ-24192', title: 'פנס רחוב שרוף — ז׳בוטינסקי 44', resident: 'מיכל רוזן', dept: 'תאורה', clerk: 'יעל ב.',  status: 'בטיפול',   priority: 'רגיל',   sla: 55, slaText: '2 ש׳ 12 דק׳', created: '21.04.26 08:42', channel: 'מוקד 106' },
    { id: 'REQ-24190', title: 'בקשת היתר — תוספת ממ״ד', resident: 'משפחת לוי', dept: 'הנדסה', clerk: 'רון ש.',   status: 'מחכה למסמכים', priority: 'רגיל', sla: 38, slaText: '4 ימים', created: '19.04.26', channel: 'אתר' },
    { id: 'REQ-24188', title: 'רישום גן — ערעור',      resident: 'שרה נוימן', dept: 'חינוך', clerk: '—',        status: 'חדש',     priority: 'רגיל',   sla: 70, slaText: '6 שעות', created: '21.04.26 07:55', channel: 'אתר' },
    { id: 'REQ-24185', title: 'תו חניה — רכב חדש',    resident: 'אלון כהן',  dept: 'חניה',  clerk: 'נעם פ.',  status: 'מאושר',   priority: 'רגיל',   sla: 100, slaText: 'הושלם', created: '20.04.26', channel: 'אפליקציה' },
    { id: 'REQ-24181', title: 'סיוע — משפחה חד הורית',resident: 'ר.מ. (חסוי)', dept: 'רווחה', clerk: 'עו״ס דנה', status: 'בטיפול',  priority: 'דחוף',  sla: 78, slaText: 'יום 1/3', created: '18.04.26', channel: 'טלפון' },
    { id: 'REQ-24178', title: 'דוח רעש — ההסתדרות 8', resident: 'שכנים (3)', dept: 'פיקוח',  clerk: 'צוות לילה', status: 'פתוח',   priority: 'בינוני', sla: 46, slaText: '24 ש׳', created: '21.04.26 02:10', channel: 'מוקד 106' },
    { id: 'REQ-24175', title: 'זליגת מים — אחוזה/הגנה', resident: 'דיווח', dept: 'תברואה', clerk: 'תאגיד מים', status: 'הועבר',  priority: 'דחוף',  sla: 85, slaText: '34 דק׳', created: '21.04.26 10:02', channel: 'אפליקציה' },
    { id: 'REQ-24172', title: 'בדיקת תכנית — שינוי חזית', resident: 'אדר׳ ליבנה', dept: 'הנדסה', clerk: 'אבי ג.', status: 'בטיפול',  priority: 'רגיל', sla: 22, slaText: '9 ימים', created: '12.04.26', channel: 'אתר' },
    { id: 'REQ-24170', title: 'רמזור דו״ש — הרצל/ויצמן', resident: 'מוקד רמזורים', dept: 'תנועה', clerk: 'נתיבי ישראל', status: 'חיצוני', priority: 'דחוף', sla: 0, slaText: 'פג', created: '20.04.26', channel: 'מוקד 106' },
    { id: 'REQ-24165', title: 'מלגת סטודנט — מסמכים', resident: 'יובל פרידמן', dept: 'חינוך', clerk: 'רחל ו.', status: 'מאושר', priority: 'רגיל', sla: 100, slaText: 'הושלם', created: '18.04.26', channel: 'אתר' },
    { id: 'REQ-24161', title: 'דוח מפגע — שלט פרסומת', resident: 'עוברת אורח', dept: 'פיקוח', clerk: '—', status: 'חדש', priority: 'רגיל', sla: 80, slaText: '3 ימים', created: '21.04.26 06:20', channel: 'אפליקציה' },
  ],
  departments: [
    { name: 'תברואה',   open: 142, sla: 89, staff: 12, color: '#2AA7B8' },
    { name: 'הנדסה',    open: 98,  sla: 82, staff: 18, color: '#166F7C' },
    { name: 'פיקוח',    open: 76,  sla: 91, staff: 8,  color: '#2E6BE6' },
    { name: 'חינוך',    open: 64,  sla: 94, staff: 14, color: '#70C8D2' },
    { name: 'רווחה',    open: 48,  sla: 88, staff: 11, color: '#3BB76E' },
    { name: 'תאורה',    open: 42,  sla: 95, staff: 4,  color: '#F2B134' },
    { name: 'חניה',     open: 38,  sla: 97, staff: 6,  color: '#8FA0B0' },
  ],
  performers: [
    { name: 'אריאל כהן',    avatar: 'אכ', dept: 'תברואה', handled: 142, sla: 97, avg: '1.8 ימים' },
    { name: 'יעל בן דוד',   avatar: 'יב', dept: 'תאורה',  handled: 128, sla: 96, avg: '1.2 ימים' },
    { name: 'רון שטרן',      avatar: 'רש', dept: 'הנדסה',  handled: 114, sla: 88, avg: '3.1 ימים' },
    { name: 'דנה לוי',       avatar: 'דל', dept: 'רווחה',  handled: 98,  sla: 94, avg: '2.4 ימים' },
    { name: 'נעם פרץ',       avatar: 'נפ', dept: 'חניה',   handled: 142, sla: 99, avg: '0.6 ימים' },
    { name: 'רחל ויסברג',    avatar: 'רו', dept: 'חינוך',  handled: 87,  sla: 92, avg: '2.0 ימים' },
  ],
  residents: [
    { id: '300451822', name: 'דני אבני',       email: 'd.avni@gmail.com', phone: '052-6981025', addr: 'ההדרים 12, רעננה',     open: 2, total: 14, verified: true  },
    { id: '315784412', name: 'מיכל רוזן',      email: 'michal.r@me.com',  phone: '054-8821411', addr: 'ז׳בוטינסקי 44, רעננה',  open: 1, total: 8,  verified: true  },
    { id: '205471123', name: 'משפחת לוי',     email: 'levi@home.co.il',  phone: '050-4141122', addr: 'הזיתים 3, רעננה',       open: 3, total: 22, verified: true  },
    { id: '325111009', name: 'שרה נוימן',      email: 'sara.n@gmail.com', phone: '053-8817412', addr: 'בר-אילן 18, רעננה',     open: 1, total: 5,  verified: false },
    { id: '311447209', name: 'אלון כהן',       email: 'alon@work.com',    phone: '052-3344881', addr: 'הנשיא 7, רעננה',         open: 0, total: 3,  verified: true  },
    { id: '301882114', name: 'יובל פרידמן',    email: 'yfried@campus.il', phone: '054-9982314', addr: 'ההסתדרות 22, רעננה',    open: 0, total: 7,  verified: true  },
    { id: '208991144', name: 'רונית אמיתי',    email: 'ronit@home.il',     phone: '052-1122334', addr: 'ויצמן 104, רעננה',       open: 1, total: 12, verified: true  },
    { id: '319003221', name: 'אביתר אבנר',     email: 'evyatar@mail.co.il',phone: '053-9987521', addr: 'אחוזה 88, רעננה',        open: 2, total: 9,  verified: false },
  ],
  teams: [
    { name: 'צוות מוקד 106', lead: 'נועה לביא',   size: 14, load: 78, sla: 92 },
    { name: 'צוות תברואה',   lead: 'אריאל כהן',  size: 12, load: 86, sla: 89 },
    { name: 'צוות הנדסה',    lead: 'רון שטרן',    size: 18, load: 72, sla: 82 },
    { name: 'צוות רווחה',     lead: 'דנה לוי',      size: 11, load: 64, sla: 94 },
    { name: 'צוות פיקוח',     lead: 'צוות לילה',  size: 8,  load: 91, sla: 88 },
  ],
  campaigns: [
    { name: 'דיוור ארנונה — אפריל',   audience: 'כל התושבים',   sent: 18420, opened: 64, ctr: 28, status: 'הושלם', date: '18.04.26' },
    { name: 'עדכון סגירת כביש — אחוזה', audience: 'תושבי אחוזה', sent: 1240,  opened: 72, ctr: 34, status: 'הושלם', date: '20.04.26' },
    { name: 'רישום קייטנות קיץ',       audience: 'הורים 0-12',    sent: 0,     opened: 0,  ctr: 0,  status: 'טיוטה', date: 'מתוכנן 25.04' },
    { name: 'התראת איכות אוויר',        audience: 'כל התושבים',   sent: 18420, opened: 81, ctr: 12, status: 'הושלם', date: '21.04.26' },
    { name: 'חוגי תרבות — סתיו',       audience: 'תושבי מועדון',  sent: 4200,  opened: 68, ctr: 41, status: 'פעיל',  date: '21.04.26' },
  ],
  activity: [
    { t: 'לפני 2 דק׳',  who: 'אריאל כהן',   txt: 'עודכן סטטוס REQ-24193 ל״בטיפול״', icon: 'check' },
    { t: 'לפני 8 דק׳',  who: 'יעל בן דוד',  txt: 'הוספה הערה לפנייה REQ-24192',      icon: 'note' },
    { t: 'לפני 15 דק׳', who: 'מערכת',      txt: '14 תשלומי ארנונה התקבלו',            icon: 'pay' },
    { t: 'לפני 22 דק׳', who: 'רון שטרן',    txt: 'נדחתה בקשת REQ-24161 — חוסר מסמכים', icon: 'x' },
    { t: 'לפני 40 דק׳', who: 'מערכת',      txt: 'דוח SLA יומי נוצר',                    icon: 'report' },
    { t: 'לפני 1 שעה',  who: 'דנה לוי',    txt: 'שובץ עו״ס לפנייה REQ-24181',            icon: 'user' },
    { t: 'לפני 1 שעה',  who: 'מערכת',      txt: 'התראה: 3 פניות חורגות מ-SLA בפיקוח',     icon: 'alert' },
  ],
  users: [
    { name:'מיכל עמרן',     avatar:'מע', role:'מנהל מערכת',   dept:'מוקד ושירות', email:'michal@epr-muni.co.il', last:'היום 08:42', handled:0,   sla:0,  active:true },
    { name:'נועה לביא',      avatar:'נל', role:'ראש צוות',     dept:'מוקד 106',     email:'noa.l@epr-muni.co.il',  last:'היום 09:15', handled:84,  sla:94, active:true },
    { name:'אריאל כהן',      avatar:'אכ', role:'רכז שטח',      dept:'תברואה',       email:'ariel.k@epr-muni.co.il',last:'היום 09:20', handled:142, sla:97, active:true },
    { name:'יעל בן דוד',     avatar:'יב', role:'רכז שטח',      dept:'תאורה ותשתית', email:'yael.bd@epr-muni.co.il',last:'אתמול',     handled:128, sla:96, active:true },
    { name:'תמר אבני',       avatar:'תא', role:'מנהל מחלקה',   dept:'גינון',        email:'tamar.a@epr-muni.co.il',last:'היום 08:55', handled:96,  sla:94, active:true },
    { name:'אדם דביר',       avatar:'אד', role:'ראש צוות',     dept:'הנדסה',        email:'adam.d@epr-muni.co.il', last:'היום 07:50', handled:73,  sla:91, active:true },
    { name:'רחל מאיר',       avatar:'רמ', role:'מוקדן',         dept:'מוקד 106',     email:'rachel.m@epr-muni.co.il',last:'לפני 2 ימים',handled:38,  sla:88, active:true },
    { name:'איתן בן-דוד',    avatar:'אב', role:'רכז רובע',     dept:'מוקד 106',     email:'eitan.bd@epr-muni.co.il',last:'היום 09:05',handled:54,  sla:90, active:true },
    { name:'שרה גולן',        avatar:'שג', role:'מוקדן',         dept:'מוקד 106',     email:'sara.g@new.gov.il',     last:'-',         handled:0,   sla:0,  active:false },
    { name:'יואב רוזן',       avatar:'יר', role:'רכז שטח',      dept:'תברואה',       email:'yoav.r@new.gov.il',     last:'-',         handled:0,   sla:0,  active:false },
    { name:'דנה כץ',          avatar:'דכ', role:'מנהל מחלקה',   dept:'חינוך',        email:'dana.k@new.gov.il',     last:'-',         handled:0,   sla:0,  active:false },
  ],
};
window.eprData = eprData;

/* ─────────────────────────── Custom departments persistence ─────────────────────────── *
 * User-created departments are stored in localStorage so they survive reloads and
 * appear in every dropdown that reads `window.eprData.departments` (form builder,
 * organization settings, routing rules, etc.).  We hydrate them onto the in-memory
 * array at module load time and expose helpers to add / remove / list them.
 * ──────────────────────────────────────────────────────────────────────────────── */
const EPR_CUSTOM_DEPTS_KEY = 'epr-custom-departments-v1';

function eprLoadCustomDepartments() {
  try {
    const raw = localStorage.getItem(EPR_CUSTOM_DEPTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch(_) { return []; }
}

function eprSaveCustomDepartments(list) {
  try { localStorage.setItem(EPR_CUSTOM_DEPTS_KEY, JSON.stringify(list)); }
  catch(_) {}
}

function eprAddDepartment(dept) {
  // dept = { name, manager?, phone?, email?, color, sla? }
  if (!dept || !dept.name) return null;
  const name = String(dept.name).trim();
  if (!name) return null;
  // Avoid duplicates
  if (window.eprData.departments.some(d => d.name === name)) return null;
  const row = {
    name,
    color: dept.color || '#0F968C',
    open: 0,
    sla: typeof dept.sla === 'number' ? Math.min(100, Math.max(0, dept.sla)) : 100,
    manager: dept.manager || '',
    phone: dept.phone || '',
    email: dept.email || '',
    custom: true,
  };
  const list = eprLoadCustomDepartments();
  list.push(row);
  eprSaveCustomDepartments(list);
  window.eprData.departments.push(row);
  window.dispatchEvent(new CustomEvent('epr-departments-updated', { detail: window.eprData.departments }));
  return row;
}

function eprRemoveDepartment(name) {
  const list = eprLoadCustomDepartments().filter(d => d.name !== name);
  eprSaveCustomDepartments(list);
  window.eprData.departments = window.eprData.departments.filter(d => d.name !== name);
  window.dispatchEvent(new CustomEvent('epr-departments-updated', { detail: window.eprData.departments }));
}

// Hydrate at load time
(function hydrateCustomDepartments() {
  const stored = eprLoadCustomDepartments();
  const existing = new Set(window.eprData.departments.map(d => d.name));
  for (const d of stored) {
    if (!existing.has(d.name)) window.eprData.departments.push(d);
  }
})();

Object.assign(window, { eprAddDepartment, eprRemoveDepartment, eprLoadCustomDepartments });

/* ─────────────────────────── Custom residents ─────────────────────────── */
const EPR_CUSTOM_RESIDENTS_KEY = 'epr-custom-residents-v1';
function eprLoadCustomResidents() {
  try {
    const raw = localStorage.getItem(EPR_CUSTOM_RESIDENTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch(_) { return []; }
}
function eprSaveCustomResidents(list) {
  try { localStorage.setItem(EPR_CUSTOM_RESIDENTS_KEY, JSON.stringify(list)); }
  catch(_) {}
}
function eprAddResident(res) {
  if (!res || !res.name) return null;
  const name = String(res.name).trim();
  if (!name) return null;
  const id = res.id || String(100000000 + Math.floor(Math.random() * 900000000));
  if (window.eprData.residents.some(r => r.id === id || r.name === name)) return null;
  const row = {
    id, name,
    email: res.email || '',
    phone: res.phone || '',
    addr:  res.addr  || '',
    open: 0,
    total: 0,
    verified: !!res.verified,
    custom: true,
  };
  const list = eprLoadCustomResidents();
  list.push(row);
  eprSaveCustomResidents(list);
  window.eprData.residents.unshift(row); // newest first
  window.dispatchEvent(new CustomEvent('epr-residents-updated', { detail: window.eprData.residents }));
  return row;
}
(function hydrateCustomResidents() {
  const stored = eprLoadCustomResidents();
  const existing = new Set(window.eprData.residents.map(r => r.id));
  for (const r of stored) {
    if (!existing.has(r.id)) window.eprData.residents.unshift(r);
  }
})();
Object.assign(window, { eprAddResident, eprLoadCustomResidents });

/* ─────────────────────────── CSV export helper ─────────────────────────── *
 * Used by every "ייצוא" / "Export" button across the app. Builds a UTF-8 CSV
 * (with BOM so Excel reads Hebrew correctly), triggers a download, and toasts.
 * Usage: window.eprExportCSV('residents', rows, ['id','name','phone'])
 * `rows` is an array of objects, `cols` an array of keys (or [{k:'name',label:'Name'}]).
 * ──────────────────────────────────────────────────────────────────────────── */
function eprExportCSV(filename, rows, cols) {
  if (!Array.isArray(rows) || rows.length === 0) {
    window.eprToast && window.eprToast('אין נתונים לייצוא', 'info');
    return;
  }
  const fields = (cols && cols.length)
    ? cols.map(c => typeof c === 'string' ? { k:c, label:c } : c)
    : Object.keys(rows[0]).map(k => ({ k, label:k }));
  const escape = (v) => {
    if (v == null) return '';
    const s = String(v);
    if (/[",\n\r]/.test(s)) return '"' + s.replace(/"/g,'""') + '"';
    return s;
  };
  const header = fields.map(f => escape(f.label)).join(',');
  const body = rows.map(r => fields.map(f => escape(r[f.k])).join(',')).join('\r\n');
  const csv = '﻿' + header + '\r\n' + body;
  const stamp = new Date().toISOString().slice(0,10);
  try {
    const blob = new Blob([csv], { type:'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}-${stamp}.csv`;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => { URL.revokeObjectURL(url); a.remove(); }, 100);
    window.eprToast && window.eprToast(`הורד ${a.download} · ${rows.length} שורות`, 'success');
  } catch(_) {
    window.eprToast && window.eprToast('שגיאה בייצוא הקובץ', 'danger');
  }
}

window.eprExportCSV = eprExportCSV;

/* ─────────────────────────── eprApi ─────────────────────────── *
 * Async facade over the mock data — mirrors the shape we'd want
 * when swapping in a real backend (Supabase, REST, GraphQL…).
 * All methods return Promises; `update*` calls write to localStorage
 * overrides so user actions persist across reloads without a server.
 *
 * Swap targets when the time comes:
 *   - replace `sleep(...)` with `fetch(...)`
 *   - replace `eprData.*` reads with API endpoints
 *   - replace localStorage write with API mutation
 * The component API stays identical.
 * ──────────────────────────────────────────────────────────────── */
(function buildEprApi(){
  const ART_DELAY = 80; // tiny delay to mimic network latency
  const sleep = (ms = ART_DELAY) => new Promise(r => setTimeout(r, ms));
  const OVERRIDE_KEY = 'epr-req-overrides';
  function loadOverrides() {
    try { return JSON.parse(localStorage.getItem(OVERRIDE_KEY) || '{}'); }
    catch(_) { return {}; }
  }
  function saveOverrides(map) {
    try { localStorage.setItem(OVERRIDE_KEY, JSON.stringify(map)); }
    catch(_) {}
  }
  function applyOverride(row) {
    const o = loadOverrides()[row.id];
    if (!o) return row;
    return { ...row, ...o };
  }
  window.eprApi = {
    requests: {
      async list(filter = {}) {
        await sleep();
        let all = window.eprData.requests.map(applyOverride);
        if (filter.dept && filter.dept !== 'הכול') all = all.filter(r => r.dept === filter.dept);
        if (filter.priority)                       all = all.filter(r => r.priority === filter.priority);
        if (filter.status)                         all = all.filter(r => r.status === filter.status);
        if (filter.q) {
          const q = String(filter.q).toLowerCase();
          all = all.filter(r => (r.title+' '+r.id+' '+r.resident).toLowerCase().includes(q));
        }
        return all;
      },
      async get(id) {
        await sleep();
        const row = window.eprData.requests.find(r => r.id === id);
        return row ? applyOverride(row) : null;
      },
      async update(id, patch) {
        await sleep();
        const overrides = loadOverrides();
        overrides[id] = { ...(overrides[id]||{}), ...patch, updatedAt: new Date().toISOString() };
        saveOverrides(overrides);
        return this.get(id);
      },
    },
    residents: {
      async list({ q } = {}) {
        await sleep();
        const all = window.eprData.residents;
        return q ? all.filter(r => (r.name+' '+r.id+' '+r.phone).includes(q)) : all;
      },
    },
    teams:  { async list() { await sleep(); return window.eprData.teams; } },
    users:  { async list({ active } = {}) {
      await sleep();
      const all = window.eprData.users;
      if (active === undefined) return all;
      return all.filter(u => !!u.active === !!active);
    } },
    settings: {
      async get() {
        await sleep();
        try { return JSON.parse(localStorage.getItem('epr-settings-v1') || '{}'); }
        catch(_) { return {}; }
      },
      async save(section, value) {
        await sleep();
        try {
          const all = JSON.parse(localStorage.getItem('epr-settings-v1') || '{}');
          all[section] = value;
          localStorage.setItem('epr-settings-v1', JSON.stringify(all));
          return true;
        } catch(_) { return false; }
      },
    },
  };
})();
