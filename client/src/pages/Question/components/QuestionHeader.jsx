import React from 'react';

const QuestionHeader = ({ currentQuestionIndex }) => (
    <div className="flex justify-center">
        <h1 className="text-4xl font-extrabold text-center text-indigo-900 mb-6">
            {`Câu ${currentQuestionIndex + 1}`}
        </h1>
    </div>
);

export default QuestionHeader;
