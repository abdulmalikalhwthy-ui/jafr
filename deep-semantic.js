/* ============================================================
   deep-semantic.js — المحرك الدلالي الجامع
   الإصدار 3.0 — يدمج:
   ① المعنى الحركي (سبط النيلي)
   ② المعنى الإلهي (الإمام علي + الإمام الرضا)
   ③ المعنى القاموسي (لسان العرب)
   ④ الآيات القرآنية (فهرس الجذر)
   ⑤ الذكاء التفاعلي (توسيع بـ Gemini)
   ============================================================ */

/* ============ الأسماء الإلهية — الإمام علي ============ */
const DIVINE_NAMES_ALI = {
  "ا": { primary: "الله الحي القيوم", all: ["الله", "الحي", "القيوم"] },
  "ب": { primary: "الباقي بعد فناء خلقه", all: ["الباقي"] },
  "ت": { primary: "التواب", all: ["التواب"] },
  "ث": { primary: "الثابت الكائن", all: ["الثابت", "الكائن"] },
  "ج": { primary: "الجليل جل ثناؤه", all: ["الجليل"] },
  "ح": { primary: "الحق الحي الحليم", all: ["الحق", "الحي", "الحليم"] },
  "خ": { primary: "الخبير بما يعمل العباد", all: ["الخبير"] },
  "د": { primary: "الديان يوم الدين", all: ["الديان"] },
  "ذ": { primary: "ذو الجلال والإكرام", all: ["ذو الجلال", "ذو الإكرام"] },
  "ر": { primary: "الرؤوف بعباده", all: ["الرؤوف", "الرحيم"] },
  "ز": { primary: "زين المعبودين", all: ["الزين"] },
  "س": { primary: "السميع البصير", all: ["السميع", "البصير"] },
  "ش": { primary: "الشاكر للمؤمنين", all: ["الشاكر"] },
  "ص": { primary: "الصادق في وعده ووعيده", all: ["الصادق"] },
  "ض": { primary: "الضار النافع", all: ["الضار", "النافع"] },
  "ط": { primary: "الطاهر المطهر", all: ["الطاهر", "المطهر"] },
  "ظ": { primary: "الظاهر المظهر لآياته", all: ["الظاهر", "المظهر"] },
  "ع": { primary: "العالم بعباده", all: ["العالم"] },
  "غ": { primary: "غياث المستغيثين", all: ["الغياث"] },
  "ف": { primary: "فالق الحب والنوى", all: ["فالق"] },
  "ق": { primary: "القادر على جميع خلقه", all: ["القادر"] },
  "ك": { primary: "الكافي الذي لم يكن له كفواً أحد", all: ["الكافي"] },
  "ل": { primary: "اللطيف بعباده", all: ["اللطيف"] },
  "م": { primary: "مالك الملك", all: ["المالك", "الملك"] },
  "ن": { primary: "نور السماوات والأرض", all: ["النور"] },
  "ه": { primary: "الهادي لخلقه", all: ["الهادي"] },
  "و": { primary: "الواحد الصمد", all: ["الواحد", "الصمد"] },
  "ي": { primary: "يد الله الباسطة على خلقه", all: ["الباسط"] }
};

/* ============ الأسماء الإلهية — الإمام الرضا ============ */
const DIVINE_NAMES_RIDA = {
  "ا": { primary: "آلاء الله", all: ["آلاء الله"] },
  "ب": { primary: "بهجة الله", all: ["بهجة الله"] },
  "ت": { primary: "تمام الأمر بقائم آل محمد", all: ["تمام الأمر"] },
  "ث": { primary: "ثواب المؤمنين", all: ["ثواب المؤمنين"] },
  "ج": { primary: "جمال الله وجلال الله", all: ["جمال الله", "جلال الله"] },
  "ح": { primary: "حلم الله عن المذنبين", all: ["حلم الله"] },
  "خ": { primary: "خمول ذكر أهل المعاصي", all: ["خمول أهل المعاصي"] },
  "د": { primary: "دين الله", all: ["دين الله"] },
  "ذ": { primary: "من ذي الجلال", all: ["ذي الجلال"] },
  "ر": { primary: "من الرؤوف الرحيم", all: ["الرؤوف", "الرحيم"] },
  "ز": { primary: "زلازل القيامة", all: ["زلازل القيامة"] },
  "س": { primary: "سناء الله", all: ["سناء الله"] },
  "ش": { primary: "مشيئة الله", all: ["مشيئة الله"] },
  "ص": { primary: "صادق الوعد", all: ["صادق الوعد"] },
  "ض": { primary: "ضلال المخالفين", all: ["ضلال المخالفين"] },
  "ط": { primary: "طوبى للمؤمنين", all: ["طوبى"] },
  "ظ": { primary: "الظن بالله", all: ["ظن المؤمنين"] },
  "ع": { primary: "العالم", all: ["العالم"] },
  "غ": { primary: "الغي", all: ["الغي"] },
  "ف": { primary: "فوج من أفواج النار", all: ["فوج النار"] },
  "ق": { primary: "القرآن", all: ["القرآن"] },
  "ك": { primary: "الكافي", all: ["الكافي"] },
  "ل": { primary: "لغو الكافرين", all: ["لغو الكافرين"] },
  "م": { primary: "ملك الله يوم القيامة", all: ["ملك الله"] },
  "ن": { primary: "نوال الله ونكاله", all: ["النوال", "النكال"] },
  "ه": { primary: "هوان العاصي على الله", all: ["الهوان"] },
  "و": { primary: "ويل لمن عصى الله", all: ["الويل"] },
  "ي": { primary: "يد الله الباسطة بالرزق", all: ["الباسط بالرزق"] }
};

