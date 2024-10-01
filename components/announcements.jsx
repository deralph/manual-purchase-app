import { useEffect, useState } from "react";
import { SafeAreaView, FlatList, Text, View } from "react-native";
import { getAnnouncements } from "../../lib/appwrite"; // Import Appwrite logic

const Home = () => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await getAnnouncements();
        setAnnouncements(response.documents);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAnnouncements();
  }, []);

  return (
    <SafeAreaView className="bg-primary">
      <FlatList
        data={announcements}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <View className="px-4 py-2">
            <Text className="text-white">{item.content}</Text>
          </View>
        )}
        ListHeaderComponent={() => (
          <View className="px-4 py-6">
            <Text className="text-2xl font-semibold text-white">
              Announcements
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Home;
