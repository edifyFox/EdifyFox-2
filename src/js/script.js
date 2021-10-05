const $ = require('jquery');
const { ipcRenderer } = require('electron');
const { BrowserWindow } = require('electron').remote;
const url = require('url');
const path = require('path');
const {User,Student,Laureat} = require(path.join(__dirname, 'js/logger.js'));

// INITIATE USER
var user = new User();

//AUTOUPDATE MESSAGE
ipcRenderer.on('messageUPDATE', (event,text) => {
    alertada(text);
});

//DESABLE SELECTION
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
    if (document.getElementById('wrapEdits').className == 'dialogwinEdit_' && !user.sObj.modification && !notConnectedBool) {
        console.log('You must complete sign up first ...');
        $('#alertada').css('opacity','0');
        $('#alertada').css('pointer-events','none');
    }
    else {
        alertadaT = false;
        document.getElementById('hanadl').className = 'dialogwin';
        document.getElementById('wrapEdits').className = 'dialogwinEdit';
        $('#alertada').css('opacity','0');
        $('#alertada').css('pointer-events','none');
        setTimeout(function() { 
            $('.dialogwrap').css('opacity', '0');
        }, 100);
        setTimeout(function() { 
            $('.dialogwrap').css('display', 'none');
            document.getElementById('hanadl').innerHTML = '';
            document.getElementById('wrapEdits').innerHTML = '';
        }, 300);
    }
});
$('#alertada span').click(function() {
    $('.bcblak').click();
});

//OFFLINE ALLERT
var notConnectedBool = true;
var triedToConnectedBool = false;
setInterval(function(){
    if(!navigator.onLine) {alertada('You are Offline')}
    if(navigator.onLine && notConnectedBool && !triedToConnectedBool) {
        $('#alertada').css('opacity','0');
        $('#alertada').css('pointer-events','none');
        setTimeout(function() { 
            $('.dialogwrap').css('opacity', '0');
        }, 100);
        setTimeout(function() { 
            $('.dialogwrap').css('display', 'none');
            autoLogin();
        }, 300);
    }
}, 1000);


//LOGINS
function loginSuccess() {
    if (user.session) {
        if(user.sObj != null) {
            notConnectedBool = false;
            setSessionData('login');
            setWishPerTime();
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
                launchEffect();
            }, 1900);
            if (!user.sObj.modification) {
                setTimeout(function() {
                    editron(1);
                }, 2500);
            } else {
                setTimeout(function() { 
                    document.getElementById('itm3').className = 'sdmn';
                    $('.wrapper').css('opacity', '1');
                }, 2500);
            }
            $("#signupFORM")[0].reset();
            $("#signinFORM")[0].reset();
            console.log('Welcome');
        } else {
            notConnectedBool = false;
            $('.mrbnvz2').css('display', 'block');
            setTimeout(function() { 
                $('.bcblak').click();
                document.getElementById('itm1').className = 'animone';
            }, 1500);
            setTimeout(function() { 
                document.getElementById('itm2').className = 'animtwo';
            }, 1900);
            setTimeout(function() {
                editron(2);
            }, 2500);
            $("#signupFORM")[0].reset();
            $("#signinFORM")[0].reset();
        }
    }
}

function autoLogin() {
    const customer = JSON.parse(localStorage.getItem('chkedlgn'));
    if (!customer) {
        console.log('You must connect');
        triedToConnectedBool = true;
        setTimeout(function() { 
            document.getElementById('bnzr').className = 'bnvz1_';
        }, 1500);
    } else {
        user.login(customer.username,customer.password,true, (err,result) => {
            if (err) {
                console.log(err);
                alertada(err);
            } else {
                console.log("user session: " + result);
                if(result) {
                    loginSuccess();
                } else {
                    console.log('Username And password checked are false');
                    setTimeout(function() { 
                        document.getElementById('bnzr').className = 'bnvz1_';
                    }, 1500);
                }
            } 
        });
    }
}

function yahlogin() {
    alertada();
    let username = document.getElementById('nmusr').value;
    let passcode = document.getElementById('pscod').value;
    let checkBox = document.getElementById('chkedbox').checked;
    user.login(username,passcode,checkBox, (err,result) => {
        console.log("user session: " + result);
        if (err) {
            console.log(err);
            alertada(err);
        } else {
            if(result) {
                loginSuccess();
            } else {
                console.log('Password or email incorrect try again');
                alertada('Password or email incorrect try again');
            }
        } 
    });       
}

