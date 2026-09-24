# Set speed comes from buckets, not uniqueness; O(1) is an average

Twice the user explained set speed as "sets don't allow duplicates". A counter-example fixed it: a list with no duplicates is still O(n). The user now says buckets make it fast. Using the drawer picture, they worked out that when every item collides into one bucket, the lookup takes n checks, which is why set lookup is O(1) *on average*.

**Evidence:** answered "buckets make it fast, drawer M could take 1,000 checks". Also got space complexity right without being taught: seen-set O(n), nested loops O(1).

**Implications:** the drawer/bucket picture is a good anchor. Reuse it for dicts in Lesson 2 (dict = set with a value in each bucket). The link between uniqueness and speed may come back, so probe it once more in Lesson 2.

**Follow-up (same session):** asked how lookup avoids scanning, and how collisions can happen without duplicates. Worked through `exercises/0001b_peek_inside_a_set.py`. Can now explain: `hash(x) % num_buckets` is *computed*, not searched for; a collision means two different values sharing a bucket; 1 bucket makes a set a list (O(n)); 1M items in 8 buckets is about 125,000 per bucket; so Python adds buckets as the set grows to keep lookup O(1). Mechanism understood; ready for dicts.
