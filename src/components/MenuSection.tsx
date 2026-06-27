import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import type { MenuItem } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Check, Leaf } from 'lucide-react';

export const MenuSection: React.FC = () => {
  const { menuItems, cart, addToCart, updateCartQuantity } = useApp();
  const [activeMainCategory, setActiveMainCategory] = useState<'Veg' | 'Non Veg' | 'Sides' | 'Beverages'>('Veg');
  const [activeSubCategory, setActiveSubCategory] = useState<string>('All');
  
  // Track visual feedback per item when "Add" is clicked
  const [addedPop, setAddedPop] = useState<Record<string, boolean>>({});

  // Sub-categories list mapping
  const subCategoriesMap = {
    'Veg': ['All', 'Veg Burgers', 'Veg Subs', 'Veg Rolls', 'Veg Combos'],
    'Non Veg': ['All', 'Chicken Burgers', 'Chicken Subs', 'Chicken Rolls', 'Chicken Combos'],
    'Sides': ['All', 'Fries', 'Loaded Fries', 'Nuggets', 'Garlic Bread'],
    'Beverages': ['All', 'Soft Drinks', 'Cold Coffee', 'Milkshakes', 'Mocktails']
  };

  // Filter logic
  const filteredItems = menuItems.filter((item) => {
    // 1. Filter by Main Category
    if (activeMainCategory === 'Veg') {
      if (!item.isVeg) return false;
      const vegCats = ['Veg Burgers', 'Veg Subs', 'Veg Rolls', 'Veg Combos'];
      if (!vegCats.includes(item.category)) return false;
    } else if (activeMainCategory === 'Non Veg') {
      if (item.isVeg) return false;
      const nonVegCats = ['Chicken Burgers', 'Chicken Subs', 'Chicken Rolls', 'Chicken Combos'];
      if (!nonVegCats.includes(item.category)) return false;
    } else if (activeMainCategory === 'Sides') {
      const sidesCats = ['Fries', 'Loaded Fries', 'Nuggets', 'Garlic Bread', 'Sides'];
      if (!sidesCats.includes(item.category)) return false;
    } else if (activeMainCategory === 'Beverages') {
      const bevCats = ['Soft Drinks', 'Cold Coffee', 'Milkshakes', 'Mocktails', 'Beverages'];
      if (!bevCats.includes(item.category)) return false;
    }

    // 2. Filter by Sub Category (if not "All")
    if (activeSubCategory !== 'All') {
      if (item.category !== activeSubCategory) return false;
    }

    return true;
  });

  const handleMainCategoryChange = (cat: 'Veg' | 'Non Veg' | 'Sides' | 'Beverages') => {
    setActiveMainCategory(cat);
    setActiveSubCategory('All'); // Reset sub category filter
  };

  const handleAddClick = (item: MenuItem, qty: number) => {
    addToCart(item, qty);
    
    // Trigger animation pop feedback
    setAddedPop((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedPop((prev) => ({ ...prev, [item.id]: false }));
    }, 1200);
  };

  return (
    <section id="menu" className="bg-bg-dark py-20 px-4 sm:px-6 lg:px-8 border-b border-white/5">
      <div className="mx-auto max-w-7xl">
        
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight uppercase text-white font-display">
            OUR <span className="text-primary glow-text">LEGENDARY</span> MENU
          </h2>
          <div className="mx-auto mt-4 h-1 w-24 bg-gradient-to-r from-primary to-secondary rounded-full" />
        </div>

        {/* Main Category Tabs */}
        <div className="flex justify-center flex-wrap gap-2 md:gap-4 mb-8">
          {(['Veg', 'Non Veg', 'Sides', 'Beverages'] as const).map((cat) => {
            const isActive = activeMainCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => handleMainCategoryChange(cat)}
                className={`px-5 py-3 rounded-2xl font-display text-sm font-extrabold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-primary text-white shadow-lg shadow-primary/25 glow-orange scale-105'
                    : 'bg-surface hover:bg-surface-hover text-text-secondary hover:text-white border border-white/5'
                }`}
              >
                <span className="flex items-center gap-2">
                  {cat === 'Veg' && <Leaf size={14} className={isActive ? 'text-white' : 'text-green-500'} />}
                  {cat === 'Non Veg' && <span className="w-2.5 h-2.5 rounded-full bg-red-600 inline-block" />}
                  {cat}
                </span>
              </button>
            );
          })}
        </div>

        {/* Sub-Category Pills */}
        <div className="flex justify-center flex-wrap gap-2 mb-12 max-w-3xl mx-auto">
          {subCategoriesMap[activeMainCategory].map((subCat) => {
            const isActive = activeSubCategory === subCat;
            const displayLabel = subCat === 'All' 
              ? activeMainCategory === 'Veg' ? 'All Veg' : activeMainCategory === 'Non Veg' ? 'All Chicken' : `All ${activeMainCategory}`
              : subCat;

            return (
              <button
                key={subCat}
                onClick={() => setActiveSubCategory(subCat)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-secondary text-bg-dark font-black shadow-md shadow-secondary/15'
                    : 'bg-white/5 hover:bg-white/10 text-text-secondary hover:text-white'
                }`}
              >
                {displayLabel}
              </button>
            );
          })}
        </div>

        {/* Menu Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => {
              // Check if item is in cart to manage quantity selector directly on card
              const cartMatch = cart.find((i) => i.id === item.id);
              const cartQty = cartMatch ? cartMatch.quantity : 0;
              const hasAdded = addedPop[item.id];

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="glass-panel glass-panel-hover rounded-3xl overflow-hidden flex flex-col justify-between group"
                >
                  {/* Card Image Wrap */}
                  <div className="relative aspect-video w-full overflow-hidden bg-white/5">
                    {/* Item category badge */}
                    <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/5 text-[10px] font-extrabold uppercase tracking-wide text-white">
                      {item.isVeg ? (
                        <Leaf size={10} className="text-green-500 fill-green-500" />
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                      )}
                      {item.category}
                    </div>

                    <img 
                      src={item.image} 
                      alt={item.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-primary transition-colors">
                        {item.name}
                      </h3>
                      <p className="mt-2 text-sm text-text-secondary line-clamp-3 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4">
                      {/* Price tag */}
                      <span className="text-2xl font-black text-white font-display">
                        ₹{item.price}
                      </span>

                      {/* Quantity Selector / Add Button container */}
                      <div className="flex items-center gap-2">
                        {cartQty > 0 ? (
                          <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-xl p-1">
                            <button
                              onClick={() => updateCartQuantity(item.id, cartQty - 1)}
                              className="p-1.5 rounded-lg hover:bg-white/10 text-text-secondary hover:text-white transition-colors cursor-pointer"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-8 text-center text-sm font-bold text-white">
                              {cartQty}
                            </span>
                            <button
                              onClick={() => updateCartQuantity(item.id, cartQty + 1)}
                              className="p-1.5 rounded-lg hover:bg-white/10 text-text-secondary hover:text-white transition-colors cursor-pointer"
                              aria-label="Increase quantity"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleAddClick(item, 1)}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 transform active:scale-95 cursor-pointer ${
                              hasAdded
                                ? 'bg-success text-white shadow-lg shadow-success/20 scale-105'
                                : 'bg-primary hover:bg-primary-hover text-white shadow-lg shadow-primary/15'
                            }`}
                          >
                            {hasAdded ? (
                              <>
                                <Check size={14} />
                                Added
                              </>
                            ) : (
                              'Add'
                            )}
                          </button>
                        )}
                      </div>
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Empty state filter */}
          {filteredItems.length === 0 && (
            <div className="col-span-full py-16 text-center text-text-secondary">
              No legendary items found in this category.
            </div>
          )}
        </motion.div>

      </div>
    </section>
  );
};
