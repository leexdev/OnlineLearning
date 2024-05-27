import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faCirclePlay } from '@fortawesome/free-solid-svg-icons';

const LessonItem = ({ lesson, onLessonClick, completedLessons }) => {
    const isCompleted = completedLessons.includes(lesson.id);
    return (
        <li>
            <button
                onClick={() => onLessonClick(lesson.id)}
                className="hover:text-peach text-left w-full p-2 text-gray-900 transition duration-75 pl-6 hover:bg-gray-100"
            >
                <p className="p-1">
                    <span className={`${isCompleted ? 'text-lime-500' : 'text-gray-300'} float-left mr-6`}>
                        <FontAwesomeIcon className="text-2xl" icon={faCircle} />
                    </span>
                    {lesson.title}
                    <span className="float-right">
                        <FontAwesomeIcon className="mr-3 text-2xl" icon={faCirclePlay} />
                    </span>
                </p>
            </button>
        </li>
    );
};

LessonItem.propTypes = {
    lesson: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        isFree: PropTypes.bool.isRequired,
    }).isRequired,
    onLessonClick: PropTypes.func.isRequired,
    completedLessons: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default LessonItem;
