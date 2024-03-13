import type { Metadata } from "next";
import "@uploadthing/react/styles.css";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { ToastProvider } from "@/components/provider/toater-provider";
import { GoogleOAuthProvider } from "@react-oauth/google";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: [
    {
      url: "/logo.png",
      href: "/logo.png",
    },
  ],
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <GoogleOAuthProvider clientId={`${process.env.GOOGLE_CLIENT_ID}`}>
        <body>
          <ToastProvider />
          {children}
        </body>
      </GoogleOAuthProvider>
    </html>
  );
}
