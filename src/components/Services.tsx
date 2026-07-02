import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Clock, ShieldCheck, HelpCircle, ArrowRight, Star, Heart } from 'lucide-react';
import { SERVICE_PACKAGES, VEHICLE_LABELS } from '../data';
import { VehicleType, ServicePackage } from '../types';
import { RainBackground } from './ui/rain';

interface ServicesProps {
  onSelectPackage: (packageId: string, vehicleType: VehicleType) => void;
}

export default function Services({ onSelectPackage }: ServicesProps) {
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleType>('sedan');

  const vehicles: { id: VehicleType; label: string; icon: string }[] = [
    { id: 'bike', label: 'Bike', icon: '🏍️' },
    { id: 'hatchback', label: 'Hatchback', icon: '🚗' },
    { id: 'sedan', label: 'Sedan', icon: '🚘' },
    { id: 'suv', label: 'SUV / Compact SUV', icon: '🚙' },
  ];

  return (
    <section className="py-24 px-4 bg-slate-950 relative overflow-hidden" id="services-showcase">
      {/* Dynamic Rain Rinse Animation representing pure active-rinse water flow */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 select-none opacity-85">
        <RainBackground 
          intensity={180} 
          speed={1.1} 
          color="rgba(165, 243, 252, 0.65)" 
          angle={8} 
          lightningEnabled={false} 
          className="w-full h-full"
        />
      </div>

      {/* Behind the heading: Large radial glow */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-full max-w-[650px] h-[350px] bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-indigo-500/10 rounded-full blur-3xl pointer-events-none z-0" />

      {/* Decorative Blur Elements */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none opacity-60" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none opacity-60" />

      {/* Behind the cards: Blurred floating water/foam bubbles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {[
          { size: 45, left: "8%", top: "35%", delay: 0, duration: 9, x: [0, 25, -15, 0], y: [0, -40, 20, 0] },
          { size: 65, left: "88%", top: "42%", delay: 1.2, duration: 11, x: [0, -35, 25, 0], y: [0, -50, 25, 0] },
          { size: 35, left: "22%", top: "68%", delay: 2.8, duration: 8, x: [0, 20, -20, 0], y: [0, -30, 30, 0] },
          { size: 85, left: "78%", top: "72%", delay: 0.7, duration: 13, x: [0, -30, 20, 0], y: [0, -60, 35, 0] },
          { size: 55, left: "4%", top: "82%", delay: 3.2, duration: 10, x: [0, 25, -25, 0], y: [0, -45, 20, 0] },
        ].map((bubble, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-blue-400/10 border border-blue-400/20 blur-[1.5px] shadow-sm shadow-blue-900/20"
            style={{
              width: bubble.size,
              height: bubble.size,
              left: bubble.left,
              top: bubble.top,
            }}
            animate={{
              x: bubble.x,
              y: bubble.y,
              scale: [1, 1.12, 0.93, 1],
            }}
            transition={{
              duration: bubble.duration,
              repeat: Infinity,
              delay: bubble.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 relative">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="px-3.5 py-1.5 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-semibold tracking-wider uppercase mb-3 inline-block border border-cyan-500/20"
          >
            Our Care Packages
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-extrabold text-white tracking-tight"
          >
            Professional Detailing & Washing Services
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-3 text-slate-300 text-sm md:text-base"
          >
            Select your vehicle category below to view customized high-precision pricing, operational durations, and complete checklist procedures.
          </motion.p>

          {/* Vehicle Switcher Bar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-8 inline-flex p-1.5 bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-800 shadow-inner max-w-full overflow-x-auto"
          >
            {vehicles.map((v) => (
              <motion.button
                key={v.id}
                onClick={() => setSelectedVehicle(v.id)}
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all shrink-0 ${
                  selectedVehicle === v.id
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-blue-500/10'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span className="text-lg">{v.icon}</span>
                <span>{v.label}</span>
              </motion.button>
            ))}
          </motion.div>
        </div>

        {/* Packages Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {SERVICE_PACKAGES.map((pkg, idx) => {
            const price = pkg.basePrices[selectedVehicle];
            return (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ 
                  y: -10, 
                  scale: 1.01,
                  boxShadow: "0 30px 60px -15px rgba(0, 180, 216, 0.25), 0 15px 30px -10px rgba(0, 180, 216, 0.12)" 
                }}
                className={`relative flex flex-col justify-between rounded-2xl bg-slate-900/80 backdrop-blur-md p-6 transition-all duration-300 border group ${
                  pkg.popular
                    ? 'border-cyan-500 shadow-lg shadow-cyan-500/5 ring-1 ring-cyan-500/20'
                    : 'border-slate-800 shadow-sm'
                }`}
              >
                {pkg.popular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-[10px] font-bold tracking-widest uppercase px-3.5 py-1.5 rounded-full shadow-md flex items-center gap-1">
                    <Star className="w-3 h-3 fill-white animate-pulse" /> Recommended Choice
                  </span>
                )}

                <div>
                  {/* Name and tagline */}
                  <div className="mb-4">
                    <h3 className="text-xl font-extrabold text-white tracking-tight leading-snug">
                      {pkg.name}
                    </h3>
                    <p className="text-xs text-cyan-400 font-semibold mt-1 uppercase tracking-wide">
                      {pkg.tagline}
                    </p>
                  </div>

                  {/* Pricing dynamic display */}
                  <div className="my-5 pb-5 border-b border-slate-800 flex items-baseline gap-1.5">
                    <span className="text-xs font-semibold text-slate-500">₹</span>
                    <span className="text-4xl font-black text-white tracking-tight">
                      {price}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">/ flat rate</span>
                  </div>

                  {/* Duration */}
                  <div className="flex items-center gap-1.5 text-xs text-slate-300 font-semibold mb-6 bg-slate-800/80 px-3 py-1.5 rounded-lg w-fit">
                    <Clock className="w-3.5 h-3.5 text-cyan-400 transition-transform duration-300 group-hover:rotate-12" />
                    <span>Takes approx. {pkg.durationMinutes} mins</span>
                  </div>

                  <p className="text-slate-300 text-xs leading-relaxed mb-6">
                    {pkg.description}
                  </p>

                  {/* Features List */}
                  <div className="space-y-3">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                      Service Checklist ({pkg.features.length} items)
                    </span>
                    {pkg.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2 text-xs">
                        <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span className="text-slate-200 font-medium leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Book Action */}
                <div className="mt-8 pt-4 border-t border-slate-800">
                  <motion.button
                    onClick={() => onSelectPackage(pkg.id, selectedVehicle)}
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                    className={`w-full py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                      pkg.popular
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:opacity-90 shadow-md shadow-blue-500/15'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700'
                    }`}
                  >
                    <span>Schedule Booking</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Quality Assurances */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-16 bg-gradient-to-r from-slate-900 to-slate-950 text-white rounded-3xl p-8 shadow-xl border border-slate-800 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10 items-stretch">
            <motion.div 
              whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3)" }}
              className="flex items-center gap-4 bg-white/5 p-5 rounded-2xl border border-white/10 group transition-all duration-300"
            >
              <div className="bg-cyan-500/10 p-4 rounded-2xl border border-cyan-500/20 text-cyan-400 shrink-0 transition-transform duration-300 group-hover:rotate-12">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <div>
                <h4 className="font-extrabold text-white text-base">Scratch-Free Wash Guarantee</h4>
                <p className="text-slate-300 text-xs leading-relaxed mt-1">We use professional pH-neutral shampoos and active foam combined with high-grade ultra-dense microfibers.</p>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3)" }}
              className="flex items-center gap-4 bg-white/5 p-5 rounded-2xl border border-white/10 group transition-all duration-300"
            >
              <div className="bg-cyan-500/10 p-4 rounded-2xl border border-cyan-500/20 text-cyan-400 shrink-0 transition-transform duration-300 group-hover:rotate-12">
                <Heart className="w-8 h-8" />
              </div>
              <div>
                <h4 className="font-extrabold text-white text-base">Trained Detailers</h4>
                <p className="text-slate-300 text-xs leading-relaxed mt-1">Our washing experts are certified detailing specialists trained in premium ceramic polishes and high-pressure tech.</p>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3)" }}
              className="flex items-center gap-4 bg-white/5 p-5 rounded-2xl border border-white/10 group transition-all duration-300"
            >
              <div className="bg-cyan-500/10 p-4 rounded-2xl border border-cyan-500/20 text-cyan-400 shrink-0 transition-transform duration-300 group-hover:rotate-12">
                <Clock className="w-8 h-8" />
              </div>
              <div>
                <h4 className="font-extrabold text-white text-base">Punctual Slot Fulfillment</h4>
                <p className="text-slate-300 text-xs leading-relaxed mt-1">We respect your calendar. If you book an online slot, we get to work exactly at your scheduled time. No queue wait!</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

