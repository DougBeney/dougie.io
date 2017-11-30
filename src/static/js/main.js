---
---

{% include_relative _lib/lightbox_stuff.js %}

// Collapse Navbar
document.addEventListener('DOMContentLoaded', function () {

  // Get all "navbar-burger" elements
  var $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {

    // Add a click event on each of them
    $navbarBurgers.forEach(function ($el) {
      $el.addEventListener('click', function () {

        // Get the target from the "data-target" attribute
        var target = $el.dataset.target;
        var $target = document.getElementById(target);

        // Toggle the class on both the "navbar-burger" and the "navbar-menu"
        $el.classList.toggle('is-active');
        $target.classList.toggle('is-active');

      });
    });
  }

});


// email popup
email_popup_element = "#email_popup"
close_button = ".close_button"
open_button = "#open_button"

$(open_button).click(function(){
  $(email_popup_element).addClass('is-active')
});

$(close_button).click(function(){
  $(email_popup_element).removeClass('is-active')
  console.log('removing class')
});
