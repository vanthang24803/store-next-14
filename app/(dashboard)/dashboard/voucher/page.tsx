import getVouchers from "@/actions/get-vouchers";
import { VoucherClient } from "./_components/voucher-client";

export default async function Voucher() {
  const vouchers = await getVouchers();

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 px-8 py-4">
        <VoucherClient data={vouchers} />
      </div>
    </div>
  );
}
