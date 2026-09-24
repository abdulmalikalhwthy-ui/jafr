/* ============================================================
   jafr.js — علم الجفر + محرك المعنى + السؤال الجفري
   الإصدار: 4.0
   الميزات:
   - محرك بحث معجمي مُصلَح (يزيل "ال" التعريف)
   - محرك معنى دلالي محسّن
   - كل ميزات علم الجفر الكاملة
   ============================================================ */

/* ============================================================
   علم الجفر الأساسي
   ============================================================ */

const JAFR_PLANETS = {
  "ا": { planet: "لاهوتية", order: 1, desc: "الفلك الأعلى" },
  "ب": { planet: "العرش", order: 2, desc: "فلك العرش" },
  "ت": { planet: "العرش", order: 3, desc: "فلك العرش" },
  "ث": { planet: "العرش", order: 4, desc: "فلك العرش" },
  "ج": { planet: "الكرسي", order: 5, desc: "فلك الكرسي" },
  "ح": { planet: "الكرسي", order: 6, desc: "فلك الكرسي" },
  "خ": { planet: "الكرسي", order: 7, desc: "فلك الكرسي" },
  "د": { planet: "زحل", order: 8, desc: "كوكب زحل" },
  "ذ": { planet: "زحل", order: 9, desc: "كوكب زحل" },
  "ر": { planet: "المشتري", order: 10, desc: "كوكب المشتري" },
  "ز": { planet: "المشتري", order: 11, desc: "كوكب المشتري" },
  "س": { planet: "المريخ", order: 12, desc: "كوكب المريخ" },
  "ش": { planet: "المريخ", order: 13, desc: "كوكب المريخ" },
  "ص": { planet: "الشمس", order: 14, desc: "الشمس" },
  "ض": { planet: "الشمس", order: 15, desc: "الشمس" },
  "ط": { planet: "الزهرة", order: 16, desc: "كوكب الزهرة" },
  "ظ": { planet: "الزهرة", order: 17, desc: "كوكب الزهرة" },
  "ع": { planet: "عطارد", order: 18, desc: "كوكب عطارد" },
  "غ": { planet: "عطارد", order: 19, desc: "كوكب عطارد" },
  "ف": { planet: "القمر", order: 20, desc: "القمر" },
  "ق": { planet: "القمر", order: 21, desc: "القمر" },
  "ك": { planet: "كرة النار", order: 22, desc: "فلك كرة النار" },
  "ل": { planet: "كرة الهواء", order: 23, desc: "فلك كرة الهواء" },
  "م": { planet: "الحيوان", order: 24, desc: "فلك الحيوان" },
  "ن": { planet: "النبات", order: 25, desc: "فلك النبات" },
  "ه": { planet: "المعدن", order: 26, desc: "فلك المعدن" },
  "و": { planet: "الماء", order: 27, desc: "فلك الماء" },
  "ي": { planet: "التراب", order: 28, desc: "فلك التراب" }
};

const ABJAD_CIRCLE = [
  { letter: "ا", value: 1 }, { letter: "ب", value: 2 }, { letter: "ج", value: 3 },
  { letter: "د", value: 4 }, { letter: "ه", value: 5 }, { letter: "و", value: 6 },
  { letter: "ز", value: 7 }, { letter: "ح", value: 8 }, { letter: "ط", value: 9 },
  { letter: "ي", value: 10 }, { letter: "ك", value: 20 }, { letter: "ل", value: 30 },
  { letter: "م", value: 40 }, { letter: "ن", value: 50 }, { letter: "س", value: 60 },
  { letter: "ع", value: 70 }, { letter: "ف", value: 80 }, { letter: "ص", value: 90 },
  { letter: "ق", value: 100 }, { letter: "ر", value: 200 }, { letter: "ش", value: 300 },
  { letter: "ت", value: 400 }, { letter: "ث", value: 500 }, { letter: "خ", value: 600 },
  { letter: "ذ", value: 700 }, { letter: "ض", value: 800 }, { letter: "ظ", value: 900 },
  { letter: "غ", value: 1000 }
];

const AYQAGH_CIRCLE = [
  "ا","ي","ق","غ","ب","ه","ك","ن","ر","ث",
  "د","م","ج","ل","ش","و","س","ط","ف","ت",
  "ح","غ","ز","ذ","ض","ظ","ص","ط"
];

const NATURES_ABJAD = {
  "نار":  { letters: ["ا","ه","ط","م","ف","ش","ذ"], color: "#E53935", icon: "🔥" },
  "هواء": { letters: ["ب","و","ي","ن","ص","ت","ض"], color: "#43A047", icon: "🌪️" },
  "ماء":  { letters: ["ج","ز","ك","س","ق","ث","ظ"], color: "#1E88E5", icon: "💧" },
  "تراب": { letters: ["د","ح","ل","ع","ر","خ","غ"], color: "#8D6E63", icon: "⛰️" }
};

const NATURES_AYQAGH = {
  "نار":  { letters: ["ا","ب","ر","ح","س","خ","ض"], color: "#E53935", icon: "🔥" },
  "تراب": { letters: ["ي","ه","ث","ل","ن","ز","ط"], color: "#8D6E63", icon: "⛰️" },
  "هواء": { letters: ["ق","ك","د","ش","ف","ع","ص"], color: "#43A047", icon: "🌪️" },
  "ماء":  { letters: ["غ","ن","م","و","ت","ذ","ظ"], color: "#1E88E5", icon: "💧" }
};

const NATURE_ISQAT = { "نار": 9, "هواء": 12, "ماء": 15, "تراب": 16 };

const LETTER_SPELLING = {
  "ا": { small: "ا", medium: "الف", big: "ألف" },
  "ب": { small: "ب", medium: "باء", big: "باء" },
  "ج": { small: "ج", medium: "جيم", big: "جيم" },
  "د": { small: "د", medium: "دال", big: "دال" },
  "ه": { small: "ه", medium: "هاء", big: "هاء" },
  "و": { small: "و", medium: "واو", big: "واو" },
  "ز": { small: "ز", medium: "زاي", big: "زاي" },
  "ح": { small: "ح", medium: "حاء", big: "حاء" },
  "ط": { small: "ط", medium: "طاء", big: "طاء" },
  "ي": { small: "ي", medium: "ياء", big: "ياء" },
  "ك": { small: "ك", medium: "كاف", big: "كاف" },
  "ل": { small: "ل", medium: "لام", big: "لام" },
  "م": { small: "م", medium: "ميم", big: "ميم" },
  "ن": { small: "ن", medium: "نون", big: "نون" },
  "س": { small: "س", medium: "سين", big: "سين" },
  "ع": { small: "ع", medium: "عين", big: "عين" },
  "ف": { small: "ف", medium: "فاء", big: "فاء" },
  "ص": { small: "ص", medium: "صاد", big: "صاد" },
  "ق": { small: "ق", medium: "قاف", big: "قاف" },
  "ر": { small: "ر", medium: "راء", big: "راء" },
  "ش": { small: "ش", medium: "شين", big: "شين" },
  "ت": { small: "ت", medium: "تاء", big: "تاء" },
  "ث": { small: "ث", medium: "ثاء", big: "ثاء" },
  "خ": { small: "خ", medium: "خاء", big: "خاء" },
  "ذ": { small: "ذ", medium: "ذال", big: "ذال" },
  "ض": { small: "ض", medium: "ضاد", big: "ضاد" },
  "ظ": { small: "ظ", medium: "ظاء", big: "ظاء" },
  "غ": { small: "غ", medium: "غين", big: "غين" }
};

