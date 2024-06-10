import React, { useEffect, useState, Fragment, useContext } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Nav from './components/Navbar';
import Info from './components/Info';
import Syllabus from './components/Syllabus';
import courseApi from '~/api/courseApi';
import lessonApi from '~/api/lessonApi';
import lessonCompletedApi from '~/api/lessonCompletedApi';
import Spinner from '../../../components/Common/Spinner';
import Thumbnail from './components/Thumbnail';
import AuthContext from '~/context/AuthContext';
import MessageModal from '~/components/Common/MessageModal';
import userCourseApi from '~/api/userCourseApi';
import images from '~/assets/images';
import { Helmet } from 'react-helmet';
import { data } from 'autoprefixer';

const Course = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [completedLessons, setCompletedLessons] = useState([]);
    const [videoUrl, setVideoUrl] = useState(null);
    const [error, setError] = useState(null);
    const [hasPurchased, setHasPurchased] = useState(false);

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
                const data = await lessonCompletedApi.get();
                const completedLessonIds = data.map((lesson) => lesson.lessonId);
                setCompletedLessons(completedLessonIds);
            } catch (error) {
                console.error('Error fetching completed lessons:', error);
            }
        };

        const fetchUserCourse = async () => {
            if (!user) {
                console.error('User not logged in');
                return;
            }
            try {
                const data = await userCourseApi.get();
                const purchasedCourse = data.find((course) => course.id === parseInt(id, 10));
                setHasPurchased(!!purchasedCourse);
            } catch (error) {
                console.error('Error fetching user courses:', error);
            }
        };

        fetchCourse();
        if (user) {
            fetchCompletedLessons();
            fetchUserCourse();
        }
    }, [id, user]);

    const handleLessonClick = async (lessonId) => {
        try {
            const data = await lessonApi.getVideo(lessonId);
            if (data.status === 403) {
                setError(
                    `Rất tiếc, bạn chưa thể xem được bài giảng này. Hãy đăng ký khóa học để xem tất cả các bài giảng không giới hạn nhé!`,
                );
                setLoading(false);
                return;
            }
            navigate(`/lesson/${lessonId}`);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching lesson:', error);
            setLoading(false);
            if (error.response) {
                setError(
                    `Rất tiếc, bạn chưa thể xem được bài giảng này. Hãy đăng ký khóa học để xem tất cả các bài giảng không giới hạn nhé!`,
                );
            } else {
                setError('Bài học không tồn tại');
            }
        }
    };

    if (loading) {
        return <Spinner />;
    }

    return (
        <Fragment>
            <Helmet>
                <title>{course.name}</title>
            </Helmet>
            {error && <MessageModal message={error} title="Lỗi" image={images.sadcat} onClose={() => setError(null)} />}{' '}
            {/* Display error modal */}
            <Header name={course?.name || 'Loading...'} />
            <div className="pt-5 pb-10">
                <div className="container">
                    {!hasPurchased && <Thumbnail course={course} />}
                    <div className={`lg:w-2/3 lg:px-8 ${hasPurchased ? 'w-full' : ''}`}>
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
            {videoUrl && (
                <div>
                    <video controls src={videoUrl}></video>
                </div>
            )}
        </Fragment>
    );
};

export default Course;
