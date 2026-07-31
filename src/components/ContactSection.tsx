import { motion } from "framer-motion";
import { type LucideIcon, MapPin, Phone } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { getAssetSrc } from "@/lib/assetPath";

type ContactItem = {
  icon?: LucideIcon;
  iconSrc?: string;
  labelKey: string;
  value: string;
  link?: string;
};

const ContactSection = () => {
  const { t } = useLanguage();
  const whatsappIcon = getAssetSrc("whatsapp-icon.png");

  const contactItems: ContactItem[] = [
    { iconSrc: whatsappIcon, labelKey: "contact.whatsapp", value: "+20 10 50125489" },
    { icon: Phone, labelKey: "contact.phone", value: "+20 10 50125489" },
    { icon: MapPin, labelKey: "contact.location", value: "industrial zone, 10th of Ramadan City 1", link: "https://maps.app.goo.gl/hqeFSNpzbCKBi1qe7?g_st=iw" },
  ];

  return (
    <section id="contact" className="py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
            {t("contact.title1")} <span className="text-gradient-copper">{t("contact.title2")}</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            {t("contact.description")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
          {contactItems.map((item, i) => (
            <motion.div
              key={item.labelKey}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-6 rounded-xl bg-card border border-border"
            >
              {item.iconSrc ? (
                <img src={item.iconSrc} alt="WhatsApp" className="mx-auto mb-3 h-6 w-6 object-contain" />
              ) : (
                item.icon && <item.icon className="mx-auto text-primary mb-3" size={24} />
              )}
              <p className="text-sm text-muted-foreground mb-1">{t(item.labelKey)}</p>
              {item.link ? (
                <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-foreground font-medium text-sm hover:text-primary transition-colors hover:underline">
                  {item.value}
                </a>
              ) : (
                <p className="text-foreground font-medium text-sm">{item.value}</p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
