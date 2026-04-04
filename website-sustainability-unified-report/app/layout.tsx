import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Website Sustainability Unified Report",
  description: "Professional sustainability analysis with unified scoring across multiple data sources."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
