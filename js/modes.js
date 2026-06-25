/*
  ============================================================
  FILE: js/modes.js
  PURPOSE: Manages the three mode tabs (Work / Short Break /
           Long Break) and keeps everything in sync when the
           user switches between them.

  WHAT "SWITCHING MODE" DOES:
  1. Updates state.mode
  2. Moves the .active CSS class to the clicked tab
  3. Updates the CSS --clr-accent variable so the ring,
     button, and settings save button all change color
  4. Calls setTimerMode() in timer.js to reset the clock
  5. Stops any running timer (can't switch mid-session)
  ============================================================
*/


/* ── DOM Reference ─────────────────────────────────────────
   NodeList of all three tab buttons. We loop over these
   to attach click listeners and manage the .active class.
   ─────────────────────────────────────────────────────── */
const tabButtons = document.querySelectorAll('.tab');

/* ── initModes() ───────────────────────────────────────────
   Called once by app.js at startup.
   Attaches a click listener to every tab button.
   ─────────────────────────────────────────────────────── */
function initModes() {
  tabButtons.forEach(tab => {
    tab.addEventListener('click', () => {
      const selectedMode = tab.dataset.mode;  // e.g. 'work', 'short', 'long'
      switchMode(selectedMode);
    });
  });
}


/* ── switchMode(mode) ──────────────────────────────────────
   The main function that handles a mode change.
   Called by tab clicks AND by settings.js after saving
   (to re-apply the duration change immediately).

   @param {string} mode - 'work' | 'short' | 'long'
   ─────────────────────────────────────────────────────── */
function switchMode(mode) {
  /* --- Stop any running timer first --- */
  if (state.isRunning) {
    pauseTimer();           // timer.js
    syncStartButton();      // controls.js — reset button label to "▶ Start"
  }

  /* --- Update the state --- */
  state.mode = mode;

  /* --- Update tab .active class ---
     Remove .active from all tabs, then add it to the
     one that matches the selected mode.                   */
  tabButtons.forEach(tab => tab.classList.remove('active'));

  const activeTab = document.querySelector(`.tab[data-mode="${mode}"]`);
  if (activeTab) activeTab.classList.add('active');

  /* --- Update the accent color on :root ---
     document.documentElement = the <html> element.
     Setting a CSS variable here affects every element
     that uses var(--clr-accent) in any CSS file.         */
  document.documentElement.style.setProperty(
    CSS_ACCENT_VAR,      // '--clr-accent'
    MODE_COLORS[mode]    // e.g. 'var(--clr-work)'
  );

  /* --- Reset the timer to the new mode's duration --- */
  setTimerMode(mode);    // timer.js
}