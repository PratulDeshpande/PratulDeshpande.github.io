import React, { useState, useEffect, useRef, memo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Linkedin, 
  Github, 
  Mail, 
  ChevronRight, 
  ExternalLink, 
  X, 
  Cpu, 
  Code, 
  Atom, 
  BookOpen,
  Briefcase,
  Send,
  FileText,
  CircuitBoard,
  Terminal,
  Layers,
  GitBranch,
  Sparkles,
  ArrowUp,
  Bot,
  GraduationCap,
  Twitter 
} from 'lucide-react';

// --- DATA SECTION ---
const portfolioData = {
  personal: {
    name: "Pratul Deshpande",
    title: "Embedded Systems & Software Developer", 
    about: "E&Tc undergraduate specializing in embedded systems and software development. Proficient in Python, UDS, Embedded C, and Quantum Computing fundamentals with experience enhancing process efficiency in multinational environments.",
    email: "pratul.deshpande06@gmail.com",
    linkedin: "https://www.linkedin.com/in/pratuldeshpande",
    github: "https://github.com/PratulDeshpande",
    twitter: "https://twitter.com/PratulDeshpande", 
    resumeLink: "/assets/resume.pdf"     
  },
  education: [
    {
      institution: "Pune Vidhyarthi Griha's College of Engineering and Technology, Pune",
      degree: "BE, Electronics and Telecommunication",
      period: "Nov 2022 - Nov 2026",
      details: "Currently pursuing."
    },
    {
      institution: "Matoshri College of Management and Research Centre",
      degree: "HSC (Higher Secondary Certificate)",
      period: "2020 - 2022", 
      details: "Grade: 79%"
    },
    {
      institution: "New Era English School",
      degree: "SSC (Secondary School Certificate)",
      period: "2020", 
      details: "Grade: 90.20%"
    }
  ],
  experience: [
    {
      role: "Software Development Intern",
      company: "Lear Corporation",
      period: "June 2025 - Aug 2025",
      description: "Developed Python libraries to automate 28+ UDS diagnostic services, reducing manual testing time by 60%. Engineered custom libraries using the PySTA framework."
    },
    {
      role: "Technical Intern",
      company: "Makewell Electronics Services",
      period: "Dec 2024 - Feb 2025",
      description: "Designed and tested 3 variations of a 20-socket tray for ATLAS COPCO, achieving a 98% quality pass rate. Validated industrial PLC systems."
    },
    {
      role: "General Secretary",
      company: "TESA, PVG's COET&M",
      period: "July 2024 - July 2025",
      description: "Organized 11 events engaging 2000+ students, leading one of the institute's most accomplished associations."
    }
  ],
  research: [
    {
      title: "Quantum-Assisted Supply Chain Optimization",
      publication: "NCRICSIT 2025",
      details: "ISSN: 2277-5730 | Impact Factor: 7.428",
      link: "https://www.researchgate.net/profile/Pratul-Deshpande/",
      image: "https://images.unsplash.com/photo-1681908571122-97f349e1ace0?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      title: "Gender-based violence in Video Games",
      publication: "ICGEWE 2024",
      details: "ISSN: 2278-8808 | Impact Factor: 8.153",
      link: "https://www.researchgate.net/profile/Pratul-Deshpande/",
      image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&q=80&w=800"
    }
  ],
  projects: [
    {
      title: "AI-based Predictive Maintenance System",
      tech: "IoT / AI / ESP32",
      description: "Created a predictive maintenance system for industrial filters using ESP32 and cloud integration with a real-time dashboard.",
      image: "https://images.unsplash.com/photo-1744123146393-4b5438a5d98f?q=80&w=1452&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      title: "Diagnostic Library (PYSTA)",
      tech: "Python / UDS",
      description: "Architected a UDS-based Python library supporting 24+ services, slashing test-authoring time by 60% across teams.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Real-Time Stress Detection",
      tech: "Bio-Sensors / HRV",
      description: "Developed a health monitoring system for real-time Heart Rate Variability analysis with 85% accuracy across 20+ subjects.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800"
    }
  ],
  skills: [
    { title: "Programming", icon: Code, items: "Python, Embedded C, C++, SQL" },
    { title: "Hardware", icon: CircuitBoard, items: "Raspberry Pi, ESP32, Arduino, ARM" },
    { title: "Tools", icon: Terminal, items: "MATLAB, Simulink, OpenCV, CANoe, Jira, Git" },
    { title: "Design", icon: Layers, items: "PCB Design (Proteus, KiCad)" },
    { title: "Protocols", icon: GitBranch, items: "UDS (ISO 14229), CAN" },
    { title: "Quantum", icon: Atom, items: "Qiskit" },
  ]
};

