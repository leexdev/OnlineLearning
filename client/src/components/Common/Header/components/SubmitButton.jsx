// SubmitButton.jsx
import React from 'react';

const SubmitButton = ({ label }) => (
    <button
        type="submit"
        className="w-full text-white bg-peach hover:bg-orange-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
    >
        {label}
    </button>
);

export default SubmitButton;
