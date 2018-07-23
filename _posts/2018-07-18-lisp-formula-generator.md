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

### Attempt #2 (Latest)

{% highlight common_lisp %}
;;; title: Attempt #2
;;;  date: 2018-07-23

;;; Defining the variables
(defvar cell 'A1)
(defvar clean_url "")
(defvar final_formula "")

;;; THE THREE MOST IMPORTANT FUNCTIONS/MACROS IN THIS CODE
;;  args takes a list and gives us a comma-separated string
(defun args (&rest args)
  (format nil "~{~a~^,~^ ~}" args))
;;  f  stands for formula. It returns a typical formula
(defmacro f (tag &rest inside)
  `(format nil "~a(~a)" ,tag (args ,@inside)))
;;  q stands for quote. It will surround a string in double-quotes
(defun q (quote)
  (format nil "\"~a\"" quote))

;;; THESE FUNCTIONS GIVE US FORMULAS FOR CERTAINS TASKS
;;  sub creates a SUBSTITUTE formula
(defun sub (str find &optional (replace (q "")))
  (f 'substitute (args str find replace)))
;;  creates a FIND formula to find the first / in a string.
;;  It optionally gives us a tail argument to stick on the end
;;   of the string.
(defun find_slash (loc &key (tail ""))
  (format nil "~a~a"
          (f 'find (q "/") loc)
          tail))
;; remove_after_slash is what turns our clean URL into a domain name
(defun remove_after_slash (str)
  (f 'left str (find_slash str :tail " - 1")))

;;; THE MAIN CODE
;; make clean_url not have www. or any http prefix
(setq clean_url (sub (sub (sub cell (q "www.")) (q "http://")) (q "https://")))

;; Create the formula
(setq final_formula (f 'if
                       (f 'isnumber (find_slash clean_url)) ;; if this condition
                       (remove_after_slash clean_url)       ;; return this
                       clean_url))                          ;; else return this

;; Print the formula. We use princ so backslashes do not
;  not get printed out.
(princ final_formula)

{% endhighlight %}

### Attempt #1

{% highlight common_lisp %}
;;; title: Attempt #1
;;;  date: 07-18-2018

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
