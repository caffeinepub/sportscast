import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Play, ShoppingCart, Trash2, Zap } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useLang } from "../context/LangContext";
import {
  type CartItem,
  clearCart,
  getCart,
  getProfile,
  saveCart,
  saveProfile,
} from "../utils/storage";

interface Product {
  id: string;
  name: string;
  emoji: string;
  price: number;
  description: string;
  tag?: string;
}

const PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "IPL Jersey",
    emoji: "👕",
    price: 500,
    description: "Official fan jersey with your team's colors",
    tag: "Bestseller",
  },
  {
    id: "p2",
    name: "Sports Cap",
    emoji: "🧢",
    price: 200,
    description: "Premium embroidered cap with SportsCast logo",
  },
  {
    id: "p3",
    name: "Ceramic Mug",
    emoji: "☕",
    price: 150,
    description: "11oz mug with cricket & football prints",
  },
  {
    id: "p4",
    name: "Water Bottle",
    emoji: "🍶",
    price: 250,
    description: "BPA-free 1L bottle for match day hydration",
    tag: "New",
  },
  {
    id: "p5",
    name: "Fan Scarf",
    emoji: "🧣",
    price: 180,
    description: "Cozy fleece scarf in team colors",
  },
  {
    id: "p6",
    name: "Keychain",
    emoji: "🔑",
    price: 80,
    description: "Metal keychain with stadium design",
  },
];

