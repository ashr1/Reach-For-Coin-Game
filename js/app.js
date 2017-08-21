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
	console.log(outOfBounds);
	return outOfBounds;
};

var stopIntervalWork = function() {
	console.log('stopped the interval');
	clearInterval(stopIntId);
};

coordX = 0;
coordY = 0;

canvasCtx.fillStyle = "rgb(129, 159, 165)";

stopIntId = setInterval(function() {

	canvasCtx.clearRect(0, 0, canvas.attr('width'), canvas.attr('height'));
	canvasCtx.fillRect(coordX, coordY, 10, 10);
	coordX++;
	coordY++;

	if(outOfBounds()) {
		stopIntervalWork();
	}

}, 1000/30);

//rgb(95, 110, 132)
//rgb(129, 159, 165)