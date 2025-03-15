import type { Metadata } from "next";
import "./globals.css";
import { Apercu } from "../../public/fonts";

export const metadata: Metadata = {
  title: "Green Route Delivery",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${Apercu.variable} font-apercu bg-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
