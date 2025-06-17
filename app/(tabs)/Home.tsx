import { IconSymbol } from "@/components/ui/IconSymbol";
import { useProperties } from "@/src/hooks/useProperties";
import { usePropertyStore } from "@/src/store/usePropertyStore";
import { router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import tw from "twrnc";

export default function Home() {
  const [search, setSearch] = useState("");

  const { data, isLoading } = useProperties();
  const setSelectedProperty = usePropertyStore((s) => s.setSelectedProperty);

  if (isLoading) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <ActivityIndicator />
      </View>
    );
  }

  const RenderItem = ({ item }: { item: any }) => {
    return (
      <View style={tw`mb-4`}>
        <TouchableOpacity
          onPress={() => {
            setSelectedProperty(item);
            router.push(`/property/${item.id}`);
          }}
        >
          <View style={tw`bg-gray-200 rounded-2xl overflow-hidden`}>
            {item.images?.[0] && (
              <Image
                source={{ uri: item.images[0] }}
                style={tw`w-full h-50`}
                resizeMode="cover"
              />
            )}
            <View style={tw`bg-gray-200 py-3 px-3 gap-1`}>
              <View style={tw`flex-row justify-between items-center`}>
                <View style={tw`flex-row items-center`}>
                  <IconSymbol size={18} name="location" color={"#4B5563"} />
                  <Text style={tw`text-sm font-medium text-gray-800 ml-1`}>
                    {item.location.state}, {item.location.city}
                  </Text>
                </View>
                <Text style={tw`text-blue-600 font-semibold`}>
                  ${item.price}
                </Text>
              </View>
              <Text style={tw`text-lg font-semibold text-blue-900`}>
                {item.title}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={tw`flex-1 p-4 bg-white`}>
      <TextInput
        placeholder="Search properties"
        value={search}
        onChangeText={setSearch}
        style={tw`border border-gray-300 rounded-md px-4 py-4 mb-4`}
      />
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <RenderItem item={item} />}
        contentContainerStyle={tw`flex-grow pb-20`}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
