const { remote } = require('electron');
const $ = require('jquery');
const fs = require('fs');
const localforage = require('localforage');

var win = remote.getCurrentWindow();

var OSName="Unknown OS";
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

var alertadaT = false;

setInterval(function(){
    if(!navigator.onLine && $('#offmodeui').css('opacity') == 0) {alertada('You are Offline')}
    if(!navigator.onLine && $('#offmodeui').css('opacity') == 1) {}
}, 1000);

if (!localStorage.getItem('store')) {
    localStorage.setItem('store', JSON.stringify(["t"]));
}

var scale = 5,
    pdfDoc = null,
    pageIsRendering = false,
    pageNumIsPending = null,
    pageNum = 1;



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

if (typeof document.onselectstart != "undefined") {
    document.onselectstart = new Function ("return false");
} else {
    document.onmouseup = new Function ("return true");
    document.onmousedown = new Function ("return false");
}

var SESSION = {
    id : '',
    firstname : '',
    lastname : '',
    email : '',
    pwd : '',
    ddn : '',
    country : '',
    gender : '',
    sclevel : '',
    sec : '',
    grp : '',
    sgrp : '',
    ddc : '',
    ip : '',
}


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


function prf3mer() {
    var monthNames = [
        "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
        ];
    var cDate = new Date(SESSION.ddc);
    var dDate = new Date(SESSION.ddn);
    var ageDifMs = Date.now() - dDate.getTime();
    var ageDate = new Date(ageDifMs);

    if (SESSION.sclevel == 1) {
        document.getElementById("prfcrdstt").innerHTML = "1st year student";
    } else if (SESSION.sclevel == 2) {
        document.getElementById("prfcrdstt").innerHTML= "2nd year student";
    }
    document.getElementById("prfcrdgnd").innerHTML = SESSION.gender;
    document.getElementById("prfcrdage").innerHTML = Math.abs(ageDate.getUTCFullYear() - 1970);
    document.getElementById("prfcrdddn").innerHTML = `${dDate.getDate()} ${monthNames[dDate.getMonth()]} ${dDate.getFullYear()}`;
    document.getElementById("prfcrdsec").innerHTML = "sec-" + SESSION.sec;
    document.getElementById("prfcrdgrp").innerHTML = "G-" + SESSION.grp;
    document.getElementById("prfcrdsgp").innerHTML = "SG-" + SESSION.sgrp;
    document.getElementById("prfcrdddc").innerHTML = `${monthNames[cDate.getMonth()]} ${cDate.getFullYear()}`;
    document.getElementById("prfcrdnam").innerHTML = `${SESSION.firstname} ${SESSION.lastname}`;
    document.getElementById("prfcrdema").innerHTML = SESSION.email;
    document.getElementById("prfcrdpwd").innerHTML = SESSION.pwd;

    if (SESSION.ip != "") {
        document.getElementById("prfcrdimg").src = `https://edifyfox.com/php/${SESSION.ip}`;
    } else {
        document.getElementById("prfcrdimg").src = "img/defaultprf.jpg";
    }

}

function chker() {

if(navigator.onLine) {
    const customer = JSON.parse(localStorage.getItem('chkedlgn'));
    if (!customer) {
            setTimeout(function() { 
                document.getElementById('bnzr').className = 'bnvz1_';
            }, 1500);
    } else {
        $.ajax({
            url: 'https://edifyfox.com/php/chkedlogin.php',
            method: 'POST',
            data: {
                login: customer.username,
                pwd: customer.password
            },
            dataType: 'json',
            success: function(data){
                if (data.id == "nan") {
                    setTimeout(function() { 
                        document.getElementById('bnzr').className = 'bnvz1_';
                    }, 1500);
                } else {
                    SESSION.id = data.id;
                    SESSION.firstname = data.firstname;
                    SESSION.lastname = data.lastname;
                    SESSION.email = data.email;
                    SESSION.pwd = data.pwd;
                    SESSION.ddn = data.ddn;
                    SESSION.country = data.country;
                    SESSION.gender = data.gender;
                    SESSION.sclevel = data.sclevel;
                    SESSION.sec = data.sec;
                    SESSION.grp = data.grp;
                    SESSION.sgrp = data.sgrp;
                    SESSION.ddc = data.ddc;
                    SESSION.ip = data.ip;

                    mdularaya(SESSION.sclevel);
                    getScdlAndWeekNum(crntweek);
                    prf3mer();
                    loadnotif();
                    toolaraya();
                    setInterval(function() {
                        loadnotif();
                    }, 5000);



                    $('.bcblak').click();
                    $('.mrbnvz2').css('display', 'block');
                    setTimeout(function() { 
                        document.getElementById('itm1').className = 'animone';
                    }, 1500);
                    setTimeout(function() { 
                        document.getElementById('itm2').className = 'animtwo';
                    }, 1900);
                    setTimeout(function() { 
                        document.getElementById('itm3').className = 'sdmn';
                        $('.wrapper').css('opacity', '1');
                    }, 2400);
                }
            }
        });
        
    }

} else {
    alertada('You are Offline')
}

}
chker();



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


function yahlogin() {

    alertada();

    $.post("https://edifyfox.com/php/chkedlogin.php",
    {
        login: document.getElementById('nmusr').value,
        pwd: document.getElementById('pscod').value
    },
    function(data, status){
        if (data.id != "nan") {

                            SESSION.id = data.id;
                            SESSION.firstname = data.firstname;
                            SESSION.lastname = data.lastname;
                            SESSION.email = data.email;
                            SESSION.pwd = data.pwd;
                            SESSION.ddn = data.ddn;
                            SESSION.country = data.country;
                            SESSION.gender = data.gender;
                            SESSION.sclevel = data.sclevel;
                            SESSION.sec = data.sec;
                            SESSION.grp = data.grp;
                            SESSION.sgrp = data.sgrp;
                            SESSION.ddc = data.ddc;
                            SESSION.ip = data.ip;

                            mdularaya(SESSION.sclevel);
                            getScdlAndWeekNum(crntweek);
                            prf3mer();
                            loadnotif();
                            toolaraya();
                            setInterval(function() {
                                loadnotif();
                            }, 5000);

            $('.bcblak').click();
            $('.mrbnvz2').css('display', 'block');
            setTimeout(function() { 
                document.getElementById('itm1').className = 'animone';
            }, 100);
            setTimeout(function() { 
                document.getElementById('itm2').className = 'animtwo';
            }, 500);
            setTimeout(function() { 
                document.getElementById('itm3').className = 'sdmn';
                $('.wrapper').css('opacity', '1');
            }, 1000);

            if (document.getElementById('chkedbox').checked == true) {
                var dict = {
                    "username" : document.getElementById('nmusr').value,
                    "password" : document.getElementById('pscod').value
                };
                var jsonStrinsg = JSON.stringify(dict);
                localStorage.setItem('chkedlgn', jsonStrinsg);
            }

            document.getElementById('nmusr').value = "";
            document.getElementById('pscod').value = "";
            document.getElementById('chkedbox').checked = false;
        } else {
            alertada('Password or email incorrect try again');
        }
    }); 
}

