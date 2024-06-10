import React from 'react';
import { ClipLoader } from 'react-spinners';

const Spinner = ({opacity}) => {
    return (
        <div className={`fixed inset-0 flex items-center justify-center bg-opacity-50 z-50 ${opacity ? opacity : ""}`}>
            <ClipLoader size={50} color={"#ccc"} loading={true} />
        </div>
    );
};

export default Spinner;
