let canvas = document.getElementById('star_canvas');
let ctx = canvas.getContext('2d');

let stars = new Array();

let starsSeed = 2764923;
function rand(seed) {
      var t = seed += 0x6D2B79F5;
      t = Math.imul(t ^ t >>> 15, t | 1);
      t ^= t + Math.imul(t ^ t >>> 7, t | 61);
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
}

window.addEventListener('resize', resizeCanvas, false);
        
function resizeCanvas() {
    canvas.width = window.innerWidth;

    draw();
}
resizeCanvas();

function draw() {

    updateStars();

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for(let i = 0; i < stars.length; i++) {
        drawStar(stars[i].x, stars[i].y, stars[i].radius);
    }

    //window.requestAnimationFrame(draw);

}

function updateStars() {

    for(let i = 0; i < stars.length; i++) {

        let star = stars[i];

        if(star.x < 0) {
            star.x = Math.floor(Math.random() * (canvas.width - 100)) + 100;
        }
        if(star.y < 0) {
            star.y = Math.floor(Math.random() * (canvas.height - 200) + 200);
        }
        star.x -= 0.1;
        star.y -= 0.2;

    }

}

function drawStar(x, y, radius) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.shadowBlur = radius * 2;
    ctx.shadowColor = "#fff";
}

class Star {

    constructor(size) {
        this.x = Math.floor(rand(starsSeed) * canvas.width);
        starsSeed++;
        this.y = Math.floor(rand(starsSeed) * canvas.height);
        starsSeed++;
        this.radius = size;
    }

}

for(let i = 0; i < 50; i++) {
    stars.push(new Star(0.5));
}
for(let i = 0; i < 100; i++) {
    stars.push(new Star(1));
}
for(let i = 0; i < 30; i++) {
    stars.push(new Star(1.5));
}
for(let i = 0; i < 10; i++) {
    stars.push(new Star(2));
}
for(let i = 0; i < 10; i++) {
    stars.push(new Star(2.5));
}

draw();

//setInterval(draw, 34);