---
title: A Practical Guide To Switching From Mac To Linux
layout: post
date: 2017-12-30 12:12 -0500
thumbnail: /static/img/blog/penguin.jpg
excerpt: You might be interested in switching from Mac to Linux for a variety of reasons. Perhaps you don't have full trust in Apple and would like to use and support an open-source operating system.
---

1. TOC
{:toc}

You might be interested in switching from Mac to Linux for a variety of reasons. Perhaps you don't have full trust in Apple and would like to use and support an open-source operating system.

Maybe, you are getting tired of the design of Mac OS X and would like to have full customization over the look of your system.

Perhaps you're a developer and would like the intuitiveness of a Linux-based package manager for installing all of your programs or libraries.

Whatever the reason, this guide will attempt to solve the major hurdles you might encounter switching from Mac OS X to a Linux distribution.

Here's a quick summary of what you will learn from this guide: 

- What distro/desktop environment works best with Macs
- Getting trackpad gestures working as well as making other Mac-specific tweaks
- Software alternatives to popular Mac apps

## Choosing a Distro

First, let's quickly go over the difference between a "distro" (Distribution) and a "DE" (Desktop Environment).

**Desktop Environment** - I thought it would make sense to cover what a DE is first. A DE is essentially everything visual you see on your screen. Your application dock, your top bar with the time, the draggable windows that pop up when you open an application. All of this is part of the desktop environment. Without a desktop environment, you would see nothing but a command line in front of you. 

**Distro** - Think of a distro as a complete operating system. When you download a distro, it is typically in an ISO format and with it you can create a bootable USB flash drive or a bootable CD/DVD. In most cases, a distro will contain a desktop environment.

**Note**: No matter what desktop environment comes with your distro, you could always switch it out for another one. You could even have multiple desktop environments installed on your system and be able to choose which one you would like to use on the login screen

### The Choices

When it comes to distros, everyone will have different opinions. I have broken down my recommendations into these categories.

**For those who want a solid and easy experience close to Mac OS X.**

