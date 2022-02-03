import { create } from "apisauce";
import authStorage from "../auth/storage";

export const jobClient = create({
  baseURL: "http://167.172.236.197:4202/api",
});

export const authClient = create({
  baseURL: "http://167.172.236.197:8005/api",
});

const apiClient = create({
  baseURL: "http://167.172.236.197:8005/api",
});

apiClient.addAsyncRequestTransform(async (request) => {
  const authToken = await authStorage.getToken();
  if (!authToken) return;
  request.headers["Authorization"] = `Bearer ${authToken.accessToken}`;
});

export default apiClient;
