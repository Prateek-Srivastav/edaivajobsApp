import client from "./client";

const endpoint = "gateway/job-service/jobs";

const getApplications = () => client.get(`${endpoint}/application-candidate/`);

const postApplication = (data) => client.post(`${endpoint}/application`, data);

const deleteApplication = (applicationId) =>
  client.delete(`${endpoint}/application-candidate/${applicationId}`);

export default {
  getApplications,
  postApplication,
  deleteApplication,
};
