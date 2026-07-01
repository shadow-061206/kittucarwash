import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trash2, CheckCircle, Calendar, Clock, Car, Tag, XCircle, ChevronDown, ChevronUp, RefreshCw, AlertCircle } from 'lucide-react';
import { Booking } from '../types';
import { VEHICLE_LABELS, SERVICE_PACKAGES, ADD_ONS } from '../data';

interface MyBookingsProps {
  refreshTrigger: number;
  onSelectBookingTab: () => void;
}

export default function MyBookings({ refreshTrigger, onSelectBookingTab }: MyBookingsProps) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [expandedBooking, setExpandedBooking] = useState<string | null>(null);

  const getWhatsAppLink = (booking: Booking) => {
    const businessPhone = '918825214538';
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

  const fetchBookings = () => {
    try {
      const stored = localStorage.getItem('kittu_bookings');
      if (stored) {
        const parsed = JSON.parse(stored) as Booking[];
        // Sort newest first
        parsed.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setBookings(parsed);
      } else {
        setBookings([]);
      }
    } catch (e) {
      console.error("Error fetching bookings", e);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [refreshTrigger]);

  const cancelBooking = (id: string) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      const updated = bookings.map((b) => {
        if (b.id === id) {
          return { ...b, status: 'cancelled' as const };
        }
        return b;
      });
      localStorage.setItem('kittu_bookings', JSON.stringify(updated));
      fetchBookings();
    }
  };

  const deleteBooking = (id: string) => {
    if (window.confirm("Delete this booking from your history?")) {
      const updated = bookings.filter((b) => b.id !== id);
      localStorage.setItem('kittu_bookings', JSON.stringify(updated));
      fetchBookings();
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedBooking(expandedBooking === id ? null : id);
  };

  if (bookings.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-10 border border-slate-100 text-center max-w-2xl mx-auto shadow-sm">
        <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
          <Car className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-slate-800">No active bookings found</h3>
        <p className="text-slate-500 text-sm mt-2 max-w-md mx-auto">
          You haven't scheduled any car washes yet! Book your package online today to guarantee premium service without any waiting time.
        </p>
        <button
          onClick={onSelectBookingTab}
          className="mt-6 px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-sm transition-all shadow-md shadow-sky-500/10 active:scale-95"
        >
          Book Your First Wash Now
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          <span>Active Bookings & History</span>
          <span className="bg-sky-100 text-sky-600 text-xs font-bold px-2.5 py-1 rounded-full">
            {bookings.length}
          </span>
        </h3>
        <button
          onClick={fetchBookings}
          className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-50 transition-colors border border-slate-200"
          title="Refresh List"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-4">
        {bookings.map((booking) => {
          const isCancelled = booking.status === 'cancelled';
          const isExpanded = expandedBooking === booking.id;

          return (
            <motion.div
              key={booking.id}
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className={`rounded-2xl border transition-all overflow-hidden bg-white shadow-sm ${
                isCancelled ? 'border-slate-200 opacity-75' : 'border-sky-100 hover:border-sky-200'
              }`}
            >
              {/* Card Header Summary */}
              <div
                onClick={() => toggleExpand(booking.id)}
                className="p-5 flex flex-wrap items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50 select-none"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${isCancelled ? 'bg-slate-100 text-slate-400' : 'bg-sky-50 text-sky-600'}`}>
                    <Car className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-slate-900 text-base">
                        {booking.packageName}
                      </span>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          isCancelled
                            ? 'bg-rose-100 text-rose-600'
                            : 'bg-emerald-100 text-emerald-600'
                        }`}
                      >
                        {booking.status}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {booking.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {booking.timeSlot}
                      </span>
                      <span className="font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                        {booking.vehicleNumber}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Total Amount</span>
                    <span className="text-lg font-black text-slate-900">₹{booking.totalPrice}</span>
                  </div>
                  <div className="text-slate-400 hover:text-slate-600">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </div>
              </div>

              {/* Collapsible Details Panel */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    className="overflow-hidden border-t border-slate-100 bg-slate-50/50"
                  >
                    <div className="p-6 space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Booking Ticket Details */}
                        <div className="space-y-4">
                          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                            Customer & Vehicle
                          </h4>
                          <div className="space-y-2.5 text-sm">
                            <p className="flex justify-between">
                              <span className="text-slate-500">Owner Name:</span>
                              <span className="font-bold text-slate-800">{booking.customerName}</span>
                            </p>
                            <p className="flex justify-between">
                              <span className="text-slate-500">Phone Number:</span>
                              <span className="font-bold text-slate-800">{booking.customerPhone}</span>
                            </p>
                            <p className="flex justify-between">
                              <span className="text-slate-500">Vehicle Type:</span>
                              <span className="font-bold text-slate-800">
                                {VEHICLE_LABELS[booking.vehicleType]}
                              </span>
                            </p>
                            <p className="flex justify-between">
                              <span className="text-slate-500">Vehicle Number:</span>
                              <span className="font-bold text-slate-800 uppercase bg-white px-2 py-0.5 border border-slate-200 rounded">
                                {booking.vehicleNumber}
                              </span>
                            </p>
                          </div>
                        </div>

                        {/* Cost Estimator Summary */}
                        <div className="space-y-4">
                          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                            Invoice Breakdown
                          </h4>
                          <div className="space-y-2.5 text-sm bg-white p-4 rounded-xl border border-slate-200/60">
                            <div className="flex justify-between">
                              <span className="text-slate-600">{booking.packageName}</span>
                              <span className="font-bold text-slate-800">₹{booking.packagePrice}</span>
                            </div>

                            {booking.selectedAddOns.length > 0 && (
                              <div className="space-y-1.5 pt-2 border-t border-dashed border-slate-100">
                                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Add-ons:</span>
                                {booking.selectedAddOns.map((addOnId) => {
                                  const addOn = ADD_ONS.find((a) => a.id === addOnId);
                                  return (
                                    <div key={addOnId} className="flex justify-between text-xs text-slate-600">
                                      <span>+ {addOn?.name}</span>
                                      <span>₹{addOn?.price}</span>
                                    </div>
                                  );
                                })}
                              </div>
                            )}

                            <div className="flex justify-between pt-2.5 border-t border-slate-100 font-extrabold text-base text-slate-900">
                              <span>Grand Total</span>
                              <span className="text-sky-600">₹{booking.totalPrice}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Ticket Pass design */}
                      {!isCancelled && (
                        <div className="bg-sky-50 rounded-2xl p-4 border border-dashed border-sky-200 flex flex-wrap items-center justify-between gap-4">
                          <div className="space-y-1">
                            <span className="text-[10px] font-bold text-sky-600 uppercase tracking-wider">Gate Checkpoint Ticket</span>
                            <h5 className="font-mono text-lg font-black text-slate-800 tracking-wider">KITTU-{booking.id.toUpperCase()}</h5>
                            <p className="text-xs text-slate-500 leading-relaxed">
                              Show this ticket ID or QR code to our desk staff when driving into our station to initiate work instantly.
                            </p>
                          </div>
                          {/* Visual custom QR Code placeholder */}
                          <div className="w-20 h-20 bg-white p-1 rounded-xl border border-slate-200 shrink-0 flex flex-col justify-between overflow-hidden">
                            <div className="grid grid-cols-5 gap-1 h-full w-full opacity-80">
                              {Array.from({ length: 25 }).map((_, i) => (
                                <div
                                  key={i}
                                  className={`rounded-sm ${(i + 3) % 4 === 0 || (i * 7) % 5 === 0 ? 'bg-slate-900' : 'bg-transparent'}`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Action buttons inside expanded area */}
                      <div className="flex flex-wrap justify-end gap-3 pt-2 border-t border-slate-100">
                        {!isCancelled && (
                          <a
                            href={getWhatsAppLink(booking)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold transition-all shadow-md hover:scale-[1.01] active:scale-95 cursor-pointer"
                          >
                            <span>Share on WhatsApp</span>
                            <span className="text-sm">💬</span>
                          </a>
                        )}
                        {isCancelled ? (
                          <button
                            onClick={() => deleteBooking(booking.id)}
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-slate-500 hover:text-rose-600 hover:bg-rose-50 text-xs font-bold transition-all border border-slate-200"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span>Remove Log</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => cancelBooking(booking.id)}
                            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-bold transition-all border border-rose-100 active:scale-95"
                          >
                            <XCircle className="w-4 h-4" />
                            <span>Cancel Service Appointment</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
