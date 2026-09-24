/* ============================================================
   script.js — المحرّك الأساسي
   ============================================================ */

/* ============ قاعدة بيانات الحروف الـ 28 ============ */
const LETTERS_DB = {
  "ا": { abjadOrder: 1, nili: "تأليفٌ إنشائيّ وجوديّ من تعامدٍ بين حركتي الزّمان والمكان", kinetic: "مؤلف الحركة ومنشأها", keyword: "تأليف", degrees: "مراتب", zodiac: "الحمل", mansion: "الشرطان", level: "علوي", light: "نوراني", gender: "مذكر", direction: "شرقي", abjadValue: 1, abjadNature: "ناري", ayqaghNature: "ناري", ayqaghValue: 9, planet: "لاهوتية", weight: "خفيف", beauty: "جلالي", fortune: "سعد", speech: "صامت", healing: "شافي", subjugation: "تسخير" },
  "ب": { abjadOrder: 2, nili: "انبثاقٌ يفتح المجال من مَكْمَن الطّاقة وإلحاح الحاجة", kinetic: "انبثاق للحركة بعد كمون", keyword: "انبثاق", degrees: "مراتب", zodiac: "الثور", mansion: "البطين", level: "", light: "ظلماني", gender: "مذكر", direction: "شمال", abjadValue: 2, abjadNature: "هوائي", ayqaghNature: "ناري", ayqaghValue: 9, planet: "العرش", weight: "ثقيل", beauty: "جلالي", fortune: "نحس", speech: "ناطق", healing: "شافي", subjugation: "○" },
  "ت": { abjadOrder: 400, nili: "اجتذاب الحركات وتكاثفها لبناء قوّة جديدة", kinetic: "اجتذاب الحركة لأمثالها", keyword: "اجتذاب", degrees: "روابع", zodiac: "الجدي", mansion: "سعد الذابح", level: "", light: "ظلماني", gender: "مذكر", direction: "شمال", abjadValue: 400, abjadNature: "هوائي", ayqaghNature: "ترابي", ayqaghValue: 16, planet: "العرش", weight: "ثقيل", beauty: "مشترك", fortune: "سعد", speech: "ناطق", healing: "شافي", subjugation: "تسخير" },
  "ث": { abjadOrder: 500, nili: "تكاثرٌ كمّي بثباتٍ وتريثٍ متابع", kinetic: "تسكين الحركة لثباتها", keyword: "تسكين", degrees: "روابع", zodiac: "الدلو", mansion: "سعد بلع", level: "", light: "ظلماني", gender: "مؤنث", direction: "جنوب", abjadValue: 500, abjadNature: "مائي", ayqaghNature: "هوائي", ayqaghValue: 12, planet: "العرش", weight: "خفيف", beauty: "مشترك", fortune: "سعد", speech: "ناطق", healing: "شافي", subjugation: "تسخير" },
  "ج": { abjadOrder: 3, nili: "دمجٌ وجمعٌ لِمَا تناثر وما تفاقم", kinetic: "جعل الحركة قائمة بذاتها", keyword: "جمع", degrees: "مراتب", zodiac: "الجوزاء", mansion: "الثريا", level: "", light: "ظلماني", gender: "مؤنث", direction: "جنوب", abjadValue: 3, abjadNature: "مائي", ayqaghNature: "ناري", ayqaghValue: 9, planet: "الكرسي", weight: "خفيف", beauty: "مشترك", fortune: "نحس", speech: "ناطق", healing: "○", subjugation: "○" },
  "ح": { abjadOrder: 8, nili: "نَماءٌ مُتعاظمٌ من داخل الحركة", kinetic: "تعاظم الحركة في ذاتها", keyword: "تعاظم", degrees: "درج", zodiac: "العقرب", mansion: "النثرة", level: "علوي", light: "نوراني", gender: "مؤنث", direction: "غربي", abjadValue: 8, abjadNature: "ترابي", ayqaghNature: "هوائي", ayqaghValue: 12, planet: "الكرسي", weight: "ثقيل", beauty: "جمالي", fortune: "سعد", speech: "صامت", healing: "○", subjugation: "تسخير" },
  "خ": { abjadOrder: 600, nili: "خروجٌ مُبطّن لإخماد الحركة وكبت جماحها", kinetic: "كبت جماح الحركة", keyword: "اخماد", degrees: "روابع", zodiac: "الحوت", mansion: "سعد السعود", level: "", light: "ظلماني", gender: "مؤنث", direction: "غربي", abjadValue: 600, abjadNature: "ترابي", ayqaghNature: "ناري", ayqaghValue: 9, planet: "الكرسي", weight: "ثقيل", beauty: "جمالي", fortune: "نحس", speech: "ناطق", healing: "○", subjugation: "تسخير" },
  "د": { abjadOrder: 4, nili: "اندفاعٌ قصديّ الدّلالة بالحركة لأبعد مدى", kinetic: "اندفاع الحركة بتدبير مقصود", keyword: "اندفاع", degrees: "مراتب", zodiac: "السرطان", mansion: "الدبران", level: "", light: "ظلماني", gender: "مؤنث", direction: "غربي", abjadValue: 4, abjadNature: "ترابي", ayqaghNature: "مائي", ayqaghValue: 15, planet: "زحل", weight: "ثقيل", beauty: "جمالي", fortune: "سعد", speech: "صامت", healing: "○", subjugation: "تسخير" },
  "ذ": { abjadOrder: 700, nili: "تذليل مرور وتواصل الحركة حِسِّيّاً بالتحامها بالأصل", kinetic: "تذليل الحركة لتسكينها", keyword: "تذليل", degrees: "خوامس", zodiac: "الحمل", mansion: "سعد الأخبيه", level: "", light: "ظلماني", gender: "مذكر", direction: "شرقي", abjadValue: 700, abjadNature: "ناري", ayqaghNature: "ترابي", ayqaghValue: 16, planet: "زحل", weight: "خفيف", beauty: "جلالي", fortune: "نحس", speech: "ناطق", healing: "○", subjugation: "تسخير" },
  "ر": { abjadOrder: 200, nili: "تكرارٌ للحركة بشكل مُنظّم يستبطن المحاذير", kinetic: "تكرار الحركة بترتيب معين", keyword: "تكرار", degrees: "ثوالث", zodiac: "العقرب", mansion: "النعايم", level: "علوي", light: "نوراني", gender: "مؤنث", direction: "غربي", abjadValue: 200, abjadNature: "ترابي", ayqaghNature: "ناري", ayqaghValue: 9, planet: "المشتري", weight: "ثقيل", beauty: "جمالي", fortune: "نحس", speech: "صامت", healing: "○", subjugation: "تسخير" },
  "ز": { abjadOrder: 7, nili: "إبرازُ تكرار الحركة مادِّيا", kinetic: "ازاحة الحركة وتزحيفها", keyword: "ازاحة", degrees: "درج", zodiac: "الميزان", mansion: "الذراع", level: "", light: "ظلماني", gender: "مؤنث", direction: "جنوب", abjadValue: 7, abjadNature: "مائي", ayqaghNature: "هوائي", ayqaghValue: 12, planet: "المشتري", weight: "خفيف", beauty: "مشترك", fortune: "نحس", speech: "ناطق", healing: "○", subjugation: "○" },
  "س": { abjadOrder: 90, nili: "هيمنةٌ وبسط نفوذ فوقيّ متعالي", kinetic: "انسلال الحركة خفية", keyword: "انسلال", degrees: "ثواني", zodiac: "السرطان", mansion: "الغفر", level: "علوي", light: "نوراني", gender: "مؤنث", direction: "جنوب", abjadValue: 90, abjadNature: "مائي", ayqaghNature: "ناري", ayqaghValue: 9, planet: "المريخ", weight: "خفيف", beauty: "مشترك", fortune: "سعد", speech: "صامت", healing: "○", subjugation: "تسخير" },
  "ش": { abjadOrder: 300, nili: "تشعّبٌ وانتشارٌ للحركة من أرومة يضمر التضليل", kinetic: "تشعب الحركة الى وجوه اخرى", keyword: "تشعب", degrees: "روابع", zodiac: "القوس", mansion: "البلدة", level: "", light: "ظلماني", gender: "مذكر", direction: "شرقي", abjadValue: 300, abjadNature: "ناري", ayqaghNature: "مائي", ayqaghValue: 15, planet: "المريخ", weight: "خفيف", beauty: "جلالي", fortune: "نحس", speech: "ناطق", healing: "○", subjugation: "تسخير" },
  "ص": { abjadOrder: 60, nili: "ترابطٌ وتراصٌ وتفاعلٌ في الحركة ودلالتها", kinetic: "تحويل الحركة المستقلة", keyword: "تحويل", degrees: "ثوالث", zodiac: "الجوزاء", mansion: "القلب", level: "علوي", light: "نوراني", gender: "مذكر", direction: "شمال", abjadValue: 60, abjadNature: "هوائي", ayqaghNature: "هوائي", ayqaghValue: 12, planet: "الشمس", weight: "ثقيل", beauty: "مشترك", fortune: "سعد", speech: "صامت", healing: "○", subjugation: "○" },
  "ض": { abjadOrder: 800, nili: "الالتزامُ بعدمِ الانحراف أو الميل عن القصد", kinetic: "إحاطة الحركة", keyword: "ضبط", degrees: "خوامس", zodiac: "السنبله", mansion: "الفرع المقدم", level: "", light: "ظلماني", gender: "مذكر", direction: "شمال", abjadValue: 800, abjadNature: "هوائي", ayqaghNature: "ناري", ayqaghValue: 9, planet: "الشمس", weight: "خفيف", beauty: "مشترك", fortune: "نحس", speech: "ناطق", healing: "○", subjugation: "تسخير" },
  "ط": { abjadOrder: 9, nili: "تضخّمٌ احتوائي واجتذابٌ داخليّ للحركة", kinetic: "طي الحركة بعيد عن المركز", keyword: "طي", degrees: "دقايق", zodiac: "القوس", mansion: "الطرفة", level: "علوي", light: "نوراني", gender: "مذكر", direction: "شرقي", abjadValue: 9, abjadNature: "ناري", ayqaghNature: "ترابي", ayqaghValue: 16, planet: "الزهرة", weight: "خفيف", beauty: "جلالي", fortune: "سعد", speech: "صامت", healing: "شافي", subjugation: "○" },
  "ظ": { abjadOrder: 900, nili: "تعاظم ظُهور الحركة واتضاحها في تضخيم الظّاهر", kinetic: "ظهور الحركة في مركزها", keyword: "ظهور", degrees: "خوامس", zodiac: "الثور", mansion: "الفرع المؤخر", level: "", light: "ظلماني", gender: "مؤنث", direction: "جنوب", abjadValue: 900, abjadNature: "مائي", ayqaghNature: "مائي", ayqaghValue: 15, planet: "الزهرة", weight: "ثقيل", beauty: "مشترك", fortune: "نحس", speech: "ناطق", healing: "شافي", subjugation: "تسخير" },
  "ع": { abjadOrder: 70, nili: "مُعاينةٌ داخليَّة وخارجيَّة للمبهم في الحركة ووجهتها", kinetic: "اتضاح معالم الحركة المبهمة", keyword: "اتضاح", degrees: "ثواني", zodiac: "السرطان", mansion: "الزباني", level: "علوي", light: "نوراني", gender: "مؤنث", direction: "غربي", abjadValue: 70, abjadNature: "ترابي", ayqaghNature: "مائي", ayqaghValue: 15, planet: "عطارد", weight: "ثقيل", beauty: "جمالي", fortune: "سعد", speech: "صامت", healing: "○", subjugation: "○" },
  "غ": { abjadOrder: 1000, nili: "تمويه ظهور الحركة وبيان مقصدها، بإخفاء معالمها", kinetic: "ارجاع الحركة إلى مكمنها", keyword: "تغييب", degrees: "خوامس", zodiac: "الجوزاء", mansion: "بطن الحوت", level: "", light: "ظلماني", gender: "مؤنث", direction: "غربي", abjadValue: 1000, abjadNature: "ترابي", ayqaghNature: "ترابي", ayqaghValue: 16, planet: "عطارد", weight: "ثقيل", beauty: "جمالي", fortune: "نحس", speech: "ناطق", healing: "○", subjugation: "تسخير" },
  "ف": { abjadOrder: 80, nili: "فصلٌ وتفريقٌ للتمييز والبت في وجهة الحركة", kinetic: "تفرّق الحركة إلى ما يفي كافة الاتجاهات", keyword: "تفرق", degrees: "ثوالث", zodiac: "الأسد", mansion: "الإكليل", level: "", light: "ظلماني", gender: "مذكر", direction: "شرقي", abjadValue: 80, abjadNature: "ناري", ayqaghNature: "مائي", ayqaghValue: 15, planet: "القمر", weight: "خفيف", beauty: "جلالي", fortune: "نحس", speech: "ناطق", healing: "شافي", subjugation: "تسخير" },
  "ق": { abjadOrder: 100, nili: "قوّة فصل لبيان وتقفّي أثر الحركة", kinetic: "اندفاع الحركة بتدبير مقصود", keyword: "انقياد", degrees: "ثوالث", zodiac: "الميزان", mansion: "الشوله", level: "علوي", light: "نوراني", gender: "مؤنث", direction: "جنوب", abjadValue: 100, abjadNature: "مائي", ayqaghNature: "مائي", ayqaghValue: 15, planet: "القمر", weight: "خفيف", beauty: "مشترك", fortune: "سعد", speech: "ناطق", healing: "○", subjugation: "تسخير" },
  "ك": { abjadOrder: 20, nili: "تكتلُ ما تآلف وتوافق في إطار ومحتوى", kinetic: "تكتل الحركة مع من يشبهها", keyword: "تكتل", degrees: "دقايق", zodiac: "الدلو", mansion: "الخرثان", level: "سفلي", light: "نوراني", gender: "مؤنث", direction: "جنوب", abjadValue: 20, abjadNature: "مائي", ayqaghNature: "مائي", ayqaghValue: 15, planet: "النار", weight: "خفيف", beauty: "مشترك", fortune: "سعد", speech: "صامت", healing: "شافي", subjugation: "تسخير" },
  "ل": { abjadOrder: 30, nili: "تلاحمٌ وتوصيلٌ لنسج حركة جديدة", kinetic: "تلاحم ما يمكن أن يكون حركة واحدة", keyword: "تلاحم", degrees: "دقايق", zodiac: "الحوت", mansion: "الصرفة", level: "سفلي", light: "نوراني", gender: "مؤنث", direction: "غربي", abjadValue: 30, abjadNature: "ترابي", ayqaghNature: "هوائي", ayqaghValue: 12, planet: "الهواء", weight: "ثقيل", beauty: "جمالي", fortune: "سعد", speech: "صامت", healing: "شافي", subjugation: "○" },
  "م": { abjadOrder: 40, nili: "تكميل النّواقص لإتمام العمل والحركة", kinetic: "تكامل الحركة بإتمام ما ينقصها", keyword: "تكامل", degrees: "ثواني", zodiac: "الحمل", mansion: "العواء", level: "سفلي", light: "نوراني", gender: "مذكر", direction: "شرقي", abjadValue: 40, abjadNature: "ناري", ayqaghNature: "ترابي", ayqaghValue: 16, planet: "الحيوان", weight: "خفيف", beauty: "جلالي", fortune: "سعد", speech: "صامت", healing: "○", subjugation: "تسخير" },
  "ن": { abjadOrder: 50, nili: "تكوينٌ مستمرٌّ لحركةٍ مستقرّةٍ مكاناً وزمان", kinetic: "إنشاء مستمر للحركة", keyword: "انشاء", degrees: "ثواني", zodiac: "الثور", mansion: "السماك", level: "سفلي", light: "نوراني", gender: "مذكر", direction: "شمال", abjadValue: 50, abjadNature: "هوائي", ayqaghNature: "ترابي", ayqaghValue: 16, planet: "النبات", weight: "ثقيل", beauty: "جمالي", fortune: "نحس", speech: "ناطق", healing: "○", subjugation: "○" },
  "ه": { abjadOrder: 5, nili: "انتقالٌ محمولٌ غير مستقر، فإذا استقرّ جذب", kinetic: "انهاء الحركة", keyword: "انتهاء", degrees: "درج", zodiac: "الأسد", mansion: "الهقعة", level: "سفلي", light: "نوراني", gender: "مذكر", direction: "شرقي", abjadValue: 5, abjadNature: "ناري", ayqaghNature: "هوائي", ayqaghValue: 12, planet: "المعدن", weight: "خفيف", beauty: "جلالي", fortune: "سعد", speech: "صامت", healing: "○", subjugation: "○" },
  "و": { abjadOrder: 6, nili: "تموضعٌ مكانيّ يحدّد حيّز الحركة", kinetic: "ديمومة الحركة في المكان", keyword: "تموضع", degrees: "درج", zodiac: "السنبله", mansion: "الهنعة", level: "", light: "ظلماني", gender: "مذكر", direction: "شمال", abjadValue: 6, abjadNature: "هوائي", ayqaghNature: "ترابي", ayqaghValue: 16, planet: "الماء", weight: "ثقيل", beauty: "جلالي", fortune: "سعد", speech: "صامت", healing: "○", subjugation: "○" },
  "ي": { abjadOrder: 10, nili: "ملازمة الحركة في البُعد الزّمنيّ المستمر", kinetic: "ديمومة الحركة في الزمان", keyword: "ديمومة", degrees: "دقايق", zodiac: "الجدي", mansion: "الجبهة", level: "سفلي", light: "نوراني", gender: "مذكر", direction: "شمال", abjadValue: 10, abjadNature: "هوائي", ayqaghNature: "هوائي", ayqaghValue: 12, planet: "التراب", weight: "ثقيل", beauty: "جمالي", fortune: "سعد", speech: "ناطق", healing: "شافي", subjugation: "○" }
};

