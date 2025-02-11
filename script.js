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
    mulaiKembangApi();
}

let fireworks = [];

function Firework(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 3;
    this.alpha = 1;
    this.exploded = false;
    this.particles = [];
    this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
    this.explosionHeight = Math.random() * (canvas.height * 0.5) + canvas.height * 0.3;

    this.update = function() {
        if (!this.exploded) {
            this.y -= 3;
            if (this.y < this.explosionHeight) {
                this.exploded = true;
                for (let i = 0; i < 40; i++) {
                    this.particles.push(new Particle(this.x, this.y));
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
        ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.globalAlpha = 1;
    };
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

function mulaiKembangApi() {
    fireworks.push(new Firework(Math.random() * canvas.width, canvas.height));
    fireworks.push(new Firework(Math.random() * canvas.width, canvas.height));
}

render();
