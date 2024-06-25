import React, { useEffect } from 'react';
import images from '~/assets/images';
import sounds from '~/assets/sounds';

const AnswerResult = ({ isAnswerCorrect, currentQuestion, correctAnswer, showAnswer, setShowAnswer }) => {
    console.log('isAnswerCorrect', isAnswerCorrect);
    useEffect(() => {
        if (isAnswerCorrect !== null) {
            const audio = new Audio(isAnswerCorrect ? sounds.correct : sounds.wrong);

            console.log('audio', audio);
            audio.play();
        }
    }, [isAnswerCorrect]);

    return (
        <div className={`mt-20 text-center pt-4 relative ${isAnswerCorrect ? 'bg-green-500' : 'bg-red-500'}`}>
            <img
                src={isAnswerCorrect ? images.rightcat : images.sadcat}
                className="w-20 absolute left-5 -top-20"
                alt="cat"
            />
            <span className="text-white text-xl pb-4 font-bold">
                <div className="pb-4">{isAnswerCorrect ? 'ĐÚNG RỒI!' : 'SAI MẤT RỒI :('}</div>
            </span>
            {!isAnswerCorrect && (
                <>
                    <div className="pb-4">
                        <button
                            onClick={() => setShowAnswer((prev) => !prev)}
                            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-full text-lg font-semibold shadow-lg hover:bg-gray-400 transition transform hover:scale-105"
                        >
                            {showAnswer ? 'Đóng hướng dẫn' : 'Xem đáp án'}
                        </button>
                    </div>
                    {showAnswer && (
                        <div className="mt-4 text-center text-gray-700">
                            <div className="p-3 bg-white answer-correct">
                                <p>
                                    <strong>Đáp án đúng:</strong>{' '}
                                    {correctAnswer.map((answer, index) => (
                                        <div key={index} className="mt-2">
                                            {answer.content}
                                        </div>
                                    ))}
                                </p>
                            </div>
                            {currentQuestion.explanation && (
                                <div className="explanation p-5 bg-gray-100 pt-5">
                                    <p className="font-bold">Giải thích:</p>
                                    <p>{currentQuestion.explanation}</p>
                                </div>
                            )}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default AnswerResult;
