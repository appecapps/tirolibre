//TIRO LIBRE RELOADED BY TUIN

Ti.UI.orientation = Ti.UI.PORTRAIT;
var alto = Ti.Platform.displayCaps.platformHeight;
var ancho = Ti.Platform.displayCaps.platformWidth;


//PUBLICIDAD ADMOB
var admob;
var adView;
var publicidad;
if (Ti.Platform.name === 'iPhone OS') {
publicidad = "ca-app-pub-6676539628582108/7809786478";
} else {
publicidad = "ca-app-pub-6676539628582108/4856320077";
}

admob = require('ti.admob');
adView = admob.createView({
bottom : 0,
width : ancho,
keywords : 'sports',
height : alto*0.1,
bottom : 0,
adUnitId : publicidad, 
testing : false
});


//FACEBOOK
var nombre;
var apellido;
var amigos;

var winfb=Ti.UI.createView({
backgroundColor:'#73F00E',
height:alto*0.9,
bottom:alto*0.1
});
var fb = require('facebook');
fb.appid = "591812934201439";
fb.permissions = ['publish_stream'];
fb.addEventListener('login', function(e) {
    if (e.success) {
        alert('Logged in');
        
        fb.requestWithGraphPath('me', {}, 'GET', function(ef) {
			if (ef.success) {
				var data = JSON.parse(ef.result);
		       	nombre=data.first_name;
		       	apellido=data.last_name;
		       	
		 		//mandar datos a la base
				alert(nombre);
			}
		});
		
		   fb.requestWithGraphPath('me/friends', {fields:'id'}, 'GET', function(ef) {
			if (ef.success) {
				var data = JSON.parse(ef.result);
		       	alert(ef.result);
		       	
		 		//mandar datos a la base
				alert(nombre);
			}
		});
		
		/*Ti.App.fb.requestWithGraphPath('friends', {}, 'GET', function(ef) {
			if (ef.success) {
				var data = JSON.parse(e.result);
		       	nombre=data.first_name;
		       	apellido=data.last_name;
		       	
		 		//mandar datos a la base
				alert(nombre);
			}
		});*/
        
        
        
        
    }
});
fb.addEventListener('logout', function(e) {
    alert('Logged out');
});
    
winfb.add(fb.createLoginButton({
    top : alto*0.05,
    style : fb.BUTTON_STYLE_WIDE
}));



//VENTANAS APP
var winALL=Ti.UI.createWindow({
modal:true,
exitOnClose : true,
navBarHidden : true,
orientationModes: [
Ti.UI.PORTRAIT
]
});

var win=Ti.UI.createView({
backgroundColor:'#fff',
height:alto*0.96,
bottom:0
});


winALL.add(win);
winALL.add(adView);
winALL.add(winfb);
winALL.open();