import axiosClient from './axiosClient';

const adviseApi = {
    async getAll() {
        const url = '/Advise/get-all';
        return await axiosClient.get(url);
    },

    async getByTeacher() {
        const url = '/Advise/by-teacher';
        return await axiosClient.get(url);
    },

    async get(id) {
        const url = `/Advise/get-by-id/${id}`;
        return await axiosClient.get(url);
    },

    async getByCourseId(courseId) {
        const url = `/Advise/get-by-courseid/${courseId}`;
        return await axiosClient.get(url);
    },

    async add(data) {
        const url = '/Advise/create';
        return await axiosClient.post(url, data);
    },

    async update(id, data) {
        const url = `/Advise/update/${id}`;
        return await axiosClient.put(url, data);
    },

    async delete(id) {
        const url = `/Advise/delete/${id}`;
        return await axiosClient.put(url);
    },
};

export default adviseApi;
