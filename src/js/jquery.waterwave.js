const jQuery = require('jquery');

(function( $ ) {
    $.fn.waterwave = function( options ) {
        // DEFAULT OPTIONS
        var settings = $.extend({
            parent : 'body',
            color : '#171717',
            direction: 'up'
        }, options );

        var waterwave = this;

        waterwave.init = function() {
            var TAU = Math.PI * 1.5;
            var density = 4;
            var speed = 0.2;
            var res = 0.005; // percentage of screen per x segment
            var outerScale = 0.08 / density;
            var inc = 0;
            var c = waterwave[0];
            var ctx = c.getContext('2d');
            var grad = ctx.createLinearGradient(0, 0, 0, c.height * 4);
            function onResize() {
                waterwave.attr({
                        width: $(parent).width()*2 + "px",
                        height: $(parent).height()*1.5 + "px"
                });
            }

            onResize();
            setTimeout(function() {
                loop();
            }, 500);
            $(window).resize(onResize);

            function loop() {
                inc -= speed;
                drawWave(options.color);
                requestAnimationFrame(loop);
            }


            function drawBG(patternCanvas, w, h) {
                var space = ctx.createPattern(patternCanvas, 'repeat');
                ctx.fillStyle = space;
                ctx.fillRect(0, 0, w, h);
            }

            function drawWave(color) {
                var w = c.offsetWidth;
                var h = c.offsetHeight;
                var cx = w * 0.5;
                var cy = h * 0.5;
                ctx.clearRect(0, 0, w, h);
                var segmentWidth = w * res;
                ctx.fillStyle = color;
                ctx.beginPath();
                ctx.moveTo(0, cy);
                for (var i = 0, endi = 1 / res; i <= endi; i++) {
                    var _y = cy + Math.sin((i + inc) * TAU * res * density) * cy * Math.sin(i * TAU * res * density * outerScale);
                    var _x = i * segmentWidth;
                    ctx.lineTo(_x, _y);
                }
                ctx.lineTo(w, h);
                ctx.lineTo(0, h);
                ctx.closePath();
                ctx.fill();
            }
        };


        waterwave.init();

        return waterwave;


    };
}( jQuery ));