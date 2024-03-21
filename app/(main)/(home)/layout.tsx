import { Quicksand } from "next/font/google";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { ModalProvider } from "@/components/provider/modal-provider";

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
        <ModalProvider />
        <div className="mt-14  bg-[#f2f3f5] ">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
