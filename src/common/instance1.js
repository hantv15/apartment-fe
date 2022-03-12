import axios from "axios";

const instance1 = axios.create({
  baseURL: "https://61fe3d3aa58a4e00173c978d.mockapi.io",
  headers: {
    "Content-Type": "application/json"
  }
  // hhhhhh
});

export default instance1;