/* ============================================================
   extras2.js — تصدير PNG + اسم اليوم + طلسم + Splash + زر الخروج
   الإصدار: 3.0
   ============================================================ */

/* ============ أسماء تراثية ============ */
const TRADITIONAL_NAMES = {
  "أسعد":"الأكثر سعادة", "بدر":"القمر الكامل", "بديع":"المبتكر",
  "بشار":"المبشّر", "بكر":"البكر", "جرير":"الحبل",
  "حسان":"الحسن", "حمدان":"كثير الحمد", "حنظلة":"شجر مر",
  "ربيعة":"الربيع", "رستم":"العظيم", "زهير":"الزهر",
  "سفيان":"الرمل", "صخر":"الحجر الصلب", "ضرار":"الضرر",
  "طلحة":"شجر الطلح", "عبادة":"العبادة", "عنترة":"الشجاع",
  "قتادة":"شجر صلب", "كعب":"العقد", "كليب":"القليل",
  "لبيد":"الباقي", "مرثد":"الأسد", "معاوية":"الأنثى من الثعلب",
  "هلال":"القمر الجديد", "يعرب":"الفصاحة",
  "أسماء":"الرفعة", "بثينة":"الناعمة", "جميلة":"الجميلة",
  "خولة":"الظبية", "دعد":"الظبية السريعة", "رانيا":"النظرة الحلوة",
  "زليخة":"الملكة", "عاتكة":"الأصيلة", "لبابة":"اللب",
  "نائلة":"العطوفة"
};

Object.keys(TRADITIONAL_NAMES).forEach(function(k) {
  if (!NAMES_DB[k]) {
    NAMES_DB[k] = { meaning: TRADITIONAL_NAMES[k], gender: "ذكر", origin: "عربي" };
  }
});

/* ============================================================
   دالة الخروج من التطبيق
   ============================================================ */
function confirmExit() {
  // عرض تأكيد
  var confirmed = confirm("هل تريد الخروج من التطبيق؟");
  if (!confirmed) return;

  // محاولات متعددة للخروج (تعمل مع WebView و Capacitor و Cordova)
  try {
    // 1) Cordova / PhoneGap
    if (window.navigator && window.navigator.app && window.navigator.app.exitApp) {
      window.navigator.app.exitApp();
      return;
    }

    // 2) Android JavaScript Interface مخصص
    if (window.Android && typeof window.Android.exitApp === "function") {
      window.Android.exitApp();
      return;
    }

    // 3) Capacitor
    if (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.App) {
      window.Capacitor.Plugins.App.exitApp();
      return;
    }

    // 4) React Native WebView
    if (window.ReactNativeWebView && window.ReactNativeWebView.postMessage) {
      window.ReactNativeWebView.postMessage(JSON.stringify({ action: "exit" }));
      return;
    }

    // 5) WebView عام - استخدم window.close()
    window.close();

    // 6) إذا فشل window.close() - حاول الرجوع للخلف
    setTimeout(function() {
      if (window.history.length > 1) {
        window.history.go(-(window.history.length - 1));
      } else {
        // رسالة أخيرة
        showToast("لإغلاق التطبيق، اضغط زر الخروج في الهاتف");
      }
    }, 150);

  } catch (err) {
    console.error("خطأ في الخروج:", err);
    showToast("لإغلاق التطبيق، اضغط زر الخروج في الهاتف");
  }
}

/* ============================================================
   تصدير PNG
   ============================================================ */
