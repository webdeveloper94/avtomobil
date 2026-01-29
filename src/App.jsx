import { useState, useEffect, useRef } from 'react';
import './App.css';
import './components/TopicDetail.css';
import heroBg from './assets/hero-bg.png';
import AnimatedBackground from './components/AnimatedBackground';
import { renderAsync } from 'docx-preview';
import { Document, Page, pdfjs } from 'react-pdf';

// PDF.js worker konfiguratsiyasi - jsDelivr CDN
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

function App() {
  const [showTopics, setShowTopics] = useState(false);
  const [showAuthorModal, setShowAuthorModal] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [showPdfViewer, setShowPdfViewer] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [pageAspectRatio, setPageAspectRatio] = useState(1.778); // Default 16:9
  const pdfContentRef = useRef(null);
  const [pdfContainerDimensions, setPdfContainerDimensions] = useState({ width: 800, height: 600 });
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showTestPlayer, setShowTestPlayer] = useState(false);
  const [testData, setTestData] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [testCompleted, setTestCompleted] = useState(false);
  const [testScore, setTestScore] = useState(null);
  const [showControlQuestions, setShowControlQuestions] = useState(false);
  const [controlQuestionsData, setControlQuestionsData] = useState(null);
  const [revealedAnswers, setRevealedAnswers] = useState({});
  const [showGlossary, setShowGlossary] = useState(false);
  const [glossaryData, setGlossaryData] = useState(null);
  const [glossarySearch, setGlossarySearch] = useState('');
  const [showTechMap, setShowTechMap] = useState(false);
  const [techMapFile, setTechMapFile] = useState(null);
  const [docxType, setDocxType] = useState(''); // 'lecture' or 'techmap'
  const docxContainerRef = useRef(null);

  const materials = [
    { id: 1, title: "Ma'ruza matni", icon: "📄", description: "Nazariy materiallar", color: "rgba(0, 102, 255, 0.15)" },
    { id: 2, title: "Video darslar", icon: "🎥", description: "Amaliy ko'rsatmalar", color: "rgba(255, 0, 102, 0.15)" },
    { id: 3, title: "Taqdimotlar", icon: "📊", description: "Vizual materiallar", color: "rgba(0, 212, 255, 0.15)" },
    { id: 4, title: "Testlar", icon: "✍️", description: "Bilim sinovi", color: "rgba(102, 255, 0, 0.15)" },
    { id: 5, title: "Nazorat savollari", icon: "✅", description: "Baholash uchun", color: "rgba(255, 165, 0, 0.15)" },
    { id: 6, title: "Glossary", icon: "📖", description: "Atamalar lug'ati", color: "rgba(138, 43, 226, 0.15)" },
    { id: 7, title: "Texnologik xaritalar", icon: "🗺️", description: "Amaliy qo'llanma", color: "rgba(255, 99, 71, 0.15)" },
  ];

  const handleMaterialClick = async (material) => {
    if (material.id === 1 && selectedTopic) {
      // Ma'ruza matni uchun DOCX ochish
      const docxPath = `/lectures/${selectedTopic.id}-mavzu.docx`;
      setTechMapFile(docxPath);
      setDocxType('lecture');
      setShowTechMap(true);
    } else if (material.id === 2 && selectedTopic) {
      // Video darslar uchun video player ochish
      const videoPath = `/videos/${selectedTopic.id}-dars.mp4`;
      setSelectedVideo(videoPath);
      setShowVideoPlayer(true);
    } else if (material.id === 3 && selectedTopic) {
      // Taqdimotlar uchun PDF ochish
      const pdfPath = `/presentations/${selectedTopic.id}-mavzu-taqdimot.pdf`;
      setSelectedPdf(pdfPath);
      setShowPdfViewer(true);
    } else if (material.id === 4 && selectedTopic) {
      // Testlar uchun test player ochish
      try {
        const response = await fetch(`/tests/${selectedTopic.id}-mavzu-test.json`);
        const data = await response.json();
        setTestData(data);
        setCurrentQuestion(0);
        setSelectedAnswers({});
        setTimeRemaining(data.test_info.vaqt_limit * 60); // minutlarni sekundlarga
        setTestCompleted(false);
        setTestScore(null);
        setShowTestPlayer(true);
      } catch (error) {
        console.error('Test yuklashda xatolik:', error);
        alert('Test yuklanmadi. Iltimos, qaytadan urinib ko\'ring.');
      }
    } else if (material.id === 5 && selectedTopic) {
      // Nazorat savollari uchun modal ochish
      try {
        const response = await fetch(`/control-questions/${selectedTopic.id}-mavzu-nazorat.json`);
        const data = await response.json();
        setControlQuestionsData(data);
        setRevealedAnswers({});
        setShowControlQuestions(true);
      } catch (error) {
        console.error('Nazorat savollari yuklashda xatolik:', error);
        alert('Nazorat savollari yuklanmadi. Iltimos, qaytadan urinib ko\'ring.');
      }
    } else if (material.id === 6 && selectedTopic) {
      // Glossary uchun modal ochish
      try {
        const response = await fetch(`/glossary/${selectedTopic.id}-mavzu-glossary.json`);
        const data = await response.json();
        setGlossaryData(data);
        setGlossarySearch('');
        setShowGlossary(true);
      } catch (error) {
        console.error('Glossary yuklashda xatolik:', error);
        alert('Glossary yuklanmadi. Iltimos, qaytadan urinib ko\'ring.');
      }
    } else if (material.id === 7 && selectedTopic) {
      // Texnologik xaritalar uchun modal ochish
      const docxPath = `/tech-maps/${selectedTopic.id}-mavzu-texnologik-xarita.docx`;
      setTechMapFile(docxPath);
      setDocxType('techmap');
      setShowTechMap(true);
    }
  };

  // DOCX ni render qilish
  useEffect(() => {
    if (showTechMap && techMapFile && docxContainerRef.current) {
      // Containerini tozalash
      docxContainerRef.current.innerHTML = '';

      // DOCX faylni yuklash va render qilish
      fetch(techMapFile)
        .then(response => response.blob())
        .then(blob => {
          renderAsync(blob, docxContainerRef.current, null, {
            className: 'docx-wrapper',
            inWrapper: true,
            ignoreWidth: false,
            ignoreHeight: false,
            ignoreFonts: false,
            breakPages: true,
            ignoreLastRenderedPageBreak: true,
            experimental: false,
            trimXmlDeclaration: true,
          });
        })
        .catch(error => {
          console.error('DOCX yuklashda xatolik:', error);
          docxContainerRef.current.innerHTML = '<p style="color: #ff4a4a; text-align: center; padding: 2rem;">Fayl yuklanmadi. Iltimos, fayl mavjudligini tekshiring.</p>';
        });
    }
  }, [showTechMap, techMapFile]);

  // PDF o'lchamlarini hisoblash
  useEffect(() => {
    const updateDimensions = () => {
      if (pdfContentRef.current) {
        setPdfContainerDimensions({
          width: pdfContentRef.current.clientWidth,
          height: pdfContentRef.current.clientHeight
        });
      }
    };

    if (showPdfViewer) {
      // Modal ochilganda biroz kutib o'lchaymiz (animatsiya u-n)
      const timer = setTimeout(updateDimensions, 100);
      window.addEventListener('resize', updateDimensions);
      return () => {
        window.removeEventListener('resize', updateDimensions);
        clearTimeout(timer);
      };
    }
  }, [showPdfViewer, isFullScreen]);

  const toggleAnswer = (questionId) => {
    setRevealedAnswers(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  // Timer effect
  useEffect(() => {
    if (showTestPlayer && timeRemaining > 0 && !testCompleted) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            handleTestSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [showTestPlayer, timeRemaining, testCompleted]);

  const handleAnswerSelect = (questionId, answer) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleTestSubmit = () => {
    if (!testData) return;

    let correctCount = 0;
    testData.savollar.forEach(savol => {
      if (selectedAnswers[savol.id] === savol.togri_javob) {
        correctCount++;
      }
    });

    const score = Math.round((correctCount / testData.test_info.jami_savollar) * 100);
    setTestScore({ score, correctCount, total: testData.test_info.jami_savollar });
    setTestCompleted(true);
  };

  const closeTestPlayer = () => {
    setShowTestPlayer(false);
    setTestData(null);
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setTimeRemaining(0);
    setTestCompleted(false);
    setTestScore(null);
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const topics = [
    { id: 1, title: "Kirish. O‘quv ustaxonasida texnika xavfsizligi va yong‘in xavfsizligi qoidalari. Ish joyini tashkil etish.", icon: "⚙️" },
    { id: 2, title: "Dvigatelni umumiy tekshirish", icon: "🔩" },
    { id: 3, title: "Dvigatelga servis xizmat ko‘rsatish va uni ta’mirlash.", icon: "⛽" },
    { id: 4, title: "Silindrlar bloki qopqog‘ini ajratib olish va o‘rnatish, Silindrlar bloki qopqog‘ini ajratib olish va o‘rnatish", icon: "❄️" },
    { id: 5, title: "Krivoship-shatun mexanizm detallarini texnik holatini tekshirish. Silindrlar blokini qismlarga ajratish va tozalash hamda yuvish ishlarini bajarish.", icon: "🛢️" },
    { id: 6, title: "Gaz taqsimlash mexanizmini texnik holatini tekshirish. Klapanlar prujinalarining qayishqoqligini ajratib olmay yoki ajratib olib tekshirish.", icon: "⚡" },
    { id: 7, title: "Klapanlar yuritmasidagi issiqlik tirqishlarini tekshirish va rostlash ishlarini bajarish. Gaz taqsimlash mexanizmiga servis xizmat ko‘rsatish.", icon: "🔑" },
    { id: 8, title: "Sovitish tizimini texnik holatini tekshirish va nosozliklarini aniqlash. Suyuqlik nasosi yuritma tasmasini almashtirish. Dvigateldagi yuritma moslamalarining tarangligini rostlash.", icon: "🔋" },
    { id: 9, title: "Radiator o‘zagidagi havo yo‘llarini ifloslanishini ko‘zdan kechirib aniqlash tozalash, yuvish va siqilgan havo bilan tozalash ishlarini ketma ketlikda bajarish. Termostatni tekshirish va uni almashtirish. Sovitish tizimiga servis xizmat ko‘rsatish.", icon: "🔧" },
    { id: 10, title: "Moylash tizimini texnik holatini tekshirish va nosozliklarini aniqlash. Moylash tizimini nosozliklarini aniqlash. Moy sizayotganligi dvigatelni tashqi tomondan ko‘zdan kechirish. Birikmalarni mahkamlash detallarini qattiqlash yo‘li bilan tuzatish.", icon: "🌪️" },
    { id: 11, title: "Moy bosimining oshishi va pasayishini aniqlash hamda ta’mirlash ishlarini ketma-ketlikda bajarish. Moyning ko‘p sarflanishiga sabab bo‘lgan detallarni ta’mirlash. Dvigatel karterini shamollatish tizimini ta’mirlash.", icon: "🎛️" },
    { id: 12, title: "Karbyuratorli va injektorli dvigatellarning yonilg‘i-ta’minlash tizimiga servis xizmat ko‘rsatish va ta’mirlash.", icon: "💉" },
    { id: 13, title: "Dizel dvigatellarining yonilg‘i tizimini tashxislash va nosozliklarini aniqlash. Dizel dvigatellarini qismlarga ajratish, detallarni yuvish va tozalash. Yuqori bosimli nasos va forsunka zichligini buzilishini ta’mirlashni o‘rganib bajarish..", icon: "🛑" },
    { id: 14, title: "Havo va yonilg‘i filtrlarning kirlarini tozalash, plunjer juftining yeyilishi va sozligining buzilishini ta’mirlashni o‘rganib bajarish. Forsunkaning purkash teshigini qurumlardan tozalash. Dizel dvigatellarini yig‘ish va sinash.", icon: "🛑" },
    { id: 15, title: "Gaz yonilg‘isida ishlaydigan dvigatellarining yonilg‘i tizimiga servis xizmat ko‘rsatish va ta’mirlash.", icon: "⚙️" },
    { id: 16, title: "O‘t oldirish tizimini umumiy tashxislash va nosozliklarni bartaraf etish. Uzgich kontaktlari orasidagi tirqishni tekshirish va rostlash ishlari. O‘t oldirishni ilgarilatish burchagini tekshirish va rostlash.", icon: "🔍" },
    { id: 17, title: "O‘t oldirish shamlarini tekshirish, nosozliklarini aniqlash, tozalash va almashtirish ishlarini ketma ketlikda bajarish. O‘t oldirish tizmini ta’mirlash. Ta’mirdan chiqqan dvigatelni ishlatib moslash va sinash", icon: "📡" },
    { id: 18, title: "Avtomobil dvigatellarini yig‘ish va sinash.", icon: "🔨" },
    { id: 19, title: "Avtomobillarga servis xizmat ko‘rsatishdan so‘ng sinash", icon: "🛠️" },
    { id: 20, title: "Amaliy nazorat mashg‘uloti. Sinov.", icon: "🧰" },

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
          <div className="home-screen">{/* Home screen content remains same */}
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
                  Avtomobil dvigatellariga servis xizmat ko'rsatish<br />
                  <span className="text-gradient">va ta'mirlash ishlari o'quv amaliyoti</span>
                </h1>
                <p className="main-description">
                  30711601 – Avtomobil dvigatellarini tashxislash va ta’mirlash kasb bo‘yicha
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
                      <div className="preview-desc">200 test savollari</div>
                    </div>
                    <div className="preview-count">200</div>
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
        ) : selectedTopic ? (
          <div className="topic-detail-screen">
            <div className="topic-detail-header">
              <button className="btn-back" onClick={() => setSelectedTopic(null)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
                Mavzularga qaytish
              </button>
              <div className="topic-detail-title">
                <span className="topic-detail-icon">{selectedTopic.icon}</span>
                <h2>{selectedTopic.title}</h2>
              </div>
            </div>

            <div className="materials-grid">
              {materials.map((material, index) => (
                <div
                  key={material.id}
                  className="material-card"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    '--card-color': material.color
                  }}
                >
                  <div className="material-icon-wrapper">
                    <div className="material-icon">{material.icon}</div>
                  </div>
                  <h3 className="material-title">{material.title}</h3>
                  <p className="material-description">{material.description}</p>
                  <button className="material-btn" onClick={() => handleMaterialClick(material)}>
                    <span>O'rganish</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </button>
                </div>
              ))}
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
                  style={{ animationDelay: `${index * 0.04}s` }}
                  onClick={() => setSelectedTopic(topic)}
                >
                  <div className="topic-icon">{topic.icon}</div>
                  <h3 className="topic-title">{topic.title}</h3>
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

      {/* PDF Viewer Modal */}
      {showPdfViewer && selectedPdf && (
        <div className="pdf-viewer-overlay" onClick={() => setShowPdfViewer(false)}>
          <div className="pdf-viewer-container" onClick={(e) => e.stopPropagation()}>
            <div className="pdf-viewer-header">
              <h3 className="pdf-viewer-title">
                <span className="pdf-icon">📄</span>
                Ma'ruza matni - {selectedTopic?.title}
              </h3>
              <button className="pdf-close-btn" onClick={() => setShowPdfViewer(false)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div className="pdf-viewer-content">
              <iframe
                src={selectedPdf}
                title="PDF Viewer"
                className="pdf-iframe"
              ></iframe>
            </div>
          </div>
        </div>
      )}

      {/* Video Player Modal */}
      {showVideoPlayer && selectedVideo && (
        <div className="video-player-overlay" onClick={() => setShowVideoPlayer(false)}>
          <div className="video-player-container" onClick={(e) => e.stopPropagation()}>
            <div className="video-player-header">
              <h3 className="video-player-title">
                <span className="video-icon">🎥</span>
                Video dars - {selectedTopic?.title}
              </h3>
              <button className="video-close-btn" onClick={() => setShowVideoPlayer(false)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div className="video-player-content">
              <video
                className="video-element"
                controls
                autoPlay
                controlsList="nodownload"
              >
                <source src={selectedVideo} type="video/mp4" />
                Brauzer video ni qo'llab-quvvatlamaydi.
              </video>
            </div>
          </div>
        </div>
      )}

      {/* Test Player Modal */}
      {showTestPlayer && testData && (
        <div className="test-player-overlay" onClick={closeTestPlayer}>
          <div className="test-player-container" onClick={(e) => e.stopPropagation()}>
            {!testCompleted ? (
              <>
                <div className="test-player-header">
                  <div className="test-header-left">
                    <h3 className="test-player-title">
                      <span className="test-icon">✍️</span>
                      {testData.mavzu_nomi}
                    </h3>
                    <p className="test-progress">
                      Savol {currentQuestion + 1} / {testData.test_info.jami_savollar}
                    </p>
                  </div>
                  <div className="test-header-right">
                    <div className="test-timer">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                      <span>{Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}</span>
                    </div>
                    <button className="test-close-btn" onClick={closeTestPlayer}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="test-player-content">
                  <div className="test-question-box">
                    <h4 className="question-text">
                      {testData.savollar[currentQuestion].savol}
                    </h4>
                  </div>

                  <div className="test-answers">
                    {Object.entries(testData.savollar[currentQuestion].variantlar).map(([key, value]) => (
                      <div
                        key={key}
                        className={`answer-option ${selectedAnswers[testData.savollar[currentQuestion].id] === key ? 'selected' : ''
                          }`}
                        onClick={() => handleAnswerSelect(testData.savollar[currentQuestion].id, key)}
                      >
                        <div className="answer-radio">
                          {selectedAnswers[testData.savollar[currentQuestion].id] === key && (
                            <div className="answer-radio-dot"></div>
                          )}
                        </div>
                        <div className="answer-content">
                          <span className="answer-label">{key.toUpperCase()})</span>
                          <span className="answer-text">{value}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="test-navigation">
                    <button
                      className="test-nav-btn"
                      onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
                      disabled={currentQuestion === 0}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="15 18 9 12 15 6"></polyline>
                      </svg>
                      Orqaga
                    </button>

                    {currentQuestion < testData.test_info.jami_savollar - 1 ? (
                      <button
                        className="test-nav-btn"
                        onClick={() => setCurrentQuestion(prev => prev + 1)}
                      >
                        Keyingi
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                      </button>
                    ) : (
                      <button className="test-submit-btn" onClick={handleTestSubmit}>
                        Testni yakunlash
                      </button>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="test-results">
                <div className="results-header">
                  <div className={`results-score ${testScore.score >= testData.test_info.otish_ball ? 'passed' : 'failed'}`}>
                    <h2>{testScore.score}%</h2>
                    <p>{testScore.score >= testData.test_info.otish_ball ? '✅ O\'tdingiz!' : '❌ O\'tmadingiz'}</p>
                  </div>
                </div>

                <div className="results-stats">
                  <div className="stat-item">
                    <span className="stat-label">To'g'ri javoblar</span>
                    <span className="stat-value">{testScore.correctCount} / {testScore.total}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">O'tish balli</span>
                    <span className="stat-value">{testData.test_info.otish_ball}%</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Sizning ballingiz</span>
                    <span className="stat-value">{testScore.score}%</span>
                  </div>
                </div>

                <div className="results-actions">
                  <button className="results-btn secondary" onClick={() => {
                    setTestCompleted(false);
                    setCurrentQuestion(0);
                    setSelectedAnswers({});
                    setTimeRemaining(testData.test_info.vaqt_limit * 60);
                    setTestScore(null);
                  }}>
                    Qayta urinish
                  </button>
                  <button className="results-btn primary" onClick={closeTestPlayer}>
                    Yopish
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Control Questions Modal */}
      {showControlQuestions && controlQuestionsData && (
        <div className="control-questions-overlay" onClick={() => setShowControlQuestions(false)}>
          <div className="control-questions-container" onClick={(e) => e.stopPropagation()}>
            <div className="control-questions-header">
              <h3 className="control-questions-title">
                <span className="control-icon">✅</span>
                Nazorat savollari - {controlQuestionsData.mavzu_nomi}
              </h3>
              <button className="control-close-btn" onClick={() => setShowControlQuestions(false)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div className="control-questions-content">
              <div className="control-questions-list">
                {controlQuestionsData.nazorat_savollari.map((savol, index) => (
                  <div key={savol.id} className="control-question-item">
                    <div className="question-number">Savol {index + 1}</div>
                    <div className="question-text">{savol.savol}</div>
                    <button
                      className={`answer-toggle-btn ${revealedAnswers[savol.id] ? 'active' : ''}`}
                      onClick={() => toggleAnswer(savol.id)}
                    >
                      {revealedAnswers[savol.id] ? '👁️ Yashirish' : '👁️‍🗨️ Javob'}
                    </button>
                    {revealedAnswers[savol.id] && (
                      <div className="answer-content">
                        <div className="answer-section">
                          <strong>✓ Javob:</strong>
                          <p>{savol.javob}</p>
                        </div>
                        <div className="explanation-section">
                          <strong>💡 Izoh:</strong>
                          <p>{savol.izoh}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Glossary Modal */}
      {showGlossary && glossaryData && (
        <div className="glossary-overlay" onClick={() => setShowGlossary(false)}>
          <div className="glossary-container" onClick={(e) => e.stopPropagation()}>
            <div className="glossary-header">
              <h3 className="glossary-title">
                <span className="glossary-icon">📖</span>
                Glossary - {glossaryData.mavzu_nomi}
              </h3>
              <button className="glossary-close-btn" onClick={() => setShowGlossary(false)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div className="glossary-search">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input
                type="text"
                placeholder="Atama qidirish..."
                value={glossarySearch}
                onChange={(e) => setGlossarySearch(e.target.value)}
              />
            </div>
            <div className="glossary-content">
              <div className="glossary-list">
                {glossaryData.glossary
                  .filter(item =>
                    item.atama.toLowerCase().includes(glossarySearch.toLowerCase()) ||
                    item.tasnif.toLowerCase().includes(glossarySearch.toLowerCase())
                  )
                  .map((item, index) => (
                    <div key={index} className="glossary-item">
                      <div className="glossary-term">{item.atama}</div>
                      <div className="glossary-definition">{item.tasnif}</div>
                    </div>
                  ))}
                {glossaryData.glossary.filter(item =>
                  item.atama.toLowerCase().includes(glossarySearch.toLowerCase()) ||
                  item.tasnif.toLowerCase().includes(glossarySearch.toLowerCase())
                ).length === 0 && (
                    <div className="glossary-empty">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                      </svg>
                      <p>Hech narsa topilmadi</p>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tech Map Modal */}
      {showTechMap && techMapFile && selectedTopic && (
        <div className="tech-map-overlay" onClick={() => setShowTechMap(false)}>
          <div className="tech-map-container" onClick={(e) => e.stopPropagation()}>
            <div className="tech-map-header">
              <h3 className="tech-map-title">
                <span className="tech-map-icon">{docxType === 'lecture' ? '📄' : '🗺️'}</span>
                {docxType === 'lecture' ? "Ma'ruza matni" : "Texnologik xarita"} - {selectedTopic.title}
              </h3>
              <div className="tech-map-actions">
                <a
                  href={techMapFile}
                  download={docxType === 'lecture' ? `${selectedTopic.id}-mavzu.docx` : `${selectedTopic.id}-mavzu-texnologik-xarita.docx`}
                  className="tech-map-download-btn"
                  title="Yuklab olish"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                  Yuklab olish
                </a>
                <button className="tech-map-close-btn" onClick={() => setShowTechMap(false)}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
            </div>
            <div className="tech-map-content">
              <div ref={docxContainerRef} className="docx-container"></div>
            </div>
          </div>
        </div>
      )}

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

      {/* PDF Slide Viewer Modal */}
      {showPdfViewer && (
        <div className="pdf-slide-viewer-overlay" onClick={() => { setShowPdfViewer(false); setCurrentPage(1); setIsFullScreen(false); }}>
          <div className={`pdf-slide-viewer-container ${isFullScreen ? 'fullscreen' : ''}`} onClick={(e) => e.stopPropagation()}>
            <div className="pdf-slide-viewer-header">
              <h2 className="pdf-viewer-title">Taqdimot</h2>
              <div className="pdf-viewer-actions">
                <a href={selectedPdf} download className="pdf-download-btn">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                  Yuklab olish
                </a>
                <button
                  className={`pdf-fullscreen-btn ${isFullScreen ? 'active' : ''}`}
                  onClick={toggleFullScreen}
                  title={isFullScreen ? "Kichiklashtirish" : "To'liq ekran"}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    {isFullScreen ? (
                      <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path>
                    ) : (
                      <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0v-3a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
                    )}
                  </svg>
                </button>
                <button className="pdf-close-btn" onClick={() => { setShowPdfViewer(false); setCurrentPage(1); setIsFullScreen(false); }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
            </div>

            <div className="pdf-slide-viewer-content" ref={pdfContentRef}>
              <Document
                file={selectedPdf}
                onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                loading={
                  <div className="pdf-loading">
                    <div className="pdf-spinner"></div>
                    <p>Taqdimot yuklanmoqda...</p>
                  </div>
                }
                error={
                  <div className="pdf-error">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                    <p>Taqdimot yuklanmadi. Iltimos, qaytadan urinib ko'ring.</p>
                  </div>
                }
              >
                <Page
                  pageNumber={currentPage}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  className="pdf-slide-canvas"
                  onLoadSuccess={(page) => setPageAspectRatio(page.view[2] / page.view[3])}
                  width={Math.min(
                    pdfContainerDimensions.width * 0.98,
                    pdfContainerDimensions.height * pageAspectRatio * 0.98
                  )}
                />
              </Document>
            </div>

            {numPages && (
              <div className="pdf-slide-navigation">
                <button
                  className="pdf-nav-btn"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                  Oldingi
                </button>

                <div className="pdf-page-indicator">
                  <span className="current-page">{currentPage}</span>
                  <span className="page-separator">/</span>
                  <span className="total-pages">{numPages}</span>
                </div>

                <button
                  className="pdf-nav-btn"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, numPages))}
                  disabled={currentPage === numPages}
                >
                  Keyingi
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
