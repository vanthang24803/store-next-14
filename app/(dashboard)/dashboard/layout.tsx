import { Inter } from "next/font/google";
import { Navbar } from "./_components/navbar";


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
    <html lang="en">
        <body className={font.className}>
          <Navbar />
          <div className="mt-14">{children}</div>
        </body>
    </html>
  );
}
