import React, { createContext, useContext, useState } from 'react';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string; // e.g. "Veg Burgers", "Chicken Burgers", "Sides", "Beverages"
  isVeg: boolean;
  image: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  tableNumber: string;
  items: {
    id: string;
    name: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  status: 'Pending' | 'Preparing' | 'Ready' | 'Served';
  timestamp: string;
}

export interface RestaurantSettings {
  name: string;
  phone: string;
  email: string;
  address: string;
  hours: string;
}

interface AppContextType {
  currentView: 'storefront' | 'admin';
  setCurrentView: (view: 'storefront' | 'admin') => void;
  storefrontSection: string;
  setStorefrontSection: (section: string) => void;
  menuItems: MenuItem[];
  cart: CartItem[];
  orders: Order[];
  restaurantSettings: RestaurantSettings;
  addToCart: (item: MenuItem, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  updateCartQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  addMenuItem: (item: Omit<MenuItem, 'id'>) => void;
  editMenuItem: (item: MenuItem) => void;
  deleteMenuItem: (id: string) => void;
  placeOrder: (customerName: string, tableNumber: string) => string;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  updateSettings: (settings: RestaurantSettings) => void;
  getDashboardStats: () => {
    todayOrdersCount: number;
    revenueToday: number;
    totalMenuItems: number;
    activeTablesCount: number;
  };
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Initial Mock Menu Items
const initialMenuItems: MenuItem[] = [
  // Veg Burgers
  {
    id: 'veg-b1',
    name: 'Spicy Paneer Crunch',
    description: 'Crispy herb-crusted paneer patty, layered with spicy chipotle sauce, sliced jalapenos, and premium cheese.',
    price: 179,
    category: 'Veg Burgers',
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1525059696034-4967a8e1dca2?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'veg-b2',
    name: 'Ultimate Veggie Supreme',
    description: 'Double-decker mixed vegetable patty, classic cheddar, lettuce, onions, and our signature burger cream.',
    price: 159,
    category: 'Veg Burgers',
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1585238342024-78d387f4a707?auto=format&fit=crop&w=600&q=80'
  },
  // Veg Subs
  {
    id: 'veg-s1',
    name: 'Cheesy Jalapeno Sub',
    description: 'Fresh baked multigrain loaf stuffed with grilled cottage cheese cubes, sweet corn, spicy jalapeno, and liquid cheese drip.',
    price: 169,
    category: 'Veg Subs',
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=600&q=80'
  },
  // Veg Rolls
  {
    id: 'veg-r1',
    name: 'Paneer Tikka Roll',
    description: 'Smokey clay-oven roasted paneer chunks wrapped in a flaky paratha with mint chutney and pickled onions.',
    price: 139,
    category: 'Veg Rolls',
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1626700051175-6518c4793f4f?auto=format&fit=crop&w=600&q=80'
  },
  // Veg Combos
  {
    id: 'veg-c1',
    name: 'Big Veg Meal',
    description: 'Spicy Paneer Crunch Burger + Classic Salted Fries + Fizzy Cola.',
    price: 299,
    category: 'Veg Combos',
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=600&q=80'
  },

  // Chicken Burgers
  {
    id: 'chk-b1',
    name: 'Classic Chicken Burger',
    description: 'Double grilled chicken patty, double melted cheese slices, fresh iceberg lettuce, and our house signature mustard-mayo.',
    price: 199,
    category: 'Chicken Burgers',
    isVeg: false,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'chk-b2',
    name: 'Double Crispy Chicken',
    description: 'Extremely crispy double-fried chicken breast, spicy pickles, special hot sauce, and melted cheddar.',
    price: 229,
    category: 'Chicken Burgers',
    isVeg: false,
    image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'chk-b3',
    name: 'Smokehouse BBQ Chicken',
    description: 'Flame-grilled chicken thigh, caramelized onions, smokey hickory BBQ sauce, onion rings, and swiss cheese.',
    price: 249,
    category: 'Chicken Burgers',
    isVeg: false,
    image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=600&q=80'
  },
  // Chicken Subs
  {
    id: 'chk-s1',
    name: 'Chicken Club Sub',
    description: 'Layered smoked chicken salami, chicken breast slices, garlic herb spread, lettuce, tomato, and honey mustard.',
    price: 189,
    category: 'Chicken Subs',
    isVeg: false,
    image: 'https://images.unsplash.com/photo-1553909489-cd47e0907980?auto=format&fit=crop&w=600&q=80'
  },
  // Chicken Rolls
  {
    id: 'chk-r1',
    name: 'Butter Chicken Roll',
    description: 'Shredded chicken cooked in rich buttery tomato gravy, rolled in flatbread with fresh cream and coriander.',
    price: 159,
    category: 'Chicken Rolls',
    isVeg: false,
    image: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?auto=format&fit=crop&w=600&q=80'
  },
  // Chicken Combos
  {
    id: 'chk-c1',
    name: 'Ultimate Chicken Combo',
    description: 'Classic Chicken Burger + 6 Crispy Chicken Nuggets + Soft Drink.',
    price: 349,
    category: 'Chicken Combos',
    isVeg: false,
    image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=600&q=80'
  },

  // Sides
  {
    id: 'side-1',
    name: 'Peri Peri Crispy Fries',
    description: 'Golden-fried potato fries tossed generously in our house secret peri-peri seasoning mix.',
    price: 99,
    category: 'Fries',
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'side-2',
    name: 'Cheese & Jalapeno Loaded Fries',
    description: 'Fries drowned in warm melted cheese sauce, topped with chopped jalapenos and spring onion greens.',
    price: 149,
    category: 'Loaded Fries',
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'side-3',
    name: 'Crispy Chicken Nuggets',
    description: 'Tender chicken breast nuggets, crumb-coated and fried to golden perfection, served with sweet-chili dip (6 Pcs).',
    price: 129,
    category: 'Nuggets',
    isVeg: false,
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'side-4',
    name: 'Garlic Bread sticks',
    description: 'Freshly baked baguette slices spread with garlic butter, Italian herbs, and pullable mozzarella cheese (4 Pcs).',
    price: 119,
    category: 'Garlic Bread',
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?auto=format&fit=crop&w=600&q=80'
  },

  // Beverages
  {
    id: 'bev-1',
    name: 'Fizzy Cola Sparkler',
    description: 'Refreshing classic cola served chilled with lemon wedges and a hint of fresh mint.',
    price: 69,
    category: 'Soft Drinks',
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'bev-2',
    name: 'Hazelnut Cold Brew',
    description: 'Slow-steeped Arabica coffee blended with milk and roasted hazelnut syrup, served over ice cubes.',
    price: 119,
    category: 'Cold Coffee',
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'bev-3',
    name: 'Belgian Chocolate Shake',
    description: 'Creamy double-churned milkshake made with imported Belgian dark chocolate cocoa and ice cream.',
    price: 139,
    category: 'Milkshakes',
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'bev-4',
    name: 'Virgin Mint Mojito',
    description: 'Refreshing cooler made with freshly muddled lime, mint leaves, cane sugar, and carbonated water.',
    price: 109,
    category: 'Mocktails',
    isVeg: true,
    image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=600&q=80'
  }
];

// Initial Mock Orders
const initialOrders: Order[] = [
  {
    id: '#LGB-4019',
    customerName: 'Aarav Mehta',
    tableNumber: '4',
    items: [
      { id: 'chk-b1', name: 'Classic Chicken Burger', quantity: 2, price: 199 },
      { id: 'side-1', name: 'Peri Peri Crispy Fries', quantity: 1, price: 99 },
      { id: 'bev-1', name: 'Fizzy Cola Sparkler', quantity: 2, price: 69 }
    ],
    totalAmount: 635,
    status: 'Preparing',
    timestamp: '15 mins ago'
  },
  {
    id: '#LGB-4018',
    customerName: 'Neha Sharma',
    tableNumber: '8',
    items: [
      { id: 'veg-b1', name: 'Spicy Paneer Crunch', quantity: 1, price: 179 },
      { id: 'bev-3', name: 'Belgian Chocolate Shake', quantity: 1, price: 139 }
    ],
    totalAmount: 318,
    status: 'Ready',
    timestamp: '25 mins ago'
  },
  {
    id: '#LGB-4017',
    customerName: 'Rohit Verma',
    tableNumber: '11',
    items: [
      { id: 'chk-b2', name: 'Double Crispy Chicken', quantity: 1, price: 229 },
      { id: 'side-2', name: 'Cheese & Jalapeno Loaded Fries', quantity: 1, price: 149 },
      { id: 'bev-2', name: 'Hazelnut Cold Brew', quantity: 1, price: 119 }
    ],
    totalAmount: 497,
    status: 'Served',
    timestamp: '1 hour ago'
  }
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<'storefront' | 'admin'>('storefront');
  const [storefrontSection, setStorefrontSection] = useState<string>('home');
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [restaurantSettings, setRestaurantSettings] = useState<RestaurantSettings>({
    name: 'Legendary Burgers',
    phone: '+91 98765 43210',
    email: 'info@legendaryburgers.com',
    address: 'Shop 12-14, Food Street, Sector 5, Hitech City, Hyderabad, 500081',
    hours: 'Mon-Sun: 11:00 AM - 11:00 PM'
  });

  // Cart Functions
  const addToCart = (item: MenuItem, quantity: number = 1) => {
    setCart((prevCart) => {
      const existing = prevCart.find((i) => i.id === item.id);
      if (existing) {
        return prevCart.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prevCart, { ...item, quantity }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((i) => i.id !== id));
  };

  const updateCartQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((i) => (i.id === id ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => setCart([]);

  // Menu CRUD Functions
  const addMenuItem = (item: Omit<MenuItem, 'id'>) => {
    const newId = `custom-${Date.now()}`;
    setMenuItems((prevItems) => [...prevItems, { ...item, id: newId }]);
  };

  const editMenuItem = (item: MenuItem) => {
    setMenuItems((prevItems) =>
      prevItems.map((i) => (i.id === item.id ? item : i))
    );
  };

  const deleteMenuItem = (id: string) => {
    setMenuItems((prevItems) => prevItems.filter((i) => i.id !== id));
    // Also remove from cart if deleted
    removeFromCart(id);
  };

  // Order Placement
  const placeOrder = (customerName: string, tableNumber: string): string => {
    const newOrderId = `#LGB-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: Order = {
      id: newOrderId,
      customerName,
      tableNumber,
      items: cart.map((i) => ({
        id: i.id,
        name: i.name,
        quantity: i.quantity,
        price: i.price
      })),
      totalAmount: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
      status: 'Pending',
      timestamp: 'Just now'
    };

    setOrders((prevOrders) => [newOrder, ...prevOrders]);
    clearCart();
    return newOrderId;
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders((prevOrders) =>
      prevOrders.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
  };

  // Restaurant Settings
  const updateSettings = (settings: RestaurantSettings) => {
    setRestaurantSettings(settings);
  };

  // Admin Panel Dashboard Stats
  const getDashboardStats = () => {
    const todayOrdersCount = orders.length;
    // Sum amount of orders today
    const revenueToday = orders.reduce((sum, o) => sum + o.totalAmount, 0);
    const totalMenuItems = menuItems.length;

    // Count distinct tables currently marked as active (Pending, Preparing, Ready status)
    const activeTables = new Set(
      orders
        .filter((o) => o.status !== 'Served')
        .map((o) => o.tableNumber)
    );

    return {
      todayOrdersCount,
      revenueToday,
      totalMenuItems,
      activeTablesCount: activeTables.size || 4 // Fallback if no active tables
    };
  };

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        storefrontSection,
        setStorefrontSection,
        menuItems,
        cart,
        orders,
        restaurantSettings,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        addMenuItem,
        editMenuItem,
        deleteMenuItem,
        placeOrder,
        updateOrderStatus,
        updateSettings,
        getDashboardStats
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
