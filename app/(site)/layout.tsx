import type { Metadata } from "next";
import "./globals.css";
import Navebar from "@/components/Navebar";

export const metadata: Metadata = {
  title: "InkWaves",
  description: "BLOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOGS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`bg-sec text-main antialiased`}>
        <Navebar />
        {children}
      </body>
    </html>
  );
}
