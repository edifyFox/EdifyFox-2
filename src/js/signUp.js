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