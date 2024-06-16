import React, { Fragment, useState } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { Controller, useForm } from 'react-hook-form';
import { faBars, faPen, faPlus, faTag, faTrash, faQuestion } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import lessonApi from '~/api/lessonApi';
import { toast } from 'react-toastify';
import Dropzone from './Dropzone';

const Chapter = ({
    chapterIndex,
    chapter,
    openEditChapterModal,
    openEditLessonModal,
    addLesson,
    addQuestion,
    deleteChapter,
    deleteLesson,
}) => {
    const [uploadStates, setUploadStates] = useState({});
    const [previewVideos, setPreviewVideos] = useState({});
    const [uploadedVideos, setUploadedVideos] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [currentLessonIndex, setCurrentLessonIndex] = useState(null);
    const { control, setError, clearErrors } = useForm();

    const handleToggleUpload = (lessonIndex) => {
        if (previewVideos[lessonIndex] && !uploadedVideos[lessonIndex]) {
            setShowModal(true);
            setCurrentLessonIndex(lessonIndex);
        } else {
            setUploadStates((prev) => ({
                ...prev,
                [lessonIndex]: !prev[lessonIndex],
            }));
        }
    };

    console.log("chapter", chapter);
    const handleDrop = (acceptedFiles, rejectedFiles, lessonIndex) => {
        if (rejectedFiles && rejectedFiles.length > 0) {
            setError(`lesson-${lessonIndex}-video`, {
                type: 'manual',
                message: 'Chỉ hỗ trợ video .mp4',
            });
            return;
        }

        const file = acceptedFiles[0];
        if (file.type !== 'video/mp4') {
            setError(`lesson-${lessonIndex}-video`, {
                type: 'manual',
                message: 'Chỉ hỗ trợ video .mp4',
            });
            return;
        }

        const previewURL = URL.createObjectURL(file);
        setPreviewVideos((prev) => ({
            ...prev,
            [lessonIndex]: { previewURL, file },
        }));
        clearErrors(`lesson-${lessonIndex}-video`);
    };

    const handleRemoveVideo = (lessonIndex) => {
        setPreviewVideos((prev) => {
            const updatedPreviews = { ...prev };
            delete updatedPreviews[lessonIndex];
            return updatedPreviews;
        });
        setUploadedVideos((prev) => {
            const updatedUploads = { ...prev };
            delete updatedUploads[lessonIndex];
            return updatedUploads;
        });
    };

    const handleUploadVideo = async (lessonIndex, lessonId) => {
        const videoData = previewVideos[lessonIndex];
        if (!videoData) {
            setError(`lesson-${lessonIndex}-video`, {
                type: 'manual',
                message: 'Không có video để tải lên',
            });
            return;
        }

        const file = videoData.file;

        if (!(file instanceof Blob)) {
            console.error('Selected file is not a Blob or File.');
            setError(`lesson-${lessonIndex}-video`, {
                type: 'manual',
                message: 'File được chọn không hợp lệ',
            });
            return;
        }

        try {
            const formData = new FormData();
            formData.append('videoFile', file, file.name);

            const response = await lessonApi.uploadVideo(lessonId, formData);

            if (response) {
                toast.success('Video đã được tải lên thành công!');
                setUploadedVideos((prev) => ({
                    ...prev,
                    [lessonIndex]: true,
                }));
            } else {
                throw new Error(`Unexpected status code: ${response.status}`);
            }
        } catch (error) {
            console.error('Error uploading video:', error);
            setError(`lesson-${lessonIndex}-video`, {
                type: 'manual',
                message: 'Có lỗi xảy ra khi tải lên video',
            });
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setCurrentLessonIndex(null);
    };

    const confirmCloseUploadSection = () => {
        if (currentLessonIndex !== null) {
            setUploadStates((prev) => ({
                ...prev,
                [currentLessonIndex]: !prev[currentLessonIndex],
            }));
            handleCloseModal();
            resetVideoTrongLesson();
        }
    };

    const resetVideoTrongLesson = () => {
        if (currentLessonIndex !== null && previewVideos[currentLessonIndex]) {
            setPreviewVideos((prev) => {
                const updatedPreviews = { ...prev };
                delete updatedPreviews[currentLessonIndex];
                return updatedPreviews;
            });
        }
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
                            onClick={() => openEditChapterModal(chapterIndex)}
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
                                                        <label className="text-lg font-semibold text-gray-700 flex justify-center items-center">
                                                            <FontAwesomeIcon className="mr-1" icon={faPlus} />
                                                            {lesson.title}
                                                            <div className="flex space-x-2">
                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        openEditLessonModal(chapterIndex, lessonIndex)
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
                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        addQuestion(chapterIndex, lessonIndex)
                                                                    }
                                                                    className="ml-2 text-gray-900 p-1 rounded-md"
                                                                >
                                                                    <FontAwesomeIcon icon={faQuestion} />
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
                                                    <div className="mt-4">
                                                        <label className="block mb-2 font-bold text-gray-700">
                                                            Video Bài Giảng*
                                                        </label>
                                                        <div className="border-2 border-dashed border-gray-300 rounded-md">
                                                            <Controller
                                                                control={control}
                                                                name={`lesson-${lessonIndex}-video`}
                                                                render={({ field, fieldState: { error } }) => (
                                                                    <Dropzone
                                                                        lessonIndex={lessonIndex}
                                                                        handleDrop={(acceptedFiles, rejectedFiles) =>
                                                                            handleDrop(
                                                                                acceptedFiles,
                                                                                rejectedFiles,
                                                                                lessonIndex,
                                                                            )
                                                                        }
                                                                        previewVideos={previewVideos}
                                                                        error={error}
                                                                    />
                                                                )}
                                                            />
                                                            {previewVideos[lessonIndex] && (
                                                                <div className="pb-4">
                                                                    <div className="flex justify-center items-center">
                                                                        {!uploadedVideos[lessonIndex] && (
                                                                            <button
                                                                                type="button"
                                                                                onClick={() =>
                                                                                    handleRemoveVideo(lessonIndex)
                                                                                }
                                                                                className="mt-2 bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded shadow-md transition duration-200"
                                                                            >
                                                                                Bỏ Video
                                                                            </button>
                                                                        )}
                                                                        {!uploadedVideos[lessonIndex] && (
                                                                            <button
                                                                                type="button"
                                                                                onClick={() =>
                                                                                    handleUploadVideo(
                                                                                        lessonIndex,
                                                                                        lesson.id,
                                                                                    )
                                                                                }
                                                                                className="mt-2 ml-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded shadow-md transition duration-200"
                                                                            >
                                                                                Tải Video Lên
                                                                            </button>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                                {/* Displaying Questions */}
                                                <div className="mt-4">
                                                    {lesson.questions && lesson.questions.length > 0 && (
                                                        <div>
                                                            <p className="font-bold mb-2">Danh sách câu hỏi:</p>
                                                            {lesson.questions.map((question, questionIndex) => (
                                                                <div
                                                                    key={question.id}
                                                                    className="mb-2 p-2 bg-gray-100 rounded-md"
                                                                >
                                                                    {question.content}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                    {lesson.questions && lesson.questions.length === 0 && (
                                                        <p>Không có câu hỏi cho bài học này.</p>
                                                    )}
                                                </div>
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
            {showModal && (
                <div className="fixed inset-0 z-50 flex cursor-default items-center justify-center overflow-auto bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
                        <h2 className="text-lg font-semibold mb-4">Chưa tải video lên</h2>
                        <p className="mb-4">Bạn chưa tải video lên cho bài giảng này. Bạn có chắc muốn đóng?</p>
                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={handleCloseModal}
                                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                            >
                                Hủy
                            </button>
                            <button
                                type="button"
                                onClick={confirmCloseUploadSection}
                                className="bg-red-500 text-white px-4 py-2 rounded"
                            >
                                Đóng
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </Fragment>
    );
};

export default Chapter;
