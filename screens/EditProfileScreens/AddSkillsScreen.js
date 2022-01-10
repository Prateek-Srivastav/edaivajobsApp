import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import Slider from "@react-native-community/slider";

import CardInput from "../../components/CardInput";
import Colors from "../../constants/Colors";
import AppText from "../../components/AppText";
import CustomButton from "../../components/CustomButton";

function AddSkillsScreen(props) {
  const [range, setRange] = useState("0 ");
  const [sliding, setSliding] = useState("inactive");

  return (
    <View style={styles.container}>
      <CardInput label="Skill" placeholder="xyz" />
      <AppText style={{ marginTop: 15 }}>
        How would you rate yourself in “That skill”.
      </AppText>
      <View style={{ paddingBottom: 10 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            marginRight: 10,
          }}
        >
          <AppText
            style={{
              textAlign: "right",
              fontFamily: "OpenSans-Bold",
              color: Colors.primary,
              fontSize: 16,
              marginBottom: 4,
            }}
          >
            {range}
          </AppText>
          <AppText style={{ fontSize: 16 }}> /10</AppText>
        </View>
        <Slider
          style={{ width: "100%", marginTop: 10 }}
          minimumTrackTintColor={Colors.primary}
          maximumTrackTintColor={Colors.primary}
          thumbTintColor={Colors.primary}
          minimumValue={0}
          maximumValue={10}
          value={parseInt(range)}
          onValueChange={(value) => setRange(parseInt(value))}
          onSlidingStart={() => setSliding("Sliding")}
          onSlidingComplete={() => setSliding("Inactive")}
        />
      </View>
      <CustomButton title="Add" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
    padding: 15,
  },
});

export default AddSkillsScreen;
