// epr/i18n.jsx — Translation layer for he / en / ar / ru.
// Hebrew is the canonical locale (keys are written in Hebrew).
// To extend coverage, add an entry to EPR_I18N below.

const EPR_I18N = {
  // ── Sidebar navigation ──────────────────────────────────────
  'תמונת מצב':           { en:'Overview',             ar:'لوحة المعلومات',   ru:'Обзор' },
  'ניהול פניות':          { en:'Requests',             ar:'إدارة الطلبات',    ru:'Заявки' },
  'כל הפניות':           { en:'All requests',         ar:'كل الطلبات',       ru:'Все заявки' },
  'דוחות שמורים':         { en:'Saved reports',        ar:'التقارير المحفوظة', ru:'Сохранённые отчёты' },
  'הדוחות שלי':           { en:'My reports',           ar:'تقاريري',          ru:'Мои отчёты' },
  'ביצועי צוות':         { en:'Team performance',     ar:'أداء الفريق',      ru:'Эффективность команды' },
  'הודעות מרוכזות':       { en:'Bulk messages',        ar:'الرسائل الجماعية', ru:'Массовые рассылки' },
  'תושבים':              { en:'Residents',            ar:'السكان',           ru:'Жители' },
  'ניהול משתמשים':       { en:'User management',      ar:'إدارة المستخدمين', ru:'Управление пользователями' },
  'הגדרות':              { en:'Settings',             ar:'الإعدادات',        ru:'Настройки' },
  'התקנת אפליקציה':       { en:'Install app',          ar:'تثبيت التطبيق',    ru:'Установить приложение' },
  'ניווט':               { en:'Navigation',           ar:'التنقل',           ru:'Навигация' },
  'הגדרות מערכת':         { en:'System settings',      ar:'إعدادات النظام',   ru:'Настройки системы' },

  // ── TopBar / global chrome ──────────────────────────────────
  'בק אופיס':            { en:'Back-Office',          ar:'المكتب الخلفي',    ru:'Бэк-офис' },
  'חפש תושב, פנייה או רחוב · או שאל את ה-AI…': {
    en: 'Search resident, request or street · or ask the AI…',
    ar: 'ابحث عن ساكن أو طلب أو شارع · أو اسأل الذكاء الاصطناعي…',
    ru: 'Поиск жителя, заявки или улицы · или спросите AI…',
  },
  'ממתינים לאישור':       { en:'Awaiting approval',    ar:'بانتظار الموافقة', ru:'Ожидают подтверждения' },
  'יומן':                { en:'Calendar',             ar:'التقويم',          ru:'Календарь' },
  'התראות':              { en:'Notifications',        ar:'الإشعارات',        ru:'Уведомления' },
  'התנתקות':             { en:'Log out',              ar:'تسجيل الخروج',     ru:'Выйти' },
  'מצב כהה':             { en:'Dark mode',            ar:'الوضع الداكن',     ru:'Тёмная тема' },
  'מצב בהיר':             { en:'Light mode',           ar:'الوضع الفاتح',     ru:'Светлая тема' },
  'שפה':                 { en:'Language',             ar:'اللغة',            ru:'Язык' },
  'נגישות':              { en:'Accessibility',        ar:'إمكانية الوصول',   ru:'Доступность' },
  'פתח סרגל':             { en:'Open sidebar',         ar:'فتح الشريط الجانبي', ru:'Открыть меню' },
  'כווץ סרגל':            { en:'Collapse sidebar',     ar:'طي الشريط الجانبي',  ru:'Свернуть меню' },

  // ── Sidebar settings children ───────────────────────────────
  'כללי':                { en:'General',              ar:'عام',              ru:'Общие' },
  'יומן עסקי':            { en:'Business calendar',    ar:'تقويم العمل',      ru:'Рабочий календарь' },
  'מבנה ארגוני':         { en:'Organization',         ar:'الهيكل التنظيمي',  ru:'Структура организации' },
  'נושאי פנייה':         { en:'Topics',               ar:'مواضيع الطلبات',   ru:'Темы заявок' },
  'זמני SLA':            { en:'SLA times',            ar:'أوقات SLA',        ru:'Сроки SLA' },
  'הגדרות SLA':           { en:'SLA settings',         ar:'إعدادات SLA',      ru:'Настройки SLA' },
  'טפסי פנייה':          { en:'Request forms',        ar:'نماذج الطلبات',    ru:'Формы заявок' },
  'ערוצי כניסה':          { en:'Channels',             ar:'القنوات',          ru:'Каналы' },
  'ניתוב אוטומטי':       { en:'Auto routing',         ar:'التوجيه التلقائي', ru:'Автоматическая маршрутизация' },
  'תבניות הודעה':        { en:'Message templates',    ar:'قوالب الرسائل',    ru:'Шаблоны сообщений' },
  'אינטגרציות':          { en:'Integrations',         ar:'التكاملات',        ru:'Интеграции' },
  'אבטחה והרשאות':       { en:'Security & roles',     ar:'الأمن والصلاحيات', ru:'Безопасность и роли' },
  'מיתוג ופורטל':        { en:'Branding & portal',    ar:'العلامة والبوابة', ru:'Брендинг и портал' },
  'יומן ביקורת':         { en:'Audit log',            ar:'سجل التدقيق',      ru:'Журнал аудита' },

  // ── Page headers ────────────────────────────────────────────
  'פרטי פנייה':           { en:'Request details',      ar:'تفاصيل الطلب',     ru:'Детали заявки' },
  'דף לא נמצא':           { en:'Page not found',       ar:'الصفحة غير موجودة', ru:'Страница не найдена' },

  // ── Common buttons ──────────────────────────────────────────
  'שמירה':               { en:'Save',                 ar:'حفظ',              ru:'Сохранить' },
  'שמירה ←':              { en:'Save ←',               ar:'حفظ ←',            ru:'Сохранить ←' },
  'נשמר':                { en:'Saved',                ar:'تم الحفظ',         ru:'Сохранено' },
  'ביטול':               { en:'Cancel',               ar:'إلغاء',            ru:'Отмена' },
  'איפוס':               { en:'Reset',                ar:'إعادة تعيين',      ru:'Сбросить' },
  'אישור':               { en:'Confirm',              ar:'تأكيد',            ru:'Подтвердить' },
  'אשר':                 { en:'Approve',              ar:'موافقة',           ru:'Одобрить' },
  'דחה':                 { en:'Reject',               ar:'رفض',              ru:'Отклонить' },
  'ערוך':                { en:'Edit',                 ar:'تعديل',            ru:'Изменить' },
  'עריכה':               { en:'Edit',                 ar:'تعديل',            ru:'Редактировать' },
  'מחק':                 { en:'Delete',               ar:'حذف',              ru:'Удалить' },
  'מחיקה':               { en:'Delete',               ar:'حذف',              ru:'Удаление' },
  'הסר':                 { en:'Remove',               ar:'إزالة',            ru:'Убрать' },
  'הוסף':                { en:'Add',                  ar:'إضافة',            ru:'Добавить' },
  'הבא ‹':                { en:'Next ‹',               ar:'التالي ‹',         ru:'Далее ‹' },
  '‹ הקודם':              { en:'‹ Previous',           ar:'‹ السابق',         ru:'‹ Назад' },
  'הפעל':                { en:'Run',                  ar:'تشغيل',            ru:'Запустить' },
  'ייצוא':               { en:'Export',               ar:'تصدير',            ru:'Экспорт' },
  'ייצוא Excel':          { en:'Export to Excel',      ar:'تصدير إلى Excel',  ru:'Экспорт в Excel' },
  'חיפוש…':              { en:'Search…',              ar:'بحث…',             ru:'Поиск…' },
  'סינון':               { en:'Filter',               ar:'تصفية',            ru:'Фильтр' },
  'נקה סינון':            { en:'Clear filter',         ar:'مسح التصفية',      ru:'Сбросить фильтр' },
  'נקה חיפוש':            { en:'Clear search',         ar:'مسح البحث',        ru:'Очистить поиск' },
  'הצג הכל ‹':            { en:'Show all ‹',           ar:'عرض الكل ‹',       ru:'Показать всё ‹' },
  'פנייה חדשה':           { en:'New request',          ar:'طلب جديد',         ru:'Новая заявка' },
  'משתמש חדש':            { en:'New user',             ar:'مستخدم جديد',      ru:'Новый пользователь' },
  'דוח חדש':              { en:'New report',           ar:'تقرير جديد',       ru:'Новый отчёт' },
  'קמפיין חדש':           { en:'New campaign',         ar:'حملة جديدة',       ru:'Новая кампания' },
  'תושב חדש':             { en:'New resident',         ar:'ساكن جديد',        ru:'Новый житель' },
  'הוספת צוות':           { en:'Add team',             ar:'إضافة فريق',       ru:'Добавить команду' },
  'מחלקה חדשה':           { en:'New department',       ar:'قسم جديد',         ru:'Новый отдел' },
  'קטגוריה חדשה':         { en:'New category',         ar:'فئة جديدة',        ru:'Новая категория' },
  'טופס חדש':             { en:'New form',             ar:'نموذج جديد',       ru:'Новая форма' },
  'דוח':                 { en:'Report',               ar:'تقرير',            ru:'Отчёт' },
  'דוח מלא':              { en:'Full report',          ar:'تقرير كامل',       ru:'Полный отчёт' },
  'חזור אחורה':           { en:'Go back',              ar:'العودة',           ru:'Назад' },
  'חזור לדשבורד':         { en:'Back to dashboard',    ar:'العودة إلى لوحة المعلومات', ru:'На главную' },
  'כניסה ←':              { en:'Sign in ←',            ar:'تسجيل الدخول ←',   ru:'Войти ←' },
  'מסננים מתקדמים':       { en:'Advanced filters',     ar:'تصفيات متقدمة',    ru:'Расширенные фильтры' },
  'קטגוריה':              { en:'Category',             ar:'فئة',              ru:'Категория' },
  'קונפיגורציה':          { en:'Configuration',        ar:'إعدادات',          ru:'Конфигурация' },
  'חיבור':               { en:'Connect',              ar:'الاتصال',          ru:'Подключить' },

  // ── Tabs ───────────────────────────────────────────────────
  'פתוחות':              { en:'Open',                 ar:'مفتوحة',           ru:'Открытые' },
  'דחופות':              { en:'Urgent',               ar:'عاجلة',            ru:'Срочные' },
  'חורגות SLA':           { en:'SLA breach',           ar:'تجاوز SLA',        ru:'Нарушение SLA' },
  'פעילים':              { en:'Active',               ar:'نشط',              ru:'Активные' },
  'ממתינים':             { en:'Pending',              ar:'بانتظار',          ru:'Ожидают' },

  // ── Status / priority ──────────────────────────────────────
  'חדש':                 { en:'New',                  ar:'جديد',             ru:'Новая' },
  'בטיפול':              { en:'In progress',          ar:'قيد المعالجة',     ru:'В работе' },
  'מאושר':               { en:'Approved',             ar:'تمت الموافقة',     ru:'Одобрена' },
  'נדחה':                { en:'Rejected',             ar:'مرفوض',            ru:'Отклонена' },
  'מוקפא':               { en:'Frozen',               ar:'مجمد',             ru:'Заморожена' },
  'הועבר':               { en:'Transferred',          ar:'تمت الإحالة',      ru:'Передана' },
  'פתוח':                { en:'Open',                 ar:'مفتوح',            ru:'Открыта' },
  'דחוף':                { en:'Urgent',               ar:'عاجل',             ru:'Срочно' },
  'גבוה':                { en:'High',                 ar:'عالي',             ru:'Высокий' },
  'בינוני':              { en:'Medium',               ar:'متوسط',            ru:'Средний' },
  'רגיל':                { en:'Normal',               ar:'عادي',             ru:'Обычный' },
  'נמוך':                { en:'Low',                  ar:'منخفض',            ru:'Низкий' },
  'פעיל':                { en:'Active',               ar:'نشط',              ru:'Активный' },
  'מחובר':               { en:'Connected',            ar:'متصل',             ru:'Подключено' },
  'לא פעיל':              { en:'Inactive',             ar:'غير نشط',          ru:'Неактивно' },

  // ── Login / Pending / 404 ──────────────────────────────────
  'כניסה למערכת':         { en:'Sign in',              ar:'تسجيل الدخول',     ru:'Вход в систему' },
  'ברוכים הבאים חזרה':    { en:'Welcome back',         ar:'مرحبًا بعودتك',     ru:'С возвращением' },
  'אימייל':              { en:'Email',                ar:'البريد الإلكتروني', ru:'Email' },
  'סיסמה':               { en:'Password',             ar:'كلمة المرور',      ru:'Пароль' },
  'זכרו אותי':            { en:'Remember me',          ar:'تذكرني',           ru:'Запомнить меня' },
  'שכחתי סיסמה':          { en:'Forgot password',      ar:'نسيت كلمة المرور', ru:'Забыли пароль' },
  'אין לכם חשבון?':       { en:'No account?',          ar:'لا تملك حسابًا؟',   ru:'Нет аккаунта?' },
  'בקשו גישה':            { en:'Request access',       ar:'طلب وصول',         ru:'Запросить доступ' },
  'הזינו את פרטי הכניסה שלכם כדי להתחיל': {
    en:'Enter your credentials to get started',
    ar:'أدخل بيانات الدخول للبدء',
    ru:'Введите учётные данные, чтобы начать',
  },
  'החשבון שלך ממתין לאישור':{ en:'Your account is awaiting approval', ar:'حسابك بانتظار الموافقة', ru:'Аккаунт ожидает подтверждения' },
  'הדף שחיפשת לא נמצא':   { en:'The page you requested was not found', ar:'الصفحة المطلوبة غير موجودة', ru:'Запрашиваемая страница не найдена' },

  // ── Accessibility menu ─────────────────────────────────────
  'תפריט נגישות':         { en:'Accessibility menu',   ar:'قائمة إمكانية الوصول', ru:'Меню доступности' },
  'הגדל גופן':            { en:'Increase font',        ar:'تكبير الخط',       ru:'Увеличить шрифт' },
  'הקטן גופן':            { en:'Decrease font',        ar:'تصغير الخط',       ru:'Уменьшить шрифт' },
  'ניגודיות גבוהה':       { en:'High contrast',        ar:'تباين عالٍ',       ru:'Высокий контраст' },
  'הדגשת קישורים':       { en:'Highlight links',      ar:'إبراز الروابط',    ru:'Подсветить ссылки' },
  'עצור אנימציות':        { en:'Stop animations',      ar:'إيقاف الرسوم المتحركة', ru:'Остановить анимации' },
  'גופן קריא':            { en:'Readable font',        ar:'خط قابل للقراءة',  ru:'Читаемый шрифт' },
  'מצביע גדול':           { en:'Big cursor',           ar:'مؤشر كبير',        ru:'Большой курсор' },
  'איפוס נגישות':         { en:'Reset accessibility',  ar:'إعادة تعيين',      ru:'Сбросить доступность' },
  'הצהרת נגישות':         { en:'Accessibility statement', ar:'بيان إمكانية الوصول', ru:'Заявление о доступности' },
  'דלג לתוכן':            { en:'Skip to content',      ar:'تخطى إلى المحتوى', ru:'Перейти к содержимому' },
};

const EPR_LANG_DIRS   = { he:'rtl', ar:'rtl', en:'ltr', ru:'ltr' };
const EPR_LANG_LABELS = { he:'עברית', en:'English', ar:'العربية', ru:'Русский' };
const EPR_LANG_FLAGS  = { he:'🇮🇱',     en:'🇬🇧',       ar:'🇸🇦',       ru:'🇷🇺' };
const EPR_LANGS = ['he','en','ar','ru'];

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
