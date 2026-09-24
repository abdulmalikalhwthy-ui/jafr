/* ============================================================
   extras.js — أسماء إضافية + وضع ليلي + وفق + برج + مشاركة
   ============================================================ */

/* ============ أسماء إضافية ============ */
const EXTRA_NAMES = {
  "آدم":"أبو البشر، التراب الأحمر", "أيوب":"الرجّاع إلى الله، الصابر",
  "إدريس":"الدرس والتعليم", "إسماعيل":"الله يسمع",
  "إسحاق":"الضحك، البهجة", "هارون":"الجبل، الأخ الأعلى",
  "موسى":"المنقذ من الماء", "عيسى":"المسيح، المخلص",
  "زكريا":"الذي يذكر الله كثيراً", "سليمان":"السلام والسلامة",
  "داود":"المحبوب، الحبيب", "يونس":"الحمامة، السلام",
  "صالح":"الصالح، الخيّر", "شعيب":"الطريق، المسلك",
  "نوح":"الراحة، الحزن", "هود":"الراجع، التائب",
  "أمين":"الأمين، المؤتمن", "أنور":"الأكثر نوراً",
  "أشرف":"الأعلى شرفاً", "أكرم":"الأكثر كرماً",
  "أفضل":"الأكثر فضلاً", "أمجد":"الأعلى مجداً",
  "إحسان":"الإحسان، الفعل الجميل", "بهاء":"الجمال، اللمعان",
  "توفيق":"النجاح، السداد", "ثامر":"المثمر",
  "جابر":"الذي يجبر الكسر", "جعفر":"النهر الصغير",
  "حاتم":"القاضي، الحاكم", "حارث":"الكاسب",
  "حسام":"السيف القاطع", "حكيم":"صاحب الحكمة",
  "حيدر":"الأسد، الشجاع", "راشد":"الرشيد",
  "رضوان":"الرضا", "زكي":"الذكي",
  "سعد":"السعادة", "سليم":"السالم",
  "سهيل":"النجم اللامع", "شريف":"الكريم",
  "صابر":"الصابر", "صلاح":"الصلاح",
  "ضياء":"الضوء", "طاهر":"الطاهر",
  "عابد":"العابد", "عباس":"الأسد",
  "عدنان":"الأصل", "عزام":"العزم",
  "علاء":"الرفعة", "عماد":"السند",
  "غسان":"الحداثة", "فؤاد":"القلب",
  "فتحي":"الفتح", "فهد":"الفهد",
  "كاظم":"الصابر", "كامل":"الكامل",
  "مأمون":"الآمن", "ماجد":"الكريم",
  "مبارك":"ذو البركة", "مجدي":"المجد",
  "محسن":"الفاعل للخير", "مخلص":"الصادق",
  "مراد":"المطلوب", "مروان":"الحجر الصلب",
  "مصعب":"الشديد", "منصور":"الغالب",
  "مهدي":"المهتدي", "ناجح":"الناجح",
  "نادر":"القليل", "نعيم":"النعيم",
  "هاشم":"الكاسر", "هادي":"المرشد",
  "وائل":"اللاجئ", "وليد":"المولود",
  "يزيد":"الزيادة",
  "آلاء":"النعم", "آمنة":"الآمنة",
  "أروى":"الأنثى من الوعل", "أسيل":"الناعمة",
  "أفنان":"الأغصان", "أماني":"الأماني",
  "أنوار":"الأنوار", "باسمة":"الباسمة",
  "بدور":"البدور", "براءة":"البراءة",
  "بلسم":"الشفاء", "بنان":"أطراف الأصابع",
  "بهجة":"السرور", "تغريد":"التغريد",
  "تهاني":"التهاني", "جهاد":"الكفاح",
  "جورية":"الوردة الحمراء", "حسناء":"الجميلة",
  "حفصة":"الأسد الصغير", "حياة":"الحياة",
  "خلود":"الخلود", "دلال":"الدلال",
  "دنيا":"الدنيا", "ديمة":"المطر الدائم",
  "رؤى":"الرؤى", "رجاء":"الرجاء",
  "رزان":"الرزانة", "رضوى":"الجبل",
  "رقية":"الرقية", "رهف":"الرقة",
  "ريما":"الغزال الأبيض", "زهراء":"البيضاء",
  "سامية":"الرفيعة", "سحر":"الفجر",
  "سعاد":"السعادة", "سلوى":"العسل",
  "سمية":"العلامة", "سميرة":"النديمة",
  "سهى":"النجم الصغير", "شادية":"المغنية",
  "شروق":"الشروق", "شفاء":"الشفاء",
  "شمس":"الشمس", "صباح":"الصباح",
  "صفية":"المختارة", "طاهرة":"النقية",
  "طيبة":"الخيرة", "عبلة":"الضخمة",
  "عزة":"الكرامة", "عفاف":"الطهارة",
  "عهود":"المواثيق", "غزل":"المغازلة",
  "فريدة":"الوحيدة", "فوزية":"الفوز",
  "قمر":"القمر", "كوثر":"الخير الكثير",
  "لمياء":"السمراء", "ماجدة":"الكريمة",
  "ماسة":"الألماسة", "مزنة":"السحابة",
  "مسك":"العطر", "منال":"المطلب",
  "منى":"الأمنية", "مي":"الغزال",
  "ميسون":"الفاتنة", "نادية":"الندية",
  "نجوى":"السر", "ندى":"الطل",
  "نسمة":"الهواء العليل", "نشوى":"الفرح",
  "نهى":"العقل", "هاجر":"الهجرة",
  "هديل":"هديل الحمام", "هيفاء":"الرشيقة",
  "ياسمينة":"الياسمينة"
};

