import { Anton, JetBrains_Mono } from "next/font/google";

export const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});
