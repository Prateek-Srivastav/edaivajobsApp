import client from "./client";

const refreshToken = (data) => client.post("user/token/refresh/", data);

export default {
  refreshToken,
};
