'use client';

import { useParams, useRouter } from "next/navigation";
import StayDetailView from "@/app/user/components/StayDetailView";

// --- Images ---
const hotel1 = "/images/hotel1.jpg";
const hotel2 = "/images/hotel2.jpg";
const hotel3 = "/images/hotel3.jpg";
const hotel4 = "/images/hotel4.jpg";
const hotel5 = "/images/hotel5.jpg";
const tent1 = "/images/tent1.jpg";
const tent2 = "/images/tent2.jpg";
const dormitory1 = "/images/dormitory1.jpg";
const dormitory2 = "/images/dormitory2.jpg";
const room2 = "/images/room2.jpg";
const room3 = "/images/room3.jpg";
const room4 = "/images/room4.jpg";
const room5 = "/images/room5.jpg";


const allOptions = [
        { id: 1, title: 'Luxury Royal Tent', type: 'Tent', price: 4000, beds: '2 Bed', address: 'Near Shipra Ghat, Sector 1', img: tent1, tag: 'Royal' },
        { id: 2, title: 'Deluxe Swiss Cottage', type: 'Hotel', price: 6000, beds: '2 Bed', address: 'Harsiddhi Marg, Ujjain', img: hotel2, tag: 'Best Seller' },
        { id: 3, title: 'Basic Dormitory', type: 'Dormitory', price: 1000, beds: '10 Bed', address: 'Railway Station Road', img: dormitory1 ,tag: 'Affordable' },
        { id: 4, title: 'Eco River Tent', type: 'Tent', price: 2500, beds: '3 Bed', address: 'Gaughat Area, Shipra Kinara', img: tent2 ,tag: 'Eco Friendly'},
        { id: 5, title: 'Heritage Mahal', type: 'Hotel', price: 8500, beds: '2 Bed', address: 'Mahakal Mandir Back Gate', img: hotel5, tag: 'Premium' },
        { id: 6, title: 'Sanyasi Ashram', type: 'Dormitory', price: 800, beds: '15 Bed', address: 'Ram Ghat, Ujjain', img: dormitory2, tag: 'Budget' },
        { id: 7, title: 'Family Glamping', type: 'Tent', price: 5500, beds: '4 Bed', address: 'Mela Area, Sector 4', img: room3, tag: 'Family Friendly' },
        { id: 8, title: 'Mahakal View Hotel', type: 'Hotel', price: 9500, beds: '2 Bed', address: 'Kot Teerth Marg', img: room4, tag: 'Luxury' },
        { id: 9, title: 'Shiv Shakti Niwas', type: 'Hotel', price: 3200, beds: '3 Bed', address: 'Freeganj, Ujjain', img: room5, tag: 'Affordable' },
        { id: 10, title: 'Sadhu Akhada Shed', type: 'Dormitory', price: 400, beds: '20 Bed', address: 'Bada Ganpati Road', img: dormitory1, tag: 'Basic' },
        { id: 11, title: 'Riverside Bamboo Hut', type: 'Tent', price: 1800, beds: '2 Bed', address: 'Mangalnath Marg', img: tent1, tag: 'Nature Stay' },
        { id: 12, title: 'Grand Ujjain Palace', type: 'Hotel', price: 12000, beds: '2 Bed', address: 'Indore-Ujjain Highway', img: hotel3, tag: 'VVIP' },
        { id: 13, title: 'Yatri Bhawan', type: 'Dormitory', price: 1200, beds: '8 Bed', address: 'Mahakal Dharamshala', img: dormitory2, tag: 'Affordable' },
        { id: 14, title: 'Maharaja Suites', type: 'Hotel', price: 7200, beds: '2 Bed', address: 'Kal Bhairav Marg', img: room3, tag: 'Premium' },
        { id: 15, title: 'Safari Tents', type: 'Tent', price: 3800, beds: '3 Bed', address: 'Nanakheda Area', img: room4, tag: 'Adventure' },
        { id: 16, title: 'Avanti Niwas', type: 'Hotel', price: 4500, beds: '3 Bed', address: 'Bharib Ghat', img: room5, tag: 'Affordable' },
        { id: 17, title: 'Bhakti Ashram', type: 'Dormitory', price: 600, beds: '12 Bed', address: 'Iskcon Temple Road', img: dormitory1, tag: 'Budget' },
        { id: 18, title: 'Narmada Cabin', type: 'Tent', price: 2100, beds: '2 Bed', address: 'Sector 5, Mela Area', img: tent2, tag: 'Eco Friendly' },
        { id: 19, title: 'Golden Suites', type: 'Hotel', price: 15000, beds: '2 Bed', address: 'Shipra River Front', img: room4, tag: 'Premium' },
        { id: 20, title: 'Common Hall Stay', type: 'Dormitory', price: 300, beds: '50 Bed', address: 'Mela Ground', img: dormitory2, tag: 'Basic' },
        { id: 21, title: 'Shivaji Tent Camp', type: 'Tent', price: 3200, beds: '4 Bed', address: 'Sector 2, Mela Area', img: tent1, tag: 'Family Friendly' },
        { id: 22, title: 'Regal Heritage Hotel', type: 'Hotel', price: 9000, beds: '2 Bed', address: 'Rajwada Area', img: hotel4, tag: 'Luxury' },
        { id: 23, title: 'Sadhu Sadan Dormitory', type: 'Dormitory', price: 500, beds: '25 Bed', address: 'Shivaji Ghat', img: dormitory1, tag: 'Budget' },
        { id: 24, title: 'Lotus Lake Tent', type: 'Tent', price: 2700, beds: '3 Bed', address: 'Lotus Lake Area', img: tent2, tag: 'Nature Stay' },
    ];

export default function StayPage() {

  const { id } = useParams();
  const router = useRouter();

  const stay = allOptions.find(p => p.id === Number(id));

  if (!stay) {
    return <div className="p-10 text-center">Stay Not Found</div>;
  }

  return (
    <StayDetailView
      stay={stay}
      onBack={() => router.back()}
      onReserve={(data) => console.log("Final Booking:", data)}
    />
  );
}