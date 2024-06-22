import axiosClient from './axiosClient';

const paymentApi = {
    async getAll(params) {
        const url = '/Payment/get-all';
        return await axiosClient.get(url, { params });
    },
    async generatePaymentUrl(paymentDto) {
        const url = '/Payment/generate-payment-url';
        return await axiosClient.post(url, paymentDto);
    },

    async processPaymentResponse(paymentResponse) {
        const url = '/Payment/process-payment-response';
        return await axiosClient.post(url, paymentResponse);
    },

    async checkPaymentStatus(courseId) {
        const url = `/Payment/check-payment-status/${courseId}`;
        return await axiosClient.get(url);
    },
};

export default paymentApi;
