import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Eye } from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { toast } from "sonner";
import ProductModal from "./ProductModal"; // Import the modal

interface ProductCardProps {
  product: Product;
  index: number;
}

const ProductCard = ({ product, index }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { t } = useLanguage();
  const [showModal, setShowModal] = useState(false); // State to control modal

  const hasOptions = product.colors.length > 1 || (product.sizes && product.sizes.length > 0);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasOptions) {
      setShowModal(true);
    } else {
      addToCart(product, product.colors[0], product.sizes?.[0]);
      toast.success(`${t(product.nameKey)} ${t("cart.added")}`);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        className="group bg-card border border-border rounded-xl overflow-hidden hover:border-primary/40 transition-colors"
      >
        {/* Image Area */}
        <div className="relative aspect-[1200/680] overflow-hidden bg-muted">
          <img
            src={product.image}
            alt={t(product.nameKey)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <span className="absolute top-3 left-3 text-xs font-medium bg-primary/90 text-primary-foreground px-3 py-1 rounded-full">
            {product.category}
          </span>

          {/* Details button (Now opens modal) */}
          <div className="absolute inset-0 bg-background/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <button 
              onClick={() => setShowModal(true)} // Open modal on click
              className="flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity text-sm"
            >
              <Eye size={16} />
              {t("products.details")}
            </button>
          </div>
        </div>

        {/* Info Area */}
        <div className="p-5">
          <h3 className="font-display text-lg font-semibold text-foreground mb-1">
            {t(product.nameKey)}
          </h3>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {t(product.descKey)}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-xl font-semibold text-primary">
              ${product.price.toFixed(2)}
            </span>
            <button
              onClick={handleAdd}
              className="flex items-center gap-2 bg-gradient-copper text-primary-foreground text-sm font-semibold px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
            >
              <ShoppingCart size={16} />
              {hasOptions ? "Select Options" : t("products.add")}
            </button>
          </div>
        </div>
      </motion.div>

      {/* The Modal Component */}
      <ProductModal 
        product={product} 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
      />
    </>
  );
};

export default ProductCard;