import React, { useEffect, useState } from 'react';
import CourseCard from './CourseCard';
import userCourseApi from '~/api/userCourseApi';
import Spinner from '~/components/Spinner';
import MessageModal from '~/components/MessageModal';
import images from '~/assets/images';

const CourseList = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await userCourseApi.get();
                setCourses(response);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    if (loading) {
        return <Spinner />;
    }
    
    if (error) return <MessageModal image={images.sadcat} title="Lỗi" message={error} onClose={setError(null)}/>;

    return (
        <div className="container mx-auto p-3 md:p-6">
            <h1 className="text-3xl font-bold mb-4">KHÓA HỌC CỦA TÔI</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {courses.map((course, index) => (
                    <CourseCard
                        key={index}
                        course={course}
                    />
                ))}
            </div>
        </div>
    );
};

export default CourseList;
