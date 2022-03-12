import instance1 from "./instance1";
import { isAuthenticate } from "../auth";

export const getAll = () => {
    const url = '/users';
    return instance1.get(url);
}

export const get = (id) => {
    const url = `/users/${id}`;
    return instance1.get(url);
}

export const searchName = (keyWord) => {
    const url = `/users?department_id=${keyWord}`;
    return instance1.get(url);
}

export const edit = (item) => {
    const url = `/users/${item.id}`;
    return instance1.put(url, item);
};

export const getPagination = (page, limit) => {
    const url = `/users?page=${page}&limit=${limit}`;
    return instance1.get(url, page, limit);
}

export const fetchPagination = (currentPage, limit) => {
    const url = `/users?page=${currentPage}&limit=${limit}`;
    return instance1.get(url, currentPage, limit);
}

export const remove = (id) => {
    const url = `/users/${id}`;
    return instance1.delete(url);
}

export const add = (item) => {
    const url = "/users";
    return instance1.post(url, item);
}