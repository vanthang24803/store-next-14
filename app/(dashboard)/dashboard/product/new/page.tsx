import { Separator } from "@/components/ui/separator";
import { Heading } from "../../_components/heading";
import { CreateForm } from "./_components/update-from";


export default function ProductId() {
 
  return (
    <>
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between">
            <Heading title="Create product" description={`Create an product`} />
          </div>
          <Separator />
          <div className="flex justify-between">
            <CreateForm  />
          </div>
        </div>
      </div>
    </>
  );
}
