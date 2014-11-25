# Coding Theory Homework

## Week 10 (Section 2.11 - 2.12)

### Exercise 2.11.2(b)

> Let _C_ be the code of Example 2.10.5. Use the procedure for CMLD just outlined to decode each of the following received words.

<!-- -->

> _(b)_ _w_ = `001001`

`001001` occurs in the second coset of the the eight cosets listed in Example 2.10.5. this coset consists of:

```
100000
000110
110011
101111
010101
001001
111100
011010
```

The word of the least weight in this cosets is `100000`

_v_ = `001001` + `100000` = `101001`

We can conclude that `101001` is a most likely codeword sent.

### Exercise 2.11.8(b)

> Construct an SDA assuming _IMLD_ for each of the codes in Exercise 2.10.6

<!-- -->

> _(b)_ _C_ = {`0000`, `1010`, `1101`, `0111`}

```
| 0000 |
| 1010 |
| 1101 |
| 0111 |

Move row 2 to position 1

| 1010 |
| 0000 |
| 1101 |
| 0111 |

Add row 1 to row 3

| 1010 |
| 0000 |
| 0111 |
| 0111 |

Move row 3 to position 2

| 1010 |
| 0111 |
| 0000 |
| 0111 |

Add row 2 to row 4

| 1010 |
| 0111 |
| 0000 |
| 0000 |

RREF

| 1010 |
| 0111 |

Matrix G

| 10╎10 |
| 01╎11 |

Matrix X

| 10 |
| 11 |

Matrix H

| 10 |
| 11 |
| 10 |
| 01 |
```

#### Cosets

```
0000    1000    0100    0001
1010    0010    1110    1011
1101    0101    1001    1100
0111    1111    0011    0110
```

#### SDA

| Error patterns | Syndrome uH |
| -------------- | ----------- |
| `0000`         | `00`        |
| `1000*`        | `10*`       |
| `0100`         | `11`        |
| `0001`         | `01`        |

### Exercise 2.11.17(b)

> Repeat the decoding in Exercise 2.11.2 using the SDA in Example 2.11.7

<!-- -->

> (b) _w_ = `001001`

#### SDA

| Error patterns | Syndrome uH |
| -------------- | ----------- |
| `000000`       | `000`       |
| `100000`       | `110`       |
| `010000`       | `011`       |
| `001000`       | `111`       |
| `000100`       | `100`       |
| `000010`       | `010`       |
| `000001`       | `001`       |
| `000101`       | `101`       |

```
Matrix H

| 110 |
| 011 |
| 111 | 
| 100 |
| 010 |
| 001 |
```

_wH_ = `110`  
coset leader _u_ = `100000`  
_v_ = `001001` + `100000` = `101001`

### Exercise 2.11.19 
##### only for code from 2.11.8(b) using words w from 2.11.19(a)

> For each of the following codes, use the SDA to decode the given received words. (The SDA's for these codes were constructed in Exercises 2.11.8 and 2.11.9)

<!-- -->

> _(b)_ _C_ = {0000, 1010, 1101, 0111}

#### SDA

| Error patterns | Syndrome uH |
| -------------- | ----------- |
| `0000`         | `00`        |
| `1000*`        | `10*`       |
| `0100`         | `11`        |
| `0001`         | `01`        |

```
Matrix H

| 10 |
| 11 |
| 10 |
| 01 |
```

> (i) _w_ = `1110`

_wH_ = `11`  
coset leader _u_ = `0100`  
_v_ = `1110` + `0100` = `1010`

> (ii) _w_ = 1001  

_wH_ = `11`  
coset leader _u_ = `0100`  
_v_ = `1001` + `0100` = `1101`

> (iii) _w_ = 0101  

_wH_ = `10`  
Syndrome uH = `10` has an astrisk so we should ask for retransmission.  
~~coset leader _u_ = 1000~~  
~~_v_ = 0101 + 1000 = 1101~~

### Exercise 2.12.2 (only for 2.10.6(b))

> Calculate Φ<sub>p</sub>(C) for each of the codes in Exercises 2.10.6, 2.10.7, 2.10.8.

<!-- -->

> (b) _C_ = {`0000`, `1010`, `1101`, `0111`}

coset leaders = {`0000`, `1000`, `0100`, `0001`}

one coset leader of weight 0 and three of weight 1.

Φ<sub>p</sub>(C) = p<sup>3</sup> + 3p<sup>2</sup>(1 - p)