function getNature(letter) {
  for (const nature in NATURES_ABJAD) {
    if (NATURES_ABJAD[nature].letters.indexOf(letter) !== -1) return nature;
  }
  return "—";
}

function getLetterValue(letter) {
  const found = ABJAD_CIRCLE.find(function(l) { return l.letter === letter; });
  return found ? found.value : 0;
}

function valueToLetter(value) {
  const found = ABJAD_CIRCLE.find(function(l) { return l.value === value; });
  if (found) return found.letter;
  let closest = ABJAD_CIRCLE[0];
  let minDiff = Math.abs(value - closest.value);
  ABJAD_CIRCLE.forEach(function(l) {
    const diff = Math.abs(value - l.value);
    if (diff < minDiff) { minDiff = diff; closest = l; }
  });
  return closest.letter;
}

/* ============================================================
   شاشة علم الجفر الرئيسية
   ============================================================ */
function showJafrScreen() {
  const c = document.getElementById('jafrContent');
  c.innerHTML = `
    <div class="card">
      <div class="card-title">📖 علم الجفر — مقدمة</div>
      <p class="meaning-text">
        علم الجفر هو علم يُبحث فيه عن الحروف وأجزائها من حيث دلالتها على
        الحوادث المخزونة في كنوز الحروف.
      </p>
      <p class="meaning-text" style="margin-top:10px;font-size:13px;color:#666">
        — بتصرف من «الكواكب الدرية في الأصول الجفرية» لسليم الواعظ
      </p>
    </div>

    <div class="card">
      <div class="card-title">🧭 أقسام علم الجفر</div>
      <div class="jafr-buttons">
        <button class="jafr-btn" onclick="showJafrPlanets()">
          <span class="jafr-icon">🪐</span><span>الكواكب والحروف</span>
        </button>
        <button class="jafr-btn" onclick="showJafrCircles()">
          <span class="jafr-icon">⚪</span><span>الدائرتان</span>
        </button>
        <button class="jafr-btn" onclick="showJafrNatures()">
          <span class="jafr-icon">🔥</span><span>الطبائع الأربع</span>
        </button>
        <button class="jafr-btn" onclick="showJafrUpgrade()">
          <span class="jafr-icon">⬆️</span><span>الترقّي</span>
        </button>
        <button class="jafr-btn" onclick="showJafrExpansion()">
          <span class="jafr-icon">📐</span><span>البسط</span>
        </button>
        <button class="jafr-btn primary" onclick="showJafrCalculator()">
          <span class="jafr-icon">⚗️</span><span>حاسبة الاستخراج</span>
        </button>
        <button class="jafr-btn primary" onclick="showJafrQuestionScreen()">
          <span class="jafr-icon">🔮</span><span>سؤال جفري (استقراء)</span>
        </button>
      </div>
    </div>

    <div class="card">
      <div class="card-title">💡 فائدة علم الجفر</div>
      <p class="meaning-text">
        يقول المؤلف: «فائدته الاعتلاء إلى فهم الخطاب المحمدي»، ويُبيّن أن هذا العلم
        <strong>ليس من العلوم الغيبية المحرّمة</strong>، لأن له قواعد مضبوطة.
      </p>
    </div>

    <div class="card">
      <div class="card-title">📚 المرجع</div>
      <p class="meaning-text" style="font-size:14px">
        <strong>الكتاب:</strong> الكواكب الدرية في الأصول الجفرية<br>
        <strong>المؤلف:</strong> سليم الواعظ<br>
        <strong>تحقيق:</strong> السيد عبد الملك علي عبد الله الحوثي
      </p>
    </div>`;
  showScreen('screen-jafr');
}

/* ============================================================
   الشاشات الفرعية للجفر
   ============================================================ */
function showJafrPlanets() {
  const c = document.getElementById('jafrContent');
  const groups = {};
  for (const letter in JAFR_PLANETS) {
    const p = JAFR_PLANETS[letter].planet;
    if (!groups[p]) groups[p] = [];
    groups[p].push(letter);
  }
  let rows = "";
  for (const planet in groups) {
    const letters = groups[planet];
    const desc = JAFR_PLANETS[letters[0]].desc;
    rows += '<tr><td><strong>' + planet + '</strong></td>' +
            '<td class="letters-cell">' + letters.join(" • ") + '</td>' +
            '<td style="font-size:12px;color:#555">' + desc + '</td></tr>';
  }
  c.innerHTML = `
    <div class="card">
      <div class="card-title">🪐 تخصيص الحروف بالكواكب</div>
      <table class="jafr-table">
        <thead><tr><th>الفلك</th><th>الحروف</th><th>الوصف</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
    <button class="btn-outline" style="width:100%" onclick="showJafrScreen()">← رجوع</button>`;
  showScreen('screen-jafr');
}

function showJafrCircles() {
  const c = document.getElementById('jafrContent');
  const abjadHTML = ABJAD_CIRCLE.map(function(l) {
    return '<div class="circle-cell"><div class="circle-letter">' + l.letter + '</div>' +
           '<div class="circle-value">' + l.value + '</div></div>';
  }).join("");
  const ayqaghHTML = AYQAGH_CIRCLE.map(function(l, i) {
    return '<div class="circle-cell"><div class="circle-letter">' + l + '</div>' +
           '<div class="circle-value">' + (i + 1) + '</div></div>';
  }).join("");
  c.innerHTML = `
    <div class="card">
      <div class="card-title">⚪ دائرة أبجد</div>
      <div class="circle-grid">${abjadHTML}</div>
    </div>
    <div class="card">
      <div class="card-title">🔷 دائرة أيقغ</div>
      <div class="circle-grid ayqagh">${ayqaghHTML}</div>
    </div>
    <button class="btn-outline" style="width:100%" onclick="showJafrScreen()">← رجوع</button>`;
  showScreen('screen-jafr');
}

function showJafrNatures() {
  const c = document.getElementById('jafrContent');
  let abjadHTML = "";
  for (const nature in NATURES_ABJAD) {
    const n = NATURES_ABJAD[nature];
    abjadHTML += '<div class="nature-card" style="border-right-color:' + n.color + '">' +
      '<div class="nature-header" style="color:' + n.color + '">' +
      '<span style="font-size:22px">' + n.icon + '</span>' +
      '<strong>' + nature + '</strong>' +
      '<span style="font-size:12px;color:#888">(إسقاط ' + NATURE_ISQAT[nature] + ')</span>' +
      '</div><div class="nature-letters">' + n.letters.join(" • ") + '</div></div>';
  }
  let ayqaghHTML = "";
  for (const nature in NATURES_AYQAGH) {
    const n = NATURES_AYQAGH[nature];
    ayqaghHTML += '<div class="nature-card" style="border-right-color:' + n.color + '">' +
      '<div class="nature-header" style="color:' + n.color + '">' +
      '<span style="font-size:22px">' + n.icon + '</span>' +
      '<strong>' + nature + '</strong>' +
      '<span style="font-size:12px;color:#888">(إسقاط ' + NATURE_ISQAT[nature] + ')</span>' +
      '</div><div class="nature-letters">' + n.letters.join(" • ") + '</div></div>';
  }
  c.innerHTML = `
    <div class="card"><div class="card-title">🔥 الطبائع من دائرة أبجد</div>${abjadHTML}</div>
    <div class="card"><div class="card-title">🔷 الطبائع من دائرة أيقغ</div>${ayqaghHTML}</div>
    <button class="btn-outline" style="width:100%" onclick="showJafrScreen()">← رجوع</button>`;
  showScreen('screen-jafr');
}

