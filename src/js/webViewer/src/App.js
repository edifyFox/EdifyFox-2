
const { ipcRenderer } = require('electron');
const { remote } = require('electron');
const { newUrlFromBase } = require('electron-updater');
let win = remote.getCurrentWindow();
let OSName = "Unknown OS";
let openingTime = 0;
let idUsr = 0;
let idDrs = 0;
const $ = require("jquery");

if (navigator.appVersion.indexOf("Win")!=-1) OSName="Windows";
if (navigator.appVersion.indexOf("Mac")!=-1) OSName="MacOS";
if (navigator.appVersion.indexOf("X11")!=-1) OSName="UNIX";
if (navigator.appVersion.indexOf("Linux")!=-1) OSName="Linux";

if(OSName=="MacOS"){
    document.getElementById('nmapp').style.display = 'none';
    document.getElementById('close').className = 'sdmac';
    document.getElementById('maxi').className = 'sdddmac';
    document.getElementById('mini').className = 'sddmac';
}

ipcRenderer.on('pdfSrc', (event,text) => {
    renderPDF(text)
});

ipcRenderer.on('title', (event,text) => {
	document.getElementById('nmapp').innerHTML = text;
});

ipcRenderer.on('idDrs', (event, text) => {
    $('#toGetRatingId').attr("data-iddrs",text);
	idDrs = parseInt(text);
});

ipcRenderer.on('drsName', (event,text) => {
    $('#toGetRatingId b').html(text);
});

ipcRenderer.on('opening', (event,text) => {
    openingTime = text;
});

ipcRenderer.on('idUsr', (event,text) => {
    idUsr = parseInt(text);
});


function showRatingBox() {
    $('.dialogwrap').css('display', 'block');
    setTimeout(function() { 
        $('.dialogwrap').css('opacity', '1');
		$.post("http://localhost/PROJECTFILEPHP/php/modulesAndElements/isRated.php",
		{
			id: idDrs,
			idUsr : idUsr,
		},
		function(data,status) {
			if (data == "showRateBox") document.getElementById('DlgBoxForRating').className = 'dialogwin_';
			else win.close();
		});	
    }, 200);
}

function setRatingFor(n) {
	document.getElementById('DlgBoxForRating').className = 'dialogwin';
	$.post("http://localhost/PROJECTFILEPHP/php/modulesAndElements/setRate.php",
    {
    	id: idDrs,
		idUsr : idUsr,
		rate: n
    },
    function(data,status) {
		document.getElementById('thanksForRating').className = 'dialogwin_';
		setTimeout(() => {
			win.close();
		}, 600);
    });
}

function renderPDF(pdfSource) {
	const viewerElement = document.getElementById('viewer');
	WebViewer({
 	   path: '../public/lib',
 	   initialDoc: pdfSource,
 	}, viewerElement).then(instance => {
	   instance.disableElements([ 'downloadButton', 'printButton', 'themeChangeButton' ]);
	})
}



$("#setRatingFor1").click(function() {
	setRatingFor(1);
});
$("#setRatingFor2").click(function() {
	setRatingFor(2);
});
$("#setRatingFor3").click(function() {
	setRatingFor(3);
});
$("#setRatingFor4").click(function() {
	setRatingFor(4);
});
$("#setRatingFor5").click(function() {
	setRatingFor(5);
});

$('#mini').click(function(){
	win.minimize();
});
  
$('#close').click(function(){
	let ageDate = new Date(Date.now() - openingTime);
	if (ageDate.getHours() == 0 && ageDate.getMinutes() >= 5) showRatingBox();
	else if (ageDate.getHours() > 0) showRatingBox();
	else win.close();
});
  
$('#maxi').click(function() {
	if(win.isMaximized()) {
		win.unmaximize();
	} else {
		win.maximize();
	}
});

// document.onkeydown = function(e) {
//   if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
//       return false;
//   }
// };