import { create } from "zustand";

type Property = {
  id: string;
  title: string;
  location: {
    address: string;
    city: string;
    state: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
  features: string[];
  price: number;
  images: string[];
};

type PropertyStore = {
  selectedProperty: Property | null;
  setSelectedProperty: (property: Property | null) => void;
};

export const usePropertyStore = create<PropertyStore>((set) => ({
  selectedProperty: null,
  setSelectedProperty: (property) => set({ selectedProperty: property }),
}));
