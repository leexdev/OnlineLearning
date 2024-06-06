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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

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
    const [correctAnswer, setCorrectAnswer] = useState(null);
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
                    URL.revokeObjectURL(audioSrc);
                    setAudioSrc(null);
                }

                const data = await textToSpeechApi.convertTextToSpeech(text);
                console.log(data);
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
                <QuestionHeader currentQuestionIndex={currentQuestionIndex} />
                <QuestionContent
                    content={currentQuestion.content}
                    handleTextToSpeech={handleTextToSpeech}
                    isPlaying={isPlaying}
                />
                {userLastAnswer && !showAnswerResult && (
                    <div className={`text-center mb-4 ${userLastAnswer.isCorrect ? 'text-green-500' : 'text-red-500'}`}>
                        Bạn đã làm {userLastAnswer.isCorrect ? 'đúng' : 'sai'} câu hỏi này trong lần làm gần nhất!
                    </div>
                )}
                <AnswerOptions
                    answers={currentQuestion.answers}
                    selectedAnswer={selectedAnswer}
                    handleAnswerClick={handleAnswerClick}
                />
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
                    <AnswerResult
                        isAnswerCorrect={isAnswerCorrect}
                        currentQuestion={currentQuestion}
                        correctAnswer={correctAnswer}
                        showAnswer={showAnswer}
                        setShowAnswer={setShowAnswer}
                    />
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
