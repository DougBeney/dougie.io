---
title: Levenshtein distance
date: 2018-12-27
icon: code
category: Computer-Science
tags: [Coding, Algorithms]
---

The levenshtein formula calculates the similarity in two strings.

It will return a value corresponding with the amount of letter changes required to become the other string.

```
'0' means the two strings are exactly the same.
'1' means a single letter is different between the two strings
'2' means two letters are different between the two strings.
...and so on.
```

## Examples:

| Word 1 | Word 2 | Levenshtein Distance | Explanation                         |
| ------ | ------ | -------------------- | ----------------------------------- |
| Cat    | Bat    | 1                    | 'C' and 'B' are different.          |
| Plain  | Plane  | 2                    | The last two letters are different. |
| Apple  | Apple  | 0                    | No difference                       |

## The formula

![Formula](/static/img/blog/levenshtein/formula.svg)

Here are what the letters in the formula represent:

```
a = string #1
b = string #2
i = number of letters in string #1
j = number of letters in string #2
ai = Refers to a specific letter in string #1, using the i variable
bj = Refers to a specific letter in string #2, using the j variable
```

**Source:** [Wikipedia](https://en.wikipedia.org/wiki/Levenshtein_distance)

A recursive formula for levenshtein distance. A "recursive formula" means that you are running the same formula inside the formula - you can see that there are three levenshtein formulas (labeled as "lev") inside the levenshtein formula.

**The formula in plain english:**

The first thing you do is check whether `i` or `j` is equal to zero. If so, that particular levenshtein value will be the bigger number (max) of `i` or `j`.

If neither `i` or `j` is equal to zero, you must run the levenshtein formula in three separate variations. For the first two variations, you add 1 to the result. In the last variation you will add 1 only if the letters `ai` and `bj` are not equal.

Whichever variation produces the smallest number (min) is your levenshtein distance.

**The three variations mentioned:**

- In the first variation of the levinshtein distance you plug in the same values except you subtract 1 from `i`.
- In the second variation, you subtract 1 from `j`.
- In the final variation, you subtract 1 from both `i` and `j`.

## Implementing this algorithm in code

### In Common Lisp:

```common-lisp
;;; The main function
;; a = string #1
;; b = string #2
;; i = current index in string #1
;; j = current index in string #2
(defun lev (a b i j)
  (if (= (min i j) 0)
      (max i j)
      ;;; otherwise.
      (min (+ (lev a b (- i 1) j) 1)
           (+ (lev a b i (- j 1)) 1)
           (+ (lev a b (- i 1) (- j 1))
              (if (eq (char a (- i 1))
                      (char b (- j 1)))
                  0
                  1)))))

;;; Convenience function
(defun levenshtein (a b &key (case-insensitive nil))
  (when case-insensitive
    (setq a (string-downcase a))
    (setq b (string-downcase b)))
  (lev a b (length a) (length b)))

;;; Example usage
(levenshtein "CaT" "cat")
                                        ; 2

(levenshtein "CaT" "cat" :case-insensitive t)
                                        ; 0

(levenshtein "apple" "orange")
                                        ; 5
```

### In Python

```python
def lev(a, b, i, j):
    if min(i, j) == 0:
        return max(i, j)
    return min(
        lev(a, b, i - 1, j) + 1,
        lev(a, b, i, j - 1) + 1,
        lev(a, b, i - 1, j - 1) + (0 if a[i-1] == b[j-1] else 1))


def levenshtein(a, b, caseInsensitive=False):
    if caseInsensitive:
        a = a.lower()
        b = b.lower()
    return lev(a, b, len(a), len(b))


levenshtein("CaT", "cat")
# 2

levenshtein("CaT", "cat", caseInsensitive=True)
# 0

levenshtein("apple", "orange")
# 5
```
