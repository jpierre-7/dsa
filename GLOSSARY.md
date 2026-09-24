# Data Structures & Algorithms Glossary

The canonical terms for this workspace. A term is added only once the user has shown they can use it correctly.

## Cost

**n**:
The size of the input, such as the number of items in a list.

**Big-O**:
How the number of steps grows as n grows, keeping only the dominant term and dropping constant factors.
_Avoid_: complexity (alone), speed

**O(1) / constant time**:
The step count stays about the same however large n gets.

**O(n) / linear time**:
The step count grows in proportion to n: double n, double the steps.

**O(n²) / quadratic time**:
The step count grows with n × n: double n, four times the steps. Usually a loop inside a loop, sometimes a hidden one.

**Hidden loop**:
A single line that loops internally, such as `x in some_list`. Inside another loop, it makes the whole thing O(n²).

**Space complexity**:
Big-O applied to extra memory instead of steps. A seen-set is O(n) space; two index variables are O(1).
_Avoid_: memory complexity

## Sets and hashing

**Set**:
An unordered collection with no duplicates, built on buckets so that `x in s` is O(1) on average.

**hash(x)**:
A function that turns a value into a number. Equal values always give the same number, which picks the value's bucket.

**Bucket**:
One slot in a set or dict, chosen by the hash. Lookup opens one bucket instead of scanning everything.
_Avoid_: drawer (fine as an analogy; not the term)

**Collision**:
Two different values landing in the same bucket. Collisions are why set lookup is O(1) *on average* and O(n) in the worst case.

**Average case / worst case**:
The typical cost vs the cost on the most unlucky input. Say which one you mean.
