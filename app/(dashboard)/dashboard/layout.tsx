import { Inter } from "next/font/google";
import { Navbar } from "./_components/navbar";
import { ThemeProvider } from "@/components/provider/theme-provider";

const font = Inter({ subsets: ["latin"] });

export async function generateMetadata() {
  return { title: "Dashboard" };
}

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={font.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <div className="mt-14">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
