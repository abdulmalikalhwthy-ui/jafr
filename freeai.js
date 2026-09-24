/* ============================================================
   freeai.js — الذكاء الاصطناعي (اختياري) + عدّاد تنازلي
   الإصدار: 3.0
   ============================================================ */

const AI_CONFIG = {
  // المزوّدون المتاحون (مجاناً)
  PROVIDERS: {
    gemini: {
      name: "Google Gemini",
      url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent",
      keyPrefixes: ["AIza", "AQ."],
      models: ["gemini-flash-latest", "gemini-2.0-flash", "gemini-1.5-flash"],
      format: "gemini"
    },
    groq: {
      name: "Groq (سريع)",
      url: "https://api.groq.com/openai/v1/chat/completions",
      keyPrefixes: ["gsk_"],
      models: ["llama-3.3-70b-versatile", "llama-3.1-8b-instant"],
      format: "openai"
    },
    mistral: {
      name: "Mistral AI",
      url: "https://api.mistral.ai/v1/chat/completions",
      keyPrefixes: ["", "sk-"],
      models: ["mistral-small-latest", "open-mistral-7b"],
      format: "openai"
    }
  },
  MAX_TOKENS: 2048,
  TEMPERATURE: 0.7,
  RATE_LIMIT_SECONDS: 60  // مدة الانتظار عند تجاوز الحد
};

/* ============ مفتاح التفعيل ============ */
function isAIEnabled() {
  return localStorage.getItem('ai_enabled') === 'true';
}
function setAIEnabled(enabled) {
  localStorage.setItem('ai_enabled', enabled ? 'true' : 'false');
}

/* ============ المزوّد الحالي ============ */
function getActiveProvider() {
  return localStorage.getItem('ai_provider') || 'gemini';
}
function setActiveProvider(provider) {
  if (AI_CONFIG.PROVIDERS[provider]) {
    localStorage.setItem('ai_provider', provider);
  }
}

/* ============ المفتاح ============ */
function getAIKey() {
  const provider = getActiveProvider();
  return localStorage.getItem('ai_key_' + provider) || "";
}
function setAIKey(key) {
  const provider = getActiveProvider();
  localStorage.setItem('ai_key_' + provider, key.trim());
}

function isAIReady() {
  if (!isAIEnabled()) return false;
  if (!navigator.onLine) return false;
  const key = getAIKey();
  if (!key) return false;
  const provider = AI_CONFIG.PROVIDERS[getActiveProvider()];
  return provider.keyPrefixes.some(function(p) { return key.startsWith(p) || p === ""; });
}

/* ============ العدّاد التنازلي ============ */
function getRateLimitUntil() {
  const ts = parseInt(localStorage.getItem('ai_rate_limit_until') || '0', 10);
  return ts;
}

function setRateLimit() {
  const until = Date.now() + (AI_CONFIG.RATE_LIMIT_SECONDS * 1000);
  localStorage.setItem('ai_rate_limit_until', until.toString());
}

function getRemainingSeconds() {
  const until = getRateLimitUntil();
  const diff = Math.ceil((until - Date.now()) / 1000);
  return diff > 0 ? diff : 0;
}

function isRateLimited() {
  return getRemainingSeconds() > 0;
}

