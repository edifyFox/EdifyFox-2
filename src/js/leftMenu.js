$('#hme').click(function() {
    setWishPerTime();
    $('.mainone').css('backdrop-filter','unset');
    $('.maintwo').css('backdrop-filter','unset');
    document.getElementById('anm2').className = 'firscard_';
    document.getElementById('crskhdmi').className = 'courses_';
    document.getElementById('anm3').className = 'tools_';
    document.getElementById('ntfbar').className = 'notif_';
    document.getElementById('lyoutkhdmi').className = 'elyout_';
    document.getElementById('lyoutkhdmi').innerHTML = '';
    document.getElementById('hme').className = 'sdvan oncsd';
    document.getElementById('prf').className = 'sdvan';
    document.getElementById('crs').className = 'sdvan';
    document.getElementById('tls').className = 'sdvan';
});

$('#tls').click(function() {
    $('.mainone').css('backdrop-filter','unset');
    $('.maintwo').css('backdrop-filter','unset');
    document.getElementById('anm2').className = 'firscard_';
    document.getElementById('crskhdmi').className = 'courses_';
    document.getElementById('ntfbar').className = 'notif_';
    document.getElementById('lyoutkhdmi').className = 'elyout_';
    document.getElementById('lyoutkhdmi').innerHTML = '';
    document.getElementById('anm3').className = 'tools';
    document.getElementById('hme').className = 'sdvan';
    document.getElementById('prf').className = 'sdvan';
    document.getElementById('crs').className = 'sdvan';
    document.getElementById('tls').className = 'sdvan oncsd';
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
        $('.maintwo').css('backdrop-filter','blur(2px)');
    }, 500);
});
$("#crs").click(function() {
    $('.mainone').css('backdrop-filter','unset');
    $('.maintwo').css('backdrop-filter','unset');
    document.getElementById('ntfbar').className = 'notif_';
    if (document.getElementById('prf').className != 'sdvan oncsd') {
        document.getElementById('anm2').className = 'firscard_';
        document.getElementById('lyoutkhdmi').className = 'elyout_';
        document.getElementById('lyoutkhdmi').innerHTML = '';
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