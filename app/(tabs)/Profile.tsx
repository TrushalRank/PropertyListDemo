import { IconSymbol } from "@/components/ui/IconSymbol";
import { useProfile } from "@/src/hooks/useProfile";
import { useProfileStore } from "@/src/store/useProfileStore";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import tw from "twrnc";

export default function Profile() {
  const { data: profileData, isLoading } = useProfile();
  const setProfile = useProfileStore((s) => s.setProfile);
  const profile = useProfileStore((s) => s.profile);

  useEffect(() => {
    if (profileData) {
      setProfile(profileData);
    }
  }, [profileData]);

  if (isLoading || !profile) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={tw`flex-1 bg-white`}>
      <LinearGradient
        colors={["#2563EB", "#1E3A8A"]}
        style={tw`py-10 px-6 rounded-b-3xl`}
      >
        <View style={tw`items-center`}>
          <IconSymbol name="person.crop.circle" size={120} color="white" />
          <Text style={tw`text-2xl font-bold text-white mt-4`}>
            {profile.name}
          </Text>
        </View>
      </LinearGradient>

      <ScrollView contentContainerStyle={tw`p-6`}>
        <View style={tw`bg-white rounded-xl shadow p-4 mb-4`}>
          <View style={tw`flex-row items-center gap-3`}>
            <IconSymbol
              name="mail.and.text.magnifyingglass.rtl"
              size={24}
              color={"#2563EB"}
            />
            <Text style={tw`text-base text-gray-700`}>{profile.email}</Text>
          </View>
        </View>
        <View style={tw`bg-white rounded-xl shadow p-4`}>
          <View style={tw`flex-row items-center gap-3 mb-2`}>
            <IconSymbol name="bookmark.square" size={24} color={"#2563EB"} />
            <Text style={tw`text-base font-semibold text-gray-700`}>
              Bookings
            </Text>
          </View>
          {profile.bookings.length > 0 ? (
            profile.bookings.map((id) => (
              <Text key={id} style={tw`ml-8 text-gray-600`}>
                • {id}
              </Text>
            ))
          ) : (
            <Text style={tw`ml-8 text-gray-500`}>No bookings yet.</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
