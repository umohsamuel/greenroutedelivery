import type { Metadata } from "next";
import "./globals.css";
import { Apercu } from "../../public/fonts";
import { Providers } from "@/providers";
import { ToastContainer } from "react-toastify";

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
        <Providers>
          <ToastContainer position="top-center" hideProgressBar={true} />
          {children}
        </Providers>
      </body>
    </html>
  );
}
