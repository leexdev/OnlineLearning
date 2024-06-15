import React from 'react';

const StepNavigation = ({ steps, currentStep }) => {
    return (
        <div className="flex justify-center items-center px-10 py-5 mb-4">
            {steps.map((step, index) => {
                const isActive = index === currentStep;
                const isCompleted = index < currentStep;

                return (
                    <React.Fragment key={index}>
                        <div className="flex flex-col items-center">
                            <div
                                className={`w-9 h-9 rounded-full flex items-center justify-center border-4 ${
                                    isActive ? 'bg-peach text-white border-orange-200' : 'bg-gray-300 text-gray-700'
                                }`}
                            >
                                {index + 1}
                            </div>
                            <span
                                className={`mt-2 text-center font-bold uppercase ${
                                    isActive ? 'text-gray-900' : 'text-gray-400'
                                }`}
                            >
                                {step}
                            </span>
                        </div>
                        {index < steps.length - 1 && (
                            <div
                                className="flex-1 border-t-4 mx-2"
                                style={{
                                    borderColor: isCompleted ? 'rgba(255, 159, 67, 1)' : 'rgba(209, 213, 219, 1)',
                                }}
                            />
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    );
};

export default StepNavigation;
