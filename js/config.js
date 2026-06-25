/*
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

/* ── 2. SVG Ring Geometry ──────────────────────────────────
   The progress ring in the HTML has r="88" (radius = 88px).
   Circumference = 2 × π × r = 2 × 3.14159 × 88 ≈ 553.

   timer.js uses this to calculate how much of the arc
   to "hide" with stroke-dashoffset as time passes.
   ─────────────────────────────────────────────────────── */
const RING_CIRCUMFERENCE = 2 * Math.PI * 88;   // ≈ 552.9

/* ── 3. Mode Labels ────────────────────────────────────────
   Human-readable labels shown below the countdown digits.
   Keyed by the data-mode attribute on the HTML tab buttons.
   ─────────────────────────────────────────────────────── */
const MODE_LABELS = {
  work:  'Focus time',
  short: 'Short break',
  long:  'Long break',
};

/* ── 4. CSS Custom Property Names ─────────────────────────
   The CSS variable we update on :root to change the accent
   color whenever the mode changes. Defined here so it's
   easy to find if the variable name ever needs updating.
   ─────────────────────────────────────────────────────── */
const CSS_ACCENT_VAR = '--clr-accent';


/* ── 5. CSS Color Values Per Mode ─────────────────────────
   Maps each mode to the CSS variable holding that mode's
   color. These reference variables defined in base.css.
   ─────────────────────────────────────────────────────── */
const MODE_COLORS = {
  work:  'var(--clr-work)',
  short: 'var(--clr-short)',
  long:  'var(--clr-long)',
};

/* ── 6. Stats Dot Count ────────────────────────────────────
   How many dots to display in the stats bar.
   If the user completes more pomodoros, the dots "wrap"
   and the fill restarts from the first dot.
   ─────────────────────────────────────────────────────── */
const MAX_DOTS = 8;


/* ── 7. LocalStorage Key ───────────────────────────────────
   Key under which the app saves the pomodoro count and
   custom durations to localStorage (browser storage).
   ─────────────────────────────────────────────────────── */
const STORAGE_KEY = 'pomodoroData';
