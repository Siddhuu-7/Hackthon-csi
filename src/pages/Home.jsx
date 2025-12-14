import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Users, FileText, Calendar, Award, Target, Zap, Trophy, Clock, MapPin, Mail, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
export default function Home() {
  const canvasRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);
  const navigate=useNavigate();
  useEffect(() => {
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
    <div className="relative overflow-hidden bg-gray-900">
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
              <span className="text-white font-bold text-xl">InnoHack 2025</span>
            </div>
            
            <div className="hidden md:flex items-center gap-6">
              <a href="#about" className="text-gray-300 hover:text-white transition-colors">About</a>
              <a href="#timeline" className="text-gray-300 hover:text-white transition-colors">Timeline</a>
              <a href="#prizes" className="text-gray-300 hover:text-white transition-colors">Prizes</a>
              <a href="#faq" className="text-gray-300 hover:text-white transition-colors">FAQ</a>
            </div>

            <button
              onClick={() => handleNavigation('/registration')}
              className="px-6 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg hover:brightness-110 transition-all"
            >
              Register
            </button>
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
              onClick={() => handleNavigation('/problem-statements')}
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

      <section id="about" className="relative py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">About InnoHack</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-4">What is InnoHack?</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                InnoHack 2025 is a premier 24-hour hackathon where teams of passionate developers, designers, and innovators come together to build solutions that matter.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Choose from 10+ problem statements across various domains, collaborate with your team, and create innovative solutions with guidance from industry mentors.
              </p>
            </div>

            <div className="space-y-4">
              {[
                { icon: <Calendar />, title: 'Event Date', desc: 'January 20-21, 2025' },
                { icon: <MapPin />, title: 'Venue', desc: 'SRKR Engineering College' },
                { icon: <Users />, title: 'Team Size', desc: '4-6 Members per Team' },
                { icon: <Trophy />, title: 'Registration', desc: '₹500 per member' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all">
                  <div className="p-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg text-white">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-white font-semibold">{item.title}</div>
                    <div className="text-gray-400 text-sm">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="timeline" className="relative py-20 px-4 md:px-8 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Event Timeline</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto"></div>
          </div>

          <div className="space-y-8">
            {[
              { time: '09:00 AM', title: 'Registration & Breakfast', desc: 'Team check-in and networking' },
              { time: '10:00 AM', title: 'Opening Ceremony', desc: 'Welcome address and problem statement reveal' },
              { time: '11:00 AM', title: 'Hacking Begins', desc: '24 hours of non-stop innovation' },
              { time: '03:00 PM', title: 'Lunch Break', desc: 'Refresh and recharge' },
              { time: '08:00 PM', title: 'Dinner & Checkpoint', desc: 'Progress review with mentors' },
              { time: '11:00 AM', title: 'Submission Deadline', desc: 'Final submissions close' },
              { time: '02:00 PM', title: 'Presentations', desc: 'Teams pitch their solutions' },
              { time: '05:00 PM', title: 'Award Ceremony', desc: 'Winners announced!' }
            ].map((event, idx) => (
              <div key={idx} className="flex gap-6 items-start group">
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 bg-orange-500 rounded-full group-hover:scale-125 transition-transform"></div>
                  {idx !== 7 && <div className="w-0.5 h-16 bg-gradient-to-b from-orange-500 to-transparent"></div>}
                </div>
                <div className="flex-1 bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 group-hover:bg-white/10 transition-all">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                    <h3 className="text-xl font-bold text-white">{event.title}</h3>
                    <span className="text-orange-400 font-semibold flex items-center gap-2">
                      <Clock size={16} />
                      {event.time}
                    </span>
                  </div>
                  <p className="text-gray-400">{event.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="prizes" className="relative py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Prizes & Rewards</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { place: '1st Place', prize: '₹15,000', icon: '🥇', color: 'from-yellow-500 to-yellow-600' },
              { place: '2nd Place', prize: '₹10,000', icon: '🥈', color: 'from-gray-400 to-gray-500' },
              { place: '3rd Place', prize: '₹5,000', icon: '🥉', color: 'from-orange-600 to-orange-700' }
            ].map((prize, idx) => (
              <div key={idx} className="relative group">
                <div className={`absolute inset-0 bg-gradient-to-r ${prize.color} rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity`}></div>
                <div className="relative bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-center hover:scale-105 transition-transform">
                  <div className="text-6xl mb-4">{prize.icon}</div>
                  <h3 className="text-2xl font-bold text-white mb-2">{prize.place}</h3>
                  <div className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent mb-4">
                    {prize.prize}
                  </div>
                  <p className="text-gray-400 text-sm">+ Certificates & Goodies</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
            <div className="relative bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Innovate?
              </h2>
              <p className="text-white/90 text-lg mb-8">
                Don't miss this opportunity to showcase your skills and win amazing prizes!
              </p>
              <button
                onClick={() => handleNavigation('/registration')}
                className="px-10 py-5 bg-white text-orange-600 font-bold text-xl rounded-xl hover:bg-gray-100 transition-all transform hover:scale-105 inline-flex items-center gap-3 shadow-lg"
              >
                <Users size={28} />
                <span>Register Your Team Now</span>
                <ArrowRight size={24} />
              </button>
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