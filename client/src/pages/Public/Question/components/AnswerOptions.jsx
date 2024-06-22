import React from 'react';

const AnswerOptions = ({ answers, selectedAnswer, handleAnswerClick }) => {
    console.log("answers", answers);
    return (
        <div className="flex justify-center space-x-6 mb-8">
            {answers &&
                answers.map((answer) => (
                    <button
                        key={answer.id}
                        className={`w-24 h-24 p-2 text-2xl font-bold rounded-lg transition transform overflow-hidden text-ellipsis ${
                            selectedAnswer === answer
                                ? 'bg-peach text-white scale-110 shadow-xl'
                                : 'bg-white text-gray-800 shadow-lg hover:bg-gray-200'
                        }`}
                        onClick={() => handleAnswerClick(answer)}
                    >
                        <div className="flex items-center justify-center w-full h-full text-center">
                            {answer.content}
                        </div>
                    </button>
                ))}
        </div>
    );
};

export default AnswerOptions;
