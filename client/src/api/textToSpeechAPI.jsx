import axiosClient from './axiosClient';

const textToSpeechApi = {
    async convertTextToSpeech(text) {
        const url = '/TextToSpeech/convert';
        return await axiosClient.post(url, { text }, { responseType: 'arraybuffer' });
    }
};

export default textToSpeechApi;
