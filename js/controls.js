/*
  ============================================================
  FILE: js/controls.js
  PURPOSE: Wires up the Start/Pause and Reset buttons with
           click event listeners and keeps their label text
           and visual state in sync with the timer.

  THE TOGGLE PATTERN:
  The Start button does double duty — it starts the timer
  when idle, and pauses it when running. This is a common
  UI pattern called a "toggle button". The button's label
  changes to reflect the current action it will perform.
  ============================================================
*/


/* ── DOM References ────────────────────────────────────────
   Grabbed once at load time for efficiency.
   ─────────────────────────────────────────────────────── */
const btnStart = document.getElementById('btnStart');
const btnReset = document.getElementById('btnReset');

/* ── initControls() ────────────────────────────────────────
   Called once by app.js at startup.
   Attaches click listeners to the two control buttons.
   ─────────────────────────────────────────────────────── */
function initControls() {
  /* --- Start / Pause toggle --- */
  btnStart.addEventListener('click', () => {
    if (state.isRunning) {
      pauseTimer();           // timer.js — pauses the countdown
    } else {
      startTimer();           // timer.js — starts the countdown
      triggerPulse();         // visual feedback pulse on the button
    }
    syncStartButton();        // Update the button label + style
  });

  /* --- Reset --- */
  btnReset.addEventListener('click', () => {
    resetTimer();             // timer.js — stops and restores time
    syncStartButton();        // Put the Start button back to ▶ Start
  });
}