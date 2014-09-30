# Coding Theory Homework

## Week 3 (Section 1.5 - 1.8)

### Exercise 1.9.5

> |M| = 2, n = 3, and _C_ = {001, 101}. If v = 001 is sent, when will IMLD conclude this correctly, and when will IMLD incorrectly conclude that 101 was sent.

| w   | 001 + w | 101 + w | v   |
| --- | ------- | ------- | --- |
| 000 | 001*    | 101     | 001 |
| 001 | 000*    | 100     | 001 |
| 010 | 011*    | 111     | 001 |
| 011 | 010*    | 110     | 001 |
| 100 | 101     | 001*    | 101 |
| 101 | 100     | 000*    | 101 |
| 110 | 111     | 011*    | 101 |
| 111 | 110     | 010*    | 101 |

### Exercise 1.9.6

> Let |M| = 3 and n = 3. For each word w in K<sup>3</sup> that could be received, find the word v in de code C = {000, 001, 110} which IMLD will conclude was sent.

| w   | 000 + w | 001 + w | 110 + w | v   |
| --- | ------- | ------- | ------- | --- |
| 000 | 000*    | 001     | 110     | 000 |
| 001 | 001     | 000*    | 111     | 001 |
| 010 | 010     | 011     | 100     | --- |
| 011 | 011     | 010*    | 101     | 001 |
| 100 | 100     | 101     | 010     | --- |
| 101 | 101     | 100*    | 011     | 001 |
| 110 | 110     | 111     | 000*    | 110 |
| 111 | 111     | 110     | 001*    | 110 |

### Exercise 1.9.7b

> Construct the IMLD table for each of the following codes.
>
> \\b. C = {000, 001, 010, 011}

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

### Exercise 1.10.2b

> Suppose p = .90, |M| = 2, n = 3, C = {001, 101}, as in Exercise 1.9.5
>
> \\b. if v = 101 is sent, find the probability that IMLD will correctly conclude this after one transaction.

_L_(101) = {100, 101, 110, 111}

Φ<sub>p</sub>(C, 101) = Φ<sub>p</sub>(101,100) + Φ<sub>p</sub>(101, 101) + Φ<sub>p</sub>(101, 110) + Φ<sub>p</sub>(101, 111)  
     = p<sup>2</sup>(1 - p) + p<sup>3</sup> + p(1 - p)<sup>2</sup> + p<sup>2</sup>(1 - p)  
     = p<sup>3</sup> + 2p<sup>2</sup>(1 - p) + p(1 - p)<sup>2</sup>  
     = .90 (assuming p = .90)  

### Exercise 1.10.4

> Suppose p = .90 and C = {000, 001, 110}, as in Exercise 1.9.6. If v = 110 is sent, find the probability that IMLD will correctly conclude this, and the probability that IMLD will incorrectly conclude that 000 was sent.

_L_(110) = {110, 111}

Φ<sub>p</sub>(C, 110) = Φ<sub>p</sub>(110, 110) + Φ<sub>p</sub>(110, 111)  
     = p<sup>3</sup> + p<sup>2</sup>(1 - p)  
     = 0.81 (assuming p = 0.90)  

Φ<sub>p</sub>(110, 000)  
     = p(1 - p)<sup>2</sup>  
     = 0.009 (assuming p = 0.90)  


### Exercise 1.10.5

> For each of the following codes _C_ calculate Φ<sub>p</sub>(C, v) for each v in C using p = .90. (The IMLD tables for these codes were constructed in Exercise 1.9.7)

> \\b. C = {000, 001, 010, 011}

_L_(000) = {000, 100}

Φ<sub>p</sub>(C, 000) = Φ<sub>p</sub>(000, 000) + Φ<sub>p</sub>(000, 100)
     = p<sup>3</sup> + p<sup>2</sup>(1 - p)  
     = 0.81 (assuming p = 0.90)  


_L_(001) = {001, 101}

Φ<sub>p</sub>(C, 001) = Φ<sub>p</sub>(001, 001) + Φ<sub>p</sub>(001, 101)
     = p<sup>3</sup> + p<sup>2</sup>(1 - p)  
     = 0.81 (assuming p = 0.90)  
     
_L_(010) = {010, 110}

Φ<sub>p</sub>(C, 010) = Φ<sub>p</sub>(010, 010) + Φ<sub>p</sub>(010, 110)
     = p<sup>3</sup> + p<sup>2</sup>(1 - p)  
     = 0.81 (assuming p = 0.90)  
     
_L_(011) = {011, 111}

Φ<sub>p</sub>(C, 011) = Φ<sub>p</sub>(011, 011) + Φ<sub>p</sub>(011, 111)
     = p<sup>3</sup> + p<sup>2</sup>(1 - p)  
     = 0.81 (assuming p = 0.90)  
     