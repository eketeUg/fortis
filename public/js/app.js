/**
 * FORTIS - Telegram Mini App Main Engine
 * Strength Through Discipline
 */

(function () {
  'use strict';

  // 1. Telegram WebApp Initialization
  const tg = window.Telegram ? window.Telegram.WebApp : null;

  if (tg) {
    try {
      tg.ready();
      tg.expand();
      if (tg.enableClosingConfirmation) {
        tg.enableClosingConfirmation();
      }
      // Apply dark theme by default matching FORTIS crest
      document.body.classList.add('dark');
      if (tg.setHeaderColor) {
        tg.setHeaderColor('#08090b');
      }
      if (tg.setBackgroundColor) {
        tg.setBackgroundColor('#08090b');
      }
    } catch (e) {
      console.warn('Telegram WebApp setup error:', e);
    }
  }

  // Telegram User Data Extraction
  const urlParams = new URLSearchParams(window.location.search);
  const tgUser = tg?.initDataUnsafe?.user;
  const currentUserId = tgUser?.id ? String(tgUser.id) : urlParams.get('user_id') || 'warrior_guest';
  const currentUserName = tgUser?.first_name || 'Warrior';
  const currentUserHandle = tgUser?.username ? `@${tgUser.username}` : 'Fortis Member';

  // Haptics helper
  function triggerHaptic(type = 'light') {
    if (tg?.HapticFeedback) {
      try {
        if (type === 'selection') {
          tg.HapticFeedback.selectionChanged();
        } else if (type === 'success') {
          tg.HapticFeedback.notificationOccurred('success');
        } else if (type === 'warning') {
          tg.HapticFeedback.notificationOccurred('warning');
        } else {
          tg.HapticFeedback.impactOccurred(type);
        }
      } catch (e) {}
    }
  }

  // 2. State & Keys
  const DAYS = window.FORTIS_DATA.DAYS;
  const FULL_DAYS = window.FORTIS_DATA.FULL_DAYS;

  let curDay = (new Date().getDay() + 6) % 7;
  let curSession = urlParams.get('session') === 'pm' ? 'pm' : 'am';
  let activeTab = urlParams.get('tab') || 'workouts';

  // Weight State
  let weightHistory = [];
  const defaultBaseWeight = 78.0;

  // Modal & Timer State
  let activeModalExerciseId = null;
  let timerInterval = null;
  let timerRemainingSeconds = 60;
  let timerTotalSeconds = 60;
  let isTimerRunning = false;

  function getWeekKey() {
    const d = new Date();
    const day = (d.getDay() + 6) % 7;
    d.setDate(d.getDate() - day);
    return d.toISOString().slice(0, 10);
  }

  function getTodayString() {
    return new Date().toISOString().slice(0, 10);
  }

  function getStorageKey(day, session, index) {
    return `${getWeekKey()}|${day}|${session}|${index}`;
  }

  function getSessionItems(day, session) {
    const out = [];
    if (session === 'am') {
      const skip = window.FORTIS_DATA.SKIPPING[day];
      out.push({
        id: 'skipping',
        title: `Skipping — ${skip[0]}`,
        meta: skip[1],
        cue: 'High cadence, turn rope from wrists, light on feet.'
      });
      window.FORTIS_DATA.ABS[day].forEach(a => {
        const ex = window.FORTIS_DATA.EXERCISES[a.id] || {};
        out.push({ id: a.id, title: a.name, meta: a.reps, cue: ex.cue || '' });
      });
      window.FORTIS_DATA.PELVIC.forEach(p => {
        out.push({ id: p.id, title: p.name, meta: p.reps, cue: p.cue });
      });
      window.FORTIS_DATA.MOBILITY.forEach(m => {
        const ex = window.FORTIS_DATA.EXERCISES[m.id] || {};
        out.push({ id: m.id, title: m.name, meta: m.reps, cue: ex.cue || '' });
      });
    } else {
      const eve = window.FORTIS_DATA.EVENING[day];
      if (eve.groups && eve.groups.length > 0) {
        eve.groups.forEach(group => {
          group.items.forEach(item => {
            const ex = window.FORTIS_DATA.EXERCISES[item.id] || {};
            out.push({
              id: item.id,
              title: item.name,
              meta: item.reps,
              cue: ex.cue || '',
              groupTag: group.tag
            });
          });
        });
        window.FORTIS_DATA.MOBILITY.forEach(m => {
          const ex = window.FORTIS_DATA.EXERCISES[m.id] || {};
          out.push({
            id: m.id,
            title: `${m.name} (Cooldown)`,
            meta: m.reps,
            cue: ex.cue || '',
            groupTag: 'Mobility'
          });
        });
      }
    }
    return out;
  }

  function getTotalWeeklyItems() {
    let total = 0;
    DAYS.forEach(d => {
      total += getSessionItems(d, 'am').length;
      total += getSessionItems(d, 'pm').length;
    });
    return total;
  }

  function getCompletedCount() {
    let count = 0;
    DAYS.forEach(d => {
      ['am', 'pm'].forEach(s => {
        const items = getSessionItems(d, s);
        items.forEach((_, i) => {
          if (localStorage.getItem(getStorageKey(d, s, i))) count++;
        });
      });
    });
    return count;
  }

  function getDayCompletedRatio(day) {
    let total = 0;
    let done = 0;
    ['am', 'pm'].forEach(s => {
      const items = getSessionItems(day, s);
      total += items.length;
      items.forEach((_, i) => {
        if (localStorage.getItem(getStorageKey(day, s, i))) done++;
      });
    });
    return { done, total, isComplete: total > 0 && done === total };
  }

  function getSessionDoneCount(day, session) {
    let done = 0;
    const items = getSessionItems(day, session);
    items.forEach((_, i) => {
      if (localStorage.getItem(getStorageKey(day, session, i))) done++;
    });
    return { done, total: items.length };
  }

  function showToast(text) {
    let toast = document.getElementById('toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast';
      toast.className = 'toast-msg';
      document.body.appendChild(toast);
    }
    toast.textContent = text;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2400);
  }

  // Server Sync
  async function syncToServer() {
    try {
      const wk = getWeekKey();
      const completedMap = {};
      DAYS.forEach(d => {
        ['am', 'pm'].forEach(s => {
          const items = getSessionItems(d, s);
          items.forEach((_, i) => {
            const k = getStorageKey(d, s, i);
            if (localStorage.getItem(k)) {
              completedMap[k] = true;
            }
          });
        });
      });

      await fetch('/api/progress/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          telegramId: currentUserId,
          chatId: tgUser?.id,
          username: currentUserHandle,
          firstName: currentUserName,
          weekKey: wk,
          completedItems: completedMap
        })
      });
    } catch (e) {}
  }

  // Toggle item completion
  window.toggleItem = function (k) {
    triggerHaptic('medium');
    if (localStorage.getItem(k)) {
      localStorage.removeItem(k);
    } else {
      localStorage.setItem(k, '1');
      triggerHaptic('success');
    }
    renderWorkoutsView();
    renderConsistencyView();
    syncToServer();
  };

  // Switch Day
  window.selectDay = function (index) {
    triggerHaptic('selection');
    curDay = index;
    renderWorkoutsView();
  };

  // Switch Session
  window.selectSession = function (session) {
    triggerHaptic('selection');
    curSession = session;
    renderWorkoutsView();
  };

  // Tab Switcher (Workouts | Weight | Consistency)
  window.switchTab = function (tabName) {
    triggerHaptic('selection');
    activeTab = tabName;

    document.querySelectorAll('.view-nav-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tabName);
    });

    document.querySelectorAll('.tab-content').forEach(content => {
      content.classList.toggle('active', content.id === `tab-${tabName}`);
    });

    // Toggle bottom dock visibility
    const dock = document.querySelector('.bottom-dock');
    if (dock) {
      dock.style.display = tabName === 'workouts' ? 'flex' : 'none';
    }

    if (tabName === 'workouts') {
      renderWorkoutsView();
    } else if (tabName === 'weight') {
      renderWeightView();
    } else if (tabName === 'consistency') {
      renderConsistencyView();
    }
  };

  // ----------------------------------------------------
  // 3. WORKOUTS VIEW
  // ----------------------------------------------------
  function renderWorkoutsView() {
    const day = DAYS[curDay];
    const totalWeekly = getTotalWeeklyItems();
    const completedWeekly = getCompletedCount();
    const percent = Math.min(100, Math.round((completedWeekly / totalWeekly) * 100));

    // Update Progress Bar
    const bar = document.getElementById('progressBar');
    if (bar) bar.style.width = `${percent}%`;

    const progText = document.getElementById('progressText');
    if (progText) progText.textContent = `${percent}% DISCIPLINE (${completedWeekly}/${totalWeekly})`;

    const title = document.getElementById('sessionTitle');
    if (title) {
      title.textContent = `${FULL_DAYS[day].toUpperCase()} — ${curSession === 'am' ? 'MORNING CARDIO & CORE' : 'EVENING STRENGTH'}`;
    }

    // Days nav buttons
    const daysNav = document.getElementById('daysNav');
    if (daysNav) {
      daysNav.innerHTML = DAYS.map((d, i) => {
        const { isComplete, done } = getDayCompletedRatio(d);
        const isActive = i === curDay;
        const classes = [
          'day-btn',
          isActive ? 'active' : '',
          isComplete ? 'completed' : done > 0 ? 'has-progress' : ''
        ].filter(Boolean).join(' ');

        return `
          <button class="${classes}" onclick="selectDay(${i})">
            <span class="day-name">${d}</span>
            <span class="day-indicator"></span>
          </button>
        `;
      }).join('');
    }

    // Segmented Session Buttons
    const bAm = document.getElementById('btnMorning');
    const bPm = document.getElementById('btnEvening');
    const amRatio = getSessionDoneCount(day, 'am');
    const pmRatio = getSessionDoneCount(day, 'pm');

    if (bAm) {
      bAm.className = `seg-button ${curSession === 'am' ? 'active' : ''}`;
      bAm.innerHTML = `🌅 Morning <span class="seg-count">${amRatio.done}/${amRatio.total}</span>`;
    }
    if (bPm) {
      bPm.className = `seg-button ${curSession === 'pm' ? 'active' : ''}`;
      bPm.innerHTML = `🌙 Evening <span class="seg-count">${pmRatio.done}/${pmRatio.total}</span>`;
    }

    // Session Banner
    const banner = document.getElementById('sessionBanner');
    if (banner) {
      if (curSession === 'am') {
        const skip = window.FORTIS_DATA.SKIPPING[day];
        banner.innerHTML = `
          <div class="banner-header">
            <span class="banner-title">🌅 Cardio & Core Priming</span>
            <span class="banner-pill">${skip[0]}</span>
          </div>
          <div class="banner-sub">Skipping cardio intervals, anti-rotation core circuit, pelvic diaphragm work, and hip mobility flow.</div>
        `;
      } else {
        const eve = window.FORTIS_DATA.EVENING[day];
        banner.innerHTML = `
          <div class="banner-header">
            <span class="banner-title">${eve.label}</span>
            <span class="banner-pill">Heavy Resistance</span>
          </div>
          <div class="banner-sub">${eve.note || 'Full-body dumbbell supersets with controlled tempos. Tap any exercise for muscle breakdowns and built-in timers.'}</div>
        `;
      }
    }

    // List elements
    const listEl = document.getElementById('workoutList');
    if (!listEl) return;
    listEl.innerHTML = '';

    const sec = text => `<div class="section-header">${text}</div>`;

    if (curSession === 'am') {
      const skip = window.FORTIS_DATA.SKIPPING[day];
      listEl.innerHTML += sec('Skipping Cardio');
      listEl.innerHTML += renderCard('skipping', `Skipping — ${skip[0]}`, skip[1], 'High cadence, light on balls of feet', 0, 'am');

      listEl.innerHTML += sec('Abs Circuit');
      window.FORTIS_DATA.ABS[day].forEach((a, j) => {
        const ex = window.FORTIS_DATA.EXERCISES[a.id] || {};
        listEl.innerHTML += renderCard(a.id, a.name, a.reps, ex.cue || '', 1 + j, 'am');
      });

      listEl.innerHTML += sec('Pelvic Floor & Breathing');
      window.FORTIS_DATA.PELVIC.forEach((p, j) => {
        listEl.innerHTML += renderCard(p.id, p.name, p.reps, p.cue, 3 + j, 'am');
      });

      listEl.innerHTML += sec('Hip Mobility Flow');
      window.FORTIS_DATA.MOBILITY.forEach((m, j) => {
        const ex = window.FORTIS_DATA.EXERCISES[m.id] || {};
        listEl.innerHTML += renderCard(m.id, m.name, m.reps, ex.cue || '', 7 + j, 'am');
      });
    } else {
      const eve = window.FORTIS_DATA.EVENING[day];
      if (eve.note) {
        listEl.innerHTML += `<div class="workout-note">🧘 ${eve.note}</div>`;
        listEl.innerHTML += sec('Hip Mobility Cooldown');
        window.FORTIS_DATA.MOBILITY.forEach((m, j) => {
          const ex = window.FORTIS_DATA.EXERCISES[m.id] || {};
          listEl.innerHTML += renderCard(m.id, m.name, m.reps, ex.cue || '', j, 'pm');
        });
        return;
      }

      listEl.innerHTML += sec(eve.label);
      let idx = 0;
      eve.groups.forEach(group => {
        listEl.innerHTML += `<div class="superset-tag">⚡ ${group.tag} — ${group.rest}</div>`;
        group.items.forEach(item => {
          const ex = window.FORTIS_DATA.EXERCISES[item.id] || {};
          listEl.innerHTML += renderCard(item.id, item.name, item.reps, ex.cue || '', idx++, 'pm');
        });
      });

      if (eve.finisher) {
        listEl.innerHTML += `<div class="workout-note">🔥 <strong>${eve.finisher}</strong></div>`;
      }

      listEl.innerHTML += sec('Hip Mobility Cooldown');
      window.FORTIS_DATA.MOBILITY.forEach(m => {
        const ex = window.FORTIS_DATA.EXERCISES[m.id] || {};
        listEl.innerHTML += renderCard(m.id, m.name, m.reps, ex.cue || '', idx++, 'pm');
      });
    }
  }

  function renderCard(exerciseId, name, meta, cue, index, session) {
    const day = DAYS[curDay];
    const k = getStorageKey(day, session, index);
    const isDone = Boolean(localStorage.getItem(k));
    const ex = window.FORTIS_DATA.EXERCISES[exerciseId] || {};
    const thumbSvg = window.EXERCISE_ILLUSTRATIONS[ex.illustrationType || exerciseId] || window.EXERCISE_ILLUSTRATIONS['goblet_squat'];

    const muscleTags = ex.targetMuscles ? ex.targetMuscles.map(m => `<span class="tag-badge">${m}</span>`).join('') : '';

    return `
      <div class="card ${isDone ? 'done' : ''}">
        <button class="check-btn" onclick="toggleItem('${k}')" aria-label="Toggle completed">
          <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </button>
        <div class="card-content" onclick="openExerciseModal('${exerciseId}')" style="cursor: pointer;">
          <div class="card-top">
            <span class="exercise-name">${name}</span>
            <span class="exercise-meta">${meta}</span>
          </div>
          ${cue ? `<div class="exercise-cue">${cue}</div>` : ''}
          <div class="card-bottom-tags">
            ${ex.equipment ? `<span class="tag-badge" style="color:var(--gold-primary);">${ex.equipment}</span>` : ''}
            ${muscleTags}
          </div>
        </div>
        <button class="card-thumb-btn" onclick="openExerciseModal('${exerciseId}')" title="View form guide and illustration">
          ${thumbSvg}
          <span class="thumb-zoom-icon">🔍</span>
        </button>
      </div>
    `;
  }

  // ----------------------------------------------------
  // 4. WEIGHT TRACKER VIEW
  // ----------------------------------------------------
  async function loadWeightData() {
    try {
      const res = await fetch(`/api/progress/${currentUserId}/weight`);
      if (res.ok) {
        weightHistory = await res.json();
        if (weightHistory && weightHistory.length > 0) {
          localStorage.setItem(`fortis_weight_${currentUserId}`, JSON.stringify(weightHistory));
        } else {
          localStorage.removeItem(`fortis_weight_${currentUserId}`);
        }
        return;
      }
    } catch (e) {
      // Fallback to local storage only if offline/network fails
      const local = localStorage.getItem(`fortis_weight_${currentUserId}`);
      if (local) {
        weightHistory = JSON.parse(local);
      }
    }
  }

  function renderWeightView() {
    const heroVal = document.getElementById('weightHeroVal');
    const heroSub = document.getElementById('weightHeroSub');
    const inputEl = document.getElementById('weightInputVal');
    const listEl = document.getElementById('weightHistoryList');

    let currentVal = defaultBaseWeight;
    if (weightHistory.length > 0) {
      const latest = weightHistory[weightHistory.length - 1];
      currentVal = latest.weight;
      const start = weightHistory[0].weight;
      const diff = Math.round((currentVal - start) * 10) / 10;
      const diffStr = diff > 0 ? `+${diff}` : `${diff}`;

      if (heroVal) heroVal.innerHTML = `${currentVal.toFixed(1)} <span>KG</span>`;
      if (heroSub) heroSub.textContent = `Started at ${start.toFixed(1)} kg • Net change: ${diffStr} kg`;
    } else {
      if (heroVal) heroVal.innerHTML = `--.- <span>KG</span>`;
      if (heroSub) heroSub.textContent = 'Log your bodyweight daily in kg to track your progress';
    }

    if (inputEl && (!inputEl.value || inputEl.value === '')) {
      inputEl.value = currentVal.toFixed(1);
    }

    // Render SVG Line Chart
    drawWeightChart();

    // Render History List
    if (listEl) {
      if (weightHistory.length === 0) {
        listEl.innerHTML = `<li style="text-align:center; color:var(--text-muted); font-size:12px; padding:12px;">No weigh-ins logged yet. Input your weight above.</li>`;
      } else {
        const recent = [...weightHistory].reverse().slice(0, 10);
        listEl.innerHTML = recent.map(w => `
          <li class="weight-history-item">
            <span class="weight-date">📅 ${w.date}</span>
            <div style="display:flex; align-items:center; gap:10px;">
              <span class="weight-val">${w.weight.toFixed(1)} kg</span>
              <button class="weight-del-btn" onclick="deleteWeight('${w.date}')" title="Delete">✕</button>
            </div>
          </li>
        `).join('');
      }
    }
  }

  window.adjustWeightInput = function (delta) {
    triggerHaptic('light');
    const inputEl = document.getElementById('weightInputVal');
    if (!inputEl) return;
    let val = parseFloat(inputEl.value) || defaultBaseWeight;
    val = Math.round((val + delta) * 10) / 10;
    inputEl.value = val.toFixed(1);
  };

  window.submitWeight = async function () {
    triggerHaptic('medium');
    const inputEl = document.getElementById('weightInputVal');
    const val = parseFloat(inputEl.value);
    if (!val || val <= 30 || val >= 300) {
      alert('Please enter a valid weight in kg (30 - 300 kg).');
      return;
    }

    const today = getTodayString();
    const entry = { date: today, weight: val, timestamp: new Date().toISOString() };

    // Update locally
    const idx = weightHistory.findIndex(w => w.date === today);
    if (idx >= 0) {
      weightHistory[idx] = entry;
    } else {
      weightHistory.push(entry);
    }
    weightHistory.sort((a, b) => a.date.localeCompare(b.date));
    localStorage.setItem(`fortis_weight_${currentUserId}`, JSON.stringify(weightHistory));

    triggerHaptic('success');
    showToast(`⚖️ ${val.toFixed(1)} kg logged for today!`);
    renderWeightView();

    // Sync to NestJS backend
    try {
      await fetch('/api/progress/weight', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          telegramId: currentUserId,
          date: today,
          weight: val
        })
      });
    } catch (e) {}
  };

  window.deleteWeight = async function (date) {
    triggerHaptic('warning');
    if (!confirm(`Remove weight log for ${date}?`)) return;

    weightHistory = weightHistory.filter(w => w.date !== date);
    localStorage.setItem(`fortis_weight_${currentUserId}`, JSON.stringify(weightHistory));
    renderWeightView();

    try {
      await fetch(`/api/progress/${currentUserId}/weight/${date}`, { method: 'DELETE' });
    } catch (e) {}
  };

  function drawWeightChart() {
    const container = document.getElementById('weightChartContainer');
    if (!container) return;

    if (weightHistory.length < 2) {
      container.innerHTML = `
        <div style="height:120px; display:flex; align-items:center; justify-content:center; color:var(--text-muted); font-size:12px;">
          Log at least 2 weigh-ins to render your trend chart.
        </div>
      `;
      return;
    }

    const data = weightHistory.slice(-14); // last 14 days
    const weights = data.map(d => d.weight);
    const minW = Math.min(...weights) - 0.5;
    const maxW = Math.max(...weights) + 0.5;
    const range = maxW - minW || 1;

    const W = 320;
    const H = 130;
    const pad = 24;

    const points = data.map((d, i) => {
      const x = pad + (i / (data.length - 1)) * (W - pad * 2);
      const y = H - pad - ((d.weight - minW) / range) * (H - pad * 2);
      return { x, y, val: d.weight, date: d.date.slice(5) };
    });

    const pathD = points.reduce((acc, p, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`, '');

    // Area fill gradient path
    const areaD = `${pathD} L ${points[points.length - 1].x.toFixed(1)} ${H - pad} L ${points[0].x.toFixed(1)} ${H - pad} Z`;

    let dotsHtml = '';
    points.forEach(p => {
      dotsHtml += `
        <circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="4" fill="#cba153" stroke="#08090b" stroke-width="2" />
        <text x="${p.x.toFixed(1)}" y="${(p.y - 8).toFixed(1)}" font-size="8" fill="#f5f5f3" font-weight="700" text-anchor="middle">${p.val.toFixed(1)}</text>
        <text x="${p.x.toFixed(1)}" y="${H - 6}" font-size="7" fill="#8e8e93" text-anchor="middle">${p.date}</text>
      `;
    });

    container.innerHTML = `
      <svg viewBox="0 0 ${W} ${H}" class="weight-chart-svg">
        <defs>
          <linearGradient id="goldAreaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#cba153" stop-opacity="0.35" />
            <stop offset="100%" stop-color="#cba153" stop-opacity="0.0" />
          </linearGradient>
        </defs>
        <!-- Horizontal Guide Gridlines -->
        <line x1="${pad}" y1="${pad}" x2="${W - pad}" y2="${pad}" stroke="rgba(255,255,255,0.06)" stroke-dasharray="2 2" />
        <line x1="${pad}" y1="${H / 2}" x2="${W - pad}" y2="${H / 2}" stroke="rgba(255,255,255,0.06)" stroke-dasharray="2 2" />
        <line x1="${pad}" y1="${H - pad}" x2="${W - pad}" y2="${H - pad}" stroke="rgba(255,255,255,0.12)" />

        <!-- Gradient Area Fill -->
        <path d="${areaD}" fill="url(#goldAreaGrad)" />
        <!-- Trend Line -->
        <path d="${pathD}" fill="none" stroke="#cba153" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
        <!-- Points & Labels -->
        ${dotsHtml}
      </svg>
    `;
  }

  // ----------------------------------------------------
  // 5. CONSISTENCY & ANALYTICS VIEW
  // ----------------------------------------------------
  function renderConsistencyView() {
    const totalWeekly = getTotalWeeklyItems();
    const completedWeekly = getCompletedCount();
    const percent = Math.min(100, Math.round((completedWeekly / totalWeekly) * 100));

    const gridEl = document.getElementById('consistencyGrid');
    if (gridEl) {
      gridEl.innerHTML = DAYS.map(d => {
        const amDone = localStorage.getItem(getStorageKey(d, 'am', 0)) ? true : false;
        const pmDone = localStorage.getItem(getStorageKey(d, 'pm', 0)) ? true : false;
        const dotClass = amDone && pmDone ? 'both' : amDone ? 'am' : pmDone ? 'pm' : '';

        return `
          <div class="consistency-cell">
            <span class="cell-day">${d}</span>
            <div class="cell-dot ${dotClass}"></div>
            <span style="font-size:9px; color:var(--text-muted);">${amDone ? '🌅' : '—'} ${pmDone ? '🌙' : '—'}</span>
          </div>
        `;
      }).join('');
    }

    const rateEl = document.getElementById('consistencyRateVal');
    if (rateEl) rateEl.textContent = `${percent}%`;

    const countEl = document.getElementById('consistencyDrillsCount');
    if (countEl) countEl.textContent = `${completedWeekly} / ${totalWeekly} Drills Finished`;
  }

  // ----------------------------------------------------
  // 6. EXERCISE DETAIL MODAL & TIMER
  // ----------------------------------------------------
  window.openExerciseModal = function (exerciseId) {
    triggerHaptic('light');
    activeModalExerciseId = exerciseId;
    const ex = window.FORTIS_DATA.EXERCISES[exerciseId];
    if (!ex) return;

    const modal = document.getElementById('exerciseModal');
    const stage = document.getElementById('modalIllustrationStage');
    const title = document.getElementById('modalTitle');
    const subtitle = document.getElementById('modalSubtitle');
    const chips = document.getElementById('modalMuscleChips');
    const stepsList = document.getElementById('modalStepsList');
    const mistakesBox = document.getElementById('modalMistakes');

    if (title) title.textContent = ex.name;
    if (subtitle) subtitle.textContent = ex.cue || 'Targeted functional movement';

    if (stage) {
      const svg = window.EXERCISE_ILLUSTRATIONS[ex.illustrationType || exerciseId] || '';
      stage.innerHTML = svg;
      stage.classList.remove('anim-paused');
      stage.classList.remove('anim-slow');
      stage.style.setProperty('--anim-rate', '1');
      const icon = document.getElementById('animPlayIcon');
      const text = document.getElementById('animPlayText');
      if (icon) icon.textContent = '⏸️';
      if (text) text.textContent = 'Pause';
      const slowBtn = document.getElementById('animSpeedSlow');
      const normBtn = document.getElementById('animSpeedNormal');
      if (slowBtn) slowBtn.classList.remove('active');
      if (normBtn) normBtn.classList.add('active');

      // Check if a real animated GIF exists in public/assets/exercises/
      const gifSrc = ex.gifUrl || `/assets/exercises/${exerciseId}.gif`;
      const testImg = new Image();
      testImg.onload = function () {
        stage.innerHTML = `<img src="${gifSrc}" class="exercise-live-gif" alt="${ex.name}" />`;
      };
      testImg.src = gifSrc;
    }

    if (chips) {
      let chipsHtml = '';
      if (ex.equipment) {
        chipsHtml += `<span class="chip equipment">🛠️ ${ex.equipment}</span>`;
      }
      if (ex.targetMuscles) {
        ex.targetMuscles.forEach(m => {
          chipsHtml += `<span class="chip">🎯 ${m}</span>`;
        });
      }
      chips.innerHTML = chipsHtml;
    }

    if (stepsList) {
      if (ex.instructions && ex.instructions.length > 0) {
        stepsList.innerHTML = ex.instructions.map((step, idx) => `
          <li class="step-item">
            <span class="step-num">${idx + 1}</span>
            <span>${step}</span>
          </li>
        `).join('');
      } else {
        stepsList.innerHTML = `<li class="step-item"><span class="step-num">1</span><span>${ex.cue}</span></li>`;
      }
    }

    if (mistakesBox) {
      if (ex.mistakes && ex.mistakes.length > 0) {
        mistakesBox.style.display = 'block';
        mistakesBox.innerHTML = `⚠️ <strong>Avoid Common Mistakes:</strong><br>${ex.mistakes.map(m => `• ${m}`).join('<br>')}`;
      } else {
        mistakesBox.style.display = 'none';
      }
    }

    resetTimer(60);
    if (exerciseId.includes('breathing') || exerciseId.includes('hold')) {
      resetTimer(60);
    } else if (exerciseId.includes('plank')) {
      resetTimer(30);
    }

    if (modal) modal.classList.add('open');
  };

  window.closeExerciseModal = function () {
    triggerHaptic('light');
    const modal = document.getElementById('exerciseModal');
    if (modal) modal.classList.remove('open');
    pauseTimer();
  };

  window.toggleAnimPlay = function () {
    triggerHaptic('light');
    const stage = document.getElementById('modalIllustrationStage');
    const icon = document.getElementById('animPlayIcon');
    const text = document.getElementById('animPlayText');
    if (!stage) return;
    const isPaused = stage.classList.toggle('anim-paused');
    if (icon) icon.textContent = isPaused ? '▶️' : '⏸️';
    if (text) text.textContent = isPaused ? 'Play' : 'Pause';
  };

  window.setAnimRate = function (rate, btnEl) {
    triggerHaptic('light');
    const stage = document.getElementById('modalIllustrationStage');
    if (stage) {
      stage.style.setProperty('--anim-rate', String(rate));
      if (rate > 1) {
        stage.classList.add('anim-slow');
      } else {
        stage.classList.remove('anim-slow');
      }
    }
    document.querySelectorAll('.anim-speed-btn').forEach(b => b.classList.remove('active'));
    if (btnEl) btnEl.classList.add('active');
  };

  document.addEventListener('click', e => {
    const overlay = document.getElementById('exerciseModal');
    if (e.target === overlay) {
      closeExerciseModal();
    }
  });

  // Timer functions
  function updateTimerDisplay() {
    const digits = document.getElementById('timerDigits');
    if (!digits) return;
    const mins = Math.floor(timerRemainingSeconds / 60);
    const secs = timerRemainingSeconds % 60;
    digits.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  window.startTimer = function () {
    triggerHaptic('medium');
    if (isTimerRunning) return;
    isTimerRunning = true;

    const startBtn = document.getElementById('timerStartBtn');
    if (startBtn) {
      startBtn.textContent = 'Pause';
      startBtn.className = 'timer-btn pause';
      startBtn.onclick = pauseTimer;
    }

    timerInterval = setInterval(() => {
      if (timerRemainingSeconds > 0) {
        timerRemainingSeconds--;
        updateTimerDisplay();
      } else {
        clearInterval(timerInterval);
        isTimerRunning = false;
        triggerHaptic('success');
        showToast('⏰ Time is up! Step into the next set.');
        resetTimer(timerTotalSeconds);
      }
    }, 1000);
  };

  window.pauseTimer = function () {
    triggerHaptic('light');
    if (!isTimerRunning) return;
    clearInterval(timerInterval);
    isTimerRunning = false;

    const startBtn = document.getElementById('timerStartBtn');
    if (startBtn) {
      startBtn.textContent = 'Resume';
      startBtn.className = 'timer-btn start';
      startBtn.onclick = startTimer;
    }
  };

  window.resetTimer = function (seconds = 60) {
    if (isTimerRunning) {
      clearInterval(timerInterval);
      isTimerRunning = false;
    }
    timerTotalSeconds = seconds;
    timerRemainingSeconds = seconds;
    updateTimerDisplay();

    const startBtn = document.getElementById('timerStartBtn');
    if (startBtn) {
      startBtn.textContent = 'Start';
      startBtn.className = 'timer-btn start';
      startBtn.onclick = startTimer;
    }
  };

  window.quickRestTimer = function (secs) {
    triggerHaptic('medium');
    openExerciseModal('goblet_squat');
    resetTimer(secs);
    startTimer();
    showToast(`⏱️ ${secs}s Rest Timer Started`);
  };

  window.markSessionCompleted = function () {
    triggerHaptic('success');
    const day = DAYS[curDay];
    const items = getSessionItems(day, curSession);
    items.forEach((_, i) => {
      localStorage.setItem(getStorageKey(day, curSession, i), '1');
    });
    renderWorkoutsView();
    renderConsistencyView();
    syncToServer();
    showToast(`⚔️ ${curSession === 'am' ? 'Morning' : 'Evening'} Protocol Finished!`);
  };

  window.resetCurrentWeek = function () {
    triggerHaptic('warning');
    if (confirm('Clear all checkmarks for this week?')) {
      const wk = getWeekKey();
      Object.keys(localStorage)
        .filter(k => k.startsWith(wk))
        .forEach(k => localStorage.removeItem(k));
      renderWorkoutsView();
      renderConsistencyView();
      syncToServer();
      showToast('Weekly progress reset');
    }
  };

  // Notification Preference Toggle
  window.toggleNotificationSetting = async function (enabled) {
    triggerHaptic('medium');
    localStorage.setItem(`fortis_notif_${currentUserId}`, enabled ? '1' : '0');

    if (enabled) {
      showToast('🔔 Reminders Enabled (5 AM & 7 PM WAT)');
    } else {
      showToast('🔕 Reminders Muted');
    }

    try {
      await fetch('/api/progress/notifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          telegramId: currentUserId,
          enabled: enabled
        })
      });
    } catch (e) {}
  };

  async function loadNotificationPreference() {
    try {
      const res = await fetch(`/api/progress/${currentUserId}`);
      if (res.ok) {
        const data = await res.json();
        const checkbox = document.getElementById('notifToggleCheckbox');
        if (checkbox) {
          checkbox.checked = data.notificationsEnabled !== false;
        }
      }
    } catch (e) {
      const local = localStorage.getItem(`fortis_notif_${currentUserId}`);
      const checkbox = document.getElementById('notifToggleCheckbox');
      if (checkbox && local !== null) {
        checkbox.checked = local === '1';
      }
    }
  }

  // 7. Telemetry - Log Launch URL to Backend & Console
  async function recordMiniAppLaunch() {
    try {
      const launchUrl = window.location.href;
      console.log(`🚀 [FORTIS Mini App] Launching for ${currentUserId} (${currentUserName}):`, launchUrl);
      await fetch('/api/progress/launch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          telegramId: currentUserId,
          firstName: currentUserName,
          username: currentUserHandle,
          url: launchUrl,
          platform: tg?.platform || 'browser',
          tab: activeTab,
          session: curSession
        })
      });
    } catch (e) {
      // Fire and forget
    }
  }

  // 8. Initial Boot
  window.addEventListener('DOMContentLoaded', async () => {
    recordMiniAppLaunch();
    await loadWeightData();
    await loadNotificationPreference();
    switchTab(activeTab);
    syncToServer();
  });
})();
