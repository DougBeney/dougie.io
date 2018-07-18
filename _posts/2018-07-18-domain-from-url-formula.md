---
title: Formula to Get a Domain Name from a URL in Libreoffice & Excel (With Generator!)
date: 2018-07-18
icon: table
category: Data
tags: [Data Science, Libreoffice, Excel]
---

Enter the cell that contains your URL and the formula to get the domain name will be generated below.

<div id="app">
<label><b>Cell:</b></label> <input type="text" v-model="cellValue">

<br style="display: block; padding: 20px;"/>

<pre style="margin-top: 15px">
=LEFT(SUBSTITUTE(SUBSTITUTE({%raw%}{{cellValue}}{%endraw%}, "https://", ""), "http://", ""), FIND("/", SUBSTITUTE(SUBSTITUTE({%raw%}{{cellValue}}{%endraw%}, "https://", ""), "http://", ""), 3)-1)
</pre>

</div>

<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>

<script>
var app2 = new Vue({
  el: '#app',
  data: {
    cellValue: 'A2'
  }
})
</script>