function showJafrUpgrade() {
  const c = document.getElementById('jafrContent');
  c.innerHTML = `
    <div class="card"><div class="card-title">⬆️ الترقّي في علم الجفر</div>
      <p class="meaning-text">الترقّي ثلاثة أقسام:</p></div>
    <div class="card"><div class="card-title">١) الترقّي العددي</div>
      <p class="meaning-text">الآحاد → العشرات → المئين → الألوف.</p>
      <div class="example-box">م (٤٠) → ٤٠٠<br>ف (٨٠) → ٨٠٠</div></div>
    <div class="card"><div class="card-title">٢) الترقّي بزيادة جنس</div>
      <div class="example-box">أ (١) → ب (٢)<br>ح (٨) → ط (٩)<br>ر (٢٠٠) → ش (٣٠٠)</div></div>
    <div class="card"><div class="card-title">٣) الترقّي الطبيعي</div>
      <div class="example-box">أ → ه → ط → م → ف → ش → ذ → (يرجع إلى أ)</div></div>
    <button class="btn-outline" style="width:100%" onclick="showJafrScreen()">← رجوع</button>`;
  showScreen('screen-jafr');
}

function showJafrExpansion() {
  const c = document.getElementById('jafrContent');
  const letters = ["ا","ب","ج","د","ه","و","ي","م","ع","ف"];
  let rows = "";
  letters.forEach(function(l) {
    const b = LETTER_SPELLING[l];
    rows += '<tr><td class="letter-cell">' + l + '</td><td>' + b.small + '</td>' +
            '<td>' + b.medium + '</td><td>' + b.big + '</td><td>' + getLetterValue(l) + '</td></tr>';
  });
  c.innerHTML = `
    <div class="card"><div class="card-title">📐 البسط في علم الجفر</div>
      <p class="meaning-text">البسط ثلاثة أقسام: صغير، متوسط، كبير.</p></div>
    <div class="card"><div class="card-title">📊 جدول البسط</div>
      <table class="jafr-table">
        <thead><tr><th>الحرف</th><th>صغير</th><th>متوسط</th><th>كبير</th><th>القيمة</th></tr></thead>
        <tbody>${rows}</tbody>
      </table></div>
    <button class="btn-outline" style="width:100%" onclick="showJafrScreen()">← رجوع</button>`;
  showScreen('screen-jafr');
}

/* ============================================================
   حاسبة الاستخراج الجفري
   ============================================================ */
function showJafrCalculator() {
  const title = document.getElementById('jafrCalcTitle');
  if (title) title.textContent = "⚗️ الاستخراج الجفري";
  const c = document.getElementById('jafrCalcContent');
  c.innerHTML = `
    <div class="card">
      <div class="card-title">⚗️ حاسبة الاستخراج الجفري</div>
      <p style="font-size:13px;color:#666;line-height:1.8;margin-bottom:12px">
        أدخل اسماً للحصول على تحليل جفري كامل.
      </p>
      <div class="search-box" style="padding:0">
        <input type="text" id="jafrNameInput" placeholder="اكتب الاسم هنا..." autocomplete="off">
        <button class="btn-primary" onclick="calculateJafr()">🔮 استخرج</button>
      </div>
    </div>
    <div id="jafrResult"></div>
    <button class="btn-outline" style="width:100%" onclick="showJafrScreen()">← رجوع</button>`;
  showScreen('screen-jafr-calc');
}

function calculateJafr() {
  const name = document.getElementById('jafrNameInput').value.trim();
  if (!name) { alert("الرجاء إدخال الاسم"); return; }

  const normalized = normalize(name).replace(/\s/g, "");
  const letters = normalized.split("").filter(function(c) { return JAFR_PLANETS[c]; });
  const container = document.getElementById('jafrResult');

  if (letters.length === 0) {
    container.innerHTML = '<div class="card"><p style="color:#999">لا توجد حروف صالحة</p></div>';
    return;
  }

  const totalAbjad = letters.reduce(function(s, l) { return s + getLetterValue(l); }, 0);
  const planetCount = {}, natureCount = {};
  letters.forEach(function(ch) {
    const p = JAFR_PLANETS[ch].planet;
    const n = getNature(ch);
    planetCount[p] = (planetCount[p] || 0) + 1;
    natureCount[n] = (natureCount[n] || 0) + 1;
  });
  const sortedN = Object.entries(natureCount).sort(function(a,b) { return b[1] - a[1]; });
  const sortedP = Object.entries(planetCount).sort(function(a,b) { return b[1] - a[1]; });
  const dominantNature = sortedN[0] ? sortedN[0][0] : "—";
  const dominantPlanet = sortedP[0] ? sortedP[0][0] : "—";

  let lettersTable = "";
  letters.forEach(function(ch) {
    const p = JAFR_PLANETS[ch];
    const nature = getNature(ch);
    const value = getLetterValue(ch);
    const n = NATURES_ABJAD[nature];
    lettersTable += '<tr>' +
      '<td class="letter-cell" style="color:' + (n ? n.color : '#333') + '">' + ch + '</td>' +
      '<td>' + p.planet + '</td>' +
      '<td style="color:' + (n ? n.color : '#333') + '">' + (n ? n.icon : '') + ' ' + nature + '</td>' +
      '<td>' + value + '</td>' +
      '<td>' + (NATURE_ISQAT[nature] || '—') + '</td>' +
      '</tr>';
  });

  container.innerHTML = `
    <div class="card">
      <div class="card-title">📊 الإجماليات</div>
      <div class="summary-grid">
        <div class="sum-item"><span class="sum-lbl">عدد الحروف</span><span class="sum-val">${letters.length}</span></div>
        <div class="sum-item"><span class="sum-lbl">القيمة الأبجدية</span><span class="sum-val">${totalAbjad}</span></div>
        <div class="sum-item"><span class="sum-lbl">الطبع الغالب</span><span class="sum-val">${dominantNature}</span></div>
        <div class="sum-item"><span class="sum-lbl">الفلك الغالب</span><span class="sum-val">${dominantPlanet}</span></div>
      </div>
    </div>
    <div class="card">
      <div class="card-title">🔠 تحليل الحروف</div>
      <table class="jafr-table">
        <thead><tr><th>الحرف</th><th>الفلك</th><th>الطبع</th><th>القيمة</th><th>الإسقاط</th></tr></thead>
        <tbody>${lettersTable}</tbody>
      </table>
    </div>`;
}

/* ============================================================
   محرك المعنى الدلالي
   ============================================================ */

