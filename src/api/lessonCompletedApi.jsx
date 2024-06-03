import axiosClient from './axiosClient';

const lessonCompletedApi = {
    getAll(params) {
        const url = '/LessonCompleted/get-all';
        return axiosClient.get(url, { params });
    },

    get(params) {
        const url = `/LessonCompleted/get-by-userid`;
        return axiosClient.get(url, {params});
    },

    add(data) {
        const url = '/LessonCompleted/create';
        return axiosClient.post(url, data);
    }
};

export default lessonCompletedApi;
