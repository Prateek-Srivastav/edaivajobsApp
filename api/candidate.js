import client from "./client";

const endpoint = "candidate";

const getProfile = () => client.get(`${endpoint}/profile`);

const updateProfile = (id, data) =>
  client.patch(`${endpoint}/profile/${id}/`, data);

export default {
  getProfile,
  updateProfile,
};
