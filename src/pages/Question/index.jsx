import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import textToSpeechApi from '~/api/textToSpeechAPI';
import questionApi from '~/api/questionApi';
import userAnswerApi from '~/api/userAnswerApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import images from '~/assets/images';

const Question = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [audioSrc, setAudioSrc] = useState(null);
    const [history, setHistory] = useState([]);
    const [correctCount, setCorrectCount] = useState(0);
    const [userLastAnswer, setUserLastAnswer] = useState(null);
    const [correctAnswers, setCorrectAnswers] = useState({});
    const [showAnswerResult, setShowAnswerResult] = useState(false);
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [showExplanation, setShowExplanation] = useState(false);
    const [showAnswer, setShowAnswer] = useState(false);
    const [correctAnswer, setCorrectAnswer] = useState(null); // Thêm trạng thái correctAnswer
    const audioRef = useRef(null);
    const location = useLocation();
    const { lessonId } = location.state || {};

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const fetchedQuestions = await questionApi.getByLessonId(lessonId);
                setQuestions(fetchedQuestions);
                if (fetchedQuestions.length > 0) {
                    checkUserAnswerHistory(fetchedQuestions[0].id);
                }
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        };

        const fetchCorrectAnswers = async () => {
            try {
                const result = await userAnswerApi.getCorrectAnswers();
                setCorrectAnswers(result);
                const totalCorrect = Object.values(result).filter(Boolean).length;
                setCorrectCount(totalCorrect);
            } catch (error) {
                console.error('Error fetching correct answers:', error);
            }
        };

        if (lessonId) {
            fetchQuestions();
            fetchCorrectAnswers();
        }
    }, [lessonId]);

    const checkUserAnswerHistory = useCallback(async (questionId) => {
        try {
            const result = await userAnswerApi.checkLastAnswer(questionId);
            console.log(result);
            if (result === 404) {
                setUserLastAnswer(null);
            } else {
                setUserLastAnswer(result);
            }
        } catch (error) {
            console.error('Error checking user answer history:', error);
        }
    }, []);

    const handleAnswerClick = (answer) => {
        setSelectedAnswer(answer);
    };

    const handleSubmit = async () => {
        if (selectedAnswer) {
            const isCorrect = selectedAnswer.isCorrect;
            const questionId = questions[currentQuestionIndex].id;
            const newHistory = [...history];
            newHistory[currentQuestionIndex] = { questionId, isCorrect };
            setHistory(newHistory);

            if (isCorrect && !correctAnswers[questionId]) {
                setCorrectAnswers((prev) => ({ ...prev, [questionId]: true }));
                setCorrectCount((prev) => prev + 1);
            } else if (!isCorrect && correctAnswers[questionId]) {
                setCorrectAnswers((prev) => ({ ...prev, [questionId]: false }));
                setCorrectCount((prev) => prev - 1);
            }

            const userAnswerHistoryDto = {
                answerId: selectedAnswer.id,
                questionId: questions[currentQuestionIndex].id,
                isCorrect: isCorrect,
            };

            try {
                await userAnswerApi.saveUserAnswerHistory(userAnswerHistoryDto);
                setIsAnswerCorrect(isCorrect);
                setShowAnswerResult(true);
                setUserLastAnswer(null);
                if (!isCorrect) {
                    setShowExplanation(true);
                    const correctAns = questions[currentQuestionIndex].answers.find((ans) => ans.isCorrect);
                    setCorrectAnswer(correctAns); // Cập nhật correctAnswer
                }
            } catch (error) {
                console.error('Lỗi lưu lịch sử trả lời:', error);
                alert('Lưu lịch sử trả lời thất bại.');
            }

            setSelectedAnswer(null);
        } else {
            alert('Vui lòng chọn một đáp án.');
        }
    };

    const handleQuestionNavigation = (direction) => {
        const newIndex = currentQuestionIndex + direction;
        if (newIndex >= 0 && newIndex < questions.length) {
            setCurrentQuestionIndex(newIndex);
            setSelectedAnswer(null);
            setUserLastAnswer(null);
            setShowExplanation(false);
            setShowAnswer(false); // Đặt lại trạng thái showAnswer khi chuyển câu hỏi
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
                setIsPlaying(false);
                URL.revokeObjectURL(audioSrc); // Thu hồi URL cũ
                setAudioSrc(null);
            }
            setShowAnswerResult(null);
            checkUserAnswerHistory(questions[newIndex].id);
        }
    };

    const callTextToSpeechAPI = useCallback(
        async (text) => {
            try {
                if (audioRef.current) {
                    audioRef.current.pause();
                    setIsPlaying(false);
                    URL.revokeObjectURL(audioSrc); // Thu hồi URL cũ
                    setAudioSrc(null);
                }

                const data = await textToSpeechApi.convertTextToSpeech(text);
                const blob = new Blob([data], { type: 'audio/mpeg' });
                const url = URL.createObjectURL(blob);
                setAudioSrc(url);
                setIsPlaying(true);
            } catch (error) {
                console.error('Lỗi chuyển văn bản thành giọng nói:', error);
            }
        },
        [audioSrc],
    );

    const handleTextToSpeech = async (text) => {
        if (isPlaying) {
            if (audioRef.current) {
                audioRef.current.pause();
                setIsPlaying(false);
            }
        } else {
            if (audioSrc) {
                audioRef.current.play();
                setIsPlaying(true);
            } else {
                await callTextToSpeechAPI(text);
            }
        }
    };

    if (!questions || questions.length === 0) {
        return <div className="text-center text-white">Không có câu hỏi nào để hiển thị</div>;
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className="lg:min-h-screen bg-gradient-to-r bg-sky-700 flex flex-col items-center justify-center p-4">
            <div className="bg-white py-10 rounded-3xl border-sky-600 border-8 shadow-2xl max-w-3xl w-full transform transition duration-500 hover:scale-105 mb-6">
                <div className="flex justify-center">
                    <h1 className="text-4xl font-extrabold text-center text-indigo-900 mb-6">
                        {`Câu ${currentQuestionIndex + 1}`}
                    </h1>
                </div>
                <div className="flex px-10 justify-center">
                    <p className="text-gray-800 text-center mb-2 text-xl font-bold leading-relaxed">
                        {currentQuestion.content}
                    </p>
                </div>
                <div className="flex justify-center my-5">
                    <button
                        onClick={() => handleTextToSpeech(currentQuestion.content)}
                        className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-orange-600 transition transform hover:scale-105"
                    >
                        <FontAwesomeIcon className="text-4xl" icon={isPlaying ? faPause : faPlay} />
                    </button>
                </div>
                {userLastAnswer && !showAnswerResult && (
                    <div className={`text-center mb-4 ${userLastAnswer.isCorrect ? 'text-green-500' : 'text-red-500'}`}>
                        Bạn đã làm {userLastAnswer.isCorrect ? 'đúng' : 'sai'} câu hỏi này trong lần làm gần nhất!
                    </div>
                )}

                <div className="flex justify-center space-x-6 mb-8">
                    {currentQuestion.answers.map((answer) => (
                        <button
                            key={answer.id}
                            className={`p-5 w-24 h-24 text-2xl font-bold rounded-lg transition transform ${
                                selectedAnswer === answer
                                    ? 'bg-peach text-white scale-110 shadow-xl'
                                    : 'bg-white text-gray-800 shadow-lg hover:bg-gray-200'
                            }`}
                            onClick={() => handleAnswerClick(answer)}
                        >
                            {answer.content}
                        </button>
                    ))}
                </div>
                <div className="flex justify-center">
                    <button
                        onClick={handleSubmit}
                        className="bg-orange-500 text-white px-12 py-4 rounded-full text-lg font-semibold shadow-lg hover:bg-orange-600 transition transform hover:scale-105"
                    >
                        Gửi câu trả lời{' '}
                        <span className="ml-2">
                            <FontAwesomeIcon icon={faPaperPlane} />
                        </span>
                    </button>
                </div>
                {showAnswerResult && (
                    <div
                        className={`mt-20 text-center py-4 relative ${isAnswerCorrect ? 'bg-green-500' : 'bg-red-500'}`}
                    >
                        <img
                            src={isAnswerCorrect ? images.rightcat : images.sadcat}
                            className="w-20 absolute left-5 -top-20"
                            alt="cat"
                        />
                        <span className="text-white text-xl pb-4 font-bold">
                            {isAnswerCorrect ? 'ĐÚNG RỒI!' : 'SAI MẤT RỒI :('}
                        </span>
                        {!isAnswerCorrect && (
                            <>
                                {currentQuestion.explanation && (
                                    <div className="mt-4">
                                        <button
                                            onClick={() => setShowAnswer((prev) => !prev)}
                                            className="mb-4 bg-gray-300 text-gray-800 px-4 py-2 rounded-full text-lg font-semibold shadow-lg hover:bg-gray-400 transition transform hover:scale-105"
                                        >
                                            {showAnswer ? 'Đóng hướng dẫn' : 'Xem đáp án'}
                                        </button>
                                    </div>
                                )}
                                {showAnswer && (
                                    <div className="bg-gray-100 mt-4 p-10 text-center text-gray-700">
                                        <p>
                                            <strong>Đáp án đúng:</strong> {correctAnswer.content}
                                        </p>
                                        <div className="explanation mt-5">
                                            <p className='font-bold'>Giải thích:</p>
                                            <p>{currentQuestion.explanation}</p>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                )}
            </div>
            <div className="flex items-center justify-between mt-4 w-full max-w-3xl">
                <button
                    onClick={() => handleQuestionNavigation(-1)}
                    disabled={currentQuestionIndex === 0}
                    className="bg-indigo-500 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-indigo-600 transition transform hover:scale-105 disabled:bg-gray-400 cursor-pointer"
                >
                    Câu trước
                </button>
                <div className="px-6 py-3 bg-peach text-xl font-bold rounded-full text-white">
                    Đúng {correctCount}/{questions.length}
                </div>
                <button
                    onClick={() => handleQuestionNavigation(1)}
                    disabled={currentQuestionIndex === questions.length - 1}
                    className="bg-indigo-500 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-indigo-600 transition transform hover:scale-105 disabled:bg-gray-400 cursor-pointer"
                >
                    Câu tiếp theo
                </button>
            </div>
            {audioSrc && (
                <audio
                    ref={audioRef}
                    src={audioSrc}
                    onEnded={() => setIsPlaying(false)}
                    className="hidden"
                    controls
                    autoPlay
                />
            )}
        </div>
    );
};
export default Question;
