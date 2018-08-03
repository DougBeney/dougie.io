---
title: Vue-Router Blank Page? Here's The Fix
date: 2018-08-03
icon: code
category: Answers
---

So, there's no error. Just a blank page. You can't find any obvious typos and your code looks quite indentical to the documentation.

Here are a few troubleshooting steps to hopefully help you solve this problem.

## 1.) Did you import vue-router?

{% highlight javascript %}
import VueRouter from 'vue-router'
{% endhighlight %}

This is the most important thing to do. It was the problem I was having.

## 2.) Did you mistype a variable?

If you mistype a variable, there will be no error in your terminal. It all goes to the Javascript console.

## 3.) Check the javascript console

When in doubt, check the Javascript console in your web browser.

Here's how to do so ...:

- [on Firefox](https://developer.mozilla.org/en-US/docs/Tools/Web_Console/Opening_the_Web_Console)
- and [on Chrome](https://developers.google.com/web/tools/chrome-devtools/console/)

Hope this helps.
