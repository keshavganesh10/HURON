import { create } from "zustand";
import type { Residence } from "@/lib/huron-data";

type ActivePropertyState = {
  active: Residence | null;
  setActive: (r: Residence | null) => void;
};

export const useActiveProperty = create<ActivePropertyState>((set) => ({
  active: null,
  setActive: (r) => set({ active: r }),
}));
