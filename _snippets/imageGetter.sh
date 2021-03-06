#!/bin/sh
# NOTE: This script is only to be used for purposes that comply with copyright laws.

# Get HTML of page from user's input, get all of the image links, and make sure URLs have HTTPs
curl $1 | grep -E "(https?:)?//[^/\s]+/\S+\.(jpg|png|gif)" -o | sed "s/^(https?)?\/\//https\:\/\//g" -r > urls.txt

# Downloading Images
wget -i urls.txt -P downloads/

