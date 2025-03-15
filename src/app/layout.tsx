import type { Metadata } from "next";
import "./globals.css";
import { Apercu } from "../../public/fonts";
import { Providers } from "@/providers";

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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
