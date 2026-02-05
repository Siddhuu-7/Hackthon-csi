import React, { useEffect, useRef, useState } from 'react';
import { motion, stagger, useAnimate, useInView } from "framer-motion";
import { ArrowRight, Users, FileText, Calendar, Award, Target, Zap, Trophy, Clock, MapPin, Mail, Phone, LogIn, LogOut, User, Image as Image1 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Image from '../assets/image.jpg';
import { Timeline } from "@/components/ui/timeline";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { FloatingNav } from "@/components/ui/floating-navbar";

// Previous Events Section Component
function PreviousEvents() {
  const boxRef = useRef(null);

  return (
    <section id="previous-events" className="relative py-20 px-4 md:px-8 bg-transparent border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Previous Events</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto"></div>
        </div>

        {/* DevOps Flowthon Feature */}
        <div ref={boxRef} className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 mb-20 hover:border-orange-500/30 transition-all duration-300 h-[500px] overflow-y-auto scrollbar-modern">
          <div className="grid md:grid-cols-2 gap-12 items-center p-8">
            <div className="order-2 md:order-1 space-y-6">
              <div className="inline-block px-4 py-1 bg-orange-500/20 text-orange-400 rounded-full text-sm font-semibold border border-orange-500/30">
                Hackathon 2024
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white">DEVOPS-FLOWTHON</h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                A groundbreaking 24-hour devops hackathon that brought together over 300 brilliant minds to revolutionize continuous integration and deployment workflows. Participants built cutting-edge automated pipelines and cloud-native solutions that pushed the boundaries of modern DevOps practices.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-gray-400 bg-white/5 px-4 py-2 rounded-lg">
                  <Users size={18} className="text-orange-500" />
                  <span>300+ Participants</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400 bg-white/5 px-4 py-2 rounded-lg">
                  <Trophy size={18} className="text-orange-500" />
                  <span>50+ Projects</span>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2 relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
              <div className="relative h-[300px] w-full bg-gray-800 rounded-2xl border border-white/10 overflow-hidden group-hover:transform group-hover:scale-[1.02] transition-all duration-300">
                {/* Placeholder for Demo Picture */}
                <div className="absolute inset-0 flex items-center justify-center bg-gray-800 text-gray-500">
                  <div className="text-center p-6">
                    <div className="bg-white/5 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                      <Image1 className="w-10 h-10 text-gray-400" />
                    </div>
                    <p className="text-sm font-medium">Event Highlight Image</p>
                    <p className="text-xs opacity-60 mt-1">1920x1080 Recommended</p>
                  </div>
                </div>
                {/* <img src="/path/to/event-image.jpg" alt="DevOps Flowthon" className="absolute inset-0 w-full h-full object-cover" /> */}
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-12"></div>

          {/* Winners Section */}
          <div className="mb-20">
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
              <Trophy className="text-yellow-500" size={24} />
              <span>2024 Winners</span>
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { place: '1st', team: 'CloudNinjas', college: 'IIT Bombay', members: ['Arjun K.', 'Priya S.', 'Rahul M.'], color: 'border-yellow-500/50 bg-yellow-500/5' },
                { place: '2nd', team: 'AutoMaters', college: 'NIT Trichy', members: ['Sarah J.', 'Mike R.', 'David L.'], color: 'border-gray-400/50 bg-gray-400/5' },
                { place: '3rd', team: 'PipelinePro', college: 'BITS Pilani', members: ['Neha G.', 'Varun P.', 'Amit K.'], color: 'border-orange-600/50 bg-orange-600/5' }
              ].map((winner, idx) => (
                <div key={idx} className={`relative bg-black/20 rounded-xl p-6 border ${winner.color} hover:-translate-y-1 transition-transform duration-300`}>
                  <div className="absolute -top-3 -right-3 w-10 h-10 bg-gray-900 rounded-full border border-white/20 flex items-center justify-center text-lg font-bold text-white shadow-xl">
                    {winner.place}
                  </div>
                  <h4 className="text-lg font-bold text-white mb-1">{winner.team}</h4>
                  <p className="text-gray-400 text-xs mb-3">{winner.college}</p>
                  <div className="space-y-2">
                    <p className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Team Members</p>
                    <div className="flex flex-wrap gap-1.5">
                      {winner.members.map((member, mIdx) => (
                        <span key={mIdx} className="text-xs text-gray-300 bg-white/5 px-2 py-1 rounded">
                          {member}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-12"></div>

          {/* Gallery Section - Card Stack Animation */}
          <GallerySection scrollContainerRef={boxRef} />
        </div>
      </div>
    </section>
  );
}

// Gallery Component with Infinite Scroll
function GallerySection() {
  const galleryImages = [
    { src: Image, caption: "Hackathon 2024 Highlight" },
    { src: Image, caption: "Team Collaboration" },
    { src: Image, caption: "Coding Session" },
    { src: Image, caption: "Mentorship Round" },
    { src: Image, caption: "Prize Distribution" },
  ];

  return (
    <div className="relative mt-20 flex flex-col items-center justify-center overflow-hidden rounded-md pb-20">
      <h3 className="text-3xl md:text-5xl font-bold text-white mb-12 text-center">
        Event Gallery
      </h3>
      <InfiniteMovingCards
        items={galleryImages}
        direction="right"
        speed="slow"
      />
    </div>
  );
}

export default function Home() {
  const canvasRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();
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
    <div className={`relative overflow-hidden bg-transparent transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
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

      <FloatingNav
        navItems={[
          { name: 'About', link: '#about', icon: <FileText size={18} /> },
          { name: 'Timeline', link: '#timeline', icon: <Clock size={18} /> },
          { name: 'Prizes', link: '#prizes', icon: <Trophy size={18} /> },
          { name: 'FAQ', link: '#faq', icon: <Target size={18} /> }
        ]}
        // actionButtons={
        //   isAuthenticated ? (
        //     <>
        //       <button
        //         onClick={() => handleNavigation('/registration')}
        //         className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-full text-xs hover:brightness-110 transition-all"
        //       >
        //         Register
        //       </button>
        //       <button
        //         onClick={async () => {
        //           await logout();
        //           navigate('/');
        //         }}
        //         className="bg-white/10 text-white p-2 rounded-full hover:bg-white/20 transition-all"
        //         title="Logout"
        //       >
        //         <LogOut size={16} />
        //       </button>
        //     </>
        //   ) : (
        //     <>
        //       <button
        //         onClick={() => handleNavigation('/auth')}
        //         className="px-4 py-2 text-white font-medium hover:text-orange-400 transition-colors text-sm"
        //       >
        //         Login
        //       </button>
        //       <button
        //         onClick={() => handleNavigation('/registration')}
        //         className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-full text-xs hover:brightness-110 transition-all"
        //       >
        //         Register
        //       </button>
        //     </>
        //   )
        // }
      />

      <section className="relative min-h-screen flex items-center justify-center px-4 md:px-8 pt-20">
        <div
          style={{
            transform: `translateY(${scrollY * 0.3}px)`,
          }}
          className="max-w-6xl mx-auto text-center [mask-image:linear-gradient(to_bottom,white_80%,transparent_100%)]"
        >
          <div className="inline-block px-4 py-2 bg-orange-500/20 border border-orange-500/40 rounded-full mb-6 backdrop-blur-sm">
            <span className="text-orange-400 font-semibold text-sm">🚀 Applications Open Now</span>
          </div>

          <div className="mb-6">
            <TypewriterEffect
              words={[
                { text: "Build.", className: "text-white" },
                { text: "Innovate.", className: "text-white" },
              ]}
              className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight"
            />
            <TypewriterEffect
              words={[
                { text: "Transform", className: "bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent" },
                { text: "Ideas", className: "bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent" },
              ]}
              className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight block mt-2"
              delay={1.5}
            />
          </div>

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
            <HoverBorderGradient as="div" containerClassName="rounded-xl" className="bg-gray-900/50 flex flex-col items-center justify-center p-4 w-full h-full">
              <div className="text-3xl font-bold text-white mb-1">500+</div>
              <div className="text-sm text-gray-400">Participants</div>
            </HoverBorderGradient>
            <HoverBorderGradient as="div" containerClassName="rounded-xl" className="bg-gray-900/50 flex flex-col items-center justify-center p-4 w-full h-full">
              <div className="text-3xl font-bold text-white mb-1">₹50K</div>
              <div className="text-sm text-gray-400">Prize Pool</div>
            </HoverBorderGradient>
            <HoverBorderGradient as="div" containerClassName="rounded-xl" className="bg-gray-900/50 flex flex-col items-center justify-center p-4 w-full h-full">
              <div className="text-3xl font-bold text-white mb-1">24hrs</div>
              <div className="text-sm text-gray-400">Duration</div>
            </HoverBorderGradient>
            <HoverBorderGradient as="div" containerClassName="rounded-xl" className="bg-gray-900/50 flex flex-col items-center justify-center p-4 w-full h-full">
              <div className="text-3xl font-bold text-white mb-1">10+</div>
              <div className="text-sm text-gray-400">Problems</div>
            </HoverBorderGradient>
          </div>
        </div>
      </section>

      <section id="about" className="relative py-20 px-4 md:px-8 overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-mono">
              About VIDBHAV
            </h2>
            <div className="w-20 h-1 bg-green-500 mx-auto shadow-[0_0_10px_#22c55e]"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid md:grid-cols-2 gap-8 items-center"
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="md:col-span-2 bg-white/5 backdrop-blur-md rounded-2xl p-2 border border-white/10 relative group overflow-hidden">
                <img
                  src={Image}
                  alt="Sample"
                  className="w-full h-90 md:h-[400px] object-cover rounded-xl shadow-2xl transition-all duration-500"
                />

              </div>
            </div>


            <div className="grid grid-cols-1 gap-4 h-full">
              {[
                { icon: <Calendar />, title: 'Event Date', desc: 'January 23-24, 2025' },
                { icon: <MapPin />, title: 'Venue', desc: 'SRKR Engineering College' },
                { icon: <Users />, title: 'Team Size', desc: '4-6 Members per Team' },
                { icon: <Trophy />, title: 'Registration', desc: '₹850 per member' }
              ].map((item, idx) => (
                <HoverBorderGradient key={idx} as="div" containerClassName="rounded-xl h-full w-full" className="flex flex-row items-center gap-4 bg-gray-900/50 p-4 w-full h-full cursor-default group text-left justify-start">
                  <div className="p-3 bg-orange-500/10 rounded-lg text-orange-500 group-hover:text-white group-hover:bg-orange-500 transition-colors shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-white font-semibold text-lg">{item.title}</div>
                    <div className="text-gray-400 text-sm">{item.desc}</div>
                  </div>
                </HoverBorderGradient>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/*Timeline Section*/}
      <section id="timeline" className="relative py-20 px-4 md:px-8 bg-transparent overflow-hidden">
        <Timeline
          data={[
            {
              title: "08:30 AM",
              content: (
                <div className="space-y-4">
                  <p className="text-gray-200 text-xs md:text-sm font-normal">
                    Registration & Breakfast
                  </p>
                  <p className="text-gray-200 text-xs md:text-sm font-normal">
                    Team check-in and networking
                  </p>
                </div>
              ),
            },
            {
              title: "09:00 AM",
              content: (
                <div className="space-y-4">
                  <p className="text-gray-200 text-xs md:text-sm font-normal">
                    Opening Ceremony
                  </p>
                  <p className="text-gray-200 text-xs md:text-sm font-normal">
                    Welcome address and problem statement reveal
                  </p>
                </div>
              ),
            },
            {
              title: "09:30 AM",
              content: (
                <div className="space-y-4">
                  <p className="text-gray-200 text-xs md:text-sm font-normal">
                    Hacking Begins
                  </p>
                  <p className="text-gray-200 text-xs md:text-sm font-normal">
                    24 hours of non-stop innovation
                  </p>
                </div>
              ),
            },
            {
              title: "12:30 PM",
              content: (
                <div className="space-y-4">
                  <p className="text-gray-200 text-xs md:text-sm font-normal">
                    Lunch Break
                  </p>
                  <p className="text-gray-200 text-xs md:text-sm font-normal">
                    Refresh and recharge
                  </p>
                </div>
              ),
            },
            {
              title: "08:00 PM",
              content: (
                <div className="space-y-4">
                  <p className="text-gray-200 text-xs md:text-sm font-normal">
                    Dinner & Checkpoint
                  </p>
                  <p className="text-gray-200 text-xs md:text-sm font-normal">
                    Progress review with mentors
                  </p>
                </div>
              ),
            },
            {
              title: "11:00 AM",
              content: (
                <div className="space-y-4">
                  <p className="text-gray-200 text-xs md:text-sm font-normal">
                    Submission Deadline
                  </p>
                  <p className="text-gray-200 text-xs md:text-sm font-normal">
                    Final submissions close
                  </p>
                </div>
              ),
            },
            {
              title: "02:00 PM",
              content: (
                <div className="space-y-4">
                  <p className="text-gray-200 text-xs md:text-sm font-normal">
                    Presentations
                  </p>
                  <p className="text-gray-200 text-xs md:text-sm font-normal">
                    Teams pitch their solutions
                  </p>
                </div>
              ),
            },
            {
              title: "05:00 PM",
              content: (
                <div className="space-y-4">
                  <p className="text-gray-200 text-xs md:text-sm font-normal">
                    Award Ceremony
                  </p>
                  <p className="text-gray-200 text-xs md:text-sm font-normal">
                    Winners announced!
                  </p>
                </div>
              ),
            },
          ]}
        />
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
              <div key={idx} className="relative group perspective-1000 h-full">
                <HoverBorderGradient as="div" containerClassName="rounded-2xl h-full" className={`relative h-full bg-gray-900/60 backdrop-blur-xl rounded-2xl p-8 border border-white/10 text-center transition-all duration-500 transform group-hover:-translate-y-2 group-hover:scale-105 group-hover:border-white/20 group-hover:bg-white/5 ${prize.shadow} hover:shadow-2xl flex flex-col items-center w-full justify-center gap-6`}>
                  <div className="text-7xl mb-6 transform group-hover:scale-110 transition-transform duration-300 drop-shadow-lg">{prize.icon}</div>
                  <h3 className="text-3xl font-bold text-white mb-2">{prize.place}</h3>
                  <div className={`text-4xl font-bold bg-gradient-to-r ${prize.color} bg-clip-text text-transparent mb-6`}>
                    {prize.prize}
                  </div>
                  <div className="py-3 px-4 bg-white/5 rounded-xl border border-white/5 group-hover:bg-white/10 transition-colors">
                    <p className="text-gray-300 text-sm font-medium">+ Certificates & Goodies</p>
                  </div>
                </HoverBorderGradient>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION: Previous Events & Gallery */}
      <PreviousEvents className="h-[500px]" />

      <section className="relative py-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="relative group">
            <HoverBorderGradient as="div" containerClassName="rounded-3xl mx-auto w-full" className="relative bg-gradient-to-r from-purple-900 to-pink-900 rounded-3xl p-12 text-center overflow-hidden w-full h-full">
              <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

              <div className="relative z-10 flex flex-col items-center">
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
            </HoverBorderGradient>
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
                <span className="text-white font-bold text-xl">VIDHBAV 2025</span>
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
                  <span className="text-sm">info@vidhbav.com</span>
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
              © 2024 VIDHBAV. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

const TypewriterEffect = ({
  words,
  className,
  cursorClassName = "",
  delay = 0
}) => {
  // split text into array of characters
  const wordsArray = words.map((word) => {
    return {
      ...word,
      text: word.text.split(""),
    };
  });

  const [scope, animate] = useAnimate();
  const isInView = useInView(scope);

  useEffect(() => {
    if (isInView) {
      animate("span", {
        display: "inline-block",
        opacity: 1,
        width: "fit-content",
      }, {
        duration: 0.3,
        delay: stagger(0.1, { startDelay: delay }),
        ease: "easeInOut",
      });
    }
  }, [isInView, delay]);

  const renderWords = () => {
    return (
      (<motion.div ref={scope} className="inline">
        {wordsArray.map((word, idx) => {
          return (
            (<div key={`word-${idx}`} className="inline-block">
              {word.text.map((char, index) => (
                <motion.span
                  initial={{
                  }}
                  key={`char-${index}`}
                  className={`dark:text-white text-black opacity-0 hidden ${word.className}`}>
                  {char}
                </motion.span>
              ))}
              &nbsp;
            </div>)
          );
        })}
      </motion.div>)
    );
  };
  return (
    (<div
      className={`text-center ${className}`}>
      {renderWords()}
    </div>)
  );
};