/* ============ قاعدة بيانات الأسماء ============ */
const NAMES_DB = {
  "محمد": { meaning: "الكثير الحمد، المحمود الخصال، المثنى عليه", gender: "ذكر", origin: "عربي" },
  "أحمد": { meaning: "الأكثر حمداً وشكراً لله، المحمود", gender: "ذكر", origin: "عربي" },
  "محمود": { meaning: "المحمود الذي يُحمد على أفعاله", gender: "ذكر", origin: "عربي" },
  "علي": { meaning: "العالي الرفيع، الشريف القدر", gender: "ذكر", origin: "عربي" },
  "حسن": { meaning: "الجمال والإحسان، الخير", gender: "ذكر", origin: "عربي" },
  "حسين": { meaning: "تصغير الحسن، الجميل الصغير", gender: "ذكر", origin: "عربي" },
  "عمر": { meaning: "العمر والحياة، العامر بالخير", gender: "ذكر", origin: "عربي" },
  "عثمان": { meaning: "الشاب النشيط، القوي", gender: "ذكر", origin: "عربي" },
  "خالد": { meaning: "الباقي الدائم، الخلود", gender: "ذكر", origin: "عربي" },
  "يوسف": { meaning: "الله يزيد، العطاء والزيادة", gender: "ذكر", origin: "عربي" },
  "إبراهيم": { meaning: "أبو الجمهور، الأب الرحيم", gender: "ذكر", origin: "عربي" },
  "عبد الله": { meaning: "عابد الله وعبده المخلص", gender: "ذكر", origin: "عربي" },
  "سعيد": { meaning: "السعيد، الفرحان، المحظوظ", gender: "ذكر", origin: "عربي" },
  "طارق": { meaning: "الآتي ليلاً، القارع، النجم", gender: "ذكر", origin: "عربي" },
  "كريم": { meaning: "الكريم، الجواد، الشريف", gender: "ذكر", origin: "عربي" },
  "يحيى": { meaning: "الحياة، الذي يحيا", gender: "ذكر", origin: "عربي" },
  "مصطفى": { meaning: "المختار، المصطفى", gender: "ذكر", origin: "عربي" },
  "زياد": { meaning: "النمو والزيادة، الفاضل", gender: "ذكر", origin: "عربي" },
  "رامي": { meaning: "الذي يرمي، القاذف", gender: "ذكر", origin: "عربي" },
  "سامي": { meaning: "العالي الرفيع، السامي القدر", gender: "ذكر", origin: "عربي" },
  "كمال": { meaning: "الكمال والتمام", gender: "ذكر", origin: "عربي" },
  "جمال": { meaning: "الجمال والحسن", gender: "ذكر", origin: "عربي" },
  "أنس": { meaning: "الأُنس والسكينة", gender: "ذكر", origin: "عربي" },
  "أيمن": { meaning: "المبارك، اليمين", gender: "ذكر", origin: "عربي" },
  "باسل": { meaning: "الشجاع، الجسور", gender: "ذكر", origin: "عربي" },
  "بشير": { meaning: "حامل الخبر السار", gender: "ذكر", origin: "عربي" },
  "حازم": { meaning: "الحكيم، الرصين", gender: "ذكر", origin: "عربي" },
  "حمزة": { meaning: "الأسد، القوي", gender: "ذكر", origin: "عربي" },
  "خليل": { meaning: "الصديق الوفي", gender: "ذكر", origin: "عربي" },
  "رائد": { meaning: "القائد، المبتدع", gender: "ذكر", origin: "عربي" },
  "رشيد": { meaning: "صاحب الرأي السديد", gender: "ذكر", origin: "عربي" },
  "سامر": { meaning: "المتحدث في الليل", gender: "ذكر", origin: "عربي" },
  "سلمان": { meaning: "السليم من العيوب", gender: "ذكر", origin: "عربي" },
  "شادي": { meaning: "المغني، المنشد", gender: "ذكر", origin: "عربي" },
  "صفوان": { meaning: "الصفا والنقاء", gender: "ذكر", origin: "عربي" },
  "عادل": { meaning: "العادل، صاحب العدل", gender: "ذكر", origin: "عربي" },
  "عبد الرحمن": { meaning: "عابد الرحمن", gender: "ذكر", origin: "عربي" },
  "عزيز": { meaning: "القوي، الغالي", gender: "ذكر", origin: "عربي" },
  "فارس": { meaning: "الفارس، الشجاع", gender: "ذكر", origin: "عربي" },
  "فيصل": { meaning: "الفاصل بين الحق والباطل", gender: "ذكر", origin: "عربي" },
  "مالك": { meaning: "المالك، صاحب الملك", gender: "ذكر", origin: "عربي" },
  "ماهر": { meaning: "الماهر، البارع", gender: "ذكر", origin: "عربي" },
  "نبيل": { meaning: "النبيل، الشريف", gender: "ذكر", origin: "عربي" },
  "ناصر": { meaning: "الناصر، المساعد", gender: "ذكر", origin: "عربي" },
  "هاني": { meaning: "الهانئ، السعيد", gender: "ذكر", origin: "عربي" },
  "وسام": { meaning: "الوسام، الشرف", gender: "ذكر", origin: "عربي" },
  "أسامة": { meaning: "من أسماء الأسد", gender: "ذكر", origin: "عربي" },
  "أوس": { meaning: "الذئب، العطاء", gender: "ذكر", origin: "عربي" },
  "تيم": { meaning: "العبد، الخادم", gender: "ذكر", origin: "عربي" },
  "تميم": { meaning: "الكامل الخَلْق والخُلُق", gender: "ذكر", origin: "عربي" },
  "ريان": { meaning: "المرتوي من الماء", gender: "ذكر", origin: "عربي" },
  "سيف": { meaning: "السيف، القاطع", gender: "ذكر", origin: "عربي" },
  "فراس": { meaning: "الحدق، الذكي", gender: "ذكر", origin: "عربي" },
  "معاذ": { meaning: "المحصن باسم الله", gender: "ذكر", origin: "عربي" },
  "منير": { meaning: "المضيء، المنير", gender: "ذكر", origin: "عربي" },
  "ياسر": { meaning: "السهل، الميسور", gender: "ذكر", origin: "عربي" },
  "يعقوب": { meaning: "الذي يعقب، المتأخر", gender: "ذكر", origin: "عربي" },
  "فاطمة": { meaning: "التي فُطم عنها الشر، الطاهرة", gender: "أنثى", origin: "عربي" },
  "عائشة": { meaning: "الحية، ذات الحياة الطيبة", gender: "أنثى", origin: "عربي" },
  "مريم": { meaning: "العابدة، السيدة", gender: "أنثى", origin: "عربي" },
  "زينب": { meaning: "شجرة طيبة الزهر", gender: "أنثى", origin: "عربي" },
  "خديجة": { meaning: "الصادقة", gender: "أنثى", origin: "عربي" },
  "سارة": { meaning: "الأميرة، السيدة", gender: "أنثى", origin: "عربي" },
  "نور": { meaning: "النور والضياء", gender: "أنثى", origin: "عربي" },
  "هدى": { meaning: "الهداية، الرشاد", gender: "أنثى", origin: "عربي" },
  "ليلى": { meaning: "الليلة، السمراء", gender: "أنثى", origin: "عربي" },
  "سلمى": { meaning: "السليمة، الآمنة", gender: "أنثى", origin: "عربي" },
  "أمل": { meaning: "الرجاء، الأمنية", gender: "أنثى", origin: "عربي" },
  "رنا": { meaning: "النظرة الجميلة", gender: "أنثى", origin: "عربي" },
  "دينا": { meaning: "اليوم، الدين", gender: "أنثى", origin: "عربي" },
  "ياسمين": { meaning: "زهرة الياسمين", gender: "أنثى", origin: "عربي" },
  "ليان": { meaning: "اللين والنعومة", gender: "أنثى", origin: "عربي" },
  "جنى": { meaning: "ما يُجنى من الثمار", gender: "أنثى", origin: "عربي" },
  "ملاك": { meaning: "الملك، الرسول", gender: "أنثى", origin: "عربي" },
  "شهد": { meaning: "العسل، الحلاوة", gender: "أنثى", origin: "عربي" },
  "ريم": { meaning: "الغزال الأبيض", gender: "أنثى", origin: "عربي" },
  "لمى": { meaning: "السمرة في الشفاه", gender: "أنثى", origin: "عربي" },
  "أميرة": { meaning: "ذات المكانة الرفيعة", gender: "أنثى", origin: "عربي" },
  "إيمان": { meaning: "التصديق، الإيمان", gender: "أنثى", origin: "عربي" },
  "بشرى": { meaning: "الخبر السار", gender: "أنثى", origin: "عربي" },
  "بسمة": { meaning: "الابتسامة", gender: "أنثى", origin: "عربي" },
  "بيان": { meaning: "الوضوح، الفصاحة", gender: "أنثى", origin: "عربي" },
  "تالا": { meaning: "النخلة الصغيرة", gender: "أنثى", origin: "عربي" },
  "جود": { meaning: "الكرم، الجود", gender: "أنثى", origin: "عربي" },
  "جوري": { meaning: "الورد الأحمر", gender: "أنثى", origin: "عربي" },
  "حلا": { meaning: "الحلاوة، الجمال", gender: "أنثى", origin: "عربي" },
  "حنين": { meaning: "الشوق، الحنين", gender: "أنثى", origin: "عربي" },
  "دانية": { meaning: "القريبة، الدنيا", gender: "أنثى", origin: "عربي" },
  "دعاء": { meaning: "التوسل، الابتهال", gender: "أنثى", origin: "عربي" },
  "رغد": { meaning: "العيش الهنيء", gender: "أنثى", origin: "عربي" },
  "زهرة": { meaning: "الزهرة، الجميلة", gender: "أنثى", origin: "عربي" },
  "سديم": { meaning: "الضباب الخفيف", gender: "أنثى", origin: "عربي" },
  "سجى": { meaning: "الهدوء، السكينة", gender: "أنثى", origin: "عربي" },
  "سناء": { meaning: "الضوء، النور", gender: "أنثى", origin: "عربي" },
  "شذى": { meaning: "العطر، الرائحة الطيبة", gender: "أنثى", origin: "عربي" },
  "شيماء": { meaning: "ذات الشامة", gender: "أنثى", origin: "عربي" },
  "صفاء": { meaning: "النقاء، الصفاء", gender: "أنثى", origin: "عربي" },
  "ضحى": { meaning: "وقت شروق الشمس", gender: "أنثى", origin: "عربي" },
  "علا": { meaning: "العلو، الرفعة", gender: "أنثى", origin: "عربي" },
  "غادة": { meaning: "الجميلة، الناعمة", gender: "أنثى", origin: "عربي" },
  "فرح": { meaning: "السرور، الفرح", gender: "أنثى", origin: "عربي" },
  "لجين": { meaning: "الفضة، النقاء", gender: "أنثى", origin: "عربي" },
  "لينا": { meaning: "اللين، النعومة", gender: "أنثى", origin: "عربي" },
  "مروة": { meaning: "الحجر الأبيض", gender: "أنثى", origin: "عربي" },
  "مها": { meaning: "البقرة الوحشية", gender: "أنثى", origin: "عربي" },
  "ميار": { meaning: "الوضوح، الإشراق", gender: "أنثى", origin: "عربي" },
  "نجود": { meaning: "الكريمة، السخية", gender: "أنثى", origin: "عربي" },
  "نورا": { meaning: "النور، الضوء", gender: "أنثى", origin: "عربي" },
  "هيا": { meaning: "الجميلة، الفاتنة", gender: "أنثى", origin: "عربي" },
  "وجد": { meaning: "الحب، الوجد", gender: "أنثى", origin: "عربي" },
  "وداد": { meaning: "المحبة، الود", gender: "أنثى", origin: "عربي" },
  "يارا": { meaning: "القوية، الشجاعة", gender: "أنثى", origin: "عربي" },
  "يقين": { meaning: "المعرفة الحقة", gender: "أنثى", origin: "عربي" },
  "آية": { meaning: "العلامة البارزة", gender: "أنثى", origin: "عربي" },
  "أبرار": { meaning: "الطاعة والخير", gender: "أنثى", origin: "عربي" },
  "إسراء": { meaning: "الرحلة الليلية", gender: "أنثى", origin: "عربي" },
  "إلهام": { meaning: "الإلهام، الوحي", gender: "أنثى", origin: "عربي" },
  "أمنية": { meaning: "الأمنية، الرغبة", gender: "أنثى", origin: "عربي" },
  "بتول": { meaning: "العذراء", gender: "أنثى", origin: "عربي" },
  "بلقيس": { meaning: "ملكة سبأ", gender: "أنثى", origin: "عربي" },
  "تسنيم": { meaning: "عين في الجنة", gender: "أنثى", origin: "عربي" },
  "جواهر": { meaning: "الجوهر، الثمين", gender: "أنثى", origin: "عربي" },
  "حبيبة": { meaning: "المحبوبة", gender: "أنثى", origin: "عربي" },
  "حنان": { meaning: "العطف، الحنان", gender: "أنثى", origin: "عربي" },
  "رشا": { meaning: "الغزال الصغير", gender: "أنثى", origin: "عربي" },
  "روان": { meaning: "الروح، النفس", gender: "أنثى", origin: "عربي" },
  "سدرة": { meaning: "شجرة السدر", gender: "أنثى", origin: "عربي" },
  "سهام": { meaning: "السهام، القوية", gender: "أنثى", origin: "عربي" },
  "سوسن": { meaning: "زهرة السوسن", gender: "أنثى", origin: "عربي" },
  "عبير": { meaning: "العطر", gender: "أنثى", origin: "عربي" },
  "علياء": { meaning: "الرفعة، العلو", gender: "أنثى", origin: "عربي" },
  "غالية": { meaning: "الثمينة", gender: "أنثى", origin: "عربي" },
  "لطيفة": { meaning: "اللطيفة، الرقيقة", gender: "أنثى", origin: "عربي" },
  "ميساء": { meaning: "الجميلة، الفاتنة", gender: "أنثى", origin: "عربي" },
  "نجاح": { meaning: "النجاح، الفلاح", gender: "أنثى", origin: "عربي" },
  "نسرين": { meaning: "زهرة النسرين", gender: "أنثى", origin: "عربي" },
  "نهاد": { meaning: "الرفعة، الشرف", gender: "أنثى", origin: "عربي" },
  "هالة": { meaning: "هالة القمر", gender: "أنثى", origin: "عربي" },
  "هند": { meaning: "الهند، البلاد", gender: "أنثى", origin: "عربي" },
  "وفاء": { meaning: "الوفاء، الإخلاص", gender: "أنثى", origin: "عربي" }
};

