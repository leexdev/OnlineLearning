import axiosClient from './axiosClient';

const lessonCompletedApi = {
    async getAll(params) {
        const url = '/LessonCompleted/get-all';
        return await axiosClient.get(url, { params });
    },

    async get(params) {
        const url = `/LessonCompleted/get-by-userid`;
        return await axiosClient.get(url, { params });
    },

    async add(data) {
        const url = '/LessonCompleted/create';
        return await axiosClient.post(url, data);
    },
};

export default lessonCompletedApi;