Object.keys(EXTRA_NAMES).forEach(k => {
  if (!NAMES_DB[k]) {
    NAMES_DB[k] = { meaning: EXTRA_NAMES[k], gender: "ذكر", origin: "عربي" };
  }
});

/* ============ الوضع الليلي ============ */
function initDarkMode() {
  const saved = localStorage.getItem('darkMode');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDark = saved === 'true' || (saved === null && prefersDark);
  if (isDark) document.body.classList.add('dark');
  updateDarkToggle();
}
function toggleDarkMode() {
  document.body.classList.toggle('dark');
  localStorage.setItem('darkMode', document.body.classList.contains('dark'));
  updateDarkToggle();
}
function updateDarkToggle() {
  const btn = document.getElementById('darkToggle');
  if (!btn) return;
  btn.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
}

/* ============ البرج الفلكي ============ */
const ZODIAC_SIGNS = [
  { name: "الحمل",   icon: "♈", from: [3,21],  to: [4,19]  },
  { name: "الثور",   icon: "♉", from: [4,20],  to: [5,20]  },
  { name: "الجوزاء", icon: "♊", from: [5,21],  to: [6,20]  },
  { name: "السرطان", icon: "♋", from: [6,21],  to: [7,22]  },
  { name: "الأسد",   icon: "♌", from: [7,23],  to: [8,22]  },
  { name: "السنبلة", icon: "♍", from: [8,23],  to: [9,22]  },
  { name: "الميزان", icon: "♎", from: [9,23],  to: [10,22] },
  { name: "العقرب",  icon: "♏", from: [10,23], to: [11,21] },
  { name: "القوس",   icon: "♐", from: [11,22], to: [12,21] },
  { name: "الجدي",   icon: "♑", from: [12,22], to: [1,19]  },
  { name: "الدلو",   icon: "♒", from: [1,20],  to: [2,18]  },
  { name: "الحوت",   icon: "♓", from: [2,19],  to: [3,20]  }
];

function getZodiacFromDate(dateStr) {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return null;
  const month = d.getMonth() + 1;
  const day = d.getDate();
  for (const s of ZODIAC_SIGNS) {
    const [fm, fd] = s.from;
    const [tm, td] = s.to;
    if (fm === 12) {
      if ((month === 12 && day >= fd) || (month === 1 && day <= td)) return s;
    } else {
      if ((month === fm && day >= fd) || (month === tm && day <= td)) return s;
    }
  }
  return null;
}

/* ============ الوفق ============ */
const WAFQ_BASES = {
  3: { key: 15, base: [[8,1,6],[3,5,7],[4,9,2]] },
  4: { key: 34, base: [[16,2,3,13],[5,11,10,8],[9,7,6,12],[4,14,15,1]] },
  5: { key: 65, base: [[17,24,1,8,15],[23,5,7,14,16],[4,6,13,20,22],[10,12,19,21,3],[11,18,25,2,9]] }
};

