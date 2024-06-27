import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';

const QuestionContent = ({ content, handleTextToSpeech, isPlaying, countCorrectAnswers, isPronounce, isSortable }) => {
    console.log('countCorrectAnswers', countCorrectAnswers);

    const stripHtmlTags = (html) => {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || '';
    };

    const strippedContent = stripHtmlTags(content);

    const getMessage = () => {
        if (isPronounce || isSortable) {
            return '';
        }
        return countCorrectAnswers > 1 ? '(chọn 1 hoặc nhiều đáp án)' : '(chỉ chọn 1 đáp án)';
    };

    return (
        <>
            <div className="flex px-10 justify-center">
                <div className="text-center mb-2 text-xl font-bold leading-relaxed text-gray-800">
                    <div
                        className="content flex-1 max-w-[60vh] overflow-hidden"
                        dangerouslySetInnerHTML={{ __html: content }}
                    />
                    <p>{getMessage()}</p>
                </div>
            </div>
            <div className="flex justify-center my-5">
                <button
                    onClick={() => handleTextToSpeech(strippedContent)}
                    className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-orange-600 transition transform hover:scale-105"
                >
                    <FontAwesomeIcon className="text-4xl" icon={isPlaying ? faPause : faPlay} />
                </button>
            </div>
        </>
    );
};

export default QuestionContent;
