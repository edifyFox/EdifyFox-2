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