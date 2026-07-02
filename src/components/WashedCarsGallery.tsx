import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, PanInfo } from 'motion/react';
import { WASHED_CARS_GALLERY, WashedCarPhoto } from '../data';
import { Sparkles, Eye, X, ZoomIn, Info, ChevronLeft, ChevronRight } from 'lucide-react';

export default function WashedCarsGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<WashedCarPhoto | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('All');
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

  // Filter photos based on category
  const filteredPhotos = WASHED_CARS_GALLERY.filter((photo) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'SUV') {
      return photo.vehicleType.toLowerCase().includes('suv') || photo.vehicleType.toLowerCase().includes('offroader');
    }
    if (activeFilter === 'Sedan') {
      return photo.vehicleType.toLowerCase().includes('sedan');
    }
    if (activeFilter === 'Bike') {
      return photo.vehicleType.toLowerCase().includes('motorcycle') || photo.vehicleType.toLowerCase().includes('bike');
    }
    if (activeFilter === 'Steam') {
      return photo.tag.toLowerCase().includes('steam');
    }
    if (activeFilter === 'Wax/Coating') {
      return (
        photo.tag.toLowerCase().includes('carnauba') ||
        photo.tag.toLowerCase().includes('ceramic') ||
        photo.tag.toLowerCase().includes('metal') ||
        photo.tag.toLowerCase().includes('glaze')
      );
    }
    return true;
  });

  // Reset active index whenever the filter changes
  useEffect(() => {
    setActiveIndex(0);
  }, [activeFilter]);

  // Auto play rotation
  useEffect(() => {
    if (!isHovered && filteredPhotos.length > 1) {
      autoPlayRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % filteredPhotos.length);
      }, 5000);
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isHovered, filteredPhotos.length]);

  const handlePrev = () => {
    if (filteredPhotos.length <= 1) return;
    setActiveIndex((prev) => (prev - 1 + filteredPhotos.length) % filteredPhotos.length);
  };

  const handleNext = () => {
    if (filteredPhotos.length <= 1) return;
    setActiveIndex((prev) => (prev + 1) % filteredPhotos.length);
  };

  const handleDragEnd = (_event: any, info: PanInfo) => {
    if (filteredPhotos.length <= 1) return;
    const swipeThreshold = 50;
    if (info.offset.x > swipeThreshold) {
      handlePrev();
    } else if (info.offset.x < -swipeThreshold) {
      handleNext();
    }
  };

  const getCircularDistance = (index: number, current: number, total: number) => {
    if (total <= 1) return 0;
    let diff = index - current;
    while (diff < -total / 2) diff += total;
    while (diff > total / 2) diff -= total;
    return diff;
  };

  // Derive simple filter categories
  const filters = ['All', 'SUV', 'Sedan', 'Bike', 'Steam', 'Wax/Coating'];

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;

  return (
    <section className="py-20 px-4 bg-slate-900 border-t border-slate-800 relative overflow-hidden" id="washed-gallery">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/4 w-[350px] h-[350px] bg-sky-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[350px] h-[350px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/20 text-sky-400 text-xs font-semibold uppercase tracking-wider mb-3.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Showroom Glaze Results</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            Recent Washed & Detailed Cars
          </h2>
          <p className="text-sm md:text-base text-slate-400 mt-2">
            No mock images here. Spin through our interactive 3D showcase of real client vehicles freshly detailed at Kittu Car Washing.
          </p>
        </div>

        {/* Categories Tab Selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {filters.map((category) => {
            const isActive = activeFilter === category;
            return (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`relative px-5 py-2 rounded-xl text-xs font-extrabold tracking-wide transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'text-white'
                    : 'text-slate-400 hover:text-slate-200 bg-slate-950/40 border border-slate-800'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeGalleryTab"
                    className="absolute inset-0 bg-gradient-to-r from-sky-500 to-blue-600 rounded-xl -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {category}
              </button>
            );
          })}
        </div>

        {/* 3D Carousel / Slider Block */}
        {filteredPhotos.length > 0 ? (
          <div className="relative flex flex-col items-center">
            {/* 3D Wheel Frame */}
            <div 
              className="relative flex items-center justify-center h-[420px] md:h-[480px] w-full max-w-5xl mx-auto"
              style={{ perspective: 1200 }}
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <AnimatePresence mode="popLayout">
                  {filteredPhotos.map((photo, idx) => {
                    const distance = getCircularDistance(idx, activeIndex, filteredPhotos.length);
                    const isCenter = distance === 0;
                    
                    // Only render if within visible limit depending on total items
                    const maxVisibleDist = filteredPhotos.length === 2 ? 1 : 2;
                    const isVisible = Math.abs(distance) <= (isMobile ? 1 : maxVisibleDist);

                    if (!isVisible) return null;

                    // Compute 3D parameters based on relative distance from center card
                    let xOffset = 0;
                    if (isMobile) {
                      xOffset = distance * 270;
                    } else if (isTablet) {
                      xOffset = distance * 310;
                    } else {
                      xOffset = distance * 360;
                    }

                    const scale = 1 - Math.abs(distance) * 0.15;
                    const rotateY = distance * -20;
                    const z = -Math.abs(distance) * 160;
                    const opacity = 1 - Math.abs(distance) * (isMobile ? 0.75 : 0.4);
                    const zIndex = 10 - Math.abs(distance);

                    return (
                      <motion.div
                        key={`${photo.id}-${activeFilter}`}
                        style={{
                          transformStyle: 'preserve-3d',
                          transformOrigin: 'center center',
                        }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{
                          x: xOffset,
                          scale: scale,
                          rotateY: rotateY,
                          z: z,
                          opacity: opacity,
                          zIndex: zIndex,
                        }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{
                          type: 'spring',
                          stiffness: 180,
                          damping: 24,
                        }}
                        drag={isCenter ? 'x' : false}
                        dragConstraints={{ left: 0, right: 0 }}
                        onDragEnd={handleDragEnd}
                        onClick={() => {
                          if (isCenter) {
                            setSelectedPhoto(photo);
                          } else {
                            setActiveIndex(idx);
                          }
                        }}
                        className={`absolute w-[280px] md:w-[380px] h-[360px] md:h-[420px] rounded-2xl bg-slate-950 border ${
                          isCenter 
                            ? 'border-sky-500/60 shadow-2xl shadow-sky-500/20' 
                            : 'border-slate-800/80 shadow-lg'
                        } overflow-hidden cursor-pointer group flex flex-col justify-end`}
                      >
                        {/* Image */}
                        <div className="absolute inset-0 w-full h-full overflow-hidden">
                          <img
                            src={photo.imageUrl}
                            alt={photo.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                        </div>

                        {/* Top floating tags */}
                        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                          <span className="px-2.5 py-1 rounded-md bg-sky-500 text-[10px] font-extrabold text-white uppercase tracking-wider shadow-md">
                            {photo.tag}
                          </span>
                        </div>

                        {/* Top right zoom button (only active/visible on center card hover) */}
                        <div className={`absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-950/80 border border-sky-400/30 transition-all duration-300 ${
                          isCenter ? 'opacity-0 group-hover:opacity-100' : 'opacity-0'
                        }`}>
                          <ZoomIn className="w-4 h-4 text-sky-400" />
                        </div>

                        {/* Info banner at bottom */}
                        <div className="relative p-5 z-10 space-y-1.5">
                          <p className="text-[10px] font-bold text-sky-400 uppercase tracking-widest leading-none">
                            {photo.vehicleType}
                          </p>
                          <h3 className="text-sm md:text-base font-black text-white group-hover:text-sky-300 transition-colors line-clamp-1">
                            {photo.title}
                          </h3>
                          
                          {/* Sub-indicator instruction */}
                          {isCenter && (
                            <div className="flex items-center gap-1.5 text-xs text-slate-400 pt-1 border-t border-slate-800/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <Eye className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
                              <span>Click to inspect job details</span>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>

            {/* Pagination / Dots & Navigation */}
            {filteredPhotos.length > 1 && (
              <div className="flex items-center justify-center gap-5 mt-6 relative z-20">
                <motion.button
                  onClick={handlePrev}
                  whileHover={{ scale: 1.1, x: -2 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                  className="w-10 h-10 rounded-full bg-slate-950 border border-slate-800 hover:border-sky-500 hover:bg-slate-900 text-white flex items-center justify-center transition-all shadow-md group cursor-pointer"
                  aria-label="Previous washed vehicle"
                >
                  <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
                </motion.button>

                {/* Circular indicator dots */}
                <div className="flex items-center gap-2">
                  {filteredPhotos.map((_, idx) => (
                    <motion.button
                      key={idx}
                      onClick={() => setActiveIndex(idx)}
                      whileHover={{ scale: 1.3 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                      className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                        activeIndex === idx 
                          ? 'w-5 bg-sky-500' 
                          : 'w-2 bg-slate-700 hover:bg-slate-500'
                      }`}
                      aria-label={`Go to vehicle slide ${idx + 1}`}
                    />
                  ))}
                </div>

                <motion.button
                  onClick={handleNext}
                  whileHover={{ scale: 1.1, x: 2 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                  className="w-10 h-10 rounded-full bg-slate-950 border border-slate-800 hover:border-sky-500 hover:bg-slate-900 text-white flex items-center justify-center transition-all shadow-md group cursor-pointer"
                  aria-label="Next washed vehicle"
                >
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                </motion.button>
              </div>
            )}
          </div>
        ) : (
          /* Empty category state */
          <div className="text-center py-16 bg-slate-950/30 rounded-3xl border border-slate-800 max-w-xl mx-auto">
            <p className="text-slate-400 text-sm font-medium">No recent photos match this filter category.</p>
          </div>
        )}

      </div>

      {/* Lightbox / Spec Sheet Modal popup */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-md"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 max-w-3xl w-full shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-950/80 border border-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                
                {/* Visual Image container */}
                <div className="relative aspect-[4/3] md:aspect-auto md:h-full bg-slate-950">
                  <img
                    src={selectedPhoto.imageUrl}
                    alt={selectedPhoto.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-sky-500 text-[10px] font-black text-white uppercase tracking-wider shadow-md">
                      {selectedPhoto.tag}
                    </span>
                  </div>
                </div>

                {/* Details Sheet Column */}
                <div className="p-6 md:p-8 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div>
                      <span className="text-[10px] font-bold text-sky-400 uppercase tracking-widest block">
                        Verified Finished Job Card
                      </span>
                      <h3 className="text-xl md:text-2xl font-extrabold text-white mt-1">
                        {selectedPhoto.title}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1">{selectedPhoto.vehicleType}</p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Treatment Applied:</span>
                        <span className="font-extrabold text-white text-right">{selectedPhoto.tag}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Estimated Longevity:</span>
                        <span className="font-extrabold text-sky-400 text-right">
                          {selectedPhoto.tag.includes('Ceramic') ? '1 - 2 Years Shield' : 'Up to 6 Weeks'}
                        </span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Water Source Quality:</span>
                        <span className="font-extrabold text-slate-200 text-right">Softened Filtered (&lt;100 TDS)</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Polish Compound:</span>
                        <span className="font-extrabold text-slate-200 text-right">Scholl Concepts / Meguiar's</span>
                      </div>
                    </div>

                    <div className="flex gap-2 text-[11px] text-slate-400 leading-relaxed bg-sky-500/5 p-3.5 rounded-xl border border-sky-500/10">
                      <Info className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                      <span>
                        Our multi-stage scratch-free wash system guarantees swirl-free paint safety by utilizing separate wash mitts for wheels, lower cladding, and paint zones.
                      </span>
                    </div>
                  </div>

                  <motion.button
                    onClick={() => {
                      setSelectedPhoto(null);
                      const el = document.getElementById('booking-workspace');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-400 to-blue-600 hover:from-sky-500 hover:to-blue-700 text-white font-extrabold text-xs tracking-wider uppercase transition-all shadow-md shadow-sky-500/20 cursor-pointer"
                  >
                    Schedule a Wash Like This
                  </motion.button>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
