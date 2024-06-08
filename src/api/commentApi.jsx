import axiosClient from './axiosClient';

const commentApi = {
    async getAll(params) {
        const url = '/Comment/get-all';
        return await axiosClient.get(url, { params });
    },

    async get(id) {
        const url = `/Comment/get-by-id/${id}`;
        return await axiosClient.get(url);
    },

    async getComments(lessonId, page) {
        const url = `/Comment/get-by-lessonid?lessonId=${lessonId}&pageSize=${page}`;
        return await axiosClient.get(url);
    },

    async add(params) {
        const url = '/Comment/create';
        return await axiosClient.post(url, params);
    },

    async update(data) {
        const url = `/Comment/update/${data.id}`;
        return await axiosClient.patch(url, data);
    },

    async delete(id) {
        const url = `/Comment/delete/${id}`;
        return await axiosClient.patch(url);
    },
};

export default commentApi;