$("#file1").change(function() {
    if (SESSION.id == '') return
    var file = document.getElementById("file1").files[0];
    if (file.size > 900000) { 
        alertada('Sorry, your file is too large'); 
        return
    } else if (file.type != "image/jpg" && file.type != "image/jpeg") {
        alertada('Sorry, only JPG, JPEG files are allowed.');
        return
    } else {
        var formdata = new FormData();
        formdata.append("file1", file);
        formdata.append("visitorid", SESSION.id);
        var ajax = new XMLHttpRequest();
        ajax.upload.addEventListener("progress", function(event) {
            var percent = Math.round((event.loaded / event.total) * 100);
            $('#prcentLabel').html(`${percent}%`);
            $('#prcentLabel').css('opacity', '1');
        }, false);
        ajax.addEventListener("load", function(event) {
            $('#prcentLabel').css('opacity', '0');
            SESSION.ip = event.target.responseText;
            var reader = new FileReader();
            reader.onload = (function(theFile) {
                return function(e) {
                  document.getElementById("prfcrdimg").src = e.target.result;
                };
            })(file);
            reader.readAsDataURL(file);
            $('#prcentLabel').html(`edit`);
        }, false);
        ajax.open("POST", "https://edifyfox.com/php/insertPicPrfl.php");
        ajax.send(formdata);
    } 
});


$('#lssign').click(function() {
    yahlogin();
});

$(document).on('keypress',function(e) {
    if(e.which == 13) {
        if (document.getElementById('sgninitm').className == "singindiv" && $('.mrbnvz2').css('display') != 'block' && document.getElementById('bnzr').className == 'bnvz1_') {
            yahlogin();
        }
        if (document.getElementById('anm2').className == "firscard" && document.getElementById('editthings1').className == "inputat_" && document.getElementById('editthings2').className == "inputatmn_") {
            editthings();
        }
    }
});

$('#alertada span').click(function() {
    $('.bcblak').click();
});

$('#prf').click(function() {
    document.getElementById('anm2').className = 'firscard';
    document.getElementById('hme').className = 'sdvan';
    document.getElementById('prf').className = 'sdvan oncsd';
    document.getElementById('crs').className = 'sdvan';
    document.getElementById('tls').className = 'sdvan';
    document.getElementById('ntfbar').className = 'notif_';
    setTimeout(function() {
        $('.mainone').css('backdrop-filter','blur(2px)');
    }, 500);
});

$("#crs").click(function() {
    $('.mainone').css('backdrop-filter','unset');
    document.getElementById('ntfbar').className = 'notif_';
    if (document.getElementById('prf').className != 'sdvan oncsd') {
        document.getElementById('anm2').className = 'firscard_';
        if (document.getElementById('viewifram').className == 'ifram') {
            document.getElementById('viewifram').className = 'ifram_';
            var context = document.getElementById('pdf-render').getContext('2d');   
            context.clearRect(0, 0, document.getElementById('pdf-render').width, document.getElementById('pdf-render').height);
            document.querySelector('.canvascontainer').scrollTop = 0;
            pdfDoc = null;
            pageIsRendering = false;
            pageNumIsPending = null;
            pageNum = 1;
        } else {
            document.getElementById('lyoutkhdmi').className = 'elyout_';
            document.getElementById('lyoutkhdmi').innerHTML = '';
        }
    } else {
        document.getElementById('anm2').className = 'firscard_';
    }
    document.getElementById('crskhdmi').className = 'courses';
    document.getElementById('hme').className = 'sdvan';
    document.getElementById('prf').className = 'sdvan';
    document.getElementById('crs').className = 'sdvan oncsd';
    document.getElementById('tls').className = 'sdvan';
    document.getElementById('anm3').className = 'tools_';
});

$('#hme').click(function() {
    $('.mainone').css('backdrop-filter','unset');
    document.getElementById('anm2').className = 'firscard_';
    document.getElementById('crskhdmi').className = 'courses_';
    document.getElementById('anm3').className = 'tools_';
    setTimeout(function() { 
        document.getElementById('anm1').className = 'anim_';
    }, 500);
    document.getElementById('hme').className = 'sdvan oncsd';
    document.getElementById('prf').className = 'sdvan';
    document.getElementById('crs').className = 'sdvan';
    document.getElementById('tls').className = 'sdvan';
    document.getElementById('ntfbar').className = 'notif_';
    document.getElementById('viewifram').className = 'ifram_';
    var context = document.getElementById('pdf-render').getContext('2d');   
    context.clearRect(0, 0, document.getElementById('pdf-render').width, document.getElementById('pdf-render').height);
    document.querySelector('.canvascontainer').scrollTop = 0;
    pdfDoc = null;
            pageIsRendering = false;
            pageNumIsPending = null;
            pageNum = 1;
    document.getElementById('lyoutkhdmi').className = 'elyout_';
    document.getElementById('lyoutkhdmi').innerHTML = '';
});

$('#tls').click(function() {
    $('.mainone').css('backdrop-filter','unset');
    document.getElementById('anm2').className = 'firscard_';
    document.getElementById('crskhdmi').className = 'courses_';
    document.getElementById('ntfbar').className = 'notif_';
    document.getElementById('viewifram').className = 'ifram_';
    var context = document.getElementById('pdf-render').getContext('2d');   
    context.clearRect(0, 0, document.getElementById('pdf-render').width, document.getElementById('pdf-render').height);
    document.querySelector('.canvascontainer').scrollTop = 0;
    pdfDoc = null;
    pageIsRendering = false;
    pageNumIsPending = null;       
    pageNum = 1;
    document.getElementById('lyoutkhdmi').className = 'elyout_';
    document.getElementById('lyoutkhdmi').innerHTML = '';
    document.getElementById('hme').className = 'sdvan';
    document.getElementById('prf').className = 'sdvan';
    document.getElementById('crs').className = 'sdvan';
    document.getElementById('tls').className = 'sdvan oncsd';
    document.getElementById('anm3').className = 'tools';
})

$('#nws').click(function() {
    if (SESSION.id == '') {} else {
        $.post("https://edifyfox.com/php/notifupdate.php", {
            sclvl : SESSION.sclevel,
            sclsec : SESSION.sec,
            sclgrp : SESSION.grp,
            scSgrp : SESSION.sgrp,
            sesID : SESSION.id
        }, function(result){
            console.log(result);
        });
    }

    if (document.getElementById('ntfbar').className == 'notif') {
        document.getElementById('ntfbar').className = 'notif_';
    } else {
        document.getElementById('ntfbar').className = 'notif';
    }
})

$('.wrapper').click(function() {
    if (document.getElementById('ntfbar').className == 'notif') {
        $('.edwe').css('backdrop-filter','unset');
        document.getElementById('ntfbar').className = 'notif_';
        if (SESSION.id == '') {} else {
            $.post("https://edifyfox.com/php/notifupdate.php", {
                sclvl : SESSION.sclevel,
                sclsec : SESSION.sec,
                sclgrp : SESSION.grp,
                scSgrp : SESSION.sgrp,
                sesID : SESSION.id
            }, function(result){
                console.log(result);
            });
        }
    }
});

