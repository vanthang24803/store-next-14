import getBillboard from "@/actions/get-thumbnail";
import { Navigation } from "./_components/navigation";
import getBestSeller from "@/actions/get-best-saller";
import { BestSeller } from "./_components/best-seller";
import { TopBook } from "./_components/top-book";
import getByCategory from "@/actions/get-by-category";
import { ListCategory } from "./_components/list-category";
import { categoryImage } from "@/constant";
import { Header } from "./header";
import { MANGA, SACHMOI } from "@/constant";

export default async function Home() {
  const billboard = await getBillboard();
  const bestSeller = await getBestSeller();

  const newBooks = await getByCategory(10, SACHMOI);
  const manga = await getByCategory(10, MANGA);
  return (
    <main className="md:max-w-screen-xl mx-auto md:p-4 flex flex-col space-y-6 md:space-y-8">
      <Header billboard={billboard} />

      <Navigation />

      <BestSeller data={bestSeller} />

      <TopBook data={manga} />

      <ListCategory
        name="Bộ sưu tập mới"
        products={newBooks}
        thumbnail={categoryImage[0].url}
        link={categoryImage[0].link}
      />
      <ListCategory
        name="Truyện tranh"
        products={manga}
        thumbnail={categoryImage[1].url}
        link={categoryImage[1].link}
      />
    </main>
  );
}
