import { ServicePackage, AddOnOption, Testimonial, FAQItem } from './types';

export const VEHICLE_LABELS: Record<string, string> = {
  bike: 'Two Wheeler (Bike/Scooter)',
  hatchback: 'Hatchback',
  sedan: 'Sedan',
  suv: 'SUV / Compact SUV',
};

export const SERVICE_PACKAGES: ServicePackage[] = [
  {
    id: 'eco-wash',
    name: 'Eco Express Wash',
    tagline: 'Quick & Eco-friendly clean-up',
    description: 'Perfect for regular maintenance. A quick but high-quality exterior cleaning utilizing water-saving high-pressure washers.',
    basePrices: {
      bike: 150,
      hatchback: 350,
      sedan: 400,
      suv: 500,
    },
    features: [
      'High-pressure dual rinse',
      'pH-neutral active foam wash',
      'Microfiber hand drying',
      'Basic tire clean & spray',
      'Windshield streak-free wipe',
      'Eco-friendly water recovery use'
    ],
    durationMinutes: 20,
  },
  {
    id: 'kittu-signature',
    name: 'Kittu Signature Wash',
    tagline: 'Our most popular full-body wash',
    description: 'Our standard high-level wash that covers both the exterior and interior thoroughly. Brings back that showroom freshness.',
    basePrices: {
      bike: 300,
      hatchback: 600,
      sedan: 700,
      suv: 900,
    },
    features: [
      'Everything in Eco Express Wash',
      'Detailed underbody high-pressure wash',
      'All-wheel deep cleaning & tyre dressing',
      'Interior deep vacuuming (Seats & Mats)',
      'Dashboard, doors & trim cleaning & polish',
      'Perfume sanitization spray',
      'Paper mat placements'
    ],
    durationMinutes: 45,
    popular: true,
  },
  {
    id: 'deep-clean',
    name: 'Ultra Detailed Clean',
    tagline: 'Deep sanitization & shine',
    description: 'A deep restorative service targeting hidden dust, stubborn stains, and bacteria inside the cabin, plus intensive exterior work.',
    basePrices: {
      bike: 600,
      hatchback: 1200,
      sedan: 1400,
      suv: 1800,
    },
    features: [
      'Everything in Signature Wash',
      'Anti-bacterial steam sanitization (120°C)',
      'Upholstery shampoo & stain extraction',
      'AC vents deep cleaning with steam',
      'Engine bay wash & dressing coat',
      'Trunk space vacuum & reorganization',
      'Leather conditioning & dashboard UV shield'
    ],
    durationMinutes: 90,
  },
  {
    id: 'ceramic-shield',
    name: 'Ceramic Shield & Wax',
    tagline: 'Ultimate gloss & paint protection',
    description: 'Our top-tier premium detailing treatment. Restores paint depth, removes light swirls, and installs a brilliant hydrophobic armor.',
    basePrices: {
      bike: 1200,
      hatchback: 2500,
      sedan: 3000,
      suv: 3800,
    },
    features: [
      'Everything in Ultra Detailed Clean',
      'Premium clay bar treatment to remove grit',
      'Single-stage machine glow polish',
      'Ultra-glossy hybrid ceramic wax coating',
      'Hydrophobic rain shield on all glass',
      'Scratch-resistant sealant barrier',
      'Alloy wheel premium gloss coating'
    ],
    durationMinutes: 150,
  },
];

export const ADD_ONS: AddOnOption[] = [
  {
    id: 'engine-detailing',
    name: 'Engine Bay Detailing',
    description: 'Deep degreasing, steam wash, and protective dressing for engine components.',
    price: 300,
    icon: 'Cpu',
  },
  {
    id: 'rain-repellent',
    name: 'Hydrophobic Rain Repellent',
    description: 'Ultra-hydrophobic coat on windshield to ensure maximum safety during heavy monsoons.',
    price: 250,
    icon: 'CloudRain',
  },
  {
    id: 'ac-sanitization',
    name: 'AC Vent Ozone Sanitization',
    description: 'Eliminates active mold, bacteria, and strong bad odors directly from the AC ducting system.',
    price: 399,
    icon: 'Wind',
  },
  {
    id: 'headlight-resto',
    name: 'Headlight Lens Restoration',
    description: 'Removes yellowing, oxidation, and scratches to restore nighttime high-beam clarity.',
    price: 499,
    icon: 'Sun',
  },
  {
    id: 'leather-conditioner',
    name: 'Premium Leather Nourishment',
    description: 'Rich cream treatment to restore suppleness, prevent cracks, and add premium natural aroma.',
    price: 599,
    icon: 'Sparkles',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Rohan Sharma',
    vehicle: 'Hyundai Creta (SUV)',
    rating: 5,
    text: 'Kittu Car Washing did an absolutely spectacular job on my SUV! I went for the Ultra Detailed Clean and the amount of steam and dirt they extracted was unreal. The dashboard looks brand new and they even aligned my floor mats perfectly.',
    date: 'Yesterday',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120',
  },
  {
    id: 't2',
    name: 'Priya Patel',
    vehicle: 'Maruti Swift (Hatchback)',
    rating: 5,
    text: 'Super quick, professional, and very reasonably priced. The Kittu Signature Wash was finished in under 45 minutes, yet they did not skip a single spot. The hydrophobic rain glass repels water wonderfully in these monsoons.',
    date: '3 days ago',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120',
  },
  {
    id: 't3',
    name: 'Amit Verma',
    vehicle: 'Royal Enfield Classic 350 (Bike)',
    rating: 5,
    text: 'Washing a chrome bike is tricky, but the boys at Kittu knew exactly what they were doing. They used specialized soft foam, non-scratch microfiber cloths, and premium wax. Chrome shines like mirrors!',
    date: '1 week ago',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120',
  },
  {
    id: 't4',
    name: 'Rajesh Gowda',
    vehicle: 'Mahindra XUV700 (SUV)',
    rating: 5,
    text: 'The Ceramic Shield treatment has given my XUV700 an unbelievable wet-look showroom shine. Dust just glides off the body now, and water beads up beautifully. Their 10 years of experience clearly shows in their methodology!',
    date: '2 weeks ago',
    avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=120',
  },
  {
    id: 't5',
    name: 'Neha Deshmukh',
    vehicle: 'Tata Nexon (Compact SUV)',
    rating: 5,
    text: 'The deep cabin steam disinfection is incredible. With small kids, hygiene is priority. They sanitized the AC vents, extracted all dirt from the fabric seats, and left zero chemical odor. Highly recommended Patna Kankarbagh station.',
    date: '3 weeks ago',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120',
  },
  {
    id: 't6',
    name: 'Vikram Malhotra',
    vehicle: 'Honda City (Premium Sedan)',
    rating: 5,
    text: 'Been bringing my sedans to Kittu Car Washing for the past 9 years. They never disappoint. They use premium soft, filtered water with under 100 TDS, preventing scaling or mineral spots on my deep black paint. Absolute experts.',
    date: '1 month ago',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=120',
  },
];