const LETTER_FEATURES = {
  "ا": [8, 9, 9, 7, 2, 8, 6, 9], "ب": [6, 4, 3, 5, 6, 4, 9, 5],
  "ت": [5, 6, 4, 4, 7, 5, 6, 6], "ث": [4, 7, 4, 5, 6, 5, 5, 5],
  "ج": [7, 5, 4, 6, 8, 3, 7, 5], "ح": [6, 5, 8, 8, 4, 5, 7, 8],
  "خ": [4, 6, 3, 4, 3, 7, 4, 6], "د": [7, 8, 4, 4, 3, 9, 6, 8],
  "ذ": [5, 5, 4, 7, 4, 6, 5, 6], "ر": [6, 6, 7, 8, 4, 5, 8, 6],
  "ز": [5, 4, 4, 4, 8, 3, 5, 4], "س": [7, 5, 7, 6, 8, 3, 7, 7],
  "ش": [8, 4, 5, 8, 5, 4, 6, 7], "ص": [5, 7, 8, 5, 8, 5, 7, 9],
  "ض": [4, 8, 4, 6, 4, 7, 5, 7], "ط": [6, 7, 8, 8, 3, 7, 7, 9],
  "ظ": [5, 6, 4, 5, 7, 6, 5, 6], "ع": [6, 6, 8, 7, 5, 5, 8, 8],
  "غ": [4, 5, 3, 5, 3, 6, 4, 5], "ف": [7, 4, 5, 7, 6, 4, 8, 6],
  "ق": [6, 7, 7, 7, 5, 7, 7, 8], "ك": [5, 6, 7, 6, 7, 5, 8, 6],
  "ل": [5, 6, 8, 5, 5, 5, 8, 6], "م": [6, 6, 7, 7, 5, 6, 8, 7],
  "ن": [7, 6, 8, 6, 6, 5, 8, 6], "ه": [4, 5, 8, 6, 5, 4, 6, 6],
  "و": [5, 6, 5, 5, 8, 4, 8, 5], "ي": [6, 6, 8, 6, 6, 5, 7, 6]
};

const LEXICON = {
  "انطلق": { meaning: "الانتقال السريع من مكان إلى آخر بقوة", category: "حركة", keywords: ["حركة", "اندفاع"] },
  "سار": { meaning: "السير على الطريق بانتظام", category: "حركة", keywords: ["حركة", "انتظام"] },
  "جمع": { meaning: "ضم المتفرق إلى بعضه", category: "ضم", keywords: ["تكتل", "ضم"] },
  "فرق": { meaning: "توزيع المجتمع في اتجاهات متعددة", category: "تفريق", keywords: ["فصل", "تشعب"] },
  "بنى": { meaning: "إنشاء الشيء على نظام محكم", category: "بناء", keywords: ["إنشاء", "تأسيس"] },
  "أعطى": { meaning: "منح الشيء لغيره بلا مقابل", category: "عطاء", keywords: ["منح", "بذل"] },
  "منع": { meaning: "حبس الشيء ومنع وصوله", category: "منع", keywords: ["حبس", "حماية"] },
  "فتح": { meaning: "إزالة الإغلاق والتيسير", category: "انفتاح", keywords: ["تيسير", "كشف"] },
  "نصر": { meaning: "التأييد والغلبة على الخصم", category: "نصر", keywords: ["غلبة", "تأييد"] },
  "علم": { meaning: "إدراك الشيء على حقيقته", category: "علم", keywords: ["إدراك", "معرفة"] },
  "قوي": { meaning: "ذو قوة وصلابة", category: "قوة", keywords: ["قوة", "شدة"] },
  "حكيم": { meaning: "صاحب الحكمة والبصيرة", category: "حكمة", keywords: ["بصيرة", "رأي"] },
  "كريم": { meaning: "صاحب الجود والعطاء", category: "كرم", keywords: ["جود", "عطاء"] },
  "شجاع": { meaning: "القوي القلب في مواجهة المخاطر", category: "شجاعة", keywords: ["جرأة", "إقدام"] },
  "صادق": { meaning: "المطابق قوله لفعاله", category: "صدق", keywords: ["وفاء", "حقيقة"] },
  "نبيل": { meaning: "الشريف الأصيل", category: "نبل", keywords: ["شرف", "أصالة"] },
  "طيب": { meaning: "الحسن الطاهر", category: "طهارة", keywords: ["حسن", "نقاء"] },
  "ذكي": { meaning: "السريع الفهم والإدراك", category: "ذكاء", keywords: ["فطنة"] },
  "نجاح": { meaning: "بلوغ المطلوب", category: "نجاح", keywords: ["بلوغ", "تحقيق"] },
  "سعادة": { meaning: "حالة الرضا والفرح", category: "سعادة", keywords: ["رضا", "فرح"] },
  "مرض": { meaning: "خروج الجسد عن حال صحته", category: "مرض", keywords: ["اعتلال", "ضعف"] },
  "شفاء": { meaning: "العودة إلى الصحة", category: "شفاء", keywords: ["عافية", "سلامة"] },
  "موت": { meaning: "انتهاء الأجل", category: "موت", keywords: ["انتهاء", "فراق"] },
  "حياة": { meaning: "استمرار الروح في الجسد", category: "حياة", keywords: ["استمرار", "بقاء"] },
  "غنى": { meaning: "الاستغناء عن الآخرين", category: "غنى", keywords: ["وفرة"] },
  "فقر": { meaning: "الحاجة إلى الآخرين", category: "فقر", keywords: ["حاجة", "عوز"] },
  "صحة": { meaning: "سلامة البدن", category: "صحة", keywords: ["سلامة", "اعتدال"] },
  "سفر": { meaning: "الانتقال من موضع إلى موضع", category: "سفر", keywords: ["انتقال", "رحلة"] },
  "محمد": { meaning: "المحمود في خصاله الكثيرة", category: "حمد", keywords: ["حمد", "ثناء"] },
  "أحمد": { meaning: "الأكثر حمداً وشكراً", category: "حمد", keywords: ["حمد", "شكر"] },
  "علي": { meaning: "الرفيع القدر العالي", category: "علو", keywords: ["علو", "رفعة"] },
  "يوسف": { meaning: "الذي يزيد على غيره حسناً", category: "زيادة", keywords: ["زيادة", "حسن"] },
  "موسى": { meaning: "المنقذ من الماء", category: "نجاة", keywords: ["نجاة", "إنقاذ"] },
  "فاطمة": { meaning: "التي فُطم عنها الشر", category: "طهارة", keywords: ["طهر", "براءة"] },
  "مريم": { meaning: "العابدة السيدة", category: "عبادة", keywords: ["عبادة", "سيدة"] },
  "زينب": { meaning: "شجرة الزهر الجميل", category: "جمال", keywords: ["زهر", "جمال"] },
  "نور": { meaning: "الضياء الذي يكشف الظلام", category: "نور", keywords: ["ضياء", "إشراق"] },
  "هدى": { meaning: "الدلالة على الطريق المستقيم", category: "هداية", keywords: ["رشد", "استقامة"] },
  "أمل": { meaning: "الترقب للحصول على الخير", category: "رجاء", keywords: ["رجاء", "ترقب"] },
  "فرح": { meaning: "السرور الذي يملأ القلب", category: "سرور", keywords: ["سرور", "بهجة"] },
  "حب": { meaning: "ميل القلب إلى المحبوب", category: "محبة", keywords: ["محبة", "ود"] },
  "وفاء": { meaning: "الالتزام بالعهد", category: "وفاء", keywords: ["إخلاص", "عهد"] },
  "جفر": { meaning: "العلم بالحروف وأسرارها", category: "علم", keywords: ["أسرار", "حروف"] },
  "ماء": { meaning: "السائل الحياة", category: "ماء", keywords: ["حياة", "سيولة"] },
  "نار": { meaning: "الحرارة المحرقة", category: "نار", keywords: ["حرارة", "إحراق"] },
  "هواء": { meaning: "الغلاف الذي لا يُرى", category: "هواء", keywords: ["خفاء", "حركة"] },
  "تراب": { meaning: "الأرض التي منها الخلق", category: "تراب", keywords: ["ثبات", "أصل"] },
  "قوة": { meaning: "الطاقة الفاعلة", category: "قوة", keywords: ["طاقة", "فعل"] },
  "خير": { meaning: "ما ينفع الناس", category: "خير", keywords: ["نفع", "بركة"] },
  "شر": { meaning: "ما يضر الناس", category: "شر", keywords: ["ضرر", "فساد"] },
  "سلام": { meaning: "الأمان وانعدام الخوف", category: "سلام", keywords: ["أمان", "طمأنينة"] },
  "خوف": { meaning: "توقع الضرر", category: "خوف", keywords: ["اضطراب", "قلق"] },
  "أمان": { meaning: "الاطمئنان على النفس", category: "أمان", keywords: ["طمأنينة", "سكينة"] },
  "رضا": { meaning: "القبول بما قسمه الله", category: "رضا", keywords: ["قبول"] },
  "حكمة": { meaning: "الفهم العميق للأمور", category: "حكمة", keywords: ["فهم", "بصيرة"] },
  "عدل": { meaning: "الإنصاف", category: "عدل", keywords: ["إنصاف", "استقامة"] },
  "ظل": { meaning: "الفَيْء الذي يحجب ضوء الشمس", category: "ظل", keywords: ["حجب", "أمان", "ستر"] },
  "ظلام": { meaning: "غياب النور", category: "ظلام", keywords: ["عتمة", "غياب"] },
  "ظهور": { meaning: "البروز والاتضاح", category: "ظهور", keywords: ["بروز", "وضوح"] },
  "رأفة": { meaning: "الرحمة الشديدة", category: "رحمة", keywords: ["رحمة", "عطف"] },
  "رحمة": { meaning: "الرقة والعطف", category: "رحمة", keywords: ["عطف", "لين"] }
};

