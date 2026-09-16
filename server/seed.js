const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");

dotenv.config();

const products = [
  {
    name: "Wireless Bluetooth Headphones",
    description: "Premium over-ear wireless headphones with deep bass, clear calls, comfortable ear cushions and long-lasting battery life.",
    price: 49.99,
    originalPrice: 69.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    stock: 25,
    featured: true
  },
  {
    name: "Smart Fitness Watch",
    description: "Modern fitness smartwatch with activity tracking, heart-rate monitoring, notifications and multiple workout modes.",
    price: 79.99,
    originalPrice: 109.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
    rating: 4.6,
    stock: 18,
    featured: true
  },
  {
    name: "Portable Bluetooth Speaker",
    description: "Compact portable speaker delivering powerful sound with wireless connectivity and a durable design for everyday use.",
    price: 34.99,
    originalPrice: 49.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=80",
    rating: 4.5,
    stock: 30,
    featured: true
  },
  {
    name: "Mechanical Gaming Keyboard",
    description: "RGB mechanical keyboard with responsive switches, compact layout and durable construction for gaming and productivity.",
    price: 59.99,
    originalPrice: 79.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    stock: 15,
    featured: true
  },
  {
    name: "Wireless Ergonomic Mouse",
    description: "Comfortable wireless mouse with precision tracking, ergonomic shape and reliable battery performance.",
    price: 24.99,
    originalPrice: 34.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=800&q=80",
    rating: 4.5,
    stock: 40,
    featured: false
  },
  {
    name: "USB-C Multiport Hub",
    description: "Slim USB-C hub featuring multiple ports for charging, data transfer, displays and everyday laptop connectivity.",
    price: 39.99,
    originalPrice: 54.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1625842268584-8f3296236761?auto=format&fit=crop&w=800&q=80",
    rating: 4.4,
    stock: 22,
    featured: false
  },

  {
    name: "Classic Oversized Cotton T-Shirt",
    description: "Soft premium cotton oversized T-shirt with a relaxed fit designed for comfortable everyday styling.",
    price: 19.99,
    originalPrice: 29.99,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
    rating: 4.6,
    stock: 50,
    featured: true
  },
  {
    name: "Premium Denim Jacket",
    description: "Timeless denim jacket crafted for versatile casual outfits with a comfortable fit and durable fabric.",
    price: 54.99,
    originalPrice: 74.99,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    stock: 20,
    featured: true
  },
  {
    name: "Urban Casual Hoodie",
    description: "Warm and comfortable everyday hoodie with a clean minimalist design and soft interior lining.",
    price: 44.99,
    originalPrice: 59.99,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    stock: 35,
    featured: false
  },
  {
    name: "Classic White Sneakers",
    description: "Minimal everyday sneakers with a clean silhouette, cushioned sole and versatile styling.",
    price: 64.99,
    originalPrice: 89.99,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    stock: 24,
    featured: true
  },
  {
    name: "Leather Casual Backpack",
    description: "Stylish everyday backpack with spacious compartments for laptops, books and personal essentials.",
    price: 59.99,
    originalPrice: 79.99,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
    rating: 4.6,
    stock: 17,
    featured: false
  },
  {
    name: "Polarized Round Sunglasses",
    description: "Modern polarized sunglasses offering comfortable everyday wear with a lightweight stylish frame.",
    price: 29.99,
    originalPrice: 44.99,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80",
    rating: 4.5,
    stock: 32,
    featured: false
  },

  {
    name: "Minimal Wooden Table Lamp",
    description: "Elegant table lamp with a warm ambient glow and minimalist design for bedrooms, desks and living spaces.",
    price: 32.99,
    originalPrice: 44.99,
    category: "Home",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80",
    rating: 4.6,
    stock: 26,
    featured: true
  },
  {
    name: "Ceramic Coffee Mug Set",
    description: "Set of stylish ceramic coffee mugs designed for everyday tea, coffee and hot beverages.",
    price: 22.99,
    originalPrice: 31.99,
    category: "Home",
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    stock: 45,
    featured: false
  },
  {
    name: "Modern Desk Organizer",
    description: "Practical desktop organizer for keeping stationery, accessories and everyday work essentials neatly arranged.",
    price: 18.99,
    originalPrice: 26.99,
    category: "Home",
    image: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=800&q=80",
    rating: 4.4,
    stock: 38,
    featured: false
  },
  {
    name: "Soft Cotton Cushion Set",
    description: "Comfortable decorative cushion covers with a soft cotton finish for sofas, beds and lounge spaces.",
    price: 27.99,
    originalPrice: 39.99,
    category: "Home",
    image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80",
    rating: 4.5,
    stock: 28,
    featured: false
  },
  {
    name: "Insulated Stainless Steel Bottle",
    description: "Reusable insulated bottle designed to keep beverages cool or warm while maintaining a sleek everyday appearance.",
    price: 21.99,
    originalPrice: 29.99,
    category: "Home",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    stock: 55,
    featured: true
  },
  {
    name: "Premium Ceramic Vase",
    description: "Modern ceramic decorative vase designed to complement contemporary living rooms, bedrooms and office spaces.",
    price: 28.99,
    originalPrice: 39.99,
    category: "Home",
    image: "https://images.unsplash.com/photo-1581783898377-1c85bf937427?auto=format&fit=crop&w=800&q=80",
    rating: 4.4,
    stock: 19,
    featured: false
  },

  {
    name: "Everyday Leather Wallet",
    description: "Compact leather wallet with multiple card slots and a practical design for everyday carry.",
    price: 24.99,
    originalPrice: 34.99,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80",
    rating: 4.6,
    stock: 42,
    featured: false
  },
  {
    name: "Classic Analog Wrist Watch",
    description: "Elegant analog wristwatch featuring a clean dial and timeless design suitable for casual and formal occasions.",
    price: 69.99,
    originalPrice: 94.99,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    stock: 16,
    featured: true
  },
  {
    name: "Minimalist Metal Bracelet",
    description: "Simple modern bracelet with a polished metal finish designed to complement everyday outfits.",
    price: 17.99,
    originalPrice: 24.99,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=800&q=80",
    rating: 4.3,
    stock: 34,
    featured: false
  },
  {
    name: "Travel Passport Organizer",
    description: "Compact travel organizer with dedicated sections for passports, cards, documents and travel essentials.",
    price: 23.99,
    originalPrice: 32.99,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?auto=format&fit=crop&w=800&q=80",
    rating: 4.5,
    stock: 29,
    featured: false
  },
  {
    name: "Premium Canvas Tote Bag",
    description: "Reusable canvas tote bag with a spacious interior for shopping, books, work essentials and daily travel.",
    price: 16.99,
    originalPrice: 24.99,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
    rating: 4.4,
    stock: 48,
    featured: false
  },
  {
    name: "Classic Leather Belt",
    description: "Durable everyday leather belt featuring a clean buckle design suitable for casual and formal outfits.",
    price: 26.99,
    originalPrice: 36.99,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=800&q=80",
    rating: 4.6,
    stock: 31,
    featured: false
  },

  {
    name: "Aromatherapy Essential Oil Set",
    description: "Collection of refreshing essential oil fragrances designed for relaxing home and personal wellness routines.",
    price: 29.99,
    originalPrice: 42.99,
    category: "Lifestyle",
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80",
    rating: 4.5,
    stock: 21,
    featured: true
  },
  {
    name: "Premium Travel Coffee Tumbler",
    description: "Reusable insulated travel tumbler designed to keep coffee and beverages at a comfortable temperature on the go.",
    price: 25.99,
    originalPrice: 34.99,
    category: "Lifestyle",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    stock: 36,
    featured: false
  },
  {
    name: "Yoga Fitness Mat",
    description: "Non-slip cushioned fitness mat suitable for yoga, stretching, home workouts and meditation sessions.",
    price: 31.99,
    originalPrice: 44.99,
    category: "Lifestyle",
    image: "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    stock: 27,
    featured: true
  },
  {
    name: "Compact Travel Organizer Kit",
    description: "Multi-compartment organizer for cables, chargers, headphones, toiletries and other travel essentials.",
    price: 27.99,
    originalPrice: 39.99,
    category: "Lifestyle",
    image: "https://images.unsplash.com/photo-1553531889-56a6febe8edb?auto=format&fit=crop&w=800&q=80",
    rating: 4.5,
    stock: 23,
    featured: false
  },
  {
    name: "Reusable Shopping Bag Set",
    description: "Durable reusable shopping bags designed for groceries, daily shopping and convenient storage.",
    price: 14.99,
    originalPrice: 21.99,
    category: "Lifestyle",
    image: "https://images.unsplash.com/photo-1588964895597-cfccd6e2dbf9?auto=format&fit=crop&w=800&q=80",
    rating: 4.3,
    stock: 60,
    featured: false
  },
  {
    name: "Modern Desk Clock",
    description: "Minimal digital desk clock with a clean display that fits naturally into workspaces, bedrooms and study areas.",
    price: 19.99,
    originalPrice: 27.99,
    category: "Lifestyle",
    image: "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=800&q=80",
    rating: 4.4,
    stock: 33,
    featured: false
  }
];

async function seedProducts() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing in server/.env");
    }

    await mongoose.connect(process.env.MONGO_URI);

    console.log("Connected to MongoDB");

    await Product.deleteMany({});
    console.log("Old products removed");

    await Product.insertMany(products);

    console.log(`Successfully seeded ${products.length} e-commerce products`);

    await mongoose.connection.close();
    console.log("MongoDB connection closed");
    process.exit(0);
  } catch (error) {
    console.error("Seed error:", error.message);

    try {
      await mongoose.connection.close();
    } catch {}

    process.exit(1);
  }
}

seedProducts();
