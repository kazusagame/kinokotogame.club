import "./globals.css";
import { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import { GoogleAnalytics } from "@next/third-parties/google";

import { GA_ID } from "@/lib/gtag";
import { notoSansJp, notoSymbol } from "@/lib/fonts";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="ja"
      className={`${notoSansJp.variable} ${notoSymbol.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
      <GoogleAnalytics gaId={GA_ID} />
    </html>
  );
}
