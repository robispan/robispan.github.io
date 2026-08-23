document.addEventListener("DOMContentLoaded", function () {
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  drawPulse();
});

/*
  Draws a photoplethysmogram — the waveform HeartSnap actually derives from light passing
  through a fingertip. Two features make it read as a pulse rather than a sine wave: the
  sharp systolic upstroke, and the dicrotic notch on the way down, where the aortic valve
  closes. Both are why a real trace is recognisable at a glance.

  It is a rendering, not an illustration, because on an engineer's site the drawing is the
  argument. It carries no measurement and claims none — the caption says so.
*/
function drawPulse() {
  var canvas = document.getElementById("pulse");
  if (!canvas || !canvas.getContext) {
    return;
  }

  var ctx = canvas.getContext("2d");
  var bpmEl = document.getElementById("bpm");
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var BPM = 68;
  var CYCLE_PX = 150;
  var speed = 0.85;
  var offset = 0;

  function size() {
    var ratio = window.devicePixelRatio || 1;
    var rect = canvas.getBoundingClientRect();
    canvas.width = Math.floor(rect.width * ratio);
    canvas.height = Math.floor(rect.height * ratio);
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    return rect;
  }

  // One beat, as a fraction of the cycle (0..1) mapped to amplitude (0..1).
  function beat(t) {
    if (t < 0.08) {
      return (t / 0.08) * 0.06;
    }
    if (t < 0.18) {
      // Systolic upstroke — fast, and the reason a pulse looks like a pulse.
      var u = (t - 0.08) / 0.1;
      return 0.06 + Math.pow(u, 0.65) * 0.94;
    }
    if (t < 0.34) {
      var d = (t - 0.18) / 0.16;
      return 1 - d * 0.55;
    }
    if (t < 0.42) {
      // Dicrotic notch: the dip as the aortic valve closes.
      var n = (t - 0.34) / 0.08;
      return 0.45 - Math.sin(n * Math.PI) * 0.1;
    }
    if (t < 0.6) {
      var r = (t - 0.42) / 0.18;
      return 0.45 + Math.sin(r * Math.PI) * 0.08 - r * 0.28;
    }
    var tail = (t - 0.6) / 0.4;
    return 0.17 * (1 - tail);
  }

  function tone() {
    var css = getComputedStyle(document.documentElement);
    return {
      trace: css.getPropertyValue("--coral").trim() || "#d9452b",
      grid: css.getPropertyValue("--line").trim() || "#e8e3df",
    };
  }

  function render() {
    var rect = size();
    var w = rect.width;
    var h = rect.height;
    var colour = tone();
    var baseline = h * 0.82;
    var amp = h * 0.6;

    ctx.clearRect(0, 0, w, h);

    // A single baseline rule, so the trace has something to sit on without a full grid.
    ctx.strokeStyle = colour.grid;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, baseline + 0.5);
    ctx.lineTo(w, baseline + 0.5);
    ctx.stroke();

    ctx.strokeStyle = colour.trace;
    ctx.lineWidth = 2;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.beginPath();

    for (var x = 0; x <= w; x += 1) {
      var phase = ((x + offset) % CYCLE_PX) / CYCLE_PX;
      var y = baseline - beat(phase) * amp;
      if (x === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();
  }

  function tick() {
    offset += speed;
    render();
    window.requestAnimationFrame(tick);
  }

  if (bpmEl) {
    bpmEl.textContent = String(BPM);
  }

  render();
  window.addEventListener("resize", render);

  // Reduced motion still gets the trace, just held still rather than scrolling.
  if (!reduced) {
    window.requestAnimationFrame(tick);
  }
}
