import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "TukTuk Studio — Film Sound Design & Post-Production",
  description:
    "Allen Kang | TukTuk Studio. Film sound design, dialogue editing, foley, and re-recording mixing. Seoul-based post-production studio.",
  keywords: [
    "film sound design",
    "post production",
    "foley",
    "dialogue editing",
    "re-recording mix",
    "Allen Kang",
    "TukTuk Studio",
  ],
  authors: [{ name: "Allen Kang", url: "https://tuktuksound.com" }],
  openGraph: {
    title: "TukTuk Studio — Film Sound Design",
    description: "Allen Kang | Film Sound Design & Post-Production",
    url: "https://tuktuksound.com",
    siteName: "TukTuk Studio",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="grain">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
