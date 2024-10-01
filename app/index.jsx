import { StatusBar } from "expo-status-bar";
import { Redirect, router } from "expo-router";
import { View, Text, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../constants";
import { CustomButton, Loader } from "../components";
import { useGlobalContext } from "../context/GlobalProvider";

const Welcome = () => {
  const { loading, isLogged, user } = useGlobalContext();

  if (!loading && isLogged) {
    if (user.email === "admin@mail.com") {
      // Navigate to admin page
      return <Redirect href="/admin-home" />;
    } else {
      // Regular user
      return <Redirect href="/home" />;
    }
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <Loader isLoading={loading} />

      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="w-full flex justify-center items-center h-full px-4">
          {/* <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          /> */}

          <Image
            source={images.Book}
            className="max-w-[280px] w-full h-[298px]"
            // resizeMode="contain"
            style={{
              // width: 300,
              borderColor: "white",
              borderWidth: 3,
              borderStyle: "solid",
              borderRadius: 20,
            }}
          />

          <View className="relative mt-5">
            <Text className="text-3xl text-white font-bold text-center">
              Discover Endless{"\n"}
              Possibilities with{" "}
              {/* <Text className="text-secondary-200">Aora</Text> */}
              Online manual purchase
            </Text>

            <Image
              source={images.path}
              className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
              resizeMode="contain"
            />
          </View>

          <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
            Where Creativity Meets Innovation: Embark on a Journey of Limitless
            Exploration and manual purchase
          </Text>

          <CustomButton
            title="Sign In"
            handlePress={() => router.push("/sign-in")}
            containerStyles="w-[80%] mt-7"
          />
        </View>
      </ScrollView>

      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default Welcome;
