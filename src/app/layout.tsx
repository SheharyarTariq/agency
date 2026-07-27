import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Fraunces } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["300", "400", "500", "600", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Devlyncs — Digital Product Agency",
  description:
    "Full-service digital agency building websites, apps, and AI-powered products for ambitious founders and forward-thinking companies.",
  keywords: [
    "digital agency",
    "web design",
    "web development",
    "UI UX design",
    "mobile app development",
    "digital product design",
    "QA testing",
    "Next.js development",
  ],
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "Devlyncs — Digital Product Agency",
    description:
      "Full-service digital agency building websites, apps, and AI-powered products for ambitious founders.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jakarta.variable} ${fraunces.variable}`}>
      <body className="font-sans antialiased bg-cream-50 text-ink-950">
        {children}
      </body>
    </html>
  );
}
