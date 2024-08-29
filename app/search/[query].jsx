import { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import useAppwrite from "../../lib/useAppwrite";
import { searchPosts } from "../../lib/appwrite";
import { EmptyState, SearchInput, VideoCard } from "../../components";
import { BooksForSale } from "../../constants/data";

const Search = () => {
  const { query } = useLocalSearchParams();
  // const { data: posts, refetch } = useAppwrite(() => searchPosts(query));

  // useEffect(() => {
  //   refetch();
  // }, [query]);

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={[BooksForSale[Number(query)]]}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <VideoCard {...item} details={true} />}
        ListHeaderComponent={() => (
          <>
            <View className="flex my-6 px-4">
              <Text className="font-pmedium text-gray-100 text-sm">
                Result For
              </Text>
              <Text className="text-2xl font-psemibold text-white mt-1">
                {BooksForSale[Number(query)].Name}
              </Text>

              {/* <View className="mt-6 mb-8">
                <SearchInput initialQuery={query} refetch={refetch} />
              </View> */}
            </View>
          </>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos found for this search query"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Search;