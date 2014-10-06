# Coding Theory Homework

## Week 4 (Section 1.11 - 1.12)

### Exercise 1.11.2b

> Let C = {001, 101, 110}. Determine wether _C_ will detect the error pattern 001

001 + 001 = 000  
101 + 001 = 100  
110 + 001 = 111  

None of the three words 000, 100 or 111 is in C so detects the error pattern 001.

### Exercise 1.11.4

> Which error patterns will the code _C_ = K<sup>n</sup> detect?

None, since _C_ contains all words there will always be atleast one sum that will be in _C_.

### Exercise 1.11.5

> 1\. Let _C_ be a code which contains the zero word as a codeword. Prove that if the error pattern u is a codeword, then _C_ will not detect u.

_C_ = {000, 010, 110}  
u = 010  

000 + 010 = 010  
010 + 010 = 000  
110 + 010 = 100  

When adding the codeword u to the zero word the resulting word will always be the same as the codeword u itself. Since this codeword is in _C_ the error pattern is not detected.

> 2\. Prove that no code will detect the zero pattern u = 0

As with the previous exercise. When adding the zero word to a codeword the result will always be the codeword itself. Since atleast one of sums is in _C_, _C_ does not detect the error pattern 0.

### Exercise 1.11.7b

> Determine the error patterns detected by each code in Exercise 1.9.7 by using the IMLD tables constructed there.

_C_ = {000, 001, 010, 011}

| w   | 000 + w | 001 + w | 010 + w | 011 + w | v   |
| --- | ------- | ------- | ------- | ------- | --- |
| 000 | 000*    | 001     | 010     | 011     | 000 |
| 001 | 001     | 000*    | 011     | 010     | 001 |
| 010 | 010     | 011     | 000*    | 001     | 010 |
| 011 | 011     | 010     | 001     | 000*    | 011 |
| 100 | 100*    | 101     | 110     | 111     | 000 |
| 101 | 101     | 100*    | 111     | 110     | 001 |
| 110 | 110     | 111     | 100*    | 101     | 010 |
| 111 | 111     | 110     | 101     | 100*    | 011 |

The error patterns for the above IMLD are {100,101,110,111}.

### Exercise 1.11.10b

> Find the error patterns detected by each of the following codes and compare your answer with those in exercise 1.11.7

_C_ = {000, 001, 010, 011}

000 + 000 = 000  
000 + 001 = 001  
000 + 010 = 010  
000 + 011 = 011  
001 + 001 = 000  
001 + 010 = 011  
001 + 011 = 010  
010 + 010 = 000  
010 + 011 = 001  
011 + 011 = 000  

The set of error patterns that cannot be detected in _C_ is {000, 001, 010, 011}. Therefore All error patterns in _K<sup>n</sup>_\{000, 001, 010, 011} or {100, 101, 110, 111}.

### Exercise 1.11.12b,c,g,h

> Find the distance of each of the following codes

> b\. _C_ = {000, 001, 010, 011}

d(000, 001) = 1  
d(000, 010) = 1  
d(000, 011) = 2  
d(001, 010) = 2  
d(001, 011) = 1  
d(010, 011) = 1  

The distance for _C_ is d = 1.

> c\. _C_ = {0000, 0001, 1110}

d(0000, 0001) = 1  
d(0000, 1110) = 3  
d(0001, 1110) = 4  

The distance for _C_ is d = 1.

> g\. _C_ = {00000, 11110, 01111, 10001}

d(00000, 11110) = 4  
d(00000, 01111) = 4  
d(00000, 10001) = 2  
d(11110, 01111) = 2  
d(11110, 10001) = 4  
d(01111, 10001) = 4  

The distance for _C_ is d = 2.

> h\. _C_ = {000000, 101010, 010101, 111111}

d(000000, 101010) = 3  
d(000000, 010101) = 3  
d(000000, 111111) = 6  
d(101010, 010101) = 6  
d(101010, 111111) = 3  
d(010101, 111111) = 3  

The distance for _C_ is d = 3.

### Exercise 1.11.13

> Find the distance of the code formed by adding a parity check diget to _K<sup>n</sup>_

### Exercise 1.11.19b,c,g,h

> For each code _C_ in exercise 1.11.12 find the error patterns which Theorem 1.11.14 guarantees _C_ will detect.

> b\. _C_ = {000, 001, 010, 011}

The distance for _C_ is d = 1.

Since d - 1 = 0 the theorem does not help in determining which error patterns _C_ will detect.

> c\. _C_ = {0000, 0001, 1110}

The distance for _C_ is d = 1.

Same as above

> g\. _C_ = {00000, 11110, 01111, 10001}

The distance for _C_ is d = 2.


### Exercise 1.11.20



### Exercise 1.12.5 (use u = 010 in place of u = 100)
### Exercise 1.12.7
### Exercise 1.12.8
### Exercise 1.12.12i:b
### Exercise 1.12.12ii:b,c,g,h
### Exercise 1.12.14b