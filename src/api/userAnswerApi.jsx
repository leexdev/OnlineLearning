import axiosClient from "./axiosClient";

const userAnswerApi = {
    async saveUserAnswerHistory(data) {
        const url = '/UserAnswer/save-history';
        return await axiosClient.post(url, data);
    },

    async checkLastAnswer(lessonId) {
        const url = `/UserAnswer/check-last-answer/${lessonId}`;
        return await axiosClient.get(url);
    },

    async getCorrectAnswers() {
        const url = '/UserAnswer/correct-answers';
        return await axiosClient.get(url);
    },

    async getUserAnswerHistory(courseId) {
        const url = `/UserAnswer/history/course/${courseId}`;
        return await axiosClient.get(url);
    }
};

export default userAnswerApi;
