import instance from "../common/instance";

export const getBuildings = (param) => {
    const url = `/building?${param}`;
    return instance.get(url);
}

export const getBuilding = (id) => {
    const url = `/building/${id}`;
    return instance.get(url);
}