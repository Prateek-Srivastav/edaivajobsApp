import { create } from "apisauce";

export const jobClient = create({
  baseURL: "http://167.172.236.197:4202/api",
});

const apiClient = create({
  baseURL: "http://167.172.236.197:8005/api",
});

export default apiClient;
