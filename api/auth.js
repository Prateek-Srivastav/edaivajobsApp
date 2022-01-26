import client from "./client";

const login = (email, password) =>
  client.post("/user/login/", { email, password });

const register = (data) => client.post("user/user-register/", data);

const resendOtp = (email) => client.post("user/resend_otp/", { email });

const verifyOtp = (data) => client.post("user/otp_verification/", data);

export default {
  login,
  register,
  resendOtp,
  verifyOtp,
};
