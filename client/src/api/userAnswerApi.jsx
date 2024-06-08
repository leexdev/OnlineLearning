// userAnswerApi.jsx
import axiosClient from './axiosClient';

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

    async getUserAnswerHistory(courseId, start, end) {
        const url = `/UserAnswer/history/course/${courseId}?startDate=${encodeURIComponent(
            start,
        )}&endDate=${encodeURIComponent(end)}`;
        return await axiosClient.get(url);
    },

    async getRecentUncorrectedWrongAnswers(courseId, pageNumber = 1, pageSize = 3) {
        const url = `/UserAnswer/recent-wrong-answers?courseId=${courseId}&pageNumber=${pageNumber}&pageSize=${pageSize}`;
        return await axiosClient.get(url);
    },
};

export default userAnswerApi;
