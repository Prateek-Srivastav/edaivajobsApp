import { jobClient as client } from "./client";

const endpoint = "/jobs";

const getJobs = () => client.get(endpoint);

const getJobDetails = (jobId) => client.get(`${endpoint}/detail/${jobId}`);

export default {
  getJobs,
  getJobDetails,
};
