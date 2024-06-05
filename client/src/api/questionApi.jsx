import axiosClient from './axiosClient';

const questionApi = {
    async getAll(params) {
        const url = '/Question/get-all';
        return await axiosClient.get(url, { params });
    },

    async get(id) {
        const url = `/Question/get-by-id/${id}`;
        return await axiosClient.get(url);
    },

    async getByLessonId(lessonId) {
        const url = `/Question/get-by-lessonid/${lessonId}`;
        return await axiosClient.get(url);
    },

    async add(data) {
        const url = '/Question/create';
        return await axiosClient.post(url, data);
    },

    async update(data) {
        const url = `/Question/update/${data.id}`;
        return await axiosClient.patch(url, data);
    },

    async delete(id) {
        const url = `/Question/delete/${id}`;
        return await axiosClient.patch(url);
    },
};

export default questionApi;
