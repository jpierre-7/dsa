/* Reusable "how many steps?" growth explorer.

   Markup:
     <div class="growth" data-series="1:set lookup,n:list scan,n2:nested loops"
          data-rate="1e8" data-start="1000"></div>

   data-series: comma-separated "fn:label" pairs. fn is one of 1, logn, n, nlogn, n2, 2n.
   data-rate:   assumed steps per second, used to turn steps into wall-clock time.
   data-start:  initial n.
   Bars use a log scale, so each gridline step is 10x more work. */

(function () {
  const FNS = {
    "1":     { tex: "O(1)",       f: n => 1 },
    "logn":  { tex: "O(log n)",   f: n => Math.max(1, Math.log2(n)) },
    "n":     { tex: "O(n)",       f: n => n },
    "nlogn": { tex: "O(n log n)", f: n => n * Math.max(1, Math.log2(n)) },
    "n2":    { tex: "O(n²)",      f: n => n * n },
    "2n":    { tex: "O(2ⁿ)",      f: n => Math.pow(2, n) },
  };

  const css = `
  .growth { margin: 1.5rem 0; font-size: 0.85rem; }
  .growth .ctl { display: flex; flex-wrap: wrap; align-items: center; gap: 0.6rem 1rem; margin-bottom: 0.8rem; }
  .growth input[type=range] { flex: 1 1 12rem; accent-color: var(--accent); }
  .growth .n { font-family: var(--mono); min-width: 9rem; }
  .growth .row { display: grid; grid-template-columns: 8.5rem 1fr; gap: 0.2rem 0.8rem; align-items: center; margin: 0.45rem 0; }
  .growth .name { line-height: 1.25; }
  .growth .name b { font-family: var(--mono); font-weight: 600; display: block; font-size: 0.8rem; }
  .growth .track { position: relative; height: 1.1rem; background: var(--code-bg); border-radius: 2px; }
  .growth .fill { position: absolute; inset: 0 auto 0 0; background: var(--bar); border-radius: 2px; min-width: 2px; transition: width .12s; }
  .growth .val { grid-column: 2; font-family: var(--mono); font-size: 0.75rem; color: var(--muted); }
  .growth .foot { color: var(--muted); font-size: 0.75rem; margin-top: 0.5rem; }
  @media (max-width: 520px) { .growth .row { grid-template-columns: 1fr; } .growth .val { grid-column: 1; } }`;
  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  const fmtNum = x => {
    if (x < 1e6) return Math.round(x).toLocaleString();
    const e = Math.floor(Math.log10(x));
    return `${(x / Math.pow(10, e)).toFixed(1)} × 10^${e}`;
  };
  const fmtTime = s => {
    if (s < 1e-6) return `${(s * 1e9).toFixed(0)} ns`;
    if (s < 1e-3) return `${(s * 1e6).toFixed(0)} µs`;
    if (s < 1) return `${(s * 1e3).toFixed(0)} ms`;
    if (s < 60) return `${s.toFixed(1)} s`;
    if (s < 3600) return `${(s / 60).toFixed(1)} min`;
    if (s < 86400) return `${(s / 3600).toFixed(1)} hours`;
    if (s < 86400 * 365) return `${(s / 86400).toFixed(1)} days`;
    return `${fmtNum(s / (86400 * 365))} years`;
  };

  document.querySelectorAll(".growth").forEach(root => {
    const series = root.dataset.series.split(",").map(p => {
      const [fn, label] = p.split(":");
      return { ...FNS[fn.trim()], label: label.trim() };
    });
    const rate = Number(root.dataset.rate || 1e8);
    const start = Number(root.dataset.start || 1000);

    root.innerHTML = `
      <div class="ctl">
        <label>n (input size)</label>
        <input type="range" min="1" max="7" step="0.01" value="${Math.log10(start)}" aria-label="input size n">
        <span class="n"></span>
      </div>
      ${series.map(s => `
        <div class="row">
          <div class="name"><b>${s.tex}</b>${s.label}</div>
          <div class="track"><div class="fill"></div></div>
          <div class="val"></div>
        </div>`).join("")}
      <div class="foot">Bar length is on a log scale: each tenth of the track is 10× more steps.
        Times assume ${fmtNum(rate)} steps per second, a round number for illustration.</div>`;

    const slider = root.querySelector("input");
    const nOut = root.querySelector(".n");
    const fills = root.querySelectorAll(".fill");
    const vals = root.querySelectorAll(".val");
    const maxLog = 14; // bars saturate at 10^14 steps

    function render() {
      const n = Math.round(Math.pow(10, Number(slider.value)));
      nOut.textContent = `n = ${n.toLocaleString()}`;
      series.forEach((s, i) => {
        const steps = s.f(n);
        const pct = Math.min(100, (Math.log10(Math.max(1, steps)) / maxLog) * 100);
        fills[i].style.width = `${pct}%`;
        vals[i].textContent = `${fmtNum(steps)} steps ≈ ${fmtTime(steps / rate)}`;
      });
    }
    slider.addEventListener("input", render);
    render();
  });
})();
