var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Constraint = Matter.Constraint,
    Mouse = Matter.Mouse,
    MouseConstraint = Matter.MouseConstraint;

var blocksize = 50;
var maxBlocks = 25;
var blockAddDelay = 1200;

var engine = Engine.create();

engine.world.gravity.y = 0.15;

Engine.run(engine);

var boxes = [];
var ground;
var left_boundary;
var right_boundary;

var boundary_options = {
	isStatic: true,
	friction: 1,
	restitution: 1
};

var mcon;

var boxAdderLoop;
function startBoxAdderLoop() {
    boxAdderLoop = window.setInterval(function(){
		var x = Math.floor(Math.random()*(width/50))*blocksize;
		placeRandomBlock(x, -25);
    },blockAddDelay);
}
function stopBoxAdderLoop() {
    window.clearInterval(boxAdderLoop);
    console.log('Window unfocused - Paused Box Adding Loop');
}

function setup() {
    var myCanvas = createCanvas(windowWidth, '300px');
	$(myCanvas.canvas).appendTo('.home-hero');

	ground = Bodies.rectangle(width/2,height+25,width,50,boundary_options)
	left_boundary = Bodies.rectangle(-25,height/2,50,height,boundary_options)
	right_boundary = Bodies.rectangle(width+25,height/2,50,height,boundary_options)

	World.add(engine.world, [ground, left_boundary, right_boundary]);
	windowResized();



    window.addEventListener('focus', startBoxAdderLoop);
    window.addEventListener('blur', stopBoxAdderLoop);
    startBoxAdderLoop();

    var canvasmouse = Mouse.create(myCanvas.canvas);
    canvasmouse.element.removeEventListener("mousewheel", canvasmouse.mousewheel);
    canvasmouse.element.removeEventListener("DOMMouseScroll", canvasmouse.mousewheel);
    canvasmouse.pixelRatio = pixelDensity();
    var mcon = MouseConstraint.create(engine, {
        mouse: canvasmouse
    });

    World.add(engine.world, mcon);
}

function draw() {
	background("#F1646C");
	rectMode(CENTER);
	for(var i = 0; i < boxes.length; i++){
		push();
		translate(boxes[i].getX(), boxes[i].getY());
		rotate(boxes[i].getBody().angle);

		stroke(boxes[i].fill);
		fill(boxes[i].fill);
		rect(0,0, boxes[i].w,boxes[i].h);
		pop();
	}

	if(boxes.length > maxBlocks){
		World.remove(engine.world, boxes[0].getBody())
		boxes.splice(0,1);
	}
}

function windowResized() {
	console.log("resized")
	//resizing canvas
	var new_width = windowWidth;
	var new_height = $('.home-hero').height();
	resizeCanvas(new_width, new_height);

    if(new_width <= 700){
        maxBlocks = 15;
    }else if(new_width <= 1000){
        maxBlocks = 20;
    }else{
        maxBlocks = 30;
    }

	//resizing boundaries
	World.remove(engine.world, [ground, left_boundary, right_boundary]);
		ground = Bodies.rectangle(new_width/2,new_height+25,width,50,boundary_options);
		left_boundary = Bodies.rectangle(-25,height/2,50,height,boundary_options)
		right_boundary = Bodies.rectangle(width+25,height/2,50,height,boundary_options)
	World.add(engine.world, [ground, left_boundary, right_boundary]);
}
