// epr/i18n.jsx — Minimal translation layer.
// Keys are written in Hebrew (the canonical / default locale).
// `eprT(key, lang?)` returns the translation or the key itself
// if no translation exists for the chosen language.
// To extend coverage, just add entries to the maps below.

const EPR_I18N = {
  // ── Sidebar navigation ──────────────────────────────────────
  'תמונת מצב':           { en:'Overview',      ar:'لوحة المعلومات',   ru:'Обзор' },
  'ניהול פניות':          { en:'Requests',      ar:'إدارة الطلبات',    ru:'Заявки' },
  'כל הפניות':           { en:'All requests',  ar:'كل الطلبات',       ru:'Все заявки' },
  'דוחות שמורים':         { en:'Saved reports', ar:'التقارير المحفوظة', ru:'Сохранённые отчёты' },
  'הדוחות שלי':           { en:'My reports',    ar:'تقاريري',          ru:'Мои отчёты' },
  'ביצועי צוות':         { en:'Team performance', ar:'أداء الفريق',   ru:'Команда' },
  'הודעות מרוכזות':       { en:'Bulk messages', ar:'الرسائل الجماعية', ru:'Рассылки' },
  'תושבים':              { en:'Residents',     ar:'السكان',           ru:'Жители' },
  'ניהול משתמשים':       { en:'Users',         ar:'المستخدمون',       ru:'Пользователи' },
  'הגדרות':              { en:'Settings',      ar:'الإعدادات',        ru:'Настройки' },
  'התקנת אפליקציה':       { en:'Install app',   ar:'تثبيت التطبيق',    ru:'Установить приложение' },
  'ניווט':               { en:'Navigation',    ar:'التنقل',           ru:'Навигация' },

  // ── TopBar ──────────────────────────────────────────────────
  'בק אופיס':            { en:'Back-Office',   ar:'المكتب الخلفي',    ru:'Бэк-офис' },
  'חפש תושב, פנייה או רחוב · או שאל את ה-AI…': {
    en: 'Search resident, request or street · or ask the AI…',
    ar: 'ابحث عن ساكن أو طلب أو شارع · أو اسأل الذكاء الاصطناعي…',
    ru: 'Поиск жителя, заявки или улицы · или спросите AI…',
  },
  'ממתינים לאישור':       { en:'Awaiting approval', ar:'بانتظار الموافقة', ru:'Ожидают подтверждения' },
  'יומן':                { en:'Calendar',      ar:'التقويم',          ru:'Календарь' },
  'התראות':              { en:'Notifications', ar:'الإشعارات',        ru:'Уведомления' },

  // ── Sidebar settings children ───────────────────────────────
  'כללי':                { en:'General',          ar:'عام',             ru:'Общие' },
  'יומן עסקי':            { en:'Business calendar',ar:'تقويم العمل',     ru:'Рабочий календарь' },
  'מבנה ארגוני':         { en:'Organization',     ar:'الهيكل التنظيمي', ru:'Структура' },
  'נושאי פנייה':         { en:'Topics',           ar:'المواضيع',        ru:'Темы' },
  'זמני SLA':            { en:'SLA times',        ar:'أوقات SLA',       ru:'Сроки SLA' },
  'טפסי פנייה':          { en:'Request forms',    ar:'النماذج',         ru:'Формы заявок' },
  'ערוצי כניסה':          { en:'Channels',         ar:'القنوات',         ru:'Каналы' },
  'ניתוב אוטומטי':       { en:'Auto routing',     ar:'التوجيه التلقائي',ru:'Маршрутизация' },
  'תבניות הודעה':        { en:'Message templates',ar:'قوالب الرسائل',   ru:'Шаблоны сообщений' },
  'אינטגרציות':          { en:'Integrations',     ar:'التكاملات',       ru:'Интеграции' },
  'אבטחה והרשאות':       { en:'Security & roles', ar:'الأمن والصلاحيات',ru:'Безопасность' },
  'מיתוג ופורטל':        { en:'Branding & portal',ar:'العلامة والبوابة',ru:'Брендинг и портал' },
  'יומן ביקורת':         { en:'Audit log',        ar:'سجل التدقيق',     ru:'Журнал аудита' },
};

const EPR_LANG_DIRS = { he:'rtl', ar:'rtl', en:'ltr', ru:'ltr' };

function eprCurrentLang() {
  try {
    const raw = localStorage.getItem('epr-settings-v1');
    const parsed = raw ? JSON.parse(raw) : {};
    return (parsed.general && parsed.general.lang) || 'he';
  } catch(_) { return 'he'; }
}

function eprT(key, lang) {
  const L = lang || eprCurrentLang();
  if (L === 'he') return key;
  const entry = EPR_I18N[key];
  if (!entry) return key;
  return entry[L] || key;
}

function eprApplyLang(lang) {
  const L = lang || eprCurrentLang();
  document.documentElement.lang = L;
  document.documentElement.dir = EPR_LANG_DIRS[L] || 'ltr';
}

// Apply on load (so a refresh keeps the chosen language).
try { eprApplyLang(); } catch(_) {}

window.eprT = eprT;
window.eprApplyLang = eprApplyLang;
window.eprCurrentLang = eprCurrentLang;
