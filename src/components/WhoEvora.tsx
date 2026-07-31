import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const WhoEvora = () => {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden pt-28 pb-24 bg-[#050505]">
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -right-40 h-[600px] w-[600px] rounded-full bg-orange-500/10 blur-[180px]"
        animate={{ x: [0, -30, 0], y: [0, 20, 0], scale: [1, 1.04, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-36 -left-32 h-[500px] w-[500px] rounded-full bg-purple-900/10 blur-[150px]"
        animate={{ x: [0, 24, 0], y: [0, -18, 0], scale: [1, 1.03, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 left-1/2 h-[380px] w-[380px] -translate-x-1/2 rounded-full bg-orange-700/5 blur-[140px]"
        animate={{ y: [0, -16, 0], scale: [1, 1.02, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="max-w-5xl mx-auto text-center"
        >
          <h2
            className="text-6xl md:text-7xl font-bold text-foreground mb-10"
            style={{
              fontFamily: "'Playfair Display', 'Times New Roman', serif",
              textShadow: "0 0 28px rgba(199, 139, 85, 0.22)",
            }}
          >
            {t("who.title1")} <span className="text-gradient-copper">{t("who.title2")}</span>
          </h2>

          <div className="h-px w-full max-w-2xl mx-auto bg-gradient-to-r from-transparent via-[#c78b55]/70 to-transparent mb-8" />

          <p className="max-w-2xl mx-auto text-muted-foreground text-lg leading-relaxed md:leading-loose">
            {t("who.description")}
          </p>

          <div className="h-px w-full max-w-2xl mx-auto bg-gradient-to-r from-transparent via-[#c78b55]/70 to-transparent mt-10" />
        </motion.div>
      </div>
    </section>
  );
};

export default WhoEvora;
