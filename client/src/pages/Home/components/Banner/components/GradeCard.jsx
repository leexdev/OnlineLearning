import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';

const GradeCard = ({ title, grade, subjects, bgColor }) => {
    const navigate = useNavigate();

    const handleNavigate = (subject) => {
        navigate(`/subject/${subject.id}`, {
            state: {
                subjectName: subject.name,
                gradeName: title,
                subjectId: subject.id
            }
        });
    };

    return (
        <div className="thumbnail">
            <div className="max-w-sm mx-1 bg-white rounded-lg shadow-xl">
                <div className={`title pt-4 px-5 pb-3 ${bgColor} rounded-t-lg`}>
                    <h2 className="text-center capitalize text-4xl font-bold text-white">
                        <div className="mb-2 tracking-tight">
                            {title}
                            <span className="block mx-auto text-8xl">{grade}</span>
                        </div>
                    </h2>
                </div>
                {subjects.map((subject, index) => (
                    <div
                        key={index}
                        className={`px-2 py-1 flex items-center justify-between text-xl font-bold text-gray-700 cursor-pointer ${index < subjects.length - 1 ? 'border-b-2' : ''}`}
                        onClick={() => handleNavigate(subject)}
                    >
                        {subject.name}
                        <FontAwesomeIcon className="text-xs" icon={faChevronRight} />
                    </div>
                ))}
            </div>
        </div>
    );
};

GradeCard.propTypes = {
    title: PropTypes.string.isRequired,
    grade: PropTypes.string.isRequired,
    subjects: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        name: PropTypes.string.isRequired,
    })).isRequired,
    bgColor: PropTypes.string,
};

GradeCard.defaultProps = {
    bgColor: 'bg-blue-500',
};

export default GradeCard;
