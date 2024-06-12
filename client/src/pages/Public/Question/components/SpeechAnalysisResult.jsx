import React from 'react';

const SpeechAnalysisResult = ({ accuracy, differences }) => {
    return (
        <div className="mt-4">
            <p>Độ chính xác: {accuracy}%</p>
            {differences && differences.length > 0 && (
                <div>
                    <h4 className="mt-2">Từ khác biệt:</h4>
                    <ul className="list-disc list-inside">
                        {differences.map((diff, index) => {
                            const [original, transcribed] = diff.split(', Transcribed: ');
                            const originalWords = original.replace('Original: ', '').split(' ');
                            const transcribedWords = transcribed.split(' ');
                            return (
                                <li key={index} className="text-black">
                                    {originalWords.map((word, i) => (
                                        <span key={i}>
                                            {word}{' '}
                                            {transcribedWords[i] === '(missing)' ? (
                                                <span className="text-red-500">(missing) </span>
                                            ) : (
                                                <span className={transcribedWords[i] !== word ? 'text-red-500' : ''}>
                                                    {transcribedWords[i]}{' '}
                                                </span>
                                            )}
                                        </span>
                                    ))}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SpeechAnalysisResult;
