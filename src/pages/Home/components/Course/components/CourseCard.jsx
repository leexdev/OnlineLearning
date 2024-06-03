import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

const CourseCard = ({ course }) => {
    return (
        <div className="max-w-sm bg-white rounded-lg shadow">
            <a href="#">
                <img className="rounded-t-lg" src={course.image} alt={course.title} />
            </a>
            <div className="p-5">
                <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{course.title}</h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 line-clamp-3 md:line-clamp-5">{course.description}</p>
                <a
                    href="#"
                    className="inline-flex float-right items-center px-3 py-2 text-sm font-medium text-center text-white bg-lime-500 rounded-lg hover:bg-lime-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
                >
                    Xem thêm
                    <FontAwesomeIcon className='ml-2' icon={faArrowRight}/>
                </a>
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
