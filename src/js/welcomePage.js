const { parseHTML } = require("jquery");

var wlcB = ["img/wlcB1.jpg","img/wlcB2.jpg","img/wlcB3.jpg"];
var frameB = $('#strtitm1')[0];
$(frameB).css('background',`url(${wlcB[Math.floor(Math.random() * wlcB.length)]}) no-repeat center center`);
$(frameB).css('background-size','cover');

var firstName = $("#frstnm")[0];
var lastName = $("#scdnm")[0];
var email = $("#mailchk")[0];
var passcode = $("#pwd")[0];
var passcodec = $("#pwdc")[0];
var dayB = $("#jour")[0];
var monthB = $("#mois")[0];
var yearB = $("#annee")[0];
var levelS = $("#mustawa")[0];
var filliere = $("#branche")[0];
var section = $("#sec")[0];
var groupe = $("#grp")[0];
var sgroupe = $("#sgrp")[0];
var inputLists = {
    text : [firstName,lastName],
    mail : [email],
    pwd : [passcode],
    pwdc : [passcodec],
    select : [dayB,monthB,yearB,levelS,filliere,section,groupe,sgroupe]
};


function badInput(elm) {
    $(elm).css('box-shadow', '0px 2px 20px #b71c1c73');
}
function goodInput(elm) {
    $(elm).css('box-shadow', 'unset');
}

function checkText(elm) {
    if (elm.value != '' && elm.value.length >= 3 && elm.value.length <= 25 && isNaN(elm.value)) {
        goodInput(elm);
        return true
    } else {
        badInput(elm);
        return false
    }
}
function checkEmail(elm) {
    var ree = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    if (elm.value != '' && ree.test(elm.value)) {
        goodInput(elm);
        return true
    } else {
        badInput(elm);
        return false
    }
}
function checkPasscode(elm) {
    if (elm.value.length >= 3 && elm.value != '') {
        goodInput(elm);
        return true
    } else {
        badInput(elm);
        return false
    }
}
function verifyPasscode(elm) {
    if (elm.value == passcode.value) {
        goodInput(elm);
        return true
    } else {
        badInput(elm);
        return false
    }
}
function checkSelect(elm) {
    if (elm.value != 'none') {
        goodInput(elm);
        return true
    } else {
        badInput(elm);
        return false
    }
}

$("#cnfsignup").on('click',function() {
    let checked = true;
    inputLists.text.forEach(element => {
        checked = checkText(element) ? checked : false;
    });
    inputLists.mail.forEach(element => {
        checked = checkEmail(element) ? checked : false;
    });
    inputLists.pwd.forEach(element => {
        checked = checkPasscode(element) ? checked : false;
    });
    inputLists.pwdc.forEach(element => {
        checked = verifyPasscode(element) ? checked : false;
    });
    inputLists.select.forEach(element => {
        checked = checkSelect(element) ? checked : false;
    });
    if (checked) {
        alertada();
        $.ajax({
            type: "POST",
            url: "https://edifyfox.com/php/insertdata.php",
            data: {
                firstname: firstName.value,
                lastname: lastName.value,
                email: email.value,
                pass: passcode.value,
                ddn: `${dayB.value}/${monthB.value}/${yearB.value}`,
                sclevel: levelS.value,
                branche: filliere.value,
                sec: section.value,
                grp: groupe.value,
                sgrp: sgroupe.value
            },
            success: (data, statuts) => {
                if (data == "done") {
                    $('#nmusr')[0].value = email.value;
                    $('#pscod')[0].value = passcode.value;
                    $("#chkedbox").prop("checked", true);
                    $("#signupFORM")[0].reset();
                    $('#gotosignin').click();
                    $('.bcblak').click();
                } else {
                    $('.bcblak').click();
                }
            },
            dataType: 'text'
        });
    }
});





// EVENT LISENER

$('#signup').click(function () {
    document.getElementById("suppdiv").className = "signupdiv";
    $("#suppdiv").scrollTop(0);
});

$('#gotosignin').click(function () {
    document.getElementById("suppdiv").className = "signupdiv_";
    $("#suppdiv").scrollTop(0);
});

$("#frstnm").on('input',function () {
    checkText(this);
});

$("#scdnm").on('input',function () {
    checkText(this);
}); 

$("#mailchk").on('input',function () {
    checkEmail(this);
}); 

$("#pwd").on('input',function () {
    checkPasscode(this)
}); 

$("#pwdc").on('input',function () {
    verifyPasscode(this);
}); 

$("#jour").change(function () {
    checkSelect(this);
});

$("#mois").change(function () {
    checkSelect(this);
});

$("#annee").change(function () {
    checkSelect(this);
});

$("#mustawa").change(function() {
    checkSelect(this);
}); 

$("#branche").change(function() {
    checkSelect(this);
}); 

$("#sec").change(function() {
    checkSelect(this);
});  

$("#grp").change(function() {
    checkSelect(this);
});

$("#sgrp").change(function() {
    checkSelect(this);
});


