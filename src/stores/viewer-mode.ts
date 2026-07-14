import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ViewerMode = "client" | "investor";

type ViewerModeState = {
  mode: ViewerMode;
  setMode: (m: ViewerMode) => void;
  toggle: () => void;
};

export const useViewerMode = create<ViewerModeState>()(
  persist(
    (set, get) => ({
      mode: "client",
      setMode: (mode) => set({ mode }),
      toggle: () => set({ mode: get().mode === "client" ? "investor" : "client" }),
    }),
    { name: "huron-viewer-mode" },
  ),
);
