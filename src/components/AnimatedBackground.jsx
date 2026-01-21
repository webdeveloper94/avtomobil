import { useEffect, useRef } from 'react';
import './AnimatedBackground.css';

export default function AnimatedBackground() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Particles
        const particles = [];
        const particleCount = 50;

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 3 + 1;
                this.speedX = Math.random() * 0.5 - 0.25;
                this.speedY = Math.random() * 0.5 - 0.25;
                this.opacity = Math.random() * 0.5 + 0.2;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                // Wrap around screen
                if (this.x > canvas.width) this.x = 0;
                if (this.x < 0) this.x = canvas.width;
                if (this.y > canvas.height) this.y = 0;
                if (this.y < 0) this.y = canvas.height;
            }

            draw() {
                ctx.fillStyle = `rgba(0, 102, 255, ${this.opacity})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // Create particles
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        // Animation loop
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw connections
            particles.forEach((particle, index) => {
                particle.update();
                particle.draw();

                // Connect nearby particles
                particles.slice(index + 1).forEach(otherParticle => {
                    const dx = particle.x - otherParticle.x;
                    const dy = particle.y - otherParticle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 120) {
                        ctx.strokeStyle = `rgba(0, 212, 255, ${0.15 * (1 - distance / 120)})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(otherParticle.x, otherParticle.y);
                        ctx.stroke();
                    }
                });
            });

            requestAnimationFrame(animate);
        }

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
        };
    }, []);

    return (
        <>
            <canvas ref={canvasRef} className="particles-canvas" />

            {/* Animated Gears */}
            <div className="animated-gears">
                <svg className="gear gear-1" viewBox="0 0 100 100">
                    <path d="M50,10 L54,18 L62,18 L58,26 L62,34 L54,34 L50,42 L46,34 L38,34 L42,26 L38,18 L46,18 Z" fill="none" stroke="rgba(0, 102, 255, 0.2)" strokeWidth="2" />
                    <circle cx="50" cy="26" r="12" fill="none" stroke="rgba(0, 102, 255, 0.3)" strokeWidth="2" />
                </svg>

                <svg className="gear gear-2" viewBox="0 0 100 100">
                    <path d="M50,15 L53,21 L59,21 L56,27 L59,33 L53,33 L50,39 L47,33 L41,33 L44,27 L41,21 L47,21 Z" fill="none" stroke="rgba(0, 212, 255, 0.2)" strokeWidth="2" />
                    <circle cx="50" cy="27" r="10" fill="none" stroke="rgba(0, 212, 255, 0.3)" strokeWidth="2" />
                </svg>

                <svg className="gear gear-3" viewBox="0 0 100 100">
                    <path d="M50,12 L53.5,19 L60.5,19 L57,26 L60.5,33 L53.5,33 L50,40 L46.5,33 L39.5,33 L43,26 L39.5,19 L46.5,19 Z" fill="none" stroke="rgba(0, 102, 255, 0.25)" strokeWidth="2" />
                    <circle cx="50" cy="26" r="11" fill="none" stroke="rgba(0, 102, 255, 0.35)" strokeWidth="2" />
                </svg>
            </div>

            {/* Piston Animation */}
            <div className="piston-container">
                <div className="piston">
                    <div className="piston-rod"></div>
                    <div className="piston-head"></div>
                </div>
                <div className="cylinder"></div>
            </div>

            {/* Binary Rain */}
            <div className="binary-rain">
                {[...Array(10)].map((_, i) => (
                    <div key={i} className="binary-column" style={{ left: `${i * 10}%`, animationDelay: `${i * 0.5}s` }}>
                        {['0', '1', '0', '1', '1', '0'].map((num, j) => (
                            <span key={j} className="binary-digit" style={{ animationDelay: `${j * 0.2}s` }}>
                                {num}
                            </span>
                        ))}
                    </div>
                ))}
            </div>

            {/* Animated Lines */}
            <svg className="animated-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
                <polyline
                    className="line line-1"
                    points="0,20 30,20 40,40 60,10 80,30 100,30"
                    fill="none"
                    stroke="rgba(0, 102, 255, 0.3)"
                    strokeWidth="0.5"
                />
                <polyline
                    className="line line-2"
                    points="0,60 25,70 45,50 65,80 85,60 100,65"
                    fill="none"
                    stroke="rgba(0, 212, 255, 0.3)"
                    strokeWidth="0.5"
                />
            </svg>
        </>
    );
}
