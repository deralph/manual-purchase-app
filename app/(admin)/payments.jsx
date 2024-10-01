import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";

import { getAllPurchase, signOut } from "../../lib/appwrite"; // Create a new Appwrite function to fetch payments
import { EmptyState } from "../../components";
import useAppwrite from "../../lib/useAppwrite";
import { icons } from "../../constants";
import { router } from "expo-router";
import { useGlobalContext } from "../../context/GlobalProvider";

const AdminPayments = () => {
  const { data: payments, loading } = useAppwrite(() => getAllPurchase());
  console.log("payments = ", payments);
  const { setUser, setIsLogged } = useGlobalContext();

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLogged(false);

    router.replace("/sign-in");
  };

  if (loading) {
    return (
      <SafeAreaView className="bg-primary h-full justify-center items-center">
        <ActivityIndicator size="large" color="#fff" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="w-full flex justify-center h-full px-4 my-6">
        <FlatList
          data={payments}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => (
            <View className="bg-gray-100 p-4 my-2 rounded">
              <Text>Name : {item.Name}</Text>
              <Text>Amount : {item.Price}</Text>
              <Text>Matric number : {item.users.matricNo}</Text>
              <Text>Message : {item.message}</Text>
              <Text>Status : {item.status}</Text>
              <Text>Status : {item.users.email}</Text>
              <Text>
                Date: {new Date(item.$createdAt).toLocaleDateString()}
              </Text>
            </View>
          )}
          ListEmptyComponent={() => (
            <EmptyState
              title="No Purchse Found"
              subtitle="No manual have been bought"
            />
          )}
          ListHeaderComponent={() => (
            <View className="w-full flex justify-center items-center mt-6 mb-12 px-4">
              <Text className="text-2xl font-semibold text-white mt-10 font-psemibold">
                All Payments
              </Text>
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
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default AdminPayments;

// const payments = [
//   {
//     $collectionId: "668fe773002baf0ee4f7",
//     $createdAt: "2024-08-28T16:09:22.765+00:00",
//     $databaseId: "668fe6ea003beb9dd282",
//     $id: "66cf4bb2ba1a2948a975",
//     $permissions: [
//       'read("user:668fed24508403ef8c4d")',
//       'update("user:668fed24508403ef8c4d")',
//       'delete("user:668fed24508403ef8c4d")',
//     ],
//     $updatedAt: "2024-08-28T16:09:22.765+00:00",
//     Author: "Unknown",
//     Name: "CSC 102",
//     Price: "1500",
//     message: "Approved",
//     redirecturl: "?trxref=T194446389501360&reference=T194446389501360",
//     reference: "T194446389501360",
//     status: "success",
//     trans: "4120994843",
//     transaction: "4120994843",
//     trxref: "T194446389501360",
//     users: {
//       $collectionId: "668fe721003818768381",
//       $createdAt: "2024-07-11T14:33:09.849+00:00",
//       $databaseId: "668fe6ea003beb9dd282",
//       $id: "668fed25cf2663250db7",
//       $permissions: [Array],
//       $updatedAt: "2024-07-11T14:33:09.849+00:00",
//       accountId: "668fed24508403ef8c4d",
//       email: "victor@mail.com",
//       matricNo: "190404000",
//     },
//   },
//   {
//     $collectionId: "668fe773002baf0ee4f7",
//     $createdAt: "2024-07-12T09:44:02.554+00:00",
//     $databaseId: "668fe6ea003beb9dd282",
//     $id: "6690fae2867b4a99bb26",
//     $permissions: [
//       'read("user:668fed24508403ef8c4d")',
//       'update("user:668fed24508403ef8c4d")',
//       'delete("user:668fed24508403ef8c4d")',
//     ],
//     $updatedAt: "2024-07-12T09:44:02.554+00:00",
//     Author: "Unknown",
//     Name: "CSC 102",
//     Price: "1500",
//     message: "Approved",
//     redirecturl: "?trxref=T221834360277621&reference=T221834360277621",
//     reference: "T221834360277621",
//     status: "success",
//     trans: "3972433250",
//     transaction: "3972433250",
//     trxref: "T221834360277621",
//     users: {
//       $collectionId: "668fe721003818768381",
//       $createdAt: "2024-07-11T14:33:09.849+00:00",
//       $databaseId: "668fe6ea003beb9dd282",
//       $id: "668fed25cf2663250db7",
//       $permissions: [Array],
//       $updatedAt: "2024-07-11T14:33:09.849+00:00",
//       accountId: "668fed24508403ef8c4d",
//       email: "victor@mail.com",
//       matricNo: "190404000",
//     },
//   },
// ];
