window.onload = function () {

    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var color = "#ffffff";
    var numberOfDots = 100;
    var conDistance = 180;

    function Dot(x, y, dx, dy, r) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.r = r;

    }

    var dots = [];

    var parent = canvas.parentElement;
    console.log(parent);
    canvas.width = parent.offsetWidth;
    canvas.height = parent.offsetHeight;
    var WIDTH = canvas.width;
    var HEIGHT = canvas.height;
    if (WIDTH <= 414) {
        numberOfDots = 25;
        conDistance = 120;
    }
    window.addEventListener('resize', function (event) {
        var parent = canvas.parentElement;
        console.log(parent);
        canvas.width = parent.offsetWidth;
        canvas.height = parent.offsetHeight;
        WIDTH = canvas.width;
        HEIGHT = canvas.height;

    });

    function init() {
        var r = 2;
        for (var i = 0; i < numberOfDots; i++) {

            var x = Math.floor(Math.random() * (WIDTH - 20)) + 10;
            var y = Math.floor(Math.random() * (HEIGHT - 20)) + 10;
            var dx = (Math.random()) * 2 - 1;
            var dy = (Math.random()) * 2 - 1;

            var dot = new Dot(x, y, dx, dy, r);
            dots.push(dot);

            r++;
            if (r > 5)
                r = 2;
        }
        console.log(dots);
        start();
        requestAnimationFrame(start);

    }

    function start() {
        draw();
        requestAnimationFrame(start);
    }

    function draw() {
        clear();

        for (var i = 0; i < dots.length; i++) {
            if (dots[i].x > WIDTH) {
                console.log(dots[i].x + " " + WIDTH);
                dots[i].x = WIDTH - 30;
            }
            if (dots[i].y > HEIGHT) {
                dots[i].y = HEIGHT - 30;
                console.log(dots[i].y + " " + HEIGHT);

            }
            for (var c = 0; c < dots.length; c++) {
                if (i + 1 < dots.length && c != i) {
                    line(dots[i], dots[c])
                }
            }
            circle(dots[i]);


            if (dots[i].x + dots[i].dx > WIDTH || dots[i].x + dots[i].dx < 0) {
                dots[i].dx = -dots[i].dx;
            }
            if (dots[i].y + dots[i].dy > HEIGHT || dots[i].y + dots[i].dy < 0) {
                dots[i].dy = -dots[i].dy;
            }

            dots[i].x += dots[i].dx;
            dots[i].y += dots[i].dy;
        }
    }

    function circle(dot) {
        ctx.beginPath();
        var color = (dot.x * 360) / WIDTH;
        ctx.fillStyle = 'hsl(' + color + ',100%,50%)';
        ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
    }

    function line(dot1, dot2) {
        var a = dot1.x - dot2.x;
        var b = dot1.y - dot2.y;
        var c = Math.sqrt(a * a + b * b);
        if (c < conDistance) {
            ctx.beginPath();
            ctx.moveTo(dot1.x, dot1.y);
            ctx.lineTo(dot2.x, dot2.y);
            ctx.strokeStyle = 'rgba(255, 255, 255,' + (conDistance - c) / conDistance + ')';
            ctx.stroke();
        }
    }

    function clear() {
        ctx.clearRect(0, 0, WIDTH, HEIGHT);

    }
    init();
}