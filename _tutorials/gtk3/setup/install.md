---
title: Installing GTK+3
layout: post
---

For the most update-to-date information on how to install GTK3, I recommend referring to GTK.org's [Linux](https://www.gtk.org/download/linux.php), [Mac](https://www.gtk.org/download/macos.php), or [Windows](https://www.gtk.org/download/windows.php) installation guides.

1. TOC
{:toc}

## What do we need to install?

To compile a GTK+3 program, we need to install the GTK3 libraries.

However, there are two other optional installs that could really help us out:

- Glade
- Devhelp

### Glade

![Glade Screenshot](/static/img/tutorials/gtk3/glade.png)

A visual editor that allows us to create apps much faster. We'll be using it later in this course.

### Devhelp

![Devhelp Screenshot](/static/img/tutorials/gtk3/devhelp.png)

An offline documentation viewer for GTK3 and other various libraries. Super helpful as it also contains tutorials for you to follow along with.

---

## Linux

Below are commands to run on various Linux distributions to get the proper packages required.

### Fedora Linux

`sudo dnf install gtk3 gtk3-devel`

### Ubuntu Linux

`sudo apt install libgtk-3-dev`

### Arch Linux

`sudo pacman -S gtk3`

---

## Mac

There seems to be various instructions for setting up GTK+3 on Mac. One way is described in [Gnome's wiki entry](https://wiki.gnome.org/Projects/GTK+/OSX/Building).

I personally think the best way is through Homebrew.

### Install Homebrew

Homebrew is a popular package manager for Mac OS X.

[Here is how you install it](https://brew.sh/).

### Install the XCode commandline tools

Open up your terminal and run `xcode-select --install` to get the commandline tools.

### Install GTK+3 with Homebrew

Run this command to install GTK+3 via Homebrew: `brew install gtk+3`


## Download the shell script

Gnome developers created a Mac OS X install script. [Download it here](https://gitlab.gnome.org/GNOME/gtk-osx/raw/master/gtk-osx-build-setup.sh).

## Execute the script in Terminal

Open up your Terminal and cd into the directory the script is downloaded in. (ex. `cd Downloads/`)

To execute the script, run this command: `sh gtk-osx-build-setup.sh`.

---

## Windows

### Step 1: Install MSYS2

First, you need to install [MSYS2](http://www.msys2.org/).

There are various ways to compile GTK3 code on a Windows machine, but the easiest way (that's even recommended by GTK.org) is via MSYS2.

When you open the program, you'll notice that it's just a command prompt similar to CMD.exe - which you're probably familiar with already.

The big difference is that MSYS2 provides a bunch of Linux features and tools that would otherwise be difficult to set up on Windows. **It even gives you a package manager!**

### Step 2: Install GTK+3 and Glade from MSYS2 (And DevHelp?)

First we need to get the GTK3 library as well as some tools to make compilation possible. Open MSYS2 and run the following command:

`pacman -S mingw-w64-x86_64-gtk3 mingw-w64-x86_64-toolchain base-devel`.

To install Glade, run the following command:

`pacman -S mingw-w64-x86_64-glade`

Lastly, to install Devhelp, run the following:

`pacman -S mingw-w64-x86_64-devhelp`

These commands should be enough, but if you run into trouble later, refer to [this StackOverFlow answer](https://stackoverflow.com/questions/20098862/how-to-install-gtk-on-osx-for-use-with-g-gcc-compiler).

---

I hope this has helped you get up and running! In the next section, we'll compile an example app.
