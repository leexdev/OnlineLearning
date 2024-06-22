import React, { Fragment, useEffect, useState } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { Controller, useForm } from 'react-hook-form';
import { faBars, faPen, faPlus, faTrash, faQuestion, faVideo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import lessonApi from '~/api/lessonApi';
import { toast } from 'react-toastify';
import Dropzone from './Dropzone';

const Chapter = ({
    chapterIndex,
    chapter,
    openEditChapterModal,
    openEditLessonModal,
    openEditQuestionModal,
    addLesson,
    addQuestion,
    deleteChapter,
    deleteLesson,
    deleteQuestion,
}) => {
    const [uploadStates, setUploadStates] = useState({});
    const [previewVideos, setPreviewVideos] = useState({});
    const [uploadedVideos, setUploadedVideos] = useState({});
    const { control, setError, clearErrors } = useForm();
    const [openQuestions, setOpenQuestions] = useState({});

    useEffect(() => {
        if (chapter && chapter.lessons) {
            const initialPreviewVideos = {};
            chapter.lessons.forEach((lesson, index) => {
                if (lesson.videoURL) {
                    initialPreviewVideos[index] = { previewURL: lesson.videoURL };
                }
            });
            console.log('initialPreviewVideos', initialPreviewVideos);
            setPreviewVideos(initialPreviewVideos);
        }
    }, [chapter]);

    const handleToggleUpload = (lessonIndex) => {
        setUploadStates((prev) => ({
            ...prev,
            [lessonIndex]: !prev[lessonIndex],
        }));
    };

    const toggleQuestionSection = (lessonIndex) => {
        setOpenQuestions((prev) => ({
            ...prev,
            [lessonIndex]: !prev[lessonIndex],
        }));
    };

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

    return (
        <Fragment>
            <div className="p-4">
                <div className="flex justify-between items-center">
                    <label className="block text-xl font-bold text-gray-700">
                        <FontAwesomeIcon className="mr-2" icon={faBars} />
                        {chapter.name}
                    </label>
                    <div className="flex mr-2">
                        <button
                            type="button"
                            onClick={() => openEditChapterModal(chapterIndex)}
                            className="ml-2 text-white bg-yellow-400 p-2 rounded-md"
                        >
                            <span className="font-bold">
                                <FontAwesomeIcon className="mr-1 text-xl" icon={faPen} />
                                Sửa
                            </span>
                        </button>
                        <button
                            type="button"
                            onClick={() => deleteChapter(chapterIndex)}
                            className="ml-2 text-white bg-red-500 p-2 rounded-md"
                        >
                            <span className="font-bold">
                                <FontAwesomeIcon className="mr-1 text-xl" icon={faTrash} />
                                Xóa
                            </span>
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
                                                            <div>
                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        openEditLessonModal(chapterIndex, lessonIndex)
                                                                    }
                                                                    className="ml-4 text-gray-900 bg-yellow-400 py-1 px-2 rounded-md"
                                                                >
                                                                    <span className="text-white text-base">
                                                                        <FontAwesomeIcon
                                                                            className="mr-1"
                                                                            icon={faPen}
                                                                        />
                                                                        Sửa
                                                                    </span>
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        deleteLesson(chapterIndex, lessonIndex)
                                                                    }
                                                                    className="ml-2 bg-red-500 py-1 px-2 rounded-md"
                                                                >
                                                                    <span className="text-white text-base">
                                                                        <FontAwesomeIcon
                                                                            className="mr-1"
                                                                            icon={faTrash}
                                                                        />
                                                                        Xóa
                                                                    </span>
                                                                </button>
                                                            </div>
                                                        </label>
                                                    </div>
                                                    <div className="flex justify-center items-center mr-3">
                                                        <button
                                                            type="button"
                                                            onClick={() => handleToggleUpload(lessonIndex)}
                                                            className="mr-2 bg-emerald-500 p-2 rounded-md"
                                                        >
                                                            <span className="text-white text-base font-bold">
                                                                <FontAwesomeIcon className="mr-1" icon={faVideo} />
                                                                Video
                                                            </span>
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => toggleQuestionSection(lessonIndex)}
                                                            className="mr-2 bg-teal-500 p-2 rounded-md"
                                                        >
                                                            <span className="text-white text-base font-bold">
                                                                <FontAwesomeIcon className="mr-1" icon={faQuestion} />
                                                                Câu Hỏi
                                                            </span>
                                                        </button>
                                                    </div>
                                                </div>
                                                {openQuestions[lessonIndex] && (
                                                    <div className="mt-5">
                                                        <div className="flex justify-center items-center mb-5">
                                                            <p className="font-bold block flex-1">Danh sách câu hỏi:</p>
                                                            <button
                                                                type="button"
                                                                onClick={() => addQuestion(lessonIndex)}
                                                                className="text-gray-900 mr-6"
                                                            >
                                                                <span className="p-2 bg-peach rounded-md font-bold text-white">
                                                                    <FontAwesomeIcon className="mr-1" icon={faPlus} />
                                                                    Thêm câu hỏi
                                                                </span>
                                                            </button>
                                                        </div>
                                                        <div className="flex">
                                                            <div className="flex-1">
                                                                {lesson.questions.map((question, questionIndex) => (
                                                                    <div
                                                                        key={question?.id}
                                                                        className="mb-2 p-2 bg-gray-50 rounded-md flex justify-center items-center"
                                                                    >
                                                                        <div className="content flex-1">
                                                                            {question?.content}
                                                                        </div>

                                                                        <button
                                                                            type="button"
                                                                            onClick={() =>
                                                                                openEditQuestionModal(
                                                                                    chapterIndex,
                                                                                    lessonIndex,
                                                                                    questionIndex,
                                                                                    question,
                                                                                )
                                                                            }
                                                                            className="text-gray-900 mr-2"
                                                                        >
                                                                            <FontAwesomeIcon
                                                                                className="p-2 bg-yellow-400 rounded-md text-white"
                                                                                icon={faPen}
                                                                            />
                                                                        </button>
                                                                        <button
                                                                            type="button"
                                                                            onClick={() =>
                                                                                deleteQuestion(
                                                                                    chapterIndex,
                                                                                    lessonIndex,
                                                                                    questionIndex,
                                                                                )
                                                                            }
                                                                            className="text-gray-900 mr-2"
                                                                        >
                                                                            <FontAwesomeIcon
                                                                                className="p-2 bg-red-500 rounded-md text-white"
                                                                                icon={faTrash}
                                                                            />
                                                                        </button>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                            <div></div>
                                                        </div>
                                                    </div>
                                                )}
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
                                                                        <button
                                                                            type="button"
                                                                            onClick={() =>
                                                                                handleRemoveVideo(lessonIndex)
                                                                            }
                                                                            className="mt-2 bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded shadow-md transition duration-200"
                                                                        >
                                                                            Bỏ Video
                                                                        </button>
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
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
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