/* ============ الاتصال بـ AI ============ */
async function askAI(systemPrompt, userPrompt, options) {
  options = options || {};
  if (!isAIEnabled()) throw new Error("AI غير مفعّل");
  if (!navigator.onLine) throw new Error("لا يوجد إنترنت");
  if (isRateLimited()) {
    const secs = getRemainingSeconds();
    throw new Error("انتظر " + secs + " ثانية");
  }

  const provider = getActiveProvider();
  const providerCfg = AI_CONFIG.PROVIDERS[provider];
  const apiKey = getAIKey();
  if (!apiKey) throw new Error("لا يوجد مفتاح API");

  const models = providerCfg.models;
  let lastError = null;

  for (let m = 0; m < models.length; m++) {
    const model = models[m];
    try {
      let url, headers, body;

      if (providerCfg.format === "gemini") {
        url = "https://generativelanguage.googleapis.com/v1beta/models/" + model + ":generateContent";
        headers = {
          "Content-Type": "application/json",
          "X-goog-api-key": apiKey
        };
        body = {
          contents: [{
            role: "user",
            parts: [{ text: systemPrompt + "\n\n" + userPrompt }]
          }],
          generationConfig: {
            temperature: options.temperature || AI_CONFIG.TEMPERATURE,
            maxOutputTokens: options.maxTokens || AI_CONFIG.MAX_TOKENS
          },
          safetySettings: [
            { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
            { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
            { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
            { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" }
          ]
        };
      } else {
        // OpenAI format (Groq / Mistral)
        url = providerCfg.url;
        headers = {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + apiKey
        };
        body = {
          model: model,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt }
          ],
          max_tokens: options.maxTokens || AI_CONFIG.MAX_TOKENS,
          temperature: options.temperature || AI_CONFIG.TEMPERATURE
        };
      }

      console.log("[AI] محاولة", provider, "/", model);

      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body)
      });

      if (response.ok) {
        const data = await response.json();
        let text = "";

        if (providerCfg.format === "gemini") {
          const c = data.candidates && data.candidates[0];
          if (c && c.finishReason === "SAFETY") {
            throw new Error("تم رفض السؤال لأسباب أمنية");
          }
          text = (c && c.content && c.content.parts && c.content.parts[0] && c.content.parts[0].text) || "";
        } else {
          text = (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) || "";
        }

        if (!text) { lastError = new Error("رد فارغ"); continue; }
        console.log("[AI] ✅ نجح:", model);
        return text;
      }

      // معالجة الأخطاء
      const errText = await response.text();
      console.error("[AI]", response.status, errText);

      if (response.status === 400) throw new Error("المفتاح غير صالح");
      if (response.status === 401 || response.status === 403) throw new Error("المفتاح مرفوض");
      if (response.status === 429) {
        setRateLimit();  // ✅ بدء العدّاد التنازلي
        throw new Error("تجاوزت الحد — انتظر 60 ثانية");
      }
      if (response.status === 404) {
        lastError = new Error("النموذج غير متوفر");
        continue;
      }
      if (response.status >= 500) {
        lastError = new Error("الخادم مشغول");
        await new Promise(function(r) { setTimeout(r, 1500); });
        continue;
      }
    } catch (e) {
      if (e.message.indexOf("انتظر") !== -1 || e.message.indexOf("رفض") !== -1) throw e;
      lastError = e;
    }
  }

  throw lastError || new Error("فشل الاتصال");
}

/* ============ اختبار الاتصال ============ */
async function testAIConnection() {
  const provider = getActiveProvider();
  const apiKey = getAIKey();
  if (!apiKey) return { ok: false, message: "لا يوجد مفتاح" };
  if (!navigator.onLine) return { ok: false, message: "لا يوجد إنترنت" };

  try {
    const reply = await askAI("أجب بكلمة واحدة فقط.", "قل: نجح", { maxTokens: 20 });
    return { ok: true, message: '✅ نجح الاتصال!<br><span style="font-size:12px;color:#888">' + provider + ': "' + reply.trim() + '"</span>' };
  } catch (e) {
    return { ok: false, message: "❌ " + e.message };
  }
}

