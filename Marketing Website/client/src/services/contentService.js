import axios from "axios";

const baseUrl = "http://localhost:3001/user/post";


let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};


const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newObject) => {
  if (!token) {
    throw new Error("Token no encontrado. Asegúrate de haber iniciado sesión.");
  }
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

export default {
  getAll,
  create,
  setToken
};
