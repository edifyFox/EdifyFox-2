const $ = require('jquery');
const { ipcRenderer } = require('electron');
const { BrowserWindow } = require('electron').remote;
const url = require('url');
const path = require('path');
const User = require(path.join(__dirname, 'js/logger.js'));


ipcRenderer.on('messageUPDATE', (event,text) => {
    console.log(`Message from updater : ${text}`);
});


if (typeof document.onselectstart != "undefined") {
    document.onselectstart = new Function ("return false");
} else {
    document.onmouseup = new Function ("return true");
    document.onmousedown = new Function ("return false");
}

//SETUP DATE
var ajourdhui = new Date().getTime() / 1000;
var crntdbssh;
var crntweek;
var today = new Date();
if(today.getDay() == 6 || today.getDay() == 0) { 
    crntweek = ajourdhui + 172800;
    crntdbssh = ajourdhui + 172800;
} else {
    crntweek = ajourdhui;
    crntdbssh = ajourdhui;
}


// ALERT FUNCTION
var alertadaT = false;
function alertada(msg) {
    alertadaT = true;
    $('.dialogwrap').css('display', 'block');
    document.querySelector('#alertada label').innerHTML = msg;
    setTimeout(function() { 
        $('.dialogwrap').css('opacity', '1');
    }, 200);
    setTimeout(function() { 
        if (msg) {
            $('#alertada').css('opacity','1');
            $('#alertada').css('pointer-events','fill');
        }   
    }, 300);
}
$('.bcblak').click(function() {
    alertadaT = false;
    document.getElementById('hanadl').className = 'dialogwin';
    $('#alertada').css('opacity','0');
    $('#alertada').css('pointer-events','none');
    setTimeout(function() { 
        $('.dialogwrap').css('opacity', '0');
    }, 100);
    setTimeout(function() { 
        $('.dialogwrap').css('display', 'none');
        document.getElementById('hanadl').innerHTML = '';
    }, 300);
});
$('#alertada span').click(function() {
    $('.bcblak').click();
});

//OFFLINE ALLERT
setInterval(function(){
    if(!navigator.onLine && $('#offmodeui').css('opacity') == 0) {alertada('You are Offline')}
    if(!navigator.onLine && $('#offmodeui').css('opacity') == 1) {}
}, 1000);


// INITIATE USER
var user = new User();

function loginSuccess() {
    if(user.session){
        mdularaya();
        // getScdlAndWeekNum(crntweek);
        prf3mer();
        loadnotif();
        setInterval(function() {
            loadnotif();
        }, 5000);
        $('.mrbnvz2').css('display', 'block');
        setTimeout(function() { 
            $('.bcblak').click();
            document.getElementById('itm1').className = 'animone';
        }, 1500);
        setTimeout(function() { 
            document.getElementById('itm2').className = 'animtwo';
        }, 1900);
        setTimeout(function() { 
            document.getElementById('itm3').className = 'sdmn';
            $('.wrapper').css('opacity', '1');
        }, 2400);
        $("#signupFORM")[0].reset();
        $("#signinFORM")[0].reset();
        console.log('Welcome');
    }
}

function prf3mer() {
    if (user.session) {
        document.getElementById("prfcrdstt").innerHTML = user.getLevel();
        document.getElementById("prfcrdgnd").innerHTML = user.gender;
        document.getElementById("prfcrdage").innerHTML = user.getAge();
        document.getElementById("prfcrdddn").innerHTML = user.getBirthday();
        document.getElementById("prfcrdsec").innerHTML = "sec-" + user.sec;
        document.getElementById("prfcrdgrp").innerHTML = "G-" + user.grp;
        document.getElementById("prfcrdsgp").innerHTML = "SG-" + user.sgrp;
        document.getElementById("prfcrdddc").innerHTML = user.getSubsDay();
        document.getElementById("prfcrdnam").innerHTML = user.getName();
        document.getElementById("prfcrdema").innerHTML = user.email;
        document.getElementById("prfcrdpwd").innerHTML = user.pwd;
        document.getElementById("prfcrdimg").src = user.getPdp();
    }
}

