var canvas = $('<canvas></canvas>', {
	attr: {
		width: 100,
		height: 100
	},
	css: {
		border: '1px solid black'
	}
});

canvas.appendTo($('body'));

if(canvas.get(0).getContext) {
	canvasCtx = canvas.get(0).getContext("2d");
}
else {
	canvas.html("Canvas may not be supported");
}

var canvasCtx, coordX, coordY, stopIntId;

var outOfBounds = function() {
	var outOfBounds = (coordX > canvas.attr('width')) || (coordY > canvas.attr('height'));
	return outOfBounds;
};

var stopIntervalWork = function() {
	clearInterval(stopIntId);
};

coordX = 0;
coordY = 0;

canvasCtx.font = "15px serif";

stopIntId = setInterval(function() {

	canvasCtx.clearRect(0, 0, canvas.attr('width'), canvas.attr('height'));
	canvasCtx.fillText("Hello World!", coordX, coordY);
	coordX++;
	coordY++;

	if(outOfBounds()) {
		stopIntervalWork();
	}

}, 1000/30);