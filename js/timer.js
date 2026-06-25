/*
  ============================================================
  FILE: js/timer.js
  PURPOSE: Handles the countdown logic and updates the SVG
           ring animation and the MM:SS digit display.

  KEY CONCEPTS USED:
  - setInterval()  → calls a function every 1000ms (1 second)
  - clearInterval()→ stops a running interval
  - stroke-dashoffset → CSS property that controls how much
    of the SVG ring arc is visible (see css/timer.css)

  HOW THE RING DRAINS:
  When 100% time is left → dashoffset = 0 (full arc shown)
  When  50% time is left → dashoffset = circumference × 0.5
  When   0% time is left → dashoffset = circumference (arc hidden)
  ============================================================
*/


/* ── DOM References ────────────────────────────────────────
   Grabbed once at load time. Reusing these is faster than
   calling document.getElementById() every second.
   ─────────────────────────────────────────────────────── */
const elMinutes    = document.getElementById('timerMinutes');
const elSeconds    = document.getElementById('timerSeconds');
const elColon      = document.querySelector('.timer-colon');
const elRing       = document.getElementById('ringProgress');
const elTimerLabel = document.getElementById('timerLabel');
/* ── startTimer() ──────────────────────────────────────────
   Begins the countdown by setting up a 1-second interval.
   Guards against double-starting (if already running, stop).
   ─────────────────────────────────────────────────────── */
function startTimer() {
  if (state.isRunning) return;       // Already running → do nothing

  state.isRunning = true;
  elColon.classList.add('blink');    // Start blinking the colon

  state.intervalId = setInterval(() => {
    if (state.secondsLeft <= 0) {
      // Time is up — stop the timer and notify
      stopTimer();
      onTimerEnd();
      return;
    }

    state.secondsLeft -= 1;          // Deduct one second
    renderTimer();                   // Update the display
  }, 1000);                          // Fire every 1000ms = 1 second
}
/* ── pauseTimer() ──────────────────────────────────────────
   Pauses the countdown without resetting the time left.
   ─────────────────────────────────────────────────────── */
function pauseTimer() {
  state.isRunning = false;
  clearInterval(state.intervalId);   // Stop the ticking
  state.intervalId = null;
  elColon.classList.remove('blink'); // Stop the colon blink
}
/* ── resetTimer() ──────────────────────────────────────────
   Stops the timer AND restores secondsLeft to the full
   duration for the current mode. Ring also resets.
   ─────────────────────────────────────────────────────── */
function resetTimer() {
  pauseTimer();
  state.secondsLeft = state.totalSeconds; // Restore to full duration
  renderTimer();
}
/* ── renderTimer() ─────────────────────────────────────────
   Reads state.secondsLeft and updates THREE things:
   1. The MM digit on screen
   2. The SS digit on screen
   3. The SVG ring stroke-dashoffset (arc animation)
   ─────────────────────────────────────────────────────── */
function renderTimer() {
  /* --- 1. Calculate minutes and seconds --- */
  const mins = Math.floor(state.secondsLeft / 60);
  const secs = state.secondsLeft % 60;

  /* --- 2. Display with leading zero (e.g. "04" not "4") --- */
  elMinutes.textContent = String(mins).padStart(2, '0');
  elSeconds.textContent = String(secs).padStart(2, '0');

  /* --- 3. Update the SVG ring arc ---
     progress = fraction of time REMAINING (1.0 → 0.0)
     offset   = how much of the circumference to hide
     When progress = 1.0 (full time): offset = 0     (full arc)
     When progress = 0.0 (no time):   offset = 553   (no arc)  */
  const progress = state.secondsLeft / state.totalSeconds;
  const offset   = RING_CIRCUMFERENCE * (1 - progress);
  elRing.style.strokeDashoffset = offset;
}



