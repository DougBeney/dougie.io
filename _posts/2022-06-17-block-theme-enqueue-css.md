---
title: How to Enqueue CSS and JS in Wordpress Block Themes (and load it only on CERTAIN templates!)
date: 2022-06-17
icon: code
category: Answers
tags: [Wordpress]
---

Block themes are a very promising direction the Wordpress project is taking. I love being able to avoid PHP as much as possible to design websites and with block themes you are essentially using static HTML.

One problem I ran into was enqueing CSS or JS files ONLY on certain templates. While with most websites this is no big deal, but if you are doing something like creating highly optimized landing pages that you want zero unused CSS or JS in, this becomes more important.

## How To Enqueue CSS in Wordpress Block Themes

It's no different than with regular Wordpress themes.

You have to add a snippet of code similar to this in your theme's `functions.php`.

{% highlight php %}
add_action( 'wp_enqueue_scripts', 'mytheme_enqueue' );
function mytheme_enqueue() {
	wp_enqueue_style( 'mytheme-main-styles', get_stylesheet_uri() );
	wp_enqueue_style( 'mytheme-other-styles', get_template_directory_uri() . '/css/other-styles.css' );
	wp_enqueue_script( 'mytheme-js', get_template_directory_uri() . '/js/main.js' );
}
{% endhighlight %}

## How To Enqueue CSS in Wordpress Block Themes Only on Specific Template

{% highlight php %}
add_action( 'wp_enqueue_scripts', 'mytheme_enqueue' );
function mytheme_enqueue() {
	$custom_template = get_post_meta( get_the_ID(), '_wp_page_template', true );
	// Enqueue script if the user is viewing a webpage that is using the 'templates/foo.html' block template.
	if ($custom_template == 'foo') {
		wp_enqueue_style( 'mytheme-other-styles', get_template_directory_uri() . '/css/other-styles.css' );
	}
}
{% endhighlight %}

## Credit

Enqueing a stylesheet/script on a specific template page was one of those problems that stumped me for days. The normal Wordpress template related functions just did not work. Big, big thanks to S. Walsh who answered [my StackOverflow question](https://stackoverflow.com/questions/72579216/how-can-i-enqueue-a-css-file-on-a-specific-wordpress-block-template/72611348#72611348).