const aiKnowledgeBase = {
  personalPhilosophy: "Bridging the gap between hardware and software; innovation happens at the intersection of embedded systems and intelligent algorithms.",
  strengths: "Rapid prototyping, automotive diagnostic protocols (UDS, CAN), and Python automation.",
  projectDetails: {
    predictiveMaintenance: "Focused on reducing industrial waste. Challenge: reliable ESP32-to-cloud transmission in noisy environments.",
    diagnosticLibrary: "Practical application at Lear. Modular architecture allowed easy addition of new UDS services.",
    stressDetection: "Deep dive into bio-sensing and signal processing. Key lesson: importance of clean data/noise reduction."
  },
  futureGoals: "Seeking full-time roles or advanced internships in embedded systems, automotive, health tech, or quantum computing."
};

// --- MEMOIZED COMPONENTS ---

const NavButton = memo(({ title, active, onClick, icon: Icon }) => (
  <button
    onClick={onClick}
    className={`relative group flex items-center gap-2 px-4 py-3 md:px-5 md:py-2.5 rounded-full transition-all duration-300 border ${
      active 
        ? "bg-white/10 border-white/40 text-white shadow-[0_0_20px_rgba(255,255,255,0.15)]" 
        : "bg-transparent border-transparent text-gray-400 hover:text-white hover:bg-white/5"
    }`}
  >
    {Icon && <Icon size={16} className={`transition-colors ${active ? 'text-blue-400' : 'group-hover:text-blue-300'}`} />}
    <span className="hidden sm:inline uppercase tracking-[0.2em] text-[10px] font-bold">{title}</span>
  </button>
));

const SectionHeading = memo(({ children }) => (
  <motion.h2 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="text-3xl sm:text-4xl md:text-5xl 2xl:text-6xl font-bold text-white mb-12 md:mb-16 relative inline-block"
  >
    <span className="relative z-10">{children}</span>
    <span className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-blue-500 rounded-full"></span>
  </motion.h2>
));

const GlassCard = memo(({ title, subtitle, details, image, link, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ delay: delay * 0.1, duration: 0.5 }}
    className="group relative bg-gradient-to-br from-white/10 to-white/0 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300 hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] text-left flex flex-col h-full"
  >
    {image && (
      <div className="h-48 sm:h-56 2xl:h-72 overflow-hidden relative flex-shrink-0">
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent z-10 opacity-80" />
        <img 
          src={image} 
          alt={title}
          loading="lazy"
          decoding="async" 
          className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105 opacity-80 group-hover:opacity-100"
        />
      </div>
    )}
    <div className="p-6 md:p-8 2xl:p-10 relative z-20 flex flex-col flex-grow">
      <div className="mb-4">
        <h3 className="text-xl sm:text-2xl 2xl:text-3xl font-bold text-white group-hover:text-blue-200 transition-colors">{title}</h3>
        {subtitle && <div className="text-blue-400 text-xs 2xl:text-sm font-mono mt-2 uppercase tracking-widest">{subtitle}</div>}
      </div>
      <p className="text-gray-400 leading-relaxed text-sm 2xl:text-base mb-6 font-light flex-grow">{details}</p>
      {link && (
        <a 
          href={link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs 2xl:text-sm text-white font-bold tracking-widest uppercase hover:text-blue-400 transition-colors mt-auto"
        >
          Explore <ChevronRight size={14} />
        </a>
      )}
    </div>
  </motion.div>
));

