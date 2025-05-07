import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/providers";

export const metadata: Metadata = {
  title: "Mekhanofficial",
  description:
    "Edufacilis is committed to revolutionizing the educational landscape by harnessing the transformative capabilities of Artificial Intelligence (AI). Our mission is to bring cutting-edge technology to the EdTech sector, empowering students with personalized learning experiences while enhancing teachers' productivity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