/* ============ التطبيع ============ */
function normalize(name) {
  return name.trim().replace(/\s+/g, " ")
    .replace(/[أإآ]/g, "ا").replace(/ة/g, "ه")
    .replace(/ى/g, "ي").replace(/ؤ/g, "و").replace(/ئ/g, "ي");
}

/* ============ محرّك التحليل ============ */
function analyzeName(rawName) {
  const normalized = normalize(rawName);
  const letters = normalized.split("").filter(c => c !== " " && LETTERS_DB[c]);

  let totalAbjad = 0, totalAyqagh = 0;
  const elementCount = {}, zodiacCount = {}, planetCount = {};
  const directionCount = {}, fortuneCount = {};
  let lightCount = 0, darkCount = 0, maleCount = 0, femaleCount = 0;
  let spokenCount = 0, silentCount = 0, beautyCount = 0, gloryCount = 0;

  letters.forEach(ch => {
    const L = LETTERS_DB[ch];
    totalAbjad += L.abjadValue;
    totalAyqagh += L.ayqaghValue;
    elementCount[L.abjadNature] = (elementCount[L.abjadNature] || 0) + 1;
    zodiacCount[L.zodiac] = (zodiacCount[L.zodiac] || 0) + 1;
    planetCount[L.planet] = (planetCount[L.planet] || 0) + 1;
    directionCount[L.direction] = (directionCount[L.direction] || 0) + 1;
    fortuneCount[L.fortune] = (fortuneCount[L.fortune] || 0) + 1;
    if (L.light === "نوراني") lightCount++; else if (L.light === "ظلماني") darkCount++;
    if (L.gender === "مذكر") maleCount++; else if (L.gender === "مؤنث") femaleCount++;
    if (L.speech === "ناطق") spokenCount++; else if (L.speech === "صامت") silentCount++;
    if (L.beauty === "جمالي") beautyCount++; else if (L.beauty === "جلالي") gloryCount++;
  });

  const narrative = buildNarrative(letters);
  const dominantEl = maxKey(elementCount);

  return {
    name: rawName, normalized, letters, totalAbjad, totalAyqagh,
    elementCount, zodiacCount, planetCount, directionCount, fortuneCount,
    lightCount, darkCount, maleCount, femaleCount,
    spokenCount, silentCount, beautyCount, gloryCount,
    dominantEl,
    dominantZodiac: maxKey(zodiacCount),
    dominantPlanet: maxKey(planetCount),
    dominantDirection: maxKey(directionCount),
    dominantFortune: maxKey(fortuneCount),
    zodiacFromNumber: getZodiacFromNumber(totalAbjad),
    temperament: getTemperament(dominantEl),
    narrative,
    personality: buildPersonalityProfile({
      dominantEl, lightCount, darkCount, maleCount, femaleCount,
      spokenCount, silentCount, beautyCount, gloryCount, fortuneCount
    })
  };
}

