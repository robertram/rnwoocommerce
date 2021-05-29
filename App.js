import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import base64 from "base-64";

const queryClient = new QueryClient();

function Products() {
  let url = "https://rnwoocommerce.sanmartincr.com/wp-json/wc/v2/products";
  let username = "ck_c3b80ce83ff3bcf1ee0b91c6e65ddaadad88bfde";
  let password = "cs_52991d227a5ef9def88b1c24a653831c87637705";

  const { isLoading, error, data } = useQuery(
    "repoData",
    async () =>
      await fetch(url, {
        headers: new Headers({
          Authorization: `Basic ${base64.encode(`${username}:${password}`)}`,
        }),
      }).then((res) => res.json())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Products</Text>
      <ScrollView style={styles.scrollView}>
        {!isLoading &&
          data.map((item, index) => {
            return (
              <View key={index} style={styles.productContainer}>
                <Image
                  src={{ uri: item.images[0].src }}
                  style={styles.productImage}
                ></Image>
                <Text style={styles.productText}>{item.name}</Text>
                <Text style={styles.productText}>{item.price}</Text>
              </View>
            );
          })}
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Products} />
          <Stack.Screen name="Config" component={Products} />
        </Stack.Navigator>
      </QueryClientProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    margin: 10,
    color: "white",
  },
  container: {
    flex: 1,
    backgroundColor: "#9FC490",
    alignItems: "center",
    justifyContent: "center",
  },
  productContainer: {
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3,
    borderColor: "#232528",
    backgroundColor: "#82A3A1",
    borderWidth: 2,
    borderRadius: 20,
    padding: 10,
    width: "100%",
    marginVertical: 10,
  },
  productText: {
    color: "white",
  },
  productImage: {
    padding: 5,
    width: 107,
  },
  scrollView: {
    padding: 5,
    width: "100%",
  },
});
