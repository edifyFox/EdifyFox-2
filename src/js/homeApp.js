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
    // document.getElementById('hms3').className = 'dvl3iba';
    document.getElementById('hms4').className = 'dvl3iba';
});


$('#hmes2').click(function() {
    animdtb();
    $('#amm1').css('transform','translateY(100vw)');
    $('#amm2').css('transform','translateY(0)');
    $('#amm3').css('transform','translateY(100vw)');
    $('#amm4').css('transform','translateY(100vw)');
    $('.txndor').css('opacity', '1');
    document.getElementById('hms1').className = 'dvl3iba';
    document.getElementById('hms2').className = 'dvl3iba opa1';
    // document.getElementById('hms3').className = 'dvl3iba';
    document.getElementById('hms4').className = 'dvl3iba';
});

// $('#hmes3').click(function() {
//     animdtb();
//     $('#amm1').css('transform','translateY(100vw)');
//     $('#amm2').css('transform','translateY(100vw)');
//     $('#amm3').css('transform','translateY(0)');
//     $('#amm4').css('transform','translateY(100vw)');
//     $('.txndor').css('opacity','0');
//     document.getElementById('hms1').className = 'dvl3iba';
//     document.getElementById('hms2').className = 'dvl3iba';
//     document.getElementById('hms3').className = 'dvl3iba opa1';
//     document.getElementById('hms4').className = 'dvl3iba';
// });

$('#hmes4').click(function() {
    animdtb();
    $('#amm1').css('transform','translateY(0)');
    $('#amm2').css('transform','translateY(100vw)');
    $('#amm3').css('transform','translateY(100vw)');
    $('#amm4').css('transform','translateY(100vw)');
    $('.txndor').css('opacity', '0');
    document.getElementById('hms1').className = 'dvl3iba';
    document.getElementById('hms2').className = 'dvl3iba';
    // document.getElementById('hms3').className = 'dvl3iba';
    document.getElementById('hms4').className = 'dvl3iba opa1';
});