function buildNarrative(letters) {
  if (letters.length === 0) return { steps: [], fullText: "" };
  const steps = [];
  letters.forEach((ch, i) => {
    const L = LETTERS_DB[ch];
    const position = i === 0 ? "البداية" : i === letters.length - 1 ? "الخاتمة" : `المرحلة ${i + 1}`;
    steps.push({
      letter: ch, position, keyword: L.keyword, kinetic: L.kinetic, nili: L.nili,
      role: i === 0
        ? `يبدأ الاسم بحركة "${L.keyword}" — ${L.kinetic}`
        : i === letters.length - 1
          ? `ثم يُختم بحركة "${L.keyword}" — ${L.kinetic}`
          : `ثم يتلوها "${L.keyword}" — ${L.kinetic}`
    });
  });
  const verbs = letters.map(ch => LETTERS_DB[ch].kinetic);
  let fullText = `يبدأ الاسم بحركة "${verbs[0]}"`;
  for (let i = 1; i < verbs.length; i++) {
    if (i === verbs.length - 1 && verbs.length > 1) fullText += `، ثم يُختم بـ "${verbs[i]}"`;
    else fullText += `، ثم "${verbs[i]}"`;
  }
  fullText += `. ومعنى الاسم المتراكم من تسلسل حروفه: ${letters.map(ch => LETTERS_DB[ch].keyword).join(" ← ")}.`;
  return { steps, fullText };
}

