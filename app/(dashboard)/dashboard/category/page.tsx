import getCategories from "@/actions/get-cateories";
import { CategoryClient } from "./_components/category-client";

export default async function Category() {
  const categories = await getCategories();

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 px-8 py-4">
        <CategoryClient data={categories} />
      </div>
    </div>
  );
}
