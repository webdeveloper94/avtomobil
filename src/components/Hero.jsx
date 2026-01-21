import './Hero.css';
import heroBg from '../assets/hero-bg.png';

export default function Hero() {
    return (
        <section id="home" className="hero">
            <div className="hero-background">
                <img src={heroBg} alt="Automotive Engine" className="hero-bg-image" />
                <div className="hero-overlay"></div>
            </div>

            <div className="container">
                <div className="hero-content">
                    <div className="hero-badge animate-fade-in">
                        <span className="badge-icon">🎓</span>
                        <span>Zamonaviy Ta'lim Platformasi</span>
                    </div>

                    <h1 className="hero-title animate-fade-in-up">
                        Avtomobil Dvigatellariga<br />
                        <span className="text-gradient">Servis va Ta'mirlash</span>
                    </h1>

                    <p className="hero-description animate-fade-in-up">
                        Avtomobil dvigatellari bo'yicha to'liq ta'lim resurslari: ma'ruzalar,
                        video darslar, amaliy mashg'ulotlar va test sinovlari. Zamonaviy
                        bilimlarni o'rganing va o'z mahoratingizni oshiring.
                    </p>

                    <div className="hero-buttons animate-fade-in-up">
                        <a href="#lectures" className="btn btn-primary">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                            O'rganishni boshlash
                        </a>
                        <a href="#videos" className="btn btn-secondary">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polygon points="5 3 19 12 5 21 5 3"></polygon>
                            </svg>
                            Video darslar
                        </a>
                    </div>

                    <div className="hero-stats">
                        <div className="stat-item">
                            <div className="stat-number">50+</div>
                            <div className="stat-label">Ma'ruzalar</div>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <div className="stat-number">30+</div>
                            <div className="stat-label">Video darslar</div>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <div className="stat-number">100+</div>
                            <div className="stat-label">Test savollari</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="hero-scroll-indicator">
                <div className="scroll-mouse">
                    <div className="scroll-wheel"></div>
                </div>
                <span>Scroll</span>
            </div>
        </section>
    );
}