function getTemperament(el) {
  const map = {
    "ناري":  { mizaj: "حار يابس", temperament: "صفراوي", desc: "طاقة عالية، حماس، حِدّة في الطبع، إقدام، قيادة" },
    "هوائي": { mizaj: "حار رطب",  temperament: "دموي",   desc: "اجتماعي، متفائل، مرن، سريع البديهة، محب للحركة" },
    "مائي":  { mizaj: "بارد رطب", temperament: "بلغمي",  desc: "هادئ، عاطفي، متأمل، حَسّاس، عميق المشاعر" },
    "ترابي": { mizaj: "بارد يابس", temperament: "سوداوي", desc: "رصين، صبور، عملي، متحفّظ، عميق التفكير" }
  };
  return map[el] || { mizaj: "—", temperament: "—", desc: "—" };
}

function getZodiacFromNumber(num) {
  const signs = ["الحمل","الثور","الجوزاء","السرطان","الأسد","السنبلة","الميزان","العقرب","القوس","الجدي","الدلو","الحوت"];
  const mod = ((num - 1) % 12 + 12) % 12;
  return signs[mod];
}

function buildPersonalityProfile(d) {
  const lines = [];
  const t = {
    "ناري":  "طبع ناري — حماسي، مبادر، قيادي",
    "هوائي": "طبع هوائي — متفائل، مرن، اجتماعي",
    "مائي":  "طبع مائي — عاطفي، حَسّاس، متعاطف",
    "ترابي": "طبع ترابي — رصين، صبور، عملي"
  }[d.dominantEl] || "";
  if (t) lines.push(t);

  if (d.lightCount > d.darkCount) lines.push("غالبية حروفه نورانية — يميل صاحبه إلى الروحانية والصفاء");
  else if (d.darkCount > d.lightCount) lines.push("غالبية حروفه ظلمانية — طاقة أرضية قوية وتماسك مع الواقع");
  else lines.push("توازن بين النوراني والظلماني — شخصية متوازنة");

  if (d.maleCount > d.femaleCount) lines.push("الحروف المذكّرة أكثر — طابع حازم، فعّال، إرادي");
  else if (d.femaleCount > d.maleCount) lines.push("الحروف المؤنّثة أكثر — طابع ناعم، لطيف، انفعالي");
  else lines.push("توازن بين المذكّر والمؤنث — مرونة في التعامل");

  if (d.spokenCount > d.silentCount) lines.push("حروفه الناطقة أكثر — تواصلي، معبّر، اجتماعي");
  else if (d.silentCount > d.spokenCount) lines.push("حروفه الصامتة أكثر — كتوم، متأمل، عميق");

  if (d.beautyCount > d.gloryCount) lines.push("الطابع الجمالي غالب — جاذبية، رقة، إبداع، فنّ");
  else if (d.gloryCount > d.beautyCount) lines.push("الطابع الجلالي غالب — هيبة، قوة، حزم، قيادة");
  else lines.push("توازن بين الجمالي والجلالي");

  const saad = d.fortuneCount["سعد"] || 0;
  const nahs = d.fortuneCount["نحس"] || 0;
  const mixed = d.fortuneCount["مشترك"] || 0;
  if (saad > nahs + mixed) lines.push("حروفه سعدية غالباً — توفيق وبركة");
  else if (nahs > saad + mixed) lines.push("حروفه نحسية غالباً — يحتاج إلى تعويض");
  else lines.push("مزيج بين السعد والنحس — مسار متقلّب");

  return lines;
}

