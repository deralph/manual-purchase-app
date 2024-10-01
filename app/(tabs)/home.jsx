import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Image, RefreshControl, Text, View } from "react-native";

import { images } from "../../constants";
import useAppwrite from "../../lib/useAppwrite";
import {
  getAllPosts,
  getAnnouncements,
  getLatestPosts,
} from "../../lib/appwrite";
import { EmptyState, SearchInput, Trending, VideoCard } from "../../components";
import { BooksForSale } from "../../constants/data";
import { useGlobalContext } from "../../context/GlobalProvider";

const Home = () => {
  // const { data: posts, refetch } = useAppwrite(getAllPosts);
  // const { data: latestPosts } = useAppwrite(getLatestPosts);
  const { user } = useGlobalContext();
  console.log(user);

  const { data } = useAppwrite(() => getAnnouncements());
  console.log(data);
  console.log(" last data  = ", data[data.length - 1]);
  // const [refreshing, setRefreshing] = useState(false);

  // const onRefresh = async () => {
  //   setRefreshing(true);
  //   await refetch();
  //   setRefreshing(false);
  // };

  // one flatlist
  // with list header
  // and horizontal flatlist

  //  we cannot do that with just scrollview as there's both horizontal and vertical scroll (two flat lists, within trending)

  return (
    <SafeAreaView className="bg-primary">
      <FlatList
        data={BooksForSale}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <VideoCard
            {...item}
            // details={true}
            // avatar={item.creator.avatar}
          />
        )}
        ListHeaderComponent={() => (
          <View className="flex my-6 px-4 space-y-6">
            <View className="flex justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  {user?.matricNo}
                </Text>
                <Text className="text-base font-psemibold text-gray-200 mt-4">
                  {data
                    ? data[data.length - 1].announcement
                    : "All manuals are now avalaible at the computer lab"}
                </Text>
              </View>

              {/* <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMode="contain"
                />
              </View> */}
            </View>

            {/* <SearchInput /> */}

            {/* <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-lg font-pregular text-gray-100 mb-3">
                Latest Videos
              </Text>

               <Trending posts={latestPosts ?? []} />
            </View> */}
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Manuals Found"
            subtitle="No Manuals published yet"
          />
        )}
        // refreshControl={
        //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        // }
      />
    </SafeAreaView>
  );
};

export default Home;

const hi = [
  {
    $collectionId: "66fba051002dbff5f909",
    $createdAt: "2024-10-01T09:44:08.289+00:00",
    $databaseId: "668fe6ea003beb9dd282",
    $id: "66fbc4684612458c6d5a",
    $permissions: [
      'read("user:66fb9822e423bd6e801a")',
      'update("user:66fb9822e423bd6e801a")',
      'delete("user:66fb9822e423bd6e801a")',
    ],
    $updatedAt: "2024-10-01T09:44:08.289+00:00",
    announcement:
      "Please note that all manuals are available at the computer science laboratory ",
  },
];
