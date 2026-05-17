// epr/i18n.jsx — Translation layer for he / en / ar.
// Hebrew is the canonical locale (keys are written in Hebrew).
// To extend coverage, add an entry to EPR_I18N below.

const EPR_I18N = {
  // ── Sidebar navigation ──────────────────────────────────────
  'תמונת מצב':           { en:'Overview',             ar:'لوحة المعلومات' },
  'ניהול פניות':          { en:'Requests',             ar:'إدارة الطلبات' },
  'כל הפניות':           { en:'All requests',         ar:'كل الطلبات' },
  'דוחות שמורים':         { en:'Saved reports',        ar:'التقارير المحفوظة' },
  'הדוחות שלי':           { en:'My reports',           ar:'تقاريري' },
  'ביצועי צוות':         { en:'Team performance',     ar:'أداء الفريق' },
  'הודעות מרוכזות':       { en:'Bulk messages',        ar:'الرسائل الجماعية' },
  'תושבים':              { en:'Residents',            ar:'السكان' },
  'ניהול משתמשים':       { en:'User management',      ar:'إدارة المستخدمين' },
  'הגדרות':              { en:'Settings',             ar:'الإعدادات' },
  'התקנת אפליקציה':       { en:'Install app',          ar:'تثبيت التطبيق' },
  'ניווט':               { en:'Navigation',           ar:'التنقل' },
  'הגדרות מערכת':         { en:'System settings',      ar:'إعدادات النظام' },

  // ── TopBar / global chrome ──────────────────────────────────
  'בק אופיס':            { en:'Back-Office',          ar:'المكتب الخلفي' },
  'חפש תושב, פנייה או רחוב · או שאל את ה-AI…': {
    en: 'Search resident, request or street · or ask the AI…',
    ar: 'ابحث عن ساكن أو طلب أو شارع · أو اسأل الذكاء الاصطناعي…',
  },
  'ממתינים לאישור':       { en:'Awaiting approval',    ar:'بانتظار الموافقة' },
  'יומן':                { en:'Calendar',             ar:'التقويم' },
  'התראות':              { en:'Notifications',        ar:'الإشعارات' },
  'התנתקות':             { en:'Log out',              ar:'تسجيل الخروج' },
  'מצב כהה':             { en:'Dark mode',            ar:'الوضع الداكن' },
  'מצב בהיר':             { en:'Light mode',           ar:'الوضع الفاتح' },
  'שפה':                 { en:'Language',             ar:'اللغة' },
  'נגישות':              { en:'Accessibility',        ar:'إمكانية الوصول' },
  'פתח סרגל':             { en:'Open sidebar',         ar:'فتح الشريط الجانبي' },
  'כווץ סרגל':            { en:'Collapse sidebar',     ar:'طي الشريط الجانبي' },

  // ── Sidebar settings children ───────────────────────────────
  'כללי':                { en:'General',              ar:'عام' },
  'יומן עסקי':            { en:'Business calendar',    ar:'تقويم العمل' },
  'מבנה ארגוני':         { en:'Organization',         ar:'الهيكل التنظيمي' },
  'נושאי פנייה':         { en:'Topics',               ar:'مواضيع الطلبات' },
  'זמני SLA':            { en:'SLA times',            ar:'أوقات SLA' },
  'הגדרות SLA':           { en:'SLA settings',         ar:'إعدادات SLA' },
  'טפסי פנייה':          { en:'Request forms',        ar:'نماذج الطلبات' },
  'ערוצי כניסה':          { en:'Channels',             ar:'القنوات' },
  'ניתוב אוטומטי':       { en:'Auto routing',         ar:'التوجيه التلقائي' },
  'תבניות הודעה':        { en:'Message templates',    ar:'قوالب الرسائل' },
  'אינטגרציות':          { en:'Integrations',         ar:'التكاملات' },
  'אבטחה והרשאות':       { en:'Security & roles',     ar:'الأمن والصلاحيات' },
  'מיתוג ופורטל':        { en:'Branding & portal',    ar:'العلامة والبوابة' },
  'יומן ביקורת':         { en:'Audit log',            ar:'سجل التدقيق' },

  // ── Page headers ────────────────────────────────────────────
  'פרטי פנייה':           { en:'Request details',      ar:'تفاصيل الطلب' },
  'דף לא נמצא':           { en:'Page not found',       ar:'الصفحة غير موجودة' },

  // ── Common buttons ──────────────────────────────────────────
  'שמירה':               { en:'Save',                 ar:'حفظ' },
  'שמירה ←':              { en:'Save ←',               ar:'حفظ ←' },
  'נשמר':                { en:'Saved',                ar:'تم الحفظ' },
  'ביטול':               { en:'Cancel',               ar:'إلغاء' },
  'איפוס':               { en:'Reset',                ar:'إعادة تعيين' },
  'אישור':               { en:'Confirm',              ar:'تأكيد' },
  'אשר':                 { en:'Approve',              ar:'موافقة' },
  'דחה':                 { en:'Reject',               ar:'رفض' },
  'ערוך':                { en:'Edit',                 ar:'تعديل' },
  'עריכה':               { en:'Edit',                 ar:'تعديل' },
  'מחק':                 { en:'Delete',               ar:'حذف' },
  'מחיקה':               { en:'Delete',               ar:'حذف' },
  'הסר':                 { en:'Remove',               ar:'إزالة' },
  'הוסף':                { en:'Add',                  ar:'إضافة' },
  'הבא ‹':                { en:'Next ‹',               ar:'التالي ‹' },
  '‹ הקודם':              { en:'‹ Previous',           ar:'‹ السابق' },
  'הפעל':                { en:'Run',                  ar:'تشغيل' },
  'ייצוא':               { en:'Export',               ar:'تصدير' },
  'ייצוא Excel':          { en:'Export to Excel',      ar:'تصدير إلى Excel' },
  'חיפוש…':              { en:'Search…',              ar:'بحث…' },
  'סינון':               { en:'Filter',               ar:'تصفية' },
  'נקה סינון':            { en:'Clear filter',         ar:'مسح التصفية' },
  'נקה חיפוש':            { en:'Clear search',         ar:'مسح البحث' },
  'הצג הכל ‹':            { en:'Show all ‹',           ar:'عرض الكل ‹' },
  'פנייה חדשה':           { en:'New request',          ar:'طلب جديد' },
  'משתמש חדש':            { en:'New user',             ar:'مستخدم جديد' },
  'דוח חדש':              { en:'New report',           ar:'تقرير جديد' },
  'קמפיין חדש':           { en:'New campaign',         ar:'حملة جديدة' },
  'תושב חדש':             { en:'New resident',         ar:'ساكن جديد' },
  'הוספת צוות':           { en:'Add team',             ar:'إضافة فريق' },
  'מחלקה חדשה':           { en:'New department',       ar:'قسم جديد' },
  'קטגוריה חדשה':         { en:'New category',         ar:'فئة جديدة' },
  'טופס חדש':             { en:'New form',             ar:'نموذج جديد' },
  'דוח':                 { en:'Report',               ar:'تقرير' },
  'דוח מלא':              { en:'Full report',          ar:'تقرير كامل' },
  'חזור אחורה':           { en:'Go back',              ar:'العودة' },
  'חזור לדשבורד':         { en:'Back to dashboard',    ar:'العودة إلى لوحة المعلومات' },
  'כניסה ←':              { en:'Sign in ←',            ar:'تسجيل الدخول ←' },
  'מסננים מתקדמים':       { en:'Advanced filters',     ar:'تصفيات متقدمة' },
  'קטגוריה':              { en:'Category',             ar:'فئة' },
  'קונפיגורציה':          { en:'Configuration',        ar:'إعدادات' },
  'חיבור':               { en:'Connect',              ar:'الاتصال' },

  // ── Tabs ───────────────────────────────────────────────────
  'פתוחות':              { en:'Open',                 ar:'مفتوحة' },
  'דחופות':              { en:'Urgent',               ar:'عاجلة' },
  'חורגות SLA':           { en:'SLA breach',           ar:'تجاوز SLA' },
  'פעילים':              { en:'Active',               ar:'نشط' },
  'ממתינים':             { en:'Pending',              ar:'بانتظار' },

  // ── Status / priority ──────────────────────────────────────
  'חדש':                 { en:'New',                  ar:'جديد' },
  'בטיפול':              { en:'In progress',          ar:'قيد المعالجة' },
  'מאושר':               { en:'Approved',             ar:'تمت الموافقة' },
  'נדחה':                { en:'Rejected',             ar:'مرفوض' },
  'מוקפא':               { en:'Frozen',               ar:'مجمد' },
  'הועבר':               { en:'Transferred',          ar:'تمت الإحالة' },
  'פתוח':                { en:'Open',                 ar:'مفتوح' },
  'דחוף':                { en:'Urgent',               ar:'عاجل' },
  'גבוה':                { en:'High',                 ar:'عالي' },
  'בינוני':              { en:'Medium',               ar:'متوسط' },
  'רגיל':                { en:'Normal',               ar:'عادي' },
  'נמוך':                { en:'Low',                  ar:'منخفض' },
  'פעיל':                { en:'Active',               ar:'نشط' },
  'מחובר':               { en:'Connected',            ar:'متصل' },
  'לא פעיל':              { en:'Inactive',             ar:'غير نشط' },

  // ── Login / Pending / 404 ──────────────────────────────────
  'כניסה למערכת':         { en:'Sign in',              ar:'تسجيل الدخول' },
  'ברוכים הבאים חזרה':    { en:'Welcome back',         ar:'مرحبًا بعودتك' },
  'אימייל':              { en:'Email',                ar:'البريد الإلكتروني' },
  'סיסמה':               { en:'Password',             ar:'كلمة المرور' },
  'זכרו אותי':            { en:'Remember me',          ar:'تذكرني' },
  'שכחתי סיסמה':          { en:'Forgot password',      ar:'نسيت كلمة المرور' },
  'אין לכם חשבון?':       { en:'No account?',          ar:'لا تملك حسابًا؟' },
  'בקשו גישה':            { en:'Request access',       ar:'طلب وصول' },
  'הזינו את פרטי הכניסה שלכם כדי להתחיל': {
    en:'Enter your credentials to get started',
    ar:'أدخل بيانات الدخول للبدء',
  },
  'החשבון שלך ממתין לאישור':{ en:'Your account is awaiting approval', ar:'حسابك بانتظار الموافقة' },
  'הדף שחיפשת לא נמצא':   { en:'The page you requested was not found', ar:'الصفحة المطلوبة غير موجودة' },

  // ── Accessibility menu ─────────────────────────────────────
  'תפריט נגישות':         { en:'Accessibility menu',   ar:'قائمة إمكانية الوصول' },
  'הגדל גופן':            { en:'Increase font',        ar:'تكبير الخط' },
  'הקטן גופן':            { en:'Decrease font',        ar:'تصغير الخط' },
  'ניגודיות גבוהה':       { en:'High contrast',        ar:'تباين عالٍ' },
  'הדגשת קישורים':       { en:'Highlight links',      ar:'إبراز الروابط' },
  'עצור אנימציות':        { en:'Stop animations',      ar:'إيقاف الرسوم المتحركة' },
  'גופן קריא':            { en:'Readable font',        ar:'خط قابل للقراءة' },
  'מצביע גדול':           { en:'Big cursor',           ar:'مؤشر كبير' },
  'איפוס נגישות':         { en:'Reset accessibility',  ar:'إعادة تعيين' },
  'הצהרת נגישות':         { en:'Accessibility statement', ar:'بيان إمكانية الوصول' },
  'דלג לתוכן':            { en:'Skip to content',      ar:'تخطى إلى المحتوى' },
};