$('#lgout').click(function() {


                            SESSION.id = '';
                            SESSION.firstname = '';
                            SESSION.lastname = '';
                            SESSION.email = '';
                            SESSION.ddn = '';
                            SESSION.country = '';
                            SESSION.gender = '';
                            SESSION.sclevel = '';
                            SESSION.sec = '';
                            SESSION.grp = '';
                            SESSION.sgrp = '';
                            SESSION.ddc = '';
                            SESSION.ip = '';
                            crntweek = crntdbssh;

    document.getElementById('bnzr').className = 'bnvz1_';
    localStorage.removeItem('chkedlgn');

    document.getElementById('itm3').className = 'sdmn_';
    $('.wrapper').css('opacity', '0');
    document.getElementById('ntfbar').className = 'notif_';
    document.getElementById('viewifram').className = 'ifram_';
    document.querySelector('.canvascontainer').scrollTop = 0;
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

$('#lssignup').click(function() {

    var checker = 1;


        // first name Second name
        var inp1 = document.getElementById('frstnm');
        var inp2 = document.getElementById('scdnm');
    
        //Mail
        var inp3 = document.getElementById('mailchk');
    
        //Passcode
        var inp4 = document.getElementById('pwd');
        var inp5 = document.getElementById('pwdc');
    
        //birthday
        var inp6 = document.getElementById('jour');
        var inp7 = document.getElementById('mois');
        var inp8 = document.getElementById('annee');
    
        //country
        var inp9 = document.getElementById('cntry');


        //male of female
        var gender = '';
        if ($('#male').is(':checked')) {
            gender = 'male';
        } else if ($('#female').is(':checked')) {
            gender = 'female';
        } else {
            gender = 'none';
        }

        
    //mustawa sec grp sgrp
    var inp10 = document.getElementById('mustawa');
    var inp11 = document.getElementById('sec');
    var inp12 = document.getElementById('grp');
    var inp13 = document.getElementById('sgrp');
    var inp14 = document.getElementById('branche');

if (inp1.value != '' && inp1.value.length >= 3 && inp1.value.length <= 25 && isNaN(inp1.value)) {} else { 
    checker = 0;
    inp1.style.border = "1px solid #f4433696";
}
if (inp2.value != '' && inp2.value.length >= 3 && inp2.value.length <= 25 && isNaN(inp2.value)) {} else { 
    checker = 0;
    inp2.style.border = "1px solid #f4433696";
}

var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
if (inp3.value != '' && re.test(inp3.value)) {} else {
    checker = 0;
    inp3.style.border = "1px solid #f4433696";
}

if (inp4.value.length >= 7 && inp4.value != '') {} else {
    checker = 0;
    inp4.style.border = "1px solid #f4433696";
}

if (inp5.value != inp4.value) {
    checker = 0;
    inp5.style.border = "1px solid #f4433696";
}

if (inp6.value != 'none' && inp7.value != 'none' && inp8.value != 'none') {
    if (inp7.value == 'April' || inp7.value == 'June' || inp7.value == 'September' || inp7.value == 'November') {
        if (inp6.value == '31') {
            checker = 0;
            inp6.style.border = "1px solid #f4433696";
        }
    }
    if (inp7.value == 'Febuary') {
        if (inp6.value == '30' || inp6.value == '31') {
            checker = 0;
            inp6.style.border = "1px solid #f4433696";
        }
    }
} else {
    checker = 0;
    inp6.style.border = "1px solid #f4433696";
    inp7.style.border = "1px solid #f4433696";
    inp8.style.border = "1px solid #f4433696";
}

if (inp9.value != 'none') {} else {
    checker = 0;
    inp9.style.border = "1px solid #f4433696";
}

if (inp10.value != 'none') {
    if (inp10.value != '1' && inp10.value != '2') {
        if (inp14.value != 'none') {} else {
            checker = 0;
            inp14.style.border = "1px solid #f4433696";
        }
    }
} else {
    checker = 0;
    inp10.style.border = "1px solid #f4433696";
}

if (inp11.value != 'none') {} else {
    checker = 0;
    inp11.style.border = "1px solid #f4433696";
}

if (inp12.value != 'none') {} else {
    checker = 0;
    inp12.style.border = "1px solid #f4433696";
}

if (inp13.value != 'none') {} else {
    checker = 0;
    inp13.style.border = "1px solid #f4433696";
}


if (checker == 1 && gender != 'none') {

    alertada();

    $.post("https://edifyfox.com/php/insertdatasngup.php",
    {
        firstname: document.getElementById('frstnm').value,
        lastname: document.getElementById('scdnm').value,
        email: document.getElementById('mailchk').value,
        pass: document.getElementById('pwdc').value,
        ddn: `${document.getElementById('annee').value}.${document.getElementById('mois').value}.${document.getElementById('jour').value}`,   
        cntry: document.getElementById('cntry').value,
        gender: gender,
        sclevel: document.getElementById('mustawa').value,
        sec: document.getElementById('sec').value,
        grp: document.getElementById('grp').value,
        sgrp: document.getElementById('sgrp').value
    },
    function(data, status){
        if (data == "done") {
            alertada('Account created with success');
            $('#stin').click();
            document.getElementById('frstnm').value = '';
            document.getElementById('scdnm').value = '';
            document.getElementById('mailchk').value = '';
            document.getElementById('pwdc').value = '';
            document.getElementById('annee').value = 'none';
            document.getElementById('mois').value = 'none';
            document.getElementById('jour').value = 'none';
            document.getElementById('cntry').value = 'none';
            document.getElementById('mustawa').value = 'none';
            document.getElementById('sec').value = 'none';
            document.getElementById('grp').value = 'none';
            document.getElementById('sgrp').value = 'none';
        }
    }); 
}

});


$("#editPrflp").click(function() {
    if (document.getElementById('editthings1').className == "inputat_") {  
        editthings();
    } else {
        document.getElementById('editPrflp').className = "buteditt_";
        document.getElementById('editPrflp').innerHTML = 'Save';
        document.getElementById('editthings1').className = "inputat_";
        document.getElementById('editthings2').className = "inputatmn_";
    }
});



$("#mustawa_").change(function() {
    var mustawa_ = document.getElementById('mustawa_');
    if (mustawa_.value == '1' || mustawa_.value == '2') {
        $('.fo12').prop('disabled', false);
        $('.fo12345').prop('disabled', true);
    } else if (mustawa_.value == '3' || mustawa_.value == '4' || mustawa_.value == '5') {
        $('.fo12').prop('disabled', false);
        $('.fo12345').prop('disabled', false);
    }
});  

$("#sec_").change(function() {
    var sec_ = document.getElementById('sec_');
    if (sec_.value == '1') {
        $('.fosec1').prop('disabled', false);
        $('.fosec2').prop('disabled', true);
        $('.fosec3').prop('disabled', true);
    } else if (sec_.value == '2') {
        $('.fosec1').prop('disabled', true);
        $('.fosec2').prop('disabled', false);
        $('.fosec3').prop('disabled', true);
    } 
});  



function editthings() {

    var pwd_ = document.getElementById('pwded1').value;
    var pwdn_ = document.getElementById('pwded2').value;

    if (document.getElementById('mustawa_').value != "none") {
        alertada();
        $.post("https://edifyfox.com/php/editthingss.php",
        {
            ina3am: document.getElementById('mustawa_').value,
            sid: SESSION.id
        },
        function(data, status){

            if (data.err1 != "") {
                alertada(data.err1);
            } else {
                SESSION.id = data.id;
                SESSION.firstname = data.firstname;
                SESSION.lastname = data.lastname;
                SESSION.email = data.email;
                SESSION.pwd = data.pwd;
                SESSION.ddn = data.ddn;
                SESSION.country = data.country;
                SESSION.gender = data.gender;
                SESSION.sclevel = data.sclevel;
                SESSION.sec = data.sec;
                SESSION.grp = data.grp;
                SESSION.sgrp = data.sgrp;
                SESSION.ddc = data.ddc;
                SESSION.ip = data.ip;

                mdularaya(SESSION.sclevel);
                getScdlAndWeekNum(crntweek);
                prf3mer();
                loadnotif();
                toolaraya();
                setInterval(function() {
                    loadnotif();
                }, 5000);
                $('.bcblak').click();
            }
            document.getElementById('mustawa_').value = "none";
            document.getElementById('editthings1').className = "inputat";
            document.getElementById('editthings2').className = "inputatmn";
            document.getElementById('editPrflp').className = "buteditt";
            document.getElementById('editPrflp').innerHTML = 'Edit your stats';
        }); 
    }

    if (document.getElementById('sec_').value != "none") {
        alertada();
        $.post("https://edifyfox.com/php/editthingss.php",
        {
            inasec: document.getElementById('sec_').value,
            sid: SESSION.id
        },
        function(data, status){

            if (data.err1 != "") {
                alertada(data.err1);
            } else {
                SESSION.id = data.id;
                SESSION.firstname = data.firstname;
                SESSION.lastname = data.lastname;
                SESSION.email = data.email;
                SESSION.pwd = data.pwd;
                SESSION.ddn = data.ddn;
                SESSION.country = data.country;
                SESSION.gender = data.gender;
                SESSION.sclevel = data.sclevel;
                SESSION.sec = data.sec;
                SESSION.grp = data.grp;
                SESSION.sgrp = data.sgrp;
                SESSION.ddc = data.ddc;
                SESSION.ip = data.ip;

                mdularaya(SESSION.sclevel);
                getScdlAndWeekNum(crntweek);
                prf3mer();
                loadnotif();
                toolaraya();
                setInterval(function() {
                    loadnotif();
                }, 5000);
                $('.bcblak').click();
            }
            
            document.getElementById('sec_').value = "none";
            document.getElementById('editthings1').className = "inputat";
            document.getElementById('editthings2').className = "inputatmn";
            document.getElementById('editPrflp').className = "buteditt";
            document.getElementById('editPrflp').innerHTML = 'Edit your stats';
        }); 
    }

    if (document.getElementById('grp_').value != "none") {
        alertada();
        $.post("https://edifyfox.com/php/editthingss.php",
        {
            inagrp: document.getElementById('grp_').value,
            sid: SESSION.id
        },
        function(data, status){

            if (data.err1 != "") {
                alertada(data.err1);
            } else {
                SESSION.id = data.id;
                SESSION.firstname = data.firstname;
                SESSION.lastname = data.lastname;
                SESSION.email = data.email;
                SESSION.pwd = data.pwd;
                SESSION.ddn = data.ddn;
                SESSION.country = data.country;
                SESSION.gender = data.gender;
                SESSION.sclevel = data.sclevel;
                SESSION.sec = data.sec;
                SESSION.grp = data.grp;
                SESSION.sgrp = data.sgrp;
                SESSION.ddc = data.ddc;
                SESSION.ip = data.ip;

                mdularaya(SESSION.sclevel);
                getScdlAndWeekNum(crntweek);
                prf3mer();
                loadnotif();
                toolaraya();
                setInterval(function() {
                    loadnotif();
                }, 5000);
                $('.bcblak').click();
            }
            
            document.getElementById('grp_').value = "none";
            document.getElementById('editthings1').className = "inputat";
            document.getElementById('editthings2').className = "inputatmn";
            document.getElementById('editPrflp').className = "buteditt";
            document.getElementById('editPrflp').innerHTML = 'Edit your stats';
        }); 
    }

    if (document.getElementById('sgrp_').value != "none") {
        alertada();
        $.post("https://edifyfox.com/php/editthingss.php",
        {
            inasgr: document.getElementById('sgrp_').value,
            sid: SESSION.id
        },
        function(data, status){

            if (data.err1 != "") {
                alertada(data.err1);
            } else {
                SESSION.id = data.id;
                SESSION.firstname = data.firstname;
                SESSION.lastname = data.lastname;
                SESSION.email = data.email;
                SESSION.pwd = data.pwd;
                SESSION.ddn = data.ddn;
                SESSION.country = data.country;
                SESSION.gender = data.gender;
                SESSION.sclevel = data.sclevel;
                SESSION.sec = data.sec;
                SESSION.grp = data.grp;
                SESSION.sgrp = data.sgrp;
                SESSION.ddc = data.ddc;
                SESSION.ip = data.ip;

                mdularaya(SESSION.sclevel);
                getScdlAndWeekNum(crntweek);
                prf3mer();
                loadnotif();
                toolaraya();
                setInterval(function() {
                    loadnotif();
                }, 5000);
                $('.bcblak').click();
            }
            
            document.getElementById('sgrp_').value = "none";
            document.getElementById('editthings1').className = "inputat";
            document.getElementById('editthings2').className = "inputatmn";
            document.getElementById('editPrflp').className = "buteditt";
            document.getElementById('editPrflp').innerHTML = 'Edit your stats';

        }); 
    } 

    if(pwd_ && pwdn_) {
        alertada();
        if(pwdn_.length >= 8) {
            $.post("https://edifyfox.com/php/editthingss.php",
            {
                inapwd: pwd_,
                pwdjdd: pwdn_,
                sid: SESSION.id
            },
            function(data, status){
    
                if (data.err1 != "") {
                    alertada(data.err1);
                } else {
                    SESSION.id = data.id;
                    SESSION.firstname = data.firstname;
                    SESSION.lastname = data.lastname;
                    SESSION.email = data.email;
                    SESSION.pwd = data.pwd;
                    SESSION.ddn = data.ddn;
                    SESSION.country = data.country;
                    SESSION.gender = data.gender;
                    SESSION.sclevel = data.sclevel;
                    SESSION.sec = data.sec;
                    SESSION.grp = data.grp;
                    SESSION.sgrp = data.sgrp;
                    SESSION.ddc = data.ddc;
                    SESSION.ip = data.ip;

                    var dict = {
                        "username" : SESSION.email,
                        "password" : pwdn_
                    };
                    localStorage.setItem('chkedlgn', JSON.stringify(dict));
    
                    mdularaya(SESSION.sclevel);
                    getScdlAndWeekNum(crntweek);
                    prf3mer();
                    loadnotif();
                    toolaraya();
                    setInterval(function() {
                        loadnotif();
                    }, 5000);
                    $('.bcblak').click();
                }
                document.getElementById('pwded1').value = "";
                document.getElementById('pwded2').value = "";
                document.getElementById('editthings1').className = "inputat";
                document.getElementById('editthings2').className = "inputatmn";
                document.getElementById('editPrflp').className = "buteditt";
                document.getElementById('editPrflp').innerHTML = 'Edit your stats';
            }); 
        } else {
            alertada("8 characters minimum");
        }
        
    }

}











var mustawa = document.getElementById('mustawa');
var sec = document.getElementById('sec');
var grp = document.getElementById('grp');
var sgrp = document.getElementById('sgrp');
var branch = document.getElementById('branche');

$("#grp").change(function() {
    if (this.value != 'none') {
        $(this).css('border', '1px solid transparent');
    }
});

$("#sgrp").change(function() {
    if (this.value != 'none') {
        $(this).css('border', '1px solid transparent');
    }
});

$("#mustawa").change(function() {
    if (this.value != 'none') {
        $(this).css('border', '1px solid transparent');
    }
    if (mustawa.value == '1' || mustawa.value == '2') {
        $('.for12').prop('disabled', false);
        $('.for12345').prop('disabled', true);
        $('#brnc').css('display', 'none');
        sec.value = 'none';
        grp.value = 'none';
    } else if (mustawa.value == '3' || mustawa.value == '4' || mustawa.value == '5') {
        $('#brnc').css('display', 'block');
        $('.for12').prop('disabled', false);
        $('.for12345').prop('disabled', false);
        sec.value = 'none';
        grp.value = 'none';
    }
});  

$("#sec").change(function() {
    if (this.value != 'none') {
        $(this).css('border', '1px solid transparent');
    }
    if (sec.value == '1' && mustawa.value == '1' || sec.value == '1' && mustawa.value == '2') {
        $('.forsec1').prop('disabled', false);
        $('.forsec2').prop('disabled', true);
        $('.forsec3').prop('disabled', true);
        grp.value = 'none';
    } else if (sec.value == '2' && mustawa.value == '1' || sec.value == '2' && mustawa.value == '2') {
        $('.forsec1').prop('disabled', true);
        $('.forsec2').prop('disabled', false);
        $('.forsec3').prop('disabled', true);
        grp.value = 'none';
    } 
});  

$("#frstnm").on('input',function() {
    if (this.value != '' && this.value.length >= 3 && this.value.length <= 25 && isNaN(this.value)) {
        $(this).css('border', '1px solid transparent');
    }
});

$("#scdnm").on('input',function() {
    if (this.value != '' && this.value.length >= 3 && this.value.length <= 25 && isNaN(this.value)) {
        $(this).css('border', '1px solid transparent');
    }
}); 

$("#mailchk").on('input',function() {
    var ree = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    if (this.value != '' && ree.test(this.value)) {
        $(this).css('border', '1px solid transparent');
    }
}); 


$("#pwd").on('input',function() {
    if (this.value.length >= 8 && this.value != '') {
        $(this).css('border', '1px solid transparent');
    }
}); 

$("#pwdc").on('input',function() {
    if (this.value == document.getElementById('pwd').value) {
        $(this).css('border', '1px solid transparent');
    }
}); 


$("#jour").change(function() {
    if (this.value != 'none') {
        $(this).css('border', '1px solid transparent');
    }
});

$("#mois").change(function() {
    if (this.value != 'none') {
        $(this).css('border', '1px solid transparent');
    }
});

$("#annee").change(function() {
    if (this.value != 'none') {
        $(this).css('border', '1px solid transparent');
    }
});

$("#cntry").change(function() {
    if (this.value != 'none') {
        $(this).css('border', '1px solid transparent');
    }
});



$('#stup').click(function() {
    this.className = 'st';
    document.getElementById('stin').className = 'st opac';

    document.getElementById('sgninitm').className = 'singindiv_';
    document.getElementById('sgnupitm').className = 'signupdiv';
});

$('#stin').click(function() {
    this.className = 'st';
    document.getElementById('stup').className = 'st opac';

    document.getElementById('sgninitm').className = 'singindiv';
    document.getElementById('sgnupitm').className = 'signupdiv_';
});




function mdularaya(sclvl) {

    if (SESSION.id != '') {

        var xhh = new XMLHttpRequest();
        var url = 'https://edifyfox.com/php/modulesreader.php';
        
        
        var data_post ="sm1="+sclvl;
        
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


function getcourse(evt) {
        $('.dialogwrap').css('display', 'block');
        setTimeout(function() {
            $('.dialogwrap').css('opacity', '1');
        }, 100);
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


function getelyout(evtt) {

    document.getElementById('hanadl').className = 'dialogwin';
    var arrayBut = 't';
    var obs = JSON.parse(localStorage.getItem('store'));

    for(i = 1; i < obs.length; i++) {
        var str = obs[i];
        var idget = str.split("-");
        if (evtt == idget[1]) {
            var xsm = str.split("[");
            var ysm = xsm[1].split("]");
            var xysm = ysm[0];
            arrayBut += '/' + xysm;
        }
    }

    var data_post = new FormData();
    var ajax = new XMLHttpRequest();
    data_post.append("id", evtt);
    data_post.append("arryoff", arrayBut);
    ajax.addEventListener("load", function(event) {
        document.getElementById('lyoutkhdmi').innerHTML = event.target.response;
        $('.bcblak').click();
        document.getElementById('lyoutkhdmi').className = 'elyout';
    }, false);
    ajax.open("POST", "https://edifyfox.com/php/lyoutreader.php");
    ajax.send(data_post);
    
    
}




function renderPage(num) {
    
    var canvas = document.querySelector('#pdf-render'),
        ctx = canvas.getContext('2d');

    pdfDoc.getPage(num).then(page => {

      var viewport = page.getViewport({ scale });
      canvas.height = viewport.height;
      canvas.width = viewport.width;
  
      var renderCtx = {
        canvasContext: ctx,
        viewport : viewport
      };
  
      page.render(renderCtx);
      document.querySelector('#page-num').textContent = num;
    });
}
function queueRenderPage(num) {
    if (pageIsRendering) {
      pageNumIsPending = num;
    } else {
      renderPage(num);
    }
}
function showPrevPage() {
    if (pageNum <= 1) {
      return;
    }
    pageNum--;
    queueRenderPage(pageNum);
    document.querySelector('.canvascontainer').scrollTop = 0;
}
function showNextPage() {
    if (pageNum >= document.querySelector('#page-count').textContent) {
      return;
    }
    pageNum++;
    queueRenderPage(pageNum);
    document.querySelector('.canvascontainer').scrollTop = 0;
}
function pdfviewerfunction(arg) {
    var url = arg;

    var canvas = document.querySelector('#pdf-render'),
        ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
    pdfjsLib.getDocument(url).then(pdfDoc_ => {
            pdfDoc = pdfDoc_;
            document.querySelector('#page-count').textContent = pdfDoc.numPages;
            renderPage(pageNum);
    });
}



  
function showviewer(source, strarg, idarg, tparg) {
    document.getElementById('viewifram').className = 'ifram';
    var Namestr = `file[${strarg}]edify-${idarg}-${tparg}`;
    localforage.getItem(Namestr).then(function(value) {
        if (value) {
            pdfviewerfunction(value);
        } else {
            var xhr = new XMLHttpRequest(),
            blob,
            fileReader = new FileReader();
            xhr.open("GET", source, true);
            xhr.responseType = "arraybuffer";
            xhr.addEventListener("progress", function(event) {
                var percent = (event.loaded / event.total) * 100;
                document.getElementById("progressBar").value = Math.round(percent);
            }, false);
            xhr.addEventListener("load", function () {
                if (xhr.status === 200) {
                    blob = new Blob([xhr.response], {type: "application/pdf"});
                    fileReader.onload = function (evt) {
                        var result = evt.target.result;
                        pdfviewerfunction(result);
                        document.getElementById("progressBar").value = 0;
                    };
                    fileReader.readAsDataURL(blob);
                }
            }, false);
            xhr.send();
        }
    }).catch(function(err) {
        // This code runs if there were any errors
        console.log(err);
    });
    
}

function lyutfermer() {
    document.getElementById('lyoutkhdmi').className = 'elyout_';
    document.getElementById('lyoutkhdmi').innerHTML = '';
}

$('#rot-page').click(function() {
    if (document.getElementById('pdf-render').className == 'xrt0') {
        document.getElementById('pdf-render').className = 'xrt90';
    } else if (document.getElementById('pdf-render').className == 'xrt90') {
        document.getElementById('pdf-render').className = 'xrt180';
    } else if (document.getElementById('pdf-render').className == 'xrt180') {
        document.getElementById('pdf-render').className = 'xrt270';
    } else if (document.getElementById('pdf-render').className == 'xrt270') {
        document.getElementById('pdf-render').className = 'xrt0';
    }
});

function dwnoff(source, inpt, idelem, typo) {
    document.getElementById(`swt${inpt}`).className = 'switcher_LOAD';
    var objc = JSON.parse(localStorage.getItem('store'));

            var Namestrs = `file[${inpt}]edify-${idelem}-${typo}`;
            var ac = objc.indexOf(Namestrs);

            localforage.getItem(Namestrs).then(function(value) {
                if (value && ac != -1) {
                    for(var i = 0; i < objc.length; i++){ 
                        if (objc[i] === Namestrs) {
                            objc.splice(i, 1); 
                        }
                    }
                    var newtxts = JSON.stringify(objc);
                    
                    localforage.removeItem(Namestrs).then(function() {
                        localStorage.setItem('store', newtxts);
                        document.getElementById(`swt${inpt}`).className = 'switcher_OFF';
                    }).catch(function(err) {
                        console.log(err);
                    });
                    
                } else {
                    var xhr = new XMLHttpRequest(),
                        blob,
                        fileReader = new FileReader();
                    
                    xhr.open("GET", source, true);
                    xhr.responseType = "arraybuffer";
                    xhr.addEventListener("load", function () {
                        if (xhr.status === 200) {
                            blob = new Blob([xhr.response], {type: "application/pdf"});
                            fileReader.onload = function (evt) {
                                var result = evt.target.result;
                                try {
                                    localforage.setItem(Namestrs, result).then(function (value) {
                                        objc.push(Namestrs);
                                        var newtxt = JSON.stringify(objc);
                                        localStorage.setItem('store', newtxt);
                                        document.getElementById(`swt${inpt}`).className = 'switcher_ON';
                                    }).catch(function(err) {
                                        console.log(err);
                                    });
                                }
                                catch (e) {
                                    console.log("Storage failed: " + e);
                                }
                            };
                            fileReader.readAsDataURL(blob);
                        }
                    }, false);
                    xhr.send();
    
                }

            }).catch(function(err) {
                console.log(err);
            });
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
    if (navigator.onLine) {} else {
        jiblidikchi();
        document.getElementById('offmodeui').className = "offui3_";
    }
});

var fainm = false;

function animdtb() {
    if (fainm) {
        return; 
    } else {
        fainm = true;
        $('.dvl3iba').css('width','100%');
        $('.smdl3iba').css('opacity','0');
        $('.smn2it').css('width','calc(100vw - 266px)');
        setTimeout(function() {
            $('.sdmn2').css('left','unset');
            $('.sdmn2').css('right','5px');
            $('.smn2it').css('text-align','right');
            $('.smn2it').css('background','transparent');
            $('.smn2it').css('width','140px');
            $('.dvl3iba').css('left','unset');
            $('.dvl3iba').css('right','0');
            $('.dvl3iba').css('width','2px');
        }, 400);
    }
}

function animdtb2() {
    if (!fainm) {
        return; 
    } else {
        fainm = false;
            $('.smn2it').css('text-align','left');
            $('.smn2it').css('width','calc(100vw - 250px)');
            $('.dvl3iba').css('width','100%');
        setTimeout(function() {
            $('.smdl3iba').css('opacity','1');
            $('.sdmn2').css('right','unset');
            $('.sdmn2').css('left','150px');
            $('.dvl3iba').css('right','unset');
            $('.dvl3iba').css('left','0');
            $('.dvl3iba').css('width','2px');
            $('.smn2it').css('width','200px');
        }, 400);
        setTimeout(function() {
            $('.smn2it').css('background','#aec6ef1c');
        }, 700);
    }
}

$('#hmes1').click(function() {
    animdtb2();
    $('#amm1').css('transform','translateY(100vw)');
    $('#amm2').css('transform','translateY(100vw)');
    $('#amm3').css('transform','translateY(100vw)');
    $('#amm4').css('transform','translateY(100vw)');
    $('.txndor').css('opacity','1');
    document.getElementById('hms1').className = 'dvl3iba opa1';
    document.getElementById('hms2').className = 'dvl3iba';
    document.getElementById('hms3').className = 'dvl3iba';
    document.getElementById('hms4').className = 'dvl3iba';
    document.getElementById('hms5').className = 'dvl3iba';
});


$('#hmes2').click(function() {
    animdtb();
    $('#amm1').css('transform','translateY(100vw)');
    $('#amm2').css('transform','translateY(0)');
    $('#amm3').css('transform','translateY(100vw)');
    $('#amm4').css('transform','translateY(100vw)');
    document.getElementById('hms1').className = 'dvl3iba';
    document.getElementById('hms2').className = 'dvl3iba opa1';
    document.getElementById('hms3').className = 'dvl3iba';
    document.getElementById('hms4').className = 'dvl3iba';
    document.getElementById('hms5').className = 'dvl3iba';
});

$('#hmes3').click(function() {
    animdtb();
    $('#amm1').css('transform','translateY(100vw)');
    $('#amm2').css('transform','translateY(100vw)');
    $('#amm3').css('transform','translateY(0)');
    $('#amm4').css('transform','translateY(100vw)');
    $('.txndor').css('opacity','0');
    document.getElementById('hms1').className = 'dvl3iba';
    document.getElementById('hms2').className = 'dvl3iba';
    document.getElementById('hms3').className = 'dvl3iba opa1';
    document.getElementById('hms4').className = 'dvl3iba';
    document.getElementById('hms5').className = 'dvl3iba';
});

$('#hmes4').click(function() {
    animdtb();
    $('#amm1').css('transform','translateY(0)');
    $('#amm2').css('transform','translateY(100vw)');
    $('#amm3').css('transform','translateY(100vw)');
    $('#amm4').css('transform','translateY(100vw)');
    document.getElementById('hms1').className = 'dvl3iba';
    document.getElementById('hms2').className = 'dvl3iba';
    document.getElementById('hms3').className = 'dvl3iba';
    document.getElementById('hms4').className = 'dvl3iba opa1';
    document.getElementById('hms5').className = 'dvl3iba';
});

$('#hmes5').click(function() {
    animdtb();
    $('#amm1').css('transform','translateY(100vw)');
    $('#amm2').css('transform','translateY(100vw)');
    $('#amm3').css('transform','translateY(100vw)');
    $('#amm4').css('transform','translateY(0)');
    document.getElementById('hms1').className = 'dvl3iba';
    document.getElementById('hms2').className = 'dvl3iba';
    document.getElementById('hms3').className = 'dvl3iba';
    document.getElementById('hms4').className = 'dvl3iba';
    document.getElementById('hms5').className = 'dvl3iba opa1';
});




// WEATHER MEKNES ID 6547283

const iconElement = document.querySelector(".data1wth img");
const tempElement = document.querySelector(".dtwthtemp");
const descElement = document.querySelector(".dtwthstat");
const locationElement = document.querySelector(".dtwthmdina");
const humidityvar = document.querySelector("#dtwthvar1");
const pressurevar = document.querySelector("#dtwthvar2");
const windvar = document.querySelector("#dtwthvar3");
const sunriseyvar = document.querySelector("#dtwthvar4");
const sunsetvar = document.querySelector("#dtwthvar5");

const weather = {};

weather.temperature = {
    unit : "celsius"
}

// APP CONSTS AND VARS
const KELVIN = 273.15;
// API KEY
const key = "5186ca6d55c8b7d7115aaf6c572749c4";
const idcity = "2542715";

function getWeather() {
    if (navigator.onLine) {
    let api = `https://api.openweathermap.org/data/2.5/weather?id=${idcity}&appid=${key}`;
    let apiforecast = `https://api.openweathermap.org/data/2.5/forecast?id=${idcity}&appid=${key}`;
    
    fetch(api)
        .then(function(response){
            let data = response.json();
            return data;
        })
        .then(function(data){
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
            weather.humidity = data.main.humidity;
            weather.pressure = data.main.pressure;
            weather.wind = Math.floor(data.wind.speed * 3.6);
            weather.sunrise = data.sys.sunrise;
            weather.sunset  = data.sys.sunset;
        })
        .then(function(){
            displayWeather();
        });
    }
}

function unixDATE(dt) {
    var date = new Date(dt*1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

    return formattedTime
}

function displayWeather(){
    iconElement.src = `icons/wth/${weather.iconId}.png`;
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
    humidityvar.innerHTML = `${weather.humidity} %`;
    pressurevar.innerHTML = `${weather.pressure} hPa`;
    windvar.innerHTML = `${weather.wind} km/h`;
    sunriseyvar.innerHTML = unixDATE(weather.sunrise);
    sunsetvar.innerHTML = unixDATE(weather.sunset);

    var crnttime = new Date().getHours();
    var crnsunrise = new Date(weather.sunrise*1000);
    var crnsunset = new Date(weather.sunset*1000);
    if (crnttime > crnsunrise.getHours() && crnttime < crnsunset.getHours()) {
        $('.animwth').css('background','url(img/mknes.jpg) no-repeat center center / cover');
    } else {
        $('.animwth').css('background','url(img/mknesn.jpg) no-repeat center center / cover');
    }

}

getWeather();

setInterval(function() {
    getWeather()
}, 600000);






// SCHEDULE 


function getScdlAndWeekNum(evtr) {
    $.get(`https://edifyfox.com/php/scdl/edify${SESSION.sclevel}A.json`, function(data, status){
        getscdl(evtr, data);
    });
    $.get("https://edifyfox.com/php/scdl/weekS2.json", function(data, status){
        for (x = 0; x < data.tmweek.length; x++) {
            if (evtr >= data.tmweek[x].unixstr && evtr <= data.tmweek[x].unixend) {
                document.getElementById('weekNB').innerHTML = data.tmweek[x].week;
            }
        }
        if (document.getElementById('weekNB').innerHTML == 14 || document.getElementById('weekNB').innerHTML == 28) {
            $('.scdnxtweek').css('opacity','0.2');
            $('.scdnxtweek').css('pointer-events','none');
        } else {
            $('.scdnxtweek').css('opacity','1');
            $('.scdnxtweek').css('pointer-events','fill');
        }

        if (document.getElementById('weekNB').innerHTML == 15 || document.getElementById('weekNB').innerHTML == 1) {
            $('.scdcrtweek').css('opacity','0.2');
            $('.scdcrtweek').css('pointer-events','none');
        } else {
            $('.scdcrtweek').css('opacity','1');
            $('.scdcrtweek').css('pointer-events','fill');
        }
    });
}

function getscdl(evt, scdl) {
    if (SESSION.id != '') {

        var dt = evt;
        var groupe = `G${SESSION.grp}`;
        var sgroup = `SG${SESSION.grp}-${SESSION.sgrp}`;
        var sgroupc = `G${SESSION.grp}-${SESSION.sgrp}`;
        var section = `Sec${SESSION.sec}`;

        document.querySelector('.scdLundi').innerHTML = '';
        document.querySelector('.scdMardi').innerHTML = '';
        document.querySelector('.scdMercredi').innerHTML = '';
        document.querySelector('.scdJeudi').innerHTML = '';
        document.querySelector('.scdVendredi').innerHTML = '';
    

        for (i = 0; i < scdl.table.row.length; i++) {

            var apartirde = scdl.table.row[i].apartirde;
            var audate = scdl.table.row[i].audate;
            var up1 = apartirde.slice(0,2);
            var up2 = apartirde.slice(3,5);
            var up3 = apartirde.slice(6,10);
            var dwn1 = audate.slice(0,2);
            var dwn2 = audate.slice(3,5);
            var dwn3 = audate.slice(6,10);
            var dt1 = new Date(`${up3}.${up2}.${up1}`).getTime() / 1000;
            var dt2 = new Date(`${dwn3}.${dwn2}.${dwn1}`).getTime() / 1000;
            
            var strtmzn = scdl.table.row[i].horaire;
            if (dt >= dt1 && dt <= dt2 && document.getElementById('weekNB').innerHTML != "of tests" && document.getElementById('weekNB').innerHTML != "off") {
                if (scdl.table.row[i].GROUPE == groupe && scdl.table.row[i].SGROUPE == "") {
                    var ncrs = 0;
                    var lngheight = 40;
                    if (strtmzn.search("08") != -1 && strtmzn.search("10") != -1) {
                        ncrs = 0;
                    } else if (strtmzn.search("10") != -1 && strtmzn.search("12") != -1) {
                        ncrs = 71;
                    } else if (strtmzn.search("14") != -1 && strtmzn.search("16") != -1) {
                        ncrs = 186;
                    } else if (strtmzn.search("16") != -1 && strtmzn.search("18") != -1) {
                        ncrs = 258;
                    }  else if (strtmzn.search("08") != -1 && strtmzn.search("12") != -1) {
                        ncrs = 0;
                        lngheight = 112;
                    }  else if (strtmzn.search("14") != -1 && strtmzn.search("18") != -1) {
                        ncrs = 186;
                        lngheight = 112;
                    } else if (strtmzn.search("16") != -1 && strtmzn.search("19") != -1) {
                        ncrs = 258;
                        lngheight = 70;
                    } else if (strtmzn.search("13") != -1 && strtmzn.search("16") != -1) {
                        ncrs = 155;
                        lngheight = 70;
                    }
                    document.querySelector(`.scd${scdl.table.row[i].jours}`).innerHTML += `<section class="scdTD" name="${scdl.table.row[i].SECTION}" style="top:${ncrs}px;height:${lngheight}px"><p>${scdl.table.row[i].libelement}</p></section>`;
            
                } else if (scdl.table.row[i].SECTION == section && scdl.table.row[i].GROUPE == "" && scdl.table.row[i].SGROUPE == "") {
                    var ncrss = 0;
                    var lngheightt = 40;
                    if (strtmzn.search("08") != -1 && strtmzn.search("10") != -1) {
                        ncrss = 0;
                    } else if (strtmzn.search("10") != -1 && strtmzn.search("12") != -1) {
                        ncrss = 71;
                    } else if (strtmzn.search("14") != -1 && strtmzn.search("16") != -1) {
                        ncrss = 186;
                    } else if (strtmzn.search("16") != -1 && strtmzn.search("18") != -1) {
                        ncrss = 258;
                    } else if (strtmzn.search("08") != -1 && strtmzn.search("12") != -1) {
                        ncrss = 0;
                        lngheightt = 112;
                    } else if (strtmzn.search("14") != -1 && strtmzn.search("18") != -1) {
                        ncrss = 186;
                        lngheightt = 112;
                    }
                    document.querySelector(`.scd${scdl.table.row[i].jours}`).innerHTML += `<section class="scdCOURS" name="${scdl.table.row[i].SECTION}" style="top:${ncrss}px;height:${lngheightt}px"><p>${scdl.table.row[i].libelement}</p></section>`;
                
                } else if (scdl.table.row[i].SGROUPE == sgroupc || scdl.table.row[i].SGROUPE == sgroup) {
                    var ncrsss = 0;
                    var lngheighttt = 70;
                    if (strtmzn.search("08") != -1 && strtmzn.search("11") != -1) {
                        ncrsss = 0;
                    } else if (strtmzn.search("10") != -1 && strtmzn.search("13") != -1) {
                        ncrsss = 71;
                    } else if (strtmzn.search("10") != -1 && strtmzn.search("12") != -1) {
                        ncrsss = 71;
                    } else if (strtmzn.search("13") != -1 && strtmzn.search("16") != -1) {
                        ncrsss = 155;
                    } else if (strtmzn.search("16") != -1 && strtmzn.search("19") != -1) {
                        ncrsss = 258;
                    } else if (strtmzn.search("16") != -1 && strtmzn.search("18") != -1) {
                        ncrsss = 258;
                    } else if (strtmzn.search("08") != -1 && strtmzn.search("12") != -1) {
                        ncrsss = 0;
                        lngheighttt = 112;
                    } else if (strtmzn.search("14") != -1 && strtmzn.search("18") != -1) {
                        ncrsss = 186;
                        lngheighttt = 112;
                    }
                    document.querySelector(`.scd${scdl.table.row[i].jours}`).innerHTML += `<section class="scdTP" name="${scdl.table.row[i].SECTION}" style="top:${ncrsss}px;height:${lngheighttt}px"><p>${scdl.table.row[i].libelement}</p></section>`;
                } 
            } 
        }
    }
}


$('.scdnxtweek').click(function() {
    crntweek = crntweek + 604800;
    getScdlAndWeekNum(crntweek);
});

$('.scdcrtweek').click(function() {
    crntweek = crntweek - 604800;
    getScdlAndWeekNum(crntweek);
});





var start = 10;

$('#ajtcbzf').click(function() {
    document.getElementById('ajtcbzf').innerHTML = "";
    document.getElementById('ajtcbzf').className = "switcher_LOAD";
    document.getElementById('ajtcbzf').style.width = '20px';
    document.getElementById('ajtcbzf').style.height = '20px';
    document.getElementById('ajtcbzf').style.margin = '30px auto';

    start = start + 10;
    setTimeout(function() {
        document.getElementById('ajtcbzf').style.width = '90px';
        document.getElementById('ajtcbzf').style.height = 'auto';
        document.getElementById('ajtcbzf').style.margin = '30px auto';
        document.getElementById('ajtcbzf').className = "bgtncbzf";
        document.getElementById('ajtcbzf').innerHTML = "LOAD MORE";
    }, 5000)
});

function loadnotif() {

    if (SESSION.id != '' && navigator.onLine) {
        $.ajax({
            url: 'https://edifyfox.com/php/notifreader.php',
            method: 'POST',
            data: {
                option : start,
                sclvl : SESSION.sclevel,
                sclsec : SESSION.sec,
                sclgrp : SESSION.grp,
                scSgrp : SESSION.sgrp,
                sesID : SESSION.id
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
            }
        });        
    }
}




function toolaraya() {

    if (SESSION.id != '') {

        var xhh = new XMLHttpRequest();
        var url = 'https://edifyfox.com/php/toolsreader.php';
        
        xhh.open('POST', url, true);
        xhh.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhh.onreadystatechange = function() {
            if(xhh.readyState == 4 && xhh.status == 200) {
                document.getElementById('tirdphp').innerHTML = xhh.response;
            }
        }
        xhh.send();
    }

}


var pdfDoc2 = null,
    pageIsRendering2 = false,
    pageNumIsPending2 = null,
    pageNum2 = 1;

function renderPage2(num) {
    
    var canvas2 = document.querySelector('#pdf-render2'),
        ctxx = canvas2.getContext('2d');

    pdfDoc2.getPage(num).then(page => {

      var viewport2 = page.getViewport({ scale });
      canvas2.height = viewport2.height;
      canvas2.width = viewport2.width;
  
      var renderCtx2 = {
        canvasContext: ctxx,
        viewport : viewport2
      };
  
      page.render(renderCtx2);
      document.querySelector('#page-num2').textContent = num;
    });
}
function queueRenderPage2(num) {
    if (pageIsRendering2) {
      pageNumIsPending2 = num;
    } else {
      renderPage2(num);
    }
}
function showPrevPage2() {
    if (pageNum2 <= 1) {
      return;
    }
    pageNum2--;
    queueRenderPage2(pageNum2);
    document.querySelector('.canvascontainer2').scrollTop = 0;
}
function showNextPage2() {
    if (pageNum2 >= document.querySelector('#page-count2').textContent) {
      return;
    }
    pageNum2++;
    queueRenderPage2(pageNum2);
    document.querySelector('.canvascontainer2').scrollTop = 0;
}
function pdfviewerfunction2(arg) {
    localforage.getItem(arg).then(function(value) {
        var url = value;

        var canvas2 = document.querySelector('#pdf-render2'),
            ctxx = canvas2.getContext('2d');
            ctxx.clearRect(0, 0, canvas2.width, canvas2.height);
            
        pdfjsLib.getDocument(url).then(pdfDoc_ => {
                pdfDoc2 = pdfDoc_;
                document.querySelector('#page-count2').textContent = pdfDoc2.numPages;
                renderPage2(pageNum2);
            });

        document.getElementById('viewifram2').className = "ifram2";
    }).catch(function(err) {
        // This code runs if there were any errors
        console.log(err);
    });
    
}

function jiblidikchi() {

    var elemNames =["Topo IRn & Fonction à plusieurs variable","Métallurgie générale","Chimie Org & Macro Mol","Méc du Solide Indéfor","DAO","Construction Mécanique II","Fabrication Mécanique","Métrologie","Communication Orale","English for International communication III","Séries Num, Fonction, Entière, Fourier","Réduction des matrices et algèbre bilinéaire","Calcul des Probabilités","Eléments de Machines","RDM","Electromagnétisme","Automatique des Systèmes","Optique Physique","Alg & Prog en Lang C","Méthodes Numériques pour les fonctions d","Nombres et suites réels","Algèbre des structures","Fonctions d une variable réelle continui","Mécanique du point 1","Mécanique du point 2","Electrocinétique","Electrostatique","Optique géométrique","Renforcement de la langue","TEC I (Prise de notes etc)","English for International Communication I","Algèbre linéaire","Calcul Intégral - Equations différentiel","Thermodynamique","Chimie Générale","Construction Mécanique 1","Automatisme",
"Usinage","Procédés de fonderie","Procédés de formage","Communication Orale","English for International communication II"]

    var obs = JSON.parse(localStorage.getItem('store'));
            if (obs.length == 1) {
                document.getElementById('cndoff1').style.display = 'block';
                document.getElementById('cndoff2').style.display = 'none';
            } else {
                document.getElementById('cndoff1').style.display = 'none';
                document.getElementById('cndoff2').style.display = 'block';
                for(var j = 1; j<obs.length; j++) {
                    var str = obs[j];
                    var idget = str.split("-");
                    var xsm = str.split("[");
                    var ysm = xsm[1].split("]");
                    var xysm = ysm[0];
                    var clss = '';
                    if (j%2 == 0) {
                        clss = 'x2';
                    } else {
                        clss = 'x1';
                    }
                    document.getElementById('offmodewrap').innerHTML += `<div class="${clss}" onclick="pdfviewerfunction2('${obs[j]}')">${elemNames[idget[1]-1]} - ${xysm} - ${idget[2]}</div>`;
                }
            }
}

$('#cls-page').click(function() {
    document.getElementById('viewifram2').className = "ifram2_";
    document.querySelector('.canvascontainer2').scrollTop = 0;
    var canvas2 = document.querySelector('#pdf-render2'),
        ctxx = canvas2.getContext('2d');
        ctxx.clearRect(0, 0, canvas2.width, canvas2.height);
    pdfDoc2 = null;
    pageIsRendering2 = false;
    pageNumIsPending2 = null;
    pageNum2 = 1;
    document.getElementById('pdf-render2').className = 'xrt0';
})
$('#rot-page2').click(function() {
    switch(document.getElementById('pdf-render2').className) {
        case "xrt0":
            document.getElementById('pdf-render2').className = 'xrt90'
        break;
        case "xrt90":
            document.getElementById('pdf-render2').className = 'xrt180'
        break;
        case "xrt180":
            document.getElementById('pdf-render2').className = 'xrt270'
        break;
        default:
            document.getElementById('pdf-render2').className = 'xrt0'
    }
});



function openTool(stbr) {
    const {shell} = require('electron');
    var linktl = `https://edifyfox.com/tools/${stbr}`;
    shell.openExternal(linktl);
}