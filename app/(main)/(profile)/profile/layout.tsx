import { Quicksand } from "next/font/google";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { ToastProvider } from "@/components/provider/toater-provider";
import { Menubar } from "./_components/menubar";

export async function generateMetadata() {
  return {
    title: "Trang cá nhân",
  };
}

const font = Quicksand({ subsets: ["latin"] });

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Navbar />
        <ToastProvider />
        <div className="flex md:flex-row flex-col mt-14 bg-[#f2f3f5] p-8">
          <Menubar />
          <div className="w-full">{children}</div>
        </div>
        <Footer />
      </body>
    </html>
  );
}
