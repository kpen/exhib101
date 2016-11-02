function Start(){;;}

var pictsnames = ['/static/common/imgs/img2379.JPG', '/static/common/imgs/img2348.JPG']

var saving = false
 var Lmx = 0
 var Lmy = 0
var pressed = false
var tmp_dash

// -  -  -  -for selection function -  -  -  -  -
var mssel=[];
var mssel7=0;
// -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -

var Deleted=[];
var EColor=[]; //The array of elements color
var NElements=[]; //the array of the names such as "polygons", "lines", "textes "
var MElements=[]; //the array of the_arrays_of_points (I have to keep it in memory)=MEle[msss[[x,y],[x,y],[x,y]]]
var Elements=[]; //all the drawn elements (as polylines, etc)
var eLcount=0;

var lines=[]; //all the lines (made of two points each).. the lines of a polyline
var licount=0;
var msss=[]; //all the points of a polyline or a polygone... just points
var mscount=0;
var mspart=0

var draw;
var polyline;
var wT, hT, wTH, hTH;
var ESX, ESY, kf;
var Lkf=1;

var RGB = [15,15,7];
var polygon23;

var drawTimer = null

//---M-a-k-s---
function DRW(){
  var t21 = Math.round(ESX-kf*wTH/2)
  var t22 = Math.round(ESY-kf*hTH/2)
 //  console.log("DRW  " +t21+'..'+t22+'..'+Math.round(wTH*kf)+'..'+ Math.round(hTH*kf))
  draw.viewbox(t21,t22,Math.round(wTH*kf), Math.round(hTH*kf));
 
}
//---M-a-k-s---
function touchEvents(){
//-------------------------------------------------------------------
    document.body.addEventListener('touchmove', function(event) {
		G_move(event.changedTouches[0].pageX,event.changedTouches[0].pageY);
        event.preventDefault();
    }, false);
//-------------------------------------------------------------------
	document.body.addEventListener('touchstart', function(event) {
		G_Down(event.changedTouches[0].pageX,event.changedTouches[0].pageY);
		event.preventDefault();
    }, false);
 //-------------------------------------------------------------------
 	 document.body.addEventListener('touchend', function(event) {
		G_up(event.changedTouches[0].pageX,event.changedTouches[0].pageY);
        event.preventDefault();
    }, false);
 //-------------------------------------------------------------------	
 	 document.body.addEventListener('mousedown', function(event) {
		G_Down(event.pageX,event.pageY);
        event.preventDefault();
    }, false);
 //-------------------------------------------------------------------	
	 document.body.addEventListener('mouseup', function(event) {
		 G_up(event.pageX,event.pageY);
        event.preventDefault();
    }, false);
 //-------------------------------------------------------------------	
	document.body.addEventListener('mousemove', function(event) {
		G_move(event.pageX,event.pageY);
		event.preventDefault();
    }, false);
 //------------------------------------------------------------------- 
 

  //-------------------------------------------------------------------
function G_Down(x,y){
  //console.log("DOWN="+x)
  mscount = 0
  mspart = 0
  msss.length=0
  	Lmx = clcX(x)
  	Lmy = clcY(y)
	msss[mscount++] = [clcX(x),clcY(y)]
	pressed = true
  drawTimer = setInterval(DrawSome,100)
}
 //-------------------------------------------------------------------

 //-------------------------------------------------------------------
function G_up(x,y){
  var Line23 = null
     if (pressed){
	   if (tmp_dash){
		   lines[licount++]=tmp_dash
		   var x23 = clcX(x)
		   var y23 = clcY(y)
		   msss[mscount++] = [x23,y23];
		   //console.log("xy23="+x23+"  "+y23);
		   tmp_dash = 0;
	   }
	   for (var k=0; k<licount; k++){lines[k].remove();}
	   licount=0;
     if (mscount > 1) {
			var i = eLcount ////del me immediately
			Deleted[eLcount] = 0;
			NElements[eLcount] = 'polyline';
       			Elements[eLcount] = draw.polyline(msss)
              .fill('none')
              .stroke({ width: 12, color:'#555' });
			Line23 = draw.polyline(msss)
              .fill('none')
              .stroke({ width: 8, color:'#f4e970' });
			MElements[eLcount++] = msss.slice();	 
			console.log(i+"#0#polyline"+MElements[i][1][0]);
			if (i >0){console.log(i+"#00#polyline"+MElements[i-1][1][0]);}
     }
   }
  clearInterval(drawTimer)
	pressed = false
  if (!saving) {saving = true; saveFile()}
}
 //-------------------------------------------------------------------
 }
