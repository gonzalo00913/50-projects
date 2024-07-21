import axios from "axios";

const baseUrl = "http://localhost:3001/user/post";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async () => {};


export default {
  getAll,
  create
};
