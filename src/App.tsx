import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Car,
  Droplet,
  MapPin,
  Calendar,
  Clock,
  Phone,
  MessageSquare,
  HelpCircle,
  ChevronDown,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Instagram,
  Facebook,
  Award
} from 'lucide-react';

// Data & Components
import { BUSINESS_INFO, FAQS } from './data';
import { VehicleType } from './types';
import Hero from './components/Hero';
import Services from './components/Services';
import BeforeAfterSlider from './components/BeforeAfterSlider';
import BookingForm from './components/BookingForm';
import MyBookings from './components/MyBookings';
import Location from './components/Location';
import WashedCarsGallery from './components/WashedCarsGallery';
import { ReviewCarousel3D } from './components/ReviewCarousel3D';
import HalftoneTrail from './components/ui/halftone-trail';

export default function App() {
  // Pre-selection states to link Services to Booking Form
  const [preSelectedPackage, setPreSelectedPackage] = useState<string>('kittu-signature');
  const [preSelectedVehicle, setPreSelectedVehicle] = useState<VehicleType>('sedan');

  // Interactive Booking Workspace tabs
  const [bookingTab, setBookingTab] = useState<'schedule' | 'my-bookings'>('schedule');
  const [bookingRefreshTrigger, setBookingRefreshTrigger] = useState<number>(0);
  const [activeBookingsCount, setActiveBookingsCount] = useState<number>(0);

  // FAQ Accordion
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>(null);

  // Read current bookings count
  const updateBookingsCount = () => {
    try {
      const stored = localStorage.getItem('kittu_bookings');
      if (stored) {
        const parsed = JSON.parse(stored);
        const active = parsed.filter((b: any) => b.status === 'confirmed');
        setActiveBookingsCount(active.length);
      } else {
        setActiveBookingsCount(0);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    updateBookingsCount();
  }, [bookingRefreshTrigger]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectPackageAndBook = (packageId: string, vehicleType: VehicleType) => {
    setPreSelectedPackage(packageId);
    setPreSelectedVehicle(vehicleType);
    setBookingTab('schedule');
    // Scroll smoothly to the booking section
    scrollToSection('booking-workspace');
  };

  const handleBookingSuccess = () => {
    setBookingRefreshTrigger((prev) => prev + 1);
    setBookingTab('my-bookings');
    updateBookingsCount();
    scrollToSection('booking-workspace');
  };

  const toggleFaq = (id: string) => {
    setExpandedFaqId(expandedFaqId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-brand-bg font-sans text-brand-text antialiased selection:bg-brand-secondary selection:text-white relative">
      {/* Interactive Global Halftone Trail Background */}
      <HalftoneTrail
        cellSize={12}
        color="rgba(15, 76, 129, 0.15)"
        decay={0.96}
        brushSize={0.06}
        hoverBrushSize={0.02}
        opacity={0.7}
        hoverOpacity={0.15}
        speedScale={35.0}
        className="fixed inset-0 pointer-events-none z-40"
      />

      {/* 1. Header Navbar */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-2.5 group"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-primary to-brand-secondary flex items-center justify-center text-white shadow-md shadow-brand-primary/20 group-hover:scale-110 transition-transform">
              <Car className="w-5.5 h-5.5" />
            </div>
            <div>
              <span className="font-display font-extrabold text-brand-text text-lg tracking-tight block">
                Kittu Car Washing
              </span>
              <span className="text-[10px] text-brand-primary font-semibold tracking-wider uppercase block">
                Premium Detailing Station
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <button
              onClick={() => scrollToSection('services-showcase')}
              className="hover:text-brand-primary transition-colors cursor-pointer"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection('interactive-reveal')}
              className="hover:text-brand-primary transition-colors cursor-pointer"
            >
              The Magic Slider
            </button>
            <button
              onClick={() => scrollToSection('washed-gallery')}
              className="hover:text-brand-primary transition-colors cursor-pointer"
            >
              Recent Washes
            </button>
            <button
              onClick={() => scrollToSection('booking-workspace')}
              className="hover:text-brand-primary transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <span>Scheduler</span>
              {activeBookingsCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-brand-cta animate-pulse" />
              )}
            </button>
            <button
              onClick={() => scrollToSection('location-details')}
              className="hover:text-brand-primary transition-colors cursor-pointer"
            >
              Contact & Hours
            </button>
          </nav>

          {/* User Booking Hub Actions */}
          <div className="flex items-center gap-3">
            <motion.button
              onClick={() => {
                setBookingTab('my-bookings');
                scrollToSection('booking-workspace');
              }}
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              className="relative px-3 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-100 text-xs font-extrabold text-slate-600 hover:text-slate-900 transition flex items-center gap-1.5"
            >
              <span>My Ticket</span>
              {activeBookingsCount > 0 ? (
                <span className="bg-brand-cta text-white text-[10px] font-black h-5 w-5 rounded-full flex items-center justify-center shadow-sm">
                  {activeBookingsCount}
                </span>
              ) : (
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
              )}
            </motion.button>

            <motion.button
              onClick={() => {
                setBookingTab('schedule');
                scrollToSection('booking-workspace');
              }}
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              className="px-4.5 py-2.5 rounded-lg bg-brand-cta hover:bg-[#ea580c] text-white text-xs font-black tracking-wide shadow-md shadow-brand-cta/20 active:scale-95 transition cursor-pointer"
            >
              Book Wash
            </motion.button>
          </div>
        </div>
      </header>

      {/* 2. Hero Section */}
      <Hero
        onCtaclick={() => {
          setBookingTab('schedule');
          scrollToSection('booking-workspace');
        }}
        onExploreServices={() => scrollToSection('services-showcase')}
      />

      {/* 3. Services Section */}
      <Services onSelectPackage={handleSelectPackageAndBook} />

      {/* 4. Interactive Reveal Slider Section */}
      <BeforeAfterSlider />

      {/* 5. Booking Workspace (Scheduler & Active Ticket Panel) */}
      <section className="py-20 px-4 bg-brand-bg border-t border-b border-slate-200 relative" id="booking-workspace">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 -right-12 w-64 h-64 bg-brand-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -left-12 w-64 h-64 bg-brand-secondary/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-semibold uppercase tracking-wider mb-3.5 inline-block">
              Quick Scheduling Desk
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-950 tracking-tight">
              Reserve Your Priority Slot
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Skip standard drive-in queues. Book a custom slot, choose your parameters, and pay at the counter only after service satisfaction!
            </p>

            {/* Toggle Switcher Pills */}
            <div className="mt-8 inline-flex p-1 bg-slate-100 border border-slate-200 rounded-xl">
              <motion.button
                onClick={() => setBookingTab('schedule')}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                className={`px-6 py-2.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  bookingTab === 'schedule'
                    ? 'bg-brand-primary text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Schedule New Wash
              </motion.button>
              <motion.button
                onClick={() => setBookingTab('my-bookings')}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                className={`px-6 py-2.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  bookingTab === 'my-bookings'
                    ? 'bg-brand-primary text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>My Appointments</span>
                {activeBookingsCount > 0 && (
                  <span className="bg-brand-cta text-white font-extrabold px-1.5 py-0.5 rounded text-[10px]">
                    {activeBookingsCount}
                  </span>
                )}
              </motion.button>
            </div>
          </div>

          {/* Active Workspace Rendering */}
          <div className="max-w-6xl mx-auto">
            {bookingTab === 'schedule' ? (
              <BookingForm
                initialPackageId={preSelectedPackage}
                initialVehicleType={preSelectedVehicle}
                onBookingSuccess={handleBookingSuccess}
              />
            ) : (
              <MyBookings
                refreshTrigger={bookingRefreshTrigger}
                onSelectBookingTab={() => setBookingTab('schedule')}
              />
            )}
          </div>
        </div>
      </section>

      {/* 5.5 Washed Cars Gallery */}
      <WashedCarsGallery />

      {/* 6. Customer Testimonials Section */}
      <section className="py-20 bg-slate-950 text-white relative overflow-hidden" id="testimonials">
        <ReviewCarousel3D />
      </section>

      {/* 7. Exact Location Panel */}
      <Location />

      {/* 8. Frequently Asked Questions (FAQ) Section */}
      <section className="py-20 px-4 bg-white" id="faq-section">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <span className="px-3.5 py-1.5 rounded-full bg-sky-500/10 text-sky-600 text-xs font-semibold tracking-wider uppercase mb-3 inline-block">
              Common Queries
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="mt-2 text-slate-600 text-sm">
              Have doubts? Find instant answers regarding our chemical soaps, scheduling timelines, and quality protocols.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq) => {
              const isExpanded = expandedFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="rounded-xl border border-slate-200 overflow-hidden bg-slate-50 hover:bg-slate-100/50 transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-800 text-sm md:text-base select-none cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 transition-transform ${
                        isExpanded ? 'rotate-180 text-sky-500' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        className="overflow-hidden bg-white"
                      >
                        <p className="p-5 text-xs md:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 9. Footer Section */}
      <footer className="bg-brand-footer text-white pt-16 pb-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
            {/* Branding Column */}
            <div className="space-y-4 md:col-span-1">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-lg bg-brand-primary flex items-center justify-center text-white">
                  <Car className="w-5 h-5" />
                </div>
                <span className="font-display font-extrabold text-white text-base tracking-tight">
                  Kittu Car Washing
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Bengaluru's premier choice for hyper-detailed car washes, foam cleanings, steam sanitizations, and ceramic gloss protection plans.
              </p>
              <div className="flex items-center gap-3 pt-2 text-slate-400">
                <a href="#" className="hover:text-sky-400 transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="hover:text-sky-400 transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links Column */}
            <div className="space-y-3">
              <h4 className="font-extrabold text-white text-xs uppercase tracking-widest">
                Quick Access
              </h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li>
                  <button
                    onClick={() => scrollToSection('services-showcase')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Detailing Services
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('interactive-reveal')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Before/After Slider
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('washed-gallery')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Washed Cars Gallery
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('booking-workspace')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Online Appointment Desk
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('location-details')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Store Location Map
                  </button>
                </li>
              </ul>
            </div>

            {/* Services List Column */}
            <div className="space-y-3">
              <h4 className="font-extrabold text-white text-xs uppercase tracking-widest">
                Specialized Packages
              </h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li>Eco Express Wash</li>
                <li>Kittu Signature Wash</li>
                <li>Ultra Cabin Steam Clean</li>
                <li>Hybrid Ceramic Wax Detailing</li>
                <li>Engine Component Dressing</li>
              </ul>
            </div>

            {/* Helpline Column */}
            <div className="space-y-3">
              <h4 className="font-extrabold text-white text-xs uppercase tracking-widest">
                Have Questions?
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Direct helpline for booking queries, fleet custom discount contracts, or premium matte paint consults.
              </p>
              <div className="space-y-1">
                <p className="text-sm font-black text-white">{BUSINESS_INFO.phone}</p>
                <p className="text-[10px] text-sky-400 font-semibold">{BUSINESS_INFO.email}</p>
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-medium">
            <p>© {new Date().getFullYear()} {BUSINESS_INFO.name}. All Rights Reserved.</p>
            <div className="flex gap-4">
              <span className="hover:text-slate-300 transition-colors">Privacy Policy</span>
              <span className="hover:text-slate-300 transition-colors">Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
