import Link from "next/link";
import getDetailProduct from "@/actions/get-detail";
import { DetailCard } from "./_components/card-detail";
import { Suggest } from "./_components/suggest";
import { Introduce } from "./_components/introduce";
import { Reviews } from "./_components/reviews";
import { decodeSlug } from "@/utils/slug";

interface ProductIdProp {
  params: {
    slug: string;
  };
}

export default async function ProductDetail({ params }: ProductIdProp) {
  const uuid = decodeSlug(params.slug);
  const response = await getDetailProduct(uuid || "");

  return (
    <div className="md:max-w-screen-xl mx-auto px-4 md:p-4 flex flex-col space-y-6 pb-8 md:pb-12">
      <div className="hidden md:flex items-center  text-sm space-x-2 text-neutral-800">
        <Link href={`/`}>Trang chủ </Link>
        <span>/</span>
        <Link href={`/collections/sach-moi`}>Sách mới</Link>
        <span>/</span>
        <span> {response.name}</span>
      </div>

      <DetailCard product={response} />

      <Introduce data={response} />

      <Reviews productId={uuid || ""} />

      <Suggest category={response.categories[0].name} />
    </div>
  );
}
