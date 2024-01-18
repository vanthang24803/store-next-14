import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <div className="bg-[#f2f3f5] mt-14">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
