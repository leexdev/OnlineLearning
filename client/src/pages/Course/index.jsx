import React, { useEffect, useState, Fragment, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Nav from './components/Navbar';
import Info from './components/Info';
import Syllabus from './components/Syllabus';
import courseApi from '~/api/courseApi';
import lessonCompletedApi from '~/api/lessonCompletedApi';
import Spinner from '../../components/Spinner';
import Thumbnail from './components/Thumbnail';
import AuthContext from '~/context/AuthContext';

const Course = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [completedLessons, setCompletedLessons] = useState([]);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const data = await courseApi.get(id);
                setCourse(data);
            } catch (error) {
                console.error('Error fetching course:', error);
            } finally {
                setLoading(false);
            }
        };

        const fetchCompletedLessons = async () => {
            if (!user) {
                console.error('User not logged in');
                return;
            }
            try {
                const data = await lessonCompletedApi.get(user.sub);
                console.log(data);
                const completedLessonIds = data.map((lesson) => lesson.lessonId);
                setCompletedLessons(completedLessonIds);
            } catch (error) {
                console.error('Error fetching completed lessons:', error);
            }
        };

        fetchCourse();
        if (user) {
            fetchCompletedLessons();
        }
    }, [id, user, navigate]);

    if (loading) {
        return <Spinner />;
    }

    const handleLessonClick = (lessonId) => {
        localStorage.setItem('chapters', JSON.stringify(course.chapters));
        navigate(`/lesson/${lessonId}`);
    };

    return (
        <Fragment>
            <Header title={course?.title || 'Loading...'} />
            <div className="pt-5">
                <div className="container">
                    <Thumbnail course={course} />
                    <div className="lg:w-2/3">
                        <Nav />
                        <Info course={course} />
                        <Syllabus
                            chapters={course?.chapters || []}
                            onLessonClick={handleLessonClick}
                            completedLessons={completedLessons}
                        />
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Course;
