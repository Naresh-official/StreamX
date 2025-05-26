import { Poppins } from "next/font/google";

import "@workspace/ui/globals.css";
import { AdminSidebar } from "../components/AdminSidebar";
import { AdminHeader } from "../components/AdminHeader";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Admin",
  description: "Admin panel for the StreamX",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${poppins.className} font-sans antialiased`}>
        <AdminSidebar />
        <div className="lg:pl-64">
          <AdminHeader />
          <main className="p-6 pt-20">{children}</main>
        </div>
      </body>
    </html>
  );
}