[Ubuntu 17.10](https://www.ubuntu.com/desktop/1710) - Ubuntu is the most popular distro. It is incredibly easy to install and has a massive community. If you run into an issue, chances are there will be plenty of solutions available with a quick Google search.

From 17.10 onwards, Ubuntu will use the Gnome desktop environment. You'll find Gnome very similar to the ergonomics of Mac OS X. 

A tip with Gnome is to download the Dash-to-dock Gnome extension. It will allow for a customizable dock similar to Mac OS X.

**For someone who wants little change from Mac OS X**

[Elementary OS](https://elementary.io/) - Elementary is a very clean, simplistic distro modeled after Mac OS X. It uses the Pantheon desktop environment.

Its HiDPI support is fantastic, and it is based on Ubuntu, so you will get the same great package manager as Ubuntu.

**For someone who wants a Windows-like experience with no limits:**

[KDE Neon](https://neon.kde.org/) - KDE neon uses the Plasma desktop environment. Out of the box, it is similar to Windows. You can add various widgets to your desktop, customize/add panels, and you get a nice "Start" menu.

But be aware that Neon is far from a Windows clone. It allows for a LOT of customization. Using [Latte-Dock](https://github.com/psifidotos/Latte-Dock) you could even get yourself a customizable dock and create an OS-X-like experience. 

**For developers who want their tools straight out of the box:**

[Fedora Workstation](https://getfedora.org/en/workstation/) - Fedora is aimed at software developers. It uses the Gnome desktop environment.
  
**BONUS:**

[Solus](https://solus-project.com/) - Solus is an incredible distro built from the ground up. It has quite a large software repository, but you might run into issues with some software not being available on Solus.

Solus is the fastest booting distro I have ever tried. IIRC, it booted around 10 seconds on my 2015 MacBook Pro.

Solus is available with either Budgie, Gnome, or the MATE desktop environment.


**NOTE:** Considerations if you have a Retina display:

If you have a Retina (HiDPI) display, some desktop environments you try are not going to be properly scaled for your screen size. The recommendations above all support HiDPI perfectly, however with KDE Plasma, you will have to manually set the scaling of your display in the settings and then make some small tweaks, such as resizing the bottom panel.

The two popular desktop environments you should stay away from if you are on a HiDPI display are XFCE and MATE. They currently do not properly support HiDPI.

## Switching the CTRL and CMD key 

Mac keyboards were ergonomically designed to use the CMD key in place of the traditional Windows CTRL key.

You can switch the keys by editing `/usr/share/X11/xkb/symbols/pc` with whichever text editor you prefer. 

**Look for the following lines**:

```
key <LCTL> {    [ Control_L        ]    };
key <LWIN> {    [ Super_L        ]    };

key <RCTL> {    [ Control_R        ]    };
key <RWIN> {    [ Super_R        ]    };
```

**Change them as shown**: 

```
key <LCTL> {    [ Super_L        ]    };
key <LWIN> {    [ Control_L        ]    };

key <RCTL> {    [ Super_R        ]    };
key <RWIN> {    [ Control_R        ]    };
```

## Configuring Trackpad Gestures

To my surprise switching over to Linux, trackpad gestures were quite easy to add. Just don't expect to have OSX's smooth image zooming features. That's the only gesture I couldn't get right.

**Doing the following, you will be able to use these trackpad gestures**:

- 3-finger swipe up/down to change desktops
- 3-finger swipe left/right for page navigation (For example, in your web browser to go forward/back a page)
- [**Experimental**] You will see commented-out lines to enable pinch-to-zoom. I haven't found it useful but you might. Simply uncomment those two lines to enable.
- Three finger pinch to show an overview of your open applications. Uncomment those two lines if you are on any distribution other than Ubuntu 17.10+. If you are on 17.10, this gesture is already enabled by default.

First, [follow the instructions to get libinput-gestures](https://github.com/bulletmark/libinput-gestures).

Next, you must create a configuration file. Create the file, `~/.config/libinput-gestures.conf` and open it in a text editor. 

Here is the configuration:

    # 3 FINGER SWIPE UP/DOWN FOR CHANGING DESKTOPS
    gesture swipe up 3    xdotool set_desktop --relative 1
    gesture swipe down 3    xdotool set_desktop --relative -- -1
    
    # 3 FINGER SWIPE LEFT/RIGHT FOR PAGE NAVIGATION (BACK/FORWARD)
    gesture swipe left 3    xdotool key alt+Right
    gesture swipe right 3    xdotool key alt+Left
    
    # SNAP WINDOWS WITH 4 FINGER SWIPE LEFT/RIGHT/FULL SCREEN/REGULAR
    gesture swipe left 4    xdotool key Super+Left
    gesture swipe right 4    xdotool key Super+Right
    gesture swipe up    4    xdotool key Super+Up
    gesture swipe down  4    xdotool key Super+Down
    
    # PINCH TO ZOOM
    #gesture pinch in 2 xdotool key ctrl+minus
    #gesture pinch out 2 xdotool key ctrl+shift+plus
    
    # GNOME SHELL open/close overview (works for GNOME on Wayland and Xorg)
    #gesture pinch in 3 dbus-send --session --type=method_call --dest=org.gnome.Shell /org/gnome/Shell org.gnome.Shell.Eval string:'Main.overview.toggle();'
    #gesture pinch out 3 dbus-send --session --type=method_call --dest=org.gnome.Shell /org/gnome/Shell org.gnome.Shell.Eval string:'Main.overview.toggle();'

## Creating Shortcut Keys

The one custom shortcut key I regular use is for screenshots. I was used to Skitch on Mac, so I wanted something similar.

In Gnome, you can open the "Keyboard" preferences in settings and be able to assign custom shortcuts. 

Scroll down and press the plus icon to create a new shortcut combination. Name it whatever you want, give it the command of `gnome-screenshot -i`, and set the shortcut to your desired combination. I used CMD+SHIFT+3. 

## Software Alternatives

### Productivity

- Microsoft Office -> [Libreoffice](https://www.libreoffice.org/)
- Microsoft Outlook -> [Thunderbird](https://www.mozilla.org/en-US/thunderbird/)
- Pomodoro timer -> [Gnome Pomodoro](http://gnomepomodoro.org/) or [tomate-gtk](https://github.com/eliostvs/tomate-gtk)

### Design / Creative

- Adobe Photoshop -> ~~Gimp~~ [Krita](https://krita.org/en/). ([It can support Retina displays](/krita-hidpi/).)
- Adobe Illustrator -> [Inkscape](https://inkscape.org/en/)
- Sony Vegas / Adobe Premiere -> [KdenLive](https://kdenlive.org/) or [OpenShot](https://www.openshot.org/)

### Utility

- Skitch, Monosnap, etc -> [Kazam](http://www.ihaveapc.com/2014/02/take-screenshots-and-create-screencasts-using-kazam-in-ubuntu/) or [Gnome-Screenshot](https://help.gnome.org/users/gnome-help/stable/screen-shot-record.html.en)
- Screenflow -> [Simple Screen Recorder](http://www.maartenbaert.be/simplescreenrecorder/)

### Fun / Games

- Steam -> [Steam for Linux](http://store.steampowered.com/linux)
- [Insert Game for Windows] -> [PlayOnLinux](https://www.playonlinux.com/en/) or plain-old [Wine](https://www.winehq.org/)
- Music Production - [Bitwig Studio](https://www.bitwig.com/en/home.html) (Paid) or [LMMS](https://lmms.io/) (Free)

## Tips for Retina / HiDPI screens

You will come across some software that looks super tiny when you open it.

This is because HiDPI displays require special, scaled, rendering for applications.

Whenever you come across an issue like this, [refer to the Arch Wiki's entry on HiDPI](https://wiki.archlinux.org/index.php/HiDPI). They have many entries on scaling for different developer toolkits as well as individual applications. 

**Here's what you need to know:**

When a software developer decides to create a piece of software, they get to choose a special toolkit to build it. Here are the most popular toolkits and whether or not they support Retina/HiDPI.

- Gtk2 (Does not support HiDPI)
- Gtk3 (Supports HiDPI!)
- Qt4 (Does not support HiDPI)
- Qt5 (Supports HiDPI!)
- Electron (Supports HiDPI!)

You can usually tell what toolkit a piece of software is using by going into its Help>>About menu in the toolbar. If the information is not there, you could simply Google around to find out. You could lastly check out the repository with the software's code, and there is usually a readme file that tells you what the software is made with.

Now, once you figured out what toolkit a piece of software is using, you can [go [back to the Arch Wiki](https://wiki.archlinux.org/index.php/HiDPI). If they didn't name the piece of software specifically there, you could search for the toolkit and instructions will be provided for a solution.

The solutions for a lot of these will involve editing a 'Desktop File' (A file containing information about launching an application as well as a description, icon, etc.)

Desktop files will usually be found in the `/usr/share/applications` directory of your computer in most distributions.

For example, to fix the Spotify program to work on HiDPI display, you would edit the file `/usr/share/applications/spotify.desktop`.

You would change this line:

`Exec=spotify %U`

To This:

`Exec=spotify --force-device-scale-factor=2 %U`

## Just Go For It

Switching to a Linux-based distribution is a lot of fun. You'll learn a lot along the way and its always nice to have the peace of mind that your operating system is not selling your data to advertisers (<nowiki>*</nowiki>Cough <nowiki>*</nowiki>Cough Windows 10).

While Linux support on Mac might have not been the best five years ago, it's fantastic today. And it's only going to get better! Ubuntu 18.04 is supposedly going to support per-application DPI scaling, meaning that even with GTK2/Qt4 apps, you'll be able to view them properly on a HiDPI display.
