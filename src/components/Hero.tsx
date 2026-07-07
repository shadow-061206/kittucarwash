import { useEffect, useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Calendar, ArrowRight, Shield, Award, MapPin } from 'lucide-react';
import { BUSINESS_INFO } from '../data';
import { ParticleTextEffect } from './ui/particle-text-effect';

function AnimatedStat({ end, duration = 2, suffix = '', decimals = 0 }: { end: number; duration?: number; suffix?: string; decimals?: number }) {
  const [value, setValue] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let observer: IntersectionObserver;
    let animationFrameId: number;

    const startAnimation = () => {
      const startTime = performance.now();
      const run = (now: number) => {
        const elapsed = (now - startTime) / 1000;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (easeOutQuad)
        const easeProgress = progress * (2 - progress);
        const currentValue = easeProgress * end;
        
        setValue(currentValue);

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(run);
        } else {
          setValue(end);
        }
      };
      animationFrameId = requestAnimationFrame(run);
    };

    if (elementRef.current) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            startAnimation();
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(elementRef.current);
    }

    return () => {
      if (observer) observer.disconnect();
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [end, duration]);

  const formattedValue = decimals > 0 
    ? value.toFixed(decimals) 
    : Math.floor(value).toLocaleString();

  return (
    <span ref={elementRef} className="tabular-nums font-black">
      {formattedValue}{suffix}
    </span>
  );
}

interface HeroProps {
  onCtaclick: () => void;
  onExploreServices: () => void;
}

