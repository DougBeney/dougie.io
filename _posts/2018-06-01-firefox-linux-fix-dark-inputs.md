---
title: How to Stop Your Dark Linux Theme From Interfering With CSS in Firefox
thumbnail: /static/img/blog/unreadable-gtk-input-firefox.png
date: 2018-06-01
icon: firefox
category: Answers
tags: (Linux, Firefox, GTK)
---

If you use a dark GTK theme on Linux and also use Firefox you might have run into this situation before.

![The problem](/static/img/blog/dark-gtk-firefox/dark-gtk-firefox.png)

It can be very annoying. There will be certain web forms that are impossible to work with because the text color will be the same as the form input's background color.

**Luckily, the fix is easy.** I've seen a ton of hacky ways to get around this but in this post I'll show you the best way.

## Fixing This Issue

### 1.) First, head on over to `about:config`

![](/static/img/blog/dark-gtk-firefox/about-config.png)

Click "I accept the risk!".

### 2.) Next, right-click anywhere on the page and create a new String value

![Creating a new key/value in about:config](/static/img/blog/dark-gtk-firefox/new-string.png)

### 3.) Set the string key to `widget.content.gtk-theme-override`

![Setting the string key](/static/img/blog/dark-gtk-firefox/key.png)

### 4.) Set the string value to `Adwaita`

![Setting the string value](/static/img/blog/dark-gtk-firefox/value.png)

Plenty of Linux distributions/desktops have Adwaita installed by default. If you do not, change this to the value of any light-colored theme you have.

### 5.) Restart Firefox

![Success! You were able to fix this](/static/img/blog/dark-gtk-firefox/success.png)

Once you close Firefox and reopen it, any form you view should look perfect!

Plenty of Linux distributions/desktops have Adwaita installed by default. If you do not, change this to the value of any light-colored theme you have.

## Troubleshooting

### "I followed the steps and inputs are still dark"

You could try changing the string value to "Adwaita:light" or whatever theme you want with the suffix ":light".

###  "I made a mistake"

![Editing a value in Firefox's about:config](/static/img/blog/dark-gtk-firefox/editing-value.png)
Simply search for the preference name you just created in `about:config` and then double click the column that you would like to edit.

---

Hope this guide helps! Thanks for reading
