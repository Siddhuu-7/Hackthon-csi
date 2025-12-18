import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Users, FileText, Calendar, Award, Target, Zap, Trophy, Clock, MapPin, Mail, Phone, LogIn, LogOut, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Image from '../assets/image.jpg';
import { useAuth } from '../context/AuthContext';

// Timeline Event Component with individual scroll tracking
function TimelineEvent({ event, idx, totalEvents }) {
  const eventRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 } // Trigger when 30% of event is visible
    );

    if (eventRef.current) {
      observer.observe(eventRef.current);
    }

    return () => {
      if (eventRef.current) {
        observer.unobserve(eventRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={eventRef}
      className={`relative flex flex-col md:flex-row gap-8 items-center group/item transition-all duration-700 ease-out ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
    >
      {/* Content Side */}
      <div className="flex-1 w-full md:w-1/2 pl-12 md:pl-0 z-20">
        <div className={`bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:bg-white/10 hover:border-orange-500/50 transition-all duration-300 group hover:shadow-xl hover:shadow-orange-500/10 ${idx % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
          <div className={`flex flex-col gap-2 mb-3 ${idx % 2 === 0 ? 'md:items-end' : 'md:items-start'}`}>
            <h3 className="text-2xl font-bold text-white group-hover:text-orange-400 transition-colors">{event.title}</h3>
            <span className="text-orange-400 font-semibold flex items-center gap-2 bg-orange-500/10 px-3 py-1 rounded-full w-fit">
              <Clock size={16} />
              {event.time}
            </span>
          </div>
          <p className="text-gray-400 leading-relaxed">{event.desc}</p>
        </div>
      </div>

      {/* Center Dot */}
      <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-gray-800 rounded-full border-2 border-orange-500 z-30 md:-translate-x-1/2 group-hover/item:bg-orange-500 group-hover/item:shadow-[0_0_15px_rgba(249,115,22,0.8)] transition-all duration-300"></div>

      {/* Connecting Line to Next Event */}
      {idx < totalEvents - 1 && (
        <div
          className="absolute left-[1.2rem] md:left-1/2 top-1/2 w-0.5 h-[calc(100%+3rem)] opacity-0 group-hover/item:opacity-100 group-hover/item:timeline-glow-animate transition-opacity duration-500 z-10 md:-translate-x-1/2"
          style={{
            background: 'linear-gradient(180deg, rgba(168, 85, 247, 0) 0%, rgba(168, 85, 247, 0.9) 25%, rgba(217, 70, 239, 0.9) 50%, rgba(168, 85, 247, 0.9) 75%, rgba(168, 85, 247, 0) 100%)',
            backgroundSize: '100% 200%',
            boxShadow: '0 0 15px rgba(168, 85, 247, 0.8), 0 0 25px rgba(217, 70, 239, 0.6)'
          }}
        ></div>
      )}

      {/* Empty Side for Balance */}
      <div className="hidden md:block flex-1"></div>
    </div>
  );
}

export default function Home() {
  const canvasRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  useEffect(() => {
    setIsLoaded(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particles = [];
    const particleCount = 50;
    const maxDistance = 150;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.4 + 0.2;

        const leftSide = this.x < canvas.width / 2;
        if (leftSide) {
          this.color = { r: 80, g: 150, b: 255 };
        } else {
          this.color = { r: 220, g: 80, b: 200 };
        }
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        this.x = Math.max(0, Math.min(canvas.width, this.x));
        this.y = Math.max(0, Math.min(canvas.height, this.y));
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const drawConnections = () => {
      for (let i = 0; i < particles.length; i++) {
        const checkLimit = Math.min(i + 12, particles.length);
        for (let j = i + 1; j < checkLimit; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = dx * dx + dy * dy;
          const maxDistSq = maxDistance * maxDistance;

          if (distance < maxDistSq) {
            const actualDist = Math.sqrt(distance);
            const opacity = (1 - actualDist / maxDistance) * 0.2;
            const avgColor = {
              r: (particles[i].color.r + particles[j].color.r) / 2,
              g: (particles[i].color.g + particles[j].color.g) / 2,
              b: (particles[i].color.b + particles[j].color.b) / 2
            };

            ctx.beginPath();
            ctx.strokeStyle = `rgba(${avgColor.r}, ${avgColor.g}, ${avgColor.b}, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawConnections();
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleNavigation = (path) => {
    navigate(path)
  };

  return (
    <div className={`relative overflow-hidden bg-gray-900 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <div className="fixed top-0 left-0 w-full h-full -z-10">
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            background: 'linear-gradient(135deg, #0a1128 0%, #1a0a2e 25%, #2d1b4e 50%, #3d1e5c 75%, #4a1942 100%)'
          }}
        />

        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full"
          style={{ mixBlendMode: 'screen', opacity: 0.6 }}
        />
      </div>

      <nav className="relative z-50 bg-black/30 backdrop-blur-md border-b border-white/10 sticky top-0">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                <Zap className="text-white" size={24} />
              </div>
              <span className="text-white font-bold text-xl">VIDBHAV 2025</span>
            </div>

            <div className="hidden md:flex items-center gap-6">
              <a href="#about" className="text-gray-300 hover:text-white transition-colors">About</a>
              <a href="#timeline" className="text-gray-300 hover:text-white transition-colors">Timeline</a>
              <a href="#prizes" className="text-gray-300 hover:text-white transition-colors">Prizes</a>
              <a href="#faq" className="text-gray-300 hover:text-white transition-colors">FAQ</a>
            </div>

            <div className="flex items-center gap-3">
              {isAuthenticated ? (
                <>
                  <div className="hidden sm:flex items-center gap-2 text-gray-300">
                    <User size={18} />
                    <span className="text-sm">{user?.name || user?.email}</span>
                  </div>
                  <button
                    onClick={() => handleNavigation('/registration')}
                    className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg hover:brightness-110 transition-all"
                  >
                    Register Team
                  </button>
                  <button
                    onClick={async () => {
                      await logout();
                      navigate('/');
                    }}
                    className="px-4 py-2 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-all flex items-center gap-2"
                  >
                    <LogOut size={18} />
                    <span className="hidden sm:inline">Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleNavigation('/auth')}
                    className="px-4 py-2 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-all flex items-center gap-2"
                  >
                    <LogIn size={18} />
                    <span>Login</span>
                  </button>
                  <button
                    onClick={() => handleNavigation('/registration')}
                    className="px-6 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg hover:brightness-110 transition-all"
                  >
                    Register
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <section className="relative min-h-screen flex items-center justify-center px-4 md:px-8 pt-20">
        <div
          className="max-w-6xl mx-auto text-center"
          style={{
            transform: `translateY(${scrollY * 0.3}px)`,
            opacity: 1 - scrollY / 800
          }}
        >
          <div className="inline-block px-4 py-2 bg-orange-500/20 border border-orange-500/40 rounded-full mb-6 backdrop-blur-sm">
            <span className="text-orange-400 font-semibold text-sm">🚀 Applications Open Now</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
            Build. Innovate.
            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Transform Ideas
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Join 500+ innovators in a 24-hour hackathon to solve real-world problems and win amazing prizes
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button
              onClick={() => handleNavigation('/registration')}
              className="group px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3"
            >
              <Users size={24} />
              <span>Register Your Team</span>
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </button>

            <button
              onClick={() => handleNavigation('/statement')}
              className="group px-8 py-4 bg-white/5 backdrop-blur-md text-white font-bold text-lg rounded-xl border-2 border-white/20 hover:bg-white/10 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3"
            >
              <FileText size={24} />
              <span>Problem Statements</span>
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10">
              <div className="text-3xl font-bold text-white mb-1">500+</div>
              <div className="text-sm text-gray-400">Participants</div>
            </div>
            <div className="bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10">
              <div className="text-3xl font-bold text-white mb-1">₹50K</div>
              <div className="text-sm text-gray-400">Prize Pool</div>
            </div>
            <div className="bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10">
              <div className="text-3xl font-bold text-white mb-1">24hrs</div>
              <div className="text-sm text-gray-400">Duration</div>
            </div>
            <div className="bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10">
              <div className="text-3xl font-bold text-white mb-1">10+</div>
              <div className="text-sm text-gray-400">Problems</div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="relative py-20 px-4 md:px-8 overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <div
            className="text-center mb-16 transition-all duration-1000"
            style={{
              opacity: scrollY > 300 ? 1 : 0,
              transform: `translateY(${scrollY > 300 ? 0 : 50}px)`
            }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-mono">
              {scrollY > 300 ? (
                <span className="animate-pulse text-green-400">About VIDBHAV</span>
              ) : (
                "About VIDBHAV"
              )}
            </h2>
            <div className="w-20 h-1 bg-green-500 mx-auto shadow-[0_0_10px_#22c55e]"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="md:col-span-2 bg-white/5 backdrop-blur-md rounded-2xl p-2 border border-white/10 relative group overflow-hidden">
                {/* Scanline Effect */}
                {/*<div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/10 to-transparent w-full h-full z-20 animate-[scan_2s_linear_infinite] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>*/}

                <img
                  src={Image}
                  alt="Sample"
                  className="w-full h-90 md:h-[400px] object-cover rounded-xl shadow-2xl transition-all duration-500"
                />

                {/* Glitch Overlay */}
                {/*<div className="absolute inset-0 bg-green-500/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>*/}
              </div>
            </div>


            <div className="space-y-4">
              {[
                { icon: <Calendar />, title: 'Event Date', desc: 'January 23-24, 2025' },
                { icon: <MapPin />, title: 'Venue', desc: 'SRKR Engineering College' },
                { icon: <Users />, title: 'Team Size', desc: '4-6 Members per Team' },
                { icon: <Trophy />, title: 'Registration', desc: '₹850 per member' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10 hover:bg-white/10 hover:border-orange-500/50 hover:scale-105 transition-all duration-300 cursor-default group">
                  <div className="p-3 bg-orange-500/10 rounded-lg text-orange-500 group-hover:text-white group-hover:bg-orange-500 transition-colors">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-white font-semibold text-lg">{item.title}</div>
                    <div className="text-gray-400 text-sm">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="timeline" className="relative py-20 px-4 md:px-8 bg-black/20 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Event Timeline</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto"></div>
          </div>

          <div className="relative">
            {/* Continuous Vertical Line */}
            {/* MAIN CONTINUOUS VERTICAL LINE */}
            <div className="absolute left-[1.2rem] md:left-1/2 top-0 bottom-0 w-0.5 bg-white/20 md:-translate-x-1/2 z-0"></div>


            <div className="space-y-12">
              {[
                { time: '08:30 AM', title: 'Registration & Breakfast', desc: 'Team check-in and networking' },
                { time: '09:00 AM', title: 'Opening Ceremony', desc: 'Welcome address and problem statement reveal' },
                { time: '09:30 AM', title: 'Hacking Begins', desc: '24 hours of non-stop innovation' },
                { time: '12:30 PM', title: 'Lunch Break', desc: 'Refresh and recharge' },
                { time: '08:00 PM', title: 'Dinner & Checkpoint', desc: 'Progress review with mentors' },
                { time: '11:00 AM', title: 'Submission Deadline', desc: 'Final submissions close' },
                { time: '02:00 PM', title: 'Presentations', desc: 'Teams pitch their solutions' },
                { time: '05:00 PM', title: 'Award Ceremony', desc: 'Winners announced!' }
              ].map((event, idx, arr) => (
                <TimelineEvent key={idx} event={event} idx={idx} totalEvents={arr.length} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="prizes" className="relative py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Prizes & Rewards</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { place: '1st Place', prize: '₹15,000', icon: '🥇', color: 'from-yellow-400 to-yellow-600', shadow: 'shadow-yellow-500/20' },
              { place: '2nd Place', prize: '₹10,000', icon: '🥈', color: 'from-gray-300 to-gray-500', shadow: 'shadow-gray-500/20' },
              { place: '3rd Place', prize: '₹5,000', icon: '🥉', color: 'from-orange-500 to-orange-700', shadow: 'shadow-orange-500/20' }
            ].map((prize, idx) => (
              <div key={idx} className="relative group perspective-1000">
                <div className={`absolute inset-0 bg-gradient-to-r ${prize.color} rounded-2xl blur-2xl opacity-20 group-hover:opacity-60 transition-opacity duration-500`}></div>
                <div className={`relative h-full bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 text-center transition-all duration-500 transform group-hover:-translate-y-2 group-hover:scale-105 group-hover:border-white/20 ${prize.shadow} hover:shadow-2xl`}>
                  <div className="text-7xl mb-6 transform group-hover:scale-110 transition-transform duration-300 drop-shadow-lg">{prize.icon}</div>
                  <h3 className="text-3xl font-bold text-white mb-2">{prize.place}</h3>
                  <div className={`text-4xl font-bold bg-gradient-to-r ${prize.color} bg-clip-text text-transparent mb-6`}>
                    {prize.prize}
                  </div>
                  <div className="py-3 px-4 bg-white/5 rounded-xl border border-white/5 group-hover:bg-white/10 transition-colors">
                    <p className="text-gray-300 text-sm font-medium">+ Certificates & Goodies</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
            <div className="relative bg-gradient-to-r from-purple-900 to-pink-900 rounded-3xl p-12 text-center border border-white/10 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

              <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                  Ready to Innovate?
                </h2>
                <p className="text-purple-100 text-xl mb-10 max-w-2xl mx-auto">
                  Don't miss this opportunity to showcase your skills, network with peers, and win amazing prizes!
                </p>
                <button
                  onClick={() => handleNavigation('/registration')}
                  className="px-10 py-5 bg-white text-purple-900 font-bold text-xl rounded-xl hover:bg-gray-100 transition-all transform hover:scale-105 hover:shadow-xl inline-flex items-center gap-3"
                >
                  <Users size={28} />
                  <span>Register Your Team Now</span>
                  <ArrowRight size={24} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative py-12 px-4 md:px-8 border-t border-white/10 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                  <Zap className="text-white" size={24} />
                </div>
                <span className="text-white font-bold text-xl">InnoHack 2025</span>
              </div>
              <p className="text-gray-400 text-sm">
                Empowering innovation through collaborative problem-solving
              </p>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Quick Links</h3>
              <div className="space-y-2">
                <a href="#about" className="block text-gray-400 hover:text-white transition-colors">About</a>
                <a href="#timeline" className="block text-gray-400 hover:text-white transition-colors">Timeline</a>
                <a href="#prizes" className="block text-gray-400 hover:text-white transition-colors">Prizes</a>
              </div>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Contact Us</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-400">
                  <Mail size={16} />
                  <span className="text-sm">info@innohack.com</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Phone size={16} />
                  <span className="text-sm">+91 98765 43210</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 text-center">
            <p className="text-gray-400 text-sm">
              © 2024 InnoHack. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}