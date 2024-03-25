import axios from "axios";

export const loginUser = async (body) => {
  const respone = await axios.post("http://localhost:8000/auth/login", body);
  return respone.data;
};
