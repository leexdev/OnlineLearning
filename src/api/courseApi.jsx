import axiosClient from './axiosClient';

const courseApi = {
    getAll(params) {
        const url = '/Course/get-all';
        return axiosClient.get(url, { params });
    },

    get(id) {
        const url = `/Course/get-by-id/${id}`;
        return axiosClient.get(url);
    },

    getCourse(id) {
        const url = `/Course/simple/${id}`;
        return axiosClient.get(url);
    },

    getBySubjectId(subjectId) {
        const url = `/Course/get-by-subjectId/${subjectId}`;
        return axiosClient.get(url);
    },

    add(data) {
        const url = '/Course/create';
        return axiosClient.post(url, data);
    },

    update(data) {
        const url = `/Course/update/${data.id}`;
        return axiosClient.patch(url, data);
    },

    delete(id) {
        const url = `/Course/delete/${id}`;
        return axiosClient.patch(url);
    },
};

export default courseApi;
