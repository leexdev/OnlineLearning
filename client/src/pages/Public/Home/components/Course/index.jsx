import { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import CourseList from './components/CourseList';
import courseApi from '~/api/courseApi';
import userCourseApi from '~/api/userCourseApi';
import Spinner from '~/components/Common/Spinner';
import AuthContext from '~/context/AuthContext';

const Course = ({ title, subjectName }) => {
    const { user } = useContext(AuthContext);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userCourseIds, setUserCourseIds] = useState(new Set());

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const courseData = await courseApi.getBySubjectName(subjectName);

                if (user) {
                    const userCourseData = await userCourseApi.get();
                    const userCourseIdSet = new Set(userCourseData.map((course) => course.id));
                    setUserCourseIds(userCourseIdSet);
                    const filteredCourses = courseData.filter((course) => !userCourseIdSet.has(course.id));
                    setCourses(filteredCourses);
                } else {
                    setCourses(courseData);
                }

                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch courses', error);
                setError('Failed to fetch courses');
                setLoading(false);
            }
        };

        fetchCourses();
    }, [subjectName, user]);

    if (loading) {
        return <Spinner />;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    if (courses.length === 0) {
        return <div className="no-courses"></div>;
    }

    return (
        <div className="course container pt-20">
            <div className="header mb-6">
                <h1 className="uppercase font-bold text-4xl">{title}</h1>
            </div>
            <div className="content">
                <CourseList courses={courses} />
            </div>
        </div>
    );
};

Course.propTypes = {
    title: PropTypes.string.isRequired,
    subjectName: PropTypes.string.isRequired,
};

export default Course;