/* ============ شاشة الإعدادات ============ */
function showFreeAISettings() {
  document.getElementById('listTitle').textContent = "🤖 إعدادات الذكاء الاصطناعي";
  const c = document.getElementById('listContent');
  const enabled = isAIEnabled();
  const provider = getActiveProvider();
  const key = getAIKey();
  const maskedKey = key ? key.substring(0, 8) + "..." + key.slice(-4) : "غير مُدخل";
  const remaining = getRemainingSeconds();

  let providerButtons = "";
  for (const p in AI_CONFIG.PROVIDERS) {
    const cfg = AI_CONFIG.PROVIDERS[p];
    const isActive = p === provider;
    providerButtons += '<button class="btn-outline" style="flex:1 1 30%;padding:10px;font-size:13px;' +
      (isActive ? 'background:#1A237E;color:#fff;border-color:#1A237E' : '') +
      '" onclick="selectProvider(\'' + p + '\')">' + cfg.name + '</button>';
  }

  c.innerHTML = `
    <div class="card">
      <div class="card-title">🤖 الذكاء الاصطناعي (اختياري)</div>
      <p style="font-size:13.5px;color:#555;line-height:1.9">
        التطبيق يعمل <strong>بدون إنترنت</strong> بالتحليل المحلي.
        عند تفعيل الذكاء الاصطناعي، ستحصل على تحليلات موسّعة.
      </p>
      <div style="margin-top:12px;display:flex;align-items:center;justify-content:space-between;background:#F7F8FC;padding:14px;border-radius:12px">
        <span style="font-size:15px;font-weight:bold">${enabled ? "✅ مفعّل" : "🔴 معطّل"}</span>
        <div class="switch ${enabled ? 'on' : ''}" onclick="toggleAI();showFreeAISettings()"></div>
      </div>
    </div>

    ${remaining > 0 ? `
      <div class="card" style="background:#FFF3E0;border-right:4px solid #FF9800">
        <div class="card-title" style="color:#E65100;border-color:#E65100">⏱️ تجاوزت الحد المجاني</div>
        <p style="text-align:center;font-size:18px;font-weight:bold;color:#E65100">
          انتظر <span id="countdown">${remaining}</span> ثانية
        </p>
      </div>
    ` : ""}

    <div class="card">
      <div class="card-title">🌐 اختر المزوّد</div>
      <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:12px">
        ${providerButtons}
      </div>
      <p style="font-size:12px;color:#888;line-height:1.8">
        ${AI_CONFIG.PROVIDERS[provider].name}
      </p>
    </div>

    <div class="card">
      <div class="card-title">🔑 المفتاح الحالي</div>
      <p style="font-family:monospace;font-size:12px;background:#F7F8FC;padding:12px;border-radius:8px;direction:ltr;text-align:left;word-break:break-all">
        ${maskedKey}
      </p>
    </div>

    <div class="card">
      <div class="card-title">📝 كيف أحصل على مفتاح مجاني؟</div>
      ${getProviderHelp()}
    </div>

    <div class="card">
      <div class="card-title">➕ إدخال المفتاح</div>
      <input type="password" id="aiKeyInput" placeholder="${getProviderPlaceholder()}"
        style="width:100%;padding:14px;border:2px solid #C5CAE9;border-radius:12px;font-size:13px;direction:ltr;text-align:left;background:#fff;outline:none"
        value="${key}">
      <button class="btn-primary" style="width:100%;margin-top:10px" onclick="saveAIKey()">
        💾 حفظ المفتاح
      </button>
      <button class="btn-outline" style="width:100%;margin-top:8px" onclick="testAIKey()">
        🧪 اختبار الاتصال
      </button>
      <button class="btn-outline" style="width:100%;margin-top:8px;color:#FF5252" onclick="clearAIKey()">
        🗑️ حذف المفتاح
      </button>
    </div>

    <div class="card">
      <div class="card-title">📊 حالة الاتصال</div>
      <div id="aiStatus" style="font-size:14px;line-height:2;color:#555">
        ${navigator.onLine ? "🟢 متصل بالإنترنت" : "🔴 لا يوجد إنترنت"}
        <br>
        ${enabled ? "🟢 الذكاء مُفعّل" : "⚪ الذكاء معطّل"}
        <br>
        ${key ? "🟢 المفتاح مُدخل" : "🔴 لا يوجد مفتاح"}
      </div>
    </div>

    <button class="btn-outline" style="width:100%" onclick="goHome()">← رجوع</button>
  `;

  showScreen('screen-list');

  // بدء العدّاد إذا كان نشطاً
  if (remaining > 0) startCountdown();
}

