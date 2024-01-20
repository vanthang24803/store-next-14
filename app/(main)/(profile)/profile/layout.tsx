import { Quicksand } from "next/font/google";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import Provider from "@/components/provider/provider";

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
          <div className="mt-14 bg-[#f2f3f5] p-8">{children}</div>
          <Footer />
        </body>
    </html>
  );
}
