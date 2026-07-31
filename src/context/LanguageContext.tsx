import { createContext, useContext, useState, ReactNode } from "react";

type Lang = "en" | "ar";

interface LanguageContextType {
  lang: Lang;
  toggleLang: () => void;
  t: (key: string) => string;
  dir: "ltr" | "rtl";
}

const translations: Record<string, Record<Lang, string>> = {
  // Nav
  "nav.home": { en: "Home", ar: "الرئيسية" },
  "nav.about": { en: "About", ar: "من نحن" },
  "nav.products": { en: "Products", ar: "المنتجات" },
  "nav.contact": { en: "Contact", ar: "اتصل بنا" },

  // Hero
  "hero.subtitle": { en: "Crafted for the Modern Kitchen", ar: "صُنعت للمطبخ العصري" },
  "hero.title1": { en: "Cook with", ar: "اطبخ بـ" },
  "hero.title2": { en: "Elegance", ar: "أناقة" },
  "hero.description": {
    en: "Premium copper cookware that combines timeless craftsmanship with modern performance.",
    ar: "أواني طهي نحاسية فاخرة تجمع بين الحرفية الخالدة والأداء العصري.",
  },
  "hero.cta": { en: "Shop Collection", ar: "تسوق المجموعة" },

  // About
  "about.title1": { en: "Why", ar: "لماذا" },
  "about.title2": { en: "Evora?", ar: "إيفورا؟" },
  "about.description": {
    en: "Every piece is hand-finished with care, bringing professional-grade quality to your home kitchen.",
    ar: "كل قطعة مصنوعة يدوياً بعناية، لتجلب جودة احترافية إلى مطبخك.",
  },
  "about.feature1.title": { en: "Die-Cast Strength", ar: "قوة الألومنيوم المصبوب" },
  "about.feature1.desc": {
    en: "Engineered from premium 7-layer die-cast aluminum for perfect heat distribution without warping or hot spots.",
    ar: "مصنع من ٧ طبقات من الألومنيوم المصبوب الفاخر لتوزيع الحرارة بشكل مثالي ومنع الالتواء أو البقع الساخنة.",
  },
  "about.feature2.title": { en: "7-Layer Precision Build", ar: "بنية دقيقة من ٧ طبقات" },
  "about.feature2.desc": {
    en: "A complex multi-layer construction that ensures rapid heat-up and perfectly even cooking across the entire surface—eliminating hot spots that burn your food.",
    ar: "هيكل معقد متعدد الطبقات يضمن تسخيناً سريعاً وطهياً متساوياً تماماً على السطح بالكامل، مما يقضي على البقع الساخنة التي تتسبب في حرق الطعام.",
  },
  "about.feature3.title": { en: "Modern Ergonomics", ar: "تصميم عصري مريح" },
  "about.feature3.desc": {
    en: "Soft-touch Bakelite handles and diamond-cut exteriors combine professional-grade performance with elegant kitchen aesthetics.",
    ar: "مقابض باكليت ناعمة الملمس وتصميم خارجي ماسي يجمع بين الأداء الاحترافي والمظهر العصري الأنيق.",
  },
  "who.title1": { en: "Who is", ar: "من هي" },
  "who.title2": { en: "Evora?", ar: "إيفورا؟" },
  "who.description": {
    en: "Evora is a premium cookware brand dedicated to bringing professional-grade technology into the heart of your home. We blend Italian-inspired design with advanced die-cast engineering to create kitchenware that is as beautiful as it is unbreakable.",
    ar: "إيفورا هي علامة تجارية رائدة في أدوات الطهي، مكرسة لتقديم التكنولوجيا الاحترافية إلى قلب منزلك. نحن نمزج بين التصميم المستوحى من الطراز الإيطالي والهندسة المتطورة لنقدم لكِ أدوات طهي بجمال فائق وجودة لا تُقهر.",
  },

  // Products
  "products.title1": { en: "Our", ar: "مجموعتنا" },
  "products.title2": { en: "Collection", ar: "المميزة" },
  "products.description": {
    en: "Handpicked pieces for every culinary need — from quick sautés to slow simmers.",
    ar: "قطع مختارة بعناية لكل حاجة طهي — من القلي السريع إلى الطهي البطيء.",
  },
  "products.add": { en: "Add", ar: "أضف" },
  "products.details": { en: "Details", ar: "التفاصيل" },

  // Product names & descriptions
  "product.rose.name": { en: "Rose Cookware Set", ar: "طقم أواني روز" },
  "product.rose.desc": {
    en: "BOLD(Components:)\n- 4x Casserole Pot (18cm, 20cm, 24cm, 28cm)\n- 1x Milk Pot (16cm)\n- 1x Grill Pan (28cm)\n- 1x Frying Pan (20cm, 24cm, 28cm)\n- 1x Fork & Spoon\n- 1x Silicone Handle Sleeves\nBOLD(Material:) Die-Cast aluminum\nBOLD(Coating:) inside 2 layers KAPLON CLASSIC® TOP COAT coating inside and outside, Easy to clean inside and outside.\nBOLD(Konbs and Handles:) Bakelite lSoft touch with Plastic effect",
    ar: "BOLD(:المكونات)\n- ٤ حلة كاسيرول (١٨ سم، ٢٠ سم، ٢٤ سم، ٢٨ سم)\n- ١ لبانة (١٦ سم)\n- ١ مقلاة جريل (٢٨ سم)\n- ١ طاسة قلي (٢٠ سم، ٢٤ سم، ٢٨ سم)\n-  ١ شوكة وملعقة\n- ١ ماسكات سيليكون للمقابض\nBOLD(الخامة:) ألومنيوم مصبوب داي كاست\nBOLD(الطلاء:) طبقتين من كابلون كلاسيك® في الداخل والخارج، سهلة التنظيف من الداخل والخارج.\nBOLD(المقابض والأزرار:) باكليت ناعم الملمس بتصميم بلاستيكي"
  },
  "product.lara.name": { en: "Lara Collection", ar: "مجموعة لارا" },
  "product.lara.desc": {
    en: "BOLD(Components:)\n- 4x Casserole Pot (18cm, 20cm, 24cm, 28cm)\n- 1x Milk Pot (16cm)\n- 1x Grill Pan (28cm)\n- 1x Frying Pan (20cm, 24cm, 28cm)\n- 1x Fork & Spoon\n- 1x Silicone Handle Sleeves\nBOLD(Material:) Die-Cast aluminum\nBOLD(Coating:) inside 2 layers KAPLON CLASSIC® TOP COAT coating inside and outside, Easy to clean inside and outside.\nBOLD(Konbs and Handles:) Bakelite lSoft touch with Plastic effect",
    ar: "BOLD(:المكونات)\n- ٤ حلة كاسيرول (١٨ سم، ٢٠ سم، ٢٤ سم، ٢٨ سم)\n- ١ لبانة (١٦ سم)\n- ١ مقلاة جريل (٢٨ سم)\n- ١ طاسة قلي (٢٠ سم، ٢٤ سم، ٢٨ سم)\n-  ١ شوكة وملعقة\n- ١ ماسكات سيليكون للمقابض\nBOLD(الخامة:) ألومنيوم مصبوب داي كاست\nBOLD(الطلاء:) طبقتين من كابلون كلاسيك® في الداخل والخارج، سهلة التنظيف من الداخل والخارج.\nBOLD(المقابض والأزرار:) باكليت ناعم الملمس بتصميم بلاستيكي"
  },
  "product.pan-set.name": { en: "Frying Pan Set", ar: "مجموعة مقلاة" },
  "product.pan-set.desc": {
    en: "BOLD(Components:)\n- 4x Frying Pan (20cm, 24cm, 28cm)\nBOLD(Material:) Die-Cast aluminum\nBOLD(Coating:) inside 2 layers KAPLON CLASSIC® TOP COAT coating inside and outside, Easy to clean inside and outside.\nBOLD(Konbs and Handles:) Bakelite lSoft touch with Plastic effect",
    ar: "BOLD(:المكونات)\n- ٤ طاسة قلي (٢٠ سم، ٢٤ سم، ٢٨ سم)\nBOLD(الخامة:) ألومنيوم مصبوب داي كاست\nBOLD(الطلاء:) طبقتين من كابلون كلاسيك® في الداخل والخارج، سهلة التنظيف من الداخل والخارج.\nBOLD(المقابض والأزرار:) باكليت ناعم الملمس بتصميم بلاستيكي"
  },
  "product.asil.name": { en: "Asil Premium Set", ar: "طقم أسيل الفاخر" },
  "product.asil.desc": {
    en: "BOLD(Components:)\n- 4x Casserole Pot (18cm, 20cm, 24cm, 28cm)\n- 1x Milk Pot (16cm)\n- 1x Grill Pan (28cm)\n- 1x Frying Pan (20cm, 24cm, 28cm)\n- 1x Fork & Spoon\n- 1x Silicone Handle Sleeves\nBOLD(Material:) Die-Cast aluminum\nBOLD(Coating:) inside 2 layers KAPLON CLASSIC® TOP COAT coating inside and outside, Easy to clean inside and outside.\nBOLD(Konbs and Handles:) Bakelite lSoft touch with Plastic effect",
    ar: "BOLD(:المكونات)\n- ٤ حلة كاسيرول (١٨ سم، ٢٠ سم، ٢٤ سم، ٢٨ سم)\n- ١ لبانة (١٦ سم)\n- ١ مقلاة جريل (٢٨ سم)\n- ١ طاسة قلي (٢٠ سم، ٢٤ سم، ٢٨ سم)\n-  ١ شوكة وملعقة\n- ١ ماسكات سيليكون للمقابض\nBOLD(الخامة:) ألومنيوم مصبوب داي كاست\nBOLD(الطلاء:) طبقتين من كابلون كلاسيك® في الداخل والخارج، سهلة التنظيف من الداخل والخارج.\nBOLD(المقابض والأزرار:) باكليت ناعم الملمس بتصميم بلاستيكي"
  },
  "product.pot-set.name": { en: "Milk Pot Set", ar: "طقم لبانة" },
  "product.pot-set.desc": {
    en: "BOLD(Components:)\n- 4x Milk Pot (16cm)\nBOLD(Material:) Die-Cast aluminum\nBOLD(Coating:) inside 2 layers KAPLON CLASSIC® TOP COAT coating inside and outside, Easy to clean inside and outside.\nBOLD(Konbs and Handles:) Bakelite lSoft touch with Plastic effect",
    ar: "BOLD(:المكونات)\n- ٤ لبانة (١٦ سم)\nBOLD(الخامة:) ألومنيوم مصبوب داي كاست\nBOLD(الطلاء:) طبقتين من كابلون كلاسيك® في الداخل والخارج، سهلة التنظيف من الداخل والخارج.\nBOLD(المقابض والأزرار:) باكليت ناعم الملمس بتصميم بلاستيكي"
  },
  "product.pot.name": { en: "Casserole Pot", ar: "حلة" },
  "product.pot.desc": {
    en: "BOLD(Material:) Die-Cast aluminum\nBOLD(Coating:) inside 2 layers KAPLON CLASSIC® TOP COAT coating inside and outside, Easy to clean inside and outside.\nBOLD(Thickness:) from 3-10 mm\nBOLD(Konbs and Handles:) Bakelite lSoft touch with plastic effect",
    ar: "BOLD(الخامة:) ألومنيوم مصبوب داي كاست\nBOLD(الطلاء:) طبقتين من كابلون كلاسيك® في الداخل والخارج، سهلة التنظيف من الداخل والخارج.\nBOLD(السُمك:) من ٣ إلى ١٠ ملم\nBOLD(المقابض والأزرار:) باكليت ناعم الملمس بتصميم بلاستيكي"
  },
  "product.milk-pot.name": { en: "Milk Pot", ar: "لبانة" },
  "product.milk-pot.desc": {
    en: "BOLD(Material:) Die-Cast aluminum\nBOLD(Coating:) inside 2 layers KAPLON CLASSIC® TOP COAT coating inside and outside, Easy to clean inside and outside.\nBOLD(Thickness:) from 3-10 mm\nBOLD(Konbs and Handles:) Bakelite lSoft touch with plastic effect",
    ar: "BOLD(الخامة:) ألومنيوم مصبوب داي كاست\nBOLD(الطلاء:) طبقتين من كابلون كلاسيك® في الداخل والخارج، سهلة التنظيف من الداخل والخارج.\nBOLD(السُمك:) من ١.٥ إلى ٥ ملم\nBOLD(المقابض والأزرار:) باكليت ناعم الملمس بتصميم بلاستيكي"
  },
  "product.grill-pan.name": { en: "Grill Pan", ar: "مقلاة جريل" },
  "product.grill-pan.desc": {
    en: "BOLD(Material:) Die-Cast aluminum\nBOLD(Coating:) inside 2 layers KAPLON CLASSIC® TOP COAT coating inside and outside, Easy to clean inside and outside.\nBOLD(Thickness:) from 3-10 mm\nBOLD(Konbs and Handles:) Bakelite lSoft touch with plastic effect",
    ar: "BOLD(الخامة:) ألومنيوم مصبوب داي كاست\nBOLD(الطلاء:) طبقتين من كابلون كلاسيك® في الداخل والخارج، سهلة التنظيف من الداخل والخارج.\nBOLD(السُمك:) من ١.٥ إلى ٥ ملم\nBOLD(المقابض والأزرار:) باكليت ناعم الملمس بتصميم بلاستيكي"
  },
  "product.pan.name": { en: "Frying Pan", ar: "طاسة قلي" },
  "product.pan.desc": {
    en: "BOLD(Material:) Die-Cast aluminum\nBOLD(Coating:) inside 2 layers KAPLON CLASSIC® TOP COAT coating inside and outside, Easy to clean inside and outside.\nBOLD(Thickness:) from 3-10 mm\nBOLD(Konbs and Handles:) Bakelite lSoft touch with wooden effect",
    ar: "BOLD(الخامة:) ألومنيوم مصبوب داي كاست\nBOLD(الطلاء:) طبقتين من كابلون كلاسيك® في الداخل والخارج، سهلة التنظيف من الداخل والخارج.\nBOLD(السُمك:) من ١.٥ إلى ٥ ملم\nBOLD(المقابض والأزرار:) باكليت ناعم الملمس بتصميم خشبي"
  },
  "product.fork&spoon.name": { en: "Fork & Spoon", ar: "شوكة وملعقة" },
  "product.fork&spoon.desc": {
    en: "BOLD(Material:) High-quality, heat-resistant food-grade plastic.\nBOLD(Features:) Ergonomic long handles with vibrant colors to brighten your kitchen. Ideal for non-stick cookware to prevent scratching.",
    ar: "BOLD(الخامة:) بلاستيك عالي الجودة آمن على الطعام ومقاوم للحرارة.\nBOLD(المميزات:) مقابض طويلة مريحة بألوان زاهية لتزيين مطبخك. مثالي للأواني غير اللاصقة لحمايتها من الخدش."
  },
  "product.handles.name": { en: "Silicone Handle Sleeves", ar: "ماسكات سيليكون للمقابض"},
  "product.handles.desc": {
    en: "BOLD(Material:) Premium flexible silicone.\nBOLD(Features:) Heat-resistant up to 250°C. Slip-resistant textured surface for a secure grip. Fits most pot and pan handles for safe, burn-free cooking.",
    ar: "BOLD(الخامة:) سيليكون مرن عالي الجودة.\nBOLD(المميزات:) مقاوم للحرارة حتى ٢٥٠ درجة مئوية. سطح محبب مانع للانزلاق لقبضة آمنة. يناسب معظم مقابض الحلل والمقالي لطهي آمن وبدون حروق.",
  },

  // Contact
  "contact.title1": { en: "Get in", ar: "تواصل" },
  "contact.title2": { en: "Touch", ar: "معنا" },
  "contact.description": {
    en: "Questions about our cookware? We'd love to hear from you.",
    ar: "أسئلة حول أواني الطهي لدينا؟ يسعدنا سماعك.",
  },
  "contact.whatsapp": { en: "WhatsApp", ar: "واتساب" },
  "contact.phone": { en: "Phone", ar: "الهاتف" },
  "contact.location": { en: "Location", ar: "الموقع" },

  // Footer
  "footer.tagline": {
    en: "Premium copper cookware for the modern home.",
    ar: "أواني طهي نحاسية فاخرة للمنزل العصري.",
  },
  "footer.rights": {
    en: "© 2026 CopperLux. All rights reserved.",
    ar: "© 2026 CopperLux. جميع الحقوق محفوظة.",
  },

  // Cart
  "cart.title": { en: "Your Cart", ar: "سلتك" },
  "cart.empty": { en: "Your cart is empty", ar: "سلتك فارغة" },
  "cart.total": { en: "Total", ar: "المجموع" },
  "cart.whatsapp": { en: "Send Order via WhatsApp", ar: "إرسال الطلب عبر واتساب" },
  "cart.clear": { en: "Clear Cart", ar: "إفراغ السلة" },
  "cart.added": { en: "added to cart", ar: "أُضيف إلى السلة" },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>("en");

  const toggleLang = () => setLang((prev) => (prev === "en" ? "ar" : "en"));

  const t = (key: string) => translations[key]?.[lang] ?? key;

  const dir = lang === "ar" ? "rtl" : "ltr";

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within a LanguageProvider");
  return context;
};
