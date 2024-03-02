import { Inter } from "next/font/google";
import { Navbar } from "./_components/navbar";
import { ThemeProvider } from "@/components/provider/theme-provider";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";

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
          <div className="h-svh lg:hidden flex flex-col space-y-4 items-center justify-center">
            <AlertTriangle className="w-24 h-24" />
            <div className="flex flex-col text-center text-sm md:text-base">
              <p>Trang này không hỗ trợ kích thước màn hình của bạn.</p>
              <p>Vui lòng truy cập trên thiết bị phù hợp!</p>
            </div>
            <Link href={"/"}>
              <Button variant="primary">Trở về trang chủ</Button>
            </Link>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
