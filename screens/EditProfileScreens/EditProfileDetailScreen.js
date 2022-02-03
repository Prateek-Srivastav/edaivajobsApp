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
  const index = route.params.index;

  let renderScreen;

  if (component === "personal")
    renderScreen = <PersonalDetailsScreen data={data} />;
  else if (component === "exp")
    renderScreen = <AddExperienceScreen data={data} index={index} />;
  else if (component === "acad")
    renderScreen = <AddAcademicsScreen data={data} index={index} />;
  else if (component === "skills")
    renderScreen = <AddSkillsScreen data={data} index={index} />;
  else if (component === "projs")
    renderScreen = <AddProjectsScreen data={data} index={index} />;
  else if (component === "certs")
    renderScreen = <AddCertificationsScreen data={data} index={index} />;
  else if (component === "pubs")
    renderScreen = <AddPublicationsScreen data={data} index={index} />;
  else if (component === "patents")
    renderScreen = <AddPatentsScreen data={data} index={index} />;
  else if (component === "achievements")
    renderScreen = <AddAchievementsScreen data={data} index={index} />;
  else if (component === "socialLinks")
    renderScreen = <AddSocialLinksScreen data={data} />;

  return <View style={styles.container}>{renderScreen}</View>;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.bg,
    flex: 1,
  },
});

export default EditProfileDetailScreen;
