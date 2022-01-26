import * as SecureStore from "expo-secure-store";

const accessKey = "accessToken";
const refreshKey = "refreshToken";

const storeToken = async (accessToken, refreshToken) => {
  try {
    await SecureStore.setItemAsync(accessKey, accessToken);
    await SecureStore.setItemAsync(refreshKey, refreshToken);
  } catch (error) {
    console.log("Error storing the auth token.", error);
  }
};

const getToken = async () => {
  try {
    return {
      accessToken: await SecureStore.getItemAsync(accessKey),
      refreshToken: await SecureStore.getItemAsync(refreshKey),
    };
  } catch (error) {
    console.log("Error getting the auth token", error);
  }
};

const removeToken = async () => {
  try {
    await SecureStore.deleteItemAsync(accessKey);
    await SecureStore.deleteItemAsync(refreshKey);
    console.log("deleted");
  } catch (error) {
    console.log("Error removing the auth token.", error);
  }
};

export default { storeToken, getToken, removeToken };
