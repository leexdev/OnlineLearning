import React, { useEffect, useState, Fragment, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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

const Course = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [completedLessons, setCompletedLessons] = useState([]);
    const [videoUrl, setVideoUrl] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [hasPurchased, setHasPurchased] = useState(false);

    useEffect(() => {
        const fetchCourseData = async () => {
            setLoading(true);
            setError(null);
            setSuccess(null);

            try {
                const courseData = await courseApi.get(id);
                setCourse(courseData);

                if (user) {
                    const completedData = await lessonCompletedApi.getLessonCompletedByUser(courseData.id);
                    const completedLessonIds = completedData.map((lesson) => lesson.lessonId);
                    setCompletedLessons(completedLessonIds);

                    const userCourses = await userCourseApi.get();
                    const purchasedCourse = userCourses.find((userCourse) => userCourse.id === parseInt(id, 10));
                    setHasPurchased(!!purchasedCourse);
                }
            } catch (error) {
                console.error('Error fetching course data:', error);
                setError('Có lỗi xảy ra khi tải dữ liệu khóa học');
            } finally {
                setLoading(false);
            }
        };

        fetchCourseData();
    }, [id, user]);

    const handleLessonClick = async (lessonId) => {
        setLoading(true);
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
                <title>{course ? course.name : 'Loading...'}</title>
            </Helmet>
            {error && (
                <MessageModal message={error} title="Thông báo" image={images.sadcat} onClose={() => setError(null)} />
            )}
            {success && (
                <MessageModal
                    message={success}
                    title="Thông báo"
                    image={images.funnycat}
                    onClose={() => setSuccess(null)}
                />
            )}
            <Header name={course?.name || 'Loading...'} />
            <div className="pt-5 pb-10">
                <div className="container">
                    {!hasPurchased && <Thumbnail user={user} course={course} setAdviseSuccess={setSuccess} />}
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
