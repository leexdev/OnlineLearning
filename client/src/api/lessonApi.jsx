import axiosClient from './axiosClient';

const lessonApi = {
    getAll(params) {
        const url = '/Lesson/get-all';
        return axiosClient.get(url, { params });
    },

    get(id) {
        const url = `/Lesson/get-by-id/${id}`;
        return axiosClient.get(url);
    },

    add(data) {
        const url = '/Lesson/create';
        return axiosClient.post(url, data);
    },

    update(data) {
        const url = `/Lesson/update/${data.id}`;
        return axiosClient.patch(url, data);
    },

    delete(id) {
        const url = `/Lesson/delete/${id}`;
        return axiosClient.patch(url);
    },
};

export default lessonApi;
