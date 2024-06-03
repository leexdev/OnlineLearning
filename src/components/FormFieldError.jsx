import React from 'react';

const FormFieldError = ({ message }) => {
    if (!message) return null;

    return <p className="mt-2 text-sm text-red-600">{message}</p>;
};

export default FormFieldError;
