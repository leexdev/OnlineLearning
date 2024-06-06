import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';

const QuestionContent = ({ content, handleTextToSpeech, isPlaying }) => (
    <>
        <div className="flex px-10 justify-center">
            <p className="text-gray-800 text-center mb-2 text-xl font-bold leading-relaxed">
                {content}
            </p>
        </div>
        <div className="flex justify-center my-5">
            <button
                onClick={() => handleTextToSpeech(content)}
                className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-orange-600 transition transform hover:scale-105"
            >
                <FontAwesomeIcon className="text-4xl" icon={isPlaying ? faPause : faPlay} />
            </button>
        </div>
    </>
);

export default QuestionContent;
