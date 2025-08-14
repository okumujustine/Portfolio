import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Justin Okumu - Software Developer",
  description: "Software developer sharing thoughts on web development, programming, and technology.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
