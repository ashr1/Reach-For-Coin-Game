var canvasCtx, stopIntId;

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
//-------------------------------------------------------------------------------------------------------------------------------
var playerObj = function() {
	this.coord = {x: 0, y: 0};
	this.color = "rgb(129, 159, 165)";
	this.height = 10;
	this.width = 10;
};

playerObj.prototype.outOfBounds = function(x, y) {
	var endPtX, endPtY;

	// 10 is hard coded...need to improve this
	endPtX = x + this.width;
	endPtY = y + this.height;

	var outOfBounds = x < 0 || (endPtX > canvas.attr('width')) || y < 0 || (endPtY > canvas.attr('height'));

	console.log(outOfBounds);
	return outOfBounds;
};

playerObj.prototype.updateCoord = function(keyCode) {
	var possibleX, possibleY;

	possibleX = this.coord.x;
	possibleY = this.coord.y;
	//direction arrows and their code
	if(keyCode == 38) {
		//up key
		possibleY = possibleY - 1;
		//check that the posible change is within bounds, if so adjust. if not leave it alone
		if(!(this.outOfBounds(possibleX, possibleY))) {
			this.coord.y = this.coord.y - 1;
		}
	}
	if(keyCode == 40) {
		//down key
		possibleY = possibleY + 1;
		//check that the posible change is within bounds, if so adjust. if not leave it alone
		if(!(this.outOfBounds(possibleX, possibleY))) {
			this.coord.y = this.coord.y + 1;
		}
	}
	if(keyCode == 37) {
		//left key
		possibleX = possibleX - 1;
		//check that the posible change is within bounds, if so adjust. if not leave it alone
		if(!(this.outOfBounds(possibleX, possibleY))) {
			this.coord.x = this.coord.x - 1;
		}
	}
	if(keyCode == 39) {
		//right key
		possibleX = possibleX + 1;
		//check that the posible change is within bounds, if so adjust. if not leave it alone
		if(!(this.outOfBounds(possibleX, possibleY))) {
			this.coord.x = this.coord.x + 1;
		}
	}
};

playerObj.prototype.display = function() {
	canvasCtx.fillStyle = this.color;
	canvasCtx.fillRect(this.coord.x, this.coord.y, this.width, this.height);
};

//-------------------------------------------------------------------------------------------------------------------------------

var player = new playerObj();
player.display();

// canvas rendering is fully dependent on the user keydown event...everything user can control
$(document).on('keydown', function(e) {
	//console.log(e.keyCode);
	canvasCtx.clearRect(0, 0, canvas.attr('width'), canvas.attr('height'));
	//attached to specific instance...not good practice
	player.updateCoord(e.keyCode);
	player.display();

});

/*var stopIntervalWork = function() {
	console.log('stopped the interval');
	clearInterval(stopIntId);
};*/

/*
canvasCtx.fillStyle = "rgb(129, 159, 165)";


//player movement is event based...doesn't need interval loop to keep redrawing the same unmoved position
// it seems interval loop is for other object in the game that move on their own..outside user event control
stopIntId = setInterval(function() {

	canvasCtx.clearRect(0, 0, canvas.attr('width'), canvas.attr('height'));
	canvasCtx.fillRect(coordX, coordY, 10, 10);
	//coordX++;
	//coordY++;

	//if(outOfBounds(coordX, coordY)) {
		//stopIntervalWork();
	//}

}, 1000/30);*/


