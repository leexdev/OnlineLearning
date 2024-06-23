import axiosClient from './axiosClient';

const userCourseApi = {
    async getAll() {
        const url = '/UserCourse/get-all';
        return await axiosClient.get(url);
    },

    async get() {
        const url = '/UserCourse/get-by-userid';
        return await axiosClient.get(url);
    },

    async hasAccess(courseId) {
        const url = `/UserCourse/has-access/${courseId}`;
        return await axiosClient.get(url);
    },
};

export default userCourseApi;
