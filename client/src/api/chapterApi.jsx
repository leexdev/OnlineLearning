import axiosClient from './axiosClient';

const chapterApi = {
    async getAll(params) {
        const url = '/Chapter/get-all';
        return await axiosClient.get(url, { params });
    },

    async get(id) {
        const url = `/Chapter/get-by-id/${id}`;
        return await axiosClient.get(url);
    },

    async add(data) {
        const url = '/Chapter/create';
        return await axiosClient.post(url, data);
    },

    async update(id, data) {
        const url = `/Chapter/update/${id}`;
        return await axiosClient.put(url, data);
    },

    async updateOrder(courseId, chapters){
        const url = `/Chapter/update-order/${courseId}`
        return await axiosClient.put(url, chapters);
    },

    async delete(id) {
        const url = `/Chapter/delete/${id}`;
        return await axiosClient.delete(url);
    },

    async setdelete(id) {
        const url = `/Chapter/set-delete/${id}`;
        return await axiosClient.put(url);
    },
};

export default chapterApi;
