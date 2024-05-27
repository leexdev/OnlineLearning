import React, { Fragment, useEffect, useState } from 'react';
import { faBars, faChevronDown, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const Sidebar = ({ chapters, activeLessonId, completedLessons }) => {
    // Xác định chương mặc định mở dựa trên activeLessonId
    const getDefaultOpenChapters = () => {
        const openChapters = {};
        chapters.forEach((chapter, index) => {
            if (chapter.lessons.some((lesson) => lesson.id === parseInt(activeLessonId))) {
                openChapters[index] = true;
            }
        });
        return openChapters;
    };

    const [openChapters, setOpenChapters] = useState(getDefaultOpenChapters());

    const handleToggle = (index) => {
        setOpenChapters((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    useEffect(() => {
        setOpenChapters(getDefaultOpenChapters());
    }, [activeLessonId, chapters]);

    const getCompletedLessonsCount = (chapter) => {
        return chapter.lessons.filter(lesson => completedLessons.includes(lesson.id)).length;
    };

    return (
        <Fragment>
            <button
                data-drawer-target="sidebar-multi-level-sidebar"
                data-drawer-toggle="sidebar-multi-level-sidebar"
                aria-controls="sidebar-multi-level-sidebar"
                type="button"
                className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            >
                <span className="sr-only">Open sidebar</span>
                <FontAwesomeIcon icon={faBars} />
            </button>
            <aside
                id="sidebar-multi-level-sidebar"
                className="fixed top-0 h-screen left-auto right-0 z-40 w-52 sm:w-64 md:w-64 xl:w-96 transition-transform translate-x-full sm:translate-x-0 pt-[60px]"
                aria-label="Sidebar"
            >
                <h4 className="p-3 text-lg md:text-xl font-bold bg-white">Nội dung khóa học</h4>
                <div className="h-full overflow-y-auto bg-white">
                    <ul className="space-y-2 font-medium">
                        {chapters.map((chapter, index) => (
                            <li key={index}>
                                <button
                                    type="button"
                                    className="flex items-center w-full p-3 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100"
                                    onClick={() => handleToggle(index)}
                                >
                                    <div className="flex-1 ms-3 text-left rtl:text-right">
                                        <div className="title font-bold text-sm md:text-base">{chapter.name}</div>
                                        <span className="text-sm">{getCompletedLessonsCount(chapter)}/{chapter.lessons.length} bài học</span>
                                    </div>
                                    <FontAwesomeIcon icon={faChevronDown} />
                                </button>
                                <ul
                                    id={`chapter-${index}`}
                                    className={`space-y-2 ${openChapters[index] ? '' : 'hidden'}`}
                                >
                                    {chapter.lessons.map((lesson, lessonIndex) => {
                                        const isActive = lesson.id === parseInt(activeLessonId);
                                        const isCompleted = completedLessons.includes(lesson.id);
                                        return (
                                            <li
                                                key={lessonIndex}
                                                className={`p-3 w-full transition duration-75 !mt-0 pl-7 group ${
                                                    isActive ? 'bg-blue-200 font-bold cursor-default' : 'hover:bg-gray-100'
                                                }`}
                                            >
                                                <Link
                                                    className={`flex items-center ${
                                                        isActive ? 'pointer-events-none' : ''
                                                    }`}
                                                    to={`/lesson/${lesson.id}`}
                                                >
                                                    <div className="flex-1 title p-2 text-sm md:text-base">
                                                        {lesson.order}. {lesson.title}
                                                    </div>
                                                    {isCompleted && (
                                                        <FontAwesomeIcon
                                                            className="text-right text-lime-500"
                                                            icon={faCheckCircle}
                                                        />
                                                    )}
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </div>
            </aside>
        </Fragment>
    );
};

export default Sidebar;
