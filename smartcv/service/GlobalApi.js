import axios from "axios";

const API_KEY = import.meta.env.VITE_STRAPI_API_KEY;

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
});

// CREATE
const CreateNewResume = (data) => {
  return axiosClient.post("/api/user-resume", {
    data,
  });
};

// GET ALL USER RESUMES
const GetUserResumes = (email) =>
  axiosClient.get(`/api/user-resume?filters[email][$eq]=${email}`);

// UPDATE
const UpdateResumeDetail = (id, data) => {
  return axiosClient.put(`/api/user-resume/${id}`, {
    data,
  });
};

// GET BY ID
const GetResumeById = (id) =>
  axiosClient.get(`/api/user-resume/${id}?populate=*`);

// DELETE
const DeleteResumeById = (id) =>
  axiosClient.delete(`/api/user-resume/${id}`);

export default {
  CreateNewResume,
  GetUserResumes,
  UpdateResumeDetail,
  GetResumeById,
  DeleteResumeById,
};