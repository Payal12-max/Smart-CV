import axios from "axios";


const API_KEY = import.meta.env.VITE_STRAPI_API_KEY;
const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL + "/api/",
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_KEY}`
  }
})

const CreateNewResume = (data) => {
  return axiosClient.post("/user-resume",{ 
    data
  });
};

const GetUserResumes = (email) => axiosClient.get('/user-resume?filters[email][$eq]=' + email);

const UpdateResumeDetail = (id, data) => {
  return axiosClient.put(`/user-resume/${id}`, {
    data
  });
};

const GetResumeById = (id) => axiosClient.get('/user-resume/' + id + "?populate=*")

const DeleteResumeById = (id) => axiosClient.delete('/user-resume/' + id)

export default {
  CreateNewResume,
  GetUserResumes,
  UpdateResumeDetail,
  GetResumeById,
  DeleteResumeById
}