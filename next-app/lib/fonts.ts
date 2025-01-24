import { Roboto, Noto_Sans_JP, Noto_Sans_Symbols_2 } from "next/font/google";

export const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
  display: "swap",
  // cSpell:disable
  fallback: [
    "Hiragino Kaku Gothic ProN",
    "Hiragino Sans",
    "Meiryo",
    "sans-serif",
  ],
  // cSpell:enable
});

export const notoSansJp = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-noto-sans-jp",
  display: "swap",
  // cSpell:disable
  fallback: [
    "Hiragino Kaku Gothic ProN",
    "Hiragino Sans",
    "Meiryo",
    "sans-serif",
  ],
  // cSpell:enable
});

export const notoSymbol = Noto_Sans_Symbols_2({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-noto-sans-symbol",
  display: "swap",
  // cSpell:disable
  fallback: [
    "Hiragino Kaku Gothic ProN",
    "Hiragino Sans",
    "Meiryo",
    "sans-serif",
  ],
  // cSpell:enable
});