export default function Hero({ onCtaclick, onExploreServices }: HeroProps) {
  // Generate beautiful transparent floating blue circles/bubbles (5-10% opacity)
  const bubbles = Array.from({ length: 18 }).map((_, i) => {
    const size = 6 + (i % 5) * 4; // Sizes: 6px, 10px, 14px, 18px, 22px
    const startX = `${5 + (i * 5.2)}%`;
    const opacity = 0.04 + (i % 3) * 0.025; // Opacity strictly between 4% and 9% (extremely subtle)
    const duration = 12 + (i % 4) * 4; // Gentle float speed
    const delay = i * 0.6;
    return { size, startX, opacity, duration, delay };
  });

  return (
    <header className="relative min-h-[92vh] flex items-center bg-gradient-to-br from-brand-primary to-brand-secondary text-white overflow-hidden pt-20 pb-28 px-4 hero-container">
      {/* Fix: Add the missing H1 tag for the main brand title */}
      <h1 className="sr-only">Kittu Car Washing - Premium Detailing Station Patna Bihar</h1>

      {/* Dynamic Particle Text Background Effect */}
      <ParticleTextEffect isBackground={true} theme="dark" words={["KITTU", "CAR WASH", "PATNA", "GLOSS", "FOAM WASH", "DETAILING"]} />

      {/* Dynamic Floating Water Droplets Background */}
      {bubbles.map((bubble, i) => (
        <motion.div
          key={i}
          initial={{
            y: '105vh',
            x: bubble.startX,
            opacity: 0,
            scale: 0.8,
          }}
          animate={{
            y: '-10vh',
            opacity: [0, bubble.opacity, bubble.opacity, 0],
          }}
          transition={{
            duration: bubble.duration,
            repeat: Infinity,
            delay: bubble.delay,
            ease: 'linear',
          }}
          style={{
            width: bubble.size,
            height: bubble.size,
          }}
          className="absolute rounded-full bg-[#90E0EF]/30 border border-white/10 pointer-events-none blur-[0.5px] z-0 animate-pulse"
        />
      ))}

      {/* Radiant Glowing Orbs */}
      <div className="absolute top-1/4 -left-1/4 w-[500px] h-[500px] bg-white/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-white/10 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Texts Info Left */}
        <div className="lg:col-span-7 space-y-6 lg:space-y-8 text-left">
          <div className="flex flex-wrap items-center gap-3">
            <motion.div
              initial={{ opacity: 0, y: -25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 border border-white/30 text-white text-xs font-semibold uppercase tracking-wider top-rating-tag"
            >
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
              <span>Trusted Car Wash in Patna</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-yellow-400 border border-yellow-300 text-slate-900 text-xs font-extrabold uppercase tracking-wider shadow-lg shadow-yellow-400/25 animate-pulse"
            >
              <Calendar className="w-3.5 h-3.5 shrink-0" />
              <span>📅 Open Sundays (7 AM - 10 PM)</span>
            </motion.div>
          </div>

          <div className="space-y-4">
            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
              className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-none text-white font-display main-headline"
            >
              Make Your Car <br />
              <span className="gradient-text bg-gradient-to-r from-yellow-300 via-amber-200 to-orange-300 font-black">
                Shine Like New
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
              className="text-white/90 text-sm sm:text-base md:text-lg max-w-xl leading-relaxed"
            >
              We wash, clean, polish, and protect your car with professional care. Fast service, affordable prices, and a sparkling finish every time.
            </motion.p>
          </div>

          {/* Quick Location Badge */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
            className="flex flex-wrap gap-x-6 gap-y-2 text-xs sm:text-sm text-white/85"
          >
            <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/5">
              <span>📍 Kankarbagh Main Road, Patna</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/5">
              <span>💧 Soft Water Wash • Safe for Every Car</span>
            </div>
          </motion.div>

          {/* Call To Actions */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.button
              onClick={onCtaclick}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="px-8 py-4 rounded-xl bg-brand-cta hover:bg-[#00B4D8] text-brand-secondary font-extrabold text-base transition-all shadow-lg shadow-brand-cta/30 flex items-center justify-center gap-2 group cursor-pointer relative overflow-hidden"
            >
              {/* Glossy shine line sweeping across */}
              <div className="absolute inset-0 w-[40%] h-full bg-gradient-to-r from-transparent via-white/45 to-transparent pointer-events-none animate-shine" />
              <span>🟧 Book Your Wash</span>
              <ArrowRight className="w-4 h-4 text-brand-secondary/80 group-hover:translate-x-1.5 transition-transform" />
            </motion.button>

            <motion.button
              onClick={onExploreServices}
              whileHover={{ scale: 1.05, y: -2, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="px-8 py-4 rounded-xl border border-white/30 hover:border-white text-white font-bold text-base transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>🔵 View Services</span>
            </motion.button>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8, ease: "easeOut" }}
            className="grid grid-cols-3 gap-4 pt-8 border-t border-white/20 max-w-lg"
          >
            <div>
              <span className="text-2xl sm:text-3xl font-black text-white block tracking-tight">
                <AnimatedStat end={10} suffix="+" /> Years
              </span>
              <span className="text-[10px] sm:text-xs text-white/80 font-semibold uppercase tracking-wider mt-0.5 block">Experience</span>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-black text-white block tracking-tight">
                <AnimatedStat end={100000} suffix="+" />
              </span>
              <span className="text-[10px] sm:text-xs text-white/80 font-semibold uppercase tracking-wider mt-0.5 block">Cars Washed</span>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-black text-white block tracking-tight">
                <AnimatedStat end={4.9} suffix="★" decimals={1} />
              </span>
              <span className="text-[10px] sm:text-xs text-white/80 font-semibold uppercase tracking-wider mt-0.5 block">Customer Rating</span>
            </div>
          </motion.div>
        </div>

        {/* Glossy Car Image Right */}
        <div className="lg:col-span-5 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 1 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            whileHover={{ scale: 1.03, rotate: 1, boxShadow: "0 30px 60px -15px rgba(2, 62, 138, 0.4)" }}
            className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 aspect-[4/3] bg-white/5 cursor-pointer transition-shadow duration-300"
          >
            {/* Pressure wash spray overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent pointer-events-none z-10" />
            <img
              src="https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&q=80&w=1200"
              alt="Satisfying Automatic Car Wash with Blue Spinning Brushes and Foam"
              className="w-full h-full object-cover select-none"
              referrerPolicy="no-referrer"
            />

            {/* Glowing Tag */}
            <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md border border-brand-primary/20 px-3.5 py-1.5 rounded-lg flex items-center gap-1.5">
              <Award className="w-4 h-4 text-brand-primary" />
              <span className="text-[10px] font-bold text-brand-primary tracking-wider uppercase">Gloss Armor Certified</span>
            </div>
          </motion.div>

          {/* Floating Bubble Badges */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -bottom-6 -left-6 bg-brand-card/95 backdrop-blur-md border border-slate-200/80 p-4 rounded-xl shadow-xl flex items-center gap-3.5 max-w-[200px]"
          >
            <span className="text-2xl">🧼</span>
            <div className="space-y-0.5 text-left">
              <span className="text-xs font-extrabold text-slate-900 block">Active Foam wash</span>
              <span className="text-[10px] text-slate-500 block">Thick dirt release system</span>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-6 -right-6 bg-brand-card/95 backdrop-blur-md border border-slate-200/80 p-4 rounded-xl shadow-xl flex items-center gap-3.5 max-w-[200px]"
          >
            <span className="text-2xl">💧</span>
            <div className="space-y-0.5 text-left">
              <span className="text-xs font-extrabold text-slate-900 block">Hydrophobic coat</span>
              <span className="text-[10px] text-slate-500 block">Water repelling layers</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* SVG Wave Bottom Transition (Multi-Layered, Smooth Flowing) */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none z-10 select-none h-14 md:h-24">
        {/* Layer 1: Background slow wave (semi-transparent) */}
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute bottom-0 left-0 w-[200%] md:w-[150%] xl:w-full h-full text-[#90E0EF]/15 fill-current animate-wave-move"
          style={{ 
            animationDuration: '18s',
            transform: "translateX(0)" 
          }}
        >
          <path
            d="M0,50 C150,90 350,20 500,60 C650,100 850,40 1000,70 C1150,100 1350,30 1440,50 L1440,120 L0,120 Z"
          />
        </svg>

        {/* Layer 2: Middle wave with reverse direction or different phase (semi-transparent) */}
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute bottom-0 left-0 w-[200%] md:w-[150%] xl:w-full h-full text-[#00B4D8]/10 fill-current animate-wave-move"
          style={{ 
            animationDuration: '13s',
            animationDirection: 'reverse',
            transform: "translateX(0)" 
          }}
        >
          <path
            d="M0,32L60,42.7C120,53,240,75,360,74.7C480,75,600,53,720,42.7C840,32,960,32,1080,37.3C1200,43,1320,53,1380,58.7L1440,64L1440,120 L0,120 Z"
          />
        </svg>

        {/* Layer 3: Solid foreground wave that blends 100% with Services background */}
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute bottom-0 left-0 w-[200%] md:w-[150%] xl:w-full h-full text-[#F0F9FF] fill-current animate-wave-move"
          style={{ 
            animationDuration: '9s',
            transform: "translateX(0)" 
          }}
        >
          <path
            d="M0,32L60,42.7C120,53,240,75,360,74.7C480,75,600,53,720,42.7C840,32,960,32,1080,37.3C1200,43,1320,53,1380,58.7L1440,64L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"
          />
        </svg>
      </div>
    </header>
  );
}
