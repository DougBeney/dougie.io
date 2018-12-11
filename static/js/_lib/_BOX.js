function BOX(x,y,w,h,fill,options){
	var BOX_CREATED = Bodies.rectangle(x, y, w, h, options);
	this.getX = function(){return BOX_CREATED.position.x};
	this.getY = function(){return BOX_CREATED.position.y};
	this.w = w;
	this.h = h;
	this.getBody = function(){return BOX_CREATED};
	this.fill = fill;
	World.add(engine.world, BOX_CREATED);
}

function placeRandomBlock(x,y){
	var colors = [
			"#DE555E",
			"#ff7d83"
		];
		var width = $('canvas').width();
		var height = $('canvas').height();

		var fill = colors[Math.floor((Math.random() * colors.length))];
		var width = Math.floor(Math.random()*2+1)*blocksize;
		var height = Math.floor(Math.random()*2+1)*blocksize;
		boxes.push(new BOX(x, y, width, height, fill));
}
