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
                <div className="logo-wrapper">
                  <div className="logo-ring logo-ring-1"></div>
                  <div className="logo-ring logo-ring-2"></div>
                  <div className="logo-icon">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
                <div className="brand-badge">
                  <span className="badge-dot"></span>
                  Zamonaviy Ta'lim Tizimi
                </div>
                <h1 className="main-title">
                  Avtomobil Dvigatellariga servis xizmat ko'rsatish<br />
                  <span className="text-gradient">Va ta'mirlash ishlari o'quv amaliyoti</span>
                </h1>
                <p className="main-description">
                  Professional darajadagi nazariy va amaliy bilimlar. Video darslar,
                  testlar va interaktiv materiallar bilan to'liq raqamli ta'lim resursi.
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
                  {/* {stats.map((stat, index) => (
                    <div key={index} className="stat-item" style={{ animationDelay: `${index * 0.2}s` }}>
                      <div className="stat-value">{stat.value}</div>
                      <div className="stat-label">{stat.label}</div>
                    </div>
                  ))} */}
                </div>
              </div>
            </div>

            <div className="home-right">
              <div className="features-preview">
                <div className="preview-header">
                  <h3 className="preview-title">Platforma imkoniyatlari</h3>
                  {/* <div className="preview-badge">
                    <span className="badge-pulse"></span>
                    <span>6 ta modul</span>
                  </div> */}
                </div>
                <div className="preview-list">
                  <div className="preview-item">
                    <div className="preview-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                      </svg>
                    </div>
                    <div className="preview-text">
                      <div className="preview-label">Nazariy materiallar</div>
                      <div className="preview-desc">20 batafsil ma'ruzalar</div>
                    </div>
                    <div className="preview-count">20</div>
                  </div>
                  <div className="preview-item">
                    <div className="preview-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="23 7 16 12 23 17 23 7"></polygon>
                        <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                      </svg>
                    </div>
                    <div className="preview-text">
                      <div className="preview-label">Video ta'lim</div>
                      <div className="preview-desc">HD sifatli amaliy darslar</div>
                    </div>
                    <div className="preview-count">20</div>
                  </div>
                  <div className="preview-item">
                    <div className="preview-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                      </svg>
                    </div>
                    <div className="preview-text">
                      <div className="preview-label">Interaktiv testlar</div>
                      <div className="preview-desc">400 test savollari</div>
                    </div>
                    <div className="preview-count">400</div>
                  </div>
                  <div className="preview-item">
                    <div className="preview-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                        <line x1="12" y1="17" x2="12.01" y2="17"></line>
                      </svg>
                    </div>
                    <div className="preview-text">
                      <div className="preview-label">Glossary</div>
                      <div className="preview-desc">200+ terminlar</div>
                    </div>
                    <div className="preview-count">200+</div>
                  </div>
                </div>
                <div className="preview-footer">
                  <div className="progress-indicator">
                    <div className="progress-bar" style={{ width: '100%' }}></div>
                  </div>
                  <div className="progress-text">100% kontent tayyor</div>
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
