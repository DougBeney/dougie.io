---
layout: post
title: How to Use a Trezor Cryptocurrency Wallet On Solus
date: 2020-05-23 17:57
category: cryptocurrency
icon: bitcoin
---

Getting a Trezor bitcoin wallet to work with Solus is actually quite easy.

First, you're going to need to install Solus's version of `rpm`. (It's a package installer.)

## 1.) Install RPM

```
sudo eopkg it rpm
```

## 2.) Download the Trezor Bridge

![Trezor Bridge Install](/static/img/blog/solus-trezor/trezor-bridge.png)

The next step is to download the Trezor Bridge by visiting this URL:

[https://wallet.trezor.io/#/bridge](https://wallet.trezor.io/#/bridge)

**Bookmark** this URL as you can use it in the future to check if you have the latest version!

## 3.) Install the Trezor Bridge

```
sudo rpm -i trezor-bridge-*.*.**-*.x86_64.rpm --nodeps
```

Congrats! After running that command, you should be all set. :)

To confirm that nothing went wrong, type the command `systemctl status trezord` and ensure there are no strange errors.

My output looked like this:

```
● trezord.service - Trezor Bridge
     Loaded: loaded (/usr/lib/systemd/system/trezord.service; enabled; vendor p>
     Active: active (running) since Sat 2020-05-23 17:54:28 EDT; 14min ago
   Main PID: 21995 (trezord)
      Tasks: 15 (limit: 28605)
     Memory: 41.7M
     CGroup: /system.slice/trezord.service
             └─21995 /usr/bin/trezord
lines 1-8/8 (END)
```

Hope you found this useful! Leave a comment if you ran into any problems.

Did this help you out? Feel free to send a tip:

**BTC**: 3BZM1eMEm4pDu9NrxAG1oduVfZpf3HCLTL
