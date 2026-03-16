import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { motion } from "motion/react";

interface Product {
  id: string;
  name: string;
  emoji: string;
  price: string;
  description: string;
  tag?: string;
  affiliateUrl: string;
}

const PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "IPL Jersey",
    emoji: "👕",
    price: "₹499+",
    description: "Official fan jersey with your team's colors",
    tag: "Bestseller",
    affiliateUrl: "https://amzn.in/d/08SzK5x1",
  },
  {
    id: "p2",
    name: "Sports Cap",
    emoji: "🧢",
    price: "₹199+",
    description: "Premium embroidered IPL team cap",
    affiliateUrl: "https://www.amazon.in/s?k=ipl+cricket+cap",
  },
  {
    id: "p3",
    name: "Cricket Bat",
    emoji: "🏏",
    price: "₹999+",
    description: "Practice bat used by cricket enthusiasts",
    tag: "Popular",
    affiliateUrl: "https://www.amazon.in/s?k=cricket+bat",
  },
  {
    id: "p4",
    name: "Cricket Ball",
    emoji: "🔴",
    price: "₹249+",
    description: "Leather cricket ball for match play",
    affiliateUrl: "https://www.amazon.in/s?k=leather+cricket+ball",
  },
  {
    id: "p5",
    name: "IPL Fan Scarf",
    emoji: "🧣",
    price: "₹179+",
    description: "Cozy fleece scarf in IPL team colors",
    affiliateUrl: "https://www.amazon.in/s?k=ipl+fan+scarf",
  },
  {
    id: "p6",
    name: "Batting Gloves",
    emoji: "🧤",
    price: "₹599+",
    description: "Pro-grade batting gloves for grip & protection",
    tag: "New",
    affiliateUrl: "https://www.amazon.in/s?k=cricket+batting+gloves",
  },
  {
    id: "p7",
    name: "Cricket Helmet",
    emoji: "⛑️",
    price: "₹1,299+",
    description: "Safety helmet for batting & wicketkeeping",
    affiliateUrl: "https://www.amazon.in/s?k=cricket+helmet",
  },
  {
    id: "p8",
    name: "Sports Water Bottle",
    emoji: "🍶",
    price: "₹249+",
    description: "BPA-free 1L bottle for match day hydration",
    affiliateUrl: "https://www.amazon.in/s?k=sports+water+bottle",
  },
];

export default function ShopPage() {
  function openAffiliate(url: string) {
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="min-h-full">
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border px-4 py-4">
        <div>
          <h1 className="font-display font-bold text-xl text-foreground">
            Shop
          </h1>
          <p className="text-xs text-muted-foreground">
            Tap any product to buy on the official store
          </p>
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
              <Card
                className="bg-card border-border overflow-hidden h-full flex flex-col cursor-pointer hover:border-primary/50 transition-colors active:scale-95"
                onClick={() => openAffiliate(product.affiliateUrl)}
              >
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
                  <div className="mt-3 mb-2">
                    <span className="text-primary font-bold text-sm">
                      {product.price}
                    </span>
                  </div>
                  <Button
                    data-ocid={`shop.product.button.${i + 1}`}
                    size="sm"
                    className="w-full bg-primary text-primary-foreground text-xs gap-1.5"
                    onClick={(e) => {
                      e.stopPropagation();
                      openAffiliate(product.affiliateUrl);
                    }}
                  >
                    <ExternalLink size={11} />
                    Buy Now
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-[10px] text-muted-foreground mt-6 px-4">
          * This page contains affiliate links. We may earn a commission on
          purchases at no extra cost to you.
        </p>
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
