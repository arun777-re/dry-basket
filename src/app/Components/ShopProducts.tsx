'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  weight: string; // e.g. '250g', '500g', '1kg'
  image: string;
}

// Dummy products
const dummyProducts: Product[] = [
  { id: '1', name: 'Red Shirt', price: 499, category: 'Clothing', weight: '250g', image: '/images/red-shirt.jpg' },
  { id: '2', name: 'Blue Jeans', price: 999, category: 'Clothing', weight: '500g', image: '/images/blue-jeans.jpg' },
  { id: '3', name: 'Smartphone', price: 15999, category: 'Electronics', weight: '1kg', image: '/images/phone.jpg' },
  { id: '4', name: 'Headphones', price: 1999, category: 'Electronics', weight: '250g', image: '/images/headphones.jpg' },
  { id: '5', name: 'Sneakers', price: 2999, category: 'Footwear', weight: '500g', image: '/images/sneakers.jpg' },
];

const ShopProducts = () => {
  const [searchText, setSearchText] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedWeight, setSelectedWeight] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 20000]);

  const categories = Array.from(new Set(dummyProducts.map((p) => p.category)));
  const weights = ['250g', '500g', '1kg'];

  // Advanced search filtering
  const filteredProducts = dummyProducts.filter(
    (p) =>
      (!searchText || p.name.toLowerCase().includes(searchText.toLowerCase())) &&
      (!selectedCategory || p.category === selectedCategory) &&
      (!selectedWeight || p.weight === selectedWeight) &&
      p.price >= priceRange[0] &&
      p.price <= priceRange[1]
  );

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-6 py-8 flex flex-col md:flex-row gap-6">
      {/* Sidebar Filters */}
      <aside className="w-full md:w-72 flex-shrink-0 bg-white shadow-md rounded-2xl p-4">
        <h2 className="text-head text-xl font-semibold mb-4">Filters</h2>

        {/* Search Input */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search products..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-first"
          />
        </div>

        {/* Category Filter */}
        <div className="mb-6">
          <h3 className="text-first font-medium mb-2">Category</h3>
          <ul className="space-y-2">
            {categories.map((cat) => (
              <li key={cat}>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="category"
                    value={cat}
                    checked={selectedCategory === cat}
                    onChange={() => setSelectedCategory(cat)}
                    className="accent-text-head"
                  />
                  <span className="text-first">{cat}</span>
                </label>
              </li>
            ))}
            <li>
              <button
                className="text-head text-sm mt-2"
                onClick={() => setSelectedCategory(null)}
              >
                Clear Category
              </button>
            </li>
          </ul>
        </div>

        {/* Weight Filter */}
        <div className="mb-6">
          <h3 className="text-first font-medium mb-2">Weight</h3>
          <ul className="space-y-2">
            {weights.map((w) => (
              <li key={w}>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="weight"
                    value={w}
                    checked={selectedWeight === w}
                    onChange={() => setSelectedWeight(w)}
                    className="accent-text-head"
                  />
                  <span className="text-first">{w}</span>
                </label>
              </li>
            ))}
            <li>
              <button
                className="text-head text-sm mt-2"
                onClick={() => setSelectedWeight(null)}
              >
                Clear Weight
              </button>
            </li>
          </ul>
        </div>

        {/* Price Filter */}
        <div>
          <h3 className="text-first font-medium mb-2">Price</h3>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-sm text-gray-500">
              <span>₹{priceRange[0]}</span>
              <span>₹{priceRange[1]}</span>
            </div>
            <input
              type="range"
              min={0}
              max={20000}
              value={priceRange[1]}
              onChange={(e) => setPriceRange([0, Number(e.target.value)])}
              className="w-full accent-text-head"
            />
          </div>
        </div>
      </aside>

      {/* Products Grid */}
      <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer flex flex-col"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 flex flex-col gap-1 flex-1">
              <h3 className="text-first font-medium">{product.name}</h3>
              <span className="text-gray-500 text-sm">{product.weight}</span>
              <span className="text-head font-semibold text-lg">₹{product.price}</span>
              <Button className="mt-auto w-full bg-text-head hover:bg-opacity-80 text-white">
                Add to Cart
              </Button>
            </div>
          </div>
        ))}

        {filteredProducts.length === 0 && (
          <p className="text-gray-500 col-span-full text-center mt-10">
            No products found for selected filters.
          </p>
        )}
      </div>
    </div>
  );
};

export default ShopProducts;