function generateWafq(totalValue) {
  let size = 3;
  if (totalValue > 200) size = 5;
  else if (totalValue > 50) size = 4;
  const cfg = WAFQ_BASES[size];
  const diff = totalValue - cfg.key;
  const inc = Math.max(0, Math.floor(diff / (size * size)));
  const grid = cfg.base.map(row => row.map(v => v + inc));
  const actualSum = grid.flat().reduce((a, b) => a + b, 0);
  return { size, grid, targetSum: totalValue, actualSum, baseKey: cfg.key, increment: inc, perfect: actualSum === totalValue };
}

function renderWafqHTML(wafq) {
  const cellSize = wafq.size === 3 ? 70 : (wafq.size === 4 ? 62 : 56);
  let cells = "";
  wafq.grid.forEach(row => {
    row.forEach(v => { cells += `<div class="wafq-cell" style="width:${cellSize}px;height:${cellSize}px">${v}</div>`; });
  });
  return `
    <div class="card">
      <div class="card-title">🔯 الوفق (المربع المقدّس)</div>
      <div class="wafq-container">
        <div class="wafq-grid" style="grid-template-columns:repeat(${wafq.size}, 1fr)">${cells}</div>
      </div>
      <div class="wafq-info">
        <div>
          <span class="wafq-key">مفتاح: ${wafq.targetSum}</span>
          <span class="wafq-key">الحجم: ${wafq.size}×${wafq.size}</span>
        </div>
        ${wafq.perfect
          ? `<div style="margin-top:6px;color:#2E7D32;font-weight:bold">✓ وفق تام</div>`
          : `<div style="margin-top:6px;color:#E65100">المجموع الفعلي: ${wafq.actualSum}</div>`}
      </div>
    </div>`;
}

/* ============ المشاركة ============ */
function shareResult() {
  if (!currentName) return;
  const analysis = analyzeName(currentName);
  let text = `✨ *${currentName}* — تحليل الاسم\n\n`;
  const info = findNameInfo(currentName);
  if (info) {
    text += `📖 *المعنى:* ${info.meaning}\n`;
    text += `(${info.gender} - ${info.origin})\n\n`;
  }
  if (analysis.narrative && analysis.narrative.fullText) {
    text += `🔗 *تركيب المعنى:*\n${analysis.narrative.fullText}\n\n`;
  }
  text += `🔢 *القيمة الأبجدية:* ${analysis.totalAbjad}\n`;
  text += `🔮 *العنصر الغالب:* ${analysis.dominantEl}\n`;
  text += `🌠 *الكوكب الحاكم:* ${analysis.dominantPlanet}\n`;
  text += `♈ *برج الاسم:* ${analysis.zodiacFromNumber}\n\n`;
  if (analysis.temperament) {
    text += `⚖️ *المزاج:* ${analysis.temperament.mizaj}\n`;
  }
  text += `\n──────────────\nتطبيق خصائص الأسماء`;

  if (navigator.share) {
    navigator.share({ title: `خصائص الاسم: ${currentName}`, text })
      .catch(() => fallbackShare(text));
  } else {
    fallbackShare(text);
  }
}

function fallbackShare(text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => showToast("✅ تم نسخ التحليل"))
      .catch(() => openWhatsApp(text));
  } else {
    openWhatsApp(text);
  }
}

function openWhatsApp(text) {
  window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
}