export interface WashedCarPhoto {
  id: string;
  title: string;
  vehicleType: string;
  tag: string;
  imageUrl: string;
}

export const WASHED_CARS_GALLERY: WashedCarPhoto[] = [
  {
    id: 'g1',
    title: 'Lexus LS 500h Premium Detailing',
    vehicleType: 'Luxury Hybrid Sedan',
    tag: 'Ceramic Coating',
    imageUrl: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'g2',
    title: 'Creta Active Snow Foam Bath',
    vehicleType: 'Mid-size SUV',
    tag: 'Pre-Wash Foam',
    imageUrl: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'g3',
    title: 'Sleek Sedan Alloy & Tyre Detail',
    vehicleType: 'Premium Sedan',
    tag: 'Decontaminate',
    imageUrl: 'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'g4',
    title: 'Tata Nexon Cabin Steam Sanitize',
    vehicleType: 'Compact SUV',
    tag: '120°C Steam',
    imageUrl: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'g5',
    title: 'Swift Hybrid Wax Reflection',
    vehicleType: 'Premium Hatchback',
    tag: 'Carnauba Glow',
    imageUrl: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'g6',
    title: 'Royal Enfield Chrome Polish',
    vehicleType: 'Cruiser Motorcycle',
    tag: 'Metal Glaze',
    imageUrl: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=800',
  },
];

export const FAQS: FAQItem[] = [
  {
    id: 'faq1',
    question: 'Do I need to book in advance?',
    answer: 'While we welcome drive-ins, booking a slot online guarantees you are served immediately without waiting in queues. It helps us prepare your selected detailing tools beforehand.',
  },
  {
    id: 'faq2',
    question: 'How long does a standard wash take?',
    answer: 'An Eco Express wash takes 15-20 minutes, our Signature Wash takes 40-45 minutes, while deep detailing or ceramic wax packages take between 1.5 to 2.5 hours.',
  },
  {
    id: 'faq3',
    question: 'Do you use hard water or recycled water?',
    answer: 'Absolutely not! We use soft, filtered water with a TDS of under 100 to ensure there are no water spot minerals left on your car paint. We also run an eco-friendly effluent treatment plant for washing water.',
  },
  {
    id: 'faq4',
    question: 'What products do you use for foam and polishing?',
    answer: 'We only use premium, pH-balanced wash shampoos and detailing compounds from international industry-leaders like 3M, Meguiar’s, and Koch-Chemie.',
  },
];

export const BUSINESS_INFO = {
  name: 'Kittu Car Washing',
  tagline: 'Premium Care & Brilliant Shine for Your Ride',
  phone: '+91 88252 14538',
  whatsapp: '+918825214538',
  email: 'bookings@kittucarwashing.com',
  address: 'Plot No. 12, Kankarbagh Main Road, Near Kumhrar Park, Patna, Bihar 800020',
  coords: { lat: 25.6034162, lng: 85.1710971 },
  hours: {
    weekdays: '7:00 AM - 9:00 PM',
    weekends: '7:00 AM - 10:00 PM',
    note: 'Open all 7 days'
  }
};

export const TIME_SLOTS = [
  '07:00 AM - 08:30 AM',
  '08:30 AM - 10:00 AM',
  '10:00 AM - 11:30 AM',
  '11:30 AM - 01:00 PM',
  '01:00 PM - 02:30 PM',
  '02:30 PM - 04:00 PM',
  '04:00 PM - 05:30 PM',
  '05:30 PM - 07:00 PM',
  '07:00 PM - 08:30 PM',
];
