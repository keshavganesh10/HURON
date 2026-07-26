import { create } from "zustand";
import { persist } from "zustand/middleware";

type State = {
  granted: boolean;
  email: string | null;
  grant: (email: string) => void;
  revoke: () => void;
};

/**
 * Lightweight client-side gate for the confidential investor dossier.
 * This is NOT authentication — a Huron IR Director confirms access
 * out-of-band. Providing a work email simply unlocks the on-page material
 * and lets IR follow up.
 */
export const useInvestorAccess = create<State>()(
  persist(
    (set) => ({
      granted: false,
      email: null,
      grant: (email) => set({ granted: true, email }),
      revoke: () => set({ granted: false, email: null }),
    }),
    { name: "huron-investor-access" },
  ),
);
