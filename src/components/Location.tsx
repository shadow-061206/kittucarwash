import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { MapPin, Clock, Phone, Copy, Check, Navigation, Calendar } from 'lucide-react';
import { BUSINESS_INFO } from '../data';

export default function Location() {
  const [copied, setCopied] = useState(false);
  const [isOpenNow, setIsOpenNow] = useState(true);

  // Check if the service is open right now
  useEffect(() => {
    const checkOpenStatus = () => {
      const now = new Date();
      const hours = now.getHours();
      // Operation hours: 7:00 AM (7) to 9:00 PM (21)
      if (hours >= 7 && hours < 21) {
        setIsOpenNow(true);
      } else {
        setIsOpenNow(false);
      }
    };
    checkOpenStatus();
    const interval = setInterval(checkOpenStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  const copyAddress = () => {
    navigator.clipboard.writeText(BUSINESS_INFO.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const mapUrl = `https://maps.google.com/maps?q=${BUSINESS_INFO.coords.lat},${BUSINESS_INFO.coords.lng}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <section className="py-20 px-4 bg-slate-50 relative" id="location-details">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="px-3.5 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-semibold tracking-wider uppercase mb-3 inline-block"
          >
            Find Our Station
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight"
          >
            Exact Location & Contact Info
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-3 text-slate-600 max-w-xl mx-auto text-sm md:text-base"
          >
            We are located right off the main service lane of the Outer Ring Road for easy drive-in and quick exits.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Detailed Info Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col justify-between space-y-6"
          >
            {/* Status Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-sky-50 rounded-full blur-3xl pointer-events-none" />
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider block mb-1">Current Status</span>
                  <div className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${isOpenNow ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
                    <span className={`text-lg font-bold ${isOpenNow ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {isOpenNow ? 'WE ARE OPEN NOW' : 'CLOSED NOW'}
                    </span>
                  </div>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <Clock className="w-6 h-6 text-brand-secondary" />
                </div>
              </div>
              <p className="mt-3 text-xs text-slate-500 italic">
                Operational hours: {BUSINESS_INFO.hours.weekdays}. Stop by for a shiny surprise!
              </p>
            </div>

            {/* Address Details Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-6">
              <div className="flex gap-4">
                <div className="bg-sky-50 p-3.5 rounded-xl text-brand-primary h-12 w-12 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="space-y-2 flex-1">
                  <h3 className="font-bold text-slate-900 text-base">Physical Address</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{BUSINESS_INFO.address}</p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    <motion.button
                      onClick={copyAddress}
                      whileHover={{ scale: 1.05, y: -1 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 text-xs font-semibold transition-colors border border-slate-200"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-600">Copied Address!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Address</span>
                        </>
                      )}
                    </motion.button>

                    <motion.a
                      href={`https://maps.google.com/?q=${encodeURIComponent(BUSINESS_INFO.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05, y: -1 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-primary hover:bg-[#0b3c66] text-white text-xs font-semibold transition-all shadow-sm shadow-brand-primary/10"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Get Driving Directions</span>
                    </motion.a>
                  </div>
                </div>
              </div>

              <hr className="border-slate-100" />

              <div className="flex gap-4">
                <div className="bg-sky-50 p-3.5 rounded-xl text-brand-primary h-12 w-12 flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-slate-900 text-base">Opening Hours</h3>
                  <div className="text-sm text-slate-600 space-y-1">
                    <p className="flex justify-between gap-6">
                      <span className="font-medium text-slate-500">Mon - Fri:</span>
                      <span>{BUSINESS_INFO.hours.weekdays}</span>
                    </p>
                    <p className="flex justify-between gap-6">
                      <span className="font-medium text-slate-500">Sat - Sun:</span>
                      <span>{BUSINESS_INFO.hours.weekends}</span>
                    </p>
                    <p className="text-xs text-brand-primary font-medium pt-1">
                      * {BUSINESS_INFO.hours.note}
                    </p>
                  </div>
                </div>
              </div>

              <hr className="border-slate-100" />

              <div className="flex gap-4">
                <div className="bg-sky-50 p-3.5 rounded-xl text-brand-primary h-12 w-12 flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-slate-900 text-base">Direct Helpline</h3>
                  <p className="text-lg font-bold text-slate-900">{BUSINESS_INFO.phone}</p>
                  <p className="text-xs text-slate-500">Call for query, special fleet orders, or customized detailing.</p>
                </div>
              </div>
            </div>

            {/* Quick Tips Box */}
            <div className="bg-gradient-to-r from-brand-primary to-brand-secondary rounded-2xl p-5 text-white shadow-md shadow-brand-primary/10">
              <h4 className="font-bold text-sm uppercase tracking-wide flex items-center gap-2 mb-1.5">
                <Calendar className="w-4.5 h-4.5" />
                Quick Service Tip
              </h4>
              <p className="text-xs text-white/95 leading-relaxed">
                Sundays are our peak operational days. We strongly recommend booking your custom slot online between 8:00 AM to 11:30 AM to skip the physical wash queues!
              </p>
            </div>
          </motion.div>

          {/* Interactive Map Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col"
          >
            <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 flex-1 flex flex-col overflow-hidden h-[400px] lg:h-auto min-h-[380px]">
              <div className="flex items-center gap-2 px-3 pb-3 pt-1 border-b border-slate-100 shrink-0">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
                <span className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Live Satellite Positioning GPS Map</span>
              </div>
              <div className="flex-1 rounded-xl overflow-hidden relative border border-slate-100 mt-3">
                <iframe
                  title="Kittu Car Washing Location Map"
                  src={mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
