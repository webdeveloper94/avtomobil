import { useState } from 'react';
import './App.css';
import heroBg from './assets/hero-bg.png';
import AnimatedBackground from './components/AnimatedBackground';

function App() {
  const [showTopics, setShowTopics] = useState(false);

  const topics = [
    { id: 1, title: "Ma'ruzalar", icon: "📚", description: "50+ nazariy material", count: "52" },
    { id: 2, title: "Taqdimotlar", icon: "📊", description: "Interaktiv taqdimotlar", count: "38" },
    { id: 3, title: "Video darslar", icon: "🎥", description: "Amaliy ko'rsatmalar", count: "45" },
    { id: 4, title: "Glossary", icon: "📖", description: "Terminlar lug'ati", count: "200+" },
    { id: 5, title: "Testlar", icon: "✍️", description: "Bilim sinovi", count: "150" },
    { id: 6, title: "Nazorat savollari", icon: "✅", description: "Baholash uchun", count: "80" },
  ];

  const stats = [
    { value: "500+", label: "Ta'lim materiallari" },
    { value: "15", label: "Mavzular" },
    { value: "100%", label: "Bepul" },
  ];

  return (
    <div className="app">
      {/* Background */}
      <div className="app-background">
        <img src={heroBg} alt="Background" className="bg-image" />
        <div className="bg-overlay"></div>
        <div className="bg-gradient"></div>
      </div>

      {/* Decorative Elements */}
      <div className="decoration decoration-1"></div>
      <div className="decoration decoration-2"></div>
      <div className="decoration decoration-3"></div>

      {/* Animated Background Elements */}
      <AnimatedBackground />

      {/* Main Content */}
      <div className="main-content">
        {!showTopics ? (
          <div className="home-screen">
            <div className="home-left">
              <div className="brand-section">
                <div className="logo-icon">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="brand-badge">
                  <span className="badge-dot"></span>
                  Zamonaviy Ta'lim Tizimi
                </div>
                <h1 className="main-title">
                  Avtomobil Dvigatellariga<br />
                  <span className="text-gradient">Servis va Ta'mirlash</span>
                </h1>
                <p className="main-description">
                  Professional darajadagi nazariy va amaliy bilimlar. Video darslar,
                  testlar va interaktiv materiallar bilan to'liq ta'lim platformasi.
                </p>

                <button className="btn-topics" onClick={() => setShowTopics(true)}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="7" height="7"></rect>
                    <rect x="14" y="3" width="7" height="7"></rect>
                    <rect x="14" y="14" width="7" height="7"></rect>
                    <rect x="3" y="14" width="7" height="7"></rect>
                  </svg>
                  Mavzularni ko'rish
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>

                <div className="stats-container">
                  {stats.map((stat, index) => (
                    <div key={index} className="stat-item" style={{ animationDelay: `${index * 0.2}s` }}>
                      <div className="stat-value">{stat.value}</div>
                      <div className="stat-label">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="home-right">
              <div className="features-preview">
                <h3 className="preview-title">Platforma imkoniyatlari</h3>
                <div className="preview-list">
                  <div className="preview-item">
                    <div className="preview-icon">🎓</div>
                    <div className="preview-text">
                      <div className="preview-label">Nazariy materiallar</div>
                      <div className="preview-desc">Batafsil ma'ruzalar va qo'llanmalar</div>
                    </div>
                  </div>
                  <div className="preview-item">
                    <div className="preview-icon">🎬</div>
                    <div className="preview-text">
                      <div className="preview-label">Video ta'lim</div>
                      <div className="preview-desc">HD sifatli amaliy darslar</div>
                    </div>
                  </div>
                  <div className="preview-item">
                    <div className="preview-icon">📝</div>
                    <div className="preview-text">
                      <div className="preview-label">Interaktiv testlar</div>
                      <div className="preview-desc">Bilimingizni tekshiring</div>
                    </div>
                  </div>
                  <div className="preview-item">
                    <div className="preview-icon">📚</div>
                    <div className="preview-text">
                      <div className="preview-label">Texnik lug'at</div>
                      <div className="preview-desc">200+ atama va tushuncha</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="topics-screen">
            <div className="topics-header">
              <h2 className="topics-title">Ta'lim mavzulari</h2>
              <button className="btn-back" onClick={() => setShowTopics(false)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
                Bosh sahifa
              </button>
            </div>

            <div className="topics-grid">
              {topics.map((topic, index) => (
                <div
                  key={topic.id}
                  className="topic-card"
                  style={{ animationDelay: `${index * 0.08}s` }}
                >
                  <div className="topic-count">{topic.count}</div>
                  <div className="topic-icon">{topic.icon}</div>
                  <h3 className="topic-title">{topic.title}</h3>
                  <p className="topic-description">{topic.description}</p>
                  <div className="topic-arrow">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
