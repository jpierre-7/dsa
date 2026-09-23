# Notes

## How the user wants to be taught
- **Learns by doing. Never just give the answer.** Pose the problem, let them struggle, give hints in escalating steps (nudge → narrower hint → partial structure) only when asked or clearly stuck. Don't reveal solutions in lessons before an attempt.
- **Check understanding every lesson**: retrieval quiz, plus an "explain it back to me" prompt they answer in chat. Probe their explanation with a follow-up question rather than just approving it.
- When they share a solution: ask them for its Big-O and an edge case before giving any verdict.

## Context
- Mixed goal: interviews, CS foundations, better everyday code. Frame lessons with a work angle *and* an interview angle when both fit.
- Casual pace: keep lessons short, one win each. Open each session with retrieval of earlier lessons (spacing); interleave old patterns into later practice sets.
- Python. Exercises live in `./exercises/` as runnable self-checking scripts (`python3 exercises/NNNN_*.py`).
- Glossary: no `GLOSSARY.md` yet. Promote terms once the user can use them correctly.

## Roadmap (revise freely; ✓ = lesson written)
Foundations
1. ✓ Big-O and hidden loops: list vs set membership
2. Dicts: counting and one-pass lookup (Two Sum)
3. Space complexity, and arrays and strings in place

Patterns
4. Two pointers I: opposite ends on a sorted array (Two Sum II, valid palindrome)
5. Two pointers II: same direction, read/write pointers (remove duplicates in place)
6. Sliding window I: fixed size
7. Sliding window II: variable size (longest substring without repeats)
8. Linked lists in Python (prerequisite)
9. Fast & slow pointers: cycle detection, middle of a list
10. Binary search: the loop invariant, off-by-one discipline
11. Binary search variations: first/last occurrence (`bisect`), rotated array, binary search on the answer
12. Recursion and the call stack (prerequisite)
13. Trees + DFS (pre/in/post-order, recursive and with an explicit stack)
14. BFS with `collections.deque`: level-order traversal, shortest steps
15. Graphs: adjacency lists, grids, visited sets, DFS/BFS on graphs
16. Backtracking I: subsets and permutations (choose / explore / un-choose)
17. Backtracking II: pruning (combination sum, N-Queens-lite)
18. DP I: from backtracking to memoization (climbing stairs, top-down)
19. DP II: tabulation, 1D (house robber, coin change)
20. DP III: 2D (grid paths, longest common subsequence)

Every ~4 lessons: a mixed review set of problems with the pattern unlabelled, so the user has to work out which pattern applies.
