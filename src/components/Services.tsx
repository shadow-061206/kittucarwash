import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Clock, ShieldCheck, HelpCircle, ArrowRight, Star, Heart } from 'lucide-react';
import { SERVICE_PACKAGES, VEHICLE_LABELS } from '../data';
import { VehicleType, ServicePackage } from '../types';

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
    <section className="py-20 px-4 bg-white relative overflow-hidden" id="services-showcase">
      {/* Decorative Blur Elements */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-sky-100 rounded-full blur-3xl pointer-events-none opacity-60" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-indigo-50 rounded-full blur-3xl pointer-events-none opacity-60" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="px-3.5 py-1.5 rounded-full bg-sky-500/10 text-sky-600 text-xs font-semibold tracking-wider uppercase mb-3 inline-block"
          >
            Our Care Packages
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight"
          >
            Professional Detailing & Washing Services
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-3 text-slate-600 text-sm md:text-base"
          >
            Select your vehicle category below to view customized high-precision pricing, operational durations, and complete checklist procedures.
          </motion.p>

          {/* Vehicle Switcher Bar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-8 inline-flex p-1.5 bg-slate-100 rounded-2xl border border-slate-200 shadow-inner max-w-full overflow-x-auto"
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
                    ? 'bg-white text-sky-600 shadow-md border-b-2 border-sky-500'
                    : 'text-slate-600 hover:text-slate-900'
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
                whileHover={{ y: -8 }}
                className={`relative flex flex-col justify-between rounded-2xl bg-white p-6 transition-all duration-300 border ${
                  pkg.popular
                    ? 'border-sky-500 shadow-lg shadow-sky-500/5 ring-1 ring-sky-500/20'
                    : 'border-slate-200 shadow-sm'
                }`}
              >
                {pkg.popular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-sky-500 to-blue-600 text-white text-[10px] font-bold tracking-widest uppercase px-3.5 py-1.5 rounded-full shadow-md flex items-center gap-1">
                    <Star className="w-3 h-3 fill-white" /> Recommended Choice
                  </span>
                )}

                <div>
                  {/* Name and tagline */}
                  <div className="mb-4">
                    <h3 className="text-xl font-extrabold text-slate-900 tracking-tight leading-snug">
                      {pkg.name}
                    </h3>
                    <p className="text-xs text-sky-600 font-semibold mt-1 uppercase tracking-wide">
                      {pkg.tagline}
                    </p>
                  </div>

                  {/* Pricing dynamic display */}
                  <div className="my-5 pb-5 border-b border-slate-100 flex items-baseline gap-1.5">
                    <span className="text-xs font-semibold text-slate-400">₹</span>
                    <span className="text-4xl font-black text-slate-900 tracking-tight">
                      {price}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">/ flat rate</span>
                  </div>

                  {/* Duration */}
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold mb-6 bg-slate-50 px-3 py-1.5 rounded-lg w-fit">
                    <Clock className="w-3.5 h-3.5 text-sky-500" />
                    <span>Takes approx. {pkg.durationMinutes} mins</span>
                  </div>

                  <p className="text-slate-600 text-xs leading-relaxed mb-6">
                    {pkg.description}
                  </p>

                  {/* Features List */}
                  <div className="space-y-3">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Service Checklist ({pkg.features.length} items)
                    </span>
                    {pkg.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2 text-xs">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="text-slate-700 font-medium leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Book Action */}
                <div className="mt-8 pt-4 border-t border-slate-100">
                  <motion.button
                    onClick={() => onSelectPackage(pkg.id, selectedVehicle)}
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                    className={`w-full py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                      pkg.popular
                        ? 'bg-sky-500 text-white hover:bg-sky-600 shadow-md shadow-sky-500/15'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
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
          className="mt-16 bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-3xl p-8 shadow-xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10 items-center">
            <div className="flex items-center gap-4">
              <div className="bg-sky-500/20 p-4 rounded-2xl border border-sky-400/20 text-sky-400 shrink-0">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <div>
                <h4 className="font-extrabold text-white text-base">Scratch-Free Wash Guarantee</h4>
                <p className="text-slate-300 text-xs leading-relaxed mt-1">We use professional pH-neutral shampoos and active foam combined with high-grade ultra-dense microfibers.</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-sky-500/20 p-4 rounded-2xl border border-sky-400/20 text-sky-400 shrink-0">
                <Heart className="w-8 h-8" />
              </div>
              <div>
                <h4 className="font-extrabold text-white text-base">Trained Detailers</h4>
                <p className="text-slate-300 text-xs leading-relaxed mt-1">Our washing experts are certified detailing specialists trained in premium ceramic polishes and high-pressure tech.</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-sky-500/20 p-4 rounded-2xl border border-sky-400/20 text-sky-400 shrink-0">
                <Clock className="w-8 h-8" />
              </div>
              <div>
                <h4 className="font-extrabold text-white text-base">Punctual Slot Fulfillment</h4>
                <p className="text-slate-300 text-xs leading-relaxed mt-1">We respect your calendar. If you book an online slot, we get to work exactly at your scheduled time. No queue wait!</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
