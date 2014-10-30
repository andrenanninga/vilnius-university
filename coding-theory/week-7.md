# Coding Theory Homework

## Week 7 (Section 2.5 - 2.6)

### Exercise 2.5.3 (b, d)

> Use algorithm 2.5.1 to find a basis for _C_ = _<S\>_ for each of the following set _S_.

<!-- -->

> b\. _S_ = {1010, 0101, 1111}

```
┌ 1010 ┐
│ 0101 │
└ 1111 ┘

-- add row 1 (1010) to row 3 (1111)

┌ 1010 ┐
│ 0101 │
└ 0101 ┘

-- add row 2 (0101) to row 3 (0101)

┌ 1010 ┐
│ 0101 │
└ 0000 ┘

-- RREF
```

_C_ = _<S\>_ = {1010, 0101}

> d\. {1000, 0100, 0010, 0001}

```
┌ 1000 ┐
│ 0100 │
│ 0010 │
└ 0001 ┘

-- RREF
```

_C_ = _<S\>_ = {1000, 0100, 0010, 0001}

### Exercise 2.5.6 (b, d)

> Use algorithm 2.5.4 to find a basis for _C_ = _<S\>_ for each set _S_ in Exercise 2.5.3 and compare answers

<!-- -->

> b\. _S_ = {1010, 0101, 1111}

```
┌ 101 ┐
│ 011 │
│ 101 │
└ 011 ┘

-- add row 1 (101) to row 3 (101) 


┌ 101 ┐
│ 011 │
│ 000 │
└ 011 ┘

-- add row 2 (011) to row 4 (011)

┌ 101 ┐
│ 011 │
│ 000 │
└ 000 ┘

-- RREF
```

The leading columns in the RREF are column 1 and 2. Taking these columns from the original matrix produces the basis _C_ = _<S\>_ = {1010, 0101}

> d\. {1000, 0100, 0010, 0001}

```
┌ 1000 ┐
│ 0100 │
│ 0010 │
└ 0001 ┘

-- RREF
```

The leading columns are 1,2,3 and 4. These produces the basis _C_ = _<S\>_ = {1000, 0100, 0010, 0001}

### Exercise 2.5.10 (b, d)

> Use algorithm 2.5.7 to find a basis for _C<sup>⊥</sup>_ for each of the codes _C_ = _<S\>_ where

<!-- -->

> b\. _S_ = {1010, 0101, 1111}

```
-- RREF 

┌ 1010 ┐
│ 0101 │
└ 0000 ┘

-- Matrix G

┌ 10╎10 ┐
└ 01╎01 ┘

-- k = 2
-- Matrix X

┌ 10 ┐
└ 01 ┘

-- Matrix H

┌ 10 ┐
│ 01 │
│ 10 │
└ 01 ┘
```

The basis _C<sup>⊥</sup>_ = {1010, 0101}

> d\. _S_ = {1000, 0100, 0010, 0001}

```
-- RREF 

┌ 1000 ┐
│ 0100 │
│ 0010 │
└ 0001 ┘

-- Matrix G

┌ 1000╎ ┐
│ 0100╎ │
│ 0010╎ │
└ 0001╎ ┘

-- k = 4
-- Matrix X

[ ]

-- Matrix H (4 x 0)

[ ]
```

The basis _C<sup>⊥</sup>_ = {}

### Exercise 2.6.4 (b)

> Determine whether each of the following is a generator matrix for some linear code.

a(1001101001) + b(1101000101) + c(0111001011) + d(1000010111) + e(1010001110) = 0000000000

```
a + b + d + e = 0
        b + c = 0
        c + e = 0
    a + b + c = 0
            a = 0
            d = 0
    a + c + e = 0
    b + d + e = 0
    c + d + e = 0
a + b + c + d = 0

...
```

The matrix is linearly independent and is therefore according to theorem 2.6.1 a generator for some linear code _C_.

### Exercise 2.6.5 (b)

> Find a generator matrix in RREF for each of the following codes.

<!-- -->

> b\. C = {0000, 1001, 0110, 1111}

```
┌ 0000 ┐
│ 1001 │
│ 0110 │
└ 1111 ┘

-- Swap row 1 with row 2

┌ 1001 ┐
│ 0000 │
│ 0110 │
└ 1111 ┘

-- Add row 1 to row 4

┌ 1001 ┐
│ 0000 │
│ 0110 │
└ 0110 ┘

-- Swap row 2 with row 3

┌ 1001 ┐
│ 0110 │
│ 0000 │
└ 0110 ┘

-- Add row 2 to row 4

┌ 1001 ┐
│ 0110 │
│ 0000 │
└ 0000 ┘

-- RREF

-- Generator matrix

┌ 1001 ┐
└ 0110 ┘
```

### Exercise 2.6.10 (b)

> For each of the following generating matrices, encode the given messages

<!-- -->

> b\.

```
┌ 1000111 ┐
│ 0100101 │
└ 0010011 ┘
```

```
v = 000

0∙1000111 + 0∙0100101 + 0∙0010011 =
  0000000 +   0000000 +   0000000 = 0000000
```

```
v = 100

1∙1000111 + 0∙0100101 + 0∙0010011 =
  1000111 +   0000000 +   0000000 = 1000111
```

```
v = 111

1∙1000111 + 1∙0100101 + 1∙0010011 =
  1000111 +   0100101 +   0010011 = 1110001
```

### Exercise 2.6.11

> Assign messages to the words in _K<sup>3</sup>_ as follows:

| 000   | 100   | 010   | 001   | 110   | 101   | 011   | 111   |
| ---   | ---   | ---   | ---   | ---   | ---   | ---   | ---   |
| __A__ | __B__ | __E__ | __H__ | __M__ | __R__ | __T__ | __W__ |

```
┌ 10110 ┐
│ 01011 │
└ 00101 ┘
```

```
B (100)    1∙10110 + 0∙01011 + 0∙00101 = 10110
E (010)    0∙10110 + 1∙01011 + 0∙00101 = 01011
T (011)    0∙10110 + 1∙01011 + 1∙00101 = 01110
H (001)    0∙10110 + 0∙01011 + 1∙00101 = 00101
E (010)    0∙10110 + 1∙01011 + 0∙00101 = 01011
R (101)    1∙10110 + 0∙01011 + 1∙00101 = 10011
E (010)    0∙10110 + 1∙01011 + 0∙00101 = 01011
```