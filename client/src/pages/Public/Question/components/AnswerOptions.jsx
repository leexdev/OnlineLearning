import React, { useState, useEffect, Fragment } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const AnswerOptions = ({ answers, selectedAnswers, handleAnswerClick, isSortable }) => {
    const [answerList, setAnswerList] = useState([]);

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    useEffect(() => {
        setAnswerList(shuffleArray([...answers]));
    }, [answers]);

    const onAnswerClick = (answer) => {
        handleAnswerClick(answer);
    };

    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const updatedAnswers = Array.from(answerList);
        const [removed] = updatedAnswers.splice(result.source.index, 1);
        updatedAnswers.splice(result.destination.index, 0, removed);

        setAnswerList(updatedAnswers);
    };

    return (
        <div className="flex flex-col items-center">
            {!isSortable ? (
                <div className="flex flex-wrap justify-center space-x-2 mb-10">
                    {answerList.map((answer) => (
                        <button
                            key={answer.id}
                            className={`w-24 h-24 flex items-center justify-center p-2 text-lg font-bold rounded-lg transition-transform ${
                                selectedAnswers.includes(answer)
                                    ? 'bg-peach text-white scale-110 shadow-xl'
                                    : 'bg-white text-gray-800 shadow-lg hover:bg-gray-200'
                            }`}
                            onClick={() => onAnswerClick(answer)}
                        >
                            <div
                                className="flex items-center justify-center w-full h-full"
                                dangerouslySetInnerHTML={{ __html: answer.content }}
                            />
                        </button>
                    ))}
                </div>
            ) : (
                <div className="mb-10">
                    <div className="flex flex-wrap justify-center space-x-2">
                        {selectedAnswers.map((answer) => (
                            <button
                                key={answer.id}
                                className="w-24 h-24 flex items-center justify-center p-2 text-lg font-bold rounded-lg transition-transform bg-orange-500 text-white transform scale-105 shadow-lg m-2"
                                onClick={() => onAnswerClick(answer)}
                            >
                                <div
                                    className="flex items-center justify-center w-full h-full"
                                    dangerouslySetInnerHTML={{ __html: answer.content }}
                                />
                            </button>
                        ))}
                    </div>
                    <DragDropContext onDragEnd={handleDragEnd}>
                        <Droppable droppableId="droppable-answers" direction="horizontal">
                            {(provided) => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    className="flex flex-wrap justify-center space-x-2 mb-4"
                                >
                                    {answerList.map((answer, index) => (
                                        <Draggable key={answer.id} draggableId={String(answer.id)} index={index}>
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className={`w-24 h-24 flex items-center justify-center p-2 text-lg font-bold rounded-lg transition-transform ${
                                                        selectedAnswers.includes(answer)
                                                            ? 'hidden'
                                                            : 'bg-white text-gray-800 hover:bg-gray-200 m-2 shadow-md'
                                                    }`}
                                                    onClick={() => onAnswerClick(answer)}
                                                >
                                                    <div
                                                        className="flex items-center justify-center w-full h-full"
                                                        dangerouslySetInnerHTML={{ __html: answer.content }}
                                                    />
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                </div>
            )}
        </div>
    );
};

export default AnswerOptions;
