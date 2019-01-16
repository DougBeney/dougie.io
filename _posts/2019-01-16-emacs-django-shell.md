---
title: How to run the Django Shell in Emacs
date: 2019-01-16
icon: pencil-square
category: Emacs
tags: [Coding, Emacs]
---

## Demo

<video src="/static/img/blog/emacs-django-shell/emacs-django-shell.webm" controls>
</video>

## Code

```emacs-lisp
(defun django-shell ()
  (interactive)
  (let ((python-shell-interpreter (read-file-name "Locate manage.py "))
        (python-shell-interpreter-args "shell"))
    (run-python (python-shell-calculate-command) nil t)))
```

## Commentary

I was looking for an easy way to access the Django shell in Emacs. Previously, I used `ansi-term` and just ran `./manage.py shell` like normal. The big problem with this method was that I didn't get all of the awesome code-completion and similar features that I would get from the `run-python` shell.

This elisp function prompts the user to locate their manage.py file. It then temporarily sets the "python shell interpreter" to manage.py and adds "shell" to the argument of manage.py. `run-python` is called. It uses `python-shell-calculate-command` that basically pieces together the interpreter and args variable we set earlier.

**Notes**:

- This does indeed work with virtual environments. I use [pyvenv](https://github.com/jorgenschaefer/pyvenv) as it has a very useful `pyvenv-activate` command for activating virtualenvs.
- Code completion works perfectly in this shell by making use of [lsp-mode](https://github.com/emacs-lsp/lsp-mode). With lsp-mode, make sure to `pip install 'python-language-server[all]'`. If you're using a virtualenv, make sure to install this in your virtualenv as well. Btw, those single quotes are important in that pip install command.
