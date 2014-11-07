# Coding Theory Homework

## Week 8 (Section 2.7 - 2.8)

### Exercise 2.7.4 (b)

> Find a parity-check matrix from each of the following codes.

<!-- -->

> b\. C = {0000, 1001, 0110, 1111}

In exercise 2.6.5 (b) of week 7 we found that the generator matrix for C is:

```
┌ 1001 ┐
└ 0110 ┘
```

By algorithm 2.5.7, we construct H:

```
┌ 1001 ┐
└ 0110 ┘ = [I X]

    ┌ X ┐   ┌ 01 ┐
H = └ I ┘ = │ 10 │
            │ 10 │
            └ 01 ┘
```

### Exercise 2.7.9 (b)

> In each part, a parity-check matrix for linear code _C_ is given. Find (i) a generator matrix for _C<sup>⊥</sup>_; (ii) a generator matrix for _C_.

<!-- -->

> b\.

##### Matrix _H<sub>C</sub>_
```
┌ 01 ┐
│ 10 │
│ 01 │
│ 10 │
└ 01 ┘
```

By transposing _H<sub>C</sub>_ we get the generator matrix for _C<sup>⊥</sup>_: _G<sub>C<sup>⊥</sup></sub>_

```
┌ 01010 ┐
└ 10101 ┘
```

By applying algorithm 2.5.7 we get the parity-check matrix for _C<sup>⊥</sup>_: _H<sub>C<sup>⊥</sup></sub>_

```
┌ 01010 ┐
└ 10101 ┘

-- Swap row 1 with row 2

┌ 10101 ┐
└ 01010 ┘

-- RREF

┌ 10╎101 ┐
└ 01╎010 ┘

-- Matrix X

┌ 101 ┐
└ 010 ┘

-- Matrix H

┌ 101 ┐
│ 010 │
│ 100 │
│ 010 │
└ 001 ┘
```

Transposing the parity-check matrix _H<sub>C<sup>⊥</sup></sub>_ gives the generator matrix for _C_: _G<sub>C</sub>_

```
┌ 10100 ┐
│ 01010 │
└ 10001 ┘
```

### Exercise 2.7.10

> List all the words of the dual code _C<sup>⊥</sup>_ for the code _C_ = {00000, 11111}. Then find the generating and parity-check matrices for C<sup>⊥</sup>.

_C<sup>⊥</sup>_ = {00000}


### Exercise 2.7.11 (b)

> For each code _C_ described below, find the dimension of _C_, the dimension of _C<sup>⊥</sup>_, the size of the generating and parity-check matrices for _C_ and for _C<sup>⊥</sup>_, the number of words in _C_ and in _C<sup>⊥</sup>_, and the information rates _r_ or _C_ and _C<sup>⊥</sup>_.

<!-- -->

> b\. C has length _n_ = 23 and dimension 11.

### Exercise 2.8.4 (b)

> Let _C_ be the generator matrix in Example 2.8.3. Encode each of the following messages _u_, and observe that the first 4 digits in the resulting codeword form the message _u_.

```
┌ 1000101 ┐
│ 0100100 │
│ 0010110 │
└ 0001011 ┘
```

> a\. _u_ = 1111

```
1000101 · 1
0100100 · 1
0010110 · 1
0001011 · 1
─────────── +
1111100
```

> b\. _u_ = 1011

```
1000101 · 1
0100100 · 0
0010110 · 1
0001011 · 1
─────────── +
1011000
```

> c\. _u_ = 0000

```
1000101 · 0
0100100 · 0
0010110 · 0
0001011 · 0
─────────── +
0000000
```

### Exercise 2.8.5

> Explain a method for recovering _u_ from _uG_ if _G_ is not in standard form.

Take for example the matrix _G_ as used in exercise 2.6.11 which is not in standard form. 

```
┌ 10110 ┐
│ 01011 │
└ 00101 ┘
```

