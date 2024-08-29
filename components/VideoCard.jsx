import { useState } from "react";
import { ResizeMode, Video } from "expo-av";
import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

import { icons, images } from "../constants";
import CustomButton from "./CustomButton";
import { router } from "expo-router";
import { Paystack } from "react-native-paystack-webview";
import { createPurchase } from "../lib/appwrite";
import { useGlobalContext } from "../context/GlobalProvider";

const VideoCard = ({ id, Name, Author, Desc, Price, details, image }) => {
  // console.log(id);
  const [isSubmitting, setSubmitting] = useState(false);
  const { user } = useGlobalContext();

  const makePayment = async (res) => {
    paymentDetails = {
      Name,
      Author,
      Price,
      ...res.transactionRef,
      users: user.$id,
    };
    console.log(paymentDetails);
    try {
      const purchase = await createPurchase(paymentDetails);
      console.log(purchase);

      Alert.alert("Success", "Payment successfull");
      router.replace("home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  // const [play, setPlay] = useState(false);
  // console.log("in video card");

  return (
    <View className="flex flex-col items-center px-4 mb-14">
      <View className="flex flex-row gap-3 items-start">
        <View className="flex justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary flex justify-center items-center p-0.5">
            {/* <Image
              source={{ uri: avatar }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            /> */}
            <FontAwesome5 name="book" size={30} color="white" />
          </View>

          <View className="flex justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="font-psemibold text-sm text-white"
              numberOfLines={1}
            >
              {Name}
            </Text>
            <Text
              className="text-xs text-gray-100 font-pregular"
              numberOfLines={1}
            >
              {Author}
            </Text>
          </View>
        </View>
        <View className="pt-2">
          {/* <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" /> */}
          <Text className="font-psemibold text-base text-white text-left">
            Price
          </Text>
          <Text className="text-xs  text-gray-100 font-pregular">#{Price}</Text>
        </View>
      </View>

      {/* {play ? (
        <Video
          source={{ uri: video }}
          className="w-full h-60 rounded-xl mt-3"
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) {
              setPlay(false);
            }
          }}
        />
      ) : ( */}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => router.push(`/search/${id}`)}
        className="w-full h-60 rounded-xl mt-3 relative flex justify-center items-center"
      >
        <Image
          source={image}
          className="w-full h-full rounded-xl mt-3"
          resizeMode="stretch"
        />

        {/* <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          /> */}
      </TouchableOpacity>
      {/* )} */}
      {details ? (
        <View className="mt-10 w-full">
          <Text className="font-psemibold text-base text-white text-left">
            Price :{" "}
            <Text className="text-xs text-gray-100 font-pregular">
              #{Price}
            </Text>
          </Text>
          <Text className="font-psemibold text-base text-white my-3">
            Description :{"\n"}{" "}
            <Text className="text-xs text-gray-100 font-pregular">{Desc}</Text>
          </Text>
          <Text className="font-psemibold text-base text-white">
            Author :{" "}
            <Text className="text-xs text-gray-100 font-pregular">
              {Author}
            </Text>
          </Text>
          <CustomButton
            title="Buy Now"
            handlePress={() => setSubmitting(true)}
            containerStyles="w-3/4 mt-7"
            // isLoading={isSubmitting}
          />
        </View>
      ) : null}
      {isSubmitting ? (
        <Paystack
          paystackKey="pk_test_62ba3fa4e30ace38c25feca74eae65646f1cf095"
          amount={Price}
          billingEmail="paystackwebview@something.com"
          activityIndicatorColor="rgb(255,156,1)"
          onCancel={(e) => {
            // handle response here
            console.log(e);
            Alert.alert("Error", "An error occurred please try again");
            setSubmitting(false);
          }}
          onSuccess={(res) => {
            // handle response here
            console.log(res);
            if (res.data.event === "successful") {
              makePayment(res);
            }
          }}
          autoStart={true}
        />
      ) : null}
    </View>
  );
};

export default VideoCard;
