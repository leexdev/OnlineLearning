import React, { Fragment, useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Video from './components/Video';
import Info from './components/Info';
import Comment from './components/Comment';
import ActionBar from './components/ActionBar';
import lessonApi from '~/api/lessonApi';
import Spinner from '~/components/Common/Spinner';
import commentApi from '~/api/commentApi';
import AuthContext from '~/context/AuthContext';
import lessonCompletedApi from '~/api/lessonCompletedApi';
import MessageModal from '~/components/Common/MessageModal';
import images from '~/assets/images';
import courseApi from '~/api/courseApi';
import { Helmet } from 'react-helmet';

const Lesson = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [chapters, setChapters] = useState(null);
    const [lesson, setLesson] = useState(null);
    const [duration, setDuration] = useState(0);
    const [completedLessons, setCompletedLessons] = useState([]);
    const [error, setError] = useState(null);
    const [totalComments, setTotalComments] = useState(0);
    const [comments, setComments] = useState([]);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        const fetchLessonAndChapters = async () => {
            setError(null);
            try {
                const lessonData = await lessonApi.getVideo(id);
                if (lessonData.status === 403) {
                    setError(
                        `Rất tiếc, bạn chưa thể xem được bài giảng này. Hãy đăng ký khóa học để xem tất cả các bài giảng không giới hạn nhé!`,
                    );
                    return;
                }
                setLesson(lessonData);
                setTotalComments(lessonData.comments.length);
                setComments(lessonData.comments.slice(0, 5));
                const course = await courseApi.get(lessonData.courseId);

                course.chapters.sort((a, b) => a.order - b.order);
                course.chapters.forEach((chapter) => {
                    chapter.lessons.sort((a, b) => a.order - b.order);
                });

                console.log('course.chapters', course.chapters);
                setChapters(course.chapters);

                if (user) {
                    const completedData = await lessonCompletedApi.getLessonCompletedByUser(lessonData.courseId);
                    setCompletedLessons(completedData.map((item) => item.lessonId));
                }
            } catch (error) {
                if (error.response) {
                    setError(
                        `Rất tiếc, bạn chưa thể xem được bài giảng này. Hãy đăng ký khóa học để xem tất cả các bài giảng không giới hạn nhé!`,
                    );
                } else {
                    setError('Bài học không tồn tại');
                }
            }
        };

        fetchLessonAndChapters();
    }, [id, user]);

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
            if (newComments.length === 0) {
                setHasMore(false);
            }
            return newComments;
        } catch (error) {
            console.error('Error fetching comments:', error);
            setHasMore(false);
            return [];
        }
    };

    const handleVideoEnded = async () => {
        try {
            const completedData = await lessonCompletedApi.getLessonCompletedByUser(lesson.courseId);
            const param = {
                lessonId: parseInt(id),
            };
            const isCompleted = completedData.some((completion) => completion.lessonId === param.lessonId);

            if (!isCompleted) {
                await lessonCompletedApi.add(param);
                setCompletedLessons((prev) => [...prev, param.lessonId]);
            }
        } catch (error) {
            console.error('Error marking lesson as completed:', error);
        }
    };

    const getPreviousLesson = () => {
        if (!lesson || !chapters) return null;

        let currentChapterIndex = chapters.findIndex((chapter) => chapter.id === lesson.chapterId);
        let currentChapter = chapters[currentChapterIndex];
        let currentLessonIndex = currentChapter.lessons.findIndex((les) => les.id === parseInt(id));

        if (currentLessonIndex > 0) {
            return currentChapter.lessons[currentLessonIndex - 1];
        }

        if (currentChapterIndex > 0) {
            let previousChapter = chapters[currentChapterIndex - 1];
            return previousChapter.lessons[previousChapter.lessons.length - 1];
        }

        return null;
    };

    const getNextLesson = () => {
        if (!lesson || !chapters) return null;

        let currentChapterIndex = chapters.findIndex((chapter) => chapter.id === lesson.chapterId);
        let currentChapter = chapters[currentChapterIndex];
        let currentLessonIndex = currentChapter.lessons.findIndex((les) => les.id === parseInt(id));

        if (currentLessonIndex < currentChapter.lessons.length - 1) {
            return currentChapter.lessons[currentLessonIndex + 1];
        }

        if (currentChapterIndex < chapters.length - 1) {
            let nextChapter = chapters[currentChapterIndex + 1];
            return nextChapter.lessons[0];
        }

        return null;
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
                return;
            }
            setLesson(data);
            setTotalComments(data.comments.length);
            setComments(data.comments.slice(0, 5));
            setHasMore(data.comments.length > 5);
            navigate(`/lesson/${lessonId}`);
        } catch (error) {
            console.error('Error fetching lesson:', error);
            if (error.response) {
                setError(
                    `Rất tiếc, bạn chưa thể xem được bài giảng này. Hãy đăng ký khóa học để xem tất cả các bài giảng không giới hạn nhé!`,
                );
            } else {
                setError('Bài học không tồn tại');
            }
        }
    };

    const handleNewComment = (newComment) => {
        setTotalComments((prevTotal) => prevTotal + 1);
        setComments((prevComments) => {
            if (!prevComments.some((comment) => comment.id === newComment.id)) {
                return [newComment, ...prevComments];
            }
            return prevComments;
        });
    };

    return (
        <Fragment>
            <Helmet>
                <title>{lesson ? `${lesson.title}` : 'Loading...'}</title>
            </Helmet>
            {error && (
                <MessageModal title="Thông báo" image={images.sadcat} message={error} onClose={() => setError(null)} />
            )}
            {chapters && (
                <Sidebar
                    chapters={chapters}
                    activeLessonId={parseInt(id)}
                    completedLessons={completedLessons}
                    handleLessonClick={handleLessonClick}
                />
            )}
            <div className="md:mr-64 xl:mr-96">
                {lesson && (
                    <>
                        <Video videoURL={lesson.videoURL} onEnded={handleVideoEnded} />
                        <Info
                            title={lesson.title}
                            description={lesson.description}
                            duration={duration}
                            comments={lesson.comments}
                            lessonId={parseInt(id)}
                            courseId={lesson.courseId}
                            user={user}
                        />
                        <Comment
                            totalComments={totalComments}
                            initialComments={comments}
                            fetchMoreComments={fetchMoreComments}
                            lessonId={parseInt(id)}
                            onNewComment={handleNewComment}
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
