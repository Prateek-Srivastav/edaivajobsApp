import React from "react";
import { View, StyleSheet } from "react-native";

import Colors from "../../constants/Colors";
import AddExperienceScreen from "./AddExperienceScreen";
import AddAcademicsScreen from "./AddAcademicsScreen";
import AddAchievementsScreen from "./AddAchievementsScreen";
import AddCertificationsScreen from "./AddCertificationsScreen";
import AddPatentsScreen from "./AddPatentsScreen";
import AddProjectsScreen from "./AddProjectsScreen";
import AddPublicationsScreen from "./AddPublicationsScreen";
import AddSkillsScreen from "./AddSkillsScreen";
import AddSocialLinksScreen from "./AddSocialLinksScreen";
import PersonalDetailsScreen from "./PersonalDetailsScreen";

function EditProfileDetailScreen({ route }) {
  const component = route.params.component;
  const data = route.params.data;
  let renderScreen;

  if (component === "personal")
    renderScreen = <PersonalDetailsScreen data={data} />;
  else if (component === "exp") renderScreen = <AddExperienceScreen />;
  else if (component === "acad") renderScreen = <AddAcademicsScreen />;
  else if (component === "skills") renderScreen = <AddSkillsScreen />;
  else if (component === "projs") renderScreen = <AddProjectsScreen />;
  else if (component === "certs") renderScreen = <AddCertificationsScreen />;
  else if (component === "pubs") renderScreen = <AddPublicationsScreen />;
  else if (component === "patents") renderScreen = <AddPatentsScreen />;
  else if (component === "achievements")
    renderScreen = <AddAchievementsScreen />;
  else if (component === "socialLinks") renderScreen = <AddSocialLinksScreen />;

  return <View style={styles.container}>{renderScreen}</View>;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.bg,
    flex: 1,
  },
});

export default EditProfileDetailScreen;