/* ============ استخراج الجذر ============ */
function extractArabicRoot(word) {
  let clean = word.trim();
  const hasArticle = clean.startsWith("ال");
  if (hasArticle) clean = clean.substring(2);
  clean = clean.replace(/ة$/, "");

  const letters = clean.split("");
  const excessLetters = ["ا", "و", "ي", "ه", "م", "ت", "س", "ن"];
  let root = [];

  for (let i = 0; i < letters.length; i++) {
    const ch = letters[i];
    const isExcess = excessLetters.includes(ch);

    if (root.length < 3) {
      if (i === 0 && ch === "م" && letters.length === 4) continue;
      if (i === 0 && ch === "ا" && letters.length === 4) continue;
      if (i > 0 && isExcess && root.length >= 2) continue;
      root.push(ch);
    }
  }

  // إذا كان مضاعفاً
  if (root.length === 2 && letters.length === 2) {
    // جذر ثنائي مضاعف
  }

  root = root.slice(0, 3);
  return {
    root: root.join(""),
    rootLetters: root,
    hasArticle: hasArticle,
    cleanWord: clean
  };
}

/* ============ تحديد البعد ============ */
function detectDimension(word) {
  const hasArticle = /^ال/.test(word.trim());
  return {
    dimension: hasArticle ? "معنوي" : "مادي",
    reason: hasArticle
      ? "اللفظ مُعرَّف بـ«ال» — ترتفع دلالته من الحس إلى المعنى"
      : "اللفظ نكرة — دلالته في المستوى المادي غالباً",
    isDefinite: hasArticle
  };
}

/* ============ التحليل الجامع ============ */
function analyzeComprehensive(word) {
  const cleanWord = word.trim();
  const dimension = detectDimension(cleanWord);
  const rootData = extractArabicRoot(cleanWord);
  const rootLetters = rootData.rootLetters;

  if (rootLetters.length === 0) {
    return { error: "لا يمكن تحليل هذه الكلمة" };
  }

  // ===== تحليل الحروف =====
  const letters = rootLetters.map((ch, i) => {
    const L = LETTERS_DB[ch] || {};
    const ali = DIVINE_NAMES_ALI[ch] || { primary: "—", all: [] };
    const rida = DIVINE_NAMES_RIDA[ch] || { primary: "—", all: [] };
    return {
      position: i + 1,
      letter: ch,
      kinetic: L.kinetic || "",
      keyword: L.keyword || "",
      nili: L.nili || "",
      nature: L.abjadNature || "",
      planet: L.planet || "",
      value: L.abjadValue || 0,
      divineAli: ali,
      divineRida: rida
    };
  });

  // ===== الطبع الغالب =====
  const natureCount = {};
  letters.forEach(l => {
    if (l.nature) natureCount[l.nature] = (natureCount[l.nature] || 0) + 1;
  });
  const dominantNature = Object.entries(natureCount)
    .sort((a, b) => b[1] - a[1])[0]?.[0] || "—";

  // ===== القيمة الأبجدية =====
  const totalValue = letters.reduce((s, l) => s + l.value, 0);

  // ===== الآيات القرآنية =====
  const quranVerses = (typeof findQuranVerses === 'function')
    ? findQuranVerses(rootData.root)
    : [];

  // ===== القاموس اللغوي =====
  const dictMatches = (typeof searchLexicon === 'function')
    ? searchLexicon(cleanWord, 5)
    : [];

  // ===== البناء =====
  return {
    word: cleanWord,
    root: rootData.root,
    rootLetters: rootLetters,
    dimension: dimension,
    letters: letters,
    dominantNature: dominantNature,
    totalValue: totalValue,
    quranVerses: quranVerses,
    dictionaryMatches: dictMatches,
    synthesis: buildComprehensiveSynthesis(cleanWord, rootData, dimension, letters, dominantNature),
    finalMeaning: buildFinalMeaning(letters, dimension, dominantNature)
  };
}

