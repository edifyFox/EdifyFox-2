const { parseHTML } = require("jquery");

var Curves = (function () {
    'use strict';
    var raf_ID = 0;

    var config = {
        bgColor: '#21292f',
        pointColor: 'rgba(255, 255, 255, 0.16)',
        curvesColors: [
            '#293947', '#2e4e6a', '#37658d', '#3d7aae', '#4599ce', '#59aad3'
        ]
    };

    function Shape (points, color) {
        this.points = points;
        this.color = color;
    }

    Shape.prototype.render = function (ctx, width, height) {
        var self = this;
        ctx.save();
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#fff';
        ctx.fillStyle = config.pointColor;

        this.points.forEach(function (point) {
            ctx.beginPath();
            ctx.arc(point.x, point.y, 2, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        });

        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(this.points[0].x, this.points[0].y);

        this.points.forEach(function (point, i) {
            point.y = point.oldY + Math.sin(point.angle) * 35;
            point.angle += point.speed;

            var nextPoint = self.points[i + 1];
            if (nextPoint) {
                var ctrlPoint = {
                    x: (point.x + nextPoint.x) / 2,
                    y: (point.y + nextPoint.y) / 2
                };
                ctx.quadraticCurveTo(point.x, point.y, ctrlPoint.x, ctrlPoint.y);
            }
        });

        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.fill();

        ctx.restore();
    };

    var canvas = document.getElementById('defaultCurves');
    var ctx = canvas.getContext('2d');

    var width = window.innerWidth;
    var height = window.innerHeight;

    var density = 15;
    if (width < 601) {
        density = 10;
    }

    var colors = config.curvesColors;
    var shapes = generateShapes(6, height / 2, width / density);

    function generateShapes (num, yCenter, spacing) {
        var shapes = [];
        for (var i = 0; i < num; i += 1) {
            var points = [];
            var offset = 0;
            for (var x = 0; x <= width + width / 4; x += spacing) {
                var angle = Math.random() * 360;
                if (i === 0) offset = 20 + Math.random() * 40 - 50;
                if (i === 1) offset = 80 + Math.random() * 60 - 50;
                if (i === 2) offset = 110 + Math.random() * 80 - 50;
                if (i === 3) offset = 150 + Math.random() * 100 - 50;
                if (i === 4) offset = 200 + Math.random() * 130 - 50;
                if (i === 5) offset = 250 + Math.random() * 170 - 50;
                offset -= x / 20;
                var point = {
                    x: x,
                    y: yCenter + offset + 10 + Math.random() * 20,
                    oldY: yCenter + offset,
                    angle: angle,
                    speed: 0.005
                };
                points.push(point);
            }
            var shape = new Shape(points, colors[i]);
            shapes.push(shape);
        }
        return shapes;
    }

    function init (parent) {
        canvas.width = width;
        canvas.height = height;
        parent.appendChild(canvas);
        ctx.fillStyle = config.bgColor;
        startRender();
        window.onresize = function () {
            if (width !== (window.innerWidth)) {
                resize();
            }
        };
    }
    function render () {
        raf_ID = window.requestAnimationFrame(render);
        ctx.fillRect(0, 0, width, height);
        shapes.forEach(function (shape) {
            shape.render(ctx, width, height);
        });
    }
    function startRender () {
        render();
    }

    function stopRender () {
        window.cancelAnimationFrame(raf_ID);
    }

    function resize () {
        stopRender();
        canvas.width = width = (window.innerWidth);
        canvas.height = height = window.innerHeight;
        ctx.fillStyle = config.bgColor;

        if (width < 601) {
            density = 10;
        }

        shapes = generateShapes(6, height / 2, width / density);
        startRender();
    }

    return {
        init: init,
        startRender: startRender,
        stopRender: stopRender
    };

})();

Curves.init(document.getElementById('curves'));


// SIGN UP FORM CHECK


var firstName = $("#frstnm")[0];
var lastName = $("#scdnm")[0];
var email = $("#mailchk")[0];
var passcode = $("#pwd")[0];
var passcodec = $("#pwdc")[0];
var dayB = $("#jour")[0];
var monthB = $("#mois")[0];
var yearB = $("#annee")[0];
var gender = $("#gender")[0];

var inputLists = {
    text : [firstName,lastName],
    mail : [email],
    pwd : [passcode],
    pwdc : [passcodec],
    select : [dayB,monthB,yearB,gender]
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
            url: "http://localhost/PROJECTFILEPHP/php/loginsAndSignUps/signUpAcc.php",
            data: {
                firstname: firstName.value,
                lastname: lastName.value,
                email: email.value,
                pass: passcode.value,
                ddn: `${dayB.value}/${monthB.value}/${yearB.value}`,
                gender: gender.value
            },
            success: (data, statuts) => {
                console.log(data);
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

$("#gender").change(function() {
    checkSelect(this);
}); 


