*
  ============================================================
  FILE: js/config.js
  PURPOSE: Central place for all app-wide constants and
           default settings. Nothing is hard-coded anywhere
           else — every module reads from here.

  WHY THIS FILE EXISTS:
  If you want to change the default work duration from 25 to
  30 minutes, you change ONE number here instead of hunting
  through multiple files. This is called the "single source
  of truth" principle.
  ============================================================
*/


/* ── 1. Default Timer Durations ────────────────────────────
   All values are in MINUTES. They are converted to seconds
   where needed by the timer logic (timer.js).
   ─────────────────────────────────────────────────────── */
const DEFAULT_DURATIONS = {
  work:  25,   /* Standard Pomodoro work session */
  short:  5,   /* Short break between sessions   */
  long:  15,   /* Longer break after 4 pomodoros */
};