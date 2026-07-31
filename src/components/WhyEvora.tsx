import { motion } from "framer-motion";
import { ShieldCheck, Layers, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const WhyEvora = () => {
  const { t } = useLanguage();

  const features = [
    { icon: ShieldCheck, titleKey: "about.feature1.title", descKey: "about.feature1.desc" },
    { icon: Layers, titleKey: "about.feature2.title", descKey: "about.feature2.desc" },
    { icon: Sparkles, titleKey: "about.feature3.title", descKey: "about.feature3.desc" },
  ];

  return (
    <section id="about" className="py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
            {t("about.title1")} <span className="text-gradient-copper">{t("about.title2")}</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            {t("about.description")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {features.map((feature, i) => (
            <motion.div
              key={feature.titleKey}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="text-center p-8 rounded-xl bg-card border border-border"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                <feature.icon className="text-primary" size={26} />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                {t(feature.titleKey)}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t(feature.descKey)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyEvora;
