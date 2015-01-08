# Coding Theory Homework

## Week 13 (Section 3.5 - 3.7)

### Exercise 3.5.1

> Show that the word of all ones is in $C_{24}$. Deduce that $C_{24}$ contains no words of weight 20.

### Exercise 3.5.2

> Prove fact (4) about $C_{24}$.

### Exercise 3.5.3

> Prove fact (5) about $C_{24}$.

### Exercise 3.6.5 (b)

> The code is $C_{24}$. Decode, if possible, each of the following received words $w$.

<!-- -->

> b\. $w = 111\ 111\ 000\ 000,\ 100\ 011\ 100\ 111$

Syndome $s = wH = 111\ 111\ 000\ 000 + 101\ 000\ 101\ 010 = 010\ 111\ 101\ 010$

Which has weight 7. Proceeding to step 3 of the algorithm 3.6.1 we find that no there is not row $b_i$ of $B$ where $wt(s + b_i) \leq 2$.

We compute the second syndrome $sB = 001\ 101\ 111\ 111$. Which has the weight 9.

Proceeding to step 6 we compute that $wt(sB + b_7) = wt(001\ 000\ 010\ 000) = 2$.

Thus $u = [e_7, sB + b_7] = 000\ 000\ 100\ 000,\ 001\ 000\ 010\ 000$

Finally we can conclude that $v = w + u = 111\ 111\ 100\ 000,\ 101\ 011\ 110\ 111$

### Exercise 3.6.6 (a)

> Find the most likely error pattern for any word with the given syndromes.

<!-- -->

> a\. $s_1 = 010\ 010\ 000\ 000, s_2 = 011\ 111\ 010\ 000$

The weight of $s_1$ is 2 and we can compute using step 2 that the error pattern should be $u = 010\ 010\ 000\ 000, 000\ 000\ 000\ 000$.

### Exercise 3.7.3 (b)

> Decode each of the following received words that were encoded using $C_{23}$.

<!-- -->

> b\. $101\ 010\ 000\ 001,\ 110\ 111\ 000\ 10$

$w1 = 101\ 010\ 000\ 001,\ 110\ 111\ 000\ 101$

Syndrome $s = wH = 101\ 010\ 000\ 001 + 100\ 001\ 000\ 000 = 001\ 011\ 000\ 001$

Which has weight 4. Proceeding to step 3 of the algorithm 3.6.1 we find that no there is not row $b_i$ of $B$ where $wt(s + b_i) \leq 2$.

We compute the second syndrome $sB = 010\ 101\ 110\ 010$. Which has the weight 6.

Proceeding to step 6 we find that no there is not row $b_i$ of $B$ where $wt(sB + b_i) \leq 2$.

Unable to decode, request retransmission.