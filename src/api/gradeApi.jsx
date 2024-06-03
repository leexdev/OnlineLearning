import axiosClient from './axiosClient';

const gradeApi = {
    async getAll(params) {
        const url = '/Grade/get-all';
        const token = localStorage.getItem('jwtToken');
        return await axiosClient.get(url, { params, headers: { Authorization: `Bearer ${token}`} });
    },

    async get(id) {
        const url = `/Grade/get-by-id/${id}`;
        return await axiosClient.get(url);
    },

    async add(data) {
        const url = '/Grade/create';
        return await axiosClient.post(url, data);
    },

    async update(data) {
        const url = `/Grade/update/${data.id}`;
        return await axiosClient.patch(url, data);
    },

    async delete(id) {
        const url = `/Grade/delete/${id}`;
        return await axiosClient.patch(url);
    },
};

export default gradeApi;
