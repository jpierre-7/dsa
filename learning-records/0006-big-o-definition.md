# Can define Big-O and read time and space separately

User's own definition: "a measure of how time and space needs grow relative to input size". Refined together into: it describes the *growth* (not the amount) of time *or* memory, as two separate answers, usually for the worst case, with constants dropped.

**Evidence:** explained why two O(n) functions can differ 10× in speed ("constants get dropped"), and predicted that O(n) time / O(1) space means n ×1000 → time ×1000, memory flat.

**Implications:** ready to state both time and space for every solution from Lesson 2 onward. Ask for both every time.