function maxKey(obj) {
  let k = "-", max = 0;
  for (const [key, v] of Object.entries(obj)) if (v > max) { max = v; k = key; }
  return k;
}
function objectToString(obj) {
  return Object.entries(obj).map(([k, v]) => `${k}: ${v}`).join(" • ") || "—";
}
function findNameInfo(name) {
  if (NAMES_DB[name]) return NAMES_DB[name];
  const norm = normalize(name);
  for (const key of Object.keys(NAMES_DB)) {
    if (normalize(key) === norm) return NAMES_DB[key];
  }
  const noSpace = norm.replace(/\s/g, "");
  for (const key of Object.keys(NAMES_DB)) {
    if (normalize(key).replace(/\s/g, "") === noSpace) return NAMES_DB[key];
  }
  return null;
}
function pct(v, total) { if (!total) return 0; return Math.round((v / total) * 100); }

/* ============ التنقل ============ */
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo(0, 0);
}
function goHome() { showScreen('screen-home'); }

/* ============ البحث والعرض ============ */
let currentName = "";

function searchName() {
  const raw = document.getElementById('nameInput').value.trim();
  if (!raw) { alert("الرجاء إدخال الاسم"); return; }
  currentName = raw;
  addToHistory(raw);
  renderResult(raw);
  showScreen('screen-result');
}

