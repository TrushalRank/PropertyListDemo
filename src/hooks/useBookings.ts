import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const API_URL = "http://localhost:3000";

export type Booking = {
  id?: string;
  propertyId: string;
  userId: string;
  checkIn: string;
  checkOut: string;
  status: string;
};

const fetchBookings = async () => {
  const response = await axios.get(`${API_URL}/bookings`);
  return response.data;
};

const postBooking = async (newBooking: Booking) => {
  const response = await axios.post(`${API_URL}/bookings`, newBooking);
  return response.data;
};

export const useBookings = () =>
  useQuery({
    queryKey: ["bookings"],
    queryFn: fetchBookings,
  });

export const useAddBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
  });
};
