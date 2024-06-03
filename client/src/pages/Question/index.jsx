import React, { useState } from 'react';
import textToSpeechApi from '~/api/textToSpeechAPI';

const Question = () => {
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [audioSrc, setAudioSrc] = useState(null); // Thêm state để lưu URL của audio

    const handleAnswerClick = (answer) => {
        setSelectedAnswer(answer);
    };

    const handleSubmit = () => {
        console.log(`Submitted answer: ${selectedAnswer}`);
    };

    const callTextToSpeechAPI = async (text) => {
        try {
            const data = await textToSpeechApi.convertTextToSpeech(text);
            const blob = new Blob([data], { type: 'audio/mpeg' });
            const url = URL.createObjectURL(blob);
            setAudioSrc(url);
        } catch (error) {
            console.error('Error converting text to speech:', error);
        }
    };

    const handleTextToSpeech = () => {
        const questionText = 'Điền số thích hợp vào chỗ trống: 3... > 38. Số cần điền là:';
        callTextToSpeechAPI(questionText);
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-purple-600 to-blue-500 flex flex-col items-center justify-center p-4">
            <div className="bg-white p-10 rounded-3xl shadow-2xl max-w-3xl w-full transform transition duration-500 hover:scale-105">
                <h1 className="text-4xl font-extrabold text-center text-indigo-900 mb-10">
                    Luyện tập - Số và chữ số (tiết 3)
                </h1>
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-8 rounded-2xl mb-10 shadow-inner">
                    <div className="text-center text-orange-600 font-extrabold mb-6 text-3xl">Câu 1</div>
                    <p className="text-gray-800 text-center mb-6 text-lg leading-relaxed">
                        Điền số thích hợp vào chỗ trống: 3... > 38.
                        <br />
                        Số cần điền là:
                    </p>
                    <div className="flex justify-center space-x-6 mb-8">
                        {[6, 7, 8, 9].map((answer) => (
                            <button
                                key={answer}
                                className={`p-5 w-24 h-24 text-2xl font-bold rounded-full transition transform ${
                                    selectedAnswer === answer
                                        ? 'bg-indigo-600 text-white scale-110 shadow-xl'
                                        : 'bg-white text-gray-800 shadow-lg hover:bg-gray-200'
                                }`}
                                onClick={() => handleAnswerClick(answer)}
                            >
                                {answer}
                            </button>
                        ))}
                    </div>
                    <div className="flex justify-center">
                        <button
                            onClick={handleSubmit}
                            className="bg-orange-500 text-white px-12 py-4 rounded-full text-lg font-semibold shadow-lg hover:bg-orange-600 transition transform hover:scale-105"
                        >
                            Gửi câu trả lời <span className="ml-2">✈️</span>
                        </button>
                    </div>
                </div>
                <div className="flex justify-between items-center mt-4 px-4">
                    <div className="flex items-center space-x-3">
                        {[1, 2, 3, 4, 5].map((num, index) => (
                            <span
                                key={index}
                                className={`px-4 py-2 rounded-full font-semibold text-sm transition ${
                                    num === 1
                                        ? 'bg-gray-300 text-gray-800'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                            >
                                {num}
                            </span>
                        ))}
                    </div>
                    <div className="text-center text-gray-800">
                        <div className="font-semibold">Đúng</div>
                        <div className="text-4xl font-bold text-orange-600">0/5</div>
                    </div>
                </div>
                <div className="flex justify-end space-x-4 mt-6 px-4">
                    <button className="p-4 rounded-full bg-orange-500 text-white shadow-lg hover:bg-orange-600 transition transform hover:scale-105">
                        ★
                    </button>
                    <button className="p-4 rounded-full bg-orange-500 text-white shadow-lg hover:bg-orange-600 transition transform hover:scale-105">
                        🖨️
                    </button>
                    <button className="p-4 rounded-full bg-orange-500 text-white shadow-lg hover:bg-orange-600 transition transform hover:scale-105">
                        ❓
                    </button>
                </div>
            </div>
            <div className="flex justify-center mt-4">
                <button
                    onClick={handleTextToSpeech}
                    className="bg-green-500 text-white px-12 py-4 rounded-full text-lg font-semibold shadow-lg hover:bg-green-600 transition transform hover:scale-105"
                >
                    Phát âm thanh câu hỏi
                </button>
            </div>
            {audioSrc && (
                <div className="mt-4">
                    <iframe src={audioSrc} className="hidden" allow="autoplay"></iframe>
                </div>
            )}
        </div>
    );
};

export default Question;
