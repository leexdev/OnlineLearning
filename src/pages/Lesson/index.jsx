import React, { Fragment, useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Video from './components/Video';
import Info from './components/Info';
import Comment from './components/Comment';
import ActionBar from './components/ActionBar';
import lessonApi from '~/api/lessonApi';
import Spinner from '~/components/Spinner';
import commentApi from '~/api/commentApi';
import AuthContext from '~/context/AuthContext';
import lessonCompletedApi from '~/api/lessonCompletedApi';
import MessageModal from '~/components/MessageModal';
import images from '~/assets/images';

const Lesson = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [chapters, setChapters] = useState(() => {
        const savedChapters = localStorage.getItem('chapters');
        return savedChapters ? JSON.parse(savedChapters) : [];
    });
    const [lesson, setLesson] = useState(null);
    const [loading, setLoading] = useState(true);
    const [duration, setDuration] = useState(0);
    const [completedLessons, setCompletedLessons] = useState([]);
    const [videoUrl, setVideoUrl] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLesson = async () => {
            try {
                const data = await lessonApi.getVideo(id);
                if (data.status === 403) {
                    setError(
                        `Rất tiếc, bạn chưa thể xem được bài giảng này. Hãy đăng ký khóa học để xem tất cả các bài giảng không giới hạn nhé!`,
                    );
                    setLoading(false);
                    return;
                }
                setLesson(data);
                setLoading(false);
            } catch (error) {
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
        fetchLesson();
    }, [id]);

    useEffect(() => {
        const fetchCompletedLessons = async () => {
            try {
                const data = await lessonCompletedApi.get();
                setCompletedLessons(data.map((item) => item.lessonId));
            } catch (error) {
                console.error('Error fetching completed lessons:', error);
            }
        };
        fetchCompletedLessons();
    }, []);

    useEffect(() => {
        if (lesson && lesson.videoURL) {
            const videoElement = document.createElement('video');
            videoElement.src = lesson.videoURL;
            videoElement.addEventListener('loadedmetadata', () => {
                setDuration(Math.floor(videoElement.duration));
            });
        }
    }, [lesson]);

    const fetchMoreComments = async (page) => {
        try {
            const newComments = await commentApi.getComments(id, page);
            return newComments;
        } catch (error) {
            console.error('Error fetching comments:', error);
            return [];
        }
    };

    const handleVideoEnded = async () => {
        try {
            const completedLessons = await lessonCompletedApi.get();
            const param = {
                lessonId: parseInt(id),
            };
            const isCompleted = completedLessons.some((completion) => completion.lessonId === param.lessonId);

            if (!isCompleted) {
                await lessonCompletedApi.add(param);
                setCompletedLessons((prev) => [...prev, param.lessonId]);
            }
        } catch (error) {
            console.error('Error marking lesson as completed:', error);
        }
    };

    const getPreviousLesson = () => {
        if (!lesson) return null;
        const currentChapter = chapters.find((chapter) => chapter.id === lesson.chapterId);
        if (!currentChapter) return null;
        const currentLesson = currentChapter.lessons.find((les) => les.id === parseInt(id));
        if (!currentLesson) return null;
        const previousLessonOrder = currentLesson.order - 1;
        return currentChapter.lessons.find((les) => les.order === previousLessonOrder) || null;
    };

    const getNextLesson = () => {
        if (!lesson) return null;
        const currentChapter = chapters.find((chapter) => chapter.id === lesson.chapterId);
        if (!currentChapter) return null;
        const currentLesson = currentChapter.lessons.find((les) => les.id === parseInt(id));
        if (!currentLesson) return null;
        const nextLessonOrder = currentLesson.order + 1;
        return currentChapter.lessons.find((les) => les.order === nextLessonOrder) || null;
    };

    const previousLesson = getPreviousLesson();
    const nextLesson = getNextLesson();

    const handleNextLesson = () => {
        if (nextLesson) {
            navigate(`/lesson/${nextLesson.id}`);
        }
    };

    const handlePreviousLesson = () => {
        if (previousLesson) {
            navigate(`/lesson/${previousLesson.id}`);
        }
    };
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
            setLesson(data);
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
            {error && <MessageModal title="Lỗi" image={images.sadcat} message={error} onClose={() => setError(null)} />} {/* Display error modal */}
            <Sidebar
                chapters={chapters}
                activeLessonId={parseInt(id)}
                completedLessons={completedLessons}
                handleLessonClick={handleLessonClick}
            />
            <div className="md:mr-64 xl:mr-96">
                {lesson && (
                    <>
                        <Video videoURL={lesson.videoURL} onEnded={handleVideoEnded} />
                        <Info
                            title={lesson.title}
                            description={lesson.description}
                            duration={duration}
                            comments={lesson.comments}
                        />
                        <Comment
                            totalComments={lesson.comments.length}
                            initialComments={lesson.comments.slice(0, 5)}
                            fetchMoreComments={fetchMoreComments}
                        />
                    </>
                )}
            </div>
            <ActionBar
                previousLesson={previousLesson}
                nextLesson={nextLesson}
                onPrevious={handlePreviousLesson}
                onNext={handleNextLesson}
                handleLessonClick={handleLessonClick}
            />
        </Fragment>
    );
};

export default Lesson;
