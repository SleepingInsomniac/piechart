// bleh

function Color(red, green, blue) {
	this.red = red;
	this.green = green;
	this.blue = blue;
	
	this.rgb = function() {
		return "rgb("+this.red+", "+this.green+", "+this.blue+")";
	}
		
	return this;
}

function RandomColor() {
	var color = new Color(
		Math.floor(Math.random()*150)+50,
		Math.floor(Math.random()*150)+50,
		Math.floor(Math.random()*150)+50
		);
		
	return color;
}

function generatePieChart(size, chartID, values) {
	// values is an array of arrays containing [value, title, color];
	var chartCanvas = document.createElement('canvas');
	chartCanvas.width = size;
	chartCanvas.height = size;
	
	var ctx = chartCanvas.getContext('2d');
	
	var sum = 0;
	for (var i = 0; i < values.length; i++) {
		sum = sum + parseFloat(values[i][0]);
	}
	
	var labels = document.createElement('ul');
	
	// var lastArc = 270 * Math.PI/180;
	var lastArc = 0;
	// ctx.translate(size/4, size);
	// ctx.rotate(270 * Math.PI/180);
	for (var i = 0; i < values.length; i++) {
		var number = values[i][0];
		
		ctx.beginPath();
		ctx.moveTo(size/2,size/2);
		var arc = ((number/sum)*360) * (Math.PI/180);
		ctx.arc(size/2, size/2, size/2, lastArc, arc+lastArc, false);
		lastArc = arc+lastArc;
		ctx.closePath();
				
		var color;
		if (values[i][2]) {
			color = values[i][2];
		} else {
			color = new RandomColor();
		}

		ctx.fillStyle = color.rgb();
		ctx.fill();
		
		// ctx.fillStyle = "black";
		// ctx.font = "20px Helvetica";
		// ctx.fillText(values[i][0], Math.sin((number/sum)*360)*(size/2)+(size/2), Math.cos((number/sum)*360)*(size/2)+(size/2));
		
		var label = document.createElement('li');
		label.style.color = color.rgb();

		var percent = document.createElement('p');
		var num = (number/sum)*100;
		percent.innerHTML = '<b>'+values[i][0]+'</b> '+values[i][1]+': '+Math.round(num)+'%';
		percent.style.display = 'inline-block';

		label.appendChild(percent);
		labels.appendChild(label);
	}
	
	var chart = document.createElement('div');
	chart.id = chartID;
	chart.className = 'pieChart';
	chart.appendChild(chartCanvas);
	chart.appendChild(labels);
	
	return chart;
}