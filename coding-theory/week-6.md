# Coding Theory Homework

## Week 6 (Section 2.3 - 2.4)

### Exercise 2.3.4 (c, f)

> Test each of the following sets for linear independence. If the set is lineary dependent, extract from _S_ a largest lineary independent subset.

<!-- -->

> C\. _S_ = {1101, 0111, 1100, 0011}

a(1101) + b(0111) + c(1100) + d(0011) = 0000

```
a + c = 0
a + b + c = 0
b + d = 0
a + b + d = 0

a + b + d = 0
    a + 0 = 0
        a = 0

a + c = 0
0 + c = 0
    c = 0

a + b + c = 0
0 + b + 0 = 0
        b = 0

b + d = 0
0 + d = 0
d = 0

a = b = c = d = 0
```

_S_ is linearly independent

> F\. _S_ = {1100, 1010, 1001, 0101}

a(1100) + b(1010) + c(1001) + d(0101) = 0000 = 0000

```
a + b + c = 0
a + d = 0
b = 0
c + d = 0

a + b + c = 0
a + 0 + c = 0
a + c = 0
a = c = 1

a + d = 0
1 + d = 0
d = 1

b = 0
a = c = d = 1
```

_S_ is linearly dependent

The first word dependent on is 0101.

---

The new subset _S_ is {1100, 1010, 1001}

a(1100) + b(1010) + c(1001) = 0000

```
a + b + c = 0
a = 0
b = 0
c = 0

a = b = c = 0
```

The new subset _S_ is linearly independent.

### Exercise 2.3.7 (b, d)

> For each set in Exercise 2.2.3 find a basis _B_ for the code _C_ = _\<S\>_ and a basis _B<sup>1</sup>_ for the dual code _C<sup>1</sup>_

<!-- -->

> b\. _S_ = {1010, 0101, 1111}
>
> > _C_ = _\<S\>_ = {0000, 1010, 0101, 1111}  
> > _C<sup>1</sup>_ = _S<sup>1</sup>_ = {0000, 0101, 1010, 1111}

a(1010) + b(0101) + c(1111) = 0000

```
a + c = 0
b + c = 0

a = b = c = 1
```

_S_ is linearly dependent

The first word dependent is 1111

---

The new subset _S<sup>1</sup>_ is {1010, 0101}

a(1010) + b(0101) = 0000

```
a = 0
b = 0

a = b = 0
```

Subset _S<sup>1</sup>_ is linearly independent

```
1010 = 1·x + 0·y + 1·z + 0·w
     = x + z = 0

0101 = 0·x + 1·y + 0·z + 1+w
     = y + w

1111 = 1·x + 1·y + 1·z + 1+w
     = x + y + z + w
```

_B<sup>1</sup>_ = _S<sup>1</sup>_ = {0000, 0101, 1010, 1111}

> d\. _S_ = {1000, 0100, 0010, 0001}
>
> > _C_ = _\<S\>_ = {0000, 1000, 0100, 0010, 0001, 1100, 1010, 1001, 0110, 0101, 0011, 1110, 1101, 1011, 0111, 1111}  
> > _C<sup>1</sup>_ = _S<sup>1</sup>_ = {0000}

a(1000) + b(0100) + c(0010) + d(0001) = 0000 = 0000

```
a = 0
b = 0
c = 0
d = 0

a = b = c = d = 0
```

_S_ is linearly independent

```
1000 = 1·x + 0·y + 0·z + 0·w
     = x = 0

0100 = 0·x + 1·y + 0·z + 0·w
     = x = 0

0010 = 0·x + 0·y + 1·z + 0·w
     = x = 0

0001 = 0·x + 0·y + 0·z + 1·w
     = x = 0
```

_B<sup>1</sup>_ = _S<sup>1</sup>_ = {0000}

### Exercise 2.3.8 (b, d)

> Find the dimensions of each code _C_ = _\<S\>_ and its dual code _C<sup>1</sup>_ in Exercise 2.2.3

<!-- -->

> b\. _S_ = {1010, 0101, 1111}

