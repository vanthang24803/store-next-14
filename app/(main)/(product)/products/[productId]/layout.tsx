import { Quicksand } from "next/font/google";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import getDetailProduct from "@/actions/get-detail";

export async function generateMetadata({
  params,
}: {
  params: { productId: string };
}) {
  const product = await getDetailProduct(params.productId);

  return {
    title: product.name || "Product",
  };
}

const font = Quicksand({ subsets: ["latin"] });

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
        <body className={font.className}>
          <Navbar />
          <div className="mt-14  bg-[#f2f3f5] ">{children}</div>
          <Footer />
        </body>
    </html>
  );
}