function getProviderHelp() {
  const provider = getActiveProvider();
  if (provider === 'gemini') {
    return '<ol style="padding-right:20px;font-size:13.5px;line-height:2;color:#444">' +
      '<li>افتح: <strong>aistudio.google.com/app/apikey</strong></li>' +
      '<li>سجّل بحساب Gmail</li>' +
      '<li>اضغط "Create API key"</li>' +
      '<li>انسخ المفتاح (يبدأ بـ AIza أو AQ.)</li></ol>';
  }
  if (provider === 'groq') {
    return '<ol style="padding-right:20px;font-size:13.5px;line-height:2;color:#444">' +
      '<li>افتح: <strong>console.groq.com/keys</strong></li>' +
      '<li>سجّل بحساب Google أو GitHub</li>' +
      '<li>اضغط "Create API Key"</li>' +
      '<li>انسخ المفتاح (يبدأ بـ gsk_)</li></ol>' +
      '<p style="font-size:12px;color:#2E7D32;margin-top:8px">✅ Groq سريع جداً ومجاني بسخاء</p>';
  }
  if (provider === 'mistral') {
    return '<ol style="padding-right:20px;font-size:13.5px;line-height:2;color:#444">' +
      '<li>افتح: <strong>console.mistral.ai/api-keys</strong></li>' +
      '<li>سجّل حساباً</li>' +
      '<li>اضغط "Create new key"</li>' +
      '<li>انسخ المفتاح</li></ol>';
  }
  return "";
}

function getProviderPlaceholder() {
  const provider = getActiveProvider();
  if (provider === 'gemini') return 'AIza... أو AQ...';
  if (provider === 'groq') return 'gsk_...';
  if (provider === 'mistral') return 'sk-...';
  return 'المفتاح...';
}

function selectProvider(p) {
  setActiveProvider(p);
  showFreeAISettings();
}

function toggleAI() {
  const enabled = isAIEnabled();
  setAIEnabled(!enabled);
}

function saveAIKey() {
  const key = document.getElementById('aiKeyInput').value.trim();
  if (key.length < 10) { alert("⚠️ المفتاح قصير جداً"); return; }
  setAIKey(key);
  showToast("✅ تم حفظ المفتاح");
  showFreeAISettings();
}

function clearAIKey() {
  if (confirm("حذف المفتاح؟")) {
    const provider = getActiveProvider();
    localStorage.removeItem('ai_key_' + provider);
    showToast("🗑️ تم الحذف");
    showFreeAISettings();
  }
}

async function testAIKey() {
  const status = document.getElementById('aiStatus');
  status.innerHTML = "⏳ جاري الاختبار...";
  const result = await testAIConnection();
  status.innerHTML = result.message;
}

function startCountdown() {
  const el = document.getElementById('countdown');
  if (!el) return;
  const timer = setInterval(function() {
    const remaining = getRemainingSeconds();
    if (remaining <= 0) {
      clearInterval(timer);
      showFreeAISettings();
    } else if (el) {
      el.textContent = remaining;
    }
  }, 1000);
}

/* ============ التوافق مع الكود القديم ============ */
function getGeminiKey() { return getAIKey(); }
function isGeminiReady() { return isAIReady(); }
function askGemini(sys, user, opts) { return askAI(sys, user, opts); }
function formatAIResponse(text) {
  if (!text) return "";
  return text
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/^### (.+)$/gm, "<strong>$1</strong>")
    .replace(/\n\n/g, "<br><br>")
    .replace(/\n/g, "<br>");
}