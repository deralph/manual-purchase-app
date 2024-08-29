import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Image, FlatList, TouchableOpacity } from "react-native";

import { icons } from "../../constants";
import useAppwrite from "../../lib/useAppwrite";
import { getUserPurchase, signOut } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import { EmptyState, InfoBox, VideoCard } from "../../components";
import { FontAwesome5 } from "@expo/vector-icons";
import { BooksForSale } from "../../constants/data";
import { cscCover } from "../../constants/images";

const Profile = () => {
  const { user, setUser, setIsLogged } = useGlobalContext();
  const { data: posts } = useAppwrite(() => getUserPurchase(user.$id));

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLogged(false);

    router.replace("/sign-in");
  };

  const Poster = posts.map((book) => {
    const matchingBook = BooksForSale.find(
      (predefinedBook) => predefinedBook.Name === book.Name
    );
    return {
      ...book,
      image: matchingBook ? matchingBook.image : cscCover,
    };
  });

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={Poster}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard {...item} />}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Purchse Found"
            subtitle="Your have not bought any manual"
          />
        )}
        ListHeaderComponent={() => (
          <View className="w-full flex justify-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity
              onPress={logout}
              className="flex w-full items-end mb-10"
            >
              <Image
                source={icons.logout}
                resizeMode="contain"
                className="w-6 h-6"
              />
            </TouchableOpacity>

            <View className="w-16 h-16 border border-secondary rounded-lg flex justify-center items-center">
              {/* <Image
                source={{ uri: user?.avatar }}
                className="w-[90%] h-[90%] rounded-lg"
                resizeMode="cover"
              /> */}
              <FontAwesome5 name="book" size={30} color="white" />
            </View>

            <InfoBox
              title={user?.matricNo}
              containerStyles="mt-5"
              titleStyles="text-lg"
            />

            <View className="mt-5 flex flex-row">
              <InfoBox
                title={posts.length || 0}
                subtitle="Purchase"
                titleStyles="text-xl"
                containerStyles="mr-10"
              />
              <InfoBox
                title={BooksForSale.length}
                subtitle="Available Books"
                titleStyles="text-xl"
              />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Profile;
