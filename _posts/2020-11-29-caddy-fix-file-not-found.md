---
layout: post
title: How to Fix the 'File not found.' error in Caddy
date: 2020-11-29 15:57
category: Linux
icon: linux
---

[Caddy](https://caddyserver.com/) server is INCREDIBLY awesome. My main use for it as of late is as a development environment. PHP (wordpress) development environments are a pain to set up and this makes my job so much easier. I don't need any sort of containers or virtual machines to get up a nice and reliable environment. And it's configuration is dead easy. You can have a working Wordpress site in a few lines of code.

Anyhow, I have two separate Arch Linux computers, nearly identical. My Caddy project worked just fine on one computer. On the other, I kept getting the "File not found." message in the browser.

## The Solution!

It turns out that this was a `php-fpm` problem. The "user" that the php-fpm runs under does not have permission to view files in your project directory. There are two solutions.

You have to find your [www.conf](https://stackoverflow.com/questions/39054500/what-is-www-conf). It will vary from distro to distro. Mine was at `/etc/php/php-fpm.d/www.conf`.

In it, you'll find a section that looks like this:

```
; Unix user/group of processes
; Note: The user is mandatory. If the group is not set, the default user's group
;       will be used.
user = http
group = http
```

As you can see, the user and group of the php-fpm process is `http`.

You can also confirm this by running `ps u | grep php-fpm`. This returned four lines and two of them were as follows:

```bash
http       17244  0.0  0.1  85284  9372 ?        S    16:11   0:00 php-fpm: pool www
http       17245  0.0  0.1  85284  9372 ?        S    16:11   0:00 php-fpm: pool www
```

The first word of each line is the user that owns the process. As you can see it's `http` as expected.

### Solution #1: Lazy and not recommended

The first idea I had (which worked) was to change the user of the process in `www.conf` to my own user of the computer.

This idea got dumber and dumber the more I thought about it. This means any PHP code I execute has full read and write permission on all of my most important files. For that reason, go to Solution #2.

### Solution #2: Read  (and optionally, write) Permissions

So, now we know that `php-fpm` is running as the user `http` and the group `http`.

If all you want is read permissions and you don't care about providing ownership to the php-fpm process, you just need read privileges on your project directory and execution privileges on your parent directories.

For example, I had this project directory: `/home/doug/Code/Wordpress/my_project`.

I first had to **make sure** 'other' execution privilege was enabled for the directories `/home/`, `/home/doug`, `/home/doug/Code`, and `/home/doug/Code/Wordpress`. See [this answer](https://superuser.com/questions/163070/user-write-in-a-subfolder-when-cant-access-parent) for an explanation.

You can add 'other' execution privilege with the command `chmod o+x {directory}`. I wouldn't recommend using chmod's `-r` (recursive) flag for this.

Now, you just need read privilege on your project directory. Optionally 'other' executive privilege on directories if it is not enabled by default.

Run: `chmod -r o+r {directory}`

If you want **write privileges**, you should provide ownership of the folder to the group or user and provide group or user write permissions to that directory.

Example:

```bash
chmod -R g+w {project directory}  # Allows users in the directory's group to write
chown -R :http {project directory} # Provides ownership of the directory to the 'http' group.
```
