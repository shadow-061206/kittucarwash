import { motion } from 'motion/react';
import { Sparkles, Calendar, ArrowRight, Shield, Award, MapPin } from 'lucide-react';
import { BUSINESS_INFO } from '../data';

interface HeroProps {
  onCtaclick: () => void;
  onExploreServices: () => void;
}

export default function Hero({ onCtaclick, onExploreServices }: HeroProps) {
  // Bubbles generator helper for subtle water droplet float animations
  const droplets = Array.from({ length: 8 });

  return (
    <header className="relative min-h-[90vh] flex items-center bg-slate-950 text-white overflow-hidden py-20 px-4 hero-container">
      {/* Fix: Add the missing H1 tag for the main brand title */}
      <h1 className="sr-only">Kittu Car Washing - Premium Detailing Station Patna Bihar</h1>

      {/* Dynamic Floating Water Droplets Background */}
      {droplets.map((_, i) => (
        <motion.div
          key={i}
          initial={{
            y: '110vh',
            x: `${10 + i * 11}%`,
            opacity: 0.15 + Math.random() * 0.2,
            scale: 0.5 + Math.random() * 1.5,
          }}
          animate={{
            y: '-10vh',
          }}
          transition={{
            duration: 12 + Math.random() * 8,
            repeat: Infinity,
            delay: i * 1.5,
            ease: 'linear',
          }}
          className="absolute w-2 h-2 rounded-full bg-sky-400 pointer-events-none blur-[1px]"
        />
      ))}

      {/* Radiant Glowing Orbs */}
      <div className="absolute top-1/4 -left-1/4 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Texts Info Left */}
        <div className="lg:col-span-7 space-y-6 lg:space-y-8 text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/20 text-sky-400 text-xs font-semibold uppercase tracking-wider top-rating-tag"
          >
            <Sparkles className="w-3.5 h-3.5 animate-spin" />
            <span>Top-Rated Detailing Station in Patna</span>
          </motion.div>

          <div className="space-y-4">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-none text-white font-display main-headline"
            >
              Bringing Showroom <br />
              <span className="gradient-text bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-400 font-black">
                Gloss & Protection
              </span><br />
              Back to Your Ride
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-300 text-sm sm:text-base md:text-lg max-w-xl leading-relaxed"
            >
              Premium foam baths, 120°C active steam cabin disinfection, and ultra-durable hybrid ceramic coatings. Experience professional, scratch-free care at {BUSINESS_INFO.name}.
            </motion.p>
          </div>

          {/* Quick Location Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex flex-wrap gap-x-6 gap-y-2 text-xs sm:text-sm text-slate-400"
          >
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-sky-400 shrink-0" />
              <span>Kankarbagh Main Road, Patna</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-sky-400 shrink-0" />
              <span>pH-Neutral Soft Water (TDS &lt; 100)</span>
            </div>
          </motion.div>

          {/* Call To Actions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button
              onClick={onCtaclick}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-sky-400 to-blue-600 hover:from-sky-500 hover:to-blue-700 text-white font-extrabold text-base transition-all shadow-lg shadow-sky-500/25 flex items-center justify-center gap-2 group active:scale-95 cursor-pointer"
            >
              <Calendar className="w-5 h-5 text-sky-100" />
              <span>Schedule Service Online</span>
              <ArrowRight className="w-4 h-4 text-sky-200 group-hover:translate-x-1.5 transition-transform" />
            </button>

            <button
              onClick={onExploreServices}
              className="px-8 py-4 rounded-xl border border-slate-700 hover:border-slate-500 hover:bg-slate-900/50 text-slate-200 hover:text-white font-bold text-base transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
            >
              <span>Explore Services & Pricing</span>
            </button>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-800 max-w-lg"
          >
            <div>
              <span className="text-2xl sm:text-3xl font-black text-sky-400 block tracking-tight">10+ Yrs</span>
              <span className="text-[10px] sm:text-xs text-slate-400 font-semibold uppercase tracking-wider mt-0.5 block">Experience</span>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-black text-sky-400 block tracking-tight">1 Lakh+</span>
              <span className="text-[10px] sm:text-xs text-slate-400 font-semibold uppercase tracking-wider mt-0.5 block">Cars Washed</span>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-black text-sky-400 block tracking-tight">4.9★</span>
              <span className="text-[10px] sm:text-xs text-slate-400 font-semibold uppercase tracking-wider mt-0.5 block">Google Rating</span>
            </div>
          </motion.div>
        </div>

        {/* Glossy Car Image Right */}
        <div className="lg:col-span-5 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 1 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-800 aspect-[4/3] bg-slate-900"
          >
            {/* Pressure wash spray overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-sky-500/10 to-transparent pointer-events-none z-10" />
            <img
              src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=800"
              alt="Gleaming Premium Lexus LS 500h Detailing Kittu Wash Patna"
              className="w-full h-full object-cover select-none"
              referrerPolicy="no-referrer"
            />

            {/* Glowing Tag */}
            <div className="absolute top-4 right-4 bg-slate-950/90 backdrop-blur-md border border-sky-500/30 px-3.5 py-1.5 rounded-lg flex items-center gap-1.5">
              <Award className="w-4 h-4 text-sky-400" />
              <span className="text-[10px] font-bold text-white tracking-wider uppercase">Gloss Armor Certified</span>
            </div>
          </motion.div>

          {/* Floating Bubble Badges */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -bottom-6 -left-6 bg-slate-900/90 backdrop-blur-md border border-slate-800 p-4 rounded-xl shadow-xl flex items-center gap-3.5 max-w-[200px]"
          >
            <span className="text-2xl">🧼</span>
            <div className="space-y-0.5">
              <span className="text-xs font-extrabold text-white block">Active Foam wash</span>
              <span className="text-[10px] text-slate-400 block">Thick dirt release system</span>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-6 -right-6 bg-slate-900/90 backdrop-blur-md border border-slate-800 p-4 rounded-xl shadow-xl flex items-center gap-3.5 max-w-[200px]"
          >
            <span className="text-2xl">💧</span>
            <div className="space-y-0.5">
              <span className="text-xs font-extrabold text-white block">Hydrophobic coat</span>
              <span className="text-[10px] text-slate-400 block">Water repelling layers</span>
            </div>
          </motion.div>
        </div>
      </div>
    </header>
  );
}
