const canvas = document.getElementById("fireworksCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function showBirthdayMessage() {
    document.getElementById("intro").style.display = "none";
    document.getElementById("birthdayMessage").style.display = "block";
}

function showCard() {
    document.getElementById("card").style.display = "block";
}

function startSurprise() {
    document.getElementById("birthdayMessage").style.display = "none";
    document.getElementById("fireworksCanvas").style.display = "block";
    startFireworks();
}

let fireworks = [];

function Firework(x, y, type) {
    this.x = x;
    this.y = y;
    this.radius = 3;
    this.exploded = false;
    this.particles = [];
    this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
    this.explosionHeight = Math.random() * (canvas.height * 0.5) + canvas.height * 0.3;
    this.type = type;

    this.update = function() {
        if (!this.exploded) {
            this.y -= 3;
            if (this.y < this.explosionHeight) {
                this.exploded = true;
                for (let i = 0; i < 30; i++) {
                    this.particles.push(new Particle(this.x, this.y));
                }
                if (this.type === "text") {
                    showText(this.x, this.y);
                } else if (this.type === "flower") {
                    showFlower(this.x, this.y);
                }
            }
        }
        this.draw();
    };

    this.draw = function() {
        if (!this.exploded) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        } else {
            this.particles.forEach(p => p.update());
        }
    };
}

function Particle(x, y) {
    this.x = x;
    this.y = y;
    this.speed = Math.random() * 3 + 1;
    this.angle = Math.random() * Math.PI * 2;
    this.vx = Math.cos(this.angle) * this.speed;
    this.vy = Math.sin(this.angle) * this.speed;
    this.alpha = 1;
    this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;

    this.update = function() {
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= 0.02;
        this.draw();
    };

    this.draw = function() {
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.globalAlpha = 1;
    };
}

function showText(x, y) {
    ctx.font = "40px Arial";
    ctx.fillStyle = `hsl(${Math.random() * 360}, 100%, 50%)`;
    ctx.textAlign = "center";
    ctx.fillText("Happy Birthday Gee <3", x, y);
}

function showFlower(x, y) {
    for (let i = 0; i < 10; i++) {  // 10 kelopak bunga
        let angle = i * (Math.PI / 5);
        let petalX = x + Math.cos(angle) * 50;
        let petalY = y + Math.sin(angle) * 50;

        ctx.beginPath();
        ctx.arc(petalX, petalY, 15, 0, Math.PI * 2);
        ctx.fillStyle = `hsl(${Math.random() * 360}, 100%, 75%)`;
        ctx.fill();
    }
    
    ctx.beginPath();
    ctx.arc(x, y, 15, 0, Math.PI * 2);
    ctx.fillStyle = "yellow";
    ctx.fill();
}

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    fireworks.forEach((fw, index) => {
        fw.update();
        if (fw.exploded && fw.particles.every(p => p.alpha <= 0)) {
            fireworks.splice(index, 1);
        }
    });

    requestAnimationFrame(render);
}

function startFireworks() {
    fireworks.push(new Firework(Math.random() * canvas.width, canvas.height, "text"));
    fireworks.push(new Firework(Math.random() * canvas.width, canvas.height, "flower"));
}

render();
