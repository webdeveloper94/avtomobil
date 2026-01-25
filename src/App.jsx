import { useState } from 'react';
import './App.css';
import heroBg from './assets/hero-bg.png';
import AnimatedBackground from './components/AnimatedBackground';

function App() {
  const [showTopics, setShowTopics] = useState(false);
  const [showAuthorModal, setShowAuthorModal] = useState(false);

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

      {/* Author Button */}
      <button
        className="author-btn"
        onClick={() => setShowAuthorModal(true)}
        aria-label="Muallif haqida"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      </button>

      {/* Author Modal */}
      {showAuthorModal && (
        <div className="modal-overlay" onClick={() => setShowAuthorModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowAuthorModal(false)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <div className="modal-header">
              <div className="author-avatar">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <h2 className="modal-title">Muallif haqida</h2>
            </div>

            <div className="author-info">
              <div className="info-item">
                <div className="info-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <div className="info-content">
                  <div className="info-label">Ism-Familiya</div>
                  <div className="info-value">To'lqin Tohirov</div>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <div className="info-content">
                  <div className="info-label">Manzil</div>
                  <div className="info-value">Buxoro viloyati, Buxoro shahri</div>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <div className="info-content">
                  <div className="info-label">Telefon raqami</div>
                  <div className="info-value">+998 99 562 21 14</div>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                  </svg>
                </div>
                <div className="info-content">
                  <div className="info-label">Ish joyi</div>
                  <div className="info-value">Web Dasturchi, Freelancer</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
