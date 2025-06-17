import { IconSymbol } from "@/components/ui/IconSymbol";
import { useBookings } from "@/src/hooks/useBookings";
import { useBookingStore } from "@/src/store/useBookingStore";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import tw from "twrnc";

export default function Bookings() {
  const { data: bookingData, isLoading } = useBookings();
  const setBookings = useBookingStore((s) => s.setBookings);
  const bookings = useBookingStore((s) => s.bookings);

  useEffect(() => {
    if (bookingData) {
      setBookings(bookingData);
    }
  }, [bookingData]);

  if (isLoading || bookings.length === 0) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={tw`flex-1 bg-white`}>
      <LinearGradient
        colors={["#059669", "#065F46"]}
        style={tw`py-10 px-6 rounded-b-3xl mb-4`}
      >
        <Text style={tw`text-white text-2xl font-bold text-center`}>
          My Bookings
        </Text>
      </LinearGradient>

      <ScrollView
        contentContainerStyle={tw`p-6 pb-32`}
        showsVerticalScrollIndicator={false}
      >
        {bookings.map((booking) => (
          <View
            key={booking.id}
            style={tw`bg-white rounded-xl shadow p-4 mb-4`}
          >
            <View style={tw`flex-row items-center gap-3 mb-2`}>
              <IconSymbol
                name="calendar.badge.clock"
                size={24}
                color={"#059669"}
              />
              <Text style={tw`text-lg font-semibold text-gray-800`}>
                Booking ID: {booking.id}
              </Text>
            </View>
            <Text style={tw`ml-8 text-gray-600`}>
              Check-In: {booking.checkIn}
            </Text>
            <Text style={tw`ml-8 text-gray-600`}>
              Check-Out: {booking?.checkOut}
            </Text>
            <Text style={tw`ml-8 text-gray-600`}>Status: {booking.status}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
