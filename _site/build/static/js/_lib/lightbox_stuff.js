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
