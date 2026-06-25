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
