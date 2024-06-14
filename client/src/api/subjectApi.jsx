import axiosClient from './axiosClient';

const subjectApi = {
    async getAll(params) {
        const url = '/Subject/get-all';
        return await axiosClient.get(url, { params });
    },

    async get(id) {
        const url = `/Subject/get-by-id/${id}`;
        return await axiosClient.get(url);
    },

    async add(data) {
        const url = '/Subject/create';
        return await axiosClient.post(url, data);
    },

    async update(id, data) {
        const url = `/Subject/update/${id}`;
        return await axiosClient.put(url, data);
    },

    async delete(id) {
        const url = `/Subject/delete/${id}`;
        return await axiosClient.delete(url);
    },
};

export default subjectApi;
