'use client';

import { useParams, useRouter } from "next/navigation";
import ProductDetailView from "@/app/user/components/ProductDetailView";

const product1 = "/images/product1.jpg";
const product2 = "/images/product2.jpg";
const product3 = "/images/product3.jpg";
const product4 = "/images/product4.jpg";

 const allItems = [
        { id: 1, title: '5-Mukhi Nepali Rudraksh', type: 'Rudraksh', price: 450, date: '2024-03-01', img: product1, tag: 'Best Seller', originalPrice: 600, description: "Authentic 5-mukhi Rudraksh from Nepal, known for peace and health.Authentic 5-mukhi Rudraksh from Nepal, known for peace and health.Authentic 5-mukhi Rudraksh from Nepal, known for peace and health.Authentic 5-mukhi Rudraksh from Nepal, known for peace and health.Authentic 5-mukhi Rudraksh from Nepal, known for peace and health.Authentic 5-mukhi Rudraksh from Nepal, known for peace and health.", specifications: ["Natural Seed", "Nepali Origin", "Lab Certified"] },
        { id: 2, title: 'Original Tulsi Mala', type: 'Mala', price: 150, date: '2024-03-02', img: product2, tag: 'Original', originalPrice: 300, description: "Handmade Tulsi Mala for chanting and spiritual protection.", specifications: ["Pure Tulsi Wood", "108 Beads", "Hand-knotted"] },
        { id: 3, title: 'Mysore Sandalwood Dhoop', type: 'Dhoop', price: 120, date: '2024-03-03', img: product3, tag: 'Fragrant', originalPrice: 200, description: "Natural Mysore sandalwood fragrance for a divine atmosphere.", specifications: ["Charcoal Free", "Long Lasting", "Organic"] },
        { id: 4, title: 'Mahakal Bhashm (Special)', type: 'Bhashm', price: 210, date: '2024-03-04', img: product4, tag: 'Spiritual', originalPrice: 400, description: "Sacred Bhashm directly from Ujjain for ritual use.", specifications: ["Traditional Process", "Pure Ash", "Sancitified"] },
        { id: 5, title: 'Saffron Silk Cloth', type: 'Cloth', price: 890, date: '2024-03-05', img: product1, tag: 'Premium', originalPrice: 1200, description: "High-quality saffron silk cloth for deities and puja altar.", specifications: ["Pure Silk", "Golden Borders", "Soft Texture"] },
        { id: 6, title: 'Pure Copper Bracelet', type: 'Bracelet', price: 320, date: '2024-03-06', img: product2, tag: 'Pure', originalPrice: 500, description: "Scientific and spiritual benefits of pure copper in a sleek design.", specifications: ["99.9% Copper", "Adjustable Size", "Skin Friendly"] },
        { id: 7, title: 'Mahakal Ladoo Prasad', type: 'Prasad', price: 250, date: '2024-03-07', img: product3, tag: 'Delicious', originalPrice: 350, description: "The famous Mahakaleshwar temple style prasad made with pure ghee.", specifications: ["Pure Desi Ghee", "Hygienically Packed", "Fresh Ingredients"] },
        { id: 8, title: '7-Mukhi Rudraksh', type: 'Rudraksh', price: 1200, date: '2024-03-08', img: product2, tag: 'Rare', originalPrice: 1800, description: "Rare 7-mukhi Rudraksh for prosperity and Mahalaxmi blessings.", specifications: ["Authentic", "Large Size", "Collector's Grade"] },
        { id: 9, title: 'Lotus Seed Mala', type: 'Mala', price: 550, date: '2024-03-09', img: product1, tag: 'Popular', originalPrice: 800, description: "Kamalgatta mala specially used for Lakshmi Puja.", specifications: ["Natural Lotus Seeds", "Strong Thread", "Traditional"] },
        { id: 10, title: 'Rose Dhoop Sticks', type: 'Dhoop', price: 90, date: '2024-03-10', img: product2, tag: 'Fragrant', originalPrice: 150, description: "Sweet rose fragrance to soothe the mind and soul.", specifications: ["Low Smoke", "Synthetic Free", "Eco-friendly"] },
        { id: 11, title: 'Sacred Havan Bhashm', type: 'Bhashm', price: 150, date: '2024-03-11', img: product2, tag: 'Spiritual', originalPrice: 250, description: "Pure ash collected from Vedic Havan ceremonies.", specifications: ["Energized", "Herbal Content", "Fine Powder"] },
        { id: 12, title: 'Cotton Pooja Cloth', type: 'Cloth', price: 400, date: '2024-03-12', img: product3, tag: 'Traditional', originalPrice: 600, description: "Pure cotton cloth for daily puja essentials.", specifications: ["100% Cotton", "Fast Color", "Durable"] },
        { id: 13, title: 'Brass Om Bracelet', type: 'Bracelet', price: 280, date: '2024-03-13', img: product2, tag: 'Elegant', originalPrice: 450, description: "Beautifully carved brass kada with sacred 'Om' symbol.", specifications: ["Solid Brass", "Handcrafted", "Anti-tarnish"] },
        { id: 14, title: 'Dry Fruit Prasad Pack', type: 'Prasad', price: 450, date: '2024-03-14', img: product3, tag: 'Delicious', originalPrice: 600, description: "Mixed dry fruits offered as sacred prasad.", specifications: ["Premium Quality", "Vacuum Packed", "Mixed Nuts"] },
        { id: 15, title: '1-Mukhi Rudraksh', type: 'Rudraksh', price: 2500, date: '2024-03-15', img: product2, tag: 'Premium', originalPrice: 3500, description: "The most powerful Rudraksh for ultimate spiritual awakening.", specifications: ["Lab Certified", "Half-moon Shape", "High Energy"] },
        { id: 16, title: 'Sandalwood Incense Holder', type: 'Incense Holders', price: 350, date: '2024-03-16', img: product1, tag: 'Artisan', originalPrice: 500, description: "Hand-carved sandalwood holder for your incense sticks.", specifications: ["Pure Sandalwood", "Intricate Design", "Durable"] },  
        { id: 17, title: 'Brass Puja Thali', type: 'Puja Thalis', price: 800, date: '2024-03-17', img: product2, tag: 'Traditional', originalPrice: 1200, description: "Complete brass thali set for all your puja needs.", specifications: ["Solid Brass", "Includes Bowls", "Polished Finish"] },
        { id: 18, title: 'Holy Water Bottle', type: 'Holy Water Bottles', price: 220, date: '2024-03-18', img: product3, tag: 'Sacred', originalPrice: 350, description: "Specially designed bottle to store holy water for rituals.", specifications: ["Glass Body", "Leak-proof Cap", "Decorative"] },
        { id: 19, title: 'Meditation Cushion', type: 'Meditation Cushions', price: 1500, date: '2024-03-19', img: product4, tag: 'Comfort', originalPrice: 2500, description: "Ergonomic cushion for comfortable meditation sessions.", specifications: ["High-density Foam", "Removable Cover", "Portable"] },
        { id: 20, title: 'Ganesha Statue', type: 'Divine Statues', price: 2000, date: '2024-03-20', img: product1, tag: 'Divine', originalPrice: 3000, description: "Beautifully crafted Ganesha statue for blessings and decor.", specifications: ["Resin Material", "Hand-painted", "Intricate Details"] },
        { id: 21, title: 'Lakshmi Statue', type: 'Divine Statues', price: 2500, date: '2024-03-21', img: product2, tag: 'Divine', originalPrice: 3500, description: "Elegant Lakshmi statue to invite wealth and prosperity.", specifications: ["Resin Material", "Hand-painted", "Intricate Details"] },
        { id: 22, title: 'Shiva Statue', type: 'Divine Statues', price: 3000, date: '2024-03-22', img: product3, tag: 'Divine', originalPrice: 4500, description: "Majestic Shiva statue for spiritual energy and decor.", specifications: ["Resin Material", "Hand-painted", "Intricate Details"] },
        { id: 23, title: 'Kali Statue', type: 'Divine Statues', price: 2800, date: '2024-03-23', img: product4, tag: 'Divine', originalPrice: 4000, description: "Powerful Kali statue to ward off negativity and evil.", specifications: ["Resin Material", "Hand-painted", "Intricate Details"] },
        { id: 24, title: 'Hanuman Statue', type: 'Divine Statues', price: 2200, date: '2024-03-24', img: product1, tag: 'Divine', originalPrice: 3500, description: "Dynamic Hanuman statue for strength and protection.", specifications: ["Resin Material", "Hand-painted", "Intricate Details"] },
        { id: 25, title: 'Saraswati Statue', type: 'Divine Statues', price: 2600, date: '2024-03-25', img: product2, tag: 'Divine', originalPrice: 4000, description: "Graceful Saraswati statue for wisdom and creativity.", specifications: ["Resin Material", "Hand-painted", "Intricate Details"] },
        { id: 26, title: 'Vishnu Statue', type: 'Divine Statues', price: 2800, date: '2024-03-26', img: product3, tag: 'Divine', originalPrice: 4500, description: "Serene Vishnu statue for harmony and protection.", specifications: ["Resin Material", "Hand-painted", "Intricate Details"] },
        { id: 27, title: 'Durga Statue', type: 'Divine Statues', price: 3000, date: '2024-03-27', img: product4, tag: 'Divine', originalPrice: 5000, description: "Fierce Durga statue to empower and protect your space.", specifications: ["Resin Material", "Hand-painted", "Intricate Details"] },
    ];

export default function ProductPage() {

  const { id } = useParams();
  const router = useRouter();

  const product = allItems.find(p => p.id === Number(id));

  if (!product) {
    return <div className="p-10 text-center text-xl">Product Not Found</div>;
  }

  return (
    <ProductDetailView
      product={{
        ...product,
        category: product.type,
        rating: 4.8,
        reviews: 120,
        codAvailable: true,
        returnAvailable: true,
        freeDelivery: true,
        description: "Authentic spiritual product",
        specifications: ["Natural", "Original"],
        images: [product.img, product2, product3, product4]
      }}
      onBack={() => router.back()}
      onAddToCart={(prod) => console.log("Added:", prod)}
    />
  );
}