async function exportResultAsPNG() {
  if (!currentName) return;
  try {
    const analysis = analyzeName(currentName);
    const info = findNameInfo(currentName);
    const wafq = generateWafq(analysis.totalAbjad);

    const W = 800, H = 1600;
    const canvas = document.createElement('canvas');
    const dpr = window.devicePixelRatio || 1;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    const bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, "#1A237E");
    bg.addColorStop(0.4, "#283593");
    bg.addColorStop(1, "#3949AB");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    ctx.strokeStyle = "rgba(255,255,255,0.3)";
    ctx.lineWidth = 2;
    ctx.strokeRect(20, 20, W - 40, H - 40);

    ctx.fillStyle = "#FFFFFF";
    ctx.font = "bold 48px 'Segoe UI', Tahoma, Arial";
    ctx.textAlign = "center";
    ctx.fillText(currentName, W / 2, 100);

    ctx.font = "20px 'Segoe UI', Tahoma, Arial";
    ctx.fillStyle = "rgba(255,255,255,0.85)";
    ctx.fillText("تطبيق خصائص الأسماء", W / 2, 135);

    ctx.strokeStyle = "rgba(255,255,255,0.5)";
    ctx.beginPath();
    ctx.moveTo(80, 160);
    ctx.lineTo(W - 80, 160);
    ctx.stroke();

    let y = 200;

    if (info) {
      ctx.textAlign = "right";
      ctx.font = "bold 22px 'Segoe UI', Tahoma";
      ctx.fillStyle = "#FFD54F";
      ctx.fillText("📖 المعنى", W - 60, y);
      y += 36;
      ctx.font = "18px 'Segoe UI', Tahoma";
      ctx.fillStyle = "#FFFFFF";
      y = wrapText(ctx, info.meaning, W - 60, y, W - 120, 30);
      y += 10;
      ctx.fillStyle = "rgba(255,255,255,0.7)";
      ctx.font = "15px 'Segoe UI', Tahoma";
      ctx.fillText(info.gender + "  •  " + info.origin, W - 60, y);
      y += 40;
    }

    ctx.font = "bold 22px 'Segoe UI', Tahoma";
    ctx.fillStyle = "#FFD54F";
    ctx.fillText("🔢 القيم الأساسية", W - 60, y);
    y += 36;
    ctx.font = "17px 'Segoe UI', Tahoma";
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText("القيمة الأبجدية: " + analysis.totalAbjad, W - 60, y); y += 28;
    ctx.fillText("القيمة الأيقغية: " + analysis.totalAyqagh, W - 60, y); y += 28;
    ctx.fillText("عدد الحروف: " + analysis.letters.length, W - 60, y); y += 28;
    ctx.fillText("العنصر الغالب: " + analysis.dominantEl, W - 60, y); y += 28;
    ctx.fillText("الكوكب الحاكم: " + analysis.dominantPlanet, W - 60, y); y += 28;
    ctx.fillText("برج الاسم: " + analysis.zodiacFromNumber, W - 60, y); y += 28;
    ctx.fillText("المزاج: " + analysis.temperament.mizaj, W - 60, y); y += 40;

    if (y < H - 400) {
      ctx.font = "bold 22px 'Segoe UI', Tahoma";
      ctx.fillStyle = "#FFD54F";
      ctx.fillText("🔯 وفق الاسم", W - 60, y);
      y += 30;

      const cellSize = Math.min(80, Math.floor((W - 200) / wafq.size));
      const gridW = cellSize * wafq.size;
      const startX = (W - gridW) / 2;
      const startY = y;

      wafq.grid.forEach(function(row, i) {
        row.forEach(function(v, j) {
          const x = startX + j * cellSize;
          const yy = startY + i * cellSize;
          ctx.fillStyle = "rgba(255,255,255,0.95)";
          roundRect(ctx, x + 2, yy + 2, cellSize - 4, cellSize - 4, 8);
          ctx.fill();
          ctx.fillStyle = "#1A237E";
          ctx.font = "bold " + Math.floor(cellSize / 3.5) + "px 'Segoe UI'";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(v, x + cellSize / 2, yy + cellSize / 2);
        });
      });

      y += gridW + 30;
      ctx.fillStyle = "rgba(255,255,255,0.85)";
      ctx.font = "15px 'Segoe UI'";
      ctx.textAlign = "center";
      ctx.textBaseline = "alphabetic";
      ctx.fillText("مفتاح: " + wafq.targetSum + "  •  الحجم: " + wafq.size + "×" + wafq.size, W / 2, y);
      y += 40;
    }

    ctx.fillStyle = "rgba(255,255,255,0.6)";
    ctx.font = "14px 'Segoe UI'";
    ctx.textAlign = "center";
    ctx.textBaseline = "alphabetic";
    ctx.fillText("تم توليدها بواسطة تطبيق خصائص الأسماء", W / 2, H - 40);

    canvas.toBlob(async function(blob) {
      const file = new File([blob], currentName + "-تحليل.png", { type: "image/png" });
      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({ files: [file], title: "تحليل الاسم: " + currentName });
          return;
        } catch (e) { }
      }
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = currentName + "-تحليل.png";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(function() { URL.revokeObjectURL(url); }, 1000);
      showToast("✅ تم حفظ الصورة");
    }, "image/png");
  } catch (err) {
    console.error(err);
    showToast("❌ حدث خطأ في التصدير");
  }
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(" ");
  let line = "";
  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + " ";
    if (ctx.measureText(testLine).width > maxWidth && n > 0) {
      ctx.fillText(line.trim(), x, y);
      line = words[n] + " ";
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line.trim(), x, y);
  return y + lineHeight;
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/* ============================================================
   الاسم اليومي
   ============================================================ */
