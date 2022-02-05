import client from "./client";

const endpoint = "candidate";

const getProfile = () => client.get(`${endpoint}/profile`);

const updateProfile = (id, data) =>
  client.patch(`${endpoint}/profile/${id}/`, data);

const uploadProfilePicture = (data) =>
  client.post(
    "gateway/job-service/candidate/profile/media/profilepicture",
    data
  );

export default {
  getProfile,
  updateProfile,
  uploadProfilePicture,
};
