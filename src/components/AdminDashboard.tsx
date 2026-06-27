import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import type { MenuItem } from '../context/AppContext';
import { 
  BarChart3, 
  ShoppingBag, 
  Menu as MenuIcon, 
  Settings, 
  FolderHeart, 
  ArrowLeft, 
  DollarSign, 
  Grid, 
  TrendingUp, 
  Users, 
  Plus, 
  Edit3, 
  Trash2, 
  Check, 
  X,
  FileImage,
  Sparkles,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type TabType = 'overview' | 'orders' | 'menu' | 'categories' | 'settings';

export const AdminDashboard: React.FC = () => {
  const {
    setCurrentView,
    menuItems,
    orders,
    restaurantSettings,
    updateOrderStatus,
    addMenuItem,
    editMenuItem,
    deleteMenuItem,
    updateSettings,
    getDashboardStats
  } = useApp();

  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const stats = getDashboardStats();

  // Menu Modal State
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  
  // Menu Form State
  const [formName, setFormName] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formPrice, setFormPrice] = useState(0);
  const [formCategory, setFormCategory] = useState('Veg Burgers');
  const [formIsVeg, setFormIsVeg] = useState(true);
  const [formImage, setFormImage] = useState('');

  // Settings Form State
  const [settingsName, setSettingsName] = useState(restaurantSettings.name);
  const [settingsPhone, setSettingsPhone] = useState(restaurantSettings.phone);
  const [settingsEmail, setSettingsEmail] = useState(restaurantSettings.email);
  const [settingsAddress, setSettingsAddress] = useState(restaurantSettings.address);
  const [settingsHours, setSettingsHours] = useState(restaurantSettings.hours);
  const [settingsSuccess, setSettingsSuccess] = useState(false);

  // Open Modal for Add
  const handleOpenAddModal = () => {
    setEditingItem(null);
    setFormName('');
    setFormDescription('');
    setFormPrice(149);
    setFormCategory('Veg Burgers');
    setFormIsVeg(true);
    // Set a default burger unsplash image
    setFormImage('https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80');
    setIsMenuModalOpen(true);
  };

  // Open Modal for Edit
  const handleOpenEditModal = (item: MenuItem) => {
    setEditingItem(item);
    setFormName(item.name);
    setFormDescription(item.description);
    setFormPrice(item.price);
    setFormCategory(item.category);
    setFormIsVeg(item.isVeg);
    setFormImage(item.image);
    setIsMenuModalOpen(true);
  };

  const handleSaveItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || formPrice <= 0) return;

    const itemData = {
      name: formName,
      description: formDescription,
      price: Number(formPrice),
      category: formCategory,
      isVeg: formIsVeg,
      image: formImage
    };

    if (editingItem) {
      editMenuItem({ ...itemData, id: editingItem.id });
    } else {
      addMenuItem(itemData);
    }
    setIsMenuModalOpen(false);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      name: settingsName,
      phone: settingsPhone,
      email: settingsEmail,
      address: settingsAddress,
      hours: settingsHours
    });
    setSettingsSuccess(true);
    setTimeout(() => setSettingsSuccess(false), 3000);
  };

  // Helper to trigger mock photo upload
  const handleMockImageUpload = () => {
    // Generate a random high-quality food image from Unsplash
    const randomFoodImages = [
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80', // salad
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80', // pizza
      'https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=600&q=80', // toast
      'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=600&q=80', // sandwich
      'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=600&q=80'  // dessert
    ];
    const randomIndex = Math.floor(Math.random() * randomFoodImages.length);
    setFormImage(randomFoodImages[randomIndex]);
  };

  // Define Category stats
  const getCategoryCount = (category: string) => {
    return menuItems.filter(i => i.category === category).length;
  };

  const categoriesList = [
    { name: 'Veg Burgers', mainCat: 'Veg', count: getCategoryCount('Veg Burgers'), icon: '🍔' },
    { name: 'Veg Subs', mainCat: 'Veg', count: getCategoryCount('Veg Subs'), icon: '🥖' },
    { name: 'Veg Rolls', mainCat: 'Veg', count: getCategoryCount('Veg Rolls'), icon: '🌯' },
    { name: 'Veg Combos', mainCat: 'Veg', count: getCategoryCount('Veg Combos'), icon: '🍱' },
    { name: 'Chicken Burgers', mainCat: 'Non Veg', count: getCategoryCount('Chicken Burgers'), icon: '🍗' },
    { name: 'Chicken Subs', mainCat: 'Non Veg', count: getCategoryCount('Chicken Subs'), icon: '🥪' },
    { name: 'Chicken Rolls', mainCat: 'Non Veg', count: getCategoryCount('Chicken Rolls'), icon: '🌯' },
    { name: 'Chicken Combos', mainCat: 'Non Veg', count: getCategoryCount('Chicken Combos'), icon: '🍱' },
    { name: 'Fries', mainCat: 'Sides', count: getCategoryCount('Fries'), icon: '🍟' },
    { name: 'Loaded Fries', mainCat: 'Sides', count: getCategoryCount('Loaded Fries'), icon: '🧀' },
    { name: 'Nuggets', mainCat: 'Sides', count: getCategoryCount('Nuggets'), icon: '🍘' },
    { name: 'Garlic Bread', mainCat: 'Sides', count: getCategoryCount('Garlic Bread'), icon: '🍞' },
    { name: 'Soft Drinks', mainCat: 'Beverages', count: getCategoryCount('Soft Drinks'), icon: '🥤' },
    { name: 'Cold Coffee', mainCat: 'Beverages', count: getCategoryCount('Cold Coffee'), icon: '☕' },
    { name: 'Milkshakes', mainCat: 'Beverages', count: getCategoryCount('Milkshakes'), icon: '🥛' },
    { name: 'Mocktails', mainCat: 'Beverages', count: getCategoryCount('Mocktails'), icon: '🍹' },
  ];

  return (
    <div className="min-h-screen bg-bg-dark text-white flex flex-col md:flex-row border-b border-white/5">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-surface border-r border-white/5 flex flex-col justify-between shrink-0">
        <div className="p-6">
          {/* Logo & title */}
          <div className="flex items-center gap-3 border-b border-white/5 pb-6">
            <span className="text-2xl">🍔</span>
            <div>
              <h2 className="font-display font-black text-sm tracking-tight text-white uppercase">Legendary Admin</h2>
              <span className="text-[10px] text-primary font-bold uppercase tracking-wider">Management Console</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="mt-8 space-y-2">
            {[
              { id: 'overview', label: 'Dashboard', icon: <BarChart3 size={18} /> },
              { id: 'orders', label: 'Live Orders', icon: <ShoppingBag size={18} /> },
              { id: 'menu', label: 'Menu Manager', icon: <MenuIcon size={18} /> },
              { id: 'categories', label: 'Categories', icon: <FolderHeart size={18} /> },
              { id: 'settings', label: 'Settings', icon: <Settings size={18} /> }
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold tracking-wide transition-all cursor-pointer ${
                    isActive 
                      ? 'bg-primary text-white font-bold shadow-lg shadow-primary/10 glow-orange' 
                      : 'text-text-secondary hover:text-white hover:bg-white/2'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Back to storefront Button */}
        <div className="p-6 border-t border-white/5">
          <button
            onClick={() => setCurrentView('storefront')}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs tracking-wider uppercase transition-all cursor-pointer"
          >
            <ArrowLeft size={14} />
            Storefront
          </button>
        </div>
      </aside>

      {/* Main Panel Content Area */}
      <main className="flex-grow p-6 sm:p-10 md:max-h-screen overflow-y-auto">
        
        {/* Dynamic Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/5 pb-6 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
              {activeTab === 'overview' && 'Console Dashboard'}
              {activeTab === 'orders' && 'Live Kitchen Orders'}
              {activeTab === 'menu' && 'Menu Master'}
              {activeTab === 'categories' && 'Food Categories'}
              {activeTab === 'settings' && 'Restaurant Settings'}
            </h1>
            <p className="text-xs text-text-secondary mt-1">
              {activeTab === 'overview' && 'Real-time overview of your ordering application.'}
              {activeTab === 'orders' && 'Monitor, update, and manage incoming tables orders.'}
              {activeTab === 'menu' && 'Perform CRUD operations on restaurant offerings.'}
              {activeTab === 'categories' && 'Manage veg, non-veg, drinks, and combos filters.'}
              {activeTab === 'settings' && 'Configure brand, contact hours, and locations.'}
            </p>
          </div>
          
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/25 text-green-500 text-xs font-bold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping inline-block mr-1.5" />
            Live Sync Enabled
          </div>
        </div>

        {/* 1. OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-10">
            {/* Analytics Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Stat 1 */}
              <div className="glass-panel p-6 rounded-2xl flex items-center justify-between border border-white/5">
                <div>
                  <span className="text-xs text-text-secondary uppercase font-bold tracking-wider">Today's Orders</span>
                  <div className="text-3xl font-black font-display mt-2">{stats.todayOrdersCount}</div>
                  <span className="text-[10px] text-green-500 font-bold flex items-center gap-1 mt-1">
                    <TrendingUp size={10} /> +12.5% vs yesterday
                  </span>
                </div>
                <div className="p-4 rounded-2xl bg-primary/10 text-primary border border-primary/10">
                  <ShoppingBag size={24} />
                </div>
              </div>
              
              {/* Stat 2 */}
              <div className="glass-panel p-6 rounded-2xl flex items-center justify-between border border-white/5">
                <div>
                  <span className="text-xs text-text-secondary uppercase font-bold tracking-wider">Revenue Today</span>
                  <div className="text-3xl font-black font-display mt-2">₹{stats.revenueToday}</div>
                  <span className="text-[10px] text-green-500 font-bold flex items-center gap-1 mt-1">
                    <TrendingUp size={10} /> +8.2% vs yesterday
                  </span>
                </div>
                <div className="p-4 rounded-2xl bg-secondary/10 text-secondary border border-secondary/10">
                  <DollarSign size={24} />
                </div>
              </div>

              {/* Stat 3 */}
              <div className="glass-panel p-6 rounded-2xl flex items-center justify-between border border-white/5">
                <div>
                  <span className="text-xs text-text-secondary uppercase font-bold tracking-wider">Total Menu Items</span>
                  <div className="text-3xl font-black font-display mt-2">{stats.totalMenuItems}</div>
                  <span className="text-[10px] text-text-secondary font-bold flex items-center gap-1 mt-1">
                    Updated live by admin
                  </span>
                </div>
                <div className="p-4 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/10">
                  <Grid size={24} />
                </div>
              </div>

              {/* Stat 4 */}
              <div className="glass-panel p-6 rounded-2xl flex items-center justify-between border border-white/5">
                <div>
                  <span className="text-xs text-text-secondary uppercase font-bold tracking-wider">Active Tables</span>
                  <div className="text-3xl font-black font-display mt-2">{stats.activeTablesCount}</div>
                  <span className="text-[10px] text-text-secondary font-bold flex items-center gap-1 mt-1">
                    Customers placing orders
                  </span>
                </div>
                <div className="p-4 rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/10">
                  <Users size={24} />
                </div>
              </div>
            </div>

            {/* Recent Orders Overview */}
            <div className="glass-panel rounded-2xl border border-white/5 p-6">
              <h2 className="text-lg font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
                <Sparkles size={16} className="text-secondary" />
                Recent Orders Activity Log
              </h2>
              <div className="space-y-4">
                {orders.slice(0, 3).map((o) => (
                  <div key={o.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-white/2 border border-white/5 hover:border-white/10 transition-colors gap-3">
                    <div className="flex items-center gap-3">
                      <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                      <div>
                        <div className="text-sm font-bold text-white">Order {o.id} - Table #{o.tableNumber}</div>
                        <div className="text-xs text-text-secondary mt-0.5">{o.customerName} • {o.items.length} items ordered</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-6">
                      <span className="text-sm font-black text-white">₹{o.totalAmount}</span>
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        o.status === 'Served' ? 'bg-green-500/10 text-green-500 border border-green-500/20' :
                        o.status === 'Ready' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                        o.status === 'Preparing' ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' :
                        'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'
                      }`}>
                        {o.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 2. ORDERS TAB */}
        {activeTab === 'orders' && (
          <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-white/2 text-xs font-bold text-text-secondary uppercase border-b border-white/5">
                    <th className="px-6 py-4">Order ID</th>
                    <th className="px-6 py-4">Customer Name</th>
                    <th className="px-6 py-4">Table</th>
                    <th className="px-6 py-4">Items Ordered</th>
                    <th className="px-6 py-4">Total Amount</th>
                    <th className="px-6 py-4">Status Status</th>
                    <th className="px-6 py-4 text-center">Change Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {orders.map((o) => (
                    <tr key={o.id} className="hover:bg-white/2 transition-colors">
                      <td className="px-6 py-4 font-bold text-primary">{o.id}</td>
                      <td className="px-6 py-4 font-medium text-white">{o.customerName}</td>
                      <td className="px-6 py-4 text-secondary font-black">Table #{o.tableNumber}</td>
                      <td className="px-6 py-4 max-w-xs">
                        <div className="space-y-1">
                          {o.items.map((item, idx) => (
                            <div key={idx} className="text-xs text-text-secondary">
                              {item.name} <span className="text-white font-bold">x{item.quantity}</span>
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 font-bold text-white">₹{o.totalAmount}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider inline-block ${
                          o.status === 'Served' ? 'bg-green-500/10 text-green-500 border border-green-500/20' :
                          o.status === 'Ready' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                          o.status === 'Preparing' ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' :
                          'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'
                        }`}>
                          {o.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-1">
                          {(['Pending', 'Preparing', 'Ready', 'Served'] as const).map((st) => (
                            <button
                              key={st}
                              onClick={() => updateOrderStatus(o.id, st)}
                              className={`px-2 py-1 rounded text-[10px] font-extrabold cursor-pointer border transition-all ${
                                o.status === st
                                  ? 'bg-primary border-primary text-white shadow-sm'
                                  : 'bg-white/5 border-white/5 text-text-secondary hover:text-white hover:bg-white/10'
                              }`}
                            >
                              {st}
                            </button>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {orders.length === 0 && (
                    <tr>
                      <td colSpan={7} className="px-6 py-12 text-center text-text-secondary">
                        No customer orders received yet today.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 3. MENU MANAGER TAB */}
        {activeTab === 'menu' && (
          <div className="space-y-6">
            {/* Header controls */}
            <div className="flex justify-end">
              <button
                onClick={handleOpenAddModal}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-black uppercase tracking-wider shadow-lg shadow-primary/25 cursor-pointer transition-all hover:scale-[1.02]"
              >
                <Plus size={14} />
                Add New Menu Item
              </button>
            </div>

            {/* Menu List */}
            <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-white/2 text-xs font-bold text-text-secondary uppercase border-b border-white/5">
                      <th className="px-6 py-4">Item Details</th>
                      <th className="px-6 py-4">Category</th>
                      <th className="px-6 py-4">Type</th>
                      <th className="px-6 py-4">Price</th>
                      <th className="px-6 py-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {menuItems.map((item) => (
                      <tr key={item.id} className="hover:bg-white/2 transition-colors">
                        <td className="px-6 py-4 flex items-center gap-4">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-12 h-12 rounded-lg object-cover shrink-0"
                          />
                          <div>
                            <div className="font-bold text-white text-sm">{item.name}</div>
                            <div className="text-xs text-text-secondary mt-0.5 line-clamp-1 max-w-sm">{item.description}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-xs font-semibold text-text-secondary">
                          {item.category}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${
                            item.isVeg 
                              ? 'bg-green-500/10 text-green-500 border border-green-500/20' 
                              : 'bg-red-500/10 text-red-500 border border-red-500/20'
                          }`}>
                            {item.isVeg ? 'Veg' : 'Non-Veg'}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-black text-white">₹{item.price}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleOpenEditModal(item)}
                              className="p-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 cursor-pointer transition-colors"
                              aria-label="Edit item"
                            >
                              <Edit3 size={14} />
                            </button>
                            <button
                              onClick={() => deleteMenuItem(item.id)}
                              className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-500 cursor-pointer transition-colors"
                              aria-label="Delete item"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 4. CATEGORIES TAB */}
        {activeTab === 'categories' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categoriesList.map((cat, idx) => (
              <div 
                key={idx}
                className="glass-panel p-6 rounded-2xl border border-white/5 hover:border-primary/20 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="text-3xl mb-3">{cat.icon}</div>
                  <h3 className="text-base font-bold text-white tracking-tight group-hover:text-primary transition-colors">
                    {cat.name}
                  </h3>
                  <span className="text-[10px] text-text-secondary uppercase font-extrabold tracking-wider mt-1 block">
                    Main: {cat.mainCat}
                  </span>
                </div>
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-text-secondary">
                  <span>Menu Offerings</span>
                  <span className="font-bold text-white bg-white/5 px-2 py-0.5 rounded-md">
                    {cat.count} Item{cat.count !== 1 ? 's' : ''}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 5. SETTINGS TAB */}
        {activeTab === 'settings' && (
          <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/5 max-w-xl">
            <form onSubmit={handleSaveSettings} className="space-y-6">
              
              <div className="space-y-2">
                <label className="text-xs text-text-secondary uppercase font-bold tracking-wider">Restaurant Name</label>
                <input
                  type="text"
                  value={settingsName}
                  onChange={(e) => setSettingsName(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-surface border border-white/10 focus:border-primary focus:outline-none text-sm text-white transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs text-text-secondary uppercase font-bold tracking-wider">Contact Number</label>
                  <input
                    type="text"
                    value={settingsPhone}
                    onChange={(e) => setSettingsPhone(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-surface border border-white/10 focus:border-primary focus:outline-none text-sm text-white transition-colors"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs text-text-secondary uppercase font-bold tracking-wider">Email Address</label>
                  <input
                    type="email"
                    value={settingsEmail}
                    onChange={(e) => setSettingsEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-surface border border-white/10 focus:border-primary focus:outline-none text-sm text-white transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs text-text-secondary uppercase font-bold tracking-wider">Address Location</label>
                <textarea
                  value={settingsAddress}
                  onChange={(e) => setSettingsAddress(e.target.value)}
                  required
                  rows={2}
                  className="w-full px-4 py-3 rounded-xl bg-surface border border-white/10 focus:border-primary focus:outline-none text-sm text-white transition-colors resize-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs text-text-secondary uppercase font-bold tracking-wider">Opening Hours Info</label>
                <input
                  type="text"
                  value={settingsHours}
                  onChange={(e) => setSettingsHours(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-surface border border-white/10 focus:border-primary focus:outline-none text-sm text-white transition-colors"
                />
              </div>

              {/* Success Notification Alert */}
              <AnimatePresence>
                {settingsSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="flex items-center gap-2 p-3 rounded-lg bg-green-500/10 border border-green-500/25 text-green-500 text-xs font-bold"
                  >
                    <Check size={14} />
                    System configuration updated successfully! Storefront displays updated.
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-black uppercase tracking-wider shadow-lg shadow-primary/10 transition-all cursor-pointer"
              >
                Save Settings Configuration
              </button>
            </form>
          </div>
        )}

      </main>

      {/* Menu Item Management modal dialog */}
      <AnimatePresence>
        {isMenuModalOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuModalOpen(false)}
              className="fixed inset-0 z-40 bg-black backdrop-blur-sm"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: '-40%', x: '-50%' }}
              animate={{ opacity: 1, scale: 1, y: '-50%', x: '-50%' }}
              exit={{ opacity: 0, scale: 0.95, y: '-40%', x: '-50%' }}
              className="fixed top-1/2 left-1/2 z-50 w-[92%] max-w-lg bg-surface border border-white/5 rounded-3xl shadow-2xl p-6 sm:p-8"
            >
              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                <h3 className="text-lg font-bold text-white uppercase tracking-wider">
                  {editingItem ? 'Edit Menu Offer' : 'Add Brand Offer'}
                </h3>
                <button
                  onClick={() => setIsMenuModalOpen(false)}
                  className="p-1 rounded-full hover:bg-white/5 text-text-secondary hover:text-white cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSaveItem} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] text-text-secondary uppercase font-bold tracking-wider">Item Name</label>
                  <input
                    type="text"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    required
                    placeholder="e.g. Classic Chicken Sub"
                    className="w-full px-4 py-2.5 rounded-xl bg-bg-dark border border-white/10 focus:border-primary focus:outline-none text-sm text-white transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-text-secondary uppercase font-bold tracking-wider">Description</label>
                  <textarea
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    required
                    placeholder="Short description of ingredients..."
                    rows={2}
                    className="w-full px-4 py-2.5 rounded-xl bg-bg-dark border border-white/10 focus:border-primary focus:outline-none text-sm text-white transition-colors resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] text-text-secondary uppercase font-bold tracking-wider">Price (₹)</label>
                    <input
                      type="number"
                      value={formPrice || ''}
                      onChange={(e) => setFormPrice(Number(e.target.value))}
                      required
                      placeholder="199"
                      min={1}
                      className="w-full px-4 py-2.5 rounded-xl bg-bg-dark border border-white/10 focus:border-primary focus:outline-none text-sm text-white transition-colors"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-text-secondary uppercase font-bold tracking-wider">Category Category</label>
                    <select
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-bg-dark border border-white/10 focus:border-primary focus:outline-none text-sm text-white transition-colors cursor-pointer"
                    >
                      <option value="Veg Burgers">Veg Burgers</option>
                      <option value="Veg Subs">Veg Subs</option>
                      <option value="Veg Rolls">Veg Rolls</option>
                      <option value="Veg Combos">Veg Combos</option>
                      <option value="Chicken Burgers">Chicken Burgers</option>
                      <option value="Chicken Subs">Chicken Subs</option>
                      <option value="Chicken Rolls">Chicken Rolls</option>
                      <option value="Chicken Combos">Chicken Combos</option>
                      <option value="Fries">Fries</option>
                      <option value="Loaded Fries">Loaded Fries</option>
                      <option value="Nuggets">Nuggets</option>
                      <option value="Garlic Bread">Garlic Bread</option>
                      <option value="Soft Drinks">Soft Drinks</option>
                      <option value="Cold Coffee">Cold Coffee</option>
                      <option value="Milkshakes">Milkshakes</option>
                      <option value="Mocktails">Mocktails</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-white/2 border border-white/5">
                  <span className="text-xs font-semibold text-text-secondary">Vegetarian Offer?</span>
                  <button
                    type="button"
                    onClick={() => setFormIsVeg(!formIsVeg)}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                      formIsVeg ? 'bg-green-500' : 'bg-red-500'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        formIsVeg ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                {/* Mock Image Upload */}
                <div className="space-y-1">
                  <label className="text-[10px] text-text-secondary uppercase font-bold tracking-wider">Item Image URL</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={formImage}
                      onChange={(e) => setFormImage(e.target.value)}
                      required
                      placeholder="https://..."
                      className="flex-grow px-4 py-2.5 rounded-xl bg-bg-dark border border-white/10 focus:border-primary focus:outline-none text-xs text-white transition-colors"
                    />
                    <button
                      type="button"
                      onClick={handleMockImageUpload}
                      className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-white/5 border border-white/15 hover:bg-white/10 text-white text-xs font-bold cursor-pointer transition-all"
                    >
                      <FileImage size={14} />
                      Mock Upload
                    </button>
                  </div>
                  <div className="flex items-start gap-1.5 text-[10px] text-text-secondary mt-1">
                    <Info size={12} className="shrink-0 mt-0.5" />
                    <span>Upload sets a high-quality placeholder image for demonstration.</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-white/5 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsMenuModalOpen(false)}
                    className="flex-1 py-3 rounded-xl border border-white/10 text-white font-bold text-xs uppercase hover:bg-white/5 cursor-pointer transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-xs uppercase cursor-pointer shadow-lg shadow-primary/10 transition-colors"
                  >
                    {editingItem ? 'Save Changes' : 'Create Item'}
                  </button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
};