//---M-a-k-s---
function Document_Ready(){;;}
////////////////////////////////////////////////////////////////////
$( document ).ready(function() {

 touchEvents(); 
 
    window.onresize = function() {
      $(document.body).width(window.innerWidth).height(window.innerHeight);
    }
 //-------------------------------------------------------------------
    $(function() {
      window.onresize();
    });
 //-------------------------------------------------------------------	
	wT = $( document ).width();	
	hT = $( document ).height();
	
	wTH=wT //Math.round((wT/100)*89);
	hTH=hT //Math.round((hT/100)*89);

	ESX=wTH/2;
	ESY=hTH/2;
	kf = 1
	var mx=0
	var my=0

	draw = SVG('drawing').size(wTH, hTH);
  //	var image = draw.image('/static/common/imgs/img2348.JPG').loaded(function(loader) {
		var image = draw.image(pictsnames[acryl]).loaded(function(loader) {
		console.log("numo="+pictsnames[acryl])
  		console.log('width='+ loader.width + "height=" + loader.height)
    	console.log("wT="+wT+"  hT="+hT)
    	kf = loader.width/wT; 
        console.log(" loader.width/wT = " + kf)
      	console.log("loader.height/kf=" + (loader.height/kf))
    	if ((loader.height/kf) > hT){
    		 kf = loader.height/hT
      		console.log(" loader.height/hT = " + kf)
			}
      ESX = Math.round(loader.width/2)
      ESY = Math.round(loader.height/2)
     DRW()
})

// - - - - - - - - - - - - - - - - - - - - - - - - - 

}) ;//document-ready
//---M-a-k-s---
function reDraw(){
  draw.clear()
  var eLcount=0
  var Le23 = MElements.length;
  console.log("MElements.length = "+ Le23)
	for (var i=0; i< Le23; i++){
		//var Le25=MElements[i].length;
		if (Deleted[i]==0){
//   -   -   -   -   -   -   -   -   -   -
			if (NElements[i] == 'polyline'){   
              console.log(i+"#2#polyline"+MElements[i][1][0]);
               Elements[i] = draw.polyline(MElements[i]).fill('none').stroke({ width: 3 });
			//
			}
//   -   -   -   -   -   -   -   -   -   -
			if (NElements[i] == 'polygon'){  
			console.log("#2#polygon"+i);			

               Elements[eLcount] = draw.polygon(MElements[i]).fill('#999').stroke({ width: 3 });
			}			
//   -   -   -   -   -   -   -   -   -   -			
			eLcount++
		} // if Deleted[i]==0;
	} //for .. Le23 .. MElements
}
//---M-a-k-s---
function clcX(x){return Math.round(ESX+(x-wTH/2)*kf);}
function clcY(y){return Math.round(ESY+(y-hTH/2)*kf);}

