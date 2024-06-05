import axiosClient from './axiosClient';

const commentApi = {
    async getAll(params) {
        const url = '/Lesson/get-all';
        return await axiosClient.get(url, { params });
    },

    async get(id) {
        const url = `/Lesson/get-by-id/${id}`;
        return await axiosClient.get(url);
    },

    async add(data) {
        const url = '/Lesson/create';
        return await axiosClient.post(url, data);
    },

    async update(data) {
        const url = `/Lesson/update/${data.id}`;
        return await axiosClient.patch(url, data);
    },

    async delete(id) {
        const url = `/Lesson/delete/${id}`;
        return await axiosClient.patch(url);
    },

    async getComments(lessonId, page, pageSize = 5) {
        const url = `/Comment/get-by-lessonid`;
        return await axiosClient.get(url, { params: { lessonId, page, pageSize } });
    },
};

export default commentApi;
