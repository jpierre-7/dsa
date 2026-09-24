/* Reusable flashcard deck for the end of each lesson.

   Markup:
     <div class="flashcards">
       <div class="card"><div class="front">Prompt</div><div class="back">Answer</div></div>
       ...
     </div>

   One card at a time. Say your answer out loud, then flip (click or Space).
   "Again" sends the card to the back of the deck; "Got it" retires it for this session.
   Printing shows every card as a front/back table. */

(function () {
  const css = `
  .flashcards { margin: 1.5rem 0; }
  .fc-stage {
    border: 1px solid var(--rule); border-radius: 6px;
    min-height: 11rem; padding: 1.4rem 1.2rem;
    display: flex; flex-direction: column; justify-content: center; align-items: center;
    text-align: center; cursor: pointer; user-select: none;
    background: var(--bg);
  }
  .fc-stage:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }
  .fc-side { font-size: 0.72rem; text-transform: uppercase; letter-spacing: .08em; color: var(--muted); margin-bottom: .6rem; }
  .fc-text { font-size: 1.1rem; line-height: 1.45; max-width: 30rem; }
  .fc-text code { font-size: 0.9em; }
  .fc-hint { font-size: 0.8rem; color: var(--muted); margin-top: 1rem; }
  .fc-bar { display: flex; gap: .6rem; align-items: center; margin-top: .8rem; flex-wrap: wrap; }
  .fc-bar button {
    border: 1px solid var(--rule); background: none; border-radius: 4px;
    padding: .4rem .9rem; cursor: pointer; font-size: .9rem;
  }
  .fc-bar button:hover:not(:disabled) { border-color: var(--fg); }
  .fc-bar button:disabled { opacity: .35; cursor: default; }
  .fc-bar .again { color: var(--bad); }
  .fc-bar .got { color: var(--good); }
  .fc-count { margin-left: auto; font-size: .85rem; color: var(--muted); }
  .flashcards .card { display: none; }
  .fc-print { display: none; }
  @media print {
    .fc-stage, .fc-bar { display: none; }
    .fc-print { display: table; }
  }`;
  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  document.querySelectorAll(".flashcards").forEach(root => {
    const all = [...root.querySelectorAll(".card")].map(c => ({
      front: c.querySelector(".front").innerHTML,
      back: c.querySelector(".back").innerHTML,
    }));

    root.insertAdjacentHTML("beforeend", `
      <div class="fc-stage" tabindex="0" role="button" aria-live="polite">
        <div class="fc-side"></div><div class="fc-text"></div><div class="fc-hint"></div>
      </div>
      <div class="fc-bar">
        <button class="again" disabled>Again</button>
        <button class="got" disabled>Got it</button>
        <button class="restart">Shuffle &amp; restart</button>
        <span class="fc-count"></span>
      </div>
      <table class="fc-print"><tr><th>Prompt</th><th>Answer</th></tr>
        ${all.map(c => `<tr><td>${c.front}</td><td>${c.back}</td></tr>`).join("")}
      </table>`);

    const stage = root.querySelector(".fc-stage");
    const side = root.querySelector(".fc-side");
    const text = root.querySelector(".fc-text");
    const hint = root.querySelector(".fc-hint");
    const again = root.querySelector(".again");
    const got = root.querySelector(".got");
    const count = root.querySelector(".fc-count");

    let deck, flipped, misses;

    function start() {
      deck = all.slice();
      for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
      }
      misses = 0;
      show();
    }

    function show(flip = false) {
      flipped = flip;
      if (deck.length === 0) {
        side.textContent = "Done";
        text.innerHTML = misses === 0
          ? `All ${all.length} cards on the first try.`
          : `All ${all.length} cards cleared. ${misses} needed another go. Those are the ones to revisit tomorrow.`;
        hint.textContent = "";
        again.disabled = got.disabled = true;
        count.textContent = "";
        return;
      }
      const c = deck[0];
      side.textContent = flipped ? "Answer" : "Prompt";
      text.innerHTML = flipped ? c.back : c.front;
      hint.textContent = flipped ? "Were you right? Be honest." : "Answer out loud first, then click or press Space to flip.";
      again.disabled = got.disabled = !flipped;
      count.textContent = `${deck.length} left`;
    }

    stage.addEventListener("click", () => { if (deck.length) show(!flipped); });
    stage.addEventListener("keydown", e => {
      if (e.key === " " || e.key === "Enter") { e.preventDefault(); if (deck.length) show(!flipped); }
    });
    again.addEventListener("click", () => { misses++; deck.push(deck.shift()); show(); });
    got.addEventListener("click", () => { deck.shift(); show(); });
    root.querySelector(".restart").addEventListener("click", start);

    start();
  });
})();