/* ============ بناء التركيب ============ */
function buildComprehensiveSynthesis(word, rootData, dimension, letters, dominantNature) {
  const lines = [];

  lines.push("【 المستوى ① — الجذر الصرفي 】");
  lines.push("اللفظ: «" + word + "»");
  lines.push("الجذر: «" + rootData.root + "»");
  lines.push("");

  lines.push("【 المستوى ② — البعد الدلالي 】");
  lines.push(dimension.reason);
  lines.push("");

  lines.push("【 المستوى ③ — المعاني الحركية (النيلي) 】");
  letters.forEach(l => {
    lines.push("• حرف «" + l.letter + "» = " + l.kinetic);
    if (l.nili) lines.push("  " + l.nili);
  });
  lines.push("");

  lines.push("【 المستوى ④ — المعاني الإلهية (أهل البيت) 】");
  lines.push("— عن الإمام علي عليه السلام:");
  letters.forEach(l => lines.push("  «" + l.letter + "» ← " + l.divineAli.primary));
  lines.push("");
  lines.push("— عن الإمام الرضا عليه السلام:");
  letters.forEach(l => lines.push("  «" + l.letter + "» ← " + l.divineRida.primary));
  lines.push("");

  lines.push("【 المستوى ⑤ — التركيب الحركي 】");
  lines.push("التسلسل: " + letters.map(l => l.keyword).join(" ← "));

  if (letters.length >= 2) {
    lines.push("التوليف: حركة «" + letters[1].keyword + "» تكتنف «" + letters[0].keyword + "»");
  }
  lines.push("");

  lines.push("【 المستوى ⑥ — التركيب الإلهي 】");
  lines.push(letters.map(l => "«" + l.letter + "» (" + l.divineAli.all.join("، ") + ")").join(" + "));
  lines.push("");

  lines.push("【 المستوى ⑦ — المعنى الجامع 】");
  lines.push(buildFinalMeaning(letters, dimension, dominantNature));

  return lines.join("\n");
}

/* ============ المعنى الجامع النهائي ============ */
function buildFinalMeaning(letters, dimension, dominantNature) {
  if (letters.length === 0) return "—";
  if (letters.length === 1) {
    return "المعنى الجامع: " + letters[0].kinetic +
           " المرتبط بـ " + letters[0].divineAli.primary +
           ". الطبع: " + dominantNature + ".";
  }

  const first = letters[0];
  const second = letters[1];

  let meaning = "إن " + first.keyword +
                " («" + first.divineAli.all.slice(0, 3).join("، ") + "») ";

  meaning += dimension.isDefinite ? "معنوياً " : "مادياً ";
  meaning += "اختلط بـ " + second.keyword +
             " («" + second.divineAli.all.slice(0, 2).join("، ") + "»)";

  if (letters.length > 2) {
    meaning += "، ثم " + letters[2].keyword +
               " («" + letters[2].divineAli.all.slice(0, 2).join("، ") + "»)";
  }

  meaning += "، ";
  meaning += dimension.isDefinite
    ? "وهذا التركيب يتكرر ويتجدد باستمرار بكل رحمة ورأفة. "
    : "وهذا التركيب يتكرر في المستوى المادي. ";

  meaning += "الطبع الغالب: " + dominantNature + ".";

  return meaning;
}

