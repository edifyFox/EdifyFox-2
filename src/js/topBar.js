const { remote } = require('electron');
let win = remote.getCurrentWindow();

const newsId = document.getElementById("dscfn");
let OSName="Unknown OS";


$.ajax({
  type: "POST",
  url: "https://edifyfox.com/php/ads.php",
  success: (data, statuts) => {
      newsId.innerHTML = data;
  },
  dataType: 'text'
});


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


document.onkeydown = function(e) {
  if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
      return false;
  }
};