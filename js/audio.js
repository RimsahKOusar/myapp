/*
  ============================================================
  FILE: js/audio.js
  PURPOSE: Plays a short alert sound when a timer session
           ends. Uses the Web Audio API — no sound files
           needed, the sound is generated in the browser.

  WEB AUDIO API BASICS:
  - AudioContext = the "sound engine" (create it once)
  - OscillatorNode = generates a tone at a given frequency
  - GainNode = controls the volume (0.0 = silent, 1.0 = full)
  - We connect: oscillator → gain → speakers (destination)
  - start() begins playing, stop() ends it after a delay

  WHY NOT AN <audio> TAG?
  We'd need an actual .mp3 / .wav file. The Web Audio API
  lets us generate sounds purely in JavaScript — no files,
  no loading delay, works everywhere.
  ============================================================
*/


/* ── Shared AudioContext ───────────────────────────────────
   Creating an AudioContext is expensive (it boots an audio
   engine). We create ONE and reuse it for every alert.
   It's set to null initially and created on first use —
   this is called "lazy initialization".
   ─────────────────────────────────────────────────────── */
let audioCtx = null;


/* ── playAlert() ───────────────────────────────────────────
   Plays a soft two-tone chime to signal session end.
   Called by timer.js inside onTimerEnd().
   ─────────────────────────────────────────────────────── */
function playAlert() {
  /* Create the AudioContext on first call (browsers require
     this to happen after a user gesture — which it will,
     since the timer can only start after a button click).   */
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }

  /* Play two tones in sequence: a high note, then a low note */
  playTone(880, 0.0,  0.15);   // A5  starts immediately, lasts 0.15s
  playTone(660, 0.2,  0.25);   // E5  starts 0.2s later,  lasts 0.25s
}
