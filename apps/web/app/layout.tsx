import { Poppins } from "next/font/google";

import "@workspace/ui/globals.css";
import { Navbar } from "@/components/Navbar";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${poppins.className} font-sans antialiased `}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