function renderResult(name) {
  const analysis = analyzeName(name);
  const content = document.getElementById('resultContent');
  document.getElementById('resultName').textContent = name;

  const info = findNameInfo(name);
  let meaningHTML = info
    ? `<div class="card"><div class="card-title">📖 المعنى القاموسي</div>
        <p class="meaning-text">${info.meaning}</p>
        <div class="meta-row"><span class="meta-badge">${info.gender}</span><span class="meta-badge">${info.origin}</span></div></div>`
    : `<div class="card"><div class="card-title">📖 المعنى القاموسي</div>
        <p class="meaning-text" style="color:#999">لم يُعثر على معنى هذا الاسم في القاموس.</p></div>`;

  const narrativeHTML = `
    <div class="card">
      <div class="card-title">🔗 تركيب المعنى من تسلسل الحروف</div>
      <div class="narrative-box">${analysis.narrative.fullText}</div>
      <div class="narrative-steps">
        ${analysis.narrative.steps.map((s, i) => `
          <div class="nar-step">
            <div class="nar-num">${i + 1}</div>
            <div class="nar-char">${s.letter}</div>
            <div class="nar-text"><strong>${s.position}:</strong> ${s.role}</div>
          </div>`).join("")}
      </div>
    </div>`;

  const overallHTML = `
    <div class="card">
      <div class="card-title">🌟 الخصائص الإجمالية للاسم</div>
      <div class="summary-grid">
        <div class="sum-item"><span class="sum-lbl">القيمة الأبجدية</span><span class="sum-val">${analysis.totalAbjad}</span></div>
        <div class="sum-item"><span class="sum-lbl">القيمة الأيقغية</span><span class="sum-val">${analysis.totalAyqagh}</span></div>
        <div class="sum-item"><span class="sum-lbl">عدد الحروف</span><span class="sum-val">${analysis.letters.length}</span></div>
        <div class="sum-item"><span class="sum-lbl">العنصر الغالب</span><span class="sum-val">${analysis.dominantEl}</span></div>
        <div class="sum-item"><span class="sum-lbl">البرج الغالب</span><span class="sum-val">${analysis.dominantZodiac}</span></div>
        <div class="sum-item"><span class="sum-lbl">برج الاسم العددي</span><span class="sum-val">${analysis.zodiacFromNumber}</span></div>
        <div class="sum-item"><span class="sum-lbl">الكوكب الحاكم</span><span class="sum-val">${analysis.dominantPlanet}</span></div>
        <div class="sum-item"><span class="sum-lbl">الاتجاه الغالب</span><span class="sum-val">${analysis.dominantDirection}</span></div>
      </div>
    </div>`;

  const temperamentHTML = `
    <div class="card">
      <div class="card-title">⚖️ المزاج والطبع</div>
      <div class="temp-box">
        <div class="temp-row"><span>المزاج (الطب):</span><strong>${analysis.temperament.mizaj}</strong></div>
        <div class="temp-row"><span>المزاج الأربعة:</span><strong>${analysis.temperament.temperament}</strong></div>
        <p class="temp-desc">${analysis.temperament.desc}</p>
      </div>
    </div>`;

  const balancesHTML = `
    <div class="card">
      <div class="card-title">📊 التوازنات الداخلية</div>
      <div class="balance-row">
        <div class="balance-label">النوراني / الظلماني</div>
        <div class="balance-bar"><div class="bar-light" style="width:${pct(analysis.lightCount, analysis.letters.length)}%"></div></div>
        <div class="balance-nums">${analysis.lightCount} / ${analysis.darkCount}</div>
      </div>
      <div class="balance-row">
        <div class="balance-label">مذكر / مؤنث</div>
        <div class="balance-bar"><div class="bar-male" style="width:${pct(analysis.maleCount, analysis.letters.length)}%"></div></div>
        <div class="balance-nums">${analysis.maleCount} / ${analysis.femaleCount}</div>
      </div>
      <div class="balance-row">
        <div class="balance-label">ناطق / صامت</div>
        <div class="balance-bar"><div class="bar-spoken" style="width:${pct(analysis.spokenCount, analysis.letters.length)}%"></div></div>
        <div class="balance-nums">${analysis.spokenCount} / ${analysis.silentCount}</div>
      </div>
      <div class="balance-row">
        <div class="balance-label">جمالي / جلالي</div>
        <div class="balance-bar"><div class="bar-beauty" style="width:${pct(analysis.beautyCount, analysis.letters.length)}%"></div></div>
        <div class="balance-nums">${analysis.beautyCount} / ${analysis.gloryCount}</div>
      </div>
      <div class="distrib">
        <strong>توزيع العناصر:</strong> ${objectToString(analysis.elementCount)}<br>
        <strong>توزيع الأبراج:</strong> ${objectToString(analysis.zodiacCount)}<br>
        <strong>توزيع الكواكب:</strong> ${objectToString(analysis.planetCount)}<br>
        <strong>توزيع السعد/النحس:</strong> ${objectToString(analysis.fortuneCount)}
      </div>
    </div>`;

  const personalityHTML = `
    <div class="card">
      <div class="card-title">🧠 الملف النفسي المتوقع</div>
      <ul class="personality-list">
        ${analysis.personality.map(p => `<li>${p}</li>`).join("")}
      </ul>
    </div>`;

  let lettersHTML = "";
  analysis.letters.forEach(ch => {
    const L = LETTERS_DB[ch];
    lettersHTML += `
      <div class="letter-full">
        <div class="letter-head">
          <div class="letter-char-big">${ch}</div>
          <div class="letter-head-info">
            <div class="letter-keyword">${L.keyword}</div>
            <div class="letter-order">الترتيب: ${L.abjadOrder} • القيمة: ${L.abjadValue}</div>
          </div>
        </div>
        <div class="letter-nili">${L.nili}</div>
        <div class="letter-grid">
          <div class="info-item"><span class="lbl">المعنى الحركي</span><span class="val">${L.kinetic}</span></div>
          <div class="info-item"><span class="lbl">الطبع (أبجد)</span><span class="val">${L.abjadNature}</span></div>
          <div class="info-item"><span class="lbl">الطبع (أيقغ)</span><span class="val">${L.ayqaghNature}</span></div>
          <div class="info-item"><span class="lbl">إسقاط أيقغ</span><span class="val">${L.ayqaghValue}</span></div>
          <div class="info-item"><span class="lbl">الدرجة</span><span class="val">${L.degrees}</span></div>
          <div class="info-item"><span class="lbl">البرج</span><span class="val">${L.zodiac}</span></div>
          <div class="info-item"><span class="lbl">المنزل</span><span class="val">${L.mansion}</span></div>
          <div class="info-item"><span class="lbl">المستوى</span><span class="val">${L.level || "—"}</span></div>
          <div class="info-item"><span class="lbl">النورانية</span><span class="val">${L.light || "—"}</span></div>
          <div class="info-item"><span class="lbl">الجنس</span><span class="val">${L.gender}</span></div>
          <div class="info-item"><span class="lbl">الاتجاه</span><span class="val">${L.direction}</span></div>
          <div class="info-item"><span class="lbl">الكوكب</span><span class="val">${L.planet}</span></div>
          <div class="info-item"><span class="lbl">الوزن</span><span class="val">${L.weight}</span></div>
          <div class="info-item"><span class="lbl">جمالي/جلالي</span><span class="val">${L.beauty}</span></div>
          <div class="info-item"><span class="lbl">السعد/النحس</span><span class="val">${L.fortune}</span></div>
          <div class="info-item"><span class="lbl">ناطق/صامت</span><span class="val">${L.speech}</span></div>
          <div class="info-item"><span class="lbl">حروف الشفاء</span><span class="val">${L.healing}</span></div>
          <div class="info-item"><span class="lbl">حروف التسخير</span><span class="val">${L.subjugation}</span></div>
        </div>
      </div>`;
  });

  const lettersSectionHTML = `
    <div class="card">
      <div class="card-title">🔠 تفصيل خصائص كل حرف</div>
      ${lettersHTML}
    </div>`;

  content.innerHTML = meaningHTML + narrativeHTML + overallHTML +
    temperamentHTML + balancesHTML + personalityHTML + lettersSectionHTML;

  updateFavButton(name);
}

