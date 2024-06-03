import { Fragment, useEffect, useState } from 'react';
import courseApi from '~/api/courseApi';
import CourseCard from './components/CourseCard';
import CourseList from './components/CourseList';
import PropTypes from 'prop-types';
import Spinner from '~/components/Spinner';
import { useParams, useLocation } from 'react-router-dom';
import MessageModal from '~/components/MessageModal';
import images from '~/assets/images';

const ListCourse = () => {
    const { id } = useParams();
    const location = useLocation();
    const subjectName = location.state?.subjectName || ''; // Lấy subjectName từ state
    const gradeName = location.state?.gradeName || ''; // Lấy gradeName từ state
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const data = await courseApi.getBySubjectId(id);
                setCourses(data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch grade data', error);
                setError('Failed to fetch grade data');
                setLoading(false);
            }
        };

        fetchCourses();
    }, [id]);

    if (loading) {
        return <Spinner />;
    }
    
    return (
        <Fragment>
            {error && <MessageModal title="Lỗi" image={images.sadcat} message={error} onClose={() => setError(null)} />}
            <div className="course-container container">
                <div className="head-title">
                    <h1 className="text-center text-xl md:text-2xl lg:text-5xl font-extrabold text-cyan-900 p-14">
                        {`${subjectName}${gradeName ? ` - ${gradeName}` : ''}`}
                    </h1>
                </div>
                <div className="content">
                    {courses.map((course) => (
                        <CourseList key={course.id}>
                            <CourseCard course={course} />
                            <div className="img-course hidden md:block">
                                <img src={course.imageUrl} alt={course.name} />
                            </div>
                        </CourseList>
                    ))}
                </div>
            </div>
        </Fragment>
    );
};

ListCourse.propTypes = {
    subjectId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    subjectName: PropTypes.string,
    gradeName: PropTypes.string,
};

ListCourse.defaultProps = {
    subjectId: '',
    subjectName: '',
    gradeName: '',
};

export default ListCourse;
