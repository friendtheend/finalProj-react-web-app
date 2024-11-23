import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const ENROLLS_API = `${REMOTE_SERVER}/api/enrollments`;
export const updateEnroll = async (enrollment: any) => {
    const { data } = await axios.post(`${ENROLLS_API}`, enrollment);
    return data;
};
  
export const deleteEnroll = async (enrollmentId: any) => {
 const response = await axios.delete(`${ENROLLS_API}/${enrollmentId}`);
 return response.data;
};