The dimension of _C_ = _\<S\>_ is 2.
The dimension of _C<sup>1</sup>_ = 2.

> d\. _S_ = {1000, 0100, 0010, 0001}

The dimension of _C_ = _\<S\>_ is 4.
The dimension of _C<sup>1</sup>_ = 0.

### Exercise 2.3.10 (b)

> Write each of the following words in _K<sup>4</sup>_ as a unique linear combination of the words in the basis {1000, 1100, 1110, 1111}

<!-- -->

> b\. 1010

a(1000) + b(1100) + c(1110) + d(1111) = 1010

```
a + b + c + d = 1
b + c + d = 0
c + d = 1
d = 0

c + d = 1
c + 0 = 1
    c = 1

b + c + d = 0
b + 1 + 0 = 0
        b = 1

a + b + c + d = 1
a + 1 + 1 + 0 = 0
            a = 1

a + b + c = 1
d = 0
```

The unique linear combination = 1110

### Exercise 2.3.12 (b)

> Extend {101010, 010101} to a basis for _K<sup>6</sup>_

101010, 010101, 000001, 000010, 000100, 001000, 010000, 100000

```

```

### Exercise 2.3.15 (b, d)

> Check your answers in Exercise 2.3.8 with the equation in Theorem 2.3.14

length of _C_ + dimension of _C<sup>1</sup>_

### Exercise 2.3.17

> Let _S_ be a subset of _K<sup>s</sup>_ and assume that {11110000, 00001111, 10000001} is a basis for _C<sup>1</sup>_. Find the number of words in _C_ = _\<S\>_

2<sup>5</sup>

### Exercise 2.3.18

> Theorem 2.3.14 also holds in _R<sup>n</sup>_. In _R<sup>n</sup>_ every vector can be written uniquely as the sum of a vector in _\<S\>_ and a vector in _S<sup>1</sup>_, and the zero vector is the only vector _\<S\>_ and _S<sup>1</sup>_ have in commmon. (For example in _R<sup>3</sup>_ take _\<S\>_ to be the xy-plane and _S<sup>1</sup>_ the axis). Use _S_ = {000, 101} in _K<sup>3</sup>_ to show that this is not the case in general in _K<sup>n</sup>_

_\<S\>_ = {000, 101}
_C<sup>1</sup>_ = _S<sup>1</sup>_ = {000, 010, 101, 111}
_B_ = {101}

### Exercise 2.3.23 (b)

> Find the number of different bases for _K<sup>n</sup_ for each code _C_ = _\<S\>_ for

<!-- -->

> b\. _S_ = {1010, 0101, 1111}

### Exercise 2.4.1 (b, c)

> Find the product of each pair of the following matrices whenever the product is defined.

```
| 0101 |   | 110110 |   | 110000 |
| 1001 | x | 011011 | = | 011101 |
| 1100 |   | 101101 |   | 101101 |
           | 101011 |
```

### Exercise 2.4.2

> Find 2 x 2 matrices A and B over K such that AB != BA

```
| 01 |   | 10 |   | 00 |
| 11 | x | 00 | = | 10 |
```

```
| 10 |   | 01 |   | 01 |
| 00 | x | 11 | = | 00 |
```

### Exercise 2.4.3

> Find 2 x 2 matrices A and B over K, both different from the zero matrix 0, such that AB = 0

```
| 01 |   | 10 |   | 00 |
| 00 | x | 00 | = | 00 |
```

### Exercise 2.4.4

> Find 2 x 2 matrices A, B and C over K such that AB = AC but B != C

```
| 11 |   | 10 |   | 11 |
| 01 | x | 01 | = | 01 |
```

```
| 11 |   | 01 |   | 11 |
| 01 | x | 01 | = | 01 |
```

### Exercise 2.4.6 (b)

```
| 1001 |
| 1100 |
| 0101 |

R2 <-> R3

| 1001 |
| 0101 |
| 1100 |

R3 + R1

| 1001 |
| 0101 |
| 0101 |

R3 + R2 

| 1001 |
| 0101 |
| 0000 |
```
