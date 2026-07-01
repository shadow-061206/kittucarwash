import { useState, useEffect, useRef, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Clock, Car, User, Phone, Clipboard, Sparkles, CheckCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { SERVICE_PACKAGES, ADD_ONS, TIME_SLOTS, VEHICLE_LABELS } from '../data';
import { VehicleType, Booking } from '../types';

interface BookingFormProps {
  initialVehicleType?: VehicleType;
  initialPackageId?: string;
  onBookingSuccess: () => void;
}

export default function BookingForm({
  initialVehicleType = 'sedan',
  initialPackageId = 'kittu-signature',
  onBookingSuccess,
}: BookingFormProps) {
  // Form States
  const [vehicleType, setVehicleType] = useState<VehicleType>(initialVehicleType);
  const [packageId, setPackageId] = useState<string>(initialPackageId);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [selectedDateIndex, setSelectedDateIndex] = useState<number>(0);
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [vehicleNumber, setVehicleNumber] = useState<string>('');

  // Scroll Progress and Ref for Date Selector
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const maxScrollLeft = container.scrollWidth - container.clientWidth;
      if (maxScrollLeft > 0) {
        setScrollProgress((container.scrollLeft / maxScrollLeft) * 100);
      } else {
        setScrollProgress(0);
      }
    }
  };

  const scrollDates = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = 150;
      const targetScroll = container.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      container.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  // UI Flow States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [createdBooking, setCreatedBooking] = useState<Booking | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Dynamic values based on parameters
  useEffect(() => {
    if (initialVehicleType) {
      setVehicleType(initialVehicleType);
    }
    if (initialPackageId) {
      setPackageId(initialPackageId);
    }
  }, [initialVehicleType, initialPackageId]);

  // Generate next 7 days for the date picker
  const [next7Days, setNext7Days] = useState<{ dateStr: string; label: string; weekday: string }[]>([]);

  useEffect(() => {
    const days = [];
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);

      let label = '';
      if (i === 0) label = 'Today';
      else if (i === 1) label = 'Tomorrow';
      else label = `${d.getDate()} ${months[d.getMonth()]}`;

      days.push({
        dateStr: d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
        label: label,
        weekday: weekdays[d.getDay()],
      });
    }
    setNext7Days(days);
    // Pre-select first slot
    setSelectedSlot(TIME_SLOTS[1]);
  }, []);

  const activePackage = SERVICE_PACKAGES.find((p) => p.id === packageId) || SERVICE_PACKAGES[1];
  const packagePrice = activePackage.basePrices[vehicleType];

  const totalAddOnsPrice = selectedAddOns.reduce((sum, addOnId) => {
    const option = ADD_ONS.find((a) => a.id === addOnId);
    return sum + (option?.price || 0);
  }, 0);

  const grandTotalPrice = packagePrice + totalAddOnsPrice;

  const toggleAddOn = (id: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!customerName.trim()) errors.customerName = 'Please enter your name';
    if (!customerPhone.trim()) {
      errors.customerPhone = 'Phone number is required';
    } else if (!/^[6-9]\d{9}$/.test(customerPhone.trim())) {
      errors.customerPhone = 'Please enter a valid 10-digit mobile number';
    }
    if (!vehicleNumber.trim()) {
      errors.vehicleNumber = 'Please enter vehicle registration number';
    } else if (vehicleNumber.trim().length < 4) {
      errors.vehicleNumber = 'Registration number should be complete';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const bookingId = Math.random().toString(36).substring(2, 8);
      const newBooking: Booking = {
        id: bookingId,
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        vehicleNumber: vehicleNumber.trim().toUpperCase(),
        vehicleType,
        packageId,
        packageName: activePackage.name,
        packagePrice,
        selectedAddOns,
        addOnsPrice: totalAddOnsPrice,
        date: next7Days[selectedDateIndex]?.dateStr || '',
        timeSlot: selectedSlot,
        totalPrice: grandTotalPrice,
        status: 'confirmed',
        createdAt: new Date().toISOString(),
      };

      // Save to localStorage
      try {
        const stored = localStorage.getItem('kittu_bookings');
        const list = stored ? JSON.parse(stored) : [];
        list.push(newBooking);
        localStorage.setItem('kittu_bookings', JSON.stringify(list));
      } catch (err) {
        console.error("Local Storage save error", err);
      }

      setCreatedBooking(newBooking);
      setIsSubmitting(false);
      setShowSuccess(true);
      onBookingSuccess();

      // Reset form fields
      setCustomerName('');
      setCustomerPhone('');
      setVehicleNumber('');
      setSelectedAddOns([]);
    }, 1200);
  };

  const getWhatsAppLink = (booking: Booking) => {
    const businessPhone = '918825214538'; // Kittu Car Washing Patna WhatsApp Line
    const addOnsText = booking.selectedAddOns.length > 0
      ? `\n➕ *Add-ons:* ${booking.selectedAddOns.map((id) => ADD_ONS.find((a) => a.id === id)?.name).join(', ')}`
      : '';
    const message = `*Kittu Car Washing Detailing Booking* 🚘✨\n\n` +
      `🆔 *Booking ID:* KITTU-${booking.id.toUpperCase()}\n` +
      `👤 *Name:* ${booking.customerName}\n` +
      `📞 *Phone:* ${booking.customerPhone}\n` +
      `🚗 *Vehicle Type:* ${VEHICLE_LABELS[booking.vehicleType] || booking.vehicleType}\n` +
      `🔢 *Vehicle Number:* ${booking.vehicleNumber}\n` +
      `📦 *Package:* ${booking.packageName} (₹${booking.packagePrice})\n` +
      `📅 *Date:* ${booking.date}\n` +
      `⏰ *Time Slot:* ${booking.timeSlot}${addOnsText}\n\n` +
      `💰 *Total Amount:* ₹${booking.totalPrice} (Pay after service)\n\n` +
      `Please confirm my booking slot. Thank you!`;
    return `https://wa.me/${businessPhone}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-xl relative" id="quick-booking-form">
      <AnimatePresence mode="wait">
        {!showSuccess ? (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Form Fields Column */}
            <div className="lg:col-span-7 space-y-6 lg:max-h-[640px] lg:overflow-y-auto lg:pr-4 form-scrollbar">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-sky-500" />
                  Configure Your Detailing appointment
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Fill in your details, select a package, and choose your preferred schedule slot.
                </p>
              </div>

              {/* 1. Vehicle Type Selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  1. Select Vehicle Category
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {Object.entries(VEHICLE_LABELS).map(([key, label]) => {
                    const isSelected = vehicleType === key;
                    const icon = key === 'bike' ? '🏍️' : key === 'hatchback' ? '🚗' : key === 'sedan' ? '🚘' : '🚙';
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setVehicleType(key as VehicleType)}
                        className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all ${
                          isSelected
                            ? 'border-sky-500 bg-sky-50 text-sky-600 font-bold ring-1 ring-sky-500/20'
                            : 'border-slate-200 hover:border-slate-300 text-slate-600'
                        }`}
                      >
                        <span className="text-2xl mb-1">{icon}</span>
                        <span className="text-xs tracking-tight line-clamp-1">{label.split(' ')[0]}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Package Selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  2. Choose Detailing Package
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {SERVICE_PACKAGES.map((pkg) => {
                    const isSelected = packageId === pkg.id;
                    const price = pkg.basePrices[vehicleType];
                    return (
                      <button
                        key={pkg.id}
                        type="button"
                        onClick={() => setPackageId(pkg.id)}
                        className={`flex items-start justify-between p-3.5 rounded-xl border text-left transition-all ${
                          isSelected
                            ? 'border-sky-500 bg-sky-50/50 text-sky-900 font-medium ring-1 ring-sky-500/10'
                            : 'border-slate-200 hover:border-slate-300 text-slate-600'
                        }`}
                      >
                        <div className="space-y-1">
                          <span className={`text-xs font-bold block ${isSelected ? 'text-sky-600' : 'text-slate-800'}`}>
                            {pkg.name}
                          </span>
                          <span className="text-[10px] text-slate-400 block line-clamp-1">
                            Takes ~{pkg.durationMinutes} mins
                          </span>
                        </div>
                        <span className="text-sm font-black text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">
                          ₹{price}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Date Picker (Next 7 Days Cards) */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  3. Select Date
                </label>
                <div
                  ref={scrollContainerRef}
                  onScroll={handleScroll}
                  className="flex gap-2 overflow-x-auto pb-2.5 date-scrollbar scroll-smooth"
                >
                  {next7Days.map((day, idx) => {
                    const isSelected = selectedDateIndex === idx;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedDateIndex(idx)}
                        className={`flex flex-col items-center justify-center p-3 rounded-xl border min-w-[80px] shrink-0 text-center transition-all ${
                          isSelected
                            ? 'border-sky-500 bg-sky-500 text-white font-bold shadow-md shadow-sky-500/10'
                            : 'border-slate-200 bg-white hover:border-slate-300 text-slate-600'
                        }`}
                      >
                        <span className={`text-[10px] uppercase font-bold tracking-wider ${isSelected ? 'text-sky-100' : 'text-slate-400'}`}>
                          {day.weekday.substring(0, 3)}
                        </span>
                        <span className="text-sm font-black mt-1 leading-none">{day.label.split(' ')[0]}</span>
                        <span className={`text-[9px] font-semibold mt-0.5 ${isSelected ? 'text-sky-100' : 'text-slate-500'}`}>
                          {day.label.split(' ')[1] || day.weekday}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Custom scroll navigation track beneath the date cards */}
                <div className="flex items-center gap-3 mt-2 px-1">
                  <button
                    type="button"
                    onClick={() => scrollDates('left')}
                    className="p-1 rounded text-slate-400 hover:text-sky-500 hover:bg-slate-100 transition-colors cursor-pointer flex items-center justify-center select-none"
                    aria-label="Scroll left"
                  >
                    <span className="text-[10px] font-bold">◀</span>
                  </button>

                  <div className="flex-1 h-1.5 bg-slate-100 rounded-full relative overflow-hidden">
                    <div
                      className="absolute top-0 bottom-0 bg-slate-400 rounded-full transition-all duration-75"
                      style={{
                        left: `${(scrollProgress / 100) * 80}%`,
                        width: '20%',
                      }}
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => scrollDates('right')}
                    className="p-1 rounded text-slate-400 hover:text-sky-500 hover:bg-slate-100 transition-colors cursor-pointer flex items-center justify-center select-none"
                    aria-label="Scroll right"
                  >
                    <span className="text-[10px] font-bold">▶</span>
                  </button>
                </div>
              </div>

              {/* 4. Time Slot Grid */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  4. Choose Time Slot
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                  {TIME_SLOTS.map((slot, idx) => {
                    const isSelected = selectedSlot === slot;
                    // Mock peak alerts for design realism
                    const isPeak = idx === 1 || idx === 2 || idx === 7;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedSlot(slot)}
                        className={`p-2.5 rounded-lg border text-center transition-all relative ${
                          isSelected
                            ? 'border-sky-500 bg-sky-50 text-sky-600 font-bold'
                            : 'border-slate-200 hover:border-slate-300 text-slate-600 text-xs'
                        }`}
                      >
                        <span className="text-[11px] font-semibold block">{slot}</span>
                        {isPeak && (
                          <span className="absolute -top-1 -right-1 flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 5. Custom Add-ons Checkboxes */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  5. Add Detailing Upgrades (Optional)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {ADD_ONS.map((option) => {
                    const isChecked = selectedAddOns.includes(option.id);
                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => toggleAddOn(option.id)}
                        className={`flex items-start gap-3 p-3 rounded-xl border text-left transition-all ${
                          isChecked
                            ? 'border-sky-500 bg-sky-50/30'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}} // Controlled by button click
                          className="mt-1 h-3.5 w-3.5 rounded border-slate-300 text-sky-500 focus:ring-sky-500"
                        />
                        <div className="space-y-0.5 flex-1">
                          <span className="text-xs font-bold text-slate-800 block leading-tight">
                            {option.name}
                          </span>
                          <span className="text-[10px] text-slate-500 block leading-normal line-clamp-1">
                            {option.description}
                          </span>
                        </div>
                        <span className="text-xs font-extrabold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded shrink-0">
                          +₹{option.price}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 6. Personal Contacts Form */}
              <div className="space-y-3 pt-3 border-t border-slate-100">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  6. Customer & Car Registration Details
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Owner Full Name"
                        value={customerName}
                        onChange={(e) => {
                          setCustomerName(e.target.value);
                          if (formErrors.customerName) setFormErrors({ ...formErrors, customerName: '' });
                        }}
                        className={`w-full pl-9 pr-4 py-2.5 rounded-xl border text-sm text-slate-800 focus:outline-none focus:ring-1 focus:ring-sky-500 ${
                          formErrors.customerName ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200'
                        }`}
                      />
                    </div>
                    {formErrors.customerName && (
                      <span className="text-[10px] text-rose-500 font-medium pl-1">{formErrors.customerName}</span>
                    )}
                  </div>

                  <div className="space-y-1">
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="tel"
                        maxLength={10}
                        placeholder="10-Digit Phone Number"
                        value={customerPhone}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '');
                          setCustomerPhone(val);
                          if (formErrors.customerPhone) setFormErrors({ ...formErrors, customerPhone: '' });
                        }}
                        className={`w-full pl-9 pr-4 py-2.5 rounded-xl border text-sm text-slate-800 focus:outline-none focus:ring-1 focus:ring-sky-500 ${
                          formErrors.customerPhone ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200'
                        }`}
                      />
                    </div>
                    {formErrors.customerPhone && (
                      <span className="text-[10px] text-rose-500 font-medium pl-1">{formErrors.customerPhone}</span>
                    )}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="relative">
                    <Car className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Car Plate Number (e.g. KA-05-MD-1234)"
                      value={vehicleNumber}
                      onChange={(e) => {
                        setVehicleNumber(e.target.value);
                        if (formErrors.vehicleNumber) setFormErrors({ ...formErrors, vehicleNumber: '' });
                      }}
                      className={`w-full pl-9 pr-4 py-2.5 rounded-xl border text-sm text-slate-800 focus:outline-none focus:ring-1 focus:ring-sky-500 uppercase ${
                        formErrors.vehicleNumber ? 'border-rose-400 bg-rose-50/20' : 'border-slate-200'
                      }`}
                    />
                  </div>
                  {formErrors.vehicleNumber && (
                    <span className="text-[10px] text-rose-500 font-medium pl-1">{formErrors.vehicleNumber}</span>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar Pricing breakdown card */}
            <div className="lg:col-span-5">
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/60 sticky top-6 space-y-5">
                <div>
                  <h4 className="font-extrabold text-slate-800 text-sm tracking-tight">Booking Summary</h4>
                  <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Real-time calculations for Kittu Car Washing</p>
                </div>

                {/* Breakdown Itemizer */}
                <div className="space-y-3.5 text-xs">
                  <div className="flex justify-between items-baseline">
                    <span className="text-slate-500 font-medium">Selected Vehicle:</span>
                    <span className="font-bold text-slate-800 bg-slate-200 px-2.5 py-0.5 rounded text-[10px]">
                      {VEHICLE_LABELS[vehicleType]}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">Base Package ({activePackage.name}):</span>
                    <span className="font-extrabold text-slate-800">₹{packagePrice}</span>
                  </div>

                  {selectedAddOns.length > 0 && (
                    <div className="space-y-1.5 pt-2.5 border-t border-dashed border-slate-200">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Add-ons Upgrade:</span>
                      {selectedAddOns.map((addOnId) => {
                        const option = ADD_ONS.find((o) => o.id === addOnId);
                        return (
                          <div key={addOnId} className="flex justify-between text-[11px]">
                            <span className="text-slate-500">+ {option?.name}</span>
                            <span className="font-semibold text-slate-700">₹{option?.price}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  <div className="flex justify-between pt-2.5 border-t border-slate-200 text-sm">
                    <span className="text-slate-500 font-medium">Estimated Wash Time:</span>
                    <span className="font-bold text-sky-600">~{activePackage.durationMinutes} Minutes</span>
                  </div>

                  <div className="flex justify-between pt-2.5 border-t border-slate-200 text-xs">
                    <span className="text-slate-500 font-medium">Scheduled Time:</span>
                    <span className="font-bold text-slate-700">
                      {next7Days[selectedDateIndex]?.label}, {selectedSlot}
                    </span>
                  </div>

                  {/* GRAND TOTAL */}
                  <div className="pt-4 border-t border-slate-300 flex items-baseline justify-between">
                    <span className="font-extrabold text-slate-800 text-sm">Total to Pay:</span>
                    <div className="text-right">
                      <span className="text-3xl font-black text-sky-600 tracking-tight">₹{grandTotalPrice}</span>
                      <span className="text-[10px] text-slate-400 block font-semibold mt-0.5">Price Includes GST</span>
                    </div>
                  </div>
                </div>

                {/* Pay at Desk Assurance */}
                <div className="p-3 bg-sky-50 border border-sky-100 rounded-xl text-sky-800 flex items-start gap-2.5 text-xs">
                  <ShieldCheck className="w-5 h-5 text-sky-500 shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <span className="font-bold block">No Pre-Payment Required!</span>
                    <span className="text-sky-600 leading-normal block">
                      Pay securely at the counter via UPI, Card, or Cash *after* your car wash is fully completed and approved by you!
                    </span>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-extrabold text-base transition-all shadow-lg shadow-sky-500/20 flex items-center justify-center gap-2 disabled:bg-slate-300 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-95 cursor-pointer animate-pulse"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/50 border-t-white rounded-full animate-spin" />
                      <span>Booking via WhatsApp...</span>
                    </>
                  ) : (
                    <>
                      <span>Confirm & Book on WhatsApp</span>
                      <span className="text-lg">💬</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        ) : (
          /* Glowing Booking Confirmation Screen */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-10 max-w-xl mx-auto space-y-6"
          >
            <div className="w-20 h-20 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-md">
              <CheckCircle className="w-12 h-12" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">Booking Fully Registered!</h3>
              <p className="text-slate-500 text-sm">
                Your appointment slot is reserved locally. Please finalize it by sending the booking receipt to our official WhatsApp support.
              </p>
            </div>

            {/* Ticket Card Summary */}
            {createdBooking && (
              <>
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 text-left space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-dashed border-slate-200">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Appointment ID</span>
                      <h5 className="font-mono text-base font-black text-slate-800 tracking-wide">
                        KITTU-{createdBooking.id.toUpperCase()}
                      </h5>
                    </div>
                    <span className="bg-emerald-100 text-emerald-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                      Awaiting Send
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs text-slate-600">
                    <div>
                      <span className="text-slate-400 block font-semibold">Service:</span>
                      <span className="font-bold text-slate-800 block">{createdBooking.packageName}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-semibold">Vehicle:</span>
                      <span className="font-bold text-slate-800 block uppercase">
                        {VEHICLE_LABELS[createdBooking.vehicleType]} ({createdBooking.vehicleNumber})
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-semibold">Scheduled Date:</span>
                      <span className="font-bold text-slate-800 block">{createdBooking.date}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-semibold">Reserved Slot:</span>
                      <span className="font-bold text-slate-800 block">{createdBooking.timeSlot}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline">
                    <span className="text-xs font-bold text-slate-500">Pay at Counter:</span>
                    <span className="text-2xl font-black text-sky-600">₹{createdBooking.totalPrice}</span>
                  </div>
                </div>

                {/* Primary WhatsApp Booking Confirmation CTA */}
                <div className="p-5 bg-emerald-50 border border-emerald-100 rounded-2xl flex flex-col items-center gap-3.5 shadow-sm">
                  <span className="text-xs font-bold text-emerald-800 text-center leading-relaxed">
                    💬 Click below to send this ticket to our manager on WhatsApp to finalize your instant confirmation!
                  </span>
                  <a
                    href={getWhatsAppLink(createdBooking)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 bg-[#25D366] hover:bg-[#20ba5a] text-white font-black text-sm uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-emerald-500/30 animate-pulse active:scale-[0.98] cursor-pointer"
                  >
                    <span>Send Booking to WhatsApp</span>
                    <span className="text-lg">💬</span>
                  </a>
                </div>
              </>
            )}

            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={() => setShowSuccess(false)}
                className="px-5 py-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-extrabold transition-all active:scale-95"
              >
                Book Another Car
              </button>
              <button
                onClick={() => {
                  setShowSuccess(false);
                  // Invoke parent tab transition if defined
                  onBookingSuccess();
                }}
                className="px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-xs font-extrabold transition-all shadow-md shadow-sky-500/10 active:scale-95"
              >
                Go to My Bookings
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
