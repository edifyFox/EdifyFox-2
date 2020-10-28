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