---
title: How to Make Bundler Install Gems In Your Home Folder (Instead of In Your Root/System Directories)
date: 2020-02-05
icon: code
category: Answers
tags: [Ruby, Jekyll]
---

Tired of Bundler prompting you for your root password when running `bundle install`?

This one-line command will permanently solve your woes.

```
bundle config --global path ~/.bundle-packages
```

And that's it! You will not be prompted for your root password any more.

If you prefer to set a different install path on a project-by-project basis, you could pass the `--path` argument to bundler.

ex.

```
bundle install --path .bundler
```
