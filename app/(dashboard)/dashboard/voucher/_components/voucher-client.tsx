"use client";

import { Voucher } from "@/types";
import { Heading } from "../../_components/heading";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus, RotateCw } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

import { columns } from "./columns";
import toast from "react-hot-toast";
import _http from "@/utils/http";

interface VoucherClient {
  data: Voucher[] | undefined;
}

export const VoucherClient = ({ data }: VoucherClient) => {
  const router = useRouter();

  const handlerVerifyVoucher = async () => {
    const response = await _http.post(
      `/api/product/voucher/verify`
    );

    if (response.status === 200) {
      toast.success("Success");
      router.refresh();
    }
  };

  return (
    <>
      {data && (
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <Heading
              title={`Vouchers (${data?.length})`}
              description="Manage vouchers for your store"
            />
            <div className="flex items-center space-x-3">
              <Button variant="primary" onClick={handlerVerifyVoucher}>
                <RotateCw />
              </Button>
              <Button onClick={() => router.push(`/dashboard/voucher/new`)}>
                <Plus className="mr-2 h-4 w-4" /> Add New
              </Button>
            </div>
          </div>
          <Separator />
          <DataTable searchKey="name" columns={columns} data={data} />
        </div>
      )}
    </>
  );
};
