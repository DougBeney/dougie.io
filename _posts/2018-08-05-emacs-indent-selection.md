---
title: How to Indent a Selection in Emacs
date: 2018-08-05
icon: pencil-square
category: Emacs
slug: indent-selection
tags: [Coding, Emacs]
---

## Creating a keybinding

The most intuitively way I have found to indent your selection in Emacs is with the following keybinding:

{% highlight elisp %}
(global-set-key (kbd "C->") 'indent-rigidly-right-to-tab-stop)
(global-set-key (kbd "C-<") 'indent-rigidly-left-to-tab-stop)
{% endhighlight %}

With this binding you can select a block of text like regular and...

- Use `Control + >` to indent right
- Use `Control + <` to indent left

## Indent without a custom keybinding

So, maybe you don't want to set a custom keybinding for whatever reason. There is still hope.

There is no default keybinding (at least from what I have found) for the commands `indent-rigidly-{right or left}-to-tab-stop` but there is a keybinding for `indent-rigidly`.

- `Control + x` `TAB`

You first hit `Control+x` and then you press `tab`. Now you can use the left and right arrows to indent and de-indent.

The one quirk you'll notice is that this method indents and de-indents by single spaces rather than full tabs.

### That's it!

This took me a while to figure out but it is quite easy to implement.

Drop a comment if you think I should expand this article, covering other information.

Make sure to also check out my [Ultimate Guide to Emacs Indentation](/emacs/indentation/).
