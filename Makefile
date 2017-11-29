all: serve

edit:
	subl src

serve:
	jekyll serve

clearcache:
	rm -rf .pug-cache
	rm -rf .sass-cache

config:
	subl _config.yml
