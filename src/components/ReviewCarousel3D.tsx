import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, PanInfo } from 'motion/react';
import { Star, ChevronLeft, ChevronRight, Quote, Sparkles, User, BadgeCheck } from 'lucide-react';

interface Review3D {
  id: string;
  name: string;
  vehicle: string;
  vehicleType: string;
  rating: number;
  text: string;
  date: string;
  avatarUrl: string;
  carImageUrl: string;
  tag: string;
}

const REVIEWS_3D: Review3D[] = [
  {
    id: 'r1',
    name: 'Vikram Malhotra',
    vehicle: 'Lexus LS 500h',
    vehicleType: 'Luxury Hybrid Sedan',
    rating: 5,
    text: 'My LS 500h received their Ceramic Coating service. The wet-look gloss is absolutely jaw-dropping! Rainwater beads up and slides off immediately. Truly professional detaiing.',
    date: 'Yesterday',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=120',
    carImageUrl: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=800',
    tag: 'Ceramic Coating',
  },
  {
    id: 'r2',
    name: 'Rohan Sharma',
    vehicle: 'Hyundai Creta 4x4',
    vehicleType: 'Mid-Size SUV',
    rating: 5,
    text: 'Spectacular steam wash and deep foam clean! All under-chassis mud and grime from the highway run were completely eliminated. The team works with amazing dedication.',
    date: '3 days ago',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120',
    carImageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800',
    tag: 'Under-Body Steam Wash',
  },
  {
    id: 'r3',
    name: 'Priya Patel',
    vehicle: 'Maruti Swift Hybrid',
    vehicleType: 'Premium Hatchback',
    rating: 5,
    text: 'Kittu Car Wash is incredibly fast! Got the deep foam bath and glass wax treatment. They were done in 45 minutes, with every single corner glistening. Super friendly staff!',
    date: '1 week ago',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120',
    carImageUrl: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=800',
    tag: 'Kittu Signature Wash',
  },
  {
    id: 'r4',
    name: 'Rajesh Gowda',
    vehicle: 'Mahindra XUV700',
    vehicleType: '7-Seater SUV',
    rating: 5,
    text: 'Their interior steam sanitization is second to none! All dust, allergens, and odors from the AC vents were thoroughly extracted. It literally smells like a showroom car now.',
    date: '2 weeks ago',
    avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=120',
    carImageUrl: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=800',
    tag: 'AC Steam Disinfection',
  },
  {
    id: 'r5',
    name: 'Amit Verma',
    vehicle: 'Royal Enfield Classic',
    vehicleType: 'Cruiser Motorcycle',
    rating: 5,
    text: 'Cleaning chrome without leaving spots is an art. These boys used soft filtered water with under 100 TDS to prevent mineral scales, plus non-scratch microfibers. Simply flawless!',
    date: '3 weeks ago',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120',
    carImageUrl: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=800',
    tag: 'Chrome Polish & Wax',
  },
  {
    id: 'r6',
    name: 'Neha Deshmukh',
    vehicle: 'Tata Nexon EV',
    vehicleType: 'Compact SUV',
    rating: 5,
    text: 'Eco-safe chemical-free foam and deep leather care. With small toddlers, interior hygiene is my absolute priority. They sanitized every corner. Highly recommend Patna Kankarbagh station.',
    date: '1 month ago',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120',
    carImageUrl: 'https://images.unsplash.com/photo-1507136566006-cfc505b114fc?auto=format&fit=crop&q=80&w=800',
    tag: 'Deep Cabin Care',
  },
];

