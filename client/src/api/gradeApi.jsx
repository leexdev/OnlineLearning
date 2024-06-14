import axiosClient from './axiosClient';

const gradeApi = {
    async getAll() {
        const url = '/Grade/get-all';
        return await axiosClient.get(url);
    },

    async get(id) {
        const url = `/Grade/get-by-id/${id}`;
        return await axiosClient.get(url);
    },

    async add(data) {
        const url = '/Grade/create';
        return await axiosClient.post(url, data);
    },

    async update(id, data) {
        const url = `/Grade/update/${id}`;
        return await axiosClient.put(url, data);
    },

    async delete(id) {
        const url = `/Grade/delete/${id}`;
        return await axiosClient.delete(url);
    },
};

export default gradeApi;
