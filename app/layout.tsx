import type { Metadata } from "next";
import { Instrument_Sans, Lora, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const instrument = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--next-font-d",
  display: "swap",
});
const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--next-font-b",
  display: "swap",
});
const plex = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--next-font-m",
  display: "swap",
});

export const metadata: Metadata = {
  title: "[Your Brand] — Roof Coating Specialists | Free Inspection",
  description:
    "Save 50-70% vs roof replacement with professional silicone roof coating. Manufacturer warranty up to 20 years. Free inspection.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
        />
      </head>
      <body className={`${instrument.variable} ${lora.variable} ${plex.variable}`}>
        {children}
      </body>
    </html>
  );
}
