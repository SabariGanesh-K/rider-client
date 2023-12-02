import axios from "axios";
// import { Url } from "../constants/Url";

const Axios = axios.create({
  baseURL:"http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});
// export const 
export const AxiosGet = async (url,token) => {
  console.log("http://localhost:8080"+url,token)

  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const { data } = await Axios.get(url,{headers:headers});
  console.log(data)
  return data;
};

export const AxiosGetNoToken = async (url) => {
  // console.log("http://localhost:8080"+url,token)

  const { data } = await Axios.get(url);
  console.log(data)
  return data;
};



export const AxiosPost = async (url, objects,token) => {
  console.log("entering")
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  console.log("http://localhost:8080"+url , "with",objects)
  const response = await Axios.post(url, objects,{headers:headers});
  console.log("Recieved",response);
  return response;
};

export const AxiosPostNoToken = async (url, objects) => {
  console.log("entering")

  // console.log("http://localhost:8080"+url , "with",objects)
  const response = await Axios.post(url, objects);
  console.log("Recieved",response);
  return response;
};