/* ============ المفضلة ============ */
function getFavorites() { return JSON.parse(localStorage.getItem('favorites') || '[]'); }
function saveFavorites(l) { localStorage.setItem('favorites', JSON.stringify(l)); }
function isFavorite(n) { return getFavorites().includes(n); }
function toggleFavorite() {
  let f = getFavorites();
  if (f.includes(currentName)) f = f.filter(x => x !== currentName);
  else f.push(currentName);
  saveFavorites(f);
  updateFavButton(currentName);
}
function updateFavButton(name) {
  const b = document.getElementById('favBtn');
  if (!b) return;
  if (isFavorite(name)) b.classList.add('active'); else b.classList.remove('active');
}

/* ============ السجل ============ */
function getHistory() { return JSON.parse(localStorage.getItem('history') || '[]'); }
function addToHistory(name) {
  let h = getHistory().filter(n => n !== name);
  h.unshift(name);
  if (h.length > 30) h = h.slice(0, 30);
  localStorage.setItem('history', JSON.stringify(h));
}
function clearHistory() {
  if (confirm("هل تريد مسح سجل البحث؟")) {
    localStorage.setItem('history', '[]');
    showHistory();
  }
}

/* ============ الشاشات ============ */
function showFavorites() {
  const favs = getFavorites();
  document.getElementById('listTitle').textContent = "❤️ المفضلة";
  const c = document.getElementById('listContent');
  if (favs.length === 0) c.innerHTML = '<div class="empty-state">لا توجد أسماء في المفضلة بعد</div>';
  else c.innerHTML = favs.map(n => `
    <div class="list-item" onclick="openFromList('${n.replace(/'/g, "\\'")}')">
      <div><div class="item-name">${n}</div>
      <div class="item-sub">${(findNameInfo(n)?.meaning || "—").substring(0, 45)}...</div></div>
      <div class="item-arrow">‹</div>
    </div>`).join("");
  showScreen('screen-list');
}

function showHistory() {
  const h = getHistory();
  document.getElementById('listTitle').textContent = "🕐 سجل البحث";
  const c = document.getElementById('listContent');
  if (h.length === 0) c.innerHTML = '<div class="empty-state">لا يوجد سجل بحث بعد</div>';
  else {
    c.innerHTML = h.map(n => `
      <div class="list-item" onclick="openFromList('${n.replace(/'/g, "\\'")}')">
        <div><div class="item-name">${n}</div>
        <div class="item-sub">${(findNameInfo(n)?.meaning || "—").substring(0, 45)}...</div></div>
        <div class="item-arrow">‹</div>
      </div>`).join("") +
      `<div style="text-align:center;margin-top:16px"><button class="btn-danger" onclick="clearHistory()">مسح السجل</button></div>`;
  }
  showScreen('screen-list');
}

function showLettersInfo() {
  document.getElementById('listTitle').textContent = "📖 خصائص الحروف";
  const c = document.getElementById('lettersContent');
  c.innerHTML = Object.entries(LETTERS_DB).map(([ch, L]) => `
    <div class="letter-full" style="cursor:pointer" onclick="showLetterDetail('${ch}')">
      <div class="letter-head">
        <div class="letter-char-big">${ch}</div>
        <div class="letter-head-info">
          <div class="letter-keyword">${L.keyword}</div>
          <div class="letter-order">${L.abjadNature} • ${L.zodiac} • ${L.planet} • ${L.fortune}</div>
        </div>
      </div>
      <div class="letter-nili" style="font-size:13px">${L.nili}</div>
    </div>`).join("");
  showScreen('screen-letters');
}

function showLetterDetail(ch) {
  const L = LETTERS_DB[ch];
  const c = document.getElementById('lettersContent');
  document.getElementById('listTitle').textContent = "الحرف: " + ch;
  c.innerHTML = `
    <div class="letter-full">
      <div class="letter-head">
        <div class="letter-char-big">${ch}</div>
        <div class="letter-head-info">
          <div class="letter-keyword">${L.keyword}</div>
          <div class="letter-order">الترتيب: ${L.abjadOrder} • القيمة الأبجدية: ${L.abjadValue}</div>
        </div>
      </div>
      <div class="letter-nili"><strong>المعنى النيلي:</strong> ${L.nili}</div>
      <div class="letter-grid">
        <div class="info-item"><span class="lbl">المعنى الحركي</span><span class="val">${L.kinetic}</span></div>
        <div class="info-item"><span class="lbl">الدرجة</span><span class="val">${L.degrees}</span></div>
        <div class="info-item"><span class="lbl">البرج</span><span class="val">${L.zodiac}</span></div>
        <div class="info-item"><span class="lbl">المنزل الشمسي</span><span class="val">${L.mansion}</span></div>
        <div class="info-item"><span class="lbl">المستوى</span><span class="val">${L.level || "—"}</span></div>
        <div class="info-item"><span class="lbl">النورانية</span><span class="val">${L.light || "—"}</span></div>
        <div class="info-item"><span class="lbl">الجنس</span><span class="val">${L.gender}</span></div>
        <div class="info-item"><span class="lbl">الاتجاه</span><span class="val">${L.direction}</span></div>
        <div class="info-item"><span class="lbl">الطبع (أبجد)</span><span class="val">${L.abjadNature}</span></div>
        <div class="info-item"><span class="lbl">الطبع (أيقغ)</span><span class="val">${L.ayqaghNature}</span></div>
        <div class="info-item"><span class="lbl">إسقاط أيقغ</span><span class="val">${L.ayqaghValue}</span></div>
        <div class="info-item"><span class="lbl">الكوكب</span><span class="val">${L.planet}</span></div>
        <div class="info-item"><span class="lbl">الوزن</span><span class="val">${L.weight}</span></div>
        <div class="info-item"><span class="lbl">جمالي/جلالي</span><span class="val">${L.beauty}</span></div>
        <div class="info-item"><span class="lbl">السعد/النحس</span><span class="val">${L.fortune}</span></div>
        <div class="info-item"><span class="lbl">ناطق/صامت</span><span class="val">${L.speech}</span></div>
        <div class="info-item"><span class="lbl">حروف الشفاء</span><span class="val">${L.healing}</span></div>
        <div class="info-item"><span class="lbl">حروف التسخير</span><span class="val">${L.subjugation}</span></div>
      </div>
    </div>
    <div style="text-align:center;margin-top:16px">
      <button class="btn-outline" onclick="showLettersInfo()">← رجوع للقائمة</button>
    </div>`;
  window.scrollTo(0, 0);
}

function openFromList(name) {
  currentName = name;
  addToHistory(name);
  renderResult(name);
  showScreen('screen-result');
}

/* ============ التهيئة ============ */
document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('nameInput');
  const btn = document.getElementById('searchBtn');
  if (input) input.addEventListener('keydown', e => { if (e.key === 'Enter') searchName(); });
  if (btn) btn.addEventListener('click', searchName);
});