import { Fragment, useState, useEffect } from "react";
import { X, ShoppingCart, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { toast } from "sonner";
import { getColorSwatchStyle } from "@/lib/colorSwatchStyle";
import { getProductColorImageSrc } from "@/lib/productImagePath";

interface ProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

const ProductModal = ({ product, isOpen, onClose }: ProductModalProps) => {
  const { addToCart } = useCart();
  const { t } = useLanguage();
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  // Default to first size if sizes exist
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || "");
  const [currentImage, setCurrentImage] = useState(product.image);

  useEffect(() => {
    if (!isOpen) return;
    const first = product.colors[0];
    setSelectedColor(first);
    setSelectedSize(product.sizes?.[0] ?? "");
    const slug = product.colorNames?.[first];
    setCurrentImage(slug ? getProductColorImageSrc(product.id, slug) : product.image);
  }, [isOpen, product.id]);

  useEffect(() => {
    if (!isOpen) return;

    const { body } = document;
    const previousOverflow = body.style.overflow;
    const previousPaddingRight = body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPaddingRight;
    };
  }, [isOpen]);

  const handleSelectColor = (color: string) => {
    setSelectedColor(color);
    const slug = product.colorNames?.[color];
    if (slug) {
      setCurrentImage(getProductColorImageSrc(product.id, slug));
    } else {
      setCurrentImage(product.image);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, selectedColor, selectedSize);
    toast.success(`${t(product.nameKey)} ${t("cart.added")}`);
    onClose();
  };

  const descriptionText = t(product.descKey);
  const detailsText = t(product.detailsKey);
  const hasDistinctDetails = detailsText !== product.detailsKey && detailsText !== descriptionText;

  const renderFormattedText = (value: string) => {
    return value.split("\n").map((line, index) => {
      const match = line.match(/^BOLD\((.*)\)(.*)$/);
      if (match) {
        const boldPart = match[1];
        const rest = match[2];
        return (
          <Fragment key={`${line}-${index}`}>
            <strong>{boldPart}</strong>
            {rest}
            {index < value.split("\n").length - 1 && <br />}
          </Fragment>
        );
      }

      return (
        <Fragment key={`${line}-${index}`}>
          {line}
          {index < value.split("\n").length - 1 && <br />}
        </Fragment>
      );
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-background w-full max-w-4xl rounded-xl shadow-2xl overflow-hidden grid md:grid-cols-2 h-[90vh] md:h-[600px] min-h-0"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
            >
              <X size={20} className="text-foreground" />
            </button>

            {/* Left Side: Image (cross-fade on color change) */}
            <div className="h-64 md:h-full bg-stone-100 relative p-4 overflow-hidden">
              <AnimatePresence initial={false} mode="sync">
                <motion.img
                  key={currentImage}
                  src={currentImage}
                  alt={t(product.nameKey)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="absolute inset-4 w-[calc(100%-2rem)] h-[calc(100%-2rem)] object-contain"
                  onError={(e) => {
                    e.currentTarget.src = product.image;
                  }}
                />
              </AnimatePresence>
            </div>

            {/* Right Side: Details */}
            <div
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
              className="p-6 md:p-8 flex flex-col h-full min-h-0 overflow-y-auto overscroll-contain"
            >
              <span className="text-sm font-semibold text-primary mb-2">
                {product.category}
              </span>
              <h2 className="font-display text-3xl font-bold mb-4">
                {t(product.nameKey)}
              </h2>
              
              <div className="text-2xl font-semibold text-foreground mb-6">
                ${product.price.toFixed(2)}
              </div>

              <div className="prose prose-sm text-muted-foreground mb-6">
                <p>{renderFormattedText(descriptionText)}</p>
                {hasDistinctDetails && (
                  <p className="mt-4 opacity-80">{renderFormattedText(detailsText)}</p>
                )}
              </div>

              <div className="flex flex-col gap-6 mb-8">
                {/* Color Selection */}
                <div>
                  <h3 className="text-sm font-medium mb-3">Select Color</h3>
                  <div className="flex gap-3">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => handleSelectColor(color)}
                        className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${
                          selectedColor === color
                            ? "border-primary scale-110"
                            : "border-transparent hover:scale-105"
                        }`}
                        style={getColorSwatchStyle(color)}
                      >
                        {selectedColor === color && (
                          <Check size={14} className="text-white drop-shadow-md" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size Selection (Only shows if product has sizes) */}
                {product.sizes && product.sizes.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium mb-3">Select Size</h3>
                    <div className="flex gap-2 flex-wrap">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-4 py-2 border rounded-md text-sm font-medium transition-colors ${
                            selectedSize === size
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-border hover:border-primary/50 text-foreground"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-auto">
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-gradient-copper text-primary-foreground font-semibold py-3.5 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={20} />
                  Add to Cart
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProductModal;