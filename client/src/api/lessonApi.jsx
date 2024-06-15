import axiosClient from './axiosClient';

const lessonApi = {
    async getAll(params) {
        const url = '/Lesson/get-all';
        return await axiosClient.get(url, { params });
    },

    async get(id) {
        const url = `/Lesson/get-by-id/${id}`;
        return await axiosClient.get(url);
    },

    async getByCourseId(courseId) {
        const url = `/Lesson/get-by-course-id/${courseId}`;
        return await axiosClient.get(url);
    },

    async add(data) {
        const url = '/Lesson/create';
        return await axiosClient.post(url, data);
    },

    async updateOrder(chapterId, lessons){
        const url = `/Lesson/update-order/${chapterId}`
        return await axiosClient.put(url, lessons);
    },

    async uploadVideo(id, data) {
        const url = `/Lesson/upload-video/${id}`;
        return await axiosClient.post(url, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },

    async getVideo(lessonId) {
        const url = `/Lesson/${lessonId}/video`;
        return await axiosClient.get(url);
    },

    async update(data) {
        const url = `/Lesson/update/${data.id}`;
        return await axiosClient.patch(url, data);
    },

    async delete(id) {
        const url = `/Lesson/delete/${id}`;
        return await axiosClient.delete(url);
    },

    async setdelete(id) {
        const url = `/Lesson/set-delete/${id}`;
        return await axiosClient.put(url);
    },
};

export default lessonApi;
