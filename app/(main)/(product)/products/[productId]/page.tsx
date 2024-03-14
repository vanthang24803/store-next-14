import getDetailProduct from "@/actions/get-detail";
import Link from "next/link";
import { DetailCard } from "./_components/card-detail";
import { Suggest } from "./_components/suggest";
import { Introduce } from "./_components/introduce";
import { HistoryCard } from "./_components/history";

interface ProductIdProp {
  params: {
    productId: string;
  };
}

export default async function ProductId({ params }: ProductIdProp) {
  const response = await getDetailProduct(params.productId);

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

      <Introduce data={response.information} />

      <Suggest category={response.categories[0].name} />
      <HistoryCard />
    </div>
  );
}
