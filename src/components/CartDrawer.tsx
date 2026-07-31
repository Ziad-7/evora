import { X, Plus, Minus, Trash2, MessageCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext"; // Ensure this matches your file path
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

const CartDrawer = () => {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalPrice,
    totalItems,
  } = useCart();
  const { t } = useLanguage();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsCartOpen(false);
    };
    if (isCartOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCartOpen, setIsCartOpen]);

  const sendWhatsApp = () => {
    if (items.length === 0) return;

    // === 👇 ENTER YOUR PHONE NUMBER HERE 👇 ===
    // Format: CountryCode + Number (No symbols, no +)
    // Example for Egypt: "2010xxxxxxxxx"
    const phoneNumber = "201098708156"; 
    // ==========================================

    const message = items
      .map((item) => {
        let variantStr = "";
        const variants = [];
        if (item.selectedSize) variants.push(`Size: ${item.selectedSize}`);
        if (item.selectedColor) {
          const colorName = item.product.colorNames?.[item.selectedColor] || item.selectedColor;
          variants.push(`Color: ${colorName}`);
        }
        if (variants.length > 0) {
          variantStr = ` (${variants.join(", ")})`;
        }
        return `– ${item.quantity}x ${t(item.product.nameKey)}${variantStr}`;
      })
      .join("\n");
      
    const text = encodeURIComponent(
      `Hello, I'd like to order:\n${message}\n\nTotal: $${totalPrice.toFixed(2)}\nThank you!`
    );

    // Added ${phoneNumber} to the URL
    window.open(`https://wa.me/${phoneNumber}?text=${text}`, "_blank");
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-background/60 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-card border-l border-border z-50 flex flex-col"
          >
            <div className="flex items-center justify-between p-5 border-b border-border">
              <h2 className="font-display text-xl font-semibold text-foreground">
                {t("cart.title")} ({totalItems})
              </h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X size={22} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {items.length === 0 ? (
                <p className="text-center text-muted-foreground py-12">
                  {t("cart.empty")}
                </p>
              ) : (
                items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 bg-secondary rounded-lg p-3"
                  >
                    <img
                      src={item.product.image}
                      alt={t(item.product.nameKey)}
                      className="w-20 h-20 rounded-md object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-display text-sm font-semibold text-foreground truncate">
                        {t(item.product.nameKey)}
                      </h4>
                      {(item.selectedSize || item.selectedColor) && (
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                          {item.selectedSize && item.selectedColor && <span className="mx-1">•</span>}
                          {item.selectedColor && <span>Color: {item.product.colorNames?.[item.selectedColor] || item.selectedColor}</span>}
                        </p>
                      )}
                      <p className="text-sm text-primary font-semibold mt-1">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="w-7 h-7 rounded bg-muted flex items-center justify-center text-foreground hover:bg-border transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="text-sm font-medium text-foreground w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="w-7 h-7 rounded bg-muted flex items-center justify-center text-foreground hover:bg-border transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="ml-auto text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-5 border-t border-border space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">{t("cart.total")}</span>
                  <span className="text-2xl font-display font-bold text-foreground">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
                <button
                  onClick={sendWhatsApp}
                  className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white font-semibold py-3.5 rounded-lg hover:opacity-90 transition-opacity text-sm"
                >
                  <MessageCircle size={18} />
                  {t("cart.whatsapp")}
                </button>
                <button
                  onClick={clearCart}
                  className="w-full text-sm text-muted-foreground hover:text-destructive transition-colors py-2"
                >
                  {t("cart.clear")}
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;