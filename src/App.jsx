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
      title: "QAOA based Route Optimizer | Live at: quantum.pratuldeshpande.com",
      tech: "Qiskit / Python / openstreets maps / react",
      description: "Solves TSP using IBM Qiskit Runtime Annealers and integrates with OpenStreetMap API for real-world routing and React for UI.",
      image: "https://images.unsplash.com/photo-1584972191378-d70853fc47fc?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      link: "https://quantum.pratuldeshpande.com"
    },
    {
      title: "AI-based Predictive Maintenance System",
      tech: "ESP32 / AI  / sql / react / nodejs",
      description: "Created a predictive maintenance system for industrial filters using ESP32 and cloud integration with a real-time dashboard.",
      image: "https://images.unsplash.com/photo-1744123146393-4b5438a5d98f?q=80&w=1452&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      link: "https://github.com/PratulDeshpande"
    },
    {
      title: "Diagnostic Library for software framework (PYSTA) at LEAR Corp",
      tech: "Python / UDS / PySTA",
      description: "Architected a UDS-based Python library supporting 24+ services, slashing test-authoring time by 60% across teams.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
      link: "https://github.com/PratulDeshpande"
    },
    {
      title: "Real-Time Stress Detection & Monitoring System",
      tech: "Bio-Sensors / esp32 / HRV / html",
      description: "Developed a health monitoring system for real-time Heart Rate Variability analysis with 85% accuracy across 20+ subjects.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800",
      link: "https://github.com/PratulDeshpande"
    }
  ]
};

// Flattened skills list for the Marquee
const SKILLS_LIST = [
  { name: "Python", iconClass: "devicon-python-plain" },
  { name: "C++", iconClass: "devicon-cplusplus-plain" },
  { name: "Embedded C", iconClass: "devicon-c-plain" },
  { name: "HTML5", iconClass: "devicon-html5-plain" },
  { name: "CSS3", iconClass: "devicon-css3-plain" },
  { name: "JavaScript", iconClass: "devicon-javascript-plain" },
  { name: "Node.js", iconClass: "devicon-nodejs-plain" },
  { name: "React", iconClass: "devicon-react-original" },
  { name: "Git", iconClass: "devicon-git-plain" },
  { name: "MySQL", iconClass: "devicon-mysql-plain" },
  { name: "Linux", iconClass: "devicon-linux-plain" },
  { name: "Raspberry Pi", iconClass: "devicon-raspberrypi-line" },
  { name: "Arduino", iconClass: "devicon-arduino-plain" },
  { name: "Matlab", iconClass: "devicon-matlab-plain" },
  { name: "CMake", iconClass: "devicon-cmake-plain" }
];

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

// --- NAVIGATION CONFIG ---
const NAV_ITEMS = [
  { id: 'home', label: 'Home', icon: Atom },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'projects', label: 'Projects', icon: Code },
  { id: 'research', label: 'Research', icon: BookOpen },
  { id: 'education', label: 'Education', icon: GraduationCap },
];

// --- MEMOIZED COMPONENTS ---

const NavButton = memo(({ title, active, onClick, icon: Icon }) => (
  <button
    onClick={onClick}
    className={`relative group flex items-center gap-2 px-4 py-3 md:px-5 md:py-2.5 rounded-full transition-all duration-300 border ${
      active 
        ? "bg-white/10 border-white/20 text-white shadow-[0_0_25px_rgba(59,130,246,0.3)] backdrop-blur-md" 
        : "bg-transparent border-transparent text-gray-400 hover:text-white hover:bg-white/5"
    }`}
    aria-label={title}
  >
    {/* Dynamic Icon Color based on Active State - Using Theme Gradient Colors */}
    {Icon && (
      <Icon 
        size={18} 
        className={`transition-colors duration-300 ${active ? 'text-cyan-400' : 'group-hover:text-purple-400'}`} 
      />
    )}
    <span className="hidden sm:inline uppercase tracking-[0.2em] text-[10px] font-bold">{title}</span>
    {active && (
      <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-[2px] bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full sm:hidden"></span>
    )}
  </button>
));

// FIXED: Simplified heading structure for reliable visibility across all devices
const SectionHeading = memo(({ children }) => (
  <motion.h2 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    // Moved gradient directly to class to avoid child-element clipping issues
    className="text-3xl sm:text-4xl md:text-5xl font-bold mb-12 relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-300 to-blue-500 drop-shadow-lg"
  >
    {children}
    <span className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-full"></span>
  </motion.h2>
));