function letterToVector(ch) {
  const map = { "أ": "ا", "إ": "ا", "آ": "ا", "ة": "ه", "ى": "ي", "ؤ": "و", "ئ": "ي" };
  const mapped = map[ch] || ch;
  return LETTER_FEATURES[mapped] || [5, 5, 5, 5, 5, 5, 5, 5];
}

function getWordVector(word) {
  const letters = normalize(word).replace(/\s/g, "").split("");
  if (letters.length === 0) return null;
  const vector = new Array(8).fill(0);
  letters.forEach(function(ch) {
    const v = letterToVector(ch);
    for (let i = 0; i < 8; i++) vector[i] += v[i];
  });
  for (let i = 0; i < 8; i++) vector[i] /= letters.length;
  return vector;
}

function cosineSimilarity(a, b) {
  if (!a || !b) return 0;
  let dot = 0, magA = 0, magB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    magA += a[i] * a[i];
    magB += b[i] * b[i];
  }
  if (magA === 0 || magB === 0) return 0;
  return dot / (Math.sqrt(magA) * Math.sqrt(magB));
}

/* ============================================================
   محرك البحث المعجمي (الإصدار 4.0)
   ✅ إزالة "ال" التعريف من الكلمتين
   ✅ رفع عتبة القبول إلى 0.6
   ✅ إضافة تطابق حرفين متتاليين
   ============================================================ */
function searchLexicon(word, topN) {
  topN = topN || 5;
  let wordNorm = normalize(word).replace(/\s/g, "");

  // ✅ إزالة "ال" التعريف من كلمة البحث
  if (wordNorm.length > 3 && wordNorm.indexOf("ال") === 0) {
    wordNorm = wordNorm.substring(2);
  }

  const wordLetters = wordNorm.split("");
  if (wordLetters.length === 0) return [];

  const results = [];

  for (const key in LEXICON) {
    let lexNorm = normalize(key).replace(/\s/g, "");

    // ✅ إزالة "ال" من كلمات القاموس
    if (lexNorm.length > 3 && lexNorm.indexOf("ال") === 0) {
      lexNorm = lexNorm.substring(2);
    }

    const lexLetters = lexNorm.split("");

    // ١) تطابق الحرف الأول (مؤشر قوي على الجذر)
    const firstBonus = (wordLetters[0] === lexLetters[0]) ? 0.5 : 0;

    // ٢) نسبة الحروف المشتركة
    const shared = wordLetters.filter(function(l) { return lexLetters.indexOf(l) !== -1; }).length;
    const totalUnique = new Set(wordLetters.concat(lexLetters)).size;
    const letterSimilarity = shared / totalUnique;

    // ٣) تقارب الطول
    const lengthDiff = Math.abs(wordLetters.length - lexLetters.length);
    const lengthScore = Math.max(0, 1 - lengthDiff * 0.3);

    // ٤) تطابق حرفين متتاليين
    let consecutiveMatch = 0;
    for (let i = 0; i < wordLetters.length - 1; i++) {
      const pair = wordLetters[i] + wordLetters[i + 1];
      if (lexNorm.indexOf(pair) !== -1) consecutiveMatch += 0.3;
    }

    const score = (letterSimilarity * 0.3) + (lengthScore * 0.1) + firstBonus + consecutiveMatch;

    // ✅ رفع العتبة إلى 0.6 لمنع المطابقات الكاذبة
    if (score < 0.6) continue;

    results.push({
      word: key,
      meaning: LEXICON[key].meaning,
      category: LEXICON[key].category,
      keywords: LEXICON[key].keywords,
      similarity: letterSimilarity,
      score: score,
      confidence: Math.min(100, Math.round(score * 100))
    });
  }

  results.sort(function(a, b) { return b.score - a.score; });
  return results.slice(0, topN);
}

function buildKineticMeaning(word) {
  const letters = normalize(word).replace(/\s/g, "").split("");
  const steps = [];
  letters.forEach(function(ch, i) {
    const L = LETTERS_DB[ch] || LETTERS_DB[normalize(ch)[0]];
    if (!L) return;
    steps.push({
      position: i + 1, letter: ch,
      keyword: L.keyword, kinetic: L.kinetic, nili: L.nili,
      nature: L.abjadNature
    });
  });
  if (steps.length === 0) return null;
  const keywords = steps.map(function(s) { return s.keyword; });
  const natures = steps.map(function(s) { return s.nature; });
  const natureCount = {};
  natures.forEach(function(n) { natureCount[n] = (natureCount[n] || 0) + 1; });
  const sorted = Object.entries(natureCount).sort(function(a, b) { return b[1] - a[1]; });
  const dominantNature = sorted[0][0];
  let kineticSentence = 'حركة اللفظ تبدأ بـ"' + steps[0].keyword + '"';
  for (let i = 1; i < steps.length; i++) {
    if (i === steps.length - 1) kineticSentence += ' ثم تُختم بـ"' + steps[i].keyword + '"';
    else kineticSentence += '، ثم "' + steps[i].keyword + '"';
  }
  kineticSentence += '. الفعل المتراكم: ' + keywords.join(" ← ") + '. الطبع الغالب: ' + dominantNature + '.';
  return { word: word, steps: steps, kineticSentence: kineticSentence, keywords: keywords, dominantNature: dominantNature, natureCount: natureCount };
}

