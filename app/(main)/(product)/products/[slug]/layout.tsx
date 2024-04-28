import { Quicksand } from "next/font/google";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import getDetailProduct from "@/actions/get-detail";
import { decodeSlug } from "@/utils/slug";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getDetailProduct(decodeSlug(params.slug) || "");

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
