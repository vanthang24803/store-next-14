import Link from "next/link";
import { Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import { menubar } from "@/constant";

export const MobileMenu = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost">
          <Menu className="w-4 h-4" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <div className="flex flex-col space-y-4 mt-8">
          <div className="flex flex-col space-y-6 ">
            {menubar.map((item, index) => (
              <Link key={index} href={item.href} className="font-semibold">
                <SheetClose>{item.title}</SheetClose>
              </Link>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
