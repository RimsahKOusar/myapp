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