const SkillsMarquee = memo(() => {
  return (
    // UPDATED: Changed bg-black/10 to bg-black/5 for transparency and padding to py-4 md:py-8 for thinner look
    <div className="w-full overflow-hidden relative py-4 md:py-8 bg-black/5 backdrop-blur-sm border-y border-white/5 hover:pause group mt-4 md:mt-8">
      {/* Gradient Masks - Increased width for stronger vignette */}
      <div className="absolute top-0 left-0 h-full w-16 md:w-48 bg-gradient-to-r from-[#050505] to-transparent z-20 pointer-events-none" />
      <div className="absolute top-0 right-0 h-full w-16 md:w-48 bg-gradient-to-l from-[#050505] to-transparent z-20 pointer-events-none" />
      
      <div className="flex w-max animate-scroll group-hover:[animation-play-state:paused]">
        {/* Double the list to create seamless loop */}
        {[...SKILLS_LIST, ...SKILLS_LIST].map((skill, index) => (
          <div key={index} className="flex items-center gap-2 md:gap-3 px-6 md:px-12 cursor-default group/skill">
            <i className={`${skill.iconClass} text-2xl md:text-4xl text-gray-300 group-hover/skill:text-cyan-400 transition-colors opacity-90`}></i>
            <span className="text-xs md:text-lg font-bold uppercase tracking-widest text-gray-300 group-hover/skill:text-transparent group-hover/skill:bg-clip-text group-hover/skill:bg-gradient-to-r group-hover/skill:from-cyan-400 group-hover/skill:to-blue-500 transition-colors">
              {skill.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
});

const GlassCard = memo(({ title, subtitle, details, image, link, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-10%" }}
    transition={{ delay: delay * 0.1, duration: 0.5 }}
    className="group relative bg-[#0a0a0a] rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.3)] text-left flex flex-col h-full border border-white/10 hover:border-blue-500/30"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

    {image && (
      <div className="h-40 sm:h-48 overflow-hidden relative flex-shrink-0">
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
    <div className="p-5 sm:p-6 relative z-20 flex flex-col flex-grow">
      <div className="mb-3">
        <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-300 group-hover:to-blue-400 transition-all leading-tight">{title}</h3>
        {subtitle && <div className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 text-xs font-mono mt-1.5 uppercase tracking-widest truncate">{subtitle}</div>}
      </div>
      <p className="text-gray-400 leading-relaxed text-sm mb-4 font-light flex-grow">{details}</p>
      
      {link && (
        <div className="mt-auto pt-2">
          <a 
            href={link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/50 rounded-full text-xs text-white font-bold tracking-widest uppercase transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]"
          >
            Explore <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      )}
    </div>
  </motion.div>
));

const TimelineItem = memo(({ role, company, period, description, index }) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ delay: index * 0.1 }}
    className="relative pl-8 md:pl-10 border-l border-white/10 pb-10 last:pb-0 text-left group"
  >
    <div className="absolute -left-[6px] top-2 w-3 h-3 rounded-full bg-[#050505] border border-white/30 group-hover:border-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-500 transition-all duration-300 shadow-[0_0_0_4px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_15px_rgba(59,130,246,0.6)]" />
    <div className="group-hover:translate-x-2 transition-transform duration-300">
      <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-1">
        <h3 className="text-lg font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-300 group-hover:to-blue-400 transition-all">{role}</h3>
        <span className="text-xs font-mono text-gray-500 mt-1 md:mt-0">{period}</span>
      </div>
      <div className="text-sm text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-bold mb-2 tracking-wide">{company}</div>
      <p className="text-gray-400 text-sm leading-relaxed font-light max-w-3xl">{description}</p>
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
    let apiKey = "";
    try {
      if (import.meta.env && import.meta.env.VITE_GEMINI_API_KEY) {
        apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      }
    } catch (e) {
      apiKey = "";
    }
    
    if (!apiKey) {
       setTimeout(() => {
          setChatHistory(prev => [...prev, { role: "model", parts: [{ text: "I am ready to answer! (Please configure VITE_GEMINI_API_KEY in your environment variables to enable real AI responses)." }] }]);
          setIsLoading(false);
       }, 1000);
       return;
    }

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
    const systemPrompt = `You are Pratul's professional AI assistant.
    RULES:
    1. Be CONCISE. Max 2-3 sentences per answer.
    2. Use bullet points for lists.
    3. NO fluff. Get straight to the point.
    4. If asked for resume: [Download Resume](/assets/resume.pdf)
    5. If answering about projects, use format: [Project Name](link)
    6. If the question is unrelated to Pratul, politely decline to answer.
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
          <a key={i} href={linkMatch[2]} target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline hover:text-purple-400 font-bold inline-flex items-center gap-1">
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
            className="bg-[#111] border border-white/10 rounded-2xl p-6 max-w-lg w-full shadow-2xl relative flex flex-col h-[70vh] max-h-[85vh] border-t-2 border-t-cyan-500/50"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white"><X size={20} /></button>
            <div className="flex items-center gap-3 mb-4 border-b border-white/10 pb-4">
              <div className="p-2 bg-gradient-to-br from-cyan-500/20 to-purple-600/20 rounded-full border border-cyan-500/30"><Sparkles size={18} className="text-cyan-300" /></div>
              <div><h3 className="text-lg font-bold text-white">Pratul's AI</h3><p className="text-xs text-gray-500">Ask anything about my work</p></div>
            </div>
            <div ref={chatContainerRef} className="flex-grow space-y-4 overflow-y-auto pr-2 custom-scrollbar mb-4">
              {chatHistory.map((msg, index) => (
                <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.role === 'model' && <Bot size={24} className="text-cyan-400 mr-2 mt-1 flex-shrink-0" />}
                  <div className={`p-3 rounded-2xl max-w-[85%] text-sm ${msg.role === 'user' ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-none' : 'bg-white/10 text-gray-200 rounded-bl-none'}`}>
                    {renderMessageText(msg.parts[0].text)}
                  </div>
                </div>
              ))}
              {isLoading && <div className="flex justify-start"><Bot size={24} className="text-cyan-400 mr-2 mt-1" /><div className="p-3 rounded-2xl bg-white/10 text-gray-400 rounded-bl-none text-xs flex items-center gap-1">Typing<span className="animate-pulse">...</span></div></div>}
            </div>
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input value={currentMessage} onChange={(e) => setCurrentMessage(e.target.value)} className="flex-grow bg-white/5 border border-white/10 rounded-lg p-3 text-white text-sm focus:border-cyan-500 outline-none transition-colors" placeholder="Ask me anything..." disabled={isLoading} />
              <button type="submit" disabled={isLoading || !currentMessage.trim()} className="p-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-lg disabled:opacity-50 transition-all shadow-lg hover:shadow-cyan-500/20"><ArrowUp size={18} /></button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- CONTACT MODAL ---
const ContactModal = ({ isOpen, onClose }) => {
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    const formData = new FormData(e.target);
    try {
      const response = await fetch("https://formsubmit.co/ajax/pratul.deshpande06@gmail.com", {
        method: "POST",
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
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
            className="bg-[#111] border border-white/10 rounded-2xl p-8 max-w-md w-full shadow-2xl relative max-h-[90vh] overflow-y-auto border-t-2 border-t-purple-500/50"
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
                <input type="text" name="_honey" className="hidden" />
                <input type="hidden" name="_captcha" value="false" />
                <input type="text" name="name" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-purple-500 outline-none transition-colors" placeholder="Your Name" required disabled={status === 'sending'} />
                <input type="email" name="email" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-purple-500 outline-none transition-colors" placeholder="Your Email" required disabled={status === 'sending'} />
                <textarea name="message" rows="4" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-purple-500 outline-none transition-colors" placeholder="Message..." required disabled={status === 'sending'} />
                <button type="submit" disabled={status === 'sending'} className={`w-full font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-all ${status === 'sending' ? 'bg-gray-600 cursor-not-allowed text-gray-300' : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-lg hover:shadow-purple-500/20'}`}>{status === 'sending' ? 'Sending...' : (<>Send Message <Send size={16} /></>)}</button>
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
  const [activeSection, setActiveSection] = useState('home');
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  // Track manual scrolling to prevent observer interference
  const isManualScroll = useRef(false);

  // Scroll to section handler
  const scrollToSection = (id) => {
    setActiveSection(id); // Immediately update UI
    isManualScroll.current = true; // Lock observer
    
    const element = document.getElementById(id);
    if (element) {
      // Offset for the fixed navbar height
      const yOffset = -80; 
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      
      // Unlock observer after scroll animation finishes (approx 1s)
      setTimeout(() => {
        isManualScroll.current = false;
      }, 1000);
    }
  };

  // Intersection Observer to update active nav item based on scroll position
  useEffect(() => {
    const observerOptions = {
      root: null,
      // Focus detection on the center 40% of the screen
      // -30% top margin, -30% bottom margin = 40% active area in middle
      rootMargin: '-30% 0px -30% 0px', 
      threshold: 0
    };

    const observerCallback = (entries) => {
      // Skip updates if we are manually scrolling via click
      if (isManualScroll.current) return;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    NAV_ITEMS.forEach(item => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  // Dedicated scroll listener to force 'Home' active when at top of page
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 150 && !isManualScroll.current) {
        setActiveSection('home');
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-[#050505] text-white font-sans overflow-hidden selection:bg-cyan-500/30">
      
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      <GeminiChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

      {/* BACKGROUND - OPTIMIZED VIDEO & OVERLAY */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Solid background color as immediate fallback */}
        <div className="absolute inset-0 bg-[#050505] z-0" />
        
        {/* Video Element - Hardware Accelerated & Fixed */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            preload="auto"
            onLoadedData={() => setIsVideoLoaded(true)}
            // 'transform-gpu' and 'will-change-transform' force GPU rendering
            className={`w-full h-full object-cover transition-opacity duration-1000 ease-in-out transform-gpu will-change-transform ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
            style={{ 
               // Standard absolute positioning is safer than 'fixed' on some mobile browsers inside a fixed container
               position: 'absolute',
               top: 0,
               left: 0,
               width: '100%',
               height: '100%',
               objectFit: 'cover'
            }}
          >
            <source src="/assets/space-loop.mp4" type="video/mp4" />
            <source src="https://assets.mixkit.co/videos/preview/mixkit-stars-in-space-1610-large.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Cinematic Overlays (Posh Effect) */}
        <div className="absolute inset-0 bg-black/40 z-10" /> 
        
        {/* Color Tints for Posh Aesthetic */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-900/10 via-purple-900/10 to-pink-900/10 z-10 pointer-events-none mix-blend-overlay"></div>

        {/* Radial Vignette */}
        <div 
            className="absolute inset-0 z-20 pointer-events-none"
            style={{
                background: 'radial-gradient(circle at center, transparent 0%, rgba(5,5,5,0.8) 100%)'
            }}
        />
        
        {/* Vertical Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#050505] z-20" />
      </div>

      {/* NAVIGATION - MOBILE OPTIMIZED */}
      <nav className="fixed top-4 md:top-8 z-50 w-full flex justify-center px-4">
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-full p-1.5 flex items-center gap-1 shadow-[0_0_30px_rgba(0,0,0,0.5)] ring-1 ring-white/5 transition-all duration-300 hover:border-white/20 hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]">
            {NAV_ITEMS.map((item) => (
                <NavButton 
                  key={item.id}
                  title={item.label} 
                  active={activeSection === item.id} 
                  onClick={() => scrollToSection(item.id)}
                  icon={item.icon}
                />
            ))}
        </div>
      </nav>

      {/* CONTENT AREA */}
      <main className="relative z-30 w-full max-w-[1920px] mx-auto flex flex-col items-center">
        
        {/* HOME SECTION */}
        {/* FIXED: Increased mobile bottom padding (pb-32) to push Marquee above footer, reduced top padding (pt-24) to fit better */}
        <section id="home" className="min-h-screen flex flex-col items-center justify-center pt-24 pb-32 sm:pt-32 sm:pb-20 md:pt-48 md:pb-32 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center text-center"
            >
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6 sm:mb-10 tracking-tight drop-shadow-2xl">
                Hi, I am <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-blue-400 to-purple-500 animate-gradient-x">Pratul.</span>
              </h1>
              
              <div className="flex flex-wrap justify-center gap-3 mb-6 sm:mb-10">
                {[
                  { icon: Code, label: "Software" },
                  { icon: Cpu, label: "Embedded" },
                  { icon: Atom, label: "Quantum" }
                ].map((skill, i) => (
                  <div key={i} className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/20 rounded-full backdrop-blur-md hover:bg-white/10 hover:border-cyan-500/30 transition-all duration-300 group">
                    <skill.icon size={14} className="text-cyan-400 group-hover:text-purple-400 transition-colors" />
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-200 group-hover:text-white">{skill.label}</span>
                  </div>
                ))}
              </div>

              <p className="text-sm sm:text-lg md:text-xl text-gray-300 font-light leading-relaxed mb-8 sm:mb-12 max-w-3xl mx-auto px-2">
                {portfolioData.personal.about}
              </p>

              {/* ACTION BUTTONS */}
              {/* Reduced margin-bottom for mobile to pull Marquee higher */}
              <div className="flex flex-wrap justify-center gap-5 mb-14 sm:mb-20">
                  <button onClick={() => scrollToSection('projects')} className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-100 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]">
                      View Work <ChevronRight size={18} />
                  </button>
                  <button onClick={() => setIsContactOpen(true)} className="px-8 py-3 border border-white/30 hover:bg-white/10 hover:border-cyan-400 text-white font-bold rounded-full transition-all flex items-center gap-2">
                      Contact <Mail size={18} />
                  </button>
                  <a href={portfolioData.personal.resumeLink} download className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-full transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(37,99,235,0.5)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)]">
                      Resume <FileText size={18} />
                  </a>
              </div>

              {/* SKILLS MARQUEE (REPLACED GRID) */}
              <div className="w-full max-w-[100vw] overflow-hidden flex flex-col items-center">
                 <h3 className="text-sm font-bold text-cyan-200/80 mb-4 uppercase tracking-[0.3em] drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]">Technologies</h3>
                 <SkillsMarquee />
              </div>

            </motion.div>
        </section>

        {/* EXPERIENCE SECTION */}
        <section id="experience" className="min-h-screen flex flex-col justify-center py-16 md:py-24 w-full max-w-4xl mx-auto px-4 sm:px-6">
            <div className="text-center w-full"><SectionHeading>Experience</SectionHeading></div>
            <div className="space-y-2 w-full">
              {portfolioData.experience.map((job, index) => (
                <TimelineItem key={index} {...job} index={index} />
              ))}
            </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="min-h-screen flex flex-col justify-center py-16 md:py-24 w-full max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center w-full"><SectionHeading>Selected Works</SectionHeading></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-left w-full">
              {portfolioData.projects.map((project, index) => (
                <GlassCard 
                  key={index} 
                  title={project.title} 
                  subtitle={project.tech} 
                  details={project.description} 
                  image={project.image} 
                  link={project.link}
                  delay={index} 
                />
              ))}
            </div>
        </section>

        {/* RESEARCH SECTION */}
        <section id="research" className="min-h-screen flex flex-col justify-center py-16 md:py-24 w-full max-w-6xl mx-auto px-4 sm:px-6">
             <div className="text-center w-full"><SectionHeading>Publications</SectionHeading></div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-left w-full">
               {portfolioData.research.map((paper, index) => (
                 <GlassCard key={index} title={paper.title} subtitle={paper.publication} details={paper.details} image={paper.image} link={paper.link} delay={index} />
               ))}
             </div>
        </section>

        {/* EDUCATION SECTION */}
        <section id="education" className="min-h-screen flex flex-col justify-center py-16 md:py-24 w-full max-w-4xl mx-auto mb-20 px-4 sm:px-6">
            <div className="text-center w-full"><SectionHeading>Education</SectionHeading></div>
            <div className="space-y-2 w-full">
              {portfolioData.education.map((edu, index) => (
                 <TimelineItem key={index} role={edu.degree} company={edu.institution} period={edu.period} description={edu.details} index={index} />
              ))}
            </div>
        </section>

      </main>

      {/* SOCIAL LINKS FOOTER */}
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

      {/* AI FAB - GRADIENT UPGRADE */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }} 
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
        whileHover="hover" 
        className="fixed bottom-24 right-4 md:right-8 z-50 flex flex-col items-end gap-2"
      >
        <motion.div 
          variants={{
            hover: { opacity: 0, transition: { duration: 0.2 } } 
          }}
          initial={{ y: 0 }}
          animate={{ y: [0, -5, 0] }} 
          transition={{ 
            y: { duration: 2, repeat: Infinity, ease: "easeInOut" } 
          }}
          className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl px-3 py-1.5 text-xs text-white font-medium shadow-[0_0_15px_rgba(59,130,246,0.5)] relative mr-2 hidden sm:block"
        >
          Ask me anything about Pratul!
          <div className="absolute -bottom-1 right-6 w-2 h-2 bg-white/10 border-b border-r border-white/20 transform rotate-45 backdrop-blur-xl"></div>
        </motion.div>

        <button
          onClick={() => setIsChatOpen(true)}
          className="relative w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(168,85,247,0.6)] hover:shadow-[0_0_50px_rgba(168,85,247,0.8)] text-white hover:scale-110 transition-all duration-300 border border-white/20"
        >
          <div className="absolute inset-0 rounded-full bg-white/20 animate-pulse"></div>
          <Sparkles size={28} className="relative z-10 md:w-8 md:h-8" />
        </button>
      </motion.div>

    </div>
  );
}