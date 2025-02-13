class Firework {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        // 不同类型烟花的配置
        this.types = {
            normal: {
                particles: 80,
                colors: ['255,255,0', '255,0,0', '255,102,0', '255,153,0', '255,102,0', '255,205,60'],
                size: 3,
                velocity: 3
            },
            sparkle: {
                particles: 100,
                colors: ['255,255,255', '255,250,200', '255,215,0', '255,240,220'],
                size: 2,
                velocity: 4
            },
            rainbow: {
                particles: 120,
                colors: ['255,0,0', '255,165,0', '255,255,0', '0,255,0', '0,127,255', '139,0,255'],
                size: 2.5,
                velocity: 3.5
            }
        };
        
        this.resize();
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles(x, y, type = 'normal') {
        const config = this.types[type];
        for (let i = 0; i < config.particles; i++) {
            const angle = (Math.PI * 2 / config.particles) * i;
            const velocity = config.velocity + Math.random() * 2;
            const color = config.colors[Math.floor(Math.random() * config.colors.length)];
            
            this.particles.push({
                x,
                y,
                vx: Math.cos(angle) * velocity,
                vy: Math.sin(angle) * velocity,
                color,
                alpha: 1,
                life: 150,
                size: config.size
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach((particle, index) => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.vy += 0.03;
            particle.alpha -= 0.01;
            particle.life--;

            if (particle.life <= 0) {
                this.particles.splice(index, 1);
            }

            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(${particle.color}, ${particle.alpha})`;
            this.ctx.fill();
        });

        if (Math.random() < 0.09) {
            const x = Math.random() * this.canvas.width;
            // 随机决定烟花出现的位置
            let y;
            if (Math.random() < 0.4) { // 40% 的概率在上半部分
                y = Math.random() * (this.canvas.height * 0.5); // 上半部分
            } else { // 60% 的概率在下半部分
                y = this.canvas.height - Math.random() * (this.canvas.height * 0.4); // 下半部分
            }
            // 随机选择烟花类型
            const types = Object.keys(this.types);
            const randomType = types[Math.floor(Math.random() * types.length)];
            this.createParticles(x, y, randomType);
        }

        requestAnimationFrame(() => this.animate());
    }

    start() {
        this.animate();
    }
}

// 初始化烟花效果
window.addEventListener('load', () => {
    const canvas = document.getElementById('fireworks');
    const firework = new Firework(canvas);
    firework.start();

    // 点击时触发烟花
    document.addEventListener('click', (e) => {
        const types = Object.keys(firework.types);
        const randomType = types[Math.floor(Math.random() * types.length)];
        firework.createParticles(e.clientX, e.clientY, randomType);
    });
}); 