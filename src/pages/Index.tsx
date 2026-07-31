import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProductsSection from "@/components/ProductsSection";
import SingleProductRow from "@/components/SingleProductRow";
import WhyEvora from "@/components/WhyEvora";
import WhoEvora from "@/components/WhoEvora";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <CartDrawer />
      <main className="flex-grow">
        <HeroSection />

        <WhoEvora />
        <WhyEvora />
        
        {/* Product Collections */}
        <ProductsSection />
        
        {/* Singular Items */}
        <SingleProductRow />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;