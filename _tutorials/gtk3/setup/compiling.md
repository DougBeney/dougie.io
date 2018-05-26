---
title: Compiling an Example App
layout: post
---

In this section, we are going to compile the following code. For now, don't worrying about trying to understand it. We just want to prove that our GTK+3 installation was successful.

1. TOC
{:toc}

## The Code

If the below code is difficult for you to copy, [you can directly download it here](/s/tutorials/gtk3/hello-world.c).

{% highlight c %}
#include <gtk/gtk.h>

static void activate (GtkApplication* app, gpointer user_data) {
	GtkWidget *window;
	window = gtk_application_window_new (app);
	gtk_widget_show_all (window);
}

int main (int argc, char **argv) {
	GtkApplication *app;
	app = gtk_application_new ("io.dougie.myapp", G_APPLICATION_FLAGS_NONE);
	g_signal_connect (app, "activate", G_CALLBACK (activate), NULL);
	int status = g_application_run (G_APPLICATION (app), argc, argv);
	g_object_unref (app);
	return status;
}
{% endhighlight %}

## Let's Compile

Save this code into a file called `hello-world.c` on your computer.

Open your terminal and cd into the directory of the file.

Run the following to compile.

```
gcc hello-world.c `pkg-config gtk+-3 --libs --cflags`
```

Now, you'll notice a file called `a.out` created. To run it, type `./a.out`[](.)

You now have a window! Sweet.

### Let's break this down

```
gcc hello-world.c
```

In this command we are telling GCC (GNU Compiler Collection) to process our file, `hello-world.c`. We are using it as a C compiler. If this is new to you, I recommend watching some beginner C programming tutorials and/or watching some videos on compiling C cod.

```
`pkg-config gtk+-3.0 --libs --cflags`
```

This part of the command might bring some confusion. First, let me tell you that those little ticks (`) are NOT single quotation marks. They are [backticks](https://unix.stackexchange.com/questions/27428/what-does-backquote-backtick-mean-in-commands).

Backticks allow us to run commands within our commands. The `pkg-config` command will return a bunch of text relevant to your system, telling GCC where the GTK3 library files are.

For fun, enter the command `pkg-config gtk+-3.0 --libs --cflags` in your terminal (without backticks). You'll see a bunch of command line options printed out to your terminal.

Using the `pkg-config` command saves us a lot of typing and makes our program cross-platform as the header locations will vary from system-to-system.

