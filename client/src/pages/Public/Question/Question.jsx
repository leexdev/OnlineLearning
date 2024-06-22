import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import textToSpeechApi from '~/api/textToSpeechAPI';
import questionApi from '~/api/questionApi';
import userAnswerApi from '~/api/userAnswerApi';
import QuestionHeader from './components/QuestionHeader';
import QuestionContent from './components/QuestionContent';
import AnswerOptions from './components/AnswerOptions';
import AnswerResult from './components/AnswerResult';
import Navigation from './components/Navigation';
import SpeechAnalysisResult from './components/SpeechAnalysisResult'; // Import component mới
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const Question = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [audioSrc, setAudioSrc] = useState(null);
    const [recordedAudioSrc, setRecordedAudioSrc] = useState(null);
    const [history, setHistory] = useState([]);
    const [correctCount, setCorrectCount] = useState(0);
    const [userLastAnswer, setUserLastAnswer] = useState(null);
    const [correctAnswers, setCorrectAnswers] = useState({});
    const [showAnswerResult, setShowAnswerResult] = useState(false);
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [showExplanation, setShowExplanation] = useState(false);
    const [showAnswer, setShowAnswer] = useState(false);
    const [correctAnswer, setCorrectAnswer] = useState(null);
    const [accuracy, setAccuracy] = useState(null);
    const [differences, setDifferences] = useState([]);
    const [isRecording, setIsRecording] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [recorder, setRecorder] = useState(null);
    const audioChunkRef = useRef([]);
    const mediaStreamRef = useRef(null);
    const audioRef = useRef(null);
    const recordedAudioRef = useRef(null);
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
                    setCorrectAnswer(correctAns);
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
            setShowAnswer(false);
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
                setIsPlaying(false);
                URL.revokeObjectURL(audioSrc);
                setAudioSrc(null);
            }
            if (recordedAudioRef.current) {
                recordedAudioRef.current.pause();
                recordedAudioRef.current.currentTime = 0;
                setRecordedAudioSrc(null);
            }
            setShowAnswerResult(null);
            checkUserAnswerHistory(questions[newIndex].id);
        }
    };

    const handleStartRecording = async () => {
        if (!isRecording) {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                mediaStreamRef.current = stream;

                const newRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
                setRecorder(newRecorder);

                audioChunkRef.current = [];

                newRecorder.ondataavailable = (event) => {
                    if (event.data.size > 0) {
                        audioChunkRef.current.push(event.data);
                    }
                };

                newRecorder.onstop = async () => {
                    const audioBlob = new Blob(audioChunkRef.current, { type: 'audio/webm' });
                    if (audioBlob.size === 0) {
                        alert('Tệp âm thanh rỗng. Vui lòng ghi âm lại.');
                        return;
                    }
                    if (recordedAudioSrc) {
                        URL.revokeObjectURL(recordedAudioSrc);
                    }
                    const audioURL = URL.createObjectURL(audioBlob);
                    setRecordedAudioSrc(audioURL);
                    if (recordedAudioRef.current) {
                        recordedAudioRef.current.src = audioURL;
                    }
                    await handleAnalyzeAudio(audioBlob);
                };

                // Wait a bit to ensure the recorder is ready
                setTimeout(() => {
                    newRecorder.start();
                    setIsRecording(true);
                }, 100); // 100ms delay to ensure recorder is ready
            } catch (error) {
                console.error('Error starting recording:', error);
            }
        }
    };

    const handleStopRecording = () => {
        if (isRecording && recorder) {
            recorder.stop();
            mediaStreamRef.current.getTracks().forEach((track) => track.stop());
            setIsRecording(false);
        }
    };

    const handleAnalyzeAudio = async (audioBlob) => {
        if (!audioBlob || audioBlob.size === 0) {
            alert('Tệp âm thanh rỗng. Vui lòng ghi âm lại.');
            return;
        }

        setIsLoading(true); // Bắt đầu trạng thái loading

        const formData = new FormData();
        formData.append('AudioFile', audioBlob, 'audio.webm');
        formData.append('originalText', questions[currentQuestionIndex].content);

        try {
            const response = await questionApi.analyzeAudio(formData);
            console.log(response);
            setAccuracy(response.accuracy);
            setDifferences(response.differences);
            let isCorrect;
            if (response.accuracy > 80) {
                isCorrect = true;
            } else {
                isCorrect = false;
            }
            const userAnswerHistoryDto = {
                questionId: questions[currentQuestionIndex].id,
                isCorrect: isCorrect,
                accuracy: response.accuracy,
            };

            await userAnswerApi.saveUserAnswerHistory(userAnswerHistoryDto);
            setUserLastAnswer(null);
        } catch (error) {
            console.error('Lỗi phân tích âm thanh:', error);
            if (error.response) {
                console.error('Chi tiết lỗi:', error.response.data);
            }
        } finally {
            setIsLoading(false); // Kết thúc trạng thái loading
        }
    };

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

    const callTextToSpeechAPI = useCallback(
        async (text) => {
            try {
                if (audioRef.current) {
                    audioRef.current.pause();
                    setIsPlaying(false);
                    URL.revokeObjectURL(audioSrc);
                    setAudioSrc(null);
                }

                const currentQuestion = questions[currentQuestionIndex];
                const data = await textToSpeechApi.convertTextToSpeech(text, currentQuestion.language);
                const blob = new Blob([data], { type: 'audio/mpeg' });
                const url = URL.createObjectURL(blob);
                setAudioSrc(url);
                setIsPlaying(true);
            } catch (error) {
                console.error('Lỗi chuyển văn bản thành giọng nói:', error);
            }
        },
        [audioSrc, currentQuestionIndex, questions],
    );

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className="lg:min-h-screen bg-gradient-to-r bg-sky-700 flex flex-col items-center justify-center p-4">
            <div className="bg-white py-10 rounded-3xl border-sky-600 border-8 shadow-2xl max-w-3xl w-full transform transition duration-500 hover:scale-105 mb-6">
                <QuestionHeader currentQuestionIndex={currentQuestionIndex} />
                {currentQuestion && (
                    <>
                        <QuestionContent
                            content={currentQuestion.content}
                            handleTextToSpeech={handleTextToSpeech}
                            isPlaying={isPlaying}
                        />
                        {userLastAnswer && !showAnswerResult && (
                            <div
                                className={`text-center mb-4 ${
                                    userLastAnswer.isCorrect ? 'text-green-500' : 'text-red-500'
                                }`}
                            >
                                Bạn đã làm {userLastAnswer.isCorrect ? 'đúng' : 'sai'} câu hỏi này trong lần làm gần
                                nhất!
                                {userLastAnswer.accuracy && <p>Đúng: {userLastAnswer.accuracy}%</p>}
                            </div>
                        )}
                        <AnswerOptions
                            answers={currentQuestion.answers}
                            selectedAnswer={selectedAnswer}
                            handleAnswerClick={handleAnswerClick}
                        />
                        <div className="flex justify-center">
                            {currentQuestion.isPronounce === false && (
                                <button
                                    onClick={handleSubmit}
                                    className="bg-orange-500 text-white px-12 py-4 rounded-full text-lg font-semibold shadow-lg hover:bg-orange-600 transition transform hover:scale-105"
                                >
                                    Gửi câu trả lời{' '}
                                    <span className="ml-2">
                                        <FontAwesomeIcon icon={faPaperPlane} />
                                    </span>
                                </button>
                            )}
                        </div>
                        {showAnswerResult && (
                            <AnswerResult
                                isAnswerCorrect={isAnswerCorrect}
                                currentQuestion={currentQuestion}
                                correctAnswer={correctAnswer}
                                showAnswer={showAnswer}
                                setShowAnswer={setShowAnswer}
                            />
                        )}
                        {currentQuestion.isPronounce === true && (
                            <div className="flex flex-col items-center">
                                {!isRecording ? (
                                    <button
                                        onClick={handleStartRecording}
                                        className="bg-peach text-white px-4 py-2 rounded"
                                        disabled={isLoading}
                                    >
                                        Bắt đầu ghi âm
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleStopRecording}
                                        className="bg-red-500 text-white px-4 py-2 rounded"
                                    >
                                        Dừng ghi âm
                                    </button>
                                )}
                                {recordedAudioSrc && (
                                    <div className="mt-4">
                                        <audio ref={recordedAudioRef} src={recordedAudioSrc} controls />
                                    </div>
                                )}
                                {accuracy !== null && (
                                    <SpeechAnalysisResult accuracy={accuracy} differences={differences} />
                                )}
                            </div>
                        )}
                    </>
                )}
            </div>
            <Navigation
                currentQuestionIndex={currentQuestionIndex}
                questionsLength={questions.length}
                handleQuestionNavigation={handleQuestionNavigation}
                correctCount={correctCount}
            />
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