function analyzeWordSemantic(word) {
  const kinetic = buildKineticMeaning(word);
  const matches = searchLexicon(word, 5);
  const bestMatch = matches[0];
  let harmonyScore = 0;
  if (bestMatch && kinetic) {
    const natureToCategory = {
      "نار": ["قوة", "شجاعة", "غضب", "حرارة"],
      "هواء": ["حركة", "فكر", "ذكاء", "خفاء"],
      "ماء": ["عاطفة", "محبة", "حنين", "سلام"],
      "تراب": ["ثبات", "وفاء", "حكمة", "أصالة"]
    };
    const related = natureToCategory[kinetic.dominantNature] || [];
    harmonyScore = related.some(function(c) {
      return bestMatch.category.indexOf(c) !== -1 || c.indexOf(bestMatch.category) !== -1;
    }) ? 95 : 60;
  }
  return { word: word, kinetic: kinetic, matches: matches, bestMatch: bestMatch, harmonyScore: harmonyScore };
}

/* ============================================================
   شاشة محرك المعنى الدلالي
   ============================================================ */
function showAISemanticScreen() {
  const title = document.getElementById('listTitle');
  if (title) title.textContent = "🧠 الذكاء الاصطناعي الدلالي";
  const c = document.getElementById('listContent');
  c.innerHTML = `
    <div class="card">
      <div class="card-title">🧠 محرك المعنى الدلالي</div>
      <p style="font-size:13px;color:#666;line-height:1.8;margin-bottom:12px">
        أدخل أي كلمة أو لفظ، وسيقوم المحرك بـ:
        <br>١) تحليل معاني حروفها الحركية
        <br>٢) بناء المعنى المتراكم للفظ
        <br>٣) البحث في قاموس اللغة عن أقرب المعاني
        <br>٤) قياس التوافق بين المعنى الحركي والقاموسي
      </p>
      <div class="search-box" style="padding:0">
        <input type="text" id="aiWordInput" placeholder="اكتب كلمة أو لفظ..." autocomplete="off">
        <button class="btn-primary" onclick="runSemanticAI()">🔍 حلّل المعنى</button>
      </div>
    </div>
    <div id="aiSemanticResult"></div>`;
  showScreen('screen-list');
}

function runSemanticAI() {
  const word = document.getElementById('aiWordInput').value.trim();
  if (!word) { alert("الرجاء إدخال كلمة"); return; }

  const result = analyzeWordSemantic(word);
  const container = document.getElementById('aiSemanticResult');

  if (!result.kinetic || result.kinetic.steps.length === 0) {
    container.innerHTML = '<div class="card"><p style="color:#999">لا يمكن تحليل هذه الكلمة</p></div>';
    return;
  }
  const k = result.kinetic;
  const stepsHTML = k.steps.map(function(s) {
    return '<div class="nar-step">' +
      '<div class="nar-num">' + s.position + '</div>' +
      '<div class="nar-char">' + s.letter + '</div>' +
      '<div class="nar-text"><strong>' + s.keyword + ':</strong> ' + s.kinetic +
      '<br><span style="color:#888;font-size:12px">' + s.nili + '</span></div></div>';
  }).join("");

  let matchesHTML = "";
  if (result.matches && result.matches.length > 0) {
    matchesHTML = result.matches.map(function(m, i) {
      return '<div class="ai-match ' + (i === 0 ? 'ai-match-top' : '') + '">' +
        '<div class="ai-match-header">' +
        '<strong style="font-size:16px;color:#1A237E">' + m.word + '</strong>' +
        '<span class="ai-confidence">' + m.confidence + '%</span></div>' +
        '<div style="font-size:13.5px;color:#444;line-height:1.8;margin-top:6px">' + m.meaning + '</div>' +
        '<div style="font-size:12px;color:#888;margin-top:4px">التصنيف: ' + m.category +
        ' • الكلمات المفتاحية: ' + m.keywords.join(" • ") + '</div></div>';
    }).join("");
  } else {
    matchesHTML = '<p style="font-size:13.5px;color:#888;text-align:center;padding:16px 0">' +
      'لم يُعثر على مطابقات معجمية وثيقة لهذه الكلمة.</p>';
  }

  container.innerHTML = `
    <div class="card">
      <div class="card-title">📖 المعنى الحركي المتراكم</div>
      <div class="narrative-box">${k.kineticSentence}</div>
      <div class="narrative-steps">${stepsHTML}</div>
    </div>
    <div class="card">
      <div class="card-title">🔍 أقرب المعاني في قاموس اللغة</div>
      ${matchesHTML}
    </div>
    <div class="card">
      <div class="card-title">⚖️ التوافق الدلالي</div>
      <div class="ai-harmony">
        <div class="ai-harmony-circle" style="--score:${result.harmonyScore}%">
          <span>${result.harmonyScore}%</span>
        </div>
        <div class="ai-harmony-text">
          ${result.harmonyScore >= 90
            ? "✅ التوافق عالٍ — المعنى الحركي يطابق المعنى القاموسي."
            : result.harmonyScore > 0
              ? "⚠️ التوافق متوسط — المعنى الحركي يوسّع المعنى القاموسي."
              : "ℹ️ لم يُعثر على مطابقة معجمية وثيقة."}
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-title">💡 الخلاصة</div>
      <p class="meaning-text">
        كلمة <strong>"${word}"</strong> تحمل معنى حركياً هو:
        <em>${k.keywords.join("، ")}</em>.
        ${result.bestMatch
          ? '<br>وأقرب ما يقابلها في القاموس: <strong>"' + result.bestMatch.word + '"</strong> بمعنى: ' + result.bestMatch.meaning + '.'
          : ''}
      </p>
    </div>`;
}

/* ============================================================
   السؤال الجفري — القواعد السبع
   ============================================================ */

const FRACTIONS = { "نار": 9, "هواء": 12, "ماء": 15, "تراب": 16 };

function ruleBast(letter) {
  const spelling = LETTER_SPELLING[letter];
  if (!spelling) return { letter: letter, bigWord: "", value: 0 };
  const bigWord = spelling.big;
  let sumValue = 0;
  bigWord.split("").forEach(function(c) { sumValue += getLetterValue(c); });
  return { letter: letter, bigWord: bigWord, value: sumValue };
}

function ruleKasr(letter) {
  const nature = getNature(letter);
  const value = getLetterValue(letter);
  const den = FRACTIONS[nature] || 1;
  return {
    letter: letter, nature: nature, value: value, denominator: den,
    kasrValue: Math.floor(value / den),
    remainder: value % den
  };
}

function ruleTarh(letter) {
  const nature = getNature(letter);
  const value = getLetterValue(letter);
  const isqat = NATURE_ISQAT[nature] || 1;
  let remaining = value;
  while (remaining >= isqat) remaining -= isqat;
  return { letter: letter, value: value, isqat: isqat, remaining: remaining, resultLetter: valueToLetter(remaining) };
}

