import { faBars, faPen, faPlus, faTag, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Fragment, useState } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';

const Chapter = ({ chapterIndex, chapter, openEditModal, addLesson, deleteChapter, deleteLesson }) => {
    const [uploadStates, setUploadStates] = useState({});

    const handleToggleUpload = (lessonIndex) => {
        setUploadStates((prev) => ({
            ...prev,
            [lessonIndex]: !prev[lessonIndex],
        }));
    };

    return (
        <Fragment>
            <div className="p-4">
                <div className="flex justify-between items-center">
                    <label className="block text-xl font-bold text-gray-700">
                        <FontAwesomeIcon className="mr-2" icon={faBars} />
                        {chapter.name}
                    </label>
                    <div className="flex mr-5">
                        <button
                            type="button"
                            onClick={() => openEditModal(chapterIndex)}
                            className="ml-2 text-gray-900 p-2 rounded-md"
                        >
                            <FontAwesomeIcon className="text-xl" icon={faPen} />
                        </button>
                        <button
                            type="button"
                            onClick={() => deleteChapter(chapterIndex)}
                            className="ml-2 text-gray-900 p-2 rounded-md"
                        >
                            <FontAwesomeIcon className="text-xl" icon={faTrash} />
                        </button>
                    </div>
                </div>
                <span className="text-base">Tổng bài giảng: {chapter.lessons.length}</span>
                <Droppable droppableId={`lessons-${chapterIndex}`} type="lessons">
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef} className="mt-4">
                            {chapter.lessons.map((lesson, lessonIndex) => (
                                <Draggable key={lesson.id} draggableId={lesson.id.toString()} index={lessonIndex}>
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            className="mb-2 ml-2 flex justify-between items-center"
                                        >
                                            <div className="w-full">
                                                <div className="flex justify-between items-center">
                                                    <div className="flex justify-center items-center">
                                                        <label className="text-base font-semibold text-gray-700 flex justify-center items-center">
                                                            <FontAwesomeIcon className="mr-1" icon={faPlus} />
                                                            {lesson.order}. {lesson.title}
                                                            <div className="flex space-x-2">
                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        openEditModal(chapterIndex, lessonIndex)
                                                                    }
                                                                    className="ml-4 text-gray-900 p-1 rounded-md"
                                                                >
                                                                    <FontAwesomeIcon icon={faPen} />
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        deleteLesson(chapterIndex, lessonIndex)
                                                                    }
                                                                    className="ml-2 text-gray-900 p-1 rounded-md"
                                                                >
                                                                    <FontAwesomeIcon icon={faTrash} />
                                                                </button>
                                                            </div>
                                                        </label>
                                                    </div>
                                                    <div className="mr-5">
                                                        <button
                                                            type="button"
                                                            onClick={() => handleToggleUpload(lessonIndex)}
                                                        >
                                                            <FontAwesomeIcon className="p-2 text-xl" icon={faTag} />
                                                        </button>
                                                    </div>
                                                </div>
                                                {uploadStates[lessonIndex] && (
                                                    <div className="mt-4 p-4 border border-gray-300 rounded-md h-[200px]">
                                                        <label className="block mb-2 text-sm font-medium text-gray-700">
                                                            Video Bài Giảng*
                                                        </label>
                                                        <input
                                                            type="file"
                                                            className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer"
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
            <button
                onClick={() => addLesson(chapterIndex)}
                type="button"
                className="bg-gray-900 font-bold text-left text-white p-4 w-full flex items-center"
            >
                <FontAwesomeIcon className="mr-1" icon={faPlus} />
                Tạo Bài Giảng
            </button>
        </Fragment>
    );
};

export default Chapter;