//---M-a-k-s---
function needSplinting(xx,yy){
    if (Math.sqrt(Math.pow((Lmx-xx),2)+Math.pow((Lmy-yy),2)) > 12)
	{return true;}
	else {return false;}
}
//---M-a-k-s---
function G_move(x,y){
	if (pressed){
    //  console.log("MOVE="+clcX(x))
    	var xx = clcX(x); 
		var yy = clcY(y);
		msss[mscount] = [xx,yy];
		if (needSplinting(xx,yy)) {
          Lmx=xx
          Lmy=yy
          mscount++ //remember current point (for possible polygon)
	}
	else {
	 /* if (tmp_dash) { tmp_dash.remove() }
	  tmp_dash = draw.line(Lmx, Lmy, xx, yy).fill('none')
	  .stroke({ width: 2, color: (D_blink)}); ;;*/
	}
      
      
    }
} 
//---M-a-k-s---
function DrawSome() {

  var t23 = mscount-mspart
if (t23>2){
    console.log(msss[mspart] + "..." +msss[mscount-1])
		ms23 = msss.slice(mspart,(mscount))
 
			Elements[eLcount] = draw.polyline(ms23).fill('none').stroke({ width: 3 });
		mspart = mscount-1	
	}
}
//---M-a-k-s-----------------------------------------------------------------------
var T=[]; var cT=0;
function saveFile(){

var Le23 = MElements.length;
	for (var i=0; i< Le23; i++){
		var Le25=MElements[i].length;
		if (Deleted[i]==0){
//   -   -   -   -   -   -   -   -   -   -
			if (NElements[i] == 'polyline'){   
			console.log("##polyline");
					T[cT++]=101;
					T[cT++]=Le25+0;
					for (var n=0; n<Le25; n++){
						T[cT++]=MElements[i][n][0]; //X_of_the_point
						T[cT++]=MElements[i][n][1]; //Y_of_the_point
					}
			}
//   -   -   -   -   -   -   -   -   -   -
			if (NElements[i] == 'polygon'){  
			console.log("##polygon");			
					T[cT++]=102;
					T[cT++]=Le25+0;
					for (var n=0; n<Le25; n++){
						T[cT++]=MElements[i][n][0]; //X_of_the_point
						T[cT++]=MElements[i][n][1]; //Y_of_the_point
					}
					T[cT++]=EColor[i][0]; T[cT++]=EColor[i][1]; T[cT++]=EColor[i][2];
			}			
//   -   -   -   -   -   -   -   -   -   -			
			
		} // if Deleted[i]==0;
	} //for .. Le23 .. MElements
//  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -


//  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
//  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -

//  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
//  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -


//  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -  -
	SENDfirst(0);
	
}
//---M-a-k-s---
function SENDfirst(a23){
	if (a23 >=cT)return;
	var i23=a23;
		var data="prma="+acryl+"&prm0="+entering+"&prm1=";
			for (var i=0; (i<100)&&(i23<cT); i++){
				data+=T[i23++]+"+"; //toString(T[i23++])+"+";
				
			}
			console.log("SENDfirst"+data);
			
    $.ajax({
      type: "POST",
      dataType: "json",
      url: "/php/firstwrite101.php", //Relative or absolute path to response.php file
      data: data,
      success: function(data) {
		  SENDnext(i23);
      }
    });

}
//---M-a-k-s---

function SENDnext(a23){
	if (a23 >=cT){	SENDlast(); return;}
	var i23=a23;
		var data="prma="+acryl+"&prm0="+entering+"&prm1=";
			for (var i=0; (i<100)&&(i23<cT); i++){
				data+=T[i23++]+"+"; //toString(T[i23++])+"+";
				
			}
			console.log("SENDnext="+data);
			
    $.ajax({
      type: "POST",
      dataType: "json",
      url: "/php/nextwrite101.php", //Relative or absolute path to response.php file
      data: data,
      success: function(data) {
		  SENDnext(i23);
      }
    });
}
//---M-a-k-s---
function SENDlast(a23){
	/////if (a23 >=cT)return;
	var i23=a23;
		var data="prma="+acryl+"&prm0="+entering+"&prm1=333"; //it won't be written in lastwrite101.php'
		/*	for (var i=0; (i<100)&&(i23<cT); i++){
				data+=T[i23++]+"+"; //toString(T[i23++])+"+";
				
			}*/
			console.log("SENDlast"+data);
			
    $.ajax({
      type: "POST",
      dataType: "json",
      url: "/php/lastwrite101.php", //Relative or absolute path to response.php file
      data: data,
      success: function(data) {
        saving = false
		  ;//actually, SENDlast->lastwrite101.php - only closes and renames the fresh file 
      }
    });
}
