import { defaultShippingZones, type ShippingZone } from "@/lib/mock/shipping-zones";
import { create } from "zustand";

interface ShippingState {
  zones: ShippingZone[];
  setZones: (zones: ShippingZone[]) => void;
}

export const useShippingStore = create<ShippingState>((set) => ({
  zones: defaultShippingZones,
  setZones: (zones) => set({ zones }),
}));
