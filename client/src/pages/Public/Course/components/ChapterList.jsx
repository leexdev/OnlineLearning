import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import LessonItem from './LessonItem';

const ChapterList = ({ chapters, onLessonClick, completedLessons }) => {
    const [openChapters, setOpenChapters] = useState(chapters.map((_, index) => index));

    const toggleChapter = (index) => {
        setOpenChapters((prevOpenChapters) =>
            prevOpenChapters.includes(index)
                ? prevOpenChapters.filter((i) => i !== index)
                : [...prevOpenChapters, index],
        );
    };

    return (
        <div className="syllabus-box">
            {chapters.map((chapter, index) => (
                <div className="syllabus-item rounded-b-lg" key={index}>
                    <button
                        type="button"
                        className="flex border-b items-center w-full p-3 text-white font-semibold text-xl transition duration-75 group bg-cyan-500"
                        onClick={() => toggleChapter(index)}
                    >
                        <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">{chapter.name}</span>
                        <FontAwesomeIcon className="mr-3" icon={faChevronDown} />
                    </button>
                    {openChapters.includes(index) && (
                        <ul id={`syllabus-${index}`} className="space-y-2">
                            {chapter.lessons.map((lesson, lessonIndex) => (
                                <LessonItem 
                                    key={lessonIndex} 
                                    lesson={lesson} 
                                    onLessonClick={onLessonClick} 
                                    completedLessons={completedLessons}
                                />
                            ))}
                        </ul>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ChapterList;
