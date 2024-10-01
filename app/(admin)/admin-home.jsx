import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Alert, ScrollView } from "react-native";
import { CustomButton, FormField } from "../../components";

import { createAnnouncement } from "../../lib/appwrite"; // Create a new Appwrite function to store announcements

const AdminDashboard = () => {
  const [announcement, setAnnouncement] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitAnnouncement = async () => {
    if (!announcement) {
      Alert.alert("Error", "Announcement cannot be empty");
      return;
    }

    setIsSubmitting(true);

    try {
      const announce = await createAnnouncement(announcement); // Call Appwrite function to create the announcement
      console.log(announce);
      Alert.alert("Success", "Announcement posted successfully");
      setAnnouncement("");
    } catch (error) {
      console.log(error);
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full flex justify-center h-full px-4 my-6">
          <Text className="text-2xl font-semibold text-white mt-10 font-psemibold">
            Admin Dashboard
          </Text>

          <Text className="text-lg text-white mt-10">
            Create an Announcement
          </Text>

          <FormField
            title="Enter Announcement"
            value={announcement}
            handleChangeText={setAnnouncement}
            otherStyles="mt-7"
            multiline
          />
          <CustomButton
            title={isSubmitting ? "Submitting..." : "Submit Announcement"}
            handlePress={submitAnnouncement}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AdminDashboard;
