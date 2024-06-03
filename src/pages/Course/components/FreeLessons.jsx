import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const FreeLessons = ({ lessons }) => {
    const [isFreeLessonsOpen, setFreeLessonsOpen] = useState(true);

    return (
        <div className="syllabus-box-free">
            <button
                type="button"
                className="flex border-b items-center w-full p-3 text-white font-semibold text-xl transition duration-75 rounded-t-lg group bg-cyan-500"
                onClick={() => setFreeLessonsOpen(!isFreeLessonsOpen)}
            >
                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                    Bài giảng miễn phí
                </span>
                <FontAwesomeIcon className="mr-3" icon={faChevronDown} />
            </button>
            {isFreeLessonsOpen && (
                <ul id="syllabus-free" className="space-y-2">
                    {lessons.map((lesson, index) => (
                        <li key={`free-${index}`}>
                            <Link
                                to={`/lesson/${lesson.id}`}
                                className="block hover:text-peach w-full p-3 text-gray-900 transition duration-75 pl-11 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                            >
                                <p className="p-1">
                                    {lesson.title}
                                    <span className="float-right">
                                        <FontAwesomeIcon className="mr-3 text-2xl" icon={faCirclePlay} />
                                    </span>
                                </p>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default FreeLessons;
