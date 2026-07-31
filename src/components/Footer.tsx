import { Instagram, Facebook, Twitter } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { getAssetSrc } from "@/lib/assetPath";

const Footer = () => {
  const { t } = useLanguage();
  const logoSrc = getAssetSrc("Logo.jpg");

  return (
    <footer className="bg-background border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <img src={logoSrc} alt="CopperLux" className="h-8 w-auto object-contain mb-2" />
            <p className="text-sm text-muted-foreground mt-1">
              {t("footer.tagline")}
            </p>
          </div>

          <div className="flex items-center gap-4">
            {[
              { Icon: Instagram, href: "https://www.instagram.com/evoracookware?igsh=YmhjNHo2Y21ka2c0", label: "Instagram" },
              { Icon: Facebook, href: "https://www.facebook.com/share/1EwjMr9MB4/?mibextid=wwXIfr", label: "Facebook" }
            ].map(({ Icon, href, label }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                aria-label={label}
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">
            {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
