import instance from "./instance";

export const getAll = () => {
    const url = '/departments';
    return instance.get(url);
}

export const get = (id) => {
    const url = `/apartment/${id}`;
    return instance.get(url);
}
export const gets = (id) => {
    const url = `/bill-detail/${id}`;
    return instance.get(url);
}
export const getBills = (id) => {
    const url = `/apartment/${id}/finance/paid`;
    return instance.get(url);
}
export const getBill = (id) => {
    const url = `/apartment/${id}/finance/unpaid`;
    return instance.get(url);
}
export const getCard = (id) => {
    const url = `/apartment/${id}/card`;
    return instance.get(url);
}
export const getBillDetail = (id) => {
    const url = `bill/${id}`;
    return instance.get(url);
}
export const addBillDetail = (id,item) => {
    const url = `/bill-detail/edit/${id}`;
    return instance.post(url,item);
}

export const searchName = (keyWord) => {
    const url = `/departments?department_id=${keyWord}`;
    return instance.get(url);
}

export const edit = (item) => {
    const url = `/departments/${item.id}`;
    return instance.put(url, item);
};
export const edits = (item) => {
    const url = `/bill-detail/edit/${item.id}`;
    return instance.post(url, item);
};

export const getPagination = (page, limit) => {
    const url = `/departments?page=${page}&limit=${limit}`;
    return instance.get(url, page, limit);
}

export const fetchPagination = (currentPage, limit) => {
    const url = `http://apartment-system.xyz/api/apartment?page_size=${currentPage}&page=${limit}`;
    return instance.get(url, currentPage, limit);
}

export const remove = (id) => {
    const url = `/departments/${id}`;
    return instance.delete(url);
}

export const add = (item) => {
    const url = "/departments";
    return instance.post(url, item);
}