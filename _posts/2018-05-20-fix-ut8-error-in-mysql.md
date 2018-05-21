---
title: How To Fix the "utf8mb4_unicode_520_ci" Error When Importing a SQL File
date: 2018-05-20
icon: database
category: Answers
---

Migrating a site from one server to the next is usually a pain. It's not that it's a difficult task in itself. It's just that you'll come across one silly error and end up spending days on it.

When importing a MySQL database (Usually via PhpMyAdmin), you might come across the following error:

> Unknown collation: ‘utf8mb4_unicode_520_ci’

There were a few StackOverflow answers that were decently helpful. The most reliable solution I found was [this](https://stackoverflow.com/a/49100015) underrated one by VUUB.

He essentially tells you that there are three parts in your SQL file that you have to find and replace.

**The only problem is that this takes a while if you have multiple SQL files**. So let's automate it!

## Fixing your SQL files through the magic of Python

I decided to create a Python file to make this process easier. You can either [download the script here](/s/fixsqlutf.py) of copy-and-paste it from below.

There is only one change you have to make. Edit the `file_base_names` array and add the basenames of all of your files. (For example, if you have the file `mysite.sql`, the basename would be `mysite`) You could add as many basenames as you want.

Copy the script into the directory where your sql files are and then run it using the command `python3 fixsqlutf.py`.

You will now have new SQL files titled "{your base name}-fixed.sql".

{% highlight python %}
#!/bin/python3
import sys

file_basenames = [
	"basename_of_your_sql_file",
]

search_and_replace_patterns = [
	["utf8mb4_unicode_ci"    , "utf8_general_ci"],
	["utf8mb4_unicode_520_ci", "utf8_general_ci"],
	["utf8mb4"               , "utf8"]
]

for basename in file_basenames:
	try:
		with open(basename+".sql") as f:
			text = f.read()
	except:
		sys.exit()

	for pattern in search_and_replace_patterns:
		search_pattern  = pattern[0]
		replace_pattern = pattern[1]
		text = text.replace(search_pattern, replace_pattern)
	save_file = open(basename+"-fixed.sql", "w")
	save_file.write(text)
	save_file.close()
{% endhighlight %}

Hope this helps!
