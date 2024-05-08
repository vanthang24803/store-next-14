import { Inter } from "next/font/google";
import { Navbar } from "./_components/navbar";
import { ThemeProvider } from "@/components/provider/theme-provider";
import { Warning } from "./_components/waring-layout";

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
          <div className="mt-14 hidden lg:block">{children}</div>
          <Warning />
        </ThemeProvider>
      </body>
    </html>
  );
}
