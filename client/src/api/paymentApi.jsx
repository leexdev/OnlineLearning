import axiosClient from './axiosClient';

const paymentApi = {
    generatePaymentUrl(paymentDto) {
        const url = '/Payment/generate-payment-url';
        return axiosClient.post(url, paymentDto);
    },

    processPaymentResponse(paymentResponse) {
        const url = '/Payment/process-payment-response';
        return axiosClient.post(url, paymentResponse);
    },

    checkPaymentStatus(courseId) {
        const url = `/Payment/check-payment-status/${courseId}`;
        return axiosClient.get(url);
    },
};

export default paymentApi;
