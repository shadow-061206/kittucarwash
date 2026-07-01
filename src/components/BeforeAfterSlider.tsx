import { useState, useRef, useEffect, MouseEvent as ReactMouseEvent, TouchEvent as ReactTouchEvent } from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowLeftRight, Droplet } from 'lucide-react';

export default function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div className="bg-slate-900 py-16 px-4 relative overflow-hidden" id="interactive-reveal">
      {/* Background bubble decorations */}
      <div className="absolute -top-12 -left-12 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -right-12 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-sky-500/10 text-sky-400 text-xs font-semibold tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Interactive Detailing Demo
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Witness the <span className="gradient-text bg-gradient-to-r from-sky-400 to-blue-500 font-extrabold">Kittu Magic Touch</span>
          </h2>
          <p className="mt-3 text-slate-300 max-w-xl mx-auto text-sm md:text-base">
            Drag the blue water dropper handle left or right to scrub away thick active-shampoo foam and reveal the brilliant hydrophobic mirror finish underneath!
          </p>
        </motion.div>

        {/* Before / After Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          ref={containerRef}
          className="relative mt-10 h-[280px] sm:h-[380px] md:h-[450px] w-full rounded-2xl overflow-hidden shadow-2xl border border-slate-800 select-none cursor-ew-resize"
          onMouseDown={() => setIsDragging(true)}
          onTouchStart={() => setIsDragging(true)}
        >
          {/* AFTER IMAGE (Pristine, glowing Lexus LS 500h luxury sedan underneath) */}
          <div className="absolute inset-0 w-full h-full">
            <img
              src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=1200"
              alt="Sparkling Clean Lexus LS 500h Luxury Sedan Kittu Wash"
              className="w-full h-full object-cover pointer-events-none"
              referrerPolicy="no-referrer"
            />
            {/* Gloss shine badges on clean side */}
            <div className="absolute bottom-6 right-6 bg-slate-900/80 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-emerald-500/30 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-semibold text-white tracking-wide uppercase">Kittu Premium Finish</span>
            </div>
          </div>

          {/* BEFORE IMAGE (Foam covered car overlay) */}
          <div
            className="absolute inset-0 h-full overflow-hidden"
            style={{ width: `${sliderPosition}%` }}
          >
            <img
              src="https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&q=80&w=1200"
              alt="Active Snow Foam pre-wash"
              className="absolute inset-0 h-full object-cover pointer-events-none"
              style={{ width: containerRef.current?.offsetWidth || '100vw', maxWidth: 'none' }}
              referrerPolicy="no-referrer"
            />
            {/* Dust / Soap Badge on foam side */}
            <div className="absolute bottom-6 left-6 bg-slate-900/80 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-sky-500/30 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
              <span className="text-xs font-semibold text-white tracking-wide uppercase">Active Snow Foam</span>
            </div>
          </div>

          {/* SLIDER LINE & HANDLE */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-sky-400 via-blue-500 to-sky-400 z-30 cursor-ew-resize"
            style={{ left: `${sliderPosition}%` }}
          >
            {/* Sliding water droplet button */}
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-gradient-to-r from-sky-400 to-blue-600 shadow-xl border-2 border-white flex items-center justify-center text-white cursor-grab active:cursor-grabbing hover:scale-110 transition-transform">
              {isDragging ? (
                <ArrowLeftRight className="w-5 h-5 animate-pulse" />
              ) : (
                <Droplet className="w-5 h-5" />
              )}
            </div>
          </div>

          {/* Prompt overlay helper text */}
          {sliderPosition > 45 && sliderPosition < 55 && (
            <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-slate-900/90 backdrop-blur-md text-white border border-slate-700/50 px-4 py-2 rounded-full text-xs font-medium tracking-wide flex items-center gap-2 shadow-lg pointer-events-none">
              <ArrowLeftRight className="w-3.5 h-3.5 text-sky-400 animate-bounce" />
              Swipe left or right
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
