import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import RenderHtml, { defaultSystemFonts } from "react-native-render-html";

import AppModal from "../components/AppModal";
import ApplicationModalContent from "../components/ApplicationModalContent";
import { BuildingIcon, Location } from "../assets/svg/icons";
import AppText from "../components/AppText";
import Card from "../components/Card";
import Colors from "../constants/Colors";
import CustomButton from "../components/CustomButton";
import jobsApi from "../api/jobs";
import { formattedDate } from "../utilities/date";

import dummyJobDetails from "../dummyData.js/dummyJobDetails";
import cache from "../utilities/cache";

const { width, height } = Dimensions.get("window");

const NormalText = ({ children }) => (
  <Text
    style={{
      color: Colors.black,
      fontFamily: "OpenSans-Regular",
      fontSize: 14.5,
      marginTop: 5,
      marginBottom: 10,
    }}
  >
    {children}
  </Text>
);

function JobDetailScreen({ route }) {
  const [showDetail, setShowDetail] = useState(1);
  const [isPressed, setIsPressed] = useState(false);
  const [position] = useState(new Animated.ValueXY());

  const jobId = route.params.jobId;

  const [jobDetails, setJobDetails] = useState(dummyJobDetails);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [networkError, setNetworkError] = useState(false);

  // let jobDetails;
  const loadJobDetails = async (jobId) => {
    setLoading(true);
    const response = await jobsApi.getJobDetails(jobId);

    if (!response.ok) {
      setLoading(false);

      if (response.problem === "NETWORK_ERROR") return setNetworkError(true);
      else return setError(true);
    }
    setNetworkError(false);
    setError(false);
    setJobDetails(response.data);
    setLoading(false);
  };

  useEffect(() => {
    loadJobDetails(jobId);
  }, []);

  const [inWishlist, setInWishlist] = useState(false);

  const wishlistStatus = async () => {
    const wishlist = await cache.get("wishlist");
    const status = wishlist.find((job) => job.id === jobDetails._id);
    if (status) return setInWishlist(true);
    else return setInWishlist(false);
  };
  wishlistStatus();

  const addToWishlist = async () => {
    if (route.params.isApplied) return;

    const wl = await cache.get("wishlist");

    cache.store("wishlist", [
      ...wl,
      {
        title: jobDetails.job_title,
        company: jobDetails.company.name,
        id: jobDetails._id,
      },
    ]);
    setInWishlist(true);
  };

  const removeFromWishlist = async () => {
    const wl = await cache.get("wishlist");

    wl.find((job, index) => {
      if (job.id === jobDetails._id) {
        wl.splice(index, 1);
        return true;
      }
    });
    cache.store("wishlist", [...wl]);
    setInWishlist(false);
  };

  const getData = (val) => {
    setIsPressed(false);
  };

  const animStyles = {
    top: 0,
    borderRadius: 20,
    height: 3,
    width: width / 6,
    backgroundColor: Colors.primary,
    transform: position.getTranslateTransform(),
  };

  const Description = ({ show }) => {
    const systemFonts = [...defaultSystemFonts, "OpenSans-Regular"];

    const animate = (value) => {
      Animated.timing(position, {
        toValue: { x: value, y: 0 },
        duration: 160,
        useNativeDriver: true,
      }).start();
    };

    let detail;
    if (show === 1) {
      detail = jobDetails.job_description;
      animate(width / 20);
    } else if (show === 2) {
      detail = jobDetails.job_requirements;
      animate(width / 2.4);
    } else if (show === 3) {
      detail = jobDetails.preferred_qualification;
      animate(width / 1.44);
    }

    return (
      <View
        style={{
          paddingHorizontal: 20,
          // paddingBottom: 20,
          width: "100%",
          marginTop: show === 2 ? 0 : 10,
        }}
      >
        {show !== 3 ? (
          <RenderHtml
            contentWidth={width}
            source={{
              html: detail,
            }}
            systemFonts={systemFonts}
            baseStyle={{
              fontFamily: "OpenSans-Regular",
              fontSize: 14.5,
              color: Colors.black,
            }}
          />
        ) : (
          <>
            <AppText>Minimum Qualification</AppText>
            <RenderHtml
              contentWidth={width}
              source={{
                html: jobDetails.minimum_qualification,
              }}
              systemFonts={systemFonts}
              baseStyle={{
                fontFamily: "OpenSans-Regular",
                fontSize: 14.5,
                color: Colors.black,
              }}
            />
            <AppText>Preferred Qualification</AppText>
            <RenderHtml
              contentWidth={width}
              source={{
                html: jobDetails.preferred_qualification,
              }}
              systemFonts={systemFonts}
              baseStyle={{
                fontFamily: "OpenSans-Regular",
                fontSize: 14.5,
                color: Colors.black,
              }}
            />
            <AppText>Job Supplements</AppText>
            <NormalText>{jobDetails.job_supplement_pay[0].name}</NormalText>
            <AppText>Job Schedule</AppText>
            <NormalText>{jobDetails.job_schedule[0].name}</NormalText>
            {!jobDetails.salary_undisclosed && jobDetails.salary && (
              <>
                <AppText>Salary</AppText>
                <NormalText>
                  ₹{jobDetails.salary.salary_from} - ₹
                  {jobDetails.salary.salary_to} {jobDetails.salary.salary_type}
                </NormalText>
              </>
            )}
            <AppText>Remote</AppText>
            <NormalText>{jobDetails.job_remote.name}</NormalText>
            <AppText>Open Positions</AppText>
            <NormalText>{jobDetails.no_of_vacancy}</NormalText>
          </>
        )}
      </View>
    );
  };
  if (networkError && !loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <AppText>Connection Lost</AppText>
        <CustomButton
          title="Refresh"
          onPress={loadJobDetails}
          style={{ height: 60, flex: 0.1, width: 200 }}
        />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <AppText>Couldn't load jobs</AppText>
        <CustomButton
          title="Retry"
          onPress={loadJobDetails}
          style={{ height: 60, flex: 0.1, width: 200 }}
        />
      </View>
    );
  }
  if (loading)
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );

  return (
    <View
      style={{
        flex: 1,
        width: width,
        height: height,
        backgroundColor: Colors.bg,
      }}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ alignItems: "center" }}
      >
        <View
          style={{
            // flex: 1,
            // borderWidth: 1,
            width: "100%",
            // justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Card style={styles.card}>
            <Text style={styles.heading}>{jobDetails.job_title}</Text>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 7,
              }}
            >
              <BuildingIcon color="#BDEEFF" />
              <Text style={styles.text}>{jobDetails.company.name}</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Location color="#BDEEFF" />
              <Text style={styles.text}>{route.params.location}</Text>
            </View>
            <Card
              style={{
                marginTop: 20,
                paddingHorizontal: 13,
                paddingRight: 3,
                // marginLeft: 0,
                alignSelf: "center",
              }}
            >
              <View style={styles.cardBlue}>
                <AppText style={{ color: Colors.primary }}>
                  {jobDetails.job_type.name}
                </AppText>
              </View>

              {!route.params.isApplied && (
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    marginHorizontal: 3,
                    marginRight: 7,
                  }}
                >
                  <AppText
                    style={{ fontSize: 12, fontFamily: "OpenSans-Medium" }}
                  >
                    Apply by
                  </AppText>
                  <AppText
                    style={{
                      fontSize: 12,
                      fontFamily: "OpenSans-Medium",
                      color: Colors.primary,
                    }}
                  >
                    {formattedDate(jobDetails.job_deadline)}
                  </AppText>
                </View>
              )}
            </Card>
            <Card
              style={{
                flexDirection: "column",
                alignSelf: "center",
                width: "100%",
                // alignItems: "space-evenly",
                paddingHorizontal: 30,
                paddingVertical: 17,
                // backgroundColor: "blue",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 20,
                }}
              >
                <View>
                  <AppText style={{ marginBottom: 6 }}>Degree</AppText>
                  {jobDetails.qualification.map((qual) => (
                    <AppText style={styles.requirementText} key={qual._id}>
                      {qual.name}
                    </AppText>
                  ))}
                </View>
                <View>
                  <AppText style={{ marginBottom: 6 }}>Work Experience</AppText>
                  <AppText style={styles.requirementText}>
                    {jobDetails.job_exp_from}-{jobDetails.job_exp_to} Years
                  </AppText>
                </View>
              </View>
              <View>
                <AppText style={{ marginBottom: 6 }}>Required skills</AppText>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                  }}
                >
                  {jobDetails.skills.map((skill, index) => (
                    <AppText style={styles.requirementText} key={index}>
                      {skill.name}
                    </AppText>
                  ))}
                </View>
              </View>
            </Card>
          </Card>
        </View>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={() => setShowDetail(1)}>
            <AppText style={styles.detailsHeading}>DESCRIPTION</AppText>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowDetail(2)}>
            <AppText style={styles.detailsHeading}>RESPONSIBILITY</AppText>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowDetail(3)}>
            <AppText style={styles.detailsHeading}>MORE</AppText>
          </TouchableOpacity>
        </View>
        <View
          style={{
            // borderWidth: 1,
            width: "85%",
            // marginHorizontal: 20,
            marginTop: 3,
          }}
        >
          <Animated.View style={animStyles} />
        </View>
        <Description show={showDetail} />
      </ScrollView>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
          backgroundColor: Colors.bg,
          marginBottom: 15,
          marginVertical: 10,
          paddingHorizontal: 15,
        }}
      >
        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            elevation: 3,
            height: 40,
            width: 40,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 3,
            backgroundColor: "white",
            padding: 4,
            marginRight: 10,
          }}
          onPress={inWishlist ? removeFromWishlist : addToWishlist}
        >
          <MaterialCommunityIcons
            name={
              inWishlist || inWishlist === undefined
                ? "bookmark-minus"
                : "bookmark-minus-outline"
            }
            size={24}
            color={Colors.primary}
          />
        </TouchableOpacity>
        <CustomButton
          disabled={route.params.isApplied}
          onPress={() => {
            setIsPressed(true);
          }}
          title={route.params.isApplied ? "Applied" : "Apply"}
          style={{ marginVertical: 0 }}
        />
      </View>

      <AppModal
        numOfButton={1}
        heading="Send Application"
        isPressed={isPressed}
        sendData={getData}
      >
        <ApplicationModalContent data={jobDetails} />
      </AppModal>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    top: -5,
    flexDirection: "column",
    // flex: 0.75,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
  },
  cardBlue: {
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 3,
    backgroundColor: Colors.cardBlue,
    paddingVertical: 3,
    marginRight: 10,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    // alignItems: "center",
    backgroundColor: Colors.bg,
    // width: "100%",
    // marginBottom: -10,
  },
  detailsHeading: {
    fontFamily: "OpenSans-SemiBold",
    fontSize: 15,
    color: Colors.primary,
  },
  heading: {
    fontFamily: "OpenSans-Bold",
    fontSize: 25,
    color: Colors.primary,
  },
  loading: {
    flex: 1,
    backgroundColor: Colors.bg,
    justifyContent: "center",
    alignItems: "center",
  },
  requirementText: {
    fontFamily: "OpenSans-Medium",
    color: Colors.black,
    fontSize: 15,
    marginStart: 5,
    marginEnd: 10,
  },
  text: {
    fontFamily: "OpenSans-Medium",
    color: Colors.primary,
    fontSize: 15.5,
    marginStart: 3,
  },
});

export default JobDetailScreen;
