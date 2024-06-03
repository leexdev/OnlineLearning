import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CourseList from './components/CourseList';
import courseApi from '~/api/courseApi';
import Spinner from '~/components/Spinner';

const Course = ({ title }) => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const data = await courseApi.getAll();
                setCourses(data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch courses', error);
                setError('Failed to fetch courses');
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    if (loading) {
        return <Spinner />;
    }

    if (error) {
        return <div className="error">{error}</div>;
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
};

export default Course;
