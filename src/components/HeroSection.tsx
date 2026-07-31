import { motion } from "framer-motion";
import heroImage from "@/assets/hero-cookware-NEW.png";
import { useLanguage } from "@/context/LanguageContext";

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <img
        src={heroImage}
        alt="Premium copper cookware collection"
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
      />
      <div className="absolute inset-0 bg-gradient-hero" />

      {/* Text Container
         Added 'transform translate-y-32' to force it down.
         You can change '32' to '48' if you want it even lower, 
         or '16' if this is too low.
      */}
      <div className="relative z-10 container mx-auto px-4 text-center transform translate-y-16">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-5xl md:text-7xl font-display font-bold text-foreground mb-6 leading-tight"
        >
          {t("hero.title1")}{" "}
          <span className="text-gradient-copper">{t("hero.title2")}</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-10 font-body"
        >
          {t("hero.description")}
        </motion.p>
        <motion.a
          href="#products"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="inline-block bg-gradient-copper text-primary-foreground font-semibold px-8 py-3.5 rounded-lg hover:opacity-90 transition-opacity text-sm tracking-wide"
        >
          {t("hero.cta")}
        </motion.a>
      </div>
    </section>
  );
};

export default HeroSection;