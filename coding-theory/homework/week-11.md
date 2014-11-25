# Coding Theory Homework

## Week 11 (Section 3.1)

### Exercise 3.1.2

> Illustrate  Theorem 3.1.1 for _v_ = `10110` and _t_ = 3 by listing all words in _K<sup>5</sup>_ of distance of at most 3 from _v_, and then check that Theorem 3.1.1 does give the correct number of such words.

| Word      | Distance from _v_ | Word      | Distance from _v_ |
| ----      | ----------------- | ----      | ----------------- |
| __00000__ | __3__             | __10000__ | __2__             |
| 00001     | 4                 | __10001__ | __3__             |
| __00010__ | __2__             | __10010__ | __1__             |
| __00011__ | __3__             | __10011__ | __2__             |
| __00100__ | __2__             | __10100__ | __1__             |
| __00101__ | __3__             | __10101__ | __2__             |
| __00110__ | __1__             | __10110__ | __0__             |
| __00111__ | __2__             | __10111__ | __1__             |
| 01000     | 4                 | __11000__ | __3__             |
| 01001     | 5                 | 11001     | 4                 |
| __01010__ | __3__             | __11010__ | __3__             |
| 01011     | 4                 | __11011__ | __3__             |
| __01100__ | __3__             | __11100__ | __2__             |
| 01101     | 4                 | __11101__ | __3__             |
| __01110__ | __2__             | __11110__ | __1__             |
| __01111__ | __3__             | __11111__ | __2__             |

__26__ words in _k<sup>5</sup>_ of a distance of at most 3 from _v_.

Checking this with theorem 3.1.1 we get the same result.

<!--
\binom{5}{0} + \binom{5}{1} + \binom{5}{2} + \binom{5}{3} = 26
-->
![Equation](http://www4a.wolframalpha.com/Calculate/MSP/MSP24761i69bi41b0i51ahe00004gic3hhb81h2534h?MSPStoreType=image/gif&s=35&w=188.&h=36.)

### Exercise 3.1.5 (b)

> Find an upper bound for the size or dimension of a linear code with the given values of _n_ and _d_.

<!-- -->

> b\. _n_ = 7, _d_ = 3

_t_ = (d-1)/2 = 1

<!--
| C |  \leq  \frac{2^7}{\binom{7}{0}+\binom{7}{1}}  = \frac{128}{8} = 16
-->
![Equation](http://www4a.wolframalpha.com/Calculate/MSP/MSP3645201abb49af0i8cdg000063d5ache4h5fdiid?MSPStoreType=image/gif&s=60&w=193.&h=61.)

### Exercise 3.1.6 (b)

> Verify the Hamming bound for the linear code _C_ with the given generator matrix.

<!-- -->

> b\.

<!--
G = \left(
\begin{array}{ccc}
100111 \\
010101 \\
001011 \\
\end{array} \right)
-->

![Matrix G](http://i.imgur.com/MHNZwdJ.png)

### Exercise 3.1.10

> Columns 2,3 and 5 of the generator matrix _G_ below are linearly dependent. Find a codeword which has zeros in position 2,3 and 5.
 

<!--
G = \left(
\begin{array}{ccc}
11001 \\
01110 \\
00101 \\
\end{array} \right)  \times  111 = 10010
-->

![Equation](http://i.imgur.com/AdAFdoX.png)

### Exercise 3.1.11

> Show that if a _k_ x _n_ generator matrix has _k_ linearly depedent columns then there is a nonzero codeword with zeroes in those _k_ position.

### Exercise 3.1.18 (b)

> For each part of Exercise 3.1.5, let _k_ = 2_d_ and decide, if possible, whether or not a linear code with the given parameters exists. Find a lower and upper bound for the maximum number of codewords such a code can have, assuming that _k_ is unrestricted.

<!-- -->

> b\. _n_ = 7, _d_ = 3

_t_ = (d-1)/2 = 1  
_k_ = 2_d_ = 14

Lower bound:
<!--
| C |   \geq \frac{2^{7-1}}{\binom{6}{0}+\binom{6}{1}}=\frac{2^6}{1+7}=\frac{64}{8}=8
-->
![Equation](http://www4a.wolframalpha.com/Calculate/MSP/MSP66922013caa5ch0580400003cihgha36ai10dbd?MSPStoreType=image/gif&s=38&w=233.&h=62.)

Upper bound:
<!--
| C |  \leq \frac{2^7}{\binom{7}{0}+\binom{7}{1}}=\frac{128}{1+7}=\frac{128}{8}=16
-->
![Equation](http://www4a.wolframalpha.com/Calculate/MSP/MSP9911i3faef6b368e0ba000036e5e3f036idafib?MSPStoreType=image/gif&s=63&w=249.&h=61.)

### Exercise 3.1.19 (b)

> Find a lower and upper bound for the maximum number of codewords in a linear code of length _n_ and distance _d_ where:

<!-- -->

> b\. _n_ = 15, _d_ = 3

_t_ = (d-1)/2 = 1

Lower bound:
<!--
| C |   \geq \frac{2^{15-1}}{\binom{14}{0}+\binom{14}{1}}=\frac{2^14}{1+15}=\frac{16384}{16}=1024
-->
![Equation](http://www4a.wolframalpha.com/Calculate/MSP/MSP5601g3gh138f60ba6a900004b6e479ec84d8gdg?MSPStoreType=image/gif&s=19&w=307.&h=61.)

Upper bound:
<!--
| C |  \leq \frac{2^15}{\binom{15}{0}+\binom{15}{1}}=\frac{32768}{1+16}=\frac{32768}{16}=2048
-->
![Equation](http://www4c.wolframalpha.com/Calculate/MSP/MSP2992203eed2c3i3454f9000066dib50c2fg86686?MSPStoreType=image/gif&s=36&w=309.&h=61.)

### Exercise 3.1.20

> Is it possible to have a linear code with parameters (8, 3, 5)

