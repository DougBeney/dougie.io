---
title: The Ultimate Guide To Indentation in Emacs (Tabs and Spaces)
date: 2018-07-16
icon: pencil-square
category: Emacs
slug: indentation
tags: [Coding, Emacs]
---

1. TOC
{:toc}

![Screenshot](/static/img/blog/tabs-in-emacs/screenshot.png)

## TL;DR: The Full Configuration:

This configuration is meant for users that prefer tabs over spaces. To learn how to customize tabs and spaces behavior differently, please refer to the Breaking It Down section.

{% highlight elisp %}
; START TABS CONFIG
;; Create a variable for our preferred tab width
(setq custom-tab-width 2)

;; Two callable functions for enabling/disabling tabs in Emacs
(defun disable-tabs () (setq indent-tabs-mode nil))
(defun enable-tabs  ()
  (local-set-key (kbd "TAB") 'tab-to-tab-stop)
  (setq indent-tabs-mode t)
  (setq tab-width custom-tab-width))

;; Hooks to Enable Tabs
(add-hook 'prog-mode-hook 'enable-tabs)
;; Hooks to Disable Tabs
(add-hook 'lisp-mode-hook 'disable-tabs)
(add-hook 'emacs-lisp-mode-hook 'disable-tabs)

;; Language-Specific Tweaks
(setq-default python-indent-offset custom-tab-width) ;; Python
(setq-default js-indent-level custom-tab-width)      ;; Javascript

;; Making electric-indent behave sanely
(setq-default electric-indent-inhibit t)

;; Make the backspace properly erase the tab instead of
;; removing 1 space at a time.
(setq backward-delete-char-untabify-method 'hungry)

;; (OPTIONAL) Shift width for evil-mode users
;; For the vim-like motions of ">>" and "<<".
(setq-default evil-shift-width custom-tab-width)

;; WARNING: This will change your life
;; (OPTIONAL) Visualize tabs as a pipe character - "|"
;; This will also show trailing characters as they are useful to spot.
(setq whitespace-style '(face tabs tab-mark trailing))
(custom-set-faces
 '(whitespace-tab ((t (:foreground "#636363")))))
(setq whitespace-display-mappings
  '((tab-mark 9 [124 9] [92 9]))) ; 124 is the ascii ID for '\|'
(global-whitespace-mode) ; Enable whitespace mode everywhere
; END TABS CONFIG
{% endhighlight %}

## Breaking It Down

### Functions for Enabling/Disabling tabs

{% highlight elisp %}
;; Our Custom Variable
(setq custom-tab-width 2)

(defun disable-tabs () (setq indent-tabs-mode nil))
(defun enable-tabs  ()
  (local-set-key (kbd "TAB") 'tab-to-tab-stop)
  (setq indent-tabs-mode t)
  (setq tab-width custom-tab-width))
{% endhighlight %}

These are two different functions that we can easily call in our custom hooks. If you'd like to also activate these functions on the fly, using `M-x`, you can use the `(interactive)` function in Emacs Lisp. [Here's the documentation](https://www.gnu.org/software/emacs/manual/html_node/elisp/Interactive-Examples.html).

First thing we do in the `enable-tabs` function is set the TAB key to `tab-to-tab-stop`. In my opinion, it is a more sane default. When you press the tab key, it will indent one tab as expected. There is no wizardry or confusion of what will happen next when you hit the tab key.

After that, we enable [indent-tabs-mode](https://www.gnu.org/software/emacs/manual/html_node/eintr/Indent-Tabs-Mode.html) and set our custom [tab-width](https://www.gnu.org/software/emacs/manual/html_node/efaq/Changing-the-length-of-a-Tab.html).

### Using Tabs or Spaces in Different Files

{% highlight elisp %}
(add-hook 'prog-mode-hook 'enable-tabs)

(add-hook 'lisp-mode-hook 'disable-tabs)
(add-hook 'emacs-lisp-mode-hook 'disable-tabs)
{% endhighlight %}

After we create [those hooks](#functions-for-enablingdisabling-tabs), it is very easy to decide what types of files/modes we want to enable tabs/spaces in.

In this example, we enable tabs in [prog-mode](https://www.emacswiki.org/emacs/ProgMode). Prog-mode is a nice hook to use if you want to make settings for pretty much all code filetypes.

After that we disable tabs (use spaces) in Lisp and ELisp files. Lisp is a special type of programming language that really doesn't work well with tabs, so I HIGHLY recommend spaces. Why is that exactly? The concept of indentation really doesn't exist in Lisp. It's all about alignment, and tabs will screw up the precise alignment that Lisp requires.

### Changing the tab width

{% highlight elisp %}
;; Our Custom Variable
(setq custom-tab-width 2)

(setq-default python-indent-offset custom-tab-width)
(setq-default evil-shift-width custom-tab-width)
{% endhighlight %}

Remember not to define the variable `custom-tab-width` twice! It should be defined above your enable/disable tabs functions. I included it in this code snippet just for illustration purposes.

In this example, we set the the tab width to our custom tab width variable. The first line uses the basic `tab-width` property. I recommend not setting the tab-width in the way I have described above and instead put it inside of a function, to be used in hooks. [Detail on doing just that](#functions-for-enablingdisabling-tabs).

Next, we set the Python indent size to our custom tab width variable. They make it 4 spaces by default to comply with [pep8](https://www.python.org/dev/peps/pep-0008/), but if you prefer to have your own default value, you can change it via that variable.

Lastly, we set the evil-shift-width to our custom tab width variable. This is only useful if you are using the Evil package to get Vim-like keybindings instead of using glorious Emacs keybindings. `evil-shift-width` controls the tab size when you're using the `>>` or `<<` motion to indent or de-indent text.

### Making Indentation Behave Sanely (Electric Indent)

Something that was driving me nuts was Emacs electric-indent indenting the previous line when I press enter. Luckily, I came across a fix one day.

{% highlight elisp %}
(setq-default electric-indent-inhibit t)
{% endhighlight %}

### Indent a selection left or right

To accomplish this, refer to my [How to Indent a Selection in Emacs](/emacs/indent-selection) guide.

### Highlighting Tabs and Spaces Differently

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

### Making Backspace Properly Delete Tabs

Emacs has a strange default behavior when backspacing tabs. Instead of backspacing the whole tab, it backspaces the tab one space at a time.

You can fix that in the following way.

{% highlight elisp %}
(setq backward-delete-char-untabify-method 'hungry)
{% endhighlight %}

### SmartTabs (Bonus)

The [Smart-tabs-mode](https://www.emacswiki.org/emacs/SmartTabs) package helps Emacs indent with tabs and align with spaces in various languages.

I personally don't use it, but it might tickle your fancy.

If you are unsure of how to install packages in Emacs, you could refer to [this wiki entry](https://www.emacswiki.org/emacs/InstallingPackages) or [this video](https://www.youtube.com/watch?v=Cf6tRBPbWKs).

After installing it, you can enable it in various languages as follows:

{% highlight elisp %}
(smart-tabs-insinuate 'c 'javascript 'python)
{% endhighlight %}

### Python Tabs Support

UPDATE: There used to be a pretty tedious process to get tabs properly working in Python. Luckily, after updating this article with my new tabs config, it works fine. Update your code with [my new code](#tldr-the-full-configuration) and you'll be all set.

You may also want to check out [SmartTabs](#smarttabs-bonus) too.

### Final Notes

That's it! Let me know if you have questions about any of this or have a suggestion to make it better.
