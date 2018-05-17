---
title: Getting Krita to Work With Your HiDPI Display
thumbnail: /static/img/blog/krita.jpg
date: 2018-01-28
icon: paint-brush
---

Krita and Gimp are the most popular free and open-source image editors for Linux.

However, if you are using a HiDPI/Retina display you will notice that both programs look unusable.

At the moment, Gimp has no solution to this problem other than downloading a [hidpi-theme](https://github.com/jedireza/gimp-hidpi) This will fix the size of the icons, but there will still be a lot of components that are not scaled properly.

## Solution 

It's actually quite simple. You need to set the environmnetal variable of `KRITA_HIDPI` to `1`.


### Xorg

If you use just about any other desktop environment that isn't Gnome, you're probably using Xorg.

Create or edit the file `~/.profile` and copy and paste the following:

`export KRITA_HIDPI=1`

Restart your machine and you're done!

### Wayland

If you are on a Wayland desktop environment (As far as I know, Gnome is currently the only one not using xorg) you have to create a file in your `environment.d` folder.

Create and edit the file `~/.config/environment.d/krita.conf`.

Copy and paste the following:

```
KRITA_HIDPI=1
```

You're done! Restart you're machine, and you should experience Krita at a proper DPI.


## Enjoy!

By now, Krita should look perfect on your HiDPI display.

If it doesn't, first be sure you are using an up-to-date version of Krita. At the moment of writing this, I am on version 3.3.3.

You could also troubleshoot by running the command `KRITA_HIDPI=1 krita` in your terminal. If that fixes the HiDPI, it simply means that you didn't set the environmental variables properly. You should look into your desktop environment / distro / display server to see if there is a preferred method for setting environmental variables.

Thanks for reading!
