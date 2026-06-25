/*
  ============================================================
  FILE: js/settings.js
  PURPOSE: Manages the settings side panel — opening it,
           closing it, and saving updated duration values.

  USER FLOW:
  1. User clicks ⚙ → panel slides in from the right
  2. User edits minute values in the inputs
  3. User clicks Save → state.durations is updated,
     the current timer resets to the new duration,
     panel closes
  4. User clicks ✕ or the overlay → panel closes
     (without saving any unsaved changes)
  ============================================================
*/


/* ── DOM References ────────────────────────────────────────
   All elements the settings module touches.
   ─────────────────────────────────────────────────────── */
const elPanel        = document.getElementById('settingsPanel');
const elOverlay      = document.getElementById('overlay');
const btnSettingsBtn = document.getElementById('btnSettings');
const btnClosePanel  = document.getElementById('btnCloseSettings');
const btnSavePanel   = document.getElementById('btnSave');

/* The three number inputs */
const inputWork  = document.getElementById('setWork');
const inputShort = document.getElementById('setShort');
const inputLong  = document.getElementById('setLong');

/* ── initSettings() ────────────────────────────────────────
   Called once by app.js at startup.
   Attaches click listeners to all settings-related elements.
   ─────────────────────────────────────────────────────── */
function initSettings() {
  btnSettingsBtn.addEventListener('click', openSettings);
  btnClosePanel .addEventListener('click', closeSettings);
  elOverlay     .addEventListener('click', closeSettings);   // Click outside to close
  btnSavePanel  .addEventListener('click', saveSettings);
}

/* ── openSettings() ────────────────────────────────────────
   Slides the panel into view.
   Syncs the input fields to whatever durations are currently
   set in state (so edits-in-progress don't persist if you
   close without saving, then reopen).
   ─────────────────────────────────────────────────────── */
function openSettings() {
  /* Populate inputs with current (possibly already customised) values */
  inputWork .value = state.durations.work;
  inputShort.value = state.durations.short;
  inputLong .value = state.durations.long;

  /* Show panel and overlay */
  elPanel  .classList.add('is-open');
  elOverlay.classList.add('is-open');
  elPanel.setAttribute('aria-hidden', 'false');

  /* Move keyboard focus into the panel for accessibility */
  inputWork.focus();
}


/* ── closeSettings() ───────────────────────────────────────
   Slides the panel back off-screen and hides the overlay.
   ─────────────────────────────────────────────────────── */
function closeSettings() {
  elPanel  .classList.remove('is-open');
  elOverlay.classList.remove('is-open');
  elPanel.setAttribute('aria-hidden', 'true');
}

/* ── saveSettings() ────────────────────────────────────────
   Reads the three inputs, validates them, updates
   state.durations, then resets the timer for the current
   mode so the change takes effect immediately.
   ─────────────────────────────────────────────────────── */
function saveSettings() {
  /* parseInt(value, 10) converts the string "25" to the number 25.
     We clamp with Math.max so the user can't enter 0 or negative. */
  const newWork  = Math.max(1, parseInt(inputWork.value,  10) || DEFAULT_DURATIONS.work);
  const newShort = Math.max(1, parseInt(inputShort.value, 10) || DEFAULT_DURATIONS.short);
  const newLong  = Math.max(1, parseInt(inputLong.value,  10) || DEFAULT_DURATIONS.long);

  /* Update state with new durations */
  state.durations.work  = newWork;
  state.durations.short = newShort;
  state.durations.long  = newLong;

  /* Apply the new duration immediately to the current mode */
  switchMode(state.mode);    // modes.js — resets clock with new duration

  /* Persist the settings to localStorage */
  saveStats();               // app.js

  closeSettings();
}
