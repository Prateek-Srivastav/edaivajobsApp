import authStorage from "../auth/storage";
import refreshTokenApi from "../api/refreshToken";

async function refreshAccessToken() {
  const authToken = await authStorage.getToken();

  const response = await refreshTokenApi.refreshToken({
    refresh: authToken.refreshToken,
  });
  const { access, refresh } = response.data;
  console.log(access);
  authStorage.removeToken();
  authStorage.storeToken(access, refresh);
}

export default refreshAccessToken;
