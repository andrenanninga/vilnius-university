# Coding Theory Homework

## Week 14 (Section 3.8 - 3.9)

### Exercise 3.8.5

> Find the generator matrix G(2, 3)

$$
G(2, 3) = 
\left[
  \begin{array}{cccc}
    G(2, 2) & G(2, 2) \\\\
    0       & G(1, 2) \\\\
  \end{array}
\right]
$$

$$
G(2, 2) = 
\left[
  \begin{array}{cccc}
    G(1, 2) \\\\
    0001 \\\\
  \end{array}
\right]
$$

$$
G(1, 2) = 
\left[
  \begin{array}{cccc}
    G(1, 1) & G(1, 1) \\\\
    0       & G(0, 1) \\\\
  \end{array}
\right]
$$

$$
G(1, 1) = 
\left[
  \begin{array}{cccc}
    G(0, 1) \\\\
    01 \\\\
  \end{array}
\right]
$$

$$
G(0, 1) = 
\left[
  \begin{array}{cccc}
    11 \\\\
  \end{array}
\right]
$$

---

$$
G(1, 1) = 
\left[
  \begin{array}{cccc}
    11 \\\\
    01 \\\\
  \end{array}
\right]
$$

$$
G(1, 2) = 
\left[
  \begin{array}{cccc}
    11 & 11 \\\\
    01 & 01 \\\\
    00 & 11 \\\\
  \end{array}
\right]
$$

$$
G(2, 2) = 
\left[
  \begin{array}{cccc}
    1111 \\\\
    0101 \\\\
    0011 \\\\
    0001 \\\\
  \end{array}
\right]
$$

$$
G(2, 3) = 
\left[
  \begin{array}{cccc}
    1111 & 1111 \\\\
    0101 & 0101 \\\\
    0011 & 0011 \\\\
    0001 & 0001 \\\\
    0000 & 1111 \\\\
    0000 & 0101 \\\\
    0000 & 0011 \\\\
  \end{array}
\right]
$$

### Exercise 3.8.8 (only for m=3)

> Show that Theorem 3.8.7 holds for the codes $RM(r,m), 1 \leq m \leq 4$, constructed in Examples 3.8.1, 3.8.3, 3.8.4 and Exercises 3.8.5, 3.8.6.

> 1\. Length $n = 2^m$
> 2\. Distance $d = 2^{m-r}$
> 3\. Dimension $k = \sum_{i=0}^{r} \binom{m}{i}$
> 4\. $RM(r - 1, m)$ is contained in $RM(r, m), r > 0$
> 5\. Dual code $RM(m - 1 - r, m), r < m$

---

> r = 1  
> m = 3  

$$
RM(1, 3) = 
\left[
  \begin{array}{cccc}
    1111 & 1111 \\\\
    0101 & 0101 \\\\
    0011 & 0011 \\\\
    0000 & 1111 \\\\
  \end{array}
\right]
$$

> 1\. Length $n = 2^m$

$n = 2^3 = 8$

> 2\. Distance $d = 2^{m-r}$

$d = 2^{3-1} = 2^2 = 4$

> 3\. Dimension $k = \sum_{i=0}^{r} \binom{m}{i}$

$k = \sum_{i=0}^{1} \binom{3}{i} = 4$

> 4\. $RM(r - 1, m)$ is contained in $RM(r, m), r > 0$

$RM(0, 3) = 
\left[
  \begin{array}{cccc}
    11111111 \\\\
  \end{array}
\right]$ Which is the first word in $GM(1, 3)$

> 5\. Dual code $RM(m - 1 - r, m), r < m$


---

> r = 2  
> m = 3  

$$
RM(2, 3) = 
\left[
  \begin{array}{cccc}
    1111 & 1111 \\\\
    0101 & 0101 \\\\
    0011 & 0011 \\\\
    0001 & 0001 \\\\
    0000 & 1111 \\\\
    0000 & 0101 \\\\
    0000 & 0011 \\\\
  \end{array}
\right]
$$

> 1\. Length $n = 2^m$

$n = 2^3 = 8$

> 2\. Distance $d = 2^{m-r}$

$d = 2^{3-2} = 2^1 = 2$

> 3\. Dimension $k = \sum_{i=0}^{r} \binom{m}{i}$

$k = \sum_{i=0}^{2} \binom{3}{i} = 7$

> 4\. $RM(r - 1, m)$ is contained in $RM(r, m), r > 0$

$RM(1, 3) = 
\left[
  \begin{array}{cccc}
    1111 & 1111 \\\\
    0101 & 0101 \\\\
    0011 & 0011 \\\\
    0000 & 1111 \\\\
  \end{array}
\right]$ Which are the first four word in $GM(2, 3)$

### Exercise 3.8.10 (b)

> Let $G(1, 3)$ be the generator for the $RM(1, 3)$ code, decode the following received words.

<!-- -->

> b\. $w = 0110\ 0111$

$$
G(1, 3) = 
\left[
  \begin{array}{cccc}
    1111 & 1111 \\\\
    0101 & 0101 \\\\
    0011 & 0011 \\\\
    0000 & 1111 \\\\
  \end{array}
\right]
$$

$$
d(0110\ 0111, 1111\ 1111) = 3 \\\\
d(0110\ 0111, 0101\ 0101) = 3 \\\\
d(0110\ 0111, 0011\ 0011) = 3 \\\\
d(0110\ 0111, 0000\ 1111) = 3 \\\\
$$

### Exercise 3.9.6 (b)

> Decode the received words in Exercise 3.8.10 using Algorithm 3.9.4 (and Example 3.9.2)

<!-- -->

> b\. $w = 0110\ 0111$

$\overline{w} = \left[\begin{array}{c} -1 & 1 & 1 & -1 & -1 & 1 & 1 & 1 \end{array}\right]$

$w_1 = \overline{w}H^1_3 = \left[\begin{array}{c} 0 & -2 & 0 & 2 & 0 & -2 & 2 & 0 \end{array}\right]$  
$w_2 = w_1H^2_3 = \left[\begin{array}{c} 0 & 0 & 0 & -4 & 2 & -2 & -2 & -2 \end{array}\right]$  
$w_3 = w_2H^3_3 = \left[\begin{array}{c} 2 & -2 & -2 & -6 & -2 & 2 & 2 & -2 \end{array}\right]$  

The largest component of $w$ is -6 occuring in position 3. Since $v(3) = 110$ and $-6 < 0$ the presumed message is $0110$