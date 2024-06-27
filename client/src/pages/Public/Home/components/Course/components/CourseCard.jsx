import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {
    return (
        <div className="max-w-sm bg-white rounded-lg shadow-lg flex flex-col">
            <Link to={`/course/${course.id}`}>
                <img className="h-48 w-full object-cover rounded-t-lg" src={course.imageUrl} alt={course.name} />
            </Link>
            <div className="p-5 flex flex-col flex-grow">
                <Link to={`/course/${course.id}`}>
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 line-clamp-2">{course.name}</h5>
                </Link>
                <p className="flex-grow text-gray-700 mt-2 line-clamp-4">{course.title}</p>
                <Link
                    to={`/course/${course.id}`}
                    className="mt-auto self-end inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-lime-500 rounded-lg hover:bg-lime-700 focus:ring-4 focus:outline-none focus:ring-lime-300"
                >
                    Xem thêm
                    <FontAwesomeIcon className="ml-2" icon={faArrowRight} />
                </Link>
            </div>
        </div>
    );
};

CourseCard.propTypes = {
    course: PropTypes.shape({
        image: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
    }).isRequired,
};

export default CourseCard;
