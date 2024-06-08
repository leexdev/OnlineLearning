import React, { Fragment, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import courseApi from '~/api/courseApi';
import CourseCard from './components/CourseCard';
import CourseList from './components/CourseList';
import PropTypes from 'prop-types';
import Spinner from '~/components/Spinner';
import { useParams, useLocation } from 'react-router-dom';
import MessageModal from '~/components/MessageModal';
import images from '~/assets/images';
import userCourseApi from '~/api/userCourseApi';

const ListCourse = () => {
    const { id } = useParams();
    const location = useLocation();
    const subjectName = location.state?.subjectName || ''; // Lấy subjectName từ state
    const gradeName = location.state?.gradeName || ''; // Lấy gradeName từ state
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userCourseIds, setUserCourseIds] = useState(new Set());

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const [courseData, userCourseData] = await Promise.all([
                    courseApi.getBySubjectId(id),
                    userCourseApi.get()
                ]);
                const userCourseIdSet = new Set(userCourseData.map(course => course.id));
                setUserCourseIds(userCourseIdSet);
                setCourses(courseData);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch data', error);
                setError('Failed to fetch data');
                setLoading(false);
            }
        };

        fetchCourses();
    }, [id]);

    if (loading) {
        return <Spinner />;
    }

    const filteredCourses = courses.filter(course => !userCourseIds.has(course.id));

    return (
        <Fragment>
            <Helmet>
                <title>{subjectName ? `${subjectName}${gradeName ? ` - ${gradeName}` : ''}` : 'Danh sách khóa học'}</title>
            </Helmet>
            {error && <MessageModal title="Lỗi" image={images.sadcat} message={error} onClose={() => setError(null)} />}
            <div className="course-container container">
                <div className="head-title">
                    <h1 className="text-center text-xl md:text-2xl lg:text-5xl font-extrabold text-cyan-900 p-14">
                        {`${subjectName}${gradeName ? ` - ${gradeName}` : ''}`}
                    </h1>
                </div>
                <div className="content">
                    {filteredCourses.length > 0 ? (
                        filteredCourses.map((course) => (
                            <CourseList key={course.id}>
                                <CourseCard course={course} />
                                <div className="img-course hidden md:block">
                                    <img src={course.imageUrl} alt={course.name} />
                                </div>
                            </CourseList>
                        ))
                    ) : (
                        <div className="text-center text-xl md:text-2xl lg:text-3xl font-bold text-gray-700 mt-10">
                            Không có khóa học nào phù hợp.
                        </div>
                    )}
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
