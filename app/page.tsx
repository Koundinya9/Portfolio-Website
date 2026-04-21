'use client';

import { useEffect, useState, useRef } from 'react';

export default function Home() {
  const [currentRole, setCurrentRole] = useState(0);
  const [fade, setFade] = useState(true);
  const [timelineProgress, setTimelineProgress] = useState(0);
  const [activeDates, setActiveDates] = useState<Set<number>>(new Set());
  const timelineRef = useRef<HTMLDivElement>(null);
  const dateRefs = useRef<(HTMLDivElement | null)[]>([]);

  const roles = [
    "I'm an AI Engineer",
    "I'm a Data Scientist",
    "I'm an ML Engineer",
    "I'm a Software Developer",
    "I'm an LLM Specialist"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentRole((prev) => (prev + 1) % roles.length);
        setFade(true);
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, [roles.length]);

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;

      const rect = timelineRef.current.getBoundingClientRect();
      const timelineTop = rect.top + window.scrollY;
      const timelineHeight = rect.height;
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      // Start filling when timeline enters viewport
      const start = timelineTop - windowHeight;
      const end = timelineTop + timelineHeight;

      // Calculate progress (0 to 100)
      const progress = Math.min(
        Math.max(((scrollPosition - start) / (end - start)) * 100, 0),
        100
      );

      setTimelineProgress(progress);

      // Check which dates should be active
      const newActiveDates = new Set<number>();
      dateRefs.current.forEach((dateRef, index) => {
        if (!dateRef || !timelineRef.current) return;

        const dateRect = dateRef.getBoundingClientRect();
        const dateTop = dateRect.top + window.scrollY;
        const timelineTopAbs = timelineRef.current.getBoundingClientRect().top + window.scrollY;

        // Calculate the red line position
        const redLinePosition = timelineTopAbs + (timelineHeight * progress / 100);

        // If red line has passed this date
        if (redLinePosition >= dateTop) {
          newActiveDates.add(index);
        }
      });

      setActiveDates(newActiveDates);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className="relative w-full h-screen overflow-hidden bg-transparent">
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <h1 className="text-5xl md:text-7xl font-light mb-6">
          <span className="text-white">Hello, I'm </span>
          <span className="text-red-500 font-normal">Koundinya</span>
        </h1>

        <p
          className={`text-2xl md:text-4xl text-white font-light mb-12 transition-opacity duration-300 ${
            fade ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {roles[currentRole]}
        </p>

        <div className="flex gap-6 mb-8">
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 border-2 border-gray-700 hover:border-red-500 text-gray-400 hover:text-red-500 transition-all duration-300"
            aria-label="LinkedIn"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 border-2 border-gray-700 hover:border-red-500 text-gray-400 hover:text-red-500 transition-all duration-300"
            aria-label="GitHub"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
          <a
            href="/resume.pdf"
            className="px-6 py-3 border-2 border-gray-700 hover:border-red-500 text-gray-400 hover:text-red-500 transition-all duration-300 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Resume
          </a>
        </div>

        <a
          href="#about"
          className="px-8 py-3 border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 text-lg flex items-center gap-2"
        >
          View my work
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </a>
        </div>
      </div>

      {/* About Section */}
      <section id="about" className="relative min-h-screen bg-transparent py-20 px-6 z-10">
        <div className="max-w-7xl mx-auto">
          {/* ABOUT Label */}
          <div className="mb-8">
            <span className="text-red-500 text-base tracking-widest uppercase font-light">ABOUT</span>
          </div>

          {/* Main Heading */}
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-20 max-w-5xl">
            AI systems engineer with a data foundation.
          </h2>

          {/* Two Column Content */}
          <div className="grid md:grid-cols-2 gap-16 mb-24">
            <div>
              <p className="text-gray-300 text-xl leading-relaxed">
                My background spans machine learning, information retrieval, analytics, and applied software engineering. At Carnegie Mellon, I focused on building AI systems that combine retrieval, reasoning, and business context. In industry, I've worked on enterprise assistants, ad-tech automation, supply-chain tooling, and chatbot retrieval quality.
              </p>
            </div>
            <div>
              <p className="text-gray-300 text-xl leading-relaxed">
                The kind of work I enjoy most sits between product ambiguity and technical rigor: taking a vague business need, designing an architecture around it, and iterating until the system is usable, measurable, and reliable.
              </p>
            </div>
          </div>

          {/* STRENGTHS Section */}
          <div className="mb-8">
            <span className="text-red-500 text-base tracking-widest uppercase font-light">STRENGTHS</span>
          </div>

          <h3 className="text-4xl md:text-5xl font-bold text-white mb-16">
            Where I create the most leverage.
          </h3>

          {/* Three Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-gray-800 p-10 border border-gray-700 hover:border-red-500 transition-all duration-300">
              <h4 className="text-2xl font-bold text-white mb-5">LLM Product Engineering</h4>
              <p className="text-gray-300 text-lg leading-relaxed">
                Shipping assistants and workflows that connect frontend experience, backend orchestration, and measurable quality.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-gray-800 p-10 border border-gray-700 hover:border-red-500 transition-all duration-300">
              <h4 className="text-2xl font-bold text-white mb-5">Retrieval & Evaluation</h4>
              <p className="text-gray-300 text-lg leading-relaxed">
                Designing RAG systems, retrieval strategies, and evaluation loops that reduce hallucinations and improve trust.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-gray-800 p-10 border border-gray-700 hover:border-red-500 transition-all duration-300">
              <h4 className="text-2xl font-bold text-white mb-5">Applied ML & Analytics</h4>
              <p className="text-gray-300 text-lg leading-relaxed">
                Framing machine learning use cases around actual decisions, not just models, especially in business and operational contexts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="relative min-h-screen bg-transparent py-20 px-6 z-10">
        <div className="max-w-7xl mx-auto">
          {/* EDUCATION Label */}
          <div className="mb-8">
            <span className="text-red-500 text-base tracking-widest uppercase font-light">EDUCATION</span>
          </div>

          {/* Main Heading */}
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-20 max-w-5xl">
            Academic Foundation.
          </h2>

          {/* Education Cards */}
          <div className="space-y-8">
            {/* Carnegie Mellon */}
            <div className="bg-gray-800 p-10 border border-gray-700 hover:border-red-500 transition-all duration-300">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3">Carnegie Mellon University, Heinz College</h3>
                  <p className="text-xl text-red-500 mb-2">Degree: Master's</p>
                  <p className="text-lg text-gray-300">Master of Information Systems Management with a concentration in Business Intelligence and Data Analytics</p>
                </div>
                <div className="text-right mt-4 md:mt-0 flex-shrink-0">
                  <p className="text-lg text-gray-300">Pittsburgh, Pennsylvania</p>
                  <p className="text-lg text-gray-400">August 2024 - December 2025</p>
                </div>
              </div>
            </div>

            {/* RV College */}
            <div className="bg-gray-800 p-10 border border-gray-700 hover:border-red-500 transition-all duration-300">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3">RV College of Engineering</h3>
                  <p className="text-xl text-red-500 mb-2">Degree: Bachelor's</p>
                  <p className="text-lg text-gray-300">Computer Science Engineering</p>
                </div>
                <div className="text-right mt-4 md:mt-0 flex-shrink-0">
                  <p className="text-lg text-gray-300">Bangalore, India</p>
                  <p className="text-lg text-gray-400">July 2019 - August 2023</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="relative min-h-screen bg-transparent py-20 px-6 z-10">
        <div className="max-w-7xl mx-auto">
          {/* EXPERIENCE Label */}
          <div className="mb-8">
            <span className="text-red-500 text-base tracking-widest uppercase font-light">EXPERIENCE</span>
          </div>

          {/* Main Heading */}
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-20 max-w-5xl">
            Professional Journey.
          </h2>

          {/* Timeline */}
          <div className="relative" ref={timelineRef}>
            {/* Vertical Line - Gray Background */}
            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-gray-700"></div>

            {/* Vertical Line - Red Progress */}
            <div
              className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-0.5 bg-red-500"
              style={{ height: `${timelineProgress}%` }}
            ></div>

            {/* Experience Items */}
            <div className="space-y-16">
              {/* Virtual Gold */}
              <div className="relative flex flex-col md:flex-row md:items-start gap-8">
                {/* Timeline Dot */}
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-red-500 rounded-full border-4 border-gray-900"></div>

                {/* Date - Right side on desktop */}
                <div className="md:w-1/2 md:text-right md:pr-12 pl-8 md:pl-0" ref={(el) => { dateRefs.current[0] = el; }}>
                  <p className={`text-xl font-semibold transition-colors duration-300 ${activeDates.has(0) ? 'text-red-500' : 'text-gray-700'}`}>
                    January 2026 - Present
                  </p>
                </div>

                {/* Content - Left side on desktop */}
                <div className="md:w-1/2 md:pl-12 pl-8 md:pl-12">
                  <div className="bg-gray-800 p-8 border border-gray-700 hover:border-red-500 transition-all duration-300">
                    <h3 className="text-2xl font-bold text-white mb-2">Consultant - AI Engineer</h3>
                    <p className="text-xl text-red-500 mb-4">Virtual Gold</p>
                    <p className="text-lg text-gray-400 mb-4">Pittsburgh, Pennsylvania</p>
                    <ul className="space-y-3 text-gray-300">
                      <li className="flex gap-3">
                        <span className="text-red-500 mt-1.5">▸</span>
                        <span>Migrated prototype from CrewAI to OpenClaw production architecture and deployed on DigitalOcean with ChatGPT OAuth integration, implementing isolated agent memory, persistent session management, and role-based tool access control</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-red-500 mt-1.5">▸</span>
                        <span>Implemented cost optimization strategy using multi-model routing (Claude Sonnet for complex reasoning, Gemini Flash for summarization), reducing average analysis cost by 40-60%</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-red-500 mt-1.5">▸</span>
                        <span>Developed custom MCP skills for regulatory enforcement tracking and market size estimation, expanding agent capabilities beyond base LLM knowledge</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Sandstorm */}
              <div className="relative flex flex-col md:flex-row-reverse md:items-start gap-8">
                {/* Timeline Dot */}
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-red-500 rounded-full border-4 border-gray-900"></div>

                {/* Date - Left side on desktop */}
                <div className="md:w-1/2 md:text-left md:pl-12 pl-8 md:pl-12" ref={(el) => { dateRefs.current[1] = el; }}>
                  <p className={`text-xl font-semibold transition-colors duration-300 ${activeDates.has(1) ? 'text-red-500' : 'text-gray-700'}`}>
                    June 2025 - August 2025
                  </p>
                </div>

                {/* Content - Right side on desktop */}
                <div className="md:w-1/2 md:pr-12 pl-8 md:pl-0">
                  <div className="bg-gray-800 p-8 border border-gray-700 hover:border-red-500 transition-all duration-300">
                    <h3 className="text-2xl font-bold text-white mb-2">Intern - Data Science</h3>
                    <p className="text-xl text-red-500 mb-4">Sandstorm</p>
                    <p className="text-lg text-gray-400 mb-4">Austin, Texas</p>
                    <ul className="space-y-3 text-gray-300">
                      <li className="flex gap-3">
                        <span className="text-red-500 mt-1.5">▸</span>
                        <span>Explored applications of Large Language Models (LLMs) for automating ad reporting and creative analysis, reducing manual reporting time by ~40%</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-red-500 mt-1.5">▸</span>
                        <span>Scoped machine learning-based use cases for ROAS forecasting and audience-specific creative recommendations, outlining models projected to improve campaign ROI by 10–15%</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-red-500 mt-1.5">▸</span>
                        <span>Collaborated with founder to design a roadmap for AI adoption in marketing analytics, aligning LLM capabilities with business reporting needs</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* O9 Solutions */}
              <div className="relative flex flex-col md:flex-row md:items-start gap-8">
                {/* Timeline Dot */}
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-red-500 rounded-full border-4 border-gray-900"></div>

                {/* Date - Right side on desktop */}
                <div className="md:w-1/2 md:text-right md:pr-12 pl-8 md:pl-0" ref={(el) => { dateRefs.current[2] = el; }}>
                  <p className={`text-xl font-semibold transition-colors duration-300 ${activeDates.has(2) ? 'text-red-500' : 'text-gray-700'}`}>
                    December 2023 - August 2024
                  </p>
                </div>

                {/* Content - Left side on desktop */}
                <div className="md:w-1/2 md:pl-12 pl-8 md:pl-12">
                  <div className="bg-gray-800 p-8 border border-gray-700 hover:border-red-500 transition-all duration-300">
                    <h3 className="text-2xl font-bold text-white mb-2">Application Software Engineer</h3>
                    <p className="text-xl text-red-500 mb-4">O9 Solutions</p>
                    <p className="text-lg text-gray-400 mb-4">Bangalore, India</p>
                    <ul className="space-y-3 text-gray-300">
                      <li className="flex gap-3">
                        <span className="text-red-500 mt-1.5">▸</span>
                        <span>Assembled and detailed an End-to-End dataset for the Allocation and Replenishment model, creating a detailed checklist of data required by customers to run Retail functionalities and Supply Chain Analytics</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-red-500 mt-1.5">▸</span>
                        <span>Directed development of plugins to help calculate various important KPIs in platform's pivots, utilizing Python and associated libraries</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-red-500 mt-1.5">▸</span>
                        <span>Created and modified the Demand Planning dataset for testing, designing 3+ time series scenarios and What-If cases, enabling realistic platform demonstrations</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Yellow.ai */}
              <div className="relative flex flex-col md:flex-row-reverse md:items-start gap-8">
                {/* Timeline Dot */}
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-red-500 rounded-full border-4 border-gray-900"></div>

                {/* Date - Left side on desktop */}
                <div className="md:w-1/2 md:text-left md:pl-12 pl-8 md:pl-12" ref={(el) => { dateRefs.current[3] = el; }}>
                  <p className={`text-xl font-semibold transition-colors duration-300 ${activeDates.has(3) ? 'text-red-500' : 'text-gray-700'}`}>
                    January 2023 - June 2023
                  </p>
                </div>

                {/* Content - Right side on desktop */}
                <div className="md:w-1/2 md:pr-12 pl-8 md:pl-0">
                  <div className="bg-gray-800 p-8 border border-gray-700 hover:border-red-500 transition-all duration-300">
                    <h3 className="text-2xl font-bold text-white mb-2">Intern - Software Engineer</h3>
                    <p className="text-xl text-red-500 mb-4">Yellow.ai</p>
                    <p className="text-lg text-gray-400 mb-4">Bangalore, India</p>
                    <ul className="space-y-3 text-gray-300">
                      <li className="flex gap-3">
                        <span className="text-red-500 mt-1.5">▸</span>
                        <span>Collaborated in the Document Cognition division within the NLP team, analyzing and benchmarking performance of diverse document information search and retrieval models for chatbot during a 6-month engagement</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-red-500 mt-1.5">▸</span>
                        <span>Led testing and evaluation of various Information Retrieval models, improving response accuracy by 6% over the company's chatbot; finalized the best-performing model for further testing</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative min-h-screen bg-transparent py-20 px-6 z-10">
        <div className="max-w-7xl mx-auto">
          {/* PROJECTS Label */}
          <div className="mb-8">
            <span className="text-red-500 text-base tracking-widest uppercase font-light">PROJECTS</span>
          </div>

          {/* Main Heading */}
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-20 max-w-5xl">
            Some Things I've Built.
          </h2>

          {/* Projects List */}
          <div className="space-y-24">
            {/* Enterprise AI Assistant */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Image */}
              <div className="bg-gray-800 border border-gray-700 aspect-video flex items-center justify-center">
                <span className="text-gray-600 text-2xl">Project Screenshot</span>
              </div>

              {/* Content */}
              <div>
                <div className="mb-4">
                  <span className="text-green-400 text-sm tracking-widest uppercase font-light">Featured Project</span>
                </div>
                <h3 className="text-3xl font-bold text-white mb-6">Enterprise AI Assistant</h3>
                <div className="bg-gray-800 p-6 border border-gray-700 mb-6">
                  <ul className="space-y-3 text-gray-300 text-lg">
                    <li className="flex gap-3">
                      <span className="text-red-500 mt-1.5">▸</span>
                      <span>Architected multi-agent LLM system with 12 specialized agents (competitive intelligence, financial analysis, regulatory monitoring) coordinating across Claude, Gemini, and GPT models to automate competitor research and strategic analysis</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-red-500 mt-1.5">▸</span>
                      <span>Implemented RAG-based retrieval pipeline using vector embeddings and contextual indexing to improve enterprise query accuracy and reduce hallucinated responses during knowledge retrieval</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-red-500 mt-1.5">▸</span>
                      <span>Built conversational analytics dashboard enabling real-time executive querying and automated strategic summaries</span>
                    </li>
                  </ul>
                </div>
                <div className="flex flex-wrap gap-3 mb-6">
                  <span className="text-gray-400">Python</span>
                  <span className="text-gray-400">LangChain</span>
                  <span className="text-gray-400">RAG</span>
                  <span className="text-gray-400">Vector DB</span>
                </div>
                <div className="flex gap-4">
                  <a href="#" className="p-3 border-2 border-gray-700 hover:border-red-500 text-gray-400 hover:text-red-500 transition-all duration-300">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                  <a href="#" className="px-6 py-3 border-2 border-gray-700 hover:border-red-500 text-gray-400 hover:text-red-500 transition-all duration-300 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Live Demo
                  </a>
                </div>
              </div>
            </div>

            {/* Customized Advert Generator */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Content - Left side */}
              <div className="md:order-1 order-2">
                <div className="mb-4">
                  <span className="text-green-400 text-sm tracking-widest uppercase font-light">Featured Project</span>
                </div>
                <h3 className="text-3xl font-bold text-white mb-6">Customized Advert Generator</h3>
                <div className="bg-gray-800 p-6 border border-gray-700 mb-6">
                  <ul className="space-y-3 text-gray-300 text-lg">
                    <li className="flex gap-3">
                      <span className="text-red-500 mt-1.5">▸</span>
                      <span>Developed an AI-driven video generation system to generate 5-10 second personalized video ads using Stable Diffusion and Transformer-based pipelines, with text-to-image synthesis from user prompts</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-red-500 mt-1.5">▸</span>
                      <span>Implemented RAG-based fine-tuning to adapt models using user-provided images, enhancing personalization and content relevance</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-red-500 mt-1.5">▸</span>
                      <span>Utilized Google's Vertex AI (Gemini) to enhance video customization, targeting ad companies for streamlined ad content creation</span>
                    </li>
                  </ul>
                </div>
                <div className="flex flex-wrap gap-3 mb-6">
                  <span className="text-gray-400">Stable Diffusion</span>
                  <span className="text-gray-400">Transformers</span>
                  <span className="text-gray-400">Vertex AI</span>
                  <span className="text-gray-400">Python</span>
                </div>
                <div className="flex gap-4">
                  <a href="#" className="p-3 border-2 border-gray-700 hover:border-red-500 text-gray-400 hover:text-red-500 transition-all duration-300">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                  <a href="#" className="px-6 py-3 border-2 border-gray-700 hover:border-red-500 text-gray-400 hover:text-red-500 transition-all duration-300 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Live Demo
                  </a>
                </div>
              </div>

              {/* Image - Right side */}
              <div className="bg-gray-800 border border-gray-700 aspect-video flex items-center justify-center md:order-2 order-1">
                <span className="text-gray-600 text-2xl">Project Screenshot</span>
              </div>
            </div>

            {/* Diabetes Risk Prediction */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Image */}
              <div className="bg-gray-800 border border-gray-700 aspect-video flex items-center justify-center">
                <span className="text-gray-600 text-2xl">Project Screenshot</span>
              </div>

              {/* Content */}
              <div>
                <div className="mb-4">
                  <span className="text-green-400 text-sm tracking-widest uppercase font-light">Featured Project</span>
                </div>
                <h3 className="text-3xl font-bold text-white mb-6">Diabetes Risk Prediction System</h3>
                <div className="bg-gray-800 p-6 border border-gray-700 mb-6">
                  <ul className="space-y-3 text-gray-300 text-lg">
                    <li className="flex gap-3">
                      <span className="text-red-500 mt-1.5">▸</span>
                      <span>Developed an end-to-end machine learning pipeline to predict diabetes risk using non-invasive lifestyle data, including data preprocessing, feature engineering, and model development</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-red-500 mt-1.5">▸</span>
                      <span>Evaluated and optimized multiple classification models using hyperparameter tuning and class imbalance techniques, achieving up to 92% accuracy</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-red-500 mt-1.5">▸</span>
                      <span>Improved model reliability for real-world use cases through rigorous testing and validation</span>
                    </li>
                  </ul>
                </div>
                <div className="flex flex-wrap gap-3 mb-6">
                  <span className="text-gray-400">Python</span>
                  <span className="text-gray-400">scikit-learn</span>
                  <span className="text-gray-400">Keras</span>
                  <span className="text-gray-400">pandas</span>
                </div>
                <div className="flex gap-4">
                  <a href="#" className="p-3 border-2 border-gray-700 hover:border-red-500 text-gray-400 hover:text-red-500 transition-all duration-300">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                  <a href="#" className="px-6 py-3 border-2 border-gray-700 hover:border-red-500 text-gray-400 hover:text-red-500 transition-all duration-300 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Live Demo
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="relative min-h-screen bg-transparent py-20 px-6 z-10 flex items-center justify-center">
        <div className="w-full">
          {/* SKILLS Label */}
          <div className="mb-8 text-center">
            <span className="text-red-500 text-base tracking-widest uppercase font-light">Skills</span>
          </div>

          {/* Main Heading */}
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-8 text-center">
            Technologies I Work With
          </h2>

          <p className="text-xl text-gray-400 text-center mb-20 max-w-3xl mx-auto">
            Cutting-edge tools and frameworks for building intelligent systems
          </p>

          {/* Scrolling Skills */}
          <div className="relative overflow-hidden w-full">
            {/* First Row - Scroll Left to Right */}
            <div className="flex gap-4 mb-6 w-max animate-scroll-right">
              {['Python', 'PyTorch', 'TensorFlow', 'Keras', 'pandas', 'NumPy', 'Machine Learning', 'Deep Learning', 'Transformers', 'LLMs', 'RAG', 'NLP', 'Git', 'VS Code', 'Python', 'PyTorch', 'TensorFlow', 'Keras', 'pandas', 'NumPy', 'Machine Learning', 'Deep Learning', 'Transformers', 'LLMs', 'RAG', 'NLP', 'Git', 'VS Code'].map((skill, i) => (
                <div key={i} className="px-6 py-3 border-2 border-gray-700 text-gray-300 text-lg whitespace-nowrap flex-shrink-0">
                  {skill}
                </div>
              ))}
            </div>

            {/* Second Row - Scroll Right to Left */}
            <div className="flex gap-4 mb-6 w-max animate-scroll-left">
              {['Java', 'SQL', 'scikit-learn', 'Matplotlib', 'Hadoop', 'Spark', 'Google Cloud', 'Vertex AI', 'CUDA', 'Kaggle', 'Excel', 'Tableau', 'Hyperparameter Tuning', 'Model Evaluation', 'Java', 'SQL', 'scikit-learn', 'Matplotlib', 'Hadoop', 'Spark', 'Google Cloud', 'Vertex AI', 'CUDA', 'Kaggle', 'Excel', 'Tableau', 'Hyperparameter Tuning', 'Model Evaluation'].map((skill, i) => (
                <div key={i} className="px-6 py-3 border-2 border-gray-700 text-gray-300 text-lg whitespace-nowrap flex-shrink-0">
                  {skill}
                </div>
              ))}
            </div>

            {/* Third Row - Scroll Left to Right */}
            <div className="flex gap-4 w-max animate-scroll-right-slow">
              {['Time Series Forecasting', 'Information Retrieval', 'Data Preprocessing', 'Feature Engineering', 'Data Visualization', 'GPU Training', 'Google Colab', 'Shorthand', 'RAG-based Fine-Tuning', 'Time Series Forecasting', 'Information Retrieval', 'Data Preprocessing', 'Feature Engineering', 'Data Visualization', 'GPU Training', 'Google Colab', 'Shorthand', 'RAG-based Fine-Tuning'].map((skill, i) => (
                <div key={i} className="px-6 py-3 border-2 border-gray-700 text-gray-300 text-lg whitespace-nowrap flex-shrink-0">
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative min-h-screen bg-transparent py-20 px-6 z-10 flex items-center justify-center">
        <div className="max-w-4xl mx-auto text-center">
          {/* CONTACT Label */}
          <div className="mb-8">
            <span className="text-red-500 text-base tracking-widest uppercase font-light">What's Next?</span>
          </div>

          {/* Main Heading */}
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-12">
            Get In Touch
          </h2>

          {/* Description */}
          <p className="text-xl text-gray-400 leading-relaxed mb-12 max-w-2xl mx-auto">
            I am currently looking for new opportunities and my inbox is always open. Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>

          {/* CTA Button */}
          <a
            href="mailto:vkpullel@andrew.cmu.edu"
            className="inline-block px-8 py-4 border-2 border-red-500 text-red-500 hover:bg-red-500 hover:bg-opacity-10 transition-all duration-300 text-lg"
          >
            Say Hello
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-transparent py-8 px-6 z-10 border-t border-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">
            Designed & Built by <span className="text-red-500">Pullela Venkata Koundinya</span>
          </p>
          <p className="text-gray-500 text-sm mt-2">
            © 2026 Pullela Venkata Koundinya. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
