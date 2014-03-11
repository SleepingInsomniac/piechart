// bleh

var values = null;
var form = null;
var charts = null;

window.onload = function() {
	values = document.getElementById('values');
	form = document.getElementById('piechart');
	charts = document.getElementById('charts');
}

function RandomColor() {
	this.red = Math.floor(Math.random()*150)+50;
	this.green = Math.floor(Math.random()*150)+50;
	this.blue = Math.floor(Math.random()*150)+50;
	
	return this;
}

function addValue() {
	var label = document.createElement('label');
	label.setAttribute('for', 'value'+form.elements.length);
	var input = document.createElement('input');

	label.innerHTML = 'value';
	
	var li = document.createElement('li');
	
	var remove = document.createElement('input');
	remove.type = 'button';
	remove.value = 'remove';
	remove.onclick = function() {
		this.parentNode.remove(this);
	}
	
	li.appendChild(label);
	li.appendChild(input);
	li.appendChild(remove);
	values.appendChild(li);
}

function submitValues() {
	var values = [];
	for (var i = 0; i < form.elements.length; i++) {
		if (form.elements[i].value.match(/\d+/)) {
			values.push(parseFloat(form.elements[i].value));
		}
	}
	
	var chart = generatePieChart(100, values);
	var li = document.createElement('li');	
	li.appendChild(chart);
	charts.appendChild(li);
}

function generatePieChart(size, values) {
	var chartCanvas = document.createElement('canvas');
	chartCanvas.width = size;
	chartCanvas.height = size;
	
	var ctx = chartCanvas.getContext('2d');
	
	var sum = 0;
	for (var i = 0; i < values.length; i++) {
		sum = sum + parseFloat(values[i]);
	}
	
	var labels = document.createElement('ul');
	labels.className = 'labels';
	
	var lastArc = 0;
	for (var i = 0; i < values.length; i++) {
		ctx.beginPath();
		ctx.moveTo(size/2,size/2);
		var arc = ((values[i]/sum)*360) * (Math.PI/180);
		ctx.arc(size/2, size/2, size/2, lastArc, arc+lastArc, false);
		lastArc = arc+lastArc;
		ctx.closePath();
		
		var color = new RandomColor();

		ctx.fillStyle = "rgb("+color.red+", "+color.green+", "+color.blue+")";
		ctx.fill();
		
		var label = document.createElement('li');
		var colorBlock = document.createElement('span');
		colorBlock.style.display = 'inline-block';
		colorBlock.style.backgroundColor = 'rgb('+color.red+', '+color.green+', '+color.blue+')';
		colorBlock.style.width = '10px';
		colorBlock.style.height = '10px';
		label.appendChild(colorBlock);
		var percent = document.createElement('p');
		var num = (values[i]/sum)*100;
		percent.innerHTML = num.toFixed(2)+'%';
		percent.style.display = 'inline-block';
		percent.style.color = 'rgb('+color.red+', '+color.green+', '+color.blue+')';
		label.appendChild(percent);
		labels.appendChild(label);
	}
	
	var chart = document.createElement('div');
	chart.appendChild(chartCanvas);
	chart.appendChild(labels);
	
	return chart;
}

function addChart(chartCanvas) {
	var li = document.createElement('li');	
	li.appendChild(chartCanvas);
	charts.appendChild(li);
}