---
title: Why I Don't Use OpenSUSE
date: 2018-06-04
category: Linux
tags: [Open-Source, Linux]
icon: desktop
---

## The Reasons

### Full-disk encryption is a pain during setup

By default, it encrypts your boot partition. This means you have to enter your disk's password twice - once for Grub and another time for OpenSUSE. Entering 'Expert Mode' and editing partitions to remedy this feels unintuitive, at least to me, compared to other distros' partition editors.

### 4.7gb ISO

The installer file is quite large at almost 5gb. The advantage of this is that you have everything if you need to do an offline install.

I don't think this should be their main image. Perhaps they could do what Debian does by offering multiple images of various sizes.

They do offer an 85mb network install image which is nice but then you have a lot of downloading to do during setup.

For comparison purposes, Fedora KDE's image is only 1.8GB which offers a lot out of the box without taking up 4.7gb.

### Strange Flatpak error on a fresh install?

I added the Flathub repo using the very simple instructions provided by Flathub.

There are permission errors whether you install from Plasma's Discover or from the command-line.

With a lot of important third-party software being easily availible through Flatpaks (Slack, Spotify, Skype, etc) it's a shame that this is not working out of the box.

## Final Notes

I believe OpenSUSE is close to having a great KDE distribution but just needs to iron-out some kinks. I could go on to mention further reasons why I don't use OpenSUSE but that gets into KDE defaults which I don't believe are fair to mention.

