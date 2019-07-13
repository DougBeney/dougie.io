---
title: Here's How to Open a Terminal App in Your Current Emacs Working Directory
date: 2019-07-13
icon: pencil-square
category: Emacs
tags: [Coding, Emacs]
slug: open-directory-in-terminal-app
---

So you want to open a terminal from Emacs.

While Emacs comes with various modes such as `shell`, `ansi-term`, and `eshell`, sometimes you just want to open a directory in your trusty terminal application of choice.

## The Basics: Opening a Terminal in The Current Working Directory

The below code will open a terminal in your working directory, either using the key combination `C-c t` or by using `M-x open-terminal-in-workdir`.

You are going to have to change the **"konsole --workdir "** part depending on what terminal application you are using. I am using [Konsole](https://konsole.kde.org/).

{% highlight elisp %}
(defun open-terminal-in-workdir ()
  (interactive)
    (start-process "terminal" nil (concat "konsole --workdir " default-directory)))

(global-set-key (kbd "C-c t") 'open-terminal-in-workdir)
{% endhighlight %}

Here are some replacements of "konsole --workdir " for various terminal emulators:

| App Name          | Command                               |
|:-----------------:|:-------------------------------------:|
| Mac OS X Terminal | "open -a Terminal "                   |
| GNOME Terminal    | "gnome-terminal --working-directory=" |
| XFCE Terminal     | "xfce4-terminal --working-directory=" |
| Windows CMD.exe   | You're on your own for this one!      |

## Taking It a Bit Further: Opening a Terminal in the Project's Root

This is great so far, howevever I might be nested deep within a project and would like to open a terminal **at the root** of the project.

I got around this by creating a little if-else statement. Note: You need [Projectile](https://projectile.readthedocs.io/en/latest/) for this to work.

If you are inside a project, the terminal will open in its root. If you are editing some random files that are not part of "a project", this function will fall back on Emacs' `default-directory` variable, which is your current working directory.

{% highlight elisp %}
(defun open-terminal-in-workdir ()
  (interactive)
  (let ((workdir (if (projectile-project-root)
                     (projectile-project-root)
                   default-directory)))
    (start-process "terminal" nil (concat "konsole --workdir " workdir))))

(global-set-key (kbd "C-c t") 'open-terminal-in-workdir)
{% endhighlight %}

Hope this helps!
