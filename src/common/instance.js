import axios from "axios";
import { API } from "../config";

const instance = axios.create({
  baseURL: API,
});

export default instance;
