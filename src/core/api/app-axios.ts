import axios from "axios";

const STAGE = import.meta.env.VITE_STAGE || "dev";

const API_URL = STAGE === "prod" 
  ? import.meta.env.VITE_API_URL_PROD
  : import.meta.env.VITE_API_URL_DEV;

const api = axios.create({
  baseURL: API_URL,
})

export { api }