function ruleTawlid(word) {
  const normalized = normalize(word).replace(/\s/g, "");
  const letters = normalized.split("").filter(function(c) { return JAFR_PLANETS[c]; });
  if (letters.length === 0) return [];
  const circle = ABJAD_CIRCLE.map(function(l) { return l.letter; });
  const generated = [];
  let current = letters.slice();
  for (let i = 0; i < 28; i++) {
    const row = [];
    for (let j = 0; j < letters.length; j++) {
      const ch = current[j];
      const idx = circle.indexOf(ch);
      if (idx === -1) { row.push(ch); continue; }
      row.push(circle[(idx + letters.length) % circle.length]);
    }
    generated.push(row.join(""));
    current = row.slice();
  }
  if (generated.length > 1 && generated[generated.length - 1] === generated[0]) generated.pop();
  return generated;
}

function ruleMahd(word) {
  const normalized = normalize(word).replace(/\s/g, "");
  const letters = normalized.split("").filter(function(c) { return JAFR_PLANETS[c]; });
  const natureTotals = { "نار": 0, "هواء": 0, "ماء": 0, "تراب": 0 };
  letters.forEach(function(ch) { natureTotals[getNature(ch)] += getLetterValue(ch); });
  const sorted = Object.entries(natureTotals).sort(function(a, b) { return b[1] - a[1]; });
  return { natureTotals: natureTotals, dominantNature: sorted[0][0], dominantValue: sorted[0][1] };
}

function ruleHall(rows) {
  if (!rows || rows.length === 0) return "";
  let result = "";
  rows.forEach(function(row) { if (row.length > 0) result += row[0]; });
  return result;
}

function runFullJafrAnalysis(word) {
  const normalized = normalize(word).replace(/\s/g, "");
  const letters = normalized.split("").filter(function(c) { return JAFR_PLANETS[c]; });
  if (letters.length === 0) return null;

  const bast = letters.map(function(l) { return ruleBast(l); });
  const kasr = letters.map(function(l) { return ruleKasr(l); });
  const tarh = letters.map(function(l) { return ruleTarh(l); });
  const tawlid = ruleTawlid(word);
  const mahd = ruleMahd(word);
  const hall = ruleHall(tawlid);
  const aqd = hall.split("").slice(0, 6).join("");

  return {
    word: word, letters: letters, bast: bast, kasr: kasr, tarh: tarh,
    tawlid: tawlid, mahd: mahd, hall: hall, aqd: aqd,
    totalValue: letters.reduce(function(s, l) { return s + getLetterValue(l); }, 0),
    dominantNature: mahd.dominantNature
  };
}

const JAFR_DOMAINS = {
  "صحة": {
    keywords: ["مرض", "صحة", "شفاء", "علاج", "وجع", "سقم", "دواء", "شفى", "برء", "سليم"],
    "نار": "الحالة تحتاج انتباهاً عاجلاً — لكن الشفاء قريب بإذن الله",
    "هواء": "الحالة متقلبة — تتحسن تدريجياً مع مرور الأيام",
    "ماء": "الحالة مستقرة — تحتاج إلى راحة وهدوء ومراقبة",
    "تراب": "الحالة ثابتة — تحتاج علاجاً طويل الأمد وصبراً"
  },
  "موت": {
    keywords: ["موت", "وفاة", "أجل", "قضاء", "هلاك", "ميت", "فقيد"],
    "نار": "الأمر فيه شدة وانقضاء — قد تكون النهاية قريبة",
    "هواء": "الأمر لا يزال في تقلب وتردد — لا يمكن الجزم",
    "ماء": "الأمر يسير ببطء — الوقت لم يحن بعد",
    "تراب": "الأمر ثابت — لا تغيير قريب في الأفق"
  },
  "زواج": {
    keywords: ["زواج", "نكاح", "خطبة", "عقد", "زوج", "زوجة", "مهر"],
    "نار": "الزواج قريب — لكن قد يكون فيه تعجل",
    "هواء": "الأمر في حركة وانتقال — قد يكون في مكان آخر",
    "ماء": "الأمر فيه عاطفة جياشة — يحتاج وقتاً للنضج",
    "تراب": "الأمر ثابت وراسخ — الزواج سيكون مستقراً"
  },
  "مال": {
    keywords: ["مال", "رزق", "غنى", "فقر", "تجارة", "ربح", "خسارة", "ثروة", "دين"],
    "نار": "المال يأتي بسرعة ويذهب بسرعة — يحتاج حذراً",
    "هواء": "الرزق في حركة وتنقل — قد يكون من التجارة",
    "ماء": "الرزق يأتي بسلاسة — قد يكون من ماء أو سفر",
    "تراب": "الرزق ثابت ومتراكم — يحتاج وقتاً"
  },
  "سفر": {
    keywords: ["سفر", "رحلة", "تنقل", "انتقال", "هجرة", "عودة"],
    "نار": "السفر قريب — لكن قد يكون فيه مشقة",
    "هواء": "السفر سريع ومتكرر — قد لا يستقر",
    "ماء": "السفر بسلاسة — قد يكون عبر البحر",
    "تراب": "السفر مؤجل — قد يحتاج تحضيراً طويلاً"
  },
  "غائب": {
    keywords: ["غائب", "غائبة", "مفقود", "منتظر", "غياب", "اختفاء", "مسافر"],
    "نار": "الغائب في حالة شدة — قد يعود قريباً",
    "هواء": "أخباره في تحرك — قد تأتي رسالة قريباً",
    "ماء": "أخباره قادمة — اطمئنوا",
    "تراب": "غيابه طويل — يحتاج صبراً"
  },
  "عدو": {
    keywords: ["عدو", "خصم", "نزاع", "خلاف", "صراع", "حرب"],
    "نار": "العدو في شدة — لكن الغلبة لك",
    "هواء": "الصراع في حركة — يحتاج حكيماً",
    "ماء": "الحل قريب — بالتفاوض",
    "تراب": "الصراع طويل — يحتاج صبراً"
  },
  "مستقبل": {
    keywords: ["مستقبل", "قادم", "سيحدث", "سيكون", "المآل", "النهاية"],
    "نار": "المستقبل فيه إشراق — لكن مع بعض التحديات",
    "هواء": "المستقبل متقلب — يعتمد على اختياراتك",
    "ماء": "المستقبل يسير بسلاسة — اطمئن",
    "تراب": "المستقبل ثابت — ستحصل على ما تسعى إليه"
  }
};

function analyzeJafrQuestion(question) {
  const normalized = normalize(question);
  const words = normalized.split(/\s+/);
  let domain = "مستقبل";
  let maxMatches = 0;
  for (const d in JAFR_DOMAINS) {
    const matchCount = JAFR_DOMAINS[d].keywords.filter(function(k) { return normalized.indexOf(k) !== -1; }).length;
    if (matchCount > maxMatches) { maxMatches = matchCount; domain = d; }
  }
  let subject = "";
  const stopWords = ["هل","ما","متى","اين","كيف","عن","في","من","الى","على","حال"];
  for (let i = 0; i < words.length; i++) {
    const w = words[i];
    if (w.length > 1 && stopWords.indexOf(w) === -1) { subject = w; break; }
  }
  const analysis = runFullJafrAnalysis(subject || question);
  if (!analysis) {
    return { question: question, domain: domain, subject: subject, error: "لم يتم العثور على حروف صالحة" };
  }
  const domainReading = JAFR_DOMAINS[domain][analysis.dominantNature] || "";
  return {
    question: question, domain: domain, subject: subject,
    analysis: analysis, domainReading: domainReading,
    finalReading: domainReading + '. والتوليد الجفري يشير إلى: "' + analysis.aqd + '"'
  };
}

