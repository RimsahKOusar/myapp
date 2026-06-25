/*
  ============================================================
  FILE: js/state.js
  PURPOSE: Holds the single "state" object that all other
           modules read from and write to.

  WHAT IS "STATE"?
  State = all the data that can change while the app runs.
  Think of it like the app's memory:
    - Is the timer running right now?
    - Which mode is active? (work / short / long)
    - How many seconds are left?
    - How many pomodoros has the user completed today?

  WHY ONE CENTRAL STATE?
  Without a central state, each module would store its own
  variables and they'd easily get out of sync. With one
  state object, every module reads the same data.

  HOW OTHER MODULES USE IT:
    Read  → state.isRunning          (read a value)
    Write → state.isRunning = true   (update a value)
  ============================================================
*/


/* ── App State Object ──────────────────────────────────────
   All fields have their initial (startup) values here.
   ─────────────────────────────────────────────────────── */
const state = {

  /* --- Timer status --- */
  isRunning: false,          // true while the countdown is ticking
  intervalId: null,          // holds the setInterval reference so we can clear it

  /* --- Current mode --- */
  mode: 'work',              // 'work' | 'short' | 'long'

  /* --- Time left (in seconds) ---
     Starts at the default work duration converted to seconds.
     Updated every second by timer.js while running.          */
  secondsLeft: DEFAULT_DURATIONS.work * 60,

  /* --- Total seconds for the current session ---
     Used by the ring animation to calculate the percentage
     of time remaining (secondsLeft / totalSeconds).          */
  totalSeconds: DEFAULT_DURATIONS.work * 60,

  /* --- Custom durations (in minutes) ---
     Starts as a copy of the defaults. Updated by settings.js
     when the user saves new values.                          */
  durations: { ...DEFAULT_DURATIONS },

  /* --- Stats ---
     pomodoroCount = how many work sessions finished today.
     Loaded from localStorage in app.js on startup.           */
  pomodoroCount: 0,

};
