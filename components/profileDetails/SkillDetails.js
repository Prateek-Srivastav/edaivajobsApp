import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Slider from "@react-native-community/slider";

import { BuildingIcon, Pencil, Trash } from "../../assets/svg/icons";
import { formattedDate } from "../../utilities/date";
import Colors from "../../constants/Colors";
import useApi from "../../hooks/useApi";
import candidateApi from "../../api/candidate";

const SmallText = (props) => (
  <Text style={{ ...styles.smallText, ...props.style }}>{props.children}</Text>
);

const NormalText = (props) => (
  <Text style={styles.normalText}>{props.children}</Text>
);

function SkillDetails({ data, skill, index, viewing }) {
  const navigation = useNavigation();

  const {
    error,
    loading,
    request: updateProfile,
  } = useApi(candidateApi.updateProfile);
  console.log(data);

  const deleteHandler = () => {
    const skills = data.skills;
    skills.splice(index, 1);

    updateProfile(data.id, { skills });
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <NormalText>{skill.skill_name}</NormalText>
        {!viewing && (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "15%",
            }}
          >
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("EditProfileDetail", {
                  component: "skills",
                  data: data,
                  index: index,
                })
              }
            >
              <Pencil />
            </TouchableOpacity>
            <TouchableOpacity onPress={deleteHandler}>
              <Trash />
            </TouchableOpacity>
          </View>
        )}
      </View>
      <Slider
        style={{ width: "100%", marginTop: 10 }}
        minimumTrackTintColor={Colors.primary}
        maximumTrackTintColor={Colors.primary}
        thumbTintColor={Colors.primary}
        minimumValue={0}
        maximumValue={10}
        value={parseInt(skill.level)}
        disabled
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
  },

  smallText: {
    fontFamily: "OpenSans-Regular",
    fontSize: 15,
    color: Colors.grey,
    marginStart: 7,
  },
  normalText: {
    fontFamily: "OpenSans-Medium",
    fontSize: 16,
    color: Colors.grey,
  },
});

export default SkillDetails;
