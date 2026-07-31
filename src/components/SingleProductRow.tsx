import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { products, Product } from "@/data/products";
import { useLanguage } from "@/context/LanguageContext";
import ProductModal from "./ProductModal";
import { getColorSwatchStyle } from "@/lib/colorSwatchStyle";

const SingleProductRow = () => {
  const { t } = useLanguage();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Strictly exclude Sets; row is only for singles (Pots, Pans, etc.)
  const singles = products.filter((product) => product.category !== "Sets");

  const scrollByAmount = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = direction === "left" ? -360 : 360;
    scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="relative">
          {/* Horizontal Scroll Container */}
          <div
            ref={scrollRef}
            className="flex overflow-x-auto gap-8 pb-6 snap-x snap-mandatory hide-scrollbar scroll-smooth md:px-12"
          >
            {singles.map((product) => (
              <div
                key={product.id}
                className="min-w-[260px] md:min-w-[300px] snap-center group flex flex-col items-center text-center bg-gray rounded-2xl p-4 md:p-5"
              >
                {/* Image Area */}
                <div
                  onClick={() => setSelectedProduct(product)}
                  className="relative w-full aspect-[4/3] mb-5 overflow-hidden flex items-center justify-center p-4 rounded-xl cursor-pointer"
                >
                  <img
                    src={product.image}
                    alt={t(product.nameKey)}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />

                  <div className="absolute inset-0 bg-background/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProduct(product);
                      }}
                      className="flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity text-sm"
                    >
                      <Eye size={16} />
                      {t("products.details")}
                    </button>
                  </div>
                </div>

                {/* Text & Price */}
                <h3 className="font-display text-xs md:text-sm font-semibold text-zinc-100 uppercase tracking-[0.15em] mb-2">
                  {t(product.nameKey)}
                </h3>
                <p className="text-sm text-zinc-300 mb-4">
                  ${product.price.toFixed(2)}
                </p>

                {/* Color Dots (Visual only, exact selection happens in modal) */}
                <div className="flex gap-1.5 justify-center">
                  {product.colors.map((color) => (
                    <div
                      key={color}
                      className="w-4 h-4 rounded-sm border border-zinc-700 shadow-sm"
                      style={getColorSwatchStyle(color)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => scrollByAmount("left")}
            aria-label={t("common.previous")}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full border border-border bg-card/90 text-foreground shadow-sm hover:bg-card transition-colors"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            type="button"
            onClick={() => scrollByAmount("right")}
            aria-label={t("common.next")}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full border border-border bg-card/90 text-foreground shadow-sm hover:bg-card transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Reused Product Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </section>
  );
};

export default SingleProductRow;