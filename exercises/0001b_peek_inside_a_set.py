"""Lesson 1 extra: a toy set you can see inside.

Run it:
    python3 exercises/0001b_peek_inside_a_set.py

Then change FRUITS or NUM_DRAWERS below and run it again.
Python randomises string hashes each time it starts, so the drawers change between runs.
"""

NUM_DRAWERS = 2  # Python's real sets also start with 8 slots
FRUITS = ["apple", "orange", "grape", "lemon"]


def drawer_for(value):
    # Step 1: turn the value into a number.  Step 2: squash it into 0..7.
    return hash(value) % NUM_DRAWERS


# Build the toy set: a list of drawers, each drawer a small list.
drawers = [[] for _ in range(NUM_DRAWERS)]
for fruit in FRUITS:
    d = drawer_for(fruit)
    if (
        fruit not in drawers[d]
    ):  # an exact repeat is ignored: that's the "no duplicates" rule
        drawers[d].append(fruit)

print("How each fruit picks its drawer:")
for fruit in FRUITS:
    print(
        f"   hash({fruit!r:9}) = {hash(fruit):>21}   % {NUM_DRAWERS} = drawer {drawer_for(fruit)}"
    )

print("\nThe drawers:")
for i, contents in enumerate(drawers):
    note = (
        "   <- collision: two DIFFERENT fruits share a drawer"
        if len(contents) > 1
        else ""
    )
    print(f"   drawer {i}: {contents}{note}")


def lookup(value):
    d = drawer_for(value)  # computed from the value itself, not searched for
    checks = 0
    for item in drawers[d]:  # only this one drawer is ever opened
        checks += 1
        if item == value:
            return True, d, checks
    return False, d, checks


print("\nLookups:")
for q in ["apple", "lemon", "mango"]:
    found, d, checks = lookup(q)
    print(
        f"   {q!r:8} in set?  {str(found):5}  opened only drawer {d}, compared {checks} item(s)"
    )
