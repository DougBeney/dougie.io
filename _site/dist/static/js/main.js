var pswpElement = document.querySelectorAll('.pswp')[0];

function lightboxify(query){
	$(query).each(function(){
		$(this).wrap('<div class="lightbox"></div>');
		$(this).css("cursor", "pointer");
	});
    $('.lightbox').click(function(){
        var src=$(this).find('img').attr('src');
        var tmpImg = new Image();
        tmpImg.src=src; //or  document.images[i].src;
        $(tmpImg).on('load',function(){
            var w = tmpImg.width;
            var h = tmpImg.height;

            loadImage(src, w, h);
        });
    });
}

function loadImage(url, w, h){
	// build items array
	var items = [
			{
					src: url,
					w: w,
					h: h
			}
	];

	// define options (if needed)
	var options = {
			// optionName: 'option value'
			// for example:
			index: 0 // start at first slide
	};

	// Initializes and opens PhotoSwipe
	var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
	gallery.init();

}


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
