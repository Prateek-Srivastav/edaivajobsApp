import client from "./client";

const getApplications = () =>
  client.get(`gateway/job-service/jobs/application-candidate/`);

export default {
  getApplications,
};
