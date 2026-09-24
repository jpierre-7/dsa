"""Lesson 0001: from O(n²) to O(n).

Your task: implement `has_duplicates_fast` below so it returns the same answers
as `has_duplicates_slow` but does O(n) work instead of O(n²).

Run it:
    python3 exercises/0001_has_duplicates.py

The script checks your answers, then times both versions as n doubles so you
can see the growth rate for yourself.
"""

import time


def has_duplicates_slow(items):
    """Compare every pair. Given to you: don't change it."""
    for i in range(len(items)):
        for j in range(i + 1, len(items)):
            if items[i] == items[j]:
                return True
    return False


def has_duplicates_fast(items):
    """Return True if any value appears more than once in `items`.

    Rule: only one loop over `items`. Stuck? Ask your teacher for a hint.
    """
    s = set()

    for item in items:
        if item in s:
            return True
        s.add(item)

    return False


#    raise NotImplementedError("Write this one!")


# ---------------------------------------------------------------------------
# Checker: no need to edit below this line.
# ---------------------------------------------------------------------------

CASES = [
    ([], False),
    ([7], False),
    ([1, 2, 3], False),
    ([1, 2, 1], True),
    (["a", "b", "c", "a"], True),
    ([5, 5], True),
    (list(range(1000)) + [999], True),
    (list(range(1000)), False),
]


def timed(fn, items):
    start = time.perf_counter()
    fn(items)
    return time.perf_counter() - start


def fmt(seconds):
    return f"{seconds * 1000:9.2f} ms"


def main():
    print("1. Correctness")
    try:
        for items, expected in CASES:
            got = has_duplicates_fast(list(items))
            label = repr(items) if len(items) < 6 else f"<{len(items)} items>"
            if got != expected:
                print(
                    f"   ✗ has_duplicates_fast({label}) returned {got!r}, expected {expected!r}"
                )
                return
        print(f"   ✓ all {len(CASES)} cases pass")
    except NotImplementedError:
        print(
            "   has_duplicates_fast isn't written yet. Open this file and fill it in."
        )
        return

    print(
        "\n2. Slow version: watch what happens each time n doubles (worst case: no duplicates)"
    )
    prev = None
    for n in (1000, 2000, 4000):
        t = timed(has_duplicates_slow, list(range(n)))
        ratio = f"   ×{t / prev:.1f} vs previous" if prev else ""
        print(f"   n = {n:>9,}  {fmt(t)}{ratio}")
        prev = t
    slow_4000 = prev

    fast_4000 = timed(has_duplicates_fast, list(range(4000)))
    if fast_4000 * 20 > slow_4000:
        print("\n   Your fast version is barely faster than the slow one at n = 4,000.")
        print(
            "   Is there still a loop hiding inside a loop? Remember `x in some_list` is itself a loop."
        )
        return

    print("\n3. Your version: n doubles, and doubles, and doubles...")
    prev = None
    for n in (250_000, 500_000, 1_000_000, 2_000_000):
        t = timed(has_duplicates_fast, list(range(n)))
        ratio = f"   ×{t / prev:.1f} vs previous" if prev else ""
        print(f"   n = {n:>9,}  {fmt(t)}{ratio}")
        prev = t

    print(
        "\nThe slow version roughly quadruples (×4) each time n doubles: that's O(n²)."
    )
    print(
        "Yours roughly doubles (×2): that's O(n). Now go back to the lesson and finish the quiz."
    )


if __name__ == "__main__":
    main()