function showJafrQuestionScreen() {
  const title = document.getElementById('jafrCalcTitle');
  if (title) title.textContent = "🔮 سؤال جفري";
  const c = document.getElementById('jafrCalcContent');
  c.innerHTML = `
    <div class="card">
      <div class="card-title">🔮 اطرح سؤالك الجفري</div>
      <p style="font-size:13px;color:#666;line-height:1.8;margin-bottom:12px">
        اكتب سؤالك بلغة عربية واضحة. سيقوم المحرك بتطبيق القواعد السبع:
        الكسر، البسط، الطرح، التوليد، المحض، الحل، العقد.
      </p>
      <div class="search-box" style="padding:0">
        <textarea id="jafrQuestion" rows="4" placeholder="مثال: هل يشفى المريض فلان؟"></textarea>
        <button class="btn-primary" onclick="answerJafrQuestion()" style="margin-top:8px">
          🔮 استخرج الحكم
        </button>
      </div>
    </div>
    <div id="jafrQuestionResult"></div>
    <button class="btn-outline" style="width:100%;margin-top:10px" onclick="showJafrScreen()">← رجوع</button>`;
  showScreen('screen-jafr-calc');
}

function answerJafrQuestion() {
  const question = document.getElementById('jafrQuestion').value.trim();
  if (!question) { alert("الرجاء إدخال السؤال"); return; }

  const result = analyzeJafrQuestion(question);
  const container = document.getElementById('jafrQuestionResult');

  if (result.error) {
    container.innerHTML = '<div class="card"><p style="color:#999">' + result.error + '</p></div>';
    return;
  }

  const a = result.analysis;

  const bastRows = a.bast.map(function(b) {
    return '<tr><td class="letter-cell">' + b.letter + '</td>' +
           '<td>' + b.bigWord + '</td><td>' + b.value + '</td></tr>';
  }).join("");

  const kasrRows = a.kasr.map(function(k) {
    return '<tr><td class="letter-cell">' + k.letter + '</td>' +
           '<td>' + k.nature + '</td><td>' + k.value + '</td>' +
           '<td>1/' + k.denominator + '</td><td>' + k.kasrValue + '</td></tr>';
  }).join("");

  const tarhRows = a.tarh.map(function(t) {
    return '<tr><td class="letter-cell">' + t.letter + '</td>' +
           '<td>' + t.value + '</td><td>' + t.isqat + '</td>' +
           '<td>' + t.remaining + '</td>' +
           '<td style="color:#1A237E;font-weight:bold">' + t.resultLetter + '</td></tr>';
  }).join("");

  const tawlidHTML = a.tawlid.slice(0, 14).map(function(row, i) {
    return '<div class="jafr-row">' +
      '<span class="jafr-row-num">' + (i + 1) + '</span>' +
      '<span class="jafr-row-text">' + row.split("").join(" ") + '</span></div>';
  }).join("");

  const mahd = a.mahd;
  const mahdHTML = Object.entries(mahd.natureTotals).map(function(e) {
    const n = e[0], v = e[1];
    const info = NATURES_ABJAD[n];
    return '<div class="nature-card" style="border-right-color:' + info.color + '">' +
      '<div class="nature-header" style="color:' + info.color + '">' +
      '<span style="font-size:20px">' + info.icon + '</span>' +
      '<strong>' + n + '</strong>' +
      '<span style="font-size:12px;color:#888">المجموع: ' + v + '</span>' +
      '</div></div>';
  }).join("");

  container.innerHTML = `
    <div class="card">
      <div class="card-title">📜 السؤال والمجال</div>
      <p style="font-size:14px;line-height:1.9;color:#333;background:#F7F8FC;
                padding:12px;border-radius:10px;border-right:3px solid #1A237E">
        "${question}"
      </p>
      <div class="summary-grid" style="margin-top:12px">
        <div class="sum-item"><span class="sum-lbl">المجال</span><span class="sum-val">${result.domain}</span></div>
        <div class="sum-item"><span class="sum-lbl">الموضوع</span><span class="sum-val">${result.subject || "—"}</span></div>
        <div class="sum-item"><span class="sum-lbl">القيمة الأبجدية</span><span class="sum-val">${a.totalValue}</span></div>
        <div class="sum-item"><span class="sum-lbl">الطبع الغالب</span><span class="sum-val">${a.dominantNature}</span></div>
      </div>
    </div>

    <div class="card jafr-verdict">
      <div class="card-title">⚖️ الحكم الجفري</div>
      <div class="jafr-verdict-box">
        <div class="jafr-verdict-icon">🔮</div>
        <div class="jafr-verdict-text">${result.finalReading}</div>
      </div>
      <p style="font-size:12.5px;color:#888;margin-top:12px;line-height:1.8;text-align:center">
        ⚠️ هذا اجتهاد في علم الحروف وليس قضاءً قاطعاً — الأمر لله وحده.
      </p>
    </div>

    <div class="card">
      <div class="card-title">١) البسط</div>
      <table class="jafr-table">
        <thead><tr><th>الحرف</th><th>اسمه</th><th>القيمة</th></tr></thead>
        <tbody>${bastRows}</tbody>
      </table>
    </div>

    <div class="card">
      <div class="card-title">٢) الكسر</div>
      <table class="jafr-table">
        <thead><tr><th>الحرف</th><th>الطبع</th><th>القيمة</th><th>المقام</th><th>الكسر</th></tr></thead>
        <tbody>${kasrRows}</tbody>
      </table>
    </div>

    <div class="card">
      <div class="card-title">٣) الطرح</div>
      <table class="jafr-table">
        <thead><tr><th>الحرف</th><th>القيمة</th><th>الإسقاط</th><th>الباقي</th><th>الناتج</th></tr></thead>
        <tbody>${tarhRows}</tbody>
      </table>
    </div>

    <div class="card">
      <div class="card-title">٤) التوليد (${a.tawlid.length} سطراً)</div>
      <div class="jafr-rows">${tawlidHTML}</div>
    </div>

    <div class="card">
      <div class="card-title">٥) المحض</div>
      ${mahdHTML}
      <p style="margin-top:10px;font-size:13px;color:#444">
        <strong>العنصر الغالب:</strong> ${mahd.dominantNature} (${mahd.dominantValue})
      </p>
    </div>

    <div class="card">
      <div class="card-title">٦) الحل</div>
      <div class="jafr-hall">
        <div class="jafr-hall-word">${a.hall}</div>
      </div>
    </div>

    <div class="card">
      <div class="card-title">٧) العقد</div>
      <div class="jafr-hall">
        <div class="jafr-hall-word" style="background:linear-gradient(135deg,#FFD700,#B8860B);color:#1A237E">
          ${a.aqd}
        </div>
      </div>
    </div>

    <button class="btn-outline" style="width:100%" onclick="showJafrQuestionScreen()">
      ← طرح سؤال آخر
    </button>`;
}