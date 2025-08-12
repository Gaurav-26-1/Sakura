import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShoppingCart, Plus, Minus, CreditCard, MapPin, Phone } from "lucide-react";

interface MenuItem {
  id: string;
  name: string;
  nameJapanese: string;
  description: string;
  price: number;
  category: string;
  spicy?: boolean;
  vegetarian?: boolean;
}

interface CartItem extends MenuItem {
  quantity: number;
}

const menuItems: MenuItem[] = [
  // Appetizers
  {
    id: '1',
    name: 'Gyoza',
    nameJapanese: '餃子',
    description: 'Pan-fried pork and vegetable dumplings (6 pieces)',
    price: 8.50,
    category: 'appetizers'
  },
  {
    id: '2',
    name: 'Edamame',
    nameJapanese: '枝豆',
    description: 'Steamed young soybeans with sea salt',
    price: 5.50,
    category: 'appetizers',
    vegetarian: true
  },
  {
    id: '3',
    name: 'Takoyaki',
    nameJapanese: 'たこ焼き',
    description: 'Octopus balls with takoyaki sauce and bonito flakes (8 pieces)',
    price: 9.50,
    category: 'appetizers'
    
  },
  {
    id: '4',
    name: 'Agedashi Tofu',
    nameJapanese: '揚げ出し豆腐',
    description: 'Lightly fried tofu in savory dashi broth',
    price: 7.00,
    category: 'appetizers',
    vegetarian: true
  },
  
  // Sushi & Sashimi
  {
    id: '5',
    name: 'Salmon Sashimi',
    nameJapanese: 'サーモン刺身',
    description: 'Fresh Atlantic salmon slices (8 pieces)',
    price: 16.00,
    category: 'sushi'
  },
  {
    id: '6',
    name: 'Tuna Sashimi',
    nameJapanese: 'マグロ刺身',
    description: 'Premium yellowfin tuna slices (8 pieces)',
    price: 18.00,
    category: 'sushi'
  },
  {
    id: '7',
    name: 'California Roll',
    nameJapanese: 'カリフォルニア巻',
    description: 'Crab, avocado, cucumber with sesame seeds (8 pieces)',
    price: 12.00,
    category: 'sushi'
  },
  {
    id: '8',
    name: 'Spicy Tuna Roll',
    nameJapanese: 'スパイシーツナ巻',
    description: 'Spicy tuna with cucumber and spicy mayo (8 pieces)',
    price: 14.00,
    category: 'sushi',
    spicy: true
  },
  {
    id: '9',
    name: 'Dragon Roll',
    nameJapanese: 'ドラゴン巻',
    description: 'Eel, cucumber, avocado with eel sauce (8 pieces)',
    price: 16.50,
    category: 'sushi'
  },
  
  // Ramen
  {
    id: '10',
    name: 'Tonkotsu Ramen',
    nameJapanese: '豚骨ラーメン',
    description: 'Rich pork bone broth with chashu, egg, and green onions',
    price: 15.50,
    category: 'ramen'
  },
  {
    id: '11',
    name: 'Miso Ramen',
    nameJapanese: '味噌ラーメン',
    description: 'Fermented soybean paste broth with corn, butter, and pork',
    price: 14.50,
    category: 'ramen'
  },
  {
    id: '12',
    name: 'Shoyu Ramen',
    nameJapanese: '醤油ラーメン',
    description: 'Clear soy sauce broth with bamboo shoots and seaweed',
    price: 13.50,
    category: 'ramen'
  },
  {
    id: '13',
    name: 'Spicy Miso Ramen',
    nameJapanese: 'スパイシー味噌ラーメン',
    description: 'Spicy miso broth with ground pork and bean sprouts',
    price: 16.00,
    category: 'ramen',
    spicy: true
  },
  
  // Main Dishes
  {
    id: '14',
    name: 'Chicken Teriyaki',
    nameJapanese: '鶏照焼',
    description: 'Grilled chicken thigh with teriyaki sauce and steamed rice',
    price: 17.00,
    category: 'mains'
  },
  {
    id: '15',
    name: 'Beef Yakiniku',
    nameJapanese: '焼肉',
    description: 'Grilled marinated beef with vegetables and rice',
    price: 22.00,
    category: 'mains'
  },
  {
    id: '16',
    name: 'Salmon Shioyaki',
    nameJapanese: '鮭塩焼',
    description: 'Salt-grilled salmon with daikon radish and rice',
    price: 19.50,
    category: 'mains'
  },
  {
    id: '17',
    name: 'Vegetable Tempura',
    nameJapanese: '野菜天ぷら',
    description: 'Assorted seasonal vegetables in light tempura batter',
    price: 14.00,
    category: 'mains',
    vegetarian: true
  },
  {
    id: '18',
    name: 'Unagi Don',
    nameJapanese: 'うな丼',
    description: 'Grilled eel over rice with sweet soy glaze',
    price: 24.00,
    category: 'mains'
  },
  
  // Desserts
  {
    id: '19',
    name: 'Mochi Ice Cream',
    nameJapanese: 'もちアイス',
    description: 'Assorted flavors: vanilla, strawberry, green tea (3 pieces)',
    price: 6.50,
    category: 'desserts',
    vegetarian: true
  },
  {
    id: '20',
    name: 'Dorayaki',
    nameJapanese: 'どら焼き',
    description: 'Pancake sandwich filled with sweet red bean paste',
    price: 5.50,
    category: 'desserts',
    vegetarian: true
  },
  {
    id: '21',
    name: 'Matcha Cheesecake',
    nameJapanese: '抹茶チーズケーキ',
    description: 'Rich green tea flavored cheesecake with whipped cream',
    price: 7.50,
    category: 'desserts',
    vegetarian: true
  },
  
  // Beverages
  {
    id: '22',
    name: 'Green Tea',
    nameJapanese: '緑茶',
    description: 'Traditional hot Japanese green tea',
    price: 3.00,
    category: 'beverages',
    vegetarian: true
  },
  {
    id: '23',
    name: 'Sake',
    nameJapanese: '日本酒',
    description: 'Premium Japanese rice wine (hot or cold)',
    price: 8.00,
    category: 'beverages'
  },
  {
    id: '24',
    name: 'Ramune',
    nameJapanese: 'ラムネ',
    description: 'Japanese marble soda - original flavor',
    price: 4.50,
    category: 'beverages',
    vegetarian: true
  }
];

