import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { FontAwesome, Octicons, Ionicons } from "@expo/vector-icons";

import AppText from "../components/AppText";
import Card from "../components/Card";
import Colors from "../constants/Colors";

function JobDetailScreen({ route }) {
  console.log(route.params.itemData.item);
  const item = route.params.itemData.item;

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <View style={{}}>
          <Text style={styles.heading}>{item.heading}</Text>
        </View>
        <View
          style={{
            // flex: 1,
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 7,
            paddingStart: 3,
          }}
        >
          <FontAwesome
            name="building"
            size={15}
            color="#BDEEFF"
            style={{
              marginLeft: -1.6,
              marginRight: 5,
            }}
          />
          <Text style={styles.text}>{item.companyName}</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons
            name="location-sharp"
            size={19}
            color="#BDEEFF"
            style={{
              marginLeft: -2.5,
              marginRight: 3,
            }}
          />
          <Text style={styles.text}>{item.location}</Text>
        </View>
      </Card>
      <Text>This is Job Detail Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    top: -5,
    flexDirection: "column",
    flex: 0.4,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.secondary,
  },
  heading: {
    fontFamily: "OpenSans-SemiBold",
    fontSize: 25,
    color: Colors.primary,
  },
  text: {
    fontFamily: "OpenSans-Regular",
    color: Colors.primary,
    fontSize: 15,
  },
});

export default JobDetailScreen;