const EPR_LANG_DIRS = { he:'rtl', ar:'rtl', en:'ltr' };
const EPR_LANG_LABELS = { he:'עברית', en:'English', ar:'العربية' };
const EPR_LANG_FLAGS  = { he:'🇮🇱',     en:'🇬🇧',       ar:'🇸🇦' };
const EPR_LANGS = ['he','en','ar'];

function eprCurrentLang() {
  try {
    const raw = localStorage.getItem('epr-settings-v1');
    const parsed = raw ? JSON.parse(raw) : {};
    const fromSettings = parsed.general && parsed.general.lang;
    if (fromSettings && EPR_LANGS.includes(fromSettings)) return fromSettings;
    return 'he';
  } catch(_) { return 'he'; }
}

function eprT(key, lang) {
  if (key == null) return key;
  const L = lang || eprCurrentLang();
  if (L === 'he') return key;
  const entry = EPR_I18N[key];
  if (!entry) return key;
  return entry[L] || key;
}

function eprApplyLang(lang) {
  const L = (lang && EPR_LANGS.includes(lang)) ? lang : eprCurrentLang();
  document.documentElement.lang = L;
  document.documentElement.dir = EPR_LANG_DIRS[L] || 'ltr';
  // Persist to settings.general.lang so a refresh keeps it.
  try {
    const raw = localStorage.getItem('epr-settings-v1');
    const parsed = raw ? JSON.parse(raw) : {};
    parsed.general = { ...(parsed.general||{}), lang: L };
    localStorage.setItem('epr-settings-v1', JSON.stringify(parsed));
  } catch(_) {}
}

function eprSetLang(lang) {
  eprApplyLang(lang);
  window.dispatchEvent(new CustomEvent('epr-lang-updated', { detail: lang }));
}

// Apply on load (so a refresh keeps the chosen language).
try { eprApplyLang(); } catch(_) {}

Object.assign(window, {
  eprT, eprApplyLang, eprSetLang, eprCurrentLang,
  EPR_LANGS, EPR_LANG_LABELS, EPR_LANG_FLAGS, EPR_LANG_DIRS,
});
