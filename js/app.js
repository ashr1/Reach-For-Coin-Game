
// coordinates adjustments requires acces to those (global) variables....maybe time to think about structure
var coordinateAdjustment = function(keyCode) {
	var possibleX, possibleY;

	possibleX = coordX;
	possibleY = coordY;
	//direction arrows and their code
	if(keyCode == 38) {
		//up key
		possibleY = possibleY - 1;
		//check that the posible change is within bounds, if so adjust. if not leave it alone
		if(!(outOfBounds(possibleX, possibleY))) {
			coordY = coordY - 1;
		}
	}
	if(keyCode == 40) {
		//down key
		possibleY = possibleY + 1;
		//check that the posible change is within bounds, if so adjust. if not leave it alone
		if(!(outOfBounds(possibleX, possibleY))) {
			coordY = coordY + 1;
		}
	}
	if(keyCode == 37) {
		//left key
		possibleX = possibleX - 1;
		//check that the posible change is within bounds, if so adjust. if not leave it alone
		if(!(outOfBounds(possibleX, possibleY))) {
			coordX = coordX - 1;
		}
	}
	if(keyCode == 39) {
		//right key
		possibleX = possibleX + 1;
		//check that the posible change is within bounds, if so adjust. if not leave it alone
		if(!(outOfBounds(possibleX, possibleY))) {
			coordX = coordX + 1;
		}
	}
};

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

// problem is I must have access to the player object which is a fillRect...not an view element, its just paint pretty much
// player object viewable rep is more of coordinates and must also include the width and height of its fillRect dimensions
var outOfBounds = function(coordX, coordY) {
	var endPtX, endPtY;

	// 10 is hard coded...need to improve this
	endPtX = coordX + 10;
	endPtY = coordY + 10;

	//var outOfBounds = (coordX > canvas.attr('width')) || (coordX < 0) || (coordY > canvas.attr('height')) || (coordY < 0);
	var outOfBounds = coordX < 0 || (endPtX > canvas.attr('width')) || coordY < 0 || (endPtY > canvas.attr('height'));
	console.log(outOfBounds);
	return outOfBounds;
};

var stopIntervalWork = function() {
	console.log('stopped the interval');
	clearInterval(stopIntId);
};

coordX = 0;
coordY = 0;

$(document).on('keydown', function(e) {
	//console.log(e.keyCode);
	coordinateAdjustment(e.keyCode);
});

canvasCtx.fillStyle = "rgb(129, 159, 165)";

//player movement is event based...doesn't need interval loop to keep redrawing the same unmoved position
// it seems interval loop is for other object in the game that move on their own..outside user event control
stopIntId = setInterval(function() {

	canvasCtx.clearRect(0, 0, canvas.attr('width'), canvas.attr('height'));
	canvasCtx.fillRect(coordX, coordY, 10, 10);
	//coordX++;
	//coordY++;

	/*if(outOfBounds(coordX, coordY)) {
		stopIntervalWork();
	}*/

}, 1000/30);
