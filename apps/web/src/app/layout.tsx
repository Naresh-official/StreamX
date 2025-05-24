import { Poppins } from "next/font/google";

import "@workspace/ui/globals.css";
import { Navbar } from "@/src/components/Navbar";
import { AuthSessionProvider } from "@/src/components/Provider";

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
      <AuthSessionProvider>
        <body className={`${poppins.className} font-sans antialiased `}>
          <Navbar />
          {children}
        </body>
      </AuthSessionProvider>
    </html>
  );
}
