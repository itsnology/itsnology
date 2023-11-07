import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
   title: "Itsnology",
   description:
      "a card and a link to your social media accounts store in one place",
};

export default function RootLayout({ children }) {
   return (
      <html lang="en" dir="rtl">
         <body className={inter.className}> {children}</body>
      </html>
   );
}
