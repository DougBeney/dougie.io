---
title: The Ultimate Guide To Using Tabs For Indentation In Emacs
date: 2018-07-16
icon: pencil-square
category: Coding
tags: [Coding, Emacs]
---

1. TOC
{:toc}

![Screenshot](/static/img/blog/tabs-in-emacs/screenshot.png)

## TR;DR: The full configuration:

{% highlight elisp %}
;;; START TABS CONFIG
;; Enable tabs and set prefered indentation width in spaces
;; (In this case the indent size is 2-spaces wide)
(setq-default indent-tabs-mode t)
(setq-default standard-indent 2)
(setq-default tab-width 2)

;; Make the backspace properly erase the tab instead of
;; removing 1 space at a time.
(setq backward-delete-char-untabify-method 'hungry)

;; Uncomment the below line after installing smart-tabs-mode
;;(smart-tabs-insinuate 'c 'javascript 'python)

;; Python tab support hook, as python.el frustratingly forces you to use spaces
;; Note that you'll need smart-tabs-mode for this to work
(add-hook 'python-mode-hook (lambda () (setq tab-width custom-tab-width)))

;; (OPTIONAL) Shift width for evil-mode users
;; For the vim-like motions of ">>" and "<<".
(setq-default evil-shift-width 2)

;; Visualize tabs as a pipe character - "|"
;; This will also show trailing characters as they are useful to spot.
(setq whitespace-style '(face tabs tab-mark trailing))
(custom-set-faces
 '(whitespace-tab ((t (:foreground "#636363")))))
(setq whitespace-display-mappings
	'((tab-mark 9 [124 9] [92 9]))) ; 124 is the ascii ID for '\|'
(global-whitespace-mode) ; Enable whitespace mode everywhere

;; Disable tabs and use spaces instead on Lisp and ELisp
(defun disable-tabs () (setq indent-tabs-mode nil))
(add-hook 'lisp-mode-hook 'disable-tabs)
(add-hook 'emacs-lisp-mode-hook 'disable-tabs)
;;; END TABS CONFIG
{% endhighlight %}

## Breaking It Down

### Using tabs for indentation and changing the indent size

{% highlight elisp %}
(setq-default indent-tabs-mode t)
(setq-default standard-indent 2)
(setq-default tab-width 2)
;(setq-default evil-shift-width 2)
{% endhighlight %}

The first three lines are important to make Emacs use tab indentation and to also set that indentation to a certain amount of spaces.

If you use Evil Mode, it's worth also settings `evil-shift-width` as well. You would just have to uncomment that fourth line.

### Highlight tabs

Something that I feel that is very important to have in an editor is a way to identify spaces and tabs easily. They are both whitespace characters that can easily be confused for eachother.

We will accomplish this by making tabs appear visible as a "\|" (pipe) character. If you want to highlight spaces too, please refer to [ErgoEmacs' article on making whitespace visible](http://ergoemacs.org/emacs/whitespace-mode.html).

{% highlight elisp %}
(global-whitespace-mode)
(setq whitespace-style '(face tabs tab-mark trailing))
(custom-set-faces
 '(whitespace-tab ((t (:foreground "#636363")))))

(setq whitespace-display-mappings
  '((tab-mark 9 [124 9] [92 9])))
{% endhighlight %}

I have separated the `whitespace-display-mappings` portion of the snippet with a newline because it is the more confusing-to-read part of it.

The first four lines of the snippet are pretty easy to understand.

1. First you enable `global-whitespace-mode`. This makes our configured whitespace visible in all buffers automatically.
2. Next, you're setting the whitespace style to show tabs and trailing whitespace. You need `face` and `tabs` included there. I am not completely sure why, but they are needed in order to set the color of the pipe character.
3. After that, you're calling `custom-set-faces` to customize the appearance of the tab whitespace. I set the text color of our pipe character to be **#636363** which is a nice color if you're using a dark-themed Emacs theme. If you're using a light theme in Emacs, you'll want a lighter color such as **#c1c1c1**.

<p style="color: #636363; background: black; text-align: center;">This is an example of #636363 on a dark background. It is supposed to be subtle.</p>

<p style="color: #c1c1c1; background: #eff7c3; text-align: center;">This is an example of #c1c1c1 on a light background. It is supposed to be subtle.</p>

The line that is a little bit confusing to read is the one where we actually set the pipe character.

All you really need to know about it is that `124` is the ascii ID of the pipe character ("\|"). You can view [a list of ascii character IDs here](http://rmhh.co.uk/ascii.html).

### Making Backspace properly delete tabs

Emacs has a strange default behavior when backspacing tabs. Instead of backspacing the whole tab, it backspaces the tab one space at a time.

You can fix that in the following way.

{% highlight elisp %}
(setq backward-delete-char-untabify-method 'hungry)
{% endhighlight %}

### Use spaces instead of tabs in specific filetypes/modes

In some languages, you might want to use spaces instead. For example, Lisp is not fun using tabs especially when Emacs tries to auto-align your code using tabs instead of spaces. To be fair, the same thing happens in Vim.

You can fix that using this snippet.

{% highlight elisp %}
(defun disable-tabs () (setq indent-tabs-mode nil))

(add-hook 'lisp-mode-hook 'disable-tabs)
(add-hook 'emacs-lisp-mode-hook 'disable-tabs)
{% endhighlight %}

First, we create a basic function that will disable `indent-tabs-mode`.

Then, for each mode we want tabs disabled in, we add a hook for it. In this case, I am disabling tabs for both common lisp files and emacs lisp files.

If you do not know the name of a a filetype's designated mode, you can open a file of that type, hit M-: (Alt + Shift + colon/semicolon), and type `major-mode`. Emacs will then tell you the current mode. After that, the hook function will typically be `{name of your mode}-hook`.

For example, I did this in a `.c` file and found out that the mode was called `c-mode`.

### SmartTabs

The [Smart-tabs-mode](https://www.emacswiki.org/emacs/SmartTabs) package helps Emacs indent with tabs and align with spaces in various languages.

If you are unsure of how to install packages in Emacs, you could refer to [this wiki entry](https://www.emacswiki.org/emacs/InstallingPackages) or [this video](https://www.youtube.com/watch?v=Cf6tRBPbWKs).

After installing it, you can enable it in various languages as follows:

{% highlight elisp %}
(smart-tabs-insinuate 'c 'javascript 'python)
{% endhighlight %}

### Python Tabs Support

PEP8 has some great code recommendation, however I completely disagree with their choice of spaces.

To enable it, you must first get [SmartTabs configured](#smarttabs).

After that, add the following hook to overwrite that tab width.

Remember that `custom-tab-width` is a custom set variable and you could replace it with a regular integer if you please.

{% highlight elisp %}
(add-hook 'python-mode-hook (lambda () (setq tab-width custom-tab-width)))
{% endhighlight %}

### Final Notes

That's it! Let me know if you have questions about any of this or have a suggestion to make it better.
