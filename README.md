# myapp
## 1. What This App Does

The Pomodoro Technique is a time-management method where you work in focused 25-minute sessions, then take a short 5-minute break. After four sessions, you take a longer 15-minute break.

This app implements that with:

- ⏱ A circular countdown timer with an animated SVG ring
- 🔄 Three modes: Work / Short Break / Long Break
- ⏸ Start, Pause, and Reset controls
- 🔔 A sound alert when a session ends (Web Audio API)
- 🍅 A dot tracker showing how many sessions you've completed
- ⚙ A settings panel to customise all three durations
- 💾 Data persistence via `localStorage` (survives page refresh)

```
pomodoro-timer/
│
├── index.html          ← Entry point. Imports all modules, defines layout
│
├── css/
│   ├── base.css        ← Design tokens (colors, fonts, spacing variables)
│   ├── layout.css      ← Page structure, centering, overlay
│   ├── timer.css       ← Clock ring, countdown digits, label
│   ├── controls.css    ← Start/Pause/Reset buttons
│   ├── modes.css       ← Work/Break tab switcher
