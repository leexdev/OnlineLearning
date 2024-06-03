import axiosClient from './axiosClient';

const textToSpeechApi = {
    convertTextToSpeech(text) {
        const url = '/TextToSpeech/convert';
        return axiosClient.post(url, { text }, { responseType: 'arraybuffer' });
    }
};

export default textToSpeechApi;
