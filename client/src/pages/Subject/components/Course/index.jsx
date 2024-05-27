import { useEffect, useState } from 'react';
import courseApi from '~/api/courseApi';
import CourseCard from './components/CourseCard';
import CourseList from './components/CourseList';
import PropTypes from 'prop-types';
import Spinner from '~/components/Spinner';

const ListCourse = ({ subjectId, subjectName, gradeName }) => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                let data;
                if (subjectId) {
                    data = await courseApi.getBySubjectId(subjectId);
                } else {
                    data = await courseApi.getAll();
                }
                setCourses(data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch grade data', error);
                setError('Failed to fetch grade data');
                setLoading(false);
            }
        };

        fetchCourses();
    }, [subjectId]);

    if (loading) {
        return <Spinner />;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
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
    );
};

ListCourse.propTypes = {
    subjectId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    subjectName: PropTypes.string.isRequired,
    gradeName: PropTypes.string,
};

ListCourse.defaultProps = {
    gradeName: '',
};

export default ListCourse;
