---
title: How to Get Vim to Use the Background color of your Terminal Emulator instead of the colorscheme
date: 2018-06-10
category: Coding
tags: [Open-Source, Coding]
icon: linux
---

So, you'd like to get Vim to use the syntax colors from your colorscheme but you would like the background to match the color of your terminal emulator.

Surprisingly, I couldn't find this info anywhere. But through hacking around with a colorscheme to figure out how it sets background colors, **I finally found out how**.

### To disable your colorscheme's background, add the following to your Vim config file

```vim
highlight Normal ctermbg=none guibg=none
highlight SignColumn ctermbg=none guibg=none
highlight LineNr ctermbg=none guibg=none
```

### GitGutter users WAIT!

If you use GitGutter, you must also add this configuration line:

```vim
let g:gitgutter_override_sign_column_highlight = 0
```

Enjoy!
