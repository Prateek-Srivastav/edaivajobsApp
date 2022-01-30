import client from "./client";

const endpoint = "candidate";

const getProfile = () => client.get(`${endpoint}/profile`);

export default {
  getProfile,
};
