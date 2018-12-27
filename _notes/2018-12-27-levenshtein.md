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

| Word 1 | Word 2 | Levenshtein Difference | Explanation                         |
| ------ | ------ | ---------------------- | ----------------------------------- |
| Cat    | Bat    | 1                      | 'C' and 'B' are different.          |
| Plain  | Plane  | 2                      | The last two letters are different. |

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

;;; Convienience function
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


print(levenshtein("CaT", "cat"))
# 2

print(levenshtein("CaT", "cat", caseInsensitive=True))
# # 0

print(levenshtein("apple", "orange"))
# 5
```
