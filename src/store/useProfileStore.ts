// src/store/useProfileStore.ts
import { create } from "zustand";

type Profile = {
  id: string;
  name: string;
  email: string;
  bookings: string[];
};

type ProfileStore = {
  profile: Profile | null;
  setProfile: (profile: Profile) => void;
  clearProfile: () => void;
};

export const useProfileStore = create<ProfileStore>((set) => ({
  profile: null,
  setProfile: (profile) => set({ profile }),
  clearProfile: () => set({ profile: null }),
}));
