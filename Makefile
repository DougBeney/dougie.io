all: serve

edit:
	subl src

serve:
	bundle exec jekyll serve

clearcache:
	rm -rf .pug-cache
	rm -rf .sass-cache

config:
	subl _config.yml

netlify:
	npm i jekyll-bliss -g
	jekyllbliss build