For all words in _K<sup>3</sup>_ we will determine the _uG_:

```
(000)    0∙10110 + 0∙01011 + 0∙00101 = 00000
(100)    1∙10110 + 0∙01011 + 0∙00101 = 10110
(010)    0∙10110 + 1∙01011 + 0∙00101 = 01011
(001)    0∙10110 + 0∙01011 + 1∙00101 = 00101
(110)    1∙10110 + 1∙01011 + 0∙00101 = 11101
(101)    1∙10110 + 0∙01011 + 1∙00101 = 10011
(011)    0∙10110 + 1∙01011 + 1∙00101 = 01110
(111)    1∙10110 + 1∙01011 + 1∙00101 = 11000
```

If we take the first 3 digits of each word in _uG_ and multiply this with the original matrix _G_

```
(000)    0∙10110 + 0∙01011 + 0∙00101 = 00000   ->   (000)
(101)    1∙10110 + 0∙01011 + 1∙00101 = 10011   ->   (100)
(010)    0∙10110 + 1∙01011 + 0∙00101 = 01011   ->   (010)
(001)    0∙10110 + 0∙01011 + 1∙00101 = 00101   ->   (001)
(111)    1∙10110 + 1∙01011 + 1∙00101 = 11000   ->   (110)
(100)    1∙10110 + 0∙01011 + 0∙00101 = 10110   ->   (101)
(011)    0∙10110 + 1∙01011 + 1∙00101 = 01110   ->   (011)
(110)    1∙10110 + 1∙01011 + 0∙00101 = 11101   ->   (111)
```

The first 3 digits of the resulting words correspond with the original _u_.

### Exercise 2.8.6

> If a linear code _C_ has the following generator matrix, recover _u_ from _v_ = _uG_ = 0000101

```
┌ 1100101 ┐
│ 0110101 │
│ 1011011 │
│ 1100110 │
└ 0110000 ┘
```

Using the first 5 digits of `0000101` ie `00001` and mutliplying this with _G_ we get:

```
0∙1100101 + 0∙0110101 + 0∙1011011 + 0∙1100110 + 1∙0110000 = 0110000
```

The first 5 digits of the resulting `0110000` ie `01100` form the original _u_.

### Exercise 2.8.10 (b)

> Find a systematic code _C'_ equivalent to the given code _C_. Check that  _C_ and _C'_ have the same length, dimension, and distance.

<!-- -->

> b\. _C_ = {00000, 11100, 00111, 11011}

columns: [a, b, c, d, e] -> [a, d, e, b, c]

_C_ = {00000, 10011, 01101, 11110}

### Exercise 2.8.11 (b)

> Find a generator matrix _G_ in standard form for a code equivalent to the code with given matrix _G_

<!-- -->

> b\.

```
┌ 111000000 ┐
│ 000111000 │
└ 000111111 ┘
```

```
┌ 111000000 ┐
│ 000111000 │
└ 000111111 ┘

-- Add row 2 to row 3

┌ 111000000 ┐
│ 000111000 │
└ 000000111 ┘

-- RREF
-- Swap column 4 with column 2

┌ 101100000 ┐
│ 010011000 │
└ 000000111 ┘

-- Swap column 7 with column 3

┌ 100110000 ┐
│ 010001100 │
└ 001000011 ┘
```

### Exercise 2.8.12 (b)

> Find a generator matrix _G'_ in standard form for a code _C'_ equivalent to the code _C_ with given parity-check matrix H

<!-- -->

> b\.

```
┌ 100 ┐
│ 111 │
│ 010 │
│ 110 │
│ 101 │
│ 001 │
└ 011 ┘
```

### Exercise 2.8.13
### Exercise 2.8.14

| 111111 |
| 011011 |
| 001001 |

| 100100 |
| 011011 |
| 001001 |

| 100100 |
| 010010 |
| 001001 |

| 100100 |
| 010010 |
| 001001 |
