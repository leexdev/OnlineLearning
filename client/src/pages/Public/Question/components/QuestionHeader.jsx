import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';

const QuestionHeader = ({ currentQuestionIndex }) => (
    <Fragment>
        <Helmet>
            <title>{`Câu ${currentQuestionIndex + 1}`}</title>
        </Helmet>
        <div className="flex justify-center">
            <h1 className="text-4xl font-extrabold text-center text-indigo-900 mb-6">
                {`Câu ${currentQuestionIndex + 1}`}
            </h1>
        </div>
    </Fragment>
);

export default QuestionHeader;
