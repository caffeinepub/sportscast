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

const JERSEYS: Product[] = [
  {
    id: "p1",
    name: "IPL Jersey",
    emoji: "👕",
    price: "₹499+",
    description: "Official fan jersey with your team's colors",
    tag: "Bestseller",
    affiliateUrl: "https://amzn.in/d/08SzK5x1",
  },
];

const FRAMES: Product[] = [
  {
    id: "f1",
    name: "Cricket Photo Frame",
    emoji: "🖼️",
    price: "₹299+",
    description: "Stylish photo frame for your cricket memories",
    tag: "New",
    affiliateUrl: "https://amzn.in/d/0ca8lBN8",
  },
];

const MUGS: Product[] = [
  {
    id: "m1",
    name: "Cricket Mug",
    emoji: "☕",
    price: "₹349+",
    description: "Cricket-themed ceramic mug, perfect for match days",
    tag: "Popular",
    affiliateUrl: "https://www.amazon.in/s?k=cricket+mug+cup",
  },
];

function ProductGrid({
  products,
  startIndex,
}: { products: Product[]; startIndex: number }) {
  function openAffiliate(url: string) {
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      {products.map((product, i) => (
        <motion.div
          key={product.id}
          data-ocid={`shop.product.item.${startIndex + i + 1}`}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.06 }}
        >
          <Card
            className="card-gradient border-border overflow-hidden h-full flex flex-col cursor-pointer hover:border-primary/50 hover:shadow-md transition-all active:scale-95"
            onClick={() => openAffiliate(product.affiliateUrl)}
          >
            <CardContent className="p-4 flex flex-col flex-1">
              {product.tag && (
                <Badge className="self-start mb-2 bg-primary/20 text-primary border-primary/30 text-[10px]">
                  {product.tag}
                </Badge>
              )}
              <div className="bg-primary/5 rounded-full p-3 flex items-center justify-center mb-3 self-start">
                <span className="text-5xl">{product.emoji}</span>
              </div>
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
                data-ocid={`shop.product.button.${startIndex + i + 1}`}
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
  );
}

export default function ShopPage() {
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

      <main className="px-4 py-4 space-y-6">
        <section>
          <h2 className="font-bold text-base text-foreground mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary inline-block" />
            Jerseys
          </h2>
          <ProductGrid products={JERSEYS} startIndex={0} />
        </section>

        <section>
          <h2 className="font-bold text-base text-foreground mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary inline-block" />
            Frames
          </h2>
          <ProductGrid products={FRAMES} startIndex={JERSEYS.length} />
        </section>

        <section>
          <h2 className="font-bold text-base text-foreground mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary inline-block" />
            Mugs
          </h2>
          <ProductGrid
            products={MUGS}
            startIndex={JERSEYS.length + FRAMES.length}
          />
        </section>

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
