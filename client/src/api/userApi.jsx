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
        return await axiosClient.post(url);
    },
};


export default userApi;