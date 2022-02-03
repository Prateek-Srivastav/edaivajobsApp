import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

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

function AcademicDetails({ data, academic, index, viewing }) {
  const navigation = useNavigation();

  const {
    error,
    loading,
    request: updateProfile,
  } = useApi(candidateApi.updateProfile);
  console.log(data);

  const deleteHandler = () => {
    const academic = data.qualification;
    academic.splice(index, 1);

    updateProfile(data.id, { qualification: academic });
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <NormalText>{academic.degree}</NormalText>
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
                  component: "acad",
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
      {academic.specialization !== "" && (
        <View
          style={{
            flexDirection: "row",
            // justifyContent: "center",
            alignItems: "center",
            marginTop: 7,
          }}
        >
          <SmallText>
            With specialization in {academic.specialization}
          </SmallText>
        </View>
      )}
      <View
        style={{
          flexDirection: "row",
          // justifyContent: "center",
          alignItems: "center",
          marginTop: 7,
          marginBottom: 12,
        }}
      >
        <SmallText>
          {academic.institute} From {formattedDate(academic.start_date)} to{" "}
          {academic.pursuing ? "Present" : formattedDate(academic.end_date)}
        </SmallText>
      </View>

      <SmallText style={{ marginStart: 0 }}>Grade: {academic.grade}</SmallText>
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

export default AcademicDetails;
