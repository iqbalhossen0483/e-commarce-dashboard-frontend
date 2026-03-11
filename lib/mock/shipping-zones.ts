export interface ShippingZone {
  id: string;
  name: string;
  regions: string;
  flatRate: string;
  freeAbove: string;
}

export const defaultShippingZones: ShippingZone[] = [
  { id: "z1", name: "Domestic", regions: "United States", flatRate: "5.99", freeAbove: "50" },
  { id: "z2", name: "International", regions: "Rest of World", flatRate: "14.99", freeAbove: "100" },
];
