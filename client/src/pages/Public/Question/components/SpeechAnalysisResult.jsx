import React from 'react';

const SpeechAnalysisResult = ({ accuracy, differences }) => {
    return (
        <div className="mt-4">
            <p>Độ chính xác: {accuracy}%</p>
            {differences && differences.length > 0 && (
                <div>
                    <h4 className="mt-2">Từ khác biệt:</h4>
                    <p>
                        {differences.map((diff, index) => {
                            const [original, transcribed] = diff.split(', Transcribed: ');
                            const originalWord = original.replace('Original: ', '').trim();
                            const isMissing = transcribed.trim() === '(missing)';
                            return (
                                <span
                                    key={index}
                                    style={{
                                        color: isMissing || originalWord !== transcribed.trim() ? 'red' : 'black',
                                    }}
                                >
                                    {originalWord}{' '}
                                </span>
                            );
                        })}
                    </p>
                </div>
            )}
        </div>
    );
};

export default SpeechAnalysisResult;