function getDailyNameIndex() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  return Math.floor((now - start) / 86400000);
}
function getDailyName() {
  const keys = Object.keys(NAMES_DB);
  return keys[getDailyNameIndex() % keys.length];
}

function showDailyName() {
  const name = getDailyName();
  const info = NAMES_DB[name];
  const analysis = analyzeName(name);

  document.getElementById('listTitle').textContent = "🔔 اسم اليوم";
  const c = document.getElementById('listContent');

  const today = new Date().toLocaleDateString("ar-EG", {
    weekday: "long", year: "numeric", month: "long", day: "numeric"
  });

  c.innerHTML = `
    <div class="card">
      <div style="text-align:center;font-size:13px;color:#888;margin-bottom:10px">${today}</div>
      <div style="text-align:center;font-size:48px;font-weight:bold;color:#1A237E;margin:10px 0">${name}</div>
      <p class="meaning-text" style="text-align:center">${info.meaning}</p>
      <div class="meta-row" style="justify-content:center">
        <span class="meta-badge">${info.gender}</span>
        <span class="meta-badge">${info.origin}</span>
      </div>
    </div>

    <div class="card">
      <div class="card-title">🔮 خصائص اسم اليوم</div>
      <div class="summary-grid">
        <div class="sum-item"><span class="sum-lbl">القيمة الأبجدية</span><span class="sum-val">${analysis.totalAbjad}</span></div>
        <div class="sum-item"><span class="sum-lbl">العنصر</span><span class="sum-val">${analysis.dominantEl}</span></div>
        <div class="sum-item"><span class="sum-lbl">الكوكب</span><span class="sum-val">${analysis.dominantPlanet}</span></div>
        <div class="sum-item"><span class="sum-lbl">المزاج</span><span class="sum-val">${analysis.temperament.mizaj}</span></div>
      </div>
      <p class="temp-desc" style="margin-top:12px">${analysis.temperament.desc}</p>
    </div>

    <button class="btn-primary" style="width:100%" onclick="useGeneratedNameByName('${name}')">
      عرض التحليل الكامل ←
    </button>`;

  showScreen('screen-list');
}

function useGeneratedNameByName(name) {
  currentName = name;
  addToHistory(name);
  renderResult(name);
  showScreen('screen-result');
}

/* ============================================================
   الطلسم / الخاتم الروحاني
   ============================================================ */