const TimelineItem = memo(({ role, company, period, description, index }) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className="relative pl-8 md:pl-10 border-l border-white/10 pb-12 md:pb-16 last:pb-0 text-left group"
  >
    <div className="absolute -left-[6px] top-2 w-3 h-3 rounded-full bg-[#050505] border border-white/30 group-hover:border-blue-400 group-hover:bg-blue-500 transition-all duration-300 shadow-[0_0_0_4px_rgba(0,0,0,0.5)]" />
    <div className="group-hover:translate-x-2 transition-transform duration-300">
      <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2">
        <h3 className="text-lg md:text-xl 2xl:text-2xl font-bold text-white">{role}</h3>
        <span className="text-xs 2xl:text-sm font-mono text-gray-500 mt-1 md:mt-0">{period}</span>
      </div>
      <div className="text-sm md:text-md 2xl:text-lg text-blue-400 font-medium mb-3 tracking-wide">{company}</div>
      <p className="text-gray-400 text-sm md:text-base 2xl:text-lg leading-relaxed font-light max-w-3xl">{description}</p>
    </div>
  </motion.div>
));

// --- CHAT MODAL ---
const GeminiChatModal = ({ isOpen, onClose }) => {
  const [chatHistory, setChatHistory] = useState([
    { role: "model", parts: [{ text: "Hi! I'm Pratul's AI. Ask me about his projects, skills, or resume." }] }
  ]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory, isLoading]);

  const callGeminiApi = async (history) => {
    setIsLoading(true);
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";
    
    if (!apiKey) {
        setChatHistory(prev => [...prev, { role: "model", parts: [{ text: "Note: API Key missing. Please check .env.local for local development." }] }]);
        setIsLoading(false);
        return;
    }
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
    const systemPrompt = `You are Pratul's professional AI assistant.
    RULES:
    1. Be CONCISE. Max 2-3 sentences per answer.
    2. Use bullet points for lists.
    3. NO fluff. Get straight to the point.
    4. If asked for resume: [Download Resume](/assets/pratul_deshpande_resume.pdf)
    5. If answering about projects, use format: [Project Name](link)
    DATA:
    ${JSON.stringify(portfolioData)}
    ${JSON.stringify(aiKnowledgeBase)}
    `;

    const payload = { contents: history, systemInstruction: { parts: [{ text: systemPrompt }] } };

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      const newModelMessage = result.candidates?.[0]?.content || { role: "model", parts: [{ text: "I couldn't generate a response." }]};
      setChatHistory(prev => [...prev, newModelMessage]);
    } catch (error) {
      setChatHistory(prev => [...prev, { role: "model", parts: [{ text: "Connection error. Please try again." }] }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = useCallback((e) => {
    e.preventDefault();
    if (!currentMessage.trim() || isLoading) return;
    const userMessage = { role: "user", parts: [{ text: currentMessage }] };
    setChatHistory(prev => [...prev, userMessage]);
    setCurrentMessage("");
    callGeminiApi([...chatHistory, userMessage]);
  }, [currentMessage, isLoading, chatHistory]);

  const renderMessageText = useCallback((text) => {
    if (!text) return "";
    const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
    return parts.map((part, i) => {
      const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (linkMatch) {
        return (
          <a key={i} href={linkMatch[2]} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline hover:text-blue-300 font-bold inline-flex items-center gap-1">
            {linkMatch[1]} <ExternalLink size={12} />
          </a>
        );
      }
      return part;
    });
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
            className="bg-[#111] border border-white/10 rounded-2xl p-6 max-w-lg w-full shadow-2xl relative flex flex-col h-[70vh] max-h-[600px]"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white"><X size={20} /></button>
            <div className="flex items-center gap-3 mb-4 border-b border-white/10 pb-4">
              <div className="p-2 bg-blue-600/20 rounded-full border border-blue-500/30"><Sparkles size={18} className="text-blue-300" /></div>
              <div><h3 className="text-lg font-bold text-white">Pratul's AI</h3><p className="text-xs text-gray-500">Ask anything about my work</p></div>
            </div>
            <div ref={chatContainerRef} className="flex-grow space-y-4 overflow-y-auto pr-2 custom-scrollbar mb-4">
              {chatHistory.map((msg, index) => (
                <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.role === 'model' && <Bot size={24} className="text-blue-400 mr-2 mt-1 flex-shrink-0" />}
                  <div className={`p-3 rounded-2xl max-w-[85%] text-sm ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white/10 text-gray-200 rounded-bl-none'}`}>
                    {renderMessageText(msg.parts[0].text)}
                  </div>
                </div>
              ))}
              {isLoading && <div className="flex justify-start"><Bot size={24} className="text-blue-400 mr-2 mt-1" /><div className="p-3 rounded-2xl bg-white/10 text-gray-400 rounded-bl-none text-xs flex items-center gap-1">Typing<span className="animate-pulse">...</span></div></div>}
            </div>
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input value={currentMessage} onChange={(e) => setCurrentMessage(e.target.value)} className="flex-grow bg-white/5 border border-white/10 rounded-lg p-3 text-white text-sm focus:border-blue-500 outline-none" placeholder="Ask me anything..." disabled={isLoading} />
              <button type="submit" disabled={isLoading || !currentMessage.trim()} className="p-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg disabled:opacity-50"><ArrowUp size={18} /></button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- CONTACT MODAL WITH BACKEND ---
const ContactModal = ({ isOpen, onClose }) => {
  const [status, setStatus] = useState('idle'); // idle, sending, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    
    // Using FormSubmit.co for AJAX submission
    const formData = new FormData(e.target);
    
    try {
      const response = await fetch("https://formsubmit.co/ajax/pratul.deshpande06@gmail.com", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(Object.fromEntries(formData))
      });
      
      if (response.ok) {
        setStatus('success');
        setTimeout(() => { onClose(); setStatus('idle'); }, 2000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
            className="bg-[#111] border border-white/10 rounded-2xl p-8 max-w-md w-full shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white"><X size={20} /></button>
            <h3 className="text-2xl font-bold text-white mb-2">Let's Connect</h3>
            <p className="text-gray-400 text-sm mb-6">Send me a direct message.</p>
            
            {status === 'success' ? (
              <div className="text-center py-8 text-green-400">
                <Sparkles className="mx-auto mb-4" size={48} />
                <p className="text-xl font-bold">Message Sent!</p>
                <p className="text-sm text-gray-400 mt-2">I'll get back to you soon.</p>
              </div>
            ) : (
              <form className="space-y-4" onSubmit={handleSubmit}>
                {/* Honeypot to prevent spam */}
                <input type="text" name="_honey" className="hidden" />
                <input type="hidden" name="_captcha" value="false" />
                
                <input type="text" name="name" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-blue-500 outline-none" placeholder="Your Name" required disabled={status === 'sending'} />
                <input type="email" name="email" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-blue-500 outline-none" placeholder="Your Email" required disabled={status === 'sending'} />
                <textarea name="message" rows="4" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-blue-500 outline-none" placeholder="Message..." required disabled={status === 'sending'} />
                
                <button 
                  type="submit" 
                  disabled={status === 'sending'}
                  className={`w-full font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-all ${
                    status === 'sending' 
                    ? 'bg-gray-600 cursor-not-allowed text-gray-300' 
                    : 'bg-blue-600 hover:bg-blue-500 text-white'
                  }`}
                >
                  {status === 'sending' ? 'Sending...' : (
                    <>Send Message <Send size={16} /></>
                  )}
                </button>
                {status === 'error' && <p className="text-red-400 text-sm text-center">Something went wrong. Please try again.</p>}
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- MAIN APP ---
export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Atom },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'projects', label: 'Projects', icon: Code },
    { id: 'research', label: 'Research', icon: BookOpen },
    { id: 'education', label: 'Education', icon: GraduationCap },
  ];

  return (
    <div className="relative w-full min-h-screen bg-[#050505] text-white font-sans overflow-hidden flex flex-col items-center selection:bg-blue-500/30">
      
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      <GeminiChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

      {/* BACKGROUND */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-black/40 z-10" /> 
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#050505] z-10" />
        <video 
          autoPlay loop muted playsInline
          onLoadedData={() => setIsVideoLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
        >
          <source src="/assets/space-loop.mp4" type="video/mp4" />
          <source src="https://assets.mixkit.co/videos/preview/mixkit-stars-in-space-1610-large.mp4" type="video/mp4" />
        </video>
      </div>

      {/* NAVIGATION */}
      <nav className="fixed top-4 md:top-8 z-50 w-full flex justify-center px-4">
        <div className="bg-black/30 backdrop-blur-xl border border-white/10 rounded-full p-1.5 flex items-center gap-1 shadow-2xl ring-1 ring-white/5">
            {navItems.map((item) => (
                <NavButton 
                  key={item.id}
                  title={item.label} 
                  active={activeTab === item.id} 
                  onClick={() => setActiveTab(item.id)}
                  icon={item.icon}
                />
            ))}
        </div>
      </nav>

      {/* CONTENT AREA */}
      <main className="relative z-30 w-full max-w-[1920px] px-4 sm:px-6 lg:px-12 min-h-screen flex flex-col items-center justify-center text-center py-24 md:py-32">
        <AnimatePresence mode="wait">
          
          {activeTab === 'home' && (
            <motion.div 
              key="home"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center max-w-5xl mx-auto"
            >
              <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold leading-tight mb-6 tracking-tight drop-shadow-2xl">
                Hi, I am <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/40">Pratul.</span>
              </h1>
              
              <div className="flex flex-wrap justify-center gap-3 mb-10">
                {[
                  { icon: Code, label: "Software" },
                  { icon: Cpu, label: "Embedded" },
                  { icon: Atom, label: "Quantum" }
                ].map((skill, i) => (
                  <div key={i} className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/20 rounded-full backdrop-blur-md">
                    <skill.icon size={14} className="text-blue-400" />
                    <span className="text-xs font-bold uppercase tracking-widest text-white">{skill.label}</span>
                  </div>
                ))}
              </div>

              <p className="text-base sm:text-xl text-gray-200 font-light leading-relaxed mb-12 max-w-3xl mx-auto">
                {portfolioData.personal.about}
              </p>

              {/* SKILLS GRID */}
              <div className="w-full max-w-4xl mx-auto mb-16">
                 <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-widest opacity-80">Core Competencies</h3>
                 <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {portfolioData.skills.map((skill, i) => (
                      <div key={i} className="bg-white/5 border border-white/10 rounded-lg p-4 text-left hover:bg-white/10 transition-colors">
                        <skill.icon size={20} className="text-blue-400 mb-2" />
                        <h4 className="font-bold text-sm text-white">{skill.title}</h4>
                        <p className="text-xs text-gray-400 mt-1 line-clamp-2">{skill.items}</p>
                      </div>
                    ))}
                 </div>
              </div>
              
              <div className="flex flex-wrap justify-center gap-4">
                  <button onClick={() => setActiveTab('projects')} className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-blue-50 transition-all flex items-center gap-2">
                      View Work <ChevronRight size={18} />
                  </button>
                  <button onClick={() => setIsContactOpen(true)} className="px-8 py-3 border border-white/30 hover:bg-white/10 text-white font-bold rounded-full transition-all flex items-center gap-2">
                      Contact <Mail size={18} />
                  </button>
                  <a href={portfolioData.personal.resumeLink} download className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full transition-all flex items-center gap-2">
                      Resume <FileText size={18} />
                  </a>
              </div>
            </motion.div>
          )}

          {/* FIX APPLIED HERE: Explicitly mapping tech->subtitle and description->details */}
          {activeTab === 'projects' && (
            <motion.div 
              key="projects"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="w-full max-w-7xl mx-auto"
            >
              <SectionHeading>Selected Works</SectionHeading>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 text-left">
                {portfolioData.projects.map((project, index) => (
                  <GlassCard 
                    key={index} 
                    title={project.title} 
                    subtitle={project.tech} 
                    details={project.description} 
                    image={project.image} 
                    delay={index} 
                  />
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'experience' && (
            <motion.div 
              key="experience"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="max-w-4xl mx-auto w-full text-left"
            >
              <div className="text-center"><SectionHeading>Experience</SectionHeading></div>
              <div className="space-y-2">
                {portfolioData.experience.map((job, index) => (
                  <TimelineItem key={index} {...job} index={index} />
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'education' && (
            <motion.div 
              key="education"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="max-w-4xl mx-auto w-full text-left"
            >
              <div className="text-center"><SectionHeading>Education</SectionHeading></div>
              <div className="space-y-2">
                {portfolioData.education.map((edu, index) => (
                   <TimelineItem key={index} role={edu.degree} company={edu.institution} period={edu.period} description={edu.details} index={index} />
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'research' && (
             <motion.div 
             key="research"
             initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
             className="w-full max-w-5xl mx-auto"
           >
             <SectionHeading>Publications</SectionHeading>
             <div className="grid grid-cols-1 gap-6 text-left">
               {portfolioData.research.map((paper, index) => (
                 <GlassCard key={index} title={paper.title} subtitle={paper.publication} details={paper.details} image={paper.image} link={paper.link} delay={index} />
               ))}
             </div>
           </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* SOCIAL LINKS FOOTER (RESTORED) */}
      <footer className="fixed bottom-4 z-40 w-full text-center">
         <div className="flex justify-center gap-6 mb-2 pointer-events-auto">
             <a href={portfolioData.personal.github} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-all hover:scale-110">
                 <Github size={20} />
             </a>
             <a href={portfolioData.personal.linkedin} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-blue-400 transition-all hover:scale-110">
                 <Linkedin size={20} />
             </a>
             <a href={portfolioData.personal.twitter} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-all hover:scale-110">
                 <Twitter size={20} />
             </a>
         </div>
         <p className="text-white/20 text-[10px] uppercase tracking-widest pointer-events-none">© {new Date().getFullYear()} Pratul Deshpande</p>
      </footer>

      {/* AI FAB - UPDATED: Bigger, Glowing, Continuous Text Box */}
      {/* Container uses flex-col-reverse so text box is visually above the button but logic remains simple */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }} 
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
        whileHover="hover" // Trigger hover state for children
        className="fixed bottom-24 right-8 z-50 flex flex-col items-end gap-2"
      >
        {/* Floating Text Box (Disappears on Hover) */}
        <motion.div 
          variants={{
            hover: { opacity: 0, transition: { duration: 0.2 } } // Fade out on hover
          }}
          initial={{ y: 0 }}
          animate={{ y: [0, -5, 0] }} // Continuous float animation
          transition={{ 
            y: { duration: 2, repeat: Infinity, ease: "easeInOut" } 
          }}
          className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl px-3 py-1.5 text-xs text-white font-medium shadow-[0_0_15px_rgba(59,130,246,0.5)] relative mr-2"
        >
          Ask me anything about Pratul!
          {/* Arrow pointing down to button */}
          <div className="absolute -bottom-1 right-6 w-2 h-2 bg-white/10 border-b border-r border-white/20 transform rotate-45 backdrop-blur-xl"></div>
        </motion.div>

        <button
          onClick={() => setIsChatOpen(true)}
          className="relative w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.6)] hover:shadow-[0_0_50px_rgba(59,130,246,0.8)] text-white hover:scale-110 transition-all duration-300 border border-white/20"
        >
          <div className="absolute inset-0 rounded-full bg-white/20 animate-pulse"></div>
          <Sparkles size={32} className="relative z-10" />
        </button>
      </motion.div>

    </div>
  );
}