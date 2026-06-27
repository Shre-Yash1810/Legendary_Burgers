import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, X, Plus, Minus, Trash2, CheckCircle2, Loader2 } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const { 
    cart, 
    updateCartQuantity, 
    removeFromCart, 
    placeOrder
  } = useApp();

  const [isOpen, setIsOpen] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [tableNumber, setTableNumber] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successOrderId, setSuccessOrderId] = useState('');
  const [pulseBtn, setPulseBtn] = useState(false);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Trigger floating cart button pulse effect when items in cart changes
  useEffect(() => {
    if (totalItems > 0) {
      setPulseBtn(true);
      const timer = setTimeout(() => setPulseBtn(false), 600);
      return () => clearTimeout(timer);
    }
  }, [totalItems]);

  // Listen to custom open-cart events from Header
  useEffect(() => {
    const handleOpenCart = () => {
      setIsOpen(true);
      setIsSuccess(false);
    };
    window.addEventListener('open-cart', handleOpenCart);
    return () => window.removeEventListener('open-cart', handleOpenCart);
  }, []);

  const handleClose = () => {
    if (isSubmitting) return; // Prevent closing while processing
    setIsOpen(false);
    // Reset state after drawer closes fully
    setTimeout(() => {
      if (isSuccess) {
        setIsSuccess(false);
        setCustomerName('');
        setTableNumber('');
        setSuccessOrderId('');
      }
      setErrors({});
    }, 300);
  };

  const handleValidation = () => {
    const newErrors: Record<string, string> = {};
    if (!customerName.trim()) {
      newErrors.name = 'Customer name is required';
    } else if (customerName.trim().length < 3) {
      newErrors.name = 'Name must be at least 3 characters';
    }

    if (!tableNumber) {
      newErrors.table = 'Please select a table number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!handleValidation()) return;

    setIsSubmitting(true);
    
    // Simulate food-tech kitchen submission
    setTimeout(() => {
      const orderId = placeOrder(customerName, tableNumber);
      setSuccessOrderId(orderId);
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 2000);
  };

  return (
    <>
      {/* Floating Cart Button (Visible on mobile/desktop when cart has items) */}
      <AnimatePresence>
        {totalItems > 0 && !isOpen && (
          <motion.button
            initial={{ y: 100, opacity: 0, scale: 0.9 }}
            animate={{ 
              y: 0, 
              opacity: 1, 
              scale: pulseBtn ? 1.08 : 1,
              transition: { type: 'spring', stiffness: 260, damping: 20 }
            }}
            exit={{ y: 100, opacity: 0, scale: 0.9 }}
            onClick={() => {
              setIsSuccess(false);
              setIsOpen(true);
            }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-35 flex items-center justify-between gap-4 w-[90%] max-w-md px-6 py-4 rounded-2xl bg-primary hover:bg-primary-hover text-white shadow-2xl shadow-primary/30 glow-orange font-display cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <ShoppingBag size={22} className="animate-wiggle" />
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-[10px] font-black text-bg-dark border border-primary">
                  {totalItems}
                </span>
              </div>
              <div className="flex flex-col items-start leading-none">
                <span className="text-xs text-white/80 font-bold">View Cart</span>
                <span className="text-sm font-black mt-0.5">{totalItems} Item{totalItems > 1 ? 's' : ''}</span>
              </div>
            </div>
            
            <span className="text-lg font-black font-display tracking-tight">
              ₹{totalPrice}
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Cart Drawer & Modal Wrapper */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="fixed inset-0 z-40 bg-black backdrop-blur-sm"
            />

            {/* Main Cart Container (Drawer on Mobile, Center Modal on Desktop) */}
            <motion.div
              initial={{ y: '100%', x: '-50%' }}
              animate={{ y: 0, x: '-50%' }}
              exit={{ y: '100%', x: '-50%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed bottom-0 md:bottom-auto md:top-1/2 left-1/2 z-50 w-full max-w-lg md:-translate-y-1/2 md:rounded-3xl bg-surface border border-white/5 shadow-2xl flex flex-col max-h-[92vh] md:max-h-[85vh] overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/2">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="text-primary" size={20} />
                  <h3 className="text-lg font-bold text-white uppercase tracking-wider">
                    {isSuccess ? 'Order Success' : 'Your Basket'}
                  </h3>
                </div>
                <button 
                  onClick={handleClose}
                  disabled={isSubmitting}
                  className="p-1 rounded-full hover:bg-white/5 text-text-secondary hover:text-white cursor-pointer disabled:opacity-50"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Success Screen View */}
              {isSuccess ? (
                <div className="p-8 flex flex-col items-center text-center overflow-y-auto">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, rotate: 360 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                    className="flex items-center justify-center w-20 h-20 rounded-full bg-success/15 text-success border border-success/30 mb-6"
                  >
                    <CheckCircle2 size={44} className="stroke-[2.5]" />
                  </motion.div>

                  <h4 className="text-2xl font-black text-white font-display tracking-tight uppercase">
                    Your Legendary Order Has Been Placed!
                  </h4>
                  <p className="mt-3 text-sm text-text-secondary max-w-sm leading-relaxed">
                    Order reference: <span className="text-primary font-bold">{successOrderId}</span> has been dispatched directly to the kitchen.
                  </p>
                  
                  <div className="mt-6 p-4 rounded-2xl bg-white/5 border border-white/5 w-full text-left">
                    <div className="text-xs text-text-secondary uppercase font-bold tracking-wider mb-2">Order summary</div>
                    <div className="flex justify-between text-sm text-white font-medium">
                      <span>Table Number</span>
                      <span className="text-secondary font-black">Table #{tableNumber}</span>
                    </div>
                    <div className="flex justify-between text-sm text-white font-medium mt-1">
                      <span>Customer</span>
                      <span>{customerName}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleClose}
                    className="mt-8 w-full py-4 rounded-2xl bg-primary hover:bg-primary-hover text-white font-bold uppercase tracking-wide transition-colors cursor-pointer"
                  >
                    Keep Ordering
                  </button>
                </div>
              ) : (
                /* Standard Basket View */
                <>
                  {/* Cart Items List */}
                  <div className="flex-grow p-6 overflow-y-auto space-y-4">
                    {cart.length === 0 ? (
                      <div className="py-12 flex flex-col items-center text-center text-text-secondary">
                        <ShoppingBag size={48} className="stroke-1 opacity-40 mb-3" />
                        <p>Your basket is currently empty.</p>
                        <p className="text-xs mt-1 text-text-secondary/60">Add some legendary burgers to get started!</p>
                      </div>
                    ) : (
                      cart.map((item) => (
                        <div 
                          key={item.id}
                          className="flex items-center gap-4 p-3 rounded-2xl bg-white/2 border border-white/5 hover:border-white/10 transition-colors"
                        >
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-14 h-14 rounded-xl object-cover"
                          />
                          <div className="flex-grow min-w-0">
                            <h4 className="text-sm font-bold text-white truncate">{item.name}</h4>
                            <span className="text-xs text-primary font-black mt-1 block">₹{item.price}</span>
                          </div>
                          
                          {/* Item Quantity Controller */}
                          <div className="flex items-center gap-2">
                            <div className="flex items-center bg-white/5 rounded-xl border border-white/10 p-0.5">
                              <button
                                onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                                className="p-1.5 rounded-lg hover:bg-white/10 text-text-secondary hover:text-white cursor-pointer"
                                aria-label="Decrease quantity"
                              >
                                <Minus size={12} />
                              </button>
                              <span className="w-6 text-center text-xs font-bold text-white">{item.quantity}</span>
                              <button
                                onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                                className="p-1.5 rounded-lg hover:bg-white/10 text-text-secondary hover:text-white cursor-pointer"
                                aria-label="Increase quantity"
                              >
                                <Plus size={12} />
                              </button>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-500 transition-colors cursor-pointer"
                              aria-label="Remove item"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Checkout Form & Total Footer */}
                  {cart.length > 0 && (
                    <form 
                      onSubmit={handleSubmit}
                      className="border-t border-white/5 bg-white/2 p-6 space-y-4"
                    >
                      <h4 className="text-sm font-bold text-white uppercase tracking-wider">Customer Details</h4>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Name Input with Modern Floating Label */}
                        <div className="relative">
                          <input
                            type="text"
                            id="customerName"
                            value={customerName}
                            onChange={(e) => {
                              setCustomerName(e.target.value);
                              if (errors.name) setErrors(prev => ({ ...prev, name: '' }));
                            }}
                            disabled={isSubmitting}
                            placeholder=" "
                            className={`peer w-full px-4 py-3 rounded-xl bg-surface border text-sm text-white placeholder-transparent focus:outline-none transition-colors ${
                              errors.name 
                                ? 'border-red-500 focus:border-red-500' 
                                : 'border-white/10 focus:border-primary'
                            }`}
                          />
                          <label
                            htmlFor="customerName"
                            className={`absolute left-4 text-xs text-text-secondary transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3.5 peer-focus:-top-2 peer-focus:text-xs peer-focus:px-1.5 peer-focus:bg-surface pointer-events-none ${
                              customerName ? '-top-2 px-1.5 bg-surface text-primary' : 'top-3.5'
                            }`}
                          >
                            Your Name
                          </label>
                          {errors.name && (
                            <span className="text-[10px] text-red-500 mt-1 block pl-1">{errors.name}</span>
                          )}
                        </div>

                        {/* Table Number Selector */}
                        <div className="relative">
                          <select
                            id="tableNumber"
                            value={tableNumber}
                            onChange={(e) => {
                              setTableNumber(e.target.value);
                              if (errors.table) setErrors(prev => ({ ...prev, table: '' }));
                            }}
                            disabled={isSubmitting}
                            className={`w-full px-4 py-3 rounded-xl bg-surface border text-sm text-white focus:outline-none transition-colors appearance-none cursor-pointer ${
                              errors.table 
                                ? 'border-red-500 focus:border-red-500' 
                                : 'border-white/10 focus:border-primary'
                            }`}
                          >
                            <option value="" disabled hidden>Select Table</option>
                            {[...Array(12)].map((_, i) => (
                              <option key={i + 1} value={`${i + 1}`}>
                                Table #{i + 1}
                              </option>
                            ))}
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-text-secondary">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                            </svg>
                          </div>
                          {errors.table && (
                            <span className="text-[10px] text-red-500 mt-1 block pl-1">{errors.table}</span>
                          )}
                        </div>
                      </div>

                      {/* Total & Submit Button */}
                      <div className="pt-4 border-t border-white/5 flex items-center justify-between text-white">
                        <div>
                          <span className="text-xs text-text-secondary uppercase font-bold tracking-wider">Total amount</span>
                          <div className="text-2xl font-black font-display tracking-tight text-white">₹{totalPrice}</div>
                        </div>
                        
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-primary hover:bg-primary-hover disabled:bg-primary/50 text-white font-extrabold uppercase text-xs tracking-wider shadow-lg shadow-primary/20 transition-all cursor-pointer min-w-[160px]"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 size={16} className="animate-spin" />
                              Placing...
                            </>
                          ) : (
                            'Place Order'
                          )}
                        </button>
                      </div>
                    </form>
                  )}
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
