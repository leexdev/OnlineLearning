import React, { Fragment, useState, useEffect } from 'react';
import LessonModal from '../Lesson/LessonModal';
import EditModal from '../EditModal';
import Chapter from './Chapter';
import ChapterModal from './ChapterModal';
import { toast } from 'react-toastify';
import chapterApi from '~/api/chapterApi';
import lessonApi from '~/api/lessonApi'; // Import lesson API
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { convertErrorsToCamelCase } from '~/utils/errorUtils';

const ChapterForm = ({ courseId, onSubmit }) => {
    const [chapters, setChapters] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [lessonModalIsOpen, setLessonModalIsOpen] = useState(false);
    const [editModalIsOpen, setEditModalIsOpen] = useState(false);
    const [newChapterTitle, setNewChapterTitle] = useState('');
    const [newLessonTitle, setNewLessonTitle] = useState('');
    const [currentChapterIndex, setCurrentChapterIndex] = useState(null);
    const [currentLessonIndex, setCurrentLessonIndex] = useState(null);
    const [isEditingChapter, setIsEditingChapter] = useState(false);

    useEffect(() => {
        const fetchChapters = async () => {
            try {
                const response = await chapterApi.getList(courseId);
                setChapters(response);
            } catch (error) {
                toast.error('Không thể tải danh sách chương');
            }
        };

        fetchChapters();
    }, [courseId]);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleAddChapter = async (data, setError) => {
        const newChapter = { name: data.name, courseId };

        try {
            const response = await chapterApi.add(newChapter);
            const createdChapter = response;
            toast.success('Thêm chương mới thành công');
            setChapters([...chapters, createdChapter]);
            setNewChapterTitle('');
            closeModal();
        } catch (error) {
            const responseData = error.response.data;
            if (responseData.errors) {
                const errorData = convertErrorsToCamelCase(responseData.errors);
                Object.keys(errorData).forEach((key) => setError(key, { type: 'manual', message: errorData[key] }));
            } else {
                toast.error('Không thể thêm chương mới');
            }
        }
    };

    const addLesson = (chapterIndex) => {
        setCurrentChapterIndex(chapterIndex);
        setLessonModalIsOpen(true);
    };

    const handleAddLesson = async (data, setError) => {
        const newLesson = {
            title: data.Title,
            description: data.Description,
            isFree: data.isFree || false,
            chapterId: chapters[currentChapterIndex].id,
        };

        try {
            const response = await lessonApi.add(newLesson);
            const createdLesson = response;

            const newChapters = [...chapters];
            newChapters[currentChapterIndex].lessons.push(createdLesson);
            setChapters(newChapters);

            toast.success('Thêm bài giảng mới thành công');
            setLessonModalIsOpen(false);
        } catch (error) {
            const responseData = error.response.data;
            if (responseData.errors) {
                const errorData = convertErrorsToCamelCase(responseData.errors);
                Object.keys(errorData).forEach((key) => setError(key, { type: 'manual', message: errorData[key] }));
            } else {
                toast.error('Không thể thêm bài giảng mới');
            }
        }
    };

    const openEditModal = (chapterIndex, lessonIndex = null) => {
        setCurrentChapterIndex(chapterIndex);
        setCurrentLessonIndex(lessonIndex);
        setIsEditingChapter(lessonIndex === null);
        if (lessonIndex === null) {
            setNewChapterTitle(chapters[chapterIndex].name);
        } else {
            setNewLessonTitle(chapters[chapterIndex].lessons[lessonIndex].title);
        }
        setEditModalIsOpen(true);
    };

    const handleEdit = () => {
        const newChapters = [...chapters];
        if (isEditingChapter) {
            newChapters[currentChapterIndex].name = newChapterTitle;
        } else {
            newChapters[currentChapterIndex].lessons[currentLessonIndex].title = newLessonTitle;
        }
        setChapters(newChapters);
        setEditModalIsOpen(false);
    };

    const deleteChapter = (chapterIndex) => {
        const newChapters = chapters.filter((_, index) => index !== chapterIndex);
        setChapters(newChapters);
    };

    const deleteLesson = (chapterIndex, lessonIndex) => {
        const newChapters = [...chapters];
        newChapters[chapterIndex].lessons = newChapters[chapterIndex].lessons.filter(
            (_, index) => index !== lessonIndex,
        );
        setChapters(newChapters);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(chapters);
    };

    const onDragEnd = async (result) => {
        if (!result.destination) return;

        const { source, destination, type } = result;

        if (type === 'chapters') {
            const reorderedChapters = Array.from(chapters);
            const [removed] = reorderedChapters.splice(source.index, 1);
            reorderedChapters.splice(destination.index, 0, removed);

            const updatedChapters = reorderedChapters.map((chapter, index) => ({
                ...chapter,
                order: index + 1,
            }));

            setChapters(updatedChapters);

            try {
                await chapterApi.updateOrder(courseId, updatedChapters);
                toast.success('Sắp xếp chương thành công');
            } catch (error) {
                toast.error('Không thể sắp xếp chương');
            }
        } else if (type === 'lessons') {
            const sourceChapterIndex = parseInt(source.droppableId.split('-')[1]);
            const destinationChapterIndex = parseInt(destination.droppableId.split('-')[1]);

            const sourceChapter = chapters[sourceChapterIndex];
            const destinationChapter = chapters[destinationChapterIndex];

            const [removed] = sourceChapter.lessons.splice(source.index, 1);
            destinationChapter.lessons.splice(destination.index, 0, removed);

            const newChapters = [...chapters];
            newChapters[sourceChapterIndex] = sourceChapter;
            newChapters[destinationChapterIndex] = destinationChapter;

            setChapters(newChapters);

            const updatedLessons = destinationChapter.lessons.map((lesson, index) => ({
                ...lesson,
                order: index + 1,
            }));

            try {
                await lessonApi.updateOrder(destinationChapter.id, updatedLessons);
                toast.success('Sắp xếp bài giảng thành công');
            } catch (error) {
                toast.error('Không thể sắp xếp bài giảng');
            }
        }
    };

    return (
        <Fragment>
            <div className="bg-white rounded-lg">
                <div className="p-4 flex justify-between">
                    <h2 className="text-xl font-bold mt-2">Chương Trình Giảng Dạy</h2>
                    <button
                        type="button"
                        onClick={openModal}
                        className="mt-2 bg-peach font-bold text-white p-2 rounded-md"
                    >
                        Thêm Chương
                    </button>
                </div>
                <ChapterModal
                    isOpen={modalIsOpen}
                    closeModal={closeModal}
                    newChapterTitle={newChapterTitle}
                    setNewChapterTitle={setNewChapterTitle}
                    handleAddChapter={handleAddChapter}
                />

                <LessonModal
                    isOpen={lessonModalIsOpen}
                    closeModal={() => setLessonModalIsOpen(false)}
                    handleAddLesson={handleAddLesson}
                />

                <EditModal
                    isOpen={editModalIsOpen}
                    closeModal={() => setEditModalIsOpen(false)}
                    isEditingChapter={isEditingChapter}
                    newChapterTitle={newChapterTitle}
                    setNewChapterTitle={setNewChapterTitle}
                    newLessonTitle={newLessonTitle}
                    setNewLessonTitle={setNewLessonTitle}
                    handleEdit={handleEdit}
                />

                <form onSubmit={handleSubmit} className="bg-white shadow-md">
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="chapters" type="chapters">
                            {(provided) => (
                                <div {...provided.droppableProps} ref={provided.innerRef}>
                                    {chapters.map((chapter, chapterIndex) => (
                                        <Draggable
                                            key={chapter.id}
                                            draggableId={chapter.id.toString()}
                                            index={chapterIndex}
                                        >
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    <Chapter
                                                        chapterIndex={chapterIndex}
                                                        chapter={chapter}
                                                        openEditModal={openEditModal}
                                                        addLesson={addLesson}
                                                        deleteChapter={deleteChapter}
                                                        deleteLesson={deleteLesson}
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
                    {chapters.length > 0 && (
                        <div className="text-center">
                            <button type="submit" className="my-4 bg-peach text-xl font-bold text-white p-2 rounded-md">
                                Hoàn Thành
                            </button>
                        </div>
                    )}
                </form>
            </div>
        </Fragment>
    );
};

export default ChapterForm;