$('#lgout').click(function() {
    stopEffect();
    setSessionData('logout');
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
    $('.mainone').css('backdrop-filter','unset');
    $('.maintwo').css('backdrop-filter','unset');
});
$('#lssign').click(function() {
    yahlogin();
});
$(document).on('keypress',function(e) {
    if(e.which == 13) {
        if (alertadaT) $('.bcblak').click();
        else {
            if (document.getElementById('suppdiv').className == "signupdiv_" && $('.mrbnvz2').css('display') != 'block' && document.getElementById('bnzr').className == 'bnvz1_') {
                yahlogin();
            }
        }
    }
});

document.getElementById('close').addEventListener('click',() => {
    if (user.session) setSessionData('logout');
})

function setSessionData(operation) {
    var formdata = new FormData();
    formdata.append("idUsr", user.id);
    formdata.append("operation",operation);
    formdata.append("sessionid", user.getSessionId());
    formdata.append("platform", navigator.platform);
    formdata.append("platformDetail", navigator.appVersion);
    var ajax = new XMLHttpRequest();
    ajax.addEventListener("load", (event) => {
        if(operation == "login") user.setSessionId(parseInt(event.target.response));
    });
    ajax.open("POST", "http://localhost/PROJECTFILEPHP/php/loginsAndSignUps/setSessionData.php");
    ajax.send(formdata);
}

//EDITRONAT

function editron(msg) {
    if (user.session) {
        alertada();
        var formdata = new FormData();
        formdata.append("user", user.id);
        formdata.append("msg", msg);
        var ajax = new XMLHttpRequest();
        ajax.addEventListener("load", function(event) {
            document.getElementById('wrapEdits').innerHTML = event.target.response;
            setTimeout(function() {
                document.getElementById('wrapEdits').className = 'dialogwinEdit_';
            }, 200);
        }, false);
        ajax.open("POST", "http://localhost/PROJECTFILEPHP/php/loginsAndSignUps/editStatus.php");
        ajax.send(formdata);
    }
}

function finishTmlg() {
    if (user.sObj == null) timeLineData.append("isNewAccount", 1);
    var ajax = new XMLHttpRequest();
    ajax.addEventListener("load", function(event) {
        console.log(event.target.response);
        if (event.target.response == "YESS") {
            if (user.sObj != null) user.sObj.modification = true;
            timeLineData.delete("idUsr");
            timeLineData.delete("accType");
            timeLineData.delete("isNewAccount");
            timeLineData.delete("schoolId");
            timeLineData.delete("year");
            timeLineData.delete("branchId");
            timeLineData.delete("section");
            timeLineData.delete("grp");
            timeLineData.delete("sgrp");
            document.getElementById('wrapEdits').className = 'dialogwinEdit';
            document.getElementById('nmusr').value = user.email;
            document.getElementById('chkedbox').checked = true;
            setTimeout(function() {
                alertada('Your data has been successfully saved.\nNow please login and Enjoy studying with edifyfox:)');
                document.getElementById('wrapEdits').innerHTML = '';
                $('#lgout').click();
                for(var pair of timeLineData.entries()) {
                    console.log(pair);
                }
            }, 1000);
        }
    }, false);
    ajax.open("POST", "http://localhost/PROJECTFILEPHP/php/loginsAndSignUps/setUpAcc.php");
    ajax.send(timeLineData);
}

$('#editPrflp').click(function() {
    editron(0);
});




//NOTIF APP

