import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { CartIcon } from "./icon-cart";

export const CartAction = () => {
  const num: number = 2;

  let price: number = num * 10000;

  return (
    <Sheet>
      <SheetTrigger>
        <div className="flex items-center space-x-2 hover:cursor-pointer">
          <div className="relative">
            <CartIcon />
            <div className="w-5 h-5 flex items-center justify-center rounded-full bg-red-500 absolute -top-2 -right-2">
              <span className="text-white text-[12px]">{num}</span>
            </div>
          </div>
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Giỏ Hàng </SheetTitle>
          <SheetDescription>Số sản phẩm trong giỏ hàng: {num}</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col space-y-2">
          <ScrollArea className="lg:h-[75vh] h-[78vh] w-full"></ScrollArea>
          <Separator />
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold">Tổng số tiền:</span>
            <span className="font-medium">
              {price.toLocaleString("de-DE")} vnd
            </span>
          </div>
          <Button className="w-full bg-[#417505] hover:bg-[#65b10d]">
            Thanh toán
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
