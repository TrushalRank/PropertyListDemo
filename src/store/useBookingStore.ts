// src/store/useBookingStore.ts
import { create } from "zustand";

type Booking = {
  id: string;
  propertyId: string;
  userId: string;
  checkIn: string;
  checkOut: string;
  status: string;
};

type BookingStore = {
  bookings: Booking[];
  setBookings: (data: Booking[]) => void;
};

export const useBookingStore = create<BookingStore>((set) => ({
  bookings: [],
  setBookings: (data) => set({ bookings: data }),
}));
