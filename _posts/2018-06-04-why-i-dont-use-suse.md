---
title: Why I Don't Use OpenSUSE
date: 2018-06-04
category: Linux
tags: [Open-Source, Linux]
icon: desktop
---

## Update - February 6, 2020

So, I actually used OpenSUSE as a daily driver for a few months. What I loved about it was:

- Stable and bleeding edge
- Zypper is a nice package manager with neat features
- YaST is pretty cool

But I had to switch away from it. The biggest reason being that I feel it is a distro that gets in your way while imposing its own way of doing things.

Simple example is printing. You **cannot** use the regular KDE printer settings. You have to open YaST (which requires you to enter your root password and has a slow startup time). YaST has its own printer settings and it isn't super intuitive to use.

I prefer distros that stay out of your way as much as possible. I am currently using Kubuntu.

## The Reasons

### Full-disk encryption is a pain during setup

By default, it encrypts your boot partition. This means you have to enter your disk's password twice - once for Grub and another time for OpenSUSE. Entering 'Expert Mode' and editing partitions to remedy this feels unintuitive, at least to me, compared to other distros' partition editors.

**EDIT**: Since writing I have noticed [this fix](https://en.opensuse.org/SDB:Encrypted_root_file_system) by OpenSUSE on how to avoid having to enter your password twice. Good to see they documented a fix but it is still far too hacky for the end-user.

**EDIT 2**: So, I learned that it is actually ~~very~~ somewhat valid for SUSE to encrypt /boot. Someone who compromises your system could replace the kernel or initrd with a trojan'd version of it. This modified version could include a keylogger so that once you enter your password, it is recorded. Now, the situation of someone doing this to your computer without you knowing is extremely unlikely unless you're a person in power or maybe a boss with a smart disgruntled employee. Still, it's cool to see that SUSE took this into consideration. The question now is whether SUSE should implement that fix by default so an inexperienced end user wouldn't have to deal with it.

### 4.7gb ISO

The installer file is quite large at almost 5gb. The advantage of this is that you have everything if you need to do an offline install.

I don't think this should be their main image. Perhaps they could do what Debian does by offering multiple images of various sizes.

They do offer an 85mb network install image which is nice but then you have a lot of downloading to do during setup.

For comparison purposes, Fedora KDE's image is only 1.8GB which offers a lot out of the box without taking up 4.7gb.

### Strange Flatpak error on a fresh install?

I added the Flathub repo using the very simple instructions provided by Flathub.

There are permission errors whether you install from Plasma's Discover or from the command-line.

With a lot of important third-party software being easily availible through Flatpaks (Slack, Spotify, Skype, etc) it's a shame that this is not working out of the box.

### Asking passwords too much?

I have been prompted a ton of times in Discover (The software install GUI) to enter my root password.

You're also asked for the root password when doing things like [adding a printer](https://www.reddit.com/r/openSUSE/comments/8dctyp/rant_mode_are_we_still_requiring_root_passwords/).

## Final Notes

I believe OpenSUSE is close to having a great KDE distribution but just needs to iron-out some kinks. I could go on to mention further reasons why I don't use OpenSUSE but that gets into KDE defaults which I don't believe are fair to mention.