function showToast(msg) {
  let t = document.querySelector('.share-toast');
  if (!t) {
    t = document.createElement('div');
    t.className = 'share-toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2200);
}

/* ============ توليد اسم مقترح ============ */
let generatedName = "";
function showNameGenerator() {
  document.getElementById('listTitle').textContent = "🎲 اقتراح اسم";
  const c = document.getElementById('listContent');
  c.innerHTML = `
    <div class="generator-box">
      <div class="generator-name" id="genName">...</div>
      <div class="generator-meaning" id="genMeaning"></div>
      <button class="btn-primary" onclick="generateRandomName()" style="width:100%">🎲 توليد اسم آخر</button>
      <button class="btn-outline" style="width:100%;margin-top:10px" onclick="useGeneratedName()">استخدام هذا الاسم</button>
    </div>`;
  showScreen('screen-list');
  generateRandomName();
}
function generateRandomName() {
  const keys = Object.keys(NAMES_DB);
  generatedName = keys[Math.floor(Math.random() * keys.length)];
  const info = NAMES_DB[generatedName];
  document.getElementById('genName').textContent = generatedName;
  document.getElementById('genMeaning').textContent = info.meaning;
}
function useGeneratedName() {
  if (!generatedName) return;
  currentName = generatedName;
  addToHistory(generatedName);
  renderResult(generatedName);
  showScreen('screen-result');
}

/* ============ الإعدادات ============ */
function showSettings() {
  document.getElementById('listTitle').textContent = "⚙️ الإعدادات";
  const c = document.getElementById('listContent');
  const isDark = document.body.classList.contains('dark');
  c.innerHTML = `
    <div class="card">
      <div class="settings-row">
        <span>🌙 الوضع الليلي</span>
        <div class="switch ${isDark ? 'on' : ''}" onclick="toggleDarkMode();showSettings()"></div>
      </div>
      <div class="settings-row">
        <span>📚 عدد الأسماء في القاعدة</span>
        <strong style="color:#1A237E">${Object.keys(NAMES_DB).length}</strong>
      </div>
      <div class="settings-row">
        <span>🔠 عدد الحروف المدعومة</span>
        <strong style="color:#1A237E">${Object.keys(LETTERS_DB).length}</strong>
      </div>
    </div>`;
  showScreen('screen-list');
}

/* ============ دمج الوفق والبرج في renderResult ============ */
const _origRenderResult1 = renderResult;
renderResult = function(name) {
  _origRenderResult1(name);
  const analysis = analyzeName(name);
  const wafq = generateWafq(analysis.totalAbjad);
  const wafqHTML = renderWafqHTML(wafq);

  const birthDate = document.getElementById('birthDate')?.value;
  const birthZodiac = getZodiacFromDate(birthDate);
  let zodiacHTML = "";
  if (birthZodiac) {
    const merged = mergeZodiacs(birthZodiac, analysis.zodiacFromNumber);
    zodiacHTML = `
      <div class="card">
        <div class="card-title">♈ دمج برج الميلاد مع برج الاسم</div>
        <div class="zodiac-merge">
          <div class="zodiac-badge">
            <div class="zz-icon">${birthZodiac.icon}</div>
            <div class="zz-name">${birthZodiac.name}</div>
            <div class="zz-sub">برج الميلاد</div>
          </div>
          <div class="zodiac-plus">+</div>
          <div class="zodiac-badge">
            <div class="zz-icon">✨</div>
            <div class="zz-name">${analysis.zodiacFromNumber}</div>
            <div class="zz-sub">برج الاسم العددي</div>
          </div>
        </div>
        <div class="zodiac-result">${merged}</div>
      </div>`;
  }

  const content = document.getElementById('resultContent');
  const html = content.innerHTML;
  const marker = '<div class="card"><div class="card-title">🔠 تفصيل خصائص كل حرف</div>';
  const idx = html.indexOf(marker);
  if (idx !== -1) content.innerHTML = html.slice(0, idx) + wafqHTML + zodiacHTML + html.slice(idx);
  else content.innerHTML = html + wafqHTML + zodiacHTML;
};

function mergeZodiacs(birthZ, nameZName) {
  if (!birthZ || !nameZName) return "لا يمكن الدمج";
  const elName = getZodiacElement(birthZ.name);
  const sameElement = elName === getZodiacElement(nameZName);
  let result = `طبيعتك تجمع بين <strong>${birthZ.name}</strong> (برج الميلاد) و<strong>${nameZName}</strong> (برج الاسم) — `;
  if (sameElement) result += `كلا البرجين من العنصر <strong>${elName}</strong>، مما يعزّز صفاتك.`;
  else result += `العنصر <strong>${elName}</strong> يسود من برج ميلادك، بينما يضيف برج اسمك بُعداً مختلفاً.`;
  return result;
}

function getZodiacElement(signName) {
  const elements = {
    "الحمل":"النار","الأسد":"النار","القوس":"النار",
    "الثور":"التراب","السنبلة":"التراب","الجدي":"التراب",
    "الجوزاء":"الهواء","الميزان":"الهواء","الدلو":"الهواء",
    "السرطان":"الماء","العقرب":"الماء","الحوت":"الماء"
  };
  return elements[signName] || "—";
}

/* ============ التهيئة ============ */
document.addEventListener('DOMContentLoaded', () => {
  initDarkMode();
  const bd = document.getElementById('birthDate');
  if (bd) {
    const saved = localStorage.getItem('birthDate');
    if (saved) bd.value = saved;
    bd.addEventListener('change', () => localStorage.setItem('birthDate', bd.value));
  }
});