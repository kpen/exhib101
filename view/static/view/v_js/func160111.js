
var pictsnames = ['/static/common/imgs/img2379.JPG', '/static/common/imgs/img2348.JPG']
var numbers = [0,0]

function DRW(){
  draw.viewbox(ESX-kf*wTH/2,ESY-kf*hTH/2,wTH*kf, hTH*kf);
}
//----------------------------
function anotherPict(pictname){
	//pictname = '/static/common/imgs/img2348.JPG'
	var image = draw.image(pictname).loaded(function(loader) {
  //	var image = draw.image('../imgs/img2348.JPG').loaded(function(loader) {
  		console.log('width='+ loader.width + "height=" + loader.height)
    	console.log("wT="+wT+"  hT="+hT)
    	kf = loader.width/wT; 
       // console.log(" loader.width/wT = " + kf)
      	//console.log("loader.height/kf=" + (loader.height/kf))
    	if ((loader.height/kf) > hT){
    		 kf = loader.height/hT
      		console.log(" loader.height/hT = " + kf)
			}
      ESX = Math.round(loader.width/2)
      ESY = Math.round(loader.height/2)
     DRW()
})	
	
}
////////////////////////////////////////////////////////////////////
$( document ).ready(function() {

div = document.createElement('div')
div.id = 'cover'
div.className = 'darkcover'
//document.body.appendChild(div)
document.getElementsByTagName('body')[0].appendChild(div);

	wT = $( document ).width();	
	hT = $( document ).height();
	
	wTH=wT 
	hTH=hT 

	ESX=wTH/2;
	ESY=hTH/2;
	kf=1;

draw = SVG('drawing').size(wTH, hTH);


//	draw3.image('favicon.png').loaded(function(loader) {
//  this.size(loader.width, loader.height)
//})
////////draw3.image('./imgs/ind_101.png');
 
 DRW();

// - - - - - - - - - - - - - - - - - - - - - - - - - 
  
//	setTimeout(function(){v_teek();},1000);
//------------prevent the browser from sleep-------------------
 var noSleep = new NoSleep();
 noSleep.enable(); // keep the screen on!
//------------prevent...---------------------------------------	
	}) //document-ready
	
/*	function v_teek(){
	Vopen();
	setTimeout(function(){v_teek();},1000);
}
*/
//-------------------------------------------------------
function Vopen(step){
	
var EColor=[]; //The array of elements color
var NElements=[]; //the array of the names such as "polygons", "lines", "textes "
var MElements=[]; //the array of the_arrays_of_points (I have to keep it in memory)=MEle[msss[[x,y],[x,y],[x,y]]]
var Elements=[]; //all the drawn elements (as polylines, etc)
var eLcount=0;

	
	draw.clear()

	var data="prm1="+numbers[(step%2)]+"&prm0="+step%2
			
    $.ajax({
      type: "POST",
      dataType: "json",
      url: "/php/read101.php", //Relative or absolute path to response.php file
      data: data,
      success: function(data) {
		  //console.log("READ_SUCCESS");
		  anotherPict(pictsnames[(step%2)])
		  if(data["param2"]!=0){numbers[(step%2)]=0}
		  else {numbers[(step%2)]++}
		  var T = data["param1"].split(" ");
		  var Le23 = T.length;
		  console.log(pictsnames[(step%2)]);
		  
			NElements=[]; //the array of the names such as "polygons", "lines", "textes "
			MElements=[]; //the array of the_arrays_of_points (I have to keep it in memory)=MEle[msss[[x,y],[x,y],[x,y]]]
			
			for (var i=0; i<eLcount; i++){ 	Elements[i].remove(); }
			
			eLcount=0;
		     Elements.length = 0
		  
			for (var i=0; i<Le23-2; ){
			  
				if (T[i]== 101){
					NElements[eLcount]="polyline";
					var Le25 = T[i+1];
					msss = [];
					for (var n=0; n<Le25; n++){
						msss[n]=[T[i+2+n*2],T[i+2+n*2+1]];
					}
					
					Elements[eLcount++] = draw.polyline(msss)
						.fill('none')
						.stroke({ width: 24, color:'#555' });
					Elements[eLcount++] = draw.polyline(msss)
						.fill('none')
						.stroke({ width: 16, color:'#f4e970' });
			  
					i+=2+Le25*2;
				  }
				else if (T[i]==102) { 
				} 
				else {i++;}
				 //console.log("nextNum["+i+"]="+T[i]);
		  } //for i<L23
      }
    });//ajax-success
	
//	DRW();
}
var clock = 0
var timm = null
var opacity = 1
var step =1
//-----------------------------------------------------
function tiktak() {
	if (clock == 0) { opacity = 1; Vopen(step++)/*load the next picture*/}
	else if (clock < 20) {/*just wait in the dark*/}
	else if ((clock > 20)&&(clock < 100)) {
		if (opacity > 0) {opacity+=-0.08; document.getElementById("cover").style.opacity = opacity}
		else{opacity=0}
	}
	else if (clock > 150) {
		if (opacity <1 ) {opacity+=0.5; document.getElementById("cover").style.opacity = opacity}
	}
	clock+=5
	console.log("opacity="+opacity)
	if (clock >180) {clock = 0}
timm = setTimeout(tiktak, 250)
}

timm = setTimeout(tiktak, 250);