/* ============ شاشة التحليل الجامع ============ */
function showDeepSemanticScreen() {
  document.getElementById('listTitle').textContent = "🌟 التحليل الجامع";
  const c = document.getElementById('listContent');

  c.innerHTML = `
    <div class="card">
      <div class="card-title">🌟 التحليل الدلالي الجامع (٥ طبقات)</div>
      <p style="font-size:13.5px;color:#444;line-height:1.95">
        محرك ذكي يدمج:
        <br>① المعنى الحركي (سبط النيلي)
        <br>② المعنى الإلهي (الإمام علي + الإمام الرضا عليهما السلام)
        <br>③ المعنى القاموسي (لسان العرب)
        <br>④ الآيات القرآنية (فهرس الجذر)
        <br>⑤ المعنى الجامع النهائي
        <br><br>
        <span style="color:#4A148C;font-weight:bold">
          🧠 ذكاء تفاعلي — اسأل متى شئت، وسيتوسّع التحليل.
        </span>
      </p>
      <div class="search-box" style="padding:0;margin-top:14px">
        <input type="text" id="deepWordInput" placeholder="اكتب كلمة أو جذراً..." autocomplete="off">
        <button class="btn-primary" onclick="runComprehensiveAnalysis()">
          🌟 التحليل الجامع
        </button>
      </div>
    </div>

    <div class="card">
      <div class="card-title">💡 أمثلة سريعة</div>
      <div class="example-chips">
        ${["الحرور", "الرحمة", "الحكمة", "النور", "الحق", "الحياة", "العلم", "السلام"].map(w =>
          `<button class="chip" onclick="quickAnalyze('${w}')">${w}</button>`
        ).join("")}
      </div>
    </div>

    <div id="deepSemanticResult"></div>
  `;

  showScreen('screen-list');
}

function quickAnalyze(word) {
  document.getElementById('deepWordInput').value = word;
  runComprehensiveAnalysis();
}

