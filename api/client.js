import { create } from "apisauce";

import authStorage from "../auth/storage";
import cache from "../utilities/cache";

const apiClient = create({
  baseURL: "http://167.172.236.197:8005/api",
});

export const jobClient = create({
  baseURL: "http://167.172.236.197:4202/api",
});

export const authClient = create({
  baseURL: "http://167.172.236.197:8005/api",
});

export const interviewClient = create({
  baseURL: "http://167.172.236.197:8013/api",
});

apiClient.addAsyncRequestTransform(async (request) => {
  const authToken = await authStorage.getToken();
  if (!authToken) return;
  request.headers["Authorization"] = `Bearer ${authToken.accessToken}`;
});

interviewClient.addAsyncRequestTransform(async (request) => {
  const authToken = await authStorage.getToken();
  if (!authToken) return;
  request.headers["Authorization"] = `Bearer ${authToken.accessToken}`;
});

jobClient.addAsyncRequestTransform(async (request) => {
  const data = await cache.get("user");
  if (!data) return;
  request.headers["Authorization"] = `SW-XH${data.id}`;
});

export default apiClient;
