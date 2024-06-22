import axiosClient from './axiosClient';

const courseApi = {
    async getAll(params) {
        const url = '/Course/get-all';
        return await axiosClient.get(url, {params});
    },
    async getPage(params) {
        const url = '/Course/get-page';
        return await axiosClient.get(url, { params });
    },

    async get(id) {
        const url = `/Course/get-by-id/${id}`;
        return await axiosClient.get(url);
    },

    async getAllChildren(id) {
        const url = `/Course/get-by-allchidren/${id}`;
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
        return await axiosClient.post(url, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },

    async update(id, data) {
        const url = `/Course/update/${id}`;
        return await axiosClient.put(url, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },

    async delete(id) {
        const url = `/Course/delete/${id}`;
        return await axiosClient.delete(url);
    },

    async updatePrice(id, price) {
        const url = `/Course/update-new-price/${id}?price=${price}`;
        return await axiosClient.put(url);
    },

    async deleteNewPrice(id) {
        const url = `/Course/delete-new-price/${id}`;
        return await axiosClient.put(url);
    },
};

export default courseApi;
