import React from "react";
import { View, StyleSheet, Image, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const CarouselItem = ({ item }) => {
  return (
    <View style={styles.cardView}>
      <Image style={styles.image} source={item.img} />
    </View>
  );
};

const styles = StyleSheet.create({
  cardView: {
    // flex: 1,
    width: width - 50,
    height: height / 3,
    backgroundColor: "blue",
    // borderWidth: 1,
    // margin: 10,
    // borderRadius: 10,
    // shadowColor: "#000",
    // shadowOffset: { width: 0.5, height: 0.5 },
    // shadowOpacity: 0.5,
    // shadowRadius: 3,
    // elevation: 5,
  },

  image: {
    width: "100%",
    height: height / 2.5,
    // borderWidth: 1,
    // height: 300,
    // borderRadius: 10,
  },
});

export default CarouselItem;
