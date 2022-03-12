import instance from "./instance";

export const get = (param) => {
    const url = `/service?${param}`;
    return instance.get(url);
}