"use client";

import { SellingProducts } from "./selling-products";
import { Customers } from "./customers";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export const RecentSales = () => {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="flex space-x-3 py-4"
    >
      <ResizablePanel defaultSize={60}>
        <SellingProducts />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={40}>
        <Customers />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};
