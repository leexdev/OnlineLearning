import axiosClient from './axiosClient';

const ratingApi = {
    async getByCourse(courseId) {
        const url = `/Rating/get-by-course/${courseId}`;
        return await axiosClient.get(url);
    },

    async add(data) {
        const url = '/Rating/create';
        return await axiosClient.post(url, data);
    },
};

export default ratingApi;
