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

