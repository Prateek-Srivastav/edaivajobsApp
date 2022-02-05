import React, { useEffect, useState } from "react";
import {
  Image,
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

import cache from "../../utilities/cache";
import candidateApi from "../../api/candidate";
import Card from "../../components/Card";
import CardInput from "../../components/CardInput";
import Colors from "../../constants/Colors";
import Error from "../../components/Error";
import NetworkError from "../../components/NetworkError";
import useApi from "../../hooks/useApi";
import Loading from "../../components/Loading";
import PersonalDetails from "../../components/profileDetails/PersonalDetails";
import ViewAbout from "../../components/profileDetails/ViewAbout";
import ExperienceDetails from "../../components/profileDetails/ExperienceDetails";
import refreshAccessToken from "../../utilities/refreshAccessToken";
import { Pencil } from "../../assets/svg/icons";
import AcademicDetails from "../../components/profileDetails/AcademicDetails";
import SkillDetails from "../../components/profileDetails/SkillDetails";
import ProjectDetails from "../../components/profileDetails/ProjectDetails";
import CertificationDetails from "../../components/profileDetails/CertificationDetails";
import AchievementDetails from "../../components/profileDetails/AchievementDetails";
import PublicationDetails from "../../components/profileDetails/PublicationDetails";
import PatentDetails from "../../components/profileDetails/PatentDetails";
import SocialLinkDetails from "../../components/profileDetails/SocialLinkDetails";
import Toast from "react-native-toast-message";

const { width, height } = Dimensions.get("window");

const SmallText = (props) => (
  <Text style={styles.smallText}>{props.children}</Text>
);

const NormalText = (props) => (
  <Text style={styles.normalText}>{props.children}</Text>
);

const LargeText = (props) => (
  <Text style={styles.largeText}>{props.children}</Text>
);

function EditProfileScreen() {
  const [user, setUser] = useState({});
  const [aboutFocused, setAboutFocused] = useState(false);
  const [about, setAbout] = useState();
  const [galleryPermission, setGalleryPermission] = useState(null);
  const [imageUri, setImageUri] = useState("../../assets/dummyDP.png");

  const navigation = useNavigation();

  const {
    data,
    error,
    networkError,
    loading,
    tokenValid,
    request: loadProfile,
  } = useApi(candidateApi.getProfile);

  const {
    error: aboutUpdateError,
    loading: aboutUpdateLoading,
    request: updateProfile,
  } = useApi(candidateApi.updateProfile);

  const isFocused = useIsFocused();

  useEffect(async () => {
    loadProfile();
    if (!tokenValid) {
      console.log(tokenValid);
      await refreshAccessToken();
      await loadProfile();
    }
    const userDetail = await cache.get("user");
    setUser(userDetail);
    setAbout(data.description);
    async () => {
      const { granted } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setGalleryPermission(granted);
    };
  }, [isFocused]);

  const {
    // data,
    // error,
    request: updateProfilePic,
  } = useApi(candidateApi.uploadProfilePicture);

  const uploadImage = (binImg) => {
    const form = new FormData();
    form.append("image[image]", {
      name: "media_file",
      uri: binImg,
      type: "image/jpg",
    });
    const headers = {
      "Content-Type": "multipart/form-data",
    };
    updateProfilePic(form);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true,
    });
    // result.base64

    function binEncode(data) {
      var binArray = [];
      var datEncode = "";

      for (var i = 0; i < data.length; i++) {
        binArray.push(data[i].charCodeAt(0).toString(2));
      }
      for (var j = 0; j < binArray.length; j++) {
        var pad = padding_left(binArray[j], "0", 8);
        datEncode += pad + " ";
      }
      function padding_left(s, c, n) {
        if (!s || !c || s.length >= n) {
          return s;
        }
        var max = (n - s.length) / c.length;
        for (var i = 0; i < max; i++) {
          s = c + s;
        }
        return s;
      }
      console.log(JSON.stringify(binArray));

      return binArray;
    }

    if (!result.cancelled) {
      const data = new FormData();
      //   data.append("image", {
      //     name: "media_file",
      //     filename:
      //  })

      setImageUri(result.uri);
      binEncode(result.base64);
      uploadImage(imageUri);
    }
  };

  if (galleryPermission === false)
    return Toast.show({
      type: "appError",
      text1: "No access to media storage.",
    });

  if (networkError && !loading) return <NetworkError onPress={loadProfile} />;

  if (error) return <Error onPress={loadProfile} />;

  const handleAboutSubmit = (text) => {
    updateProfile(data.id, { description: about });
    setAboutFocused(false);
  };

  const DetailHeading = ({ label, onPress }) => (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        // borderWidth: 1,
        width: "100%",
      }}
    >
      <SmallText>{label}</SmallText>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {/* <View style={styles.buttonContainer}> */}
        <TouchableOpacity onPress={onPress}>
          <View style={styles.button}>
            <Pencil />
          </View>
        </TouchableOpacity>

        {/* </View> */}
      </View>
    </View>
  );

  const AddDetails = (props) => {
    return (
      <>
        <View
          style={{
            marginHorizontal: 15,
            marginBottom: props.isNotLine ? 20 : 0,
          }}
        >
          <SmallText>{props.label}</SmallText>
          {props.children}
          <TouchableOpacity
            onPress={props.onPress}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
              marginBottom: 5,
            }}
          >
            <AntDesign
              name="plus"
              size={17}
              color={Colors.primary}
              style={{ marginRight: 10 }}
            />
            <NormalText>Add {props.label}</NormalText>
          </TouchableOpacity>
        </View>
        {!props.isNotLine && <View style={styles.line} />}
      </>
    );
  };

  return loading || !data ? (
    <Loading />
  ) : (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          elevation: 3,
          borderRadius: 9,
          paddingVertical: 20,
          backgroundColor: "white",
          marginBottom: 5,
        }}
      >
        <TouchableOpacity onPress={pickImage}>
          <Image
            source={{ uri: imageUri }}
            style={{ height: 70, width: 70, marginRight: 5, marginLeft: 8 }}
          />
        </TouchableOpacity>
        <View style={{ width: "70%", marginRight: 5 }}>
          <LargeText>
            {user.firstname} {user.lastname}
          </LargeText>
          {data.designation && (
            <Card style={{ justifyContent: "flex-start", paddingVertical: 5 }}>
              <NormalText>{data.designation}</NormalText>
            </Card>
          )}
        </View>
      </View>
      <ScrollView>
        <PersonalDetails
          data={data}
          onPress={() =>
            navigation.navigate("EditProfileDetail", {
              component: "personal",
              data,
            })
          }
        />

        <View style={{ ...styles.line, marginTop: 15 }} />
        <View style={{ marginHorizontal: 15 }}>
          <DetailHeading
            label="About"
            onPress={() => setAboutFocused(!aboutFocused)}
          />
          {!aboutFocused ? (
            aboutUpdateLoading ? (
              <Loading />
            ) : (
              <ViewAbout data={about ? about : data.description} />
            )
          ) : (
            <CardInput
              // style={{ marginBottom: 10 }}
              numberOfLines={6}
              multiline
              placeholder="Tell something about you..."
              defaultValue={about ? about : data.description}
              onBlur={handleAboutSubmit}
              onChangeText={(text) => setAbout(text)}
              onSubmitEditing={handleAboutSubmit}
            />
          )}
        </View>
        <View style={styles.line} />
        <AddDetails
          label="Experience"
          onPress={() =>
            navigation.navigate("EditProfileDetail", {
              component: "exp",
              data: data,
            })
          }
        >
          {data.experience.map((exp) => (
            <ExperienceDetails
              experience={exp}
              data={data}
              index={data.experience.indexOf(exp)}
            />
          ))}
        </AddDetails>
        <AddDetails
          label="Academics"
          onPress={() =>
            navigation.navigate("EditProfileDetail", {
              component: "acad",
              data,
            })
          }
        >
          {data.qualification.map((qual) => (
            <AcademicDetails
              academic={qual}
              data={data}
              index={data.qualification.indexOf(qual)}
            />
          ))}
        </AddDetails>
        <AddDetails
          label="Skills"
          onPress={() =>
            navigation.navigate("EditProfileDetail", {
              component: "skills",
              data,
            })
          }
        >
          {data.skills.map((skill) => (
            <SkillDetails
              skill={skill}
              data={data}
              index={data.skills.indexOf(skill)}
            />
          ))}
        </AddDetails>
        <AddDetails
          label="Projects"
          onPress={() =>
            navigation.navigate("EditProfileDetail", {
              component: "projs",
              data,
            })
          }
        >
          {data.projects.map((project) => (
            <ProjectDetails
              project={project}
              data={data}
              index={data.projects.indexOf(project)}
            />
          ))}
        </AddDetails>
        <AddDetails
          label="Certifications"
          onPress={() =>
            navigation.navigate("EditProfileDetail", {
              component: "certs",
              data,
            })
          }
        >
          {data.certifications.map((certification) => (
            <CertificationDetails
              certification={certification}
              data={data}
              index={data.certifications.indexOf(certification)}
            />
          ))}
        </AddDetails>
        <AddDetails
          label="Publications"
          onPress={() =>
            navigation.navigate("EditProfileDetail", {
              component: "pubs",
              data,
            })
          }
        >
          {data.publications.map((publication) => (
            <PublicationDetails
              publication={publication}
              data={data}
              index={data.publications.indexOf(publication)}
            />
          ))}
        </AddDetails>
        <AddDetails
          label="Patents"
          onPress={() =>
            navigation.navigate("EditProfileDetail", {
              component: "patents",
              data,
            })
          }
        >
          {data.patents.map((patent) => (
            <PatentDetails
              patent={patent}
              data={data}
              index={data.patents.indexOf(patent)}
            />
          ))}
        </AddDetails>
        <AddDetails
          label="Achievements"
          onPress={() =>
            navigation.navigate("EditProfileDetail", {
              component: "achievements",
              data,
            })
          }
        >
          {data.achievements.map((achievement) => (
            <AchievementDetails
              achievement={achievement}
              data={data}
              index={data.achievements.indexOf(achievement)}
            />
          ))}
        </AddDetails>
        <AddDetails
          isNotLine
          label="Social Links"
          onPress={() =>
            navigation.navigate("EditProfileDetail", {
              component: "socialLinks",
              data,
            })
          }
        >
          <SocialLinkDetails sociallinks={data.sociallinks} />
        </AddDetails>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 36,
    width: 36,
    // borderWidth: 1,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    right: -9,
  },
  buttonContainer: {
    height: 36,
    width: 36,
    // borderWidth: 1,
    borderRadius: 18,
    overflow: "hidden",
    // position: "absolute",
    // right: 30,
  },
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    // alignSelf: "space-around",
    backgroundColor: Colors.bg,
    // paddingTop: 40,
  },
  line: {
    // height: 27,
    // alignSelf: "center",
    width: "85%",
    height: 1.6,
    borderRadius: 10,
    // marginHorizontal: 5,
    alignSelf: "center",
    backgroundColor: Colors.grey,
    elevation: 1,
    marginTop: 10,
    marginBottom: 20,
    opacity: 0.1,
  },
  smallText: {
    fontFamily: "OpenSans-Medium",
    fontSize: 15.5,
    color: Colors.primary,
  },
  normalText: {
    fontFamily: "OpenSans-SemiBold",
    fontSize: 17,
    color: Colors.primary,
  },
  largeText: {
    fontFamily: "OpenSans-Bold",
    fontSize: 22,
    color: Colors.primary,
    // marginBottom: 5,
  },
});

export default EditProfileScreen;
