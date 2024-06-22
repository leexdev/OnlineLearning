import axiosClient from './axiosClient';

const userApi = {
    async register(data) {
        const url = '/Account/register';
        return await axiosClient.post(url, data);
    },

    async login(data) {
        const url = '/Account/login';
        return await axiosClient.post(url, data);
    },

    async getAll() {
        const url = '/Account/get-all';
        return await axiosClient.get(url);
    },

    async getPage(params) {
        const url = '/Account/get-page';
        return await axiosClient.get(url, { params });
    },

    async getTeachers() {
        const url = '/Account/get-list-teacher';
        return await axiosClient.get(url);
    },

    async getUsers({ params }) {
        const url = '/Account/get-list-user';
        return await axiosClient.get(url, { params });
    },

    async get() {
        const url = '/Account/get-user';
        return await axiosClient.get(url);
    },

    async uploadImage(imageFile) {
        const url = '/Account/upload-image';
        const formData = new FormData();
        formData.append('imageFile', imageFile);
        return await axiosClient.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },

    async updateUser(data) {
        const url = '/Account/update/currentuser';
        return await axiosClient.put(url, data);
    },

    async changePassword(data) {
        const url = '/Account/change-password';
        return await axiosClient.post(url, data);
    },

    async contact() {
        const url = '/Account/contacts';
        return await axiosClient.get(url);
    },

    async changeRoles(id, newRoles) {
        const url = `/Account/changeroles/${id}`;
        return await axiosClient.post(url, newRoles);
    },

    async delete(id) {
        const url = `/Account/delete/${id}`;
        return await axiosClient.delete(url);
    },
};

export default userApi;
