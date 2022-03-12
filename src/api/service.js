import axios from "axios";
import instance from "../common/instance";
import { API } from "../config";

export const get = (param) => {
    const url = `/service?${param}`;
    return instance.get(url);
}

export const NoGetPageService = (param) => {
    const url = `/service?${param}`;
    return instance.get(url);
}

export const addService = (data) => {
    const url = `${API}/service/add`;
    return axios.post(url, data);
}

export const getServiceById = (id) => {
    const url = `${API}/service/edit/${id}`;
    return axios.post(url);
}