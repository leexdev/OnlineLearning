import axiosClient from './axiosClient';

const commentApi = {
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

    getComments(lessonId, page, pageSize = 5) {
        const url = `/Comment/get-by-lessonid`;
        return axiosClient.get(url, { params: { lessonId, page, pageSize } });
    },
};

export default commentApi;
