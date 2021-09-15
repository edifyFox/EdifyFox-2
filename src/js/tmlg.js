
var timeLineData = new FormData();

function moveToPosition(n) {
    var blockElements = [$('#Tmlg1')[0],$('#Tmlg2')[0],$('#Tmlg3')[0],$('#Tmlg4')[0],$('#Tmlg5')[0],$('#Tmlg6')[0],$('#Tmlg7')[0]];
    var bubbleElemts = [$('#bTmlg1')[0],$('#bTmlg2')[0],$('#bTmlg3')[0],$('#bTmlg4')[0],$('#bTmlg5')[0],$('#bTmlg6')[0],$('#bTmlg7')[0]];
    for (var i = 0; i < n; i++) {
        blockElements[i].className = "wrapDataTmlg tlmgPosistionL";
        bubbleElemts[i].className = "bubble checked";
    }
    blockElements[n-1].className = "wrapDataTmlg tlmgPosistionC";
    bubbleElemts[n-1].className = "bubble onBubble";
    var widthCalc = Math.round(((n-1) * (110 / bubbleElemts.length)));
    $('#prgsTmg').css('width', widthCalc+'%');
}

function startTimline(id) {
    timeLineData.append("idUsr",id);
    moveToPosition(2);
}


function chooseAccType(type) {
    timeLineData.append("accType",type.toLowerCase());
    moveToPosition(3);
}

function chooseSchool(id) {
    timeLineData.append("schoolId",id);
    if (timeLineData.get("accType") == 'laureate') {
        $('[data=schlBranch'+timeLineData.get("schoolId")+']').children().each(function(idx, val){
            if(this.attributes["year-data"].value.search(5) != -1) { 
                $(this).css('display','block');
            }
        });
        $('[data=schlBranch'+timeLineData.get("schoolId")+']').css('display','grid');
        moveToPosition(5); 
    }
    if (timeLineData.get("accType") == 'student') {
        $('[data=schlYear'+id+']').css('display','grid');
        moveToPosition(4);
    }
}

function chooseYear(year) {
    var counter = [];
    timeLineData.append("year",year);
    $('[data=schlBranch'+timeLineData.get("schoolId")+']').children().each(function(idx, val){
        if(this.attributes["year-data"].value.search(year) != -1) { 
            $(this).css('display','block');
            counter.push(this.attributes["branchId"].value);
        }
    });
    if (counter.length == 1) {
        timeLineData.append("branchId",counter[0]);
        moveToPosition(6);
    } else {
        $('[data=schlBranch'+timeLineData.get("schoolId")+']').css('display','grid');
        moveToPosition(5);
    }
}

function chooseBranch(id) {
    timeLineData.append("branchId",id);
    if (timeLineData.get("accType") == 'laureate') moveToPosition(7); 
    if (timeLineData.get("accType") == 'student') moveToPosition(6);
}



function checkSelectEdits(elm) {
    if (elm.value != 'none') {
        $(elm).css('box-shadow', 'unset');
        return true
    } else {
        $(elm).css('box-shadow', '0px 0px 51px #f4433691 inset');
        return false
    }
}
function submitEditron() {
    var checked = true;
    var inputListsEdit = [$("#editSec")[0],$("#editGrp")[0],$("#editSgrp")[0]];
    inputListsEdit.forEach(element => {
        checked = checkSelectEdits(element) ? checked : false;
    });
    if (checked) {
        timeLineData.append("section",inputListsEdit[0].value);
        timeLineData.append("grp",inputListsEdit[1].value);
        timeLineData.append("sgrp",inputListsEdit[2].value);
        moveToPosition(7);
    }
}

function boxChekker() {
    let checked = document.getElementById('chkedboxTmlg').checked;
    if (checked) {
        $('#finishButt').css('opacity','1');
        $('#finishButt').css('pointer-events','fill');
    } else {
        $('#finishButt').css('opacity','0.5');
        $('#finishButt').css('pointer-events','none');
    }
}

