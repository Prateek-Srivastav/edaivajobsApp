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

function PatentDetails({ data, patent, index, viewing }) {
  const navigation = useNavigation();

  const { request: updateProfile } = useApi(candidateApi.updateProfile);

  const deleteHandler = () => {
    const patents = data.patents;
    patents.splice(index, 1);

    updateProfile(data.id, { patents });
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <NormalText>
          {patent.title} ({patent.status})
        </NormalText>
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
                  component: "patents",
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
      <SmallText>Patent Office: {patent.patent_office}</SmallText>
      <SmallText>Issue Date: {formattedDate(patent.issue_date)}</SmallText>
      <SmallText>Description: {patent.description}</SmallText>
      {patent.link && (
        <View
          style={{
            flexDirection: "row",
            // justifyContent: "center",
            alignItems: "center",
            marginTop: 7,
          }}
        >
          <SmallText style={{ color: Colors.primary }}>{patent.link}</SmallText>
        </View>
      )}
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

export default PatentDetails;
