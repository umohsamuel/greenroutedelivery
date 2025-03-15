import localFont from "next/font/local";

export const Apercu = localFont({
  src: [
    {
      path: "./Apercu-Font-Family/Apercu Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./Apercu-Font-Family/Apercu Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./Apercu-Font-Family/Apercu Pro Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./Apercu-Font-Family/Apercu Mono.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./Apercu-Font-Family/Apercu Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-apercu",
  display: "swap",
});
