import React, { Fragment, useState } from 'react';
import EditChapterModal from './EditChapterModal';
import Chapter from './Chapter';
import AddChapterModal from './AddChapterModal';
import { toast } from 'react-toastify';
import chapterApi from '~/api/chapterApi';
import lessonApi from '~/api/lessonApi'; // Import lesson API
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { convertErrorsToCamelCase } from '~/utils/errorUtils';
import EditLessonModal from '../Lesson/EditLessonModal';
import AddLessonModal from '../Lesson/AddLessonModal';
import AddQuestionModal from '../Question/AddQuesionModal';
import questionApi from '~/api/questionApi';

const ChapterForm = ({ courseId, onSubmit }) => {
    const [chapters, setChapters] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [lessonModalIsOpen, setLessonModalIsOpen] = useState(false);
    const [questionModalIsOpen, setQuestionModalIsOpen] = useState(false);
    const [editChapterModalIsOpen, setEditChapterModalIsOpen] = useState(false);
    const [editLessonModalIsOpen, setEditLessonModalIsOpen] = useState(false);
    const [newChapterTitle, setNewChapterTitle] = useState('');
    const [currentChapterIndex, setCurrentChapterIndex] = useState(null);
    const [currentLessonIndex, setCurrentLessonIndex] = useState(null);

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
            title: data.title,
            description: data.description,
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

    const addQuestion = (lessonIndex) => {
        setCurrentLessonIndex(lessonIndex);
        setQuestionModalIsOpen(true);
    };

    const handleAddQuestion = async (questionData, setError) => {
        console.log('questionData', questionData);
        const newQuestion = {
            content: questionData.content,
            explanation: questionData.explanation,
            language: questionData.language,
            isPronounce: questionData.isPronounce,
            lessonId: chapters[currentChapterIndex].lessons[currentLessonIndex].id,
        };

        try {
            const response = await questionApi.add(newQuestion);
            const createdQuestion = response;

            const newChapters = [...chapters];
            newChapters[currentChapterIndex].lessons[currentLessonIndex].questions.push(createdQuestion);
            setChapters(newChapters);

            toast.success('Thêm câu hỏi mới thành công');
            setQuestionModalIsOpen(false);
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

    const openEditChapterModal = (chapterIndex) => {
        setCurrentChapterIndex(chapterIndex);
        setEditChapterModalIsOpen(true);
    };

    const openEditLessonModal = (chapterIndex, lessonIndex) => {
        setCurrentChapterIndex(chapterIndex);
        setCurrentLessonIndex(lessonIndex);
        setEditLessonModalIsOpen(true);
    };

    const handleEditChapter = async (data, setError) => {
        const newChapters = [...chapters];
        newChapters[currentChapterIndex].name = data.name;
        try {
            await chapterApi.update(newChapters[currentChapterIndex].id, {
                name: data.name,
                courseId: courseId,
            });
            toast.success('Cập nhật chương thành công');
            setChapters(newChapters);
            setEditChapterModalIsOpen(false);
        } catch (error) {
            const responseData = error.response.data;
            if (responseData.errors) {
                const errorData = convertErrorsToCamelCase(responseData.errors);
                Object.keys(errorData).forEach((key) => setError(key, { type: 'manual', message: errorData[key] }));
            } else {
                toast.error('Không thể cập nhật chương');
            }
        }
    };

    const handleEditLesson = async (data, setError) => {
        const newChapters = [...chapters];
        const lessonToUpdate = newChapters[currentChapterIndex].lessons[currentLessonIndex];
        lessonToUpdate.title = data.title;
        lessonToUpdate.description = data.description;
        lessonToUpdate.isFree = data.isFree;

        const updateLessonDto = {
            title: lessonToUpdate.title,
            description: lessonToUpdate.description,
            isFree: lessonToUpdate.isFree,
            chapterId: lessonToUpdate.chapterId,
        };

        try {
            await lessonApi.update(lessonToUpdate.id, updateLessonDto);
            toast.success('Cập nhật bài giảng thành công');
            setChapters(newChapters);
            setEditLessonModalIsOpen(false);
        } catch (error) {
            const responseData = error.response.data;
            if (responseData.errors) {
                const errorData = convertErrorsToCamelCase(responseData.errors);
                Object.keys(errorData).forEach((key) => setError(key, { type: 'manual', message: errorData[key] }));
            } else {
                toast.error('Không thể cập nhật bài giảng');
            }
        }
    };

    const deleteChapter = async (chapterIndex) => {
        const chapterId = chapters[chapterIndex].id;
        try {
            await chapterApi.delete(chapterId);
            const newChapters = chapters.filter((_, index) => index !== chapterIndex);
            setChapters(newChapters);
            toast.success('Xóa chương thành công');
        } catch (error) {
            toast.error('Không thể xóa chương');
        }
    };

    const deleteLesson = async (chapterIndex, lessonIndex) => {
        const lessonId = chapters[chapterIndex].lessons[lessonIndex].id;
        try {
            await lessonApi.delete(lessonId);
            const newChapters = [...chapters];
            newChapters[chapterIndex].lessons = newChapters[chapterIndex].lessons.filter(
                (_, index) => index !== lessonIndex,
            );
            setChapters(newChapters);
            toast.success('Xóa bài giảng thành công');
        } catch (error) {
            toast.error('Không thể xóa bài giảng');
        }
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
                <AddChapterModal
                    isOpen={modalIsOpen}
                    closeModal={closeModal}
                    newChapterTitle={newChapterTitle}
                    setNewChapterTitle={setNewChapterTitle}
                    handleAddChapter={handleAddChapter}
                />

                <AddLessonModal
                    isOpen={lessonModalIsOpen}
                    closeModal={() => setLessonModalIsOpen(false)}
                    handleAddLesson={handleAddLesson}
                />

                <AddQuestionModal
                    isOpen={questionModalIsOpen}
                    closeModal={() => setQuestionModalIsOpen(false)}
                    handleAddQuestion={handleAddQuestion}
                />

                <EditChapterModal
                    isOpen={editChapterModalIsOpen}
                    closeModal={() => setEditChapterModalIsOpen(false)}
                    chapterData={chapters[currentChapterIndex]}
                    handleEdit={handleEditChapter}
                />

                <EditLessonModal
                    isOpen={editLessonModalIsOpen}
                    closeModal={() => setEditLessonModalIsOpen(false)}
                    lessonData={chapters[currentChapterIndex]?.lessons[currentLessonIndex]}
                    handleEdit={handleEditLesson}
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
                                                        openEditChapterModal={openEditChapterModal}
                                                        addLesson={addLesson}
                                                        addQuestion={addQuestion}
                                                        deleteChapter={deleteChapter}
                                                        deleteLesson={deleteLesson}
                                                        openEditLessonModal={openEditLessonModal}
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

                    <div className="flex justify-center mt-4 p-4">
                        <button
                            type="submit"
                            className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded shadow-md transition duration-200 ml-2"
                        >
                            Tiếp tục
                        </button>
                    </div>
                </form>
            </div>
        </Fragment>
    );
};

export default ChapterForm;
