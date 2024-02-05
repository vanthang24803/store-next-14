import getOrders from "@/actions/get-orders";
import { OrderClient } from "./_components/order-client";
import { ExportData } from "./_components/export-data";
export default async function Product() {
  const orders = await getOrders();

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 px-8 py-4">
        <OrderClient data={orders} />
        <ExportData/>        
      </div>
    </div>
  );
}
