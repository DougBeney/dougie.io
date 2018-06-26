---
title: How to Export Wordpress Comments Using PHPMyAdmin
date: 2018-06-21
icon: database
category: Answers
---

`SELECT comment_post_ID, comment_author, comment_author_email, comment_author_url, comment_author_IP, comment_date, comment_date_gmt, comment_content, comment_karma, comment_approved, comment_agent, comment_type, comment_parent, user_id FROM wp_comments WHERE 1;`
