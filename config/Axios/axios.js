import axios from "axios";
import config from "../backendUrl";
export default axios.create({
  baseURL: config.baseURL
});
