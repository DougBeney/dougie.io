---
title: How to Upgrade All of Your Python Packages With Pip Using One Simple Command
date: 2020-02-05
icon: code
category: Answers
tags: [Python]
---

Pip doesn't have a built-in command to update all of its packages. This is likely because it is recommended to have a [virtualenv](https://virtualenv.pypa.io/en/latest/) for each new project you create.

In that sort of workflow, you would be guarenteed the latest, most up-to-date packages whenever you start a project. If you'd want to upgrade those packages, you'd keep a requirements.txt file that documents all of your needed packages and you could upgrade using that.

**However...**

There is an increasing amount of software and command-line utilities that are built with Python.

One of my favorites is [rtv](https://github.com/michael-lazar/rtv), a client for the terminal that allows you to read reddit.

![rtv, a Python-based terminal app](/static/img/blog/pip-upgrade-all/rtv.png)

## How to Update All PIP Packages

### Before you proceed: Be safe

First of all, **do not attempt this if your PIP packages are installed on the root of your system rather than in your home directory**.

If you type `sudo` before `pip install`, you are doing things wrong. First, switch to a setup where `pip install` installs your packages into your home directory. Mine installs to `~/.local/lib/python3.7/site-packages`.

If you were to update system packages using pip, that would cause big problems because some Python packages are installed by your system. Any changes PIP makes will be overwritten during an operating system update.

### The Command

```
pip freeze --user | cut -d'=' -f1 | xargs pip install -U
```

If you're not too familiar with the command-line, that command might look a bit scary to you.

It's actually not that complex. Here is have it does:

**1.** Get a list of user-installed Python packages using `pip freeze --user`. (Feel free to try out that command on your own to see what it does)

**2.** Using `cut`, we cut off the unncessary info from that command so we are left with just a list of package names.

For example, it would convert this output of `pip freeze --user`...

```
mypackage==1.0.0
mypackage2==1.0.0
```

...to this!

```
mypackage
mypackage2
```

Simple enough.

And finally, we feed all of those packages to the command `pip install -U` using xargs.

### Saving your fingers using an alias

The command I mentioned is not fun to type if you want to update your packages often.

We can solve this with an alias. Watch [this tutorial](https://www.youtube.com/watch?v=CUePYTZuJ1E) for a good overview of aliases if you're new to it.

**The Alias:**

```
alias pip-upgrade="pip freeze --user | cut -d'=' -f1 | xargs pip install -U"
```

Now all you have to do is type `pip-upgrade` whenever you want to update your packages!

This alias works with all major shells including **bash**, **zsh**, and (my favorite) **fish**.

## The end

I hope this article has saved you some time!

This method was very simple and didn't require you to download someone's weird, long script or a new Python package.
