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