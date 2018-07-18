---
title: Formula to Get a Domain Name from a URL in Libreoffice & Excel (With Generator!)
date: 2018-07-18
icon: table
category: spreadsheet-formulas
tags: [Data-Science, Spreadsheets, Tech-Productivity-Tips]
---

Enter the cell that contains your URL and the formula to get the domain name will be generated below.

<div id="app">
<label><b>Cell:</b></label> <input type="text" v-model="cellValue">

<br style="display: block; padding: 20px;"/>

<pre style="margin-top: 15px">
=IF(ISNUMBER(FIND("/", SUBSTITUTE(SUBSTITUTE(SUBSTITUTE({%raw%}{{cellValue}}{%endraw%}, "www.", ""), "http://", ""),"https://", ""), 3)), LEFT(SUBSTITUTE(SUBSTITUTE(SUBSTITUTE({%raw%}{{cellValue}}{%endraw%}, "www.", ""), "http://", ""),"https://", ""), FIND("/", SUBSTITUTE(SUBSTITUTE(SUBSTITUTE({%raw%}{{cellValue}}{%endraw%}, "www.", ""), "http://", ""),"https://", ""), 3) - 1), SUBSTITUTE(SUBSTITUTE(SUBSTITUTE({%raw%}{{cellValue}}{%endraw%}, "www.", ""), "http://", ""),"https://", ""))
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

---

**About this formula**: I [used Lisp](/coding/lisp-formula-generator/) to help create it.