export default function ShopPage() {
  const { t } = useLang();
  const [cart, setCart] = useState<CartItem[]>(getCart);
  const [profile, setProfileState] = useState(getProfile);
  const [discountApplied, setDiscountApplied] = useState(false);
  const [adProgress, setAdProgress] = useState(0);
  const [watchingAd, setWatchingAd] = useState(false);
  const [view, setView] = useState<"shop" | "cart" | "success">("shop");

  function addToCart(product: Product) {
    const existing = cart.find((c) => c.productId === product.id);
    let updated: CartItem[];
    if (existing) {
      updated = cart.map((c) =>
        c.productId === product.id ? { ...c, quantity: c.quantity + 1 } : c,
      );
    } else {
      updated = [
        ...cart,
        {
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
        },
      ];
    }
    setCart(updated);
    saveCart(updated);
    toast.success(`${product.name} added!`);
  }

  function removeFromCart(productId: string) {
    const updated = cart.filter((c) => c.productId !== productId);
    setCart(updated);
    saveCart(updated);
  }

  function startWatchAd() {
    if (discountApplied || watchingAd) return;
    setWatchingAd(true);
    setAdProgress(0);
    const interval = setInterval(() => {
      setAdProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setWatchingAd(false);
          setDiscountApplied(true);
          toast.success(t("discountApplied"), { duration: 3000 });
          return 100;
        }
        return Math.min(100, p + 100 / 30);
      });
    }, 100);
  }

  const subtotal = cart.reduce((s, c) => s + c.price * c.quantity, 0);
  const discount = discountApplied ? Math.floor(subtotal * 0.1) : 0;
  const total = subtotal - discount;
  const cartCount = cart.reduce((s, c) => s + c.quantity, 0);

  function handleCheckout() {
    if (profile.totalPoints < total) {
      toast.error(`Not enough points! Need ${total} pts`);
      return;
    }
    const updated = { ...profile, totalPoints: profile.totalPoints - total };
    setProfileState(updated);
    saveProfile(updated);
    clearCart();
    setCart([]);
    setDiscountApplied(false);
    setView("success");
  }

  if (view === "success") {
    return (
      <div className="min-h-full flex flex-col items-center justify-center p-8 text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
        >
          <CheckCircle size={64} className="text-primary mx-auto mb-4" />
          <h2 className="font-display font-bold text-2xl text-foreground mb-2">
            {t("orderSuccess")}
          </h2>
          <p className="text-muted-foreground text-sm mb-6">
            {t("orderPlaced")}
          </p>
          <Button
            data-ocid="shop.continue.button"
            className="bg-primary text-primary-foreground"
            onClick={() => setView("shop")}
          >
            {t("continueShopping")}
          </Button>
        </motion.div>
      </div>
    );
  }

  if (view === "cart") {
    return (
      <div className="min-h-full">
        <header className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border px-4 py-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="text-muted-foreground hover:text-foreground text-lg"
              onClick={() => setView("shop")}
              data-ocid="shop.back.button"
            >
              ←
            </button>
            <div>
              <h1 className="font-display font-bold text-xl text-foreground">
                {t("cart")}
              </h1>
              <p className="text-xs text-muted-foreground">
                {cartCount} item(s)
              </p>
            </div>
          </div>
        </header>
        <main className="px-4 py-4 space-y-4">
          {cart.length === 0 ? (
            <div
              data-ocid="shop.cart.empty_state"
              className="py-16 text-center text-muted-foreground"
            >
              <ShoppingCart size={40} className="mx-auto mb-3 opacity-30" />
              <p>{t("emptyCart")}</p>
            </div>
          ) : (
            <>
              <div className="space-y-2">
                {cart.map((item, i) => (
                  <Card
                    key={item.productId}
                    data-ocid={`shop.cart.item.${i + 1}`}
                    className="bg-card border-border"
                  >
                    <CardContent className="p-3 flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground text-sm">
                          {item.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {item.quantity} × {item.price} pts
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-primary font-bold">
                          {item.price * item.quantity} pts
                        </span>
                        <button
                          type="button"
                          data-ocid={`shop.cart.delete_button.${i + 1}`}
                          onClick={() => removeFromCart(item.productId)}
                          className="text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="bg-card border-border">
                <CardContent className="p-4">
                  {watchingAd ? (
                    <div className="space-y-2">
                      <p className="text-xs text-muted-foreground">
                        {t("watchingAd")}
                      </p>
                      <Progress
                        value={adProgress}
                        className="h-2"
                        data-ocid="shop.ad.loading_state"
                      />
                    </div>
                  ) : discountApplied ? (
                    <div className="flex items-center gap-2 text-primary">
                      <CheckCircle size={16} />
                      <span className="text-sm font-medium">
                        {t("discountApplied")}
                      </span>
                    </div>
                  ) : (
                    <Button
                      data-ocid="shop.watchad.button"
                      variant="outline"
                      className="w-full gap-2 border-primary/30 text-primary hover:bg-primary/10"
                      onClick={startWatchAd}
                    >
                      <Play size={14} />
                      {t("watchAdDiscount")}
                    </Button>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardContent className="p-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground">{subtotal} pts</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {t("discount")} (10%)
                      </span>
                      <span className="text-primary">−{discount} pts</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold border-t border-border pt-2">
                    <span className="text-foreground">{t("total")}</span>
                    <span className="text-primary">{total} pts</span>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Your balance</span>
                    <span
                      className={
                        profile.totalPoints < total ? "text-destructive" : ""
                      }
                    >
                      {profile.totalPoints} pts
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Button
                data-ocid="shop.checkout.button"
                className="w-full bg-primary text-primary-foreground neon-glow font-semibold"
                onClick={handleCheckout}
                disabled={cart.length === 0}
              >
                {t("checkout")} — {total} pts
              </Button>
            </>
          )}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-full">
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display font-bold text-xl text-foreground">
              Merch Shop
            </h1>
            <p className="text-xs text-muted-foreground">
              Spend your prediction points
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-primary text-sm font-bold">
              <Zap size={13} />
              {profile.totalPoints} pts
            </div>
            <button
              type="button"
              data-ocid="shop.cart.button"
              onClick={() => setView("cart")}
              className="relative p-2 rounded-lg bg-secondary text-foreground hover:bg-secondary/80"
            >
              <ShoppingCart size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="px-4 py-4">
        <div className="grid grid-cols-2 gap-3">
          {PRODUCTS.map((product, i) => (
            <motion.div
              key={product.id}
              data-ocid={`shop.product.item.${i + 1}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <Card className="bg-card border-border overflow-hidden h-full flex flex-col">
                <CardContent className="p-4 flex flex-col flex-1">
                  {product.tag && (
                    <Badge className="self-start mb-2 bg-primary/20 text-primary border-primary/30 text-[10px]">
                      {product.tag}
                    </Badge>
                  )}
                  <div className="text-4xl mb-3">{product.emoji}</div>
                  <p className="font-semibold text-sm text-foreground">
                    {product.name}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 flex-1 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="mt-3">
                    <span className="text-primary font-bold text-sm">
                      {product.price} pts
                    </span>
                  </div>
                  <Button
                    data-ocid={`shop.product.button.${i + 1}`}
                    size="sm"
                    className="mt-2 w-full bg-primary text-primary-foreground text-xs"
                    onClick={() => addToCart(product)}
                  >
                    {t("addToCart")}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </main>

      <footer className="text-center py-6 text-xs text-muted-foreground">
        © {new Date().getFullYear()}.{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary transition-colors"
        >
          Built with ❤️ using caffeine.ai
        </a>
      </footer>
    </div>
  );
}