const categories = {
  appetizers: 'Appetizers',
  sushi: 'Sushi & Sashimi',
  ramen: 'Ramen',
  mains: 'Main Dishes',
  desserts: 'Desserts',
  beverages: 'Beverages'
};

export default function SakuraKitchen() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const addToCart = (item: MenuItem) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, change: number) => {
    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.id === id) {
          const newQuantity = item.quantity + change;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
        }
        return item;
      }).filter(item => item.quantity > 0);
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderComplete(true);
    setCart([]);
    setTimeout(() => {
      setIsCheckoutOpen(false);
      setOrderComplete(false);
    }, 3000);
  };

  if (orderComplete) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 to-green-100">
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-8">
            <div className="mb-4 text-6xl">🍱</div>
            <h2 className="mb-2 text-2xl font-bold text-green-800">Order Complete!</h2>
            <p className="text-green-600">Thank you for your order. Your delicious Japanese meal will be ready soon!</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-red-800">🌸 Sakura Kitchen</h1>
              <p className="text-sm text-gray-600">桜キッチン - Authentic Japanese Cuisine</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Phone size={16} />
                  <span>(555) 123-SAKU</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin size={16} />
                  <span>123 Cherry Blossom St</span>
                </div>
              </div>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="relative">
                    <ShoppingCart className="h-5 w-5" />
                    {getTotalItems() > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                        {getTotalItems()}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Your Order</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 space-y-4">
                    {cart.length === 0 ? (
                      <p className="text-gray-500 text-center py-8">Your cart is empty</p>
                    ) : (
                      <>
                        {cart.map((item) => (
                          <div key={item.id} className="flex items-center justify-between border-b pb-4">
                            <div className="flex-1">
                              <h4 className="font-medium">{item.name}</h4>
                              <p className="text-sm text-gray-600">${item.price.toFixed(2)} each</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(item.id, -1)}
                                className="h-8 w-8 p-0"
                              >
                                <Minus size={14} />
                              </Button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(item.id, 1)}
                                className="h-8 w-8 p-0"
                              >
                                <Plus size={14} />
                              </Button>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFromCart(item.id)}
                              className="ml-2 text-red-500 hover:text-red-700"
                            >
                              ×
                            </Button>
                          </div>
                        ))}
                        <div className="border-t pt-4">
                          <div className="flex justify-between items-center text-lg font-bold">
                            <span>Total:</span>
                            <span>${getTotalPrice().toFixed(2)}</span>
                          </div>
                          <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
                            <DialogTrigger asChild>
                              <Button className="w-full mt-4" size="lg">
                                <CreditCard className="mr-2 h-4 w-4" />
                                Checkout
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md">
                              <DialogHeader>
                                <DialogTitle>Complete Your Order</DialogTitle>
                              </DialogHeader>
                              <form onSubmit={handleCheckout} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input id="firstName" required />
                                  </div>
                                  <div>
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input id="lastName" required />
                                  </div>
                                </div>
                                <div>
                                  <Label htmlFor="phone">Phone Number</Label>
                                  <Input id="phone" type="tel" required />
                                </div>
                                <div>
                                  <Label htmlFor="orderType">Order Type</Label>
                                  <Select required>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select order type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="dine-in">Dine In</SelectItem>
                                      <SelectItem value="takeout">Takeout</SelectItem>
                                      <SelectItem value="delivery">Delivery</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="border-t pt-4">
                                  <h3 className="font-semibold mb-2">Payment Method</h3>
                                  <div>
                                    <Label htmlFor="cardNumber">Card Number</Label>
                                    <Input id="cardNumber" placeholder="1234 5678 9012 3456" required />
                                  </div>
                                  <div className="grid grid-cols-2 gap-4 mt-2">
                                    <div>
                                      <Label htmlFor="expiry">Expiry</Label>
                                      <Input id="expiry" placeholder="MM/YY" required />
                                    </div>
                                    <div>
                                      <Label htmlFor="cvv">CVV</Label>
                                      <Input id="cvv" placeholder="123" required />
                                    </div>
                                  </div>
                                </div>
                                <div className="border-t pt-4">
                                  <div className="flex justify-between items-center text-lg font-bold mb-4">
                                    <span>Total:</span>
                                    <span>${getTotalPrice().toFixed(2)}</span>
                                  </div>
                                  <Button type="submit" className="w-full" size="lg">
                                    Complete Order
                                  </Button>
                                </div>
                              </form>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* Menu Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">Our Menu</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Experience the authentic flavors of Japan with our carefully crafted dishes made from the finest ingredients.
          </p>
        </div>

        <Tabs defaultValue="appetizers" className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 mb-8">
            {Object.entries(categories).map(([key, label]) => (
              <TabsTrigger key={key} value={key} className="text-xs lg:text-sm">
                {label}
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(categories).map(([categoryKey, categoryLabel]) => (
            <TabsContent key={categoryKey} value={categoryKey}>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {menuItems
                  .filter(item => item.category === categoryKey)
                  .map((item) => (
                    <Card key={item.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">{item.name}</CardTitle>
                            <p className="text-sm text-gray-500 font-medium">{item.nameJapanese}</p>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <span className="text-lg font-bold text-green-600">
                              ${item.price.toFixed(2)}
                            </span>
                            <div className="flex gap-1">
                              {item.spicy && <Badge variant="destructive" className="text-xs">🌶️ Spicy</Badge>}
                              {item.vegetarian && <Badge variant="secondary" className="text-xs">🥬 Vegetarian</Badge>}
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4">{item.description}</p>
                        <Button 
                          onClick={() => addToCart(item)}
                          className="w-full"
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          Add to Cart
                        </Button>
                      </CardContent>
                    </Card>
                  ))
                }
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-xl font-bold mb-2">🌸 Sakura Kitchen</h3>
          <p className="text-gray-300 mb-4">Authentic Japanese cuisine in the heart of the city</p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <MapPin size={16} />
              <span>123 Cherry Blossom Street, Downtown</span>
            </div>
            <div className="flex items-center gap-1">
              <Phone size={16} />
              <span>(555) 123-SAKU (7258)</span>
            </div>
          </div>
          <p className="text-gray-400 text-xs mt-4">Hours: Mon-Thu 11AM-10PM | Fri-Sat 11AM-11PM | Sun 12PM-9PM</p>
        </div>
      </footer>
    </div>
  );
}
