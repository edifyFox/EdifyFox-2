const { remote } = require('electron');
let win = remote.getCurrentWindow();

const newsId = document.getElementById("dscfn");
let OSName="Unknown OS";

let keyNewsDIV = document.createElement("DIV"),
	descNewsDIV = document.createElement("DIV");

keyNewsDIV.innerHTML = "News";
keyNewsDIV.color = "skyblue";
keyNewsDIV.fontWeight = "600";
keyNewsDIV.setAttribute("class", "keyNLb");

descNewsDIV.innerHTML = "AYOUR Bomber Jacket Availble On ayourclothing.com";
descNewsDIV.color = "skyblue";
descNewsDIV.fontWeight = "600";
descNewsDIV.setAttribute("class", "descNLb");

if (true) {
	newsId.appendChild(keyNewsDIV);
 	newsId.appendChild(descNewsDIV);
}


if (navigator.appVersion.indexOf("Win")!=-1) OSName="Windows";
if (navigator.appVersion.indexOf("Mac")!=-1) OSName="MacOS";
if (navigator.appVersion.indexOf("X11")!=-1) OSName="UNIX";
if (navigator.appVersion.indexOf("Linux")!=-1) OSName="Linux";

if(OSName=="MacOS"){
    document.getElementById('nmapp').className = 'nameappmac';
    document.getElementById('close').className = 'sdmac';
    document.getElementById('maxi').className = 'sdddmac';
    document.getElementById('mini').className = 'sddmac';
}

$('#mini').click(function(){
  win.minimize();
});

$('#close').click(function(){
  win.close();
});

$('#maxi').click(function() {
  if(win.isMaximized()){
      win.unmaximize();
  }else{
      win.maximize();
  }
});