function generateTalisman(name) {
  const analysis = analyzeName(name);
  const total = analysis.totalAbjad;

  const verses = [
    { name: "آية الكرسي", text: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ" },
    { name: "الفاتحة", text: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ" },
    { name: "الإخلاص", text: "قُلْ هُوَ اللَّهُ أَحَدٌ" },
    { name: "المعوذتين", text: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ" },
    { name: "آية النور", text: "اللَّهُ نُورُ السَّمَاوَاتِ وَالْأَرْضِ" },
    { name: "يس", text: "يس وَالْقُرْآنِ الْحَكِيمِ" },
    { name: "الرحمن", text: "الرَّحْمَٰنُ عَلَّمَ الْقُرْآنَ" },
    { name: "الواقعة", text: "إِذَا وَقَعَتِ الْوَاقِعَةُ" }
  ];
  const verse = verses[total % verses.length];
  const talismLetters = analysis.letters.slice(0, 5);
  const sacredNumbers = [
    Math.floor(total / 4),
    Math.floor(total / 2),
    total,
    total + Math.floor(total / 4),
    total * 2
  ];
  return { verse: verse, talismLetters: talismLetters, sacredNumbers: sacredNumbers, total: total };
}

function renderTalismanHTML(name) {
  const t = generateTalisman(name);
  const verse = t.verse;
  const talismLetters = t.talismLetters;
  const sacredNumbers = t.sacredNumbers;

  return `
    <div class="card">
      <div class="card-title">🧿 الخاتم الروحاني</div>
      <div class="talisman">
        <div class="talisman-circle">
          <div class="talisman-center">${talismLetters.join("")}</div>
          <div class="talisman-ring">
            ${["أ","ب","ج","د","هـ","و","ز","ح"].map(function(c) {
              return '<span class="talisman-dot">' + c + '</span>';
            }).join("")}
          </div>
        </div>
      </div>
      <div class="talisman-info">
        <div class="talisman-row"><span>الآية الموصى بها:</span><strong>${verse.name}</strong></div>
        <div class="talisman-verse">"${verse.text}"</div>
        <div class="talisman-row"><span>أحرف الخاتم:</span><strong>${talismLetters.join(" • ")}</strong></div>
        <div class="talisman-row"><span>الأعداد المقدسة:</span><strong>${sacredNumbers.join(" • ")}</strong></div>
        <div class="talisman-note">
          يُنصح بقراءة <strong>${verse.name}</strong> ${(t.total % 7) + 3} مرات يومياً
          بعد صلاة الفجر بنيّة التوفيق والبركة.
        </div>
      </div>
    </div>`;
}

/* ============================================================
   دمج الطلسم + التصدير في renderResult
   ============================================================ */
const _origRenderResult2 = renderResult;
renderResult = function(name) {
  _origRenderResult2(name);

  const content = document.getElementById('resultContent');
  let html = content.innerHTML;

  const talismanHTML = renderTalismanHTML(name);

  const exportHTML = `
    <div class="card export-actions">
      <div class="card-title">📤 تصدير ومشاركة</div>
      <button class="btn-primary" onclick="exportResultAsPNG()">🖼️ حفظ التحليل كصورة</button>
      <button class="btn-outline" style="width:100%;margin-top:10px" onclick="shareResult()">📲 مشاركة نص التحليل</button>
    </div>`;

  const marker = '<div class="card"><div class="card-title">🔠 تفصيل خصائص كل حرف</div>';
  const idx = html.indexOf(marker);
  if (idx !== -1) {
    html = html.slice(0, idx) + talismanHTML + exportHTML + html.slice(idx);
  } else {
    html += talismanHTML + exportHTML;
  }

  content.innerHTML = html;
};

/* ============================================================
   إدارة شاشة الافتتاحية (Splash Screen)
   ============================================================ */
(function initSplash() {
  const splash = document.getElementById('splash-screen');
  if (!splash) return;

  // إضافة نجوم متناثرة
  for (let i = 0; i < 30; i++) {
    const star = document.createElement('span');
    star.className = 'star';
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.animationDelay = (Math.random() * 3) + 's';
    star.style.animationDuration = (2 + Math.random() * 2) + 's';
    splash.appendChild(star);
  }

  function hideSplash() {
    if (!document.body.contains(splash)) return;
    splash.classList.add('hidden');
    setTimeout(function() {
      if (document.body.contains(splash)) splash.remove();
    }, 800);
  }

  if (document.readyState === 'complete') {
    setTimeout(hideSplash, 2500);
  } else {
    window.addEventListener('load', function() {
      setTimeout(hideSplash, 2500);
    });
  }

  // حماية: إخفاء بعد 4 ثوانٍ كحد أقصى
  setTimeout(hideSplash, 4000);
})();