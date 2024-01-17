import getProducts from "@/actions/get-products";
import getBillboard from "@/actions/get-thumbnail";
import { Loading, Slider } from "./_components/slider";
import { Billboard } from "./_components/billboard";
import { Navigation } from "./_components/navigation";
import { Suspense } from "react";
import getBestSeller from "@/actions/get-best-saller";
import { BestSeller } from "./_components/best-seller";

export default async function Home() {
  const billboard = await getBillboard();
  const bestSeller = await getBestSeller();

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
    </main>
  );
}
