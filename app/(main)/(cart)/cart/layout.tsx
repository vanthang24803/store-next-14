import { Quicksand } from "next/font/google";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

export async function generateMetadata() {
  return { title: "Giỏ hàng" };
}

const font = Quicksand({ subsets: ["latin"] });

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body className={font.className}>
        <Navbar />
        <div className="mt-14  bg-[#f2f3f5]">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
