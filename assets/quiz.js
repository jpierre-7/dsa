/* Reusable multiple-choice quiz component.

   Markup:
     <div class="quiz">
       <p class="q">Question text</p>
       <ul>
         <li>Option</li>
         <li data-correct>Option</li>
       </ul>
       <p class="why">Explanation shown after answering.</p>
     </div>

   Options are shuffled on load so the correct answer's position gives nothing away.
   First click counts toward the score; later clicks still show feedback.
   A <div class="quiz-score"></div> anywhere on the page shows the running total. */

(function () {
  const css = `
  .quiz { margin: 1.6rem 0; padding: 1rem 0 0.4rem; border-top: 1px solid var(--rule); }
  .quiz .q { margin: 0 0 0.6rem; font-weight: 600; }
  .quiz ul { list-style: none; padding: 0; margin: 0 0 0.6rem; display: grid; gap: 0.4rem; }
  .quiz li {
    font-family: var(--mono); font-size: 0.85rem;
    border: 1px solid var(--rule); border-radius: 4px;
    padding: 0.5rem 0.8rem; cursor: pointer; margin: 0;
    transition: border-color .15s;
  }
  .quiz li:hover { border-color: var(--fg); }
  .quiz li:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
  .quiz li.right { border-color: var(--good); color: var(--good); }
  .quiz li.wrong { border-color: var(--bad); color: var(--bad); text-decoration: line-through; }
  .quiz .why { display: none; font-size: 0.9rem; color: var(--muted); margin: 0.4rem 0 0.8rem; }
  .quiz.done .why { display: block; }
  .quiz .verdict { font-weight: 600; margin-right: 0.3rem; }
  .quiz-score { font-size: 0.9rem; color: var(--muted); margin: 1rem 0; }
  @media print {
    .quiz li { cursor: default; }
    .quiz li[data-correct]::after { content: "  ✓"; }
    .quiz .why { display: block; }
  }`;
  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  const quizzes = [...document.querySelectorAll(".quiz")];
  let answered = 0, correct = 0;

  function updateScore() {
    document.querySelectorAll(".quiz-score").forEach(el => {
      el.textContent = answered === 0
        ? `${quizzes.length} questions. Answer from memory before scrolling back up.`
        : `Score: ${correct} / ${answered} answered (of ${quizzes.length}).`;
    });
  }

  quizzes.forEach(quiz => {
    const list = quiz.querySelector("ul");
    const items = [...list.children];
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [items[i], items[j]] = [items[j], items[i]];
    }
    items.forEach(li => list.appendChild(li));

    const why = quiz.querySelector(".why");
    items.forEach(li => {
      li.tabIndex = 0;
      li.setAttribute("role", "button");
      const choose = () => {
        const isRight = li.hasAttribute("data-correct");
        if (!quiz.classList.contains("done")) {
          answered++;
          if (isRight) correct++;
          updateScore();
        }
        quiz.classList.add("done");
        li.classList.add(isRight ? "right" : "wrong");
        if (why) {
          const v = why.querySelector(".verdict") || document.createElement("span");
          v.className = "verdict";
          v.textContent = isRight ? "Correct." : "Not quite.";
          why.prepend(v);
        }
      };
      li.addEventListener("click", choose);
      li.addEventListener("keydown", e => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); choose(); }
      });
    });
  });
  updateScore();
})();
