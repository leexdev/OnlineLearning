// Spinner.jsx
import React from 'react';
import { ClipLoader } from 'react-spinners';

const Spinner = () => {
    return (
        <div className="fixed top-1/2 left-1/2 ">
            <ClipLoader size={50} color={"#123abc"} loading={true} />
        </div>
    );
};

export default Spinner;
