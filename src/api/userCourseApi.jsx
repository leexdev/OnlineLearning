import axiosClient from './axiosClient';

const userCourseApi = {
    get() {
        const url = '/UserCourse/get-by-userid';
        return axiosClient.get(url);
    }
};

export default userCourseApi;
