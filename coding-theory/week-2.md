# Coding Theory Homework

## Week 2 (Section 1.5 - 1.8)

### Exercise 1.6.2 (d, e, g)

> Calculate ϕ<sub>.97</sub>(v, w) for each fo the following pairs of _v_ and _w_.

> \d. v = 00000, w = 00000

ϕ<sub>.97</sub>(00000, 00000) = (.97<sup>5</sup>) = 0.8587340257

> \e. v = 1011010, w = 0000010

ϕ<sub>.97</sub>(1011010, 0000010) = (.97<sup>4</sup>)*(.03<sup>3</sup>) = 0.00002390290587

> \g. v = 111101, w = 000010

ϕ<sub>.97</sub>(111101, 000010) = (.97<sup>0</sup>)*(.03<sup>6</sup>) = 0.000000000729

### Exercise 1.6.9

> Which of the codewords 110110, 110101, 000111, 101000 is most likely to have been sent if w = 011001 is received.

| v      | d               |
| ---    | ---             |
| 011001 |                 |
| 110110 | 5               |
| 110101 | 4               |
| 000111 | 4               |
| 101000 | 3 <- smallest d |

101000 has the smallest number of disagreements with w = 011001 and is thus the codeword that was most likely sent.

### Exercise 1.6.10

> In Theorem 1.6.3 we assume that 1/2 < p < 1. What would change in the statement of Theorem 1.6.3 if we replace the assumption with 

> \a. 0 < p < 1/2  
> \b. p = 1/2

### Exercise 1.7.1

> Show that if v is a word in K<sup>n</sup> then v + v = 0

because both 0 + 0 = 0 and 1 + 1 = 0 in K. Any digit within v when added to itself will either be 0 + 0 or 1 + 1 both resulting in 0. This means that when v is added to itself all digits will have the result of 0 and thus v + v = 0.

### Exercise 1.7.2

> Show that if v and w are words in K<sup>n</sup> and v + w = 0 then v = w

As in the above exercise, if v and w are the same then the addition will result in 0. If any digit within v and w is not the same then the addition of those digits will be either 0 + 1 = 1, or 1 + 0 = 1. This means that if any digit within v or w does not match that the result will never be 0.

### Exercise 1.8.1

> Compute the weight of each of the following words and the distance between each pair of them: v<sub>1</sub> = 1001010, v<sub>2</sub> = 0110101, v<sub>3</sub> = 0011110, v<sub>4</sub> = v<sub>2</sub> + v<sub>3</sub>

|               | codeword                    | weight | __distance__ | v<sub>1</sub> | v<sub>2</sub> | v<sub>3</sub> | v<sub>4</sub> |
| --------      | --------------------------- | ------ | ------------ | ------------- | ------------- | ------------- | ------------- |
| v<sub>1</sub> | 1001010                     | 3      |              | 0             | 7             | 3             | 3             |
| v<sub>2</sub> | 0110101                     | 4      |              | 7             | 0             | 4             | 4             |
| v<sub>3</sub> | 0011110                     | 4      |              | 3             | 4             | 0             | 3             |
| v<sub>4</sub> | 0110101 + 0011110 = 0101011 | 4      |              | 3             | 4             | 3             | 0             |

### Exercise 1.8.2

> Let u = 01011, v = 11010, w = 01100. Compare each of the following pairs in quantities.
>
> \a. wt(v + w), and wt(v) + wt(w)

wt(11010 + 01100) = wt(10110) = 3  
wt(11010) + wt(01100) = 3 + 2 = 5  

> \b. d(v,w), and d(v,u) + d(u,w)

d(v,w) = d(11010, 01100) = 2  
d(v,u) + d(u,w) = d(11010, 01011) + d(01011, 01100) = 2 + 3 = 5  

### Exercise 1.8.3

> Construct an example K<sup>5</sup> of each of the eleven rules above.

> \1. 0 <= wt(v) <= n

wt(00000) = 0  
wt(10101) = 3  
wt(11111) = 5  

> \2. wt(0) = 0

wt(00000) = 0  

> \3. if wt(v) = 0, then v = 0

wt(00000) = 0  
wt(00001) = 1  

> \4. 0 <= d(v,w) <= n

d(00000, 11111) = 5  
d(10101, 01010) = 5  
d(01101, 01101) = 0  

> \5. d(v,v) = 0

d(00000, 00000) = 0  
d(01111, 01111) = 0  
d(10111, 10111) = 0  

> \6. if d(v,w) = 0, then v = w

d(01010, 01010) = 0  
d(10111, 10110) = 1  

> \7. d(v,w) = d(w, v)

d(01101, 11011) = 3  
d(11011, 01101) = 3  

> \8. wt(v + w) <= wt(v) + wt(w)

wt(11100 + 11110) = wt(00010) = 1  
wt(11100) + wt(11110) = 3 + 4 = 7  

> \9. d(v, w) <= d(v, u) + d(u, w)

d(10101, 11001) = 2  
d(10101, 00101) + d(00101, 11001) = 1 + 3 = 4  

> \10. wt(av) = a * wt(v)



> \11. d(av,aw) = a * d(v,w)