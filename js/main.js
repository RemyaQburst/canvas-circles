$(document).ready(function() {
	var canvas = $("#canvas"),
		context = canvas.get(0).getContext("2d"),
		canvasWidth = canvas.width(),
		canvasHeight = canvas.height(),
		circles = [];
	generateCircles(10);

	function generateCircles(count) {
		for (var i = 0; i < count; i++) {
			circles.push(generateCircle(i));
		}
	}

	function randomColour() {
		var r = randomFromTo(20, 80);
		var g = randomFromTo(30, 120);
		var b = randomFromTo(40, 120);
		return new Colour(r, g, b, 0.5);
	}

	function generateCircle(index) {
		var circle = new Circle();
		circle.id = index;
		circle.radius = 5;			
		circle.x = randomFromTo(20, 80);
		circle.y = randomFromTo(20, 80);
		circle.colour = randomColour();
		circle.draw(context);
		return circle;
	}
	// Generate a random number between the lowest and highest (inclusive)
	function randomFromTo(from, to){
		return Math.floor(Math.random() * (to - from + 1) + from);
	}
	function clearCanvas() {
		context.clearRect(0, 0, canvasWidth, canvasHeight);
	}

	canvas.click(function(e) {
	    // correct mouse coordinates:
	    var rect = canvas[0].getBoundingClientRect(),  // make x/y relative to canvas
	        x = e.clientX - rect.left,
	        y = e.clientY - rect.top,
	        i = 0, circle;

	    // check which circle:
	    while(circle = circles[i++]) {
	        context.beginPath();  // we build a path to check with, but not to draw
	        context.arc(circle.x, circle.y, circle.radius, 0, 2*Math.PI);
	        if (context.isPointInPath(x, y)) {
	        	circle.xMovementStep = canvasWidth/2;
	        	circle.yMovementStep = canvasHeight/2;
	        	circle.move();
	        	circle.draw(context);
	   //      	circles[i--] = circle;
	   //      	clearCanvas();
	   //      	for (var i = 0; i < circles.length; i++) {
				// 	//generateCircle(i);
				// 	circle.id = circles[i].id;
				// 	circle.radius = circles[i].radius;			
				// 	circle.x = circles[i].x;
				// 	circle.y = circles[i].y;
				// 	circle.colour = circles[i].colour;
				// 	circle.draw(context);
				// }
	            alert("Clicked circle: " + circle.id);
	            break;
	        }
	    }
	    debugger
	});
});