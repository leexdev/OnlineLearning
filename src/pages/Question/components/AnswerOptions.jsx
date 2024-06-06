import React from 'react';

const AnswerOptions = ({ answers, selectedAnswer, handleAnswerClick }) => (
    <div className="flex justify-center space-x-6 mb-8">
        {answers.map((answer) => (
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
);

export default AnswerOptions;
