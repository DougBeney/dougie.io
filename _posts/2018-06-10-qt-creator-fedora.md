---
title: How To Set Up Qt5 & Qt Creator on Fedora
date: 2018-06-10
category: Linux
tags: [Open-Source, Linux, Coding]
icon: linux
---

## Step 1: Install the Qt5 Developer libraries

`sudo dnf install qt5-devel`

## Step 2: Change your qmake location 

Change your qmake location from `/usr/bin/qmake-qt5.sh` to `/usr/bin/qmake-qt5`, as shown in the screenshot below.

![Settings to change in Qt Creator](/static/img/blog/qt-creator-fedora/settings.png)

It's that easy! I hope this helps you out.

Also, it helps to restart Qt Creator after making these changes.
