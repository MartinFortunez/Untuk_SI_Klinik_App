import axios from "axios";

export const api = async (method, url, data) => {
  const response = await axios[method](
    `${process.env.REACT_APP_BACKEND_URL}dashboard/${url}`,
    data
  );

  return response.data;
};
