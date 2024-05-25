import axiosClient from './axiosClient';

const subjectApi = {
    getAll(params) {
        const url = '/Subject/get-all';
        return axiosClient.get(url, { params });
    },

    get(id) {
        const url = `/Subject/get-by-id/${id}`;
        return axiosClient.get(url);
    },

    add(data) {
        const url = '/Subject/create';
        return axiosClient.post(url, data);
    },

    update(data) {
        const url = `/Subject/update/${data.id}`;
        return axiosClient.patch(url, data);
    },

    delete(id) {
        const url = `/Subject/delete/${id}`;
        return axiosClient.patch(url);
    },
};

export default subjectApi;
