import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "Fetch Dog App",
  description: "Fetch Dog App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Header/>
        <main className="flex-grow container mx-auto p-4">{children}</main>
        <Footer/>
        </body>
    </html>
  );
}
