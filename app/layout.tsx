import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";

const IBMPlex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex",
});

export const metadata: Metadata = {
  title: "FullStackDemo",
  description: "A basic fullstack web app with all the bells and whistles",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        variables: { colorPrimary: "#00285c" },
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <body className={cn("font-IBMPlex antialiased", IBMPlex.variable)}>
          <main>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
