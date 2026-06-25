/*
  ============================================================
  FILE: js/stats.js
  PURPOSE: Renders the pomodoro dot tracker and the numeric
           count in the stats bar at the bottom of the app.

  HOW THE DOTS WORK:
  - We always show MAX_DOTS (8) dot circles.
  - Dots up to pomodoroCount % MAX_DOTS get .dot--filled.
  - After every 8 pomodoros the dots reset and refill,
    but the numeric count keeps climbing (e.g. "9 pomodoros").
  ============================================================
*/


/* ── DOM References ────────────────────────────────────────
   The container where dots are injected, and the count span.
   ─────────────────────────────────────────────────────── */
const elDots  = document.getElementById('pomatoDots');
const elCount = document.getElementById('statsCount');

/* ── renderStats() ─────────────────────────────────────────
   Clears the dot container and re-renders all dots based
   on the current state.pomodoroCount.

   Called:
   - On app startup (app.js) to restore saved progress
   - By timer.js each time a work session completes
   ─────────────────────────────────────────────────────── */
function renderStats() {
  /* --- Update numeric count --- */
  elCount.textContent = state.pomodoroCount;

  /* --- How many dots should be filled in this "cycle"?  ---
     e.g. pomodoroCount = 10, MAX_DOTS = 8
     filledCount = 10 % 8 = 2   (2 dots lit in the second round) */
  const filledCount = state.pomodoroCount % MAX_DOTS;

  /* --- Clear existing dots and rebuild --- */
  elDots.innerHTML = '';

  for (let i = 0; i < MAX_DOTS; i++) {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    dot.setAttribute('aria-label', i < filledCount ? 'completed' : 'empty');

    /* Stagger the fill animation so dots light up one by one */
    if (i < filledCount) {
      setTimeout(() => {
        dot.classList.add('dot--filled');
      }, i * 60);                  // 60ms delay between each dot
    }

    elDots.appendChild(dot);
  }
}