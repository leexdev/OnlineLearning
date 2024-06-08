import axiosClient from './axiosClient';

const courseApi = {
    async getAll(params) {
        const url = '/Course/get-all';
        return await axiosClient.get(url, { params });
    },

    async get(id) {
        const url = `/Course/get-by-id/${id}`;
        return await axiosClient.get(url);
    },

    async getCourse(id) {
        const url = `/Course/simple/${id}`;
        return await axiosClient.get(url);
    },

    async getBySubjectId(subjectId) {
        const url = `/Course/get-by-subjectId/${subjectId}`;
        return await axiosClient.get(url);
    },

    async getBySubjectName(subjectName) {
        const url = `/Course/get-by-subjectName/${subjectName}`;
        return await axiosClient.get(url);
    },

    async add(data) {
        const url = '/Course/create';
        return await axiosClient.post(url, data);
    },

    async update(data) {
        const url = `/Course/update/${data.id}`;
        return await axiosClient.patch(url, data);
    },

    async delete(id) {
        const url = `/Course/delete/${id}`;
        return await axiosClient.patch(url);
    },
};

export default courseApi;
