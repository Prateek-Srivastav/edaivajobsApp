import client from "./client";

const endpoint = "user";

const updateUser = (user, data) =>
  client.patch(`${endpoint}/user_update/${user}/`, data);

export default {
  updateUser,
};