$('#nws').click(function() {
    if (user.session) {
        $.post("http://localhost/PROJECTFILEPHP/php/notifupdate.php", {
            sclvl : user.sclevel,
            branche: user.sObj.branche,
            sclsec : user.sObj.sec,
            sclgrp : user.sObj.grp,
            scSgrp : user.sObj.sgrp,
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
            $.post("http://localhost/PROJECTFILEPHP/php/notifupdate.php", {
                sclvl : user.sclevel,
                branche: user.sObj.branche,
                sclsec : user.sObj.sec,
                sclgrp : user.sObj.grp,
                scSgrp : user.sObj.sgrp,
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
        // $.ajax({
        //     url: 'http://localhost/PROJECTFILEPHP/php/notifreader.php',
        //     method: 'POST',
        //     data: {
        //         option : start,
        //         sclvl : user.sclevel,
        //         branche: user.sObj.branche,
        //         sclsec : user.sObj.sec,
        //         sclgrp : user.sObj.grp,
        //         scSgrp : user.sObj.sgrp,
        //         sesID : user.id
        //     },
        //     dataType: 'json',
        //     success: function(data) {
        //         $('#ntfwrapthings').html(data.tb);
        //         if(data.num > 0) {
        //             $('#spinoza').css('opacity', '1');
        //         } else {
        //             $('#spinoza').css('opacity', '0');
        //         }
        //         $('#spinoza').html(data.num);
        //         document.getElementById('ajtcbzf').style.width = '90px';
        //         document.getElementById('ajtcbzf').style.height = 'auto';
        //         document.getElementById('ajtcbzf').style.margin = '30px auto';
        //         document.getElementById('ajtcbzf').className = "bgtncbzf";
        //         document.getElementById('ajtcbzf').innerHTML = "LOAD MORE";
        //     }
        // });        
    }
}






// FILLING

function setWishPerTime() {
    if (user.session) {
        var day = new Date();
        var hr = day.getHours();
        if (hr >= 0 && hr < 12) {
            document.getElementById("shname").innerHTML = `Good Morning ${user.firstname} !`;
        } else if (hr == 12) {
            document.getElementById("shname").innerHTML = `Good Noon ${user.firstname} !`;
        } else if (hr >= 12 && hr <= 17) {
            document.getElementById("shname").innerHTML = `Good Afternoon ${user.firstname} !`;
        } else {
            document.getElementById("shname").innerHTML = `Good Evening ${user.firstname} !`;
        }
    }
}

function prf3mer() {
    if (user.session && user.accType == "student") {
        document.getElementById("prfcrdstt").innerHTML = user.sObj.getLevel();
        document.getElementById("prfcrdgnd").innerHTML = user.sObj.branche;
        document.getElementById("prfcrdage").innerHTML = user.getAge();
        document.getElementById("prfcrdddn").innerHTML = user.getBirthday();
        document.getElementById("prfcrdsec").innerHTML = "sec-" + user.sObj.sec;
        document.getElementById("prfcrdgrp").innerHTML = "G-" + user.sObj.grp;
        document.getElementById("prfcrdsgp").innerHTML = "SG-" + user.sObj.sgrp;
        document.getElementById("prfcrdddc").innerHTML = user.getSubsDay();
        document.getElementById("prfcrdnam").innerHTML = user.getName();
        document.getElementById("prfcrdema").innerHTML = user.email;
        document.getElementById("prfcrdpwd").innerHTML = user.pwd;
        document.getElementById("prfcrdimg").src = user.getPdp();
    }
}





// MODULE VOLET

function mdularaya(selectBox) {
    if (user.session) {
        var formdata = new FormData();
        formdata.append("sm1", user.sclevel);
        formdata.append("branche", user.sObj.branche);
        if (selectBox) {
            alertada();
            formdata.append("selectBox", selectBox);
        }
        var ajax = new XMLHttpRequest();
        ajax.addEventListener("load", function(event) {
            document.getElementById('crskhdmi').innerHTML = event.target.response;
            if (selectBox) $('.bcblak').click();
        }, false);
        ajax.open("POST", "http://localhost/PROJECTFILEPHP/php/modulesreader.php");
        ajax.send(formdata);
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
    ajax.open("POST", "http://localhost/PROJECTFILEPHP/php/elemtreader.php");
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
    ajax.open("POST", "http://localhost/PROJECTFILEPHP/php/lyoutreader.php");
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
        alwaysOnTop: false,
        frame: false,
        show: false,
        webPreferences: {
          nodeIntegration: true,
          enableRemoteModule: true
        }
    });
    // childWin.setParentWindow(require('electron').remote.getCurrentWindow());
    childWin.loadURL(
        url.format({
          pathname: path.join(__dirname, 'js/webViewer/public/index.html'),
          protocol: 'file:',
          slashes: true
        })
    );
    childWin.once("show", () => {
        childWin.webContents.send("pdfSrc",source);
        childWin.webContents.send("title",`${strEL} - ${strTYPE}`);
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

function openLink(link) {
    const {shell} = require('electron');
    shell.openExternal(link);
}


// UPLOAD PIC

$("#file1").change(function() {
    if (user.session) {
        var file = document.getElementById("file1").files[0];
        if (file.size > 900000) { 
            alertada('Sorry, your file is too large'); 
        } else if (file.type != "image/jpg" && file.type != "image/jpeg") {
            alertada('Sorry, only JPG, JPEG files are allowed.');
        } else {
            var formdata = new FormData();
            formdata.append("file1", file);
            formdata.append("visitorid", user.id);
            var ajax = new XMLHttpRequest();
            ajax.upload.addEventListener("progress", function(event) {
                var percent = Math.round((event.loaded / event.total) * 100);
                $('#prcentLabel').html(`${percent}%`);
                $('#prcentLabel').css('opacity', '1');
            }, false);
            ajax.addEventListener("load", function(event) {
                $('#prcentLabel').css('opacity', '0');
                user.ip = event.target.responseText;
                var reader = new FileReader();
                reader.onload = (function(theFile) {
                    return function(e) {
                      document.getElementById("prfcrdimg").src = e.target.result;
                    };
                })(file);
                reader.readAsDataURL(file);
                $('#prcentLabel').html(`edit`);
            }, false);
            ajax.open("POST", "http://localhost/PROJECTFILEPHP/php/insertPicPrfl.php");
            ajax.send(formdata);
        } 
    }
});