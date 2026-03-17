"use client";

import { useParams, useRouter } from "next/navigation";
import PoojaDetailView from "@/app/user/components/PoojaDetailView";

export default function PoojaPage() {

  const { id } = useParams();
  const router = useRouter();

  const allPoojas = [
    { 
      id: 1, 
      title: 'Mahakal Bhasm Aarti', 
      type: 'Daily', 
      price: 1500, 
      desc: 'Special darshan of Bhasm Aarti at Mahakal Temple.', 
      img: 'https://images.unsplash.com/photo-1605559424843-9e4c22861cc2?q=80&w=600', 
      place: "Mahakaleshwar Temple, Ujjain",
      samagri: true,
      benefits: ["Mental Peace", "Health Prosperity"],
      rating: 4.9
    },

    ...Array.from({ length: 29 }, (_, i) => ({
      id: i + 2,
      title: `Sacred Ritual ${i + 2}`,
      type: ['Daily', 'Special', 'Dosh Nivaran'][i % 3],
      price: Math.floor(Math.random() * 8000) + 500,
      desc: 'Experienced Pandits will perform this Vedic ritual as per scriptures.',
      img: 'https://images.unsplash.com/photo-1596700070513-efd0496d5955?q=80&w=600',
      place: "Ujjain, Madhya Pradesh",
      samagri: i % 2 === 0,
      benefits: ["Prosperity", "Protection"],
      rating: 4.5
    }))
  ];

  const pooja = allPoojas.find(p => p.id === Number(id));

  if (!pooja) {
    return (
      <div className="p-10 text-center text-xl">
        Pooja Not Found
      </div>
    );
  }

  return (
    <PoojaDetailView
      pooja={pooja}
      onBack={() => router.back()}
      onBook={(data) => alert(`Booking confirmed for ${data.title}`)}
    />
  );
}