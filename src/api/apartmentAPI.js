import instance from "../common/instance";

export const addApartment = (data) => {
    const url = `/apartment/add`;
    return instance.post(url, data);
}
