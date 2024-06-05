import axiosClient from './axiosClient';

const lessonApi = {
    async getAll(params) {
        const url = '/Lesson/get-all';
        return await axiosClient.get(url, { params });
    },

    async get(id) {
        const url = `/Lesson/get-by-id/${id}`;
        return await axiosClient.get(url);
    },

    async getVideo(lessonId) {
        const url = `/Lesson/${lessonId}/video`;
        return await axiosClient.get(url);
    },

    async update(data) {
        const url = `/Lesson/update/${data.id}`;
        return await axiosClient.patch(url, data);
    },

    async delete(id) {
        const url = `/Lesson/delete/${id}`;
        return await axiosClient.patch(url);
    },
};

export default lessonApi;
