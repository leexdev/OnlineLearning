import axiosClient from './axiosClient';

const textToSpeechApi = {
    async convertTextToSpeech(text, language) {
        const url = '/TextToSpeech/convert';
        return await axiosClient.post(url, { text, language }, { responseType: 'arraybuffer' });
    }
};

export default textToSpeechApi;
