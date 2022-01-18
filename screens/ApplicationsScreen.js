import React from "react";
import { FlatList, View, StyleSheet } from "react-native";

import ApplicationItemCard from "../components/ApplicationsItemCard";
import Colors from "../constants/Colors";
import dummyData from "../dummyData.js/data";

function ApplicationsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={{
          paddingHorizontal: 15,
          paddingBottom: 20,
        }}
        data={dummyData}
        renderItem={(itemData) => (
          <ApplicationItemCard
            onPress={() =>
              navigation.navigate("ApplicationStatus", { itemData })
            }
            heading={itemData.item.heading}
            companyName={itemData.item.companyName}
            jobType={itemData.item.jobType}
            location={itemData.item.location}
            description={itemData.item.description}
            postedDate={itemData.item.postedDate}
            isApplied={itemData.item.isApplied}
            applicationStatus={itemData.item.applicationStatus}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
});

export default ApplicationsScreen;
