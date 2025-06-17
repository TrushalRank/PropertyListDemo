import { IconSymbol } from "@/components/ui/IconSymbol";
import { useAddBooking } from "@/src/hooks/useBookings";
import { usePropertyStore } from "@/src/store/usePropertyStore";
import { useRouter } from "expo-router";
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import tw from "twrnc";

export default function PropertyDetails() {
  const router = useRouter();
  const property = usePropertyStore((s) => s.selectedProperty);
  const { mutate: addBooking } = useAddBooking();

  const handleBooking = async () => {
    const bookingPayload = {
      propertyId: property?.id ?? "",
      userId: "user1",
      checkIn: new Date().toISOString().split("T")[0],
      checkOut: "",
      status: "confirmed",
    };

    await addBooking(bookingPayload);
  };

  const { width } = Dimensions.get("window");

  if (!property) {
    return (
      <View style={tw`p-5`}>
        <Text>No property selected</Text>
      </View>
    );
  }

  return (
    <View style={tw`flex-1`}>
      <ScrollView
        style={tw`flex-1 bg-white`}
        contentContainerStyle={tw`pb-20`}
        showsVerticalScrollIndicator={false}
      >
        <View style={tw`relative`}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            style={tw`h-[350px] rounded-b-[30px]`}
          >
            {property?.images?.map((image: string, index: number) => (
              <Image
                key={index}
                source={{ uri: image }}
                style={{
                  width,
                  height: 350,
                  resizeMode: "cover",
                }}
              />
            ))}
          </ScrollView>

          <TouchableOpacity
            onPress={() => router.back()}
            style={tw`absolute top-10 left-5 bg-[rgba(0,0,0,0.4)] p-2 rounded-full`}
          >
            <IconSymbol name="arrow.backward" size={20} color="white" />
          </TouchableOpacity>
        </View>

        <View style={tw`px-5 py-5`}>
          <Text style={tw`text-[22px] font-bold mb-2`}>{property?.title}</Text>

          <View style={tw`flex-row gap-1`}>
            <IconSymbol name="mappin.and.ellipse" size={20} color="grey" />
            <Text style={tw`text-base text-gray-600`}>
              {property?.location?.address}, {property?.location?.city},{" "}
              {property?.location?.state}
            </Text>
          </View>

          <View style={tw`mt-6`}>
            <Text style={tw`text-base font-bold`}>Property Information</Text>
            <View style={tw`flex-row flex-wrap justify-between mt-2`}>
              {property?.features?.map((feature: string, index: number) => (
                <View
                  key={index}
                  style={tw`w-[48%] bg-yellow-300 py-2 px-3 rounded-lg items-center mb-2`}
                >
                  <Text style={tw`text-sm text-gray-800`}>{feature}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={tw`mt-6`}>
            <Text style={tw`text-base font-bold mb-2`}>Location on Map</Text>
            <View style={tw`h-[200px] rounded-xl overflow-hidden`}>
              <MapView
                style={tw`flex-1`}
                initialRegion={{
                  latitude: property?.location?.coordinates?.latitude,
                  longitude: property?.location?.coordinates?.longitude,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }}
              >
                <Marker
                  coordinate={{
                    latitude: property?.location?.coordinates?.latitude,
                    longitude: property?.location?.coordinates?.longitude,
                  }}
                  title={property?.title}
                  description={`${property?.location?.city}, ${property?.location?.state}`}
                />
              </MapView>
            </View>
          </View>
        </View>
      </ScrollView>

      <View
        style={tw`absolute bottom-0 left-0 right-0 bg-white py-5 px-5 border-t border-gray-300 flex-row justify-between`}
      >
        <View style={tw`gap-1`}>
          <Text style={tw`text-sm font-bold`}>Price</Text>
          <Text style={tw`text-lg font-bold text-blue-600`}>
            ${property?.price}
          </Text>
        </View>

        <TouchableOpacity
          style={tw`bg-blue-600 py-3 px-5 rounded-lg justify-center items-center`}
          onPress={() => {
            handleBooking();
          }}
        >
          <Text style={tw`text-white font-semibold`}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
