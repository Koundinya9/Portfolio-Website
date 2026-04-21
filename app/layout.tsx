import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ParticleBackground from "./components/ParticleBackground";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Koundinya Pullela | AI Engineer",
  description: "Personal portfolio of Venkata Koundinya Pullela - AI Engineer, Data Scientist, and ML Specialist",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className={`${jetbrainsMono.className} min-h-full flex flex-col`}>
        <ParticleBackground />
        {children}
      </body>
    </html>
  );
}
