var c = document.getElementById("fracCanvas");
var ctx = c.getContext("2d");

c.width = window.innerWidth;
c.height = window.innerHeight;
ctx.fillStyle="#EEEEEE";

var margTop = 120;
var margLeft = 120;

var numFractals = 2;
var fractal = Math.floor(Math.random() * numFractals); //0: cantor; 1: dragon curve

//cantor set

var cantorHeight = 40;
var cantorWidth = window.innerWidth - margLeft * 2;
var cantorVGap = 30;
var cantorHGap = 10;
var cantorPos = margTop;

//dragon curve

var dc_iter = 10;
var dragon_curve = [0,0,1];
var dragon_curve_tmp = dragon_curve;

if(fractal==1) {
	for(var j=0; j < dc_iter; j++) {
		
		dragon_curve_tmp = dragon_curve.slice();
		dragon_curve_tmp.push(0);
		for(var k=0; k < dragon_curve.length; k++) {
			if(dragon_curve[k]==0) {
				dragon_curve[k] = 1;
			}
			else {
				dragon_curve[k] = 0;
			}
		}
		for(var k=0; k < dragon_curve.length; k++) {
			dragon_curve_tmp.push(dragon_curve[dragon_curve.length-1-k]);
		}
		
		dragon_curve = dragon_curve_tmp.slice();
	}
	//alert(dragon_curve);
	
	var scale = 20;
	
	var lp_x = 0;
	var lp_y = 1;
	
	var x = window.innerWidth/4;
	var y = window.innerHeight/2;
	ctx.beginPath();
	ctx.moveTo(x,y);
	x += lp_x * scale;
	y += lp_y * scale;
	ctx.lineTo(x,y);
	ctx.stroke();
}

var i = 0;

window.setInterval(function(){drawFrac();}, (fractal==1)?100:1000);

function drawFrac() {
	if(fractal==1) {
		if(i>=dragon_curve.length) return;
		var nlp_x = 0;
		var nlp_y = 0;
		if(dragon_curve[i]==0) {//right
			nlp_x =  0* lp_x +  1* lp_y;
			nlp_y = -1* lp_x +  0* lp_y;
		}
		else {//left
			nlp_x =  0* lp_x + -1* lp_y;
			nlp_y =  1* lp_x +  0* lp_y;
		}
		lp_x = nlp_x;
		lp_y = nlp_y;
		
		ctx.beginPath();
		ctx.moveTo(x,y);
		x += lp_x * scale;
		y += lp_y * scale;
		ctx.lineTo(x,y);
		ctx.stroke();
	}
	else {
		if(i>6) return;
		if(i==0) {
			ctx.fillRect(margLeft,cantorPos,cantorWidth,cantorHeight); 
		}
		else {
			var numEle = Math.pow(2,i);
			var numGaps = numEle - 1;
			var curWidth = (cantorWidth - numGaps * 2 * cantorHGap) / numEle;
			for(var j=0; j < numGaps; j++) {
				ctx.fillRect(margLeft,cantorPos,curWidth,cantorHeight);
				ctx.fillRect(margLeft+(curWidth+2*cantorHGap)*(j+1),cantorPos,curWidth,cantorHeight);
			}
		}
		
		cantorPos += cantorHeight + cantorVGap;
		cantorHeight--; if(cantorHeight<1) cantorHeight = 1;
		cantorVGap--; if(cantorVGap<1) cantorVGap = 1;
	}
	
	i++;
}