(() => {
    if(navigator.onLine) {
        const customer = JSON.parse(localStorage.getItem('chkedlgn'));
        if (!customer) {
            console.log('You must connect');
            setTimeout(function() { 
                document.getElementById('bnzr').className = 'bnvz1_';
            }, 1500);
        } else {
            user.login(customer.username,customer.password,true, (err,result) => {
                if (err) return console.error(err);
                console.log("user session: " + result);
                if(result) {
                    loginSuccess();
                } else {
                    console.log('Username And password checked are false');
                    setTimeout(function() { 
                        document.getElementById('bnzr').className = 'bnvz1_';
                    }, 1500);
                }
            });
        }
    } else {
        alertada('You are Offline')
    }
})();

function yahlogin() {
    alertada();
    let username = document.getElementById('nmusr').value;
    let passcode = document.getElementById('pscod').value;
    let checkBox = document.getElementById('chkedbox').checked;
    user.login(username,passcode,checkBox, (err,result) => {
        if (err) return console.error(err);
        console.log("user session: " + result);
        if(result) {
            loginSuccess();
        } else {
            console.log('Password or email incorrect try again');
            alertada('Password or email incorrect try again');
        }
    });       
}


$('#lgout').click(function() {
    user.logout();
    crntweek = crntdbssh;
    document.getElementById('bnzr').className = 'bnvz1_';
    localStorage.removeItem('chkedlgn');
    document.getElementById('itm3').className = 'sdmn_';
    $('.wrapper').css('opacity', '0');
    document.getElementById('ntfbar').className = 'notif_';
    document.getElementById('lyoutkhdmi').className = 'elyout_';
    document.getElementById('lyoutkhdmi').innerHTML = '';
    setTimeout(function() { 
        document.getElementById('itm2').className = 'animtwo_';
    }, 100);
    setTimeout(function() { 
        document.getElementById('itm1').className = 'animone_';
    }, 500);
    setTimeout(function() { 
        $('.mrbnvz2').css('display', 'none');
    }, 1000);
    $('#hme').click();
    $('#hmes1').click();
});
$('#lssign').click(function() {
    yahlogin();
});
$(document).on('keypress',function(e) {
    if(e.which == 13) {
        if (document.getElementById('suppdiv').className == "signupdiv_" && $('.mrbnvz2').css('display') != 'block' && document.getElementById('bnzr').className == 'bnvz1_') {
            yahlogin();
        }
        if (document.getElementById('anm2').className == "firscard" && document.getElementById('editthings1').className == "inputat_" && document.getElementById('editthings2').className == "inputatmn_") {
            editthings();
        }
    }
});



//NOTIF APP

$('#nws').click(function() {
    if (user.session) {
        $.post("https://edifyfox.com/php/notifupdate.php", {
            sclvl : user.sclevel,
            sclsec : user.sec,
            sclgrp : user.grp,
            scSgrp : user.sgrp,
            sesID : user.id
        }, function(result){
            console.log(result);
        });
    }
    if (document.getElementById('ntfbar').className == 'notif') {
        document.getElementById('ntfbar').className = 'notif_';
    } else {
        document.getElementById('ntfbar').className = 'notif';
    }
});

$('.wrapper').click(function() {
    if (document.getElementById('ntfbar').className == 'notif') {
        $('.edwe').css('backdrop-filter','unset');
        document.getElementById('ntfbar').className = 'notif_';
        if (user.session) {
            $.post("https://edifyfox.com/php/notifupdate.php", {
                sclvl : user.sclevel,
                sclsec : user.sec,
                sclgrp : user.grp,
                scSgrp : user.sgrp,
                sesID : user.id
            }, function(result){
                console.log(result);
            });
        }
    }
});

var start = 10;

$('#ajtcbzf').click(function() {
    document.getElementById('ajtcbzf').innerHTML = "";
    document.getElementById('ajtcbzf').className = "switcher_LOAD";
    document.getElementById('ajtcbzf').style.width = '20px';
    document.getElementById('ajtcbzf').style.height = '20px';
    document.getElementById('ajtcbzf').style.margin = '30px auto';
    start = start + 10;
});

