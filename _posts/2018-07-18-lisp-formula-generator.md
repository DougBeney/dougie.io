---
title: Using Lisp to Help With Tasks Such as...Creating Spreadsheet Formulas?
date: 2018-07-18
icon: code
category: Coding
tags: [Data-Science, Spreadsheets, Tech-Productivity-Tips, Coding]
---

Writing big Excel/Libreoffice formulas can be a pain.

They're all meant to be one line and unfortunately you're sometimes forced to duplicate big, repetitive code snippets (A programming no-no).

As an oppurtunity to further my Lisp skills, I decided to create a little script that could help generate one of these big formulas in a more managable way (Manageable in the sense that you can come back to the code and easily tweak it).

This is my first crack at this problem (a minimal viable version) and I plan to come back to it, tweak it, and make it more intuitive. Since I'm new to Lisp, I know there are a lot of things that could be improved.

The following Lisp code will generate an Excel/Libreoffice compatable formula that will extract the domain name from a URL.

[You can check out the formula that was generated here](/spreadsheet-formulas/domain-from-url/)

{% highlight common_lisp %}
(defvar cell         "A1") ;; The cell with the URL in it.
(defvar base_formula   "")
(defvar the_condition  "")
(defvar final_formula  "")

;; Remove http:// https:// and www.
(defun remove_prefixes ()
  (format nil
          "SUBSTITUTE(SUBSTITUTE(SUBSTITUTE(~a, \"www.\", \"\"), \"http://\", \"\"),\"https://\", \"\")"
          cell))

(defun find_the_slash (str &key (tail ""))
  (format nil "FIND(\"/\", ~a, 3)~a" str tail))

(defun remove_slashes (str)
  (format nil "LEFT(~a, ~a)" str (find_the_slash str :tail " - 1")))

(defun is_number (value)
  (format nil "ISNUMBER(~a)" value))

(defun myif (condition true false)
  (format nil "IF(~a, ~a, ~a)" condition true false))

;; Wrap this with that
(defun wrap (this that)
  (format nil that this))

(setq base_formula (remove_prefixes))

(setq the_condition (is_number (find_the_slash base_formula)))

(setq final_formula
      (myif the_condition (remove_slashes base_formula) base_formula))

(princ final_formula)

{% endhighlight %}
