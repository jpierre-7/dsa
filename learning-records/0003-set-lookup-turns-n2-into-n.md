# Can turn an O(n²) duplicate check into O(n) with a seen-set

Worked out the seen-set algorithm on their own from a by-hand thought experiment, and correctly derived O(n²) with a list and O(n) with a set as "n items × cost of each lookup". The doubling test in the exercise confirmed it (×4.0 for the slow version vs ×1.9 for theirs).

**Misconception corrected:** at first said the set helps because it "doesn't allow duplicates". Now sees that the O(1) `in` lookup is what matters, and that the no-duplicates property never comes into play here.

**Stumbling blocks to watch for:** confused `for x in items` (values) with indices (`items[i]`); put `return False` inside the loop instead of after it; wrote redundant `if x in s / elif x not in s` branches. Loop mechanics and "when do I know the answer?" reasoning are worth probing again in two pointers and sliding window.
