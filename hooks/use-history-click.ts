import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { Product } from "@/types";

interface CartStore {
  items: Product[];
  addItem: (data: Product) => void;
}

const useHistoryClick = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],

      addItem: (data: Product) => {
        let items = get().items;
        if (items.length >= 10) {
          items.shift();
        }
        items.push(data);
        set({ items });
      },
    }),
    {
      name: "history-click",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useHistoryClick;
