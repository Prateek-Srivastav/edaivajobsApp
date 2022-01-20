import { create } from "apisauce";

const apiClient = create({
  baseURL: "https://jobs.edaiva.com/api",
});

export default apiClient;
