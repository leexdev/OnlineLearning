const convertErrorsToCamelCase = (responseData) => {
    const errorData = {};
    for (const fieldName in responseData.errors) {
        if (responseData.errors.hasOwnProperty(fieldName)) {
            const fieldNameCamelCase = fieldName.charAt(0).toLowerCase() + fieldName.slice(1);
            errorData[fieldNameCamelCase] = responseData.errors[fieldName][0];
        }
    }
    return errorData;
};

export { convertErrorsToCamelCase };
