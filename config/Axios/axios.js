import axios from "axios";
import config from "../backendUrl";
export default axios.create({
  baseURL: process.env !== "production" ? config.local : config.prod
});
