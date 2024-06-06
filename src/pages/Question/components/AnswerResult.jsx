import React from 'react';
import images from '~/assets/images';

const AnswerResult = ({ isAnswerCorrect, currentQuestion, correctAnswer, showAnswer, setShowAnswer }) => (
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
);

export default AnswerResult;
