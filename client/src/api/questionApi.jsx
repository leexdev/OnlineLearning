import axiosClient from './axiosClient';

const questionApi = {
    async getAll(params) {
        const url = '/Question/get-all';
        return await axiosClient.get(url, { params });
    },

    async get(id) {
        const url = `/Question/get-by-id/${id}`;
        return await axiosClient.get(url);
    },

    async getByLessonId(lessonId) {
        const url = `/Question/get-by-lessonid/${lessonId}`;
        return await axiosClient.get(url);
    },

    async getByCourseId(courseId) {
        const url = `/Question/get-by-course-id/${courseId}`;
        return await axiosClient.get(url);
    },

    async add(data) {
        const url = '/Question/create';
        return await axiosClient.post(url, data);
    },

    async update(id, data) {
        const url = `/Question/update/${id}`;
        return await axiosClient.put(url, data);
    },

    async delete(id) {
        const url = `/Question/delete/${id}`;
        return await axiosClient.delete(url);
    },

    async analyzeAudio(formData) {
        const url = '/Language/analyze-audio';
        return await axiosClient.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },

    async verifyOrder(questionId, userAnswerOrder) {
        const url = `/Question/verify-order/${questionId}`;
        return await axiosClient.post(url, userAnswerOrder);
    },
};

export default questionApi;
