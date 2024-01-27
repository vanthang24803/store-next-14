import getBillboard from "@/actions/get-thumbnail";
import { BillboardClient } from "./_components/billboard-client";

export default async function Billboard() {
  const billboard = await getBillboard();

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 px-8 py-4">
        <BillboardClient data={billboard} />
      </div>
    </div>
  );
}
