import { createContext, useContext, useState, type ReactNode } from "react";
import type { Residence } from "@/lib/huron-data";
import { ReservationDrawer } from "./ReservationDrawer";

type Ctx = {
  reserve: (r: Residence) => void;
  close: () => void;
};

const ReservationCtx = createContext<Ctx | null>(null);

export function ReservationProvider({ children }: { children: ReactNode }) {
  const [residence, setResidence] = useState<Residence | null>(null);
  return (
    <ReservationCtx.Provider value={{ reserve: setResidence, close: () => setResidence(null) }}>
      {children}
      <ReservationDrawer residence={residence} onClose={() => setResidence(null)} />
    </ReservationCtx.Provider>
  );
}

export function useReservation() {
  const ctx = useContext(ReservationCtx);
  if (!ctx) throw new Error("useReservation must be used within ReservationProvider");
  return ctx;
}
