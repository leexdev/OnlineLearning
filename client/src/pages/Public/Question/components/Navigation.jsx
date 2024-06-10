import React from 'react';

const Navigation = ({ currentQuestionIndex, questionsLength, handleQuestionNavigation, correctCount }) => (
    <div className="flex items-center justify-between mt-4 w-full max-w-3xl">
        <button
            onClick={() => handleQuestionNavigation(-1)}
            disabled={currentQuestionIndex === 0}
            className="bg-indigo-500 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-indigo-600 transition transform hover:scale-105 disabled:bg-gray-400 cursor-pointer"
        >
            Câu trước
        </button>
        <div className="px-6 py-3 bg-peach text-xl font-bold rounded-full text-white">
            Đúng {correctCount}/{questionsLength}
        </div>
        <button
            onClick={() => handleQuestionNavigation(1)}
            disabled={currentQuestionIndex === questionsLength - 1}
            className="bg-indigo-500 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-indigo-600 transition transform hover:scale-105 disabled:bg-gray-400 cursor-pointer"
        >
            Câu tiếp theo
        </button>
    </div>
);

export default Navigation;
