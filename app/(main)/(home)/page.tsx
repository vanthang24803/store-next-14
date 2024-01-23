import getProducts from "@/actions/get-products";
import getBillboard from "@/actions/get-thumbnail";
import { Loading, Slider } from "./_components/slider";
import { Billboard } from "./_components/billboard";
import { Navigation } from "./_components/navigation";
import { Suspense } from "react";
import getBestSeller from "@/actions/get-best-saller";
import { BestSeller } from "./_components/best-seller";
import getTopBook from "@/actions/get-top-book";
import { TopBook } from "./_components/top-book";
import getByCategory from "@/actions/get-by-category";
import { ListCategory } from "./_components/list-category";
import { categoryImage } from "@/constant";

export default async function Home() {
  const billboard = await getBillboard();
  const bestSeller = await getBestSeller();
  const topBook = await getTopBook(3, 4, "Light Novel");
  const newBooks = await getByCategory(10, "Sách mới");
  const manga = await getByCategory(10, "Manga");

  return (
    <main className="md:max-w-screen-xl mx-auto p-4 flex flex-col space-y-6 md:space-y-8">
      <div className="flex flex-col lg:flex-row space-y-6 items-center justify-between">
        <Suspense fallback={<Loading />}>
          <Slider billboard={billboard} />
        </Suspense>
        <Billboard />
      </div>
      <Navigation />

      <BestSeller data={bestSeller} />

      <TopBook data={topBook} />

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