/* ============ تشغيل التحليل الجامع ============ */
function runComprehensiveAnalysis() {
  const word = document.getElementById('deepWordInput').value.trim();
  if (!word) { alert("الرجاء إدخال كلمة"); return; }

  const result = analyzeComprehensive(word);
  const container = document.getElementById('deepSemanticResult');

  if (result.error) {
    container.innerHTML = '<div class="card"><p style="color:#999">' + result.error + '</p></div>';
    return;
  }

  // ===== ١) الكلمة والجذر =====
  const headerHTML = `
    <div class="card">
      <div class="card-title">📖 الكلمة والجذر</div>
      <div class="deep-header">
        <div class="deep-word">${result.word}</div>
        <div class="deep-arrow">↓</div>
        <div class="deep-root">الجذر: ${result.root}</div>
      </div>
      <div class="deep-badge ${result.dimension.isDefinite ? 'deep-badge-spiritual' : 'deep-badge-material'}">
        ${result.dimension.dimension === "معنوي" ? "🕊️ البعد المعنوي" : "⚙️ البعد المادي"}
      </div>
      <p style="text-align:center;font-size:13px;color:#666;margin-top:12px;line-height:1.8">
        ${result.dimension.reason}
      </p>
      <div class="summary-grid" style="margin-top:14px">
        <div class="sum-item">
          <span class="sum-lbl">القيمة الأبجدية</span>
          <span class="sum-val">${result.totalValue}</span>
        </div>
        <div class="sum-item">
          <span class="sum-lbl">الطبع الغالب</span>
          <span class="sum-val">${result.dominantNature}</span>
        </div>
        <div class="sum-item">
          <span class="sum-lbl">حروف الجذر</span>
          <span class="sum-val">${result.rootLetters.length}</span>
        </div>
        <div class="sum-item">
          <span class="sum-lbl">آيات قرآنية</span>
          <span class="sum-val">${result.quranVerses.length}</span>
        </div>
      </div>
    </div>
  `;

  // ===== ٢) تحليل الحروف =====
  let lettersHTML = "";
  result.letters.forEach(l => {
    lettersHTML += `
      <div class="comprehensive-letter">
        <div class="comprehensive-char">${l.letter}</div>

        <div class="layer-box layer-kinetic">
          <div class="layer-title">① المعنى الحركي (النيلي)</div>
          <div class="layer-kinetic-keyword">${l.keyword}</div>
          <div class="layer-kinetic-text">${l.kinetic}</div>
          ${l.nili ? '<div class="layer-nili">' + l.nili + '</div>' : ''}
          <div class="layer-meta">
            <span class="meta-tag">${l.nature}</span>
            <span class="meta-tag">${l.planet}</span>
            <span class="meta-tag">العدد: ${l.value}</span>
          </div>
        </div>

        <div class="layer-box layer-divine">
          <div class="layer-title">② المعنى الإلهي (أهل البيت)</div>
          <div class="divine-row">
            <span class="divine-source">الإمام علي:</span>
            <span class="divine-text">"${l.divineAli.primary}"</span>
          </div>
          <div class="divine-row">
            <span class="divine-source">الإمام الرضا:</span>
            <span class="divine-text">"${l.divineRida.primary}"</span>
          </div>
        </div>
      </div>`;
  });

  // ===== ٣) الآيات القرآنية =====
  const quranHTML = (typeof renderQuranVersesHTML === 'function')
    ? renderQuranVersesHTML(result.quranVerses, result.root)
    : "";

  // ===== ٤) التركيب =====
  const synthesisHTML = `
    <div class="card">
      <div class="card-title">✨ التركيب الجامع</div>
      <div class="deep-synthesis">${
        result.synthesis.split("\n").map(line => {
          if (line.startsWith("【")) return '<div class="deep-synthesis-head">' + line + '</div>';
          if (line.trim() === "") return '<br>';
          return '<div class="deep-synthesis-line">' + line + '</div>';
        }).join("")
      }</div>
    </div>
  `;

  // ===== ٥) القاموس =====
  let dictHTML = "";
  if (result.dictionaryMatches && result.dictionaryMatches.length > 0) {
    dictHTML = `
      <div class="card">
        <div class="card-title">📚 مقارنة معجمية</div>
        ${result.dictionaryMatches.map((m, i) => `
          <div class="ai-match ${i === 0 ? 'ai-match-top' : ''}">
            <div class="ai-match-header">
              <strong style="font-size:15px;color:#1A237E">${m.word}</strong>
              <span class="ai-confidence">${m.confidence}%</span>
            </div>
            <div style="font-size:13px;color:#444;line-height:1.8;margin-top:4px">
              ${m.meaning}
            </div>
          </div>
        `).join("")}
      </div>
    `;
  }

  // ===== ٦) النتيجة الجامعة =====
  const finalHTML = `
    <div class="card" style="background:linear-gradient(135deg,#1A237E,#4A148C);color:#fff">
      <div class="card-title" style="color:#FFD54F;border-color:#FFD54F">
        🎯 المعنى الجامع النهائي
      </div>
      <div style="font-size:15px;line-height:2;color:#FFFFFF;font-weight:500;padding:8px 0">
        ${result.finalMeaning}
      </div>
    </div>
  `;

  // ===== ٧) الذكاء التفاعلي =====
  const interactiveHTML = `
    <div class="card interactive-card">
      <div class="card-title">🧠 ذكاء تفاعلي — اسأل أكثر</div>
      <p style="font-size:13px;color:#666;margin-bottom:12px;line-height:1.8">
        اختر أحد الأزرار أو اكتب سؤالاً مخصصاً للتعمّق:
      </p>
      <div class="interactive-buttons">
        <button class="interactive-btn" onclick="askFollowUp('${word}', 'المعنى الروحي')">
          🕊️ المعنى الروحي
        </button>
        <button class="interactive-btn" onclick="askFollowUp('${word}', 'الربط بالآيات')">
          📖 الربط بالآيات
        </button>
        <button class="interactive-btn" onclick="askFollowUp('${word}', 'التطبيقات العملية')">
          💡 التطبيقات العملية
        </button>
        <button class="interactive-btn" onclick="askFollowUp('${word}', 'المقارنة بالجذور المشابهة')">
          🔗 جذور مشابهة
        </button>
        <button class="interactive-btn" onclick="askFollowUp('${word}', 'السياق التاريخي')">
          📜 السياق التاريخي
        </button>
        <button class="interactive-btn" onclick="askFollowUp('${word}', 'خلاصة فلسفية')">
          🌌 خلاصة فلسفية
        </button>
      </div>
      <div style="margin-top:14px">
        <input type="text" id="followUpInput" placeholder="أو اكتب سؤالاً مخصصاً..."
          style="width:100%;padding:12px;border:2px solid #C5CAE9;border-radius:10px;
                 font-size:14px;background:#fff;outline:none;font-family:inherit">
        <button class="btn-primary" style="width:100%;margin-top:8px"
          onclick="askCustomQuestion('${word}')">
          💬 اسأل
        </button>
      </div>
      <div id="followUpResult" style="margin-top:14px"></div>
    </div>
  `;

  // ===== تجميع الكل =====
  container.innerHTML =
    headerHTML +
    `<div class="card"><div class="card-title">🔠 تحليل الحروف (طبقتان)</div>${lettersHTML}</div>` +
    quranHTML +
    synthesisHTML +
    dictHTML +
    finalHTML +
    interactiveHTML;
}