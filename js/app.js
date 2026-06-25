/*
  ============================================================
  FILE: js/app.js
  PURPOSE: The "main" file — the entry point that boots the
           whole application. It wires together all modules
           and handles data persistence with localStorage.

  WHAT IT DOES:
  1. Loads saved data from localStorage (count + durations)
  2. Calls init functions from every module
  3. Does the first render so the UI is correct on load
  4. Exposes saveStats() — called by timer.js and settings.js

  ORDER OF SCRIPT LOADING (see index.html):
  config.js → state.js → timer.js → modes.js →
  controls.js → stats.js → settings.js → audio.js → app.js

  app.js must come LAST because it calls functions from
  all the other modules. They must exist first.
  ============================================================
*/


/* ── loadSavedData() ───────────────────────────────────────
   Reads any previously saved data from localStorage.
   localStorage stores everything as JSON strings.

   WHAT localStorage IS:
   A key-value store built into the browser. Data persists
   even after closing the tab/browser. It's like a tiny
   database that lives on the user's computer.
   ─────────────────────────────────────────────────────── */
function loadSavedData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);  // STORAGE_KEY from config.js
    if (!raw) return;                                // Nothing saved yet → use defaults

    const saved = JSON.parse(raw);                   // Convert JSON string → object

    /* Restore pomodoro count (if it's a valid number) */
    if (typeof saved.pomodoroCount === 'number') {
      state.pomodoroCount = saved.pomodoroCount;
    }

    /* Restore custom durations (each must be a positive number) */
    if (saved.durations) {
      const d = saved.durations;
      if (d.work  > 0) state.durations.work  = d.work;
      if (d.short > 0) state.durations.short = d.short;
      if (d.long  > 0) state.durations.long  = d.long;
    }

  } catch (err) {
    /* If the saved data is corrupted, silently ignore it.
       The app will start fresh with default values.        */
    console.warn('Pomodoro: could not load saved data.', err);
  }
}
/* ── saveStats() ───────────────────────────────────────────
   Saves the current pomodoroCount and durations to
   localStorage. Called after a session ends or settings save.
   ─────────────────────────────────────────────────────── */
function saveStats() {
  const dataToSave = {
    pomodoroCount: state.pomodoroCount,
    durations:     state.durations,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
}