function loadnotif() {
    if (user.session && navigator.onLine) {
        $.ajax({
            url: 'https://edifyfox.com/php/notifreader.php',
            method: 'POST',
            data: {
                option : start,
                sclvl : user.sclevel,
                sclsec : user.sec,
                sclgrp : user.grp,
                scSgrp : user.sgrp,
                sesID : user.id
            },
            dataType: 'json',
            success: function(data) {
                $('#ntfwrapthings').html(data.tb);
                if(data.num > 0) {
                    $('#spinoza').css('opacity', '1');
                } else {
                    $('#spinoza').css('opacity', '0');
                }
                $('#spinoza').html(data.num);
                document.getElementById('ajtcbzf').style.width = '90px';
                document.getElementById('ajtcbzf').style.height = 'auto';
                document.getElementById('ajtcbzf').style.margin = '30px auto';
                document.getElementById('ajtcbzf').className = "bgtncbzf";
                document.getElementById('ajtcbzf').innerHTML = "LOAD MORE";
            }
        });        
    }
}







// MODULE VOLET

function mdularaya() {
    if (user.session) {
        var xhh = new XMLHttpRequest();
        var url = 'https://edifyfox.com/php/modulesreader.php';
        var data_post ="sm1="+user.sclevel;
        xhh.open('POST', url, true);
        xhh.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhh.onreadystatechange = function() {
            if(xhh.readyState == 4 && xhh.status == 200) {
                document.getElementById('frstphp').innerHTML = xhh.response;
            }
        }
        xhh.send(data_post);
    }
}

// ELEMENT CHOISE VOLET

function getcourse(evt) {
        alertada();
        var formdata = new FormData();
        formdata.append("ys", evt);
        var ajax = new XMLHttpRequest();
        ajax.addEventListener("load", function(event) {
            document.getElementById('hanadl').innerHTML = event.target.response;
            setTimeout(function() { 
                document.getElementById('hanadl').className = 'dialogwin_';
            }, 300);
        }, false);
        ajax.open("POST", "https://edifyfox.com/php/elemtreader.php");
        ajax.send(formdata);
}


// COURSES PDFS VOLET


function getelyout(evtt) {
    document.getElementById('hanadl').className = 'dialogwin';
    var data_post = new FormData();
    var ajax = new XMLHttpRequest();
    data_post.append("id", evtt);
    ajax.addEventListener("load", function(event) {
        document.getElementById('lyoutkhdmi').innerHTML = event.target.response;
        $('.bcblak').click();
        document.getElementById('lyoutkhdmi').className = 'elyout';
    }, false);
    ajax.open("POST", "https://edifyfox.com/php/lyoutreader.php");
    ajax.send(data_post);
}



  
function showviewer(source, strEL, strFL, strTYPE) {

    const childWin = new BrowserWindow({ 
        width: 1000,
        height: 600,
        minHeight: 400,
        minWidth : 400,
        title: `${strEL} - ${strFL} - ${strTYPE}`,
        backgroundColor: '#eee',
        icon: __dirname+'/assets/app-icon/win/app.png',
        frame: true,
        show: false,
        webPreferences: {
          nodeIntegration: true,
          enableRemoteModule: true
        }
    });
    childWin.setParentWindow(require('electron').remote.getCurrentWindow())
    childWin.loadURL(
        url.format({
          pathname: path.join(__dirname, 'js/webViewer/public/index.html'),
          protocol: 'file:',
          slashes: true
        })
    );
    childWin.once("show", () => {
        childWin.webContents.send("pdfSrc",source);
        childWin.webContents.send("title",`${strEL} - ${strFL} - ${strTYPE}`);
    });
    childWin.once("ready-to-show", () => {
        childWin.show();
    })
    
}

function lyutfermer() {
    document.getElementById('lyoutkhdmi').className = 'elyout_';
    document.getElementById('lyoutkhdmi').innerHTML = '';
}


function openTool(stbr) {
    const {shell} = require('electron');
    var linktl = `https://edifyfox.com/tools/${stbr}`;
    shell.openExternal(linktl);
}