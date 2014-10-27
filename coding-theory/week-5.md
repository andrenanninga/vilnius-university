# Coding Theory Homework

## Week 5 (Section 2.1 - 2.2)

### Exercise 2.1.1b,c,g,h

> Determine which of the following codes are linear

<!-- -->

> b\. _C_ = {000, 001, 010, 011}

000 + 001 = 001  
000 + 010 = 010  
000 + 011 = 011  
001 + 010 = 011  
001 + 011 = 010  
010 + 011 = 001  

_C_ is linear.

> c\. _C_ = {0000, 0001, 1110} 

0000 + 0001 = 0001  
0000 + 1110 = 1110  
0001 + 1110 = 1111 — __Not in C__

_C_ is not linear.

> g\. _C_ = {00000, 11110, 01111, 10001}

00000 + 11110 = 11110  
00000 + 01111 = 01111  
00000 + 10001 = 10001  
11110 + 01111 = 10001  
11110 + 10001 = 01111  
01111 + 10001 = 11110  

_C_ is linear.

> h\. _C_ = {000000, 101010, 010101, 111111}

000000 + 101010 = 101010  
000000 + 010101 = 010101  
000000 + 111111 = 111111  
101010 + 010101 = 111111  
101010 + 111111 = 010101  
010101 + 111111 = 101010  

_C_ is linear.

### Exercise 2.1.3b,c,g,h

> Find the distance of each linear code in Exercise 2.1.1. Check answers with Exercise 1.11.12

<!-- -->

> b\. _C_ = {000, 001, 010, 011}

The distance of _C_ is d = 1.

> g\. _C_ = {00000, 11110, 01111, 10001}

The distance of _C_ is d = 2.

> h\. _C_ = {000000, 101010, 010101, 111111}

The distance of _C_ is d = 3.

### Exercise 2.1.4

> Proof that the distance of a linear code is the weight of the nonzero codeword of least weight

_C_ = {000000, 101010, 010101, 111111}

d(000000, 101010) = 3  
d(000000, 010101) = 3  
d(000000, 111111) = 6  
d(101010, 010101) = 6  
d(101010, 111111) = 3  
d(010101, 111111) = 3  

The distance of _C_ is d = 3

### Exercise 2.2.3b,d

> For each of the following sets _S_, list the elements of linear code for \<S\>

<!-- -->

> b\. _S_ = {1010, 0101, 1111}

0000  
1010  
0101  
1111  
1010 + 0101 = 1111  
1010 + 1111 = 0101  
0101 + 1111 = 1010  
1010 + 0101 + 1111 = 0000  

_C_ = _\<S\>_ = {0000, 1010, 0101, 1111}

> d\. _S_ = {1000, 0100, 0010, 0001}

0000  
1000  
0100  
0010  
0001  
1000 + 0100 = 1100  
1000 + 0010 = 1010  
1000 + 0001 = 1001  
0100 + 0010 = 0110  
0100 + 0001 = 0101  
0010 + 0001 = 0011  
1000 + 0100 + 0010 = 1110  
1000 + 0100 + 0001 = 1101  
1000 + 0010 + 0001 = 1011  
0100 + 0010 + 0001 = 0111  
1000 + 0100 + 0010 + 0001 = 1111  

_C_ = _\<S\>_ = {0000, 1000, 0100, 0010, 0001, 1100, 1010, 1001, 0110, 0101, 0011, 1110, 1101, 1011, 0111, 1111}

### Exercise 2.2.4

> Construct examples in _K<sup>s</sup>_ of each of the following rules

<!-- -->

> a\. _u · (v + w) = u · v + u · w_

_u_ = 1110  
_v_ = 0010
_w_ = 1000

```
1110 · (0010 + 1000) = 1110 · 0010 + 1110 · 1000
                     = 0010        + 1000
                     = 1010
```

> b\. _a(v · w) = (av) · w = v · (aw)_



### Exercise 2.2.5

### Exercise 2.2.7b,d

> Find the dual code _C<sup>1</sup>_ for each of the codes _C_ = _\<S\>_ in Exercise 2.2.3

<!-- -->

> b\. _S_ = {1010, 0101, 1111}

```
1010 = 1·x + 0·y + 1·z + 0·w
     = x + z = 0

0101 = 0·x + 1·y + 0·z + 1+w
     = y + w

1111 = 1·x + 1·y + 1·z + 1+w
     = x + y + z + w
```

_C<sup>1</sup>_ = _S<sup>1</sup>_ = {0000, 0101, 1010, 1111}

> d\. _S_ = {1000, 0100, 0010, 0001}

```
1000 = 1·x + 0·y + 0·z + 0·w
     = x = 0

0100 = 0·x + 1·y + 0·z + 0·w
     = x = 0

0010 = 0·x + 0·y + 1·z + 0·w
     = x = 0

0001 = 0·x + 0·y + 0·z + 1·w
     = x = 0

_C<sup>1</sup>_ = _S<sup>1</sup>_ = {0000}

### Exercise 2.2.8

> Find an example of a nonzero word such that _v_ · _v_ = 0. What can say about the weight of such a word.

Such a word does not exist.