export function ReviewCarousel3D() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // Track window resizing for responsive layout adjustments
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto play rotation
  useEffect(() => {
    if (!isHovered) {
      autoPlayRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % REVIEWS_3D.length);
      }, 5000);
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isHovered]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + REVIEWS_3D.length) % REVIEWS_3D.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % REVIEWS_3D.length);
  };

  const handleDragEnd = (_event: any, info: PanInfo) => {
    const swipeThreshold = 50;
    if (info.offset.x > swipeThreshold) {
      handlePrev();
    } else if (info.offset.x < -swipeThreshold) {
      handleNext();
    }
  };

  const getCircularDistance = (index: number, current: number, total: number) => {
    let diff = index - current;
    while (diff < -total / 2) diff += total;
    while (diff > total / 2) diff -= total;
    return diff;
  };

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;

  return (
    <div 
      className="relative w-full max-w-7xl mx-auto py-16 px-4 md:px-8 overflow-hidden select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      id="reviews-3d-section"
    >
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-3xl pointer-events-none z-0" />

      <div className="text-center mb-16 relative z-10">
        <span className="px-3.5 py-1.5 rounded-full bg-sky-500/10 text-sky-400 text-xs font-semibold tracking-wider uppercase mb-3 inline-flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
          Interactive 3D Showroom Reviews
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
          Pristine Results, Proven Trust
        </h2>
        <p className="mt-4 text-slate-400 text-sm md:text-base max-w-2xl mx-auto">
          Swipe or drag to spin our interactive 3D wheel. Inspect real customer results with high-definition detailing shots from Patna, Bihar.
        </p>
      </div>

      {/* 3D Wheel Container */}
      <div 
        className="relative flex items-center justify-center h-[520px] md:h-[560px] w-full"
        style={{ perspective: 1200 }}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          {REVIEWS_3D.map((review, idx) => {
            const distance = getCircularDistance(idx, activeIndex, REVIEWS_3D.length);
            const isCenter = distance === 0;
            const isVisible = Math.abs(distance) <= (isMobile ? 1 : 2);

            if (!isVisible) return null;

            // Compute 3D translations based on relative distance from center
            let xOffset = 0;
            if (isMobile) {
              xOffset = distance * 280; // smaller horizontal gap on mobile
            } else if (isTablet) {
              xOffset = distance * 320;
            } else {
              xOffset = distance * 380; // desktop gap
            }

            const scale = 1 - Math.abs(distance) * 0.15;
            const rotateY = distance * -22; // inward curve rotation
            const z = -Math.abs(distance) * 180; // depth
            const opacity = 1 - Math.abs(distance) * (isMobile ? 0.6 : 0.4);
            const zIndex = 10 - Math.abs(distance);

            return (
              <motion.div
                key={review.id}
                style={{
                  transformStyle: 'preserve-3d',
                  transformOrigin: 'center center',
                }}
                animate={{
                  x: xOffset,
                  scale: scale,
                  rotateY: rotateY,
                  z: z,
                  opacity: opacity,
                  zIndex: zIndex,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 180,
                  damping: 24,
                }}
                drag={isCenter ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={handleDragEnd}
                onClick={() => {
                  if (!isCenter) {
                    setActiveIndex(idx);
                  }
                }}
                className={`absolute w-[300px] md:w-[410px] h-[460px] md:h-[500px] rounded-2xl bg-slate-900 border ${
                  isCenter ? 'border-sky-500/50 shadow-2xl shadow-sky-500/10' : 'border-slate-800/80 shadow-md'
                } overflow-hidden cursor-pointer group flex flex-col justify-between`}
              >
                {/* Visual Image Section */}
                <div className="relative h-[210px] md:h-[240px] w-full overflow-hidden">
                  <img
                    src={review.carImageUrl}
                    alt={review.vehicle}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 pointer-events-none select-none"
                    referrerPolicy="no-referrer"
                  />
                  {/* Glassmorphic category tag */}
                  <span className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-[10px] md:text-xs font-extrabold tracking-wider uppercase text-white bg-slate-950/70 backdrop-blur-md border border-white/10 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-sky-400" />
                    {review.tag}
                  </span>

                  {/* Rating Badge in corner */}
                  <div className="absolute top-4 right-4 z-10 flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/90 text-slate-950 text-xs font-bold shadow-lg">
                    <Star className="w-3.5 h-3.5 fill-slate-950" />
                    <span>5.0</span>
                  </div>

                  {/* Gradient shadow overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

                  {/* Customer Floating Avatar & Info */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
                    <img
                      src={review.avatarUrl}
                      alt={review.name}
                      className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border-2 border-sky-400 shadow-md"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <div className="flex items-center gap-1">
                        <h4 className="font-bold text-white text-sm md:text-base leading-tight">
                          {review.name}
                        </h4>
                        <BadgeCheck className="w-4 h-4 text-sky-400 fill-slate-950 flex-shrink-0" />
                      </div>
                      <p className="text-[10px] md:text-xs text-slate-300 font-medium">
                        Verified {review.vehicle} Owner
                      </p>
                    </div>
                  </div>
                </div>

                {/* Review content section */}
                <div className="p-5 md:p-6 flex-1 flex flex-col justify-between bg-gradient-to-b from-slate-950 to-slate-900 relative">
                  <Quote className="absolute top-4 right-6 w-12 h-12 text-sky-500/10 select-none pointer-events-none" />

                  <div className="space-y-2 md:space-y-3">
                    {/* Stars bar */}
                    <div className="flex gap-0.5">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                      ))}
                    </div>

                    <p className="text-slate-300 text-xs md:text-sm leading-relaxed italic line-clamp-4 font-sans">
                      "{review.text}"
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 mt-2 text-[10px] md:text-xs text-slate-400">
                    <span className="font-mono bg-slate-800/40 px-2.5 py-1 rounded border border-slate-700/30">
                      {review.vehicleType}
                    </span>
                    <span className="font-medium">{review.date}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-center gap-6 mt-6 relative z-20">
        <motion.button
          onClick={handlePrev}
          whileHover={{ scale: 1.1, x: -2 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 hover:border-sky-500 hover:bg-slate-800 text-white flex items-center justify-center transition-all shadow-md group cursor-pointer"
          aria-label="Previous review"
        >
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
        </motion.button>

        {/* Circular indicator pips */}
        <div className="flex items-center gap-2">
          {REVIEWS_3D.map((_, idx) => (
            <motion.button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                activeIndex === idx 
                  ? 'w-6 bg-sky-500' 
                  : 'w-2 bg-slate-700 hover:bg-slate-500'
              }`}
              aria-label={`Go to review ${idx + 1}`}
            />
          ))}
        </div>

        <motion.button
          onClick={handleNext}
          whileHover={{ scale: 1.1, x: 2 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 hover:border-sky-500 hover:bg-slate-800 text-white flex items-center justify-center transition-all shadow-md group cursor-pointer"
          aria-label="Next review"
        >
          <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
        </motion.button>
      </div>
    </div>
  );
}
