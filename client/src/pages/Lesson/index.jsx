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

    useEffect(() => {
        const fetchLesson = async () => {
            try {
                const data = await lessonApi.get(id);
                setLesson(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching lesson:', error);
                setLoading(false);
            }
        };
        fetchLesson();
    }, [id]);

    useEffect(() => {
        const fetchCompletedLessons = async () => {
            if (user) {
                try {
                    const data = await lessonCompletedApi.get(user.sub);
                    setCompletedLessons(data.map((item) => item.lessonId));
                } catch (error) {
                    console.error('Error fetching completed lessons:', error);
                }
            }
        };
        fetchCompletedLessons();
    }, [user]);

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
        if (!user) {
            console.error('User not logged in');
            return;
        }

        try {
            const completedLessons = await lessonCompletedApi.get(user.sub);
            const param = {
                lessonId: parseInt(id),
                userId: user.sub,
            };
            const isCompleted = completedLessons.some(completion =>
                completion.userId === user.sub && completion.lessonId === param.lessonId
            );

            if (!isCompleted) {
                await lessonCompletedApi.add(param);
                console.log('Lesson completed successfully');
                setCompletedLessons((prev) => [...prev, param.lessonId]);
            } else {
                console.log('Lesson has already been completed');
            }
        } catch (error) {
            console.error('Error marking lesson as completed:', error);
        }
    };

    if (loading) {
        return <Spinner />;
    }

    const getPreviousLesson = () => {
        const currentChapter = chapters.find(chapter => chapter.id === lesson.chapterId);
        if (!currentChapter) return null;
        const currentLesson = currentChapter.lessons.find(les => les.id === parseInt(id));
        if (!currentLesson) return null;
        const previousLessonOrder = currentLesson.order - 1;
        return currentChapter.lessons.find(les => les.order === previousLessonOrder) || null;
    };

    const getNextLesson = () => {
        const currentChapter = chapters.find(chapter => chapter.id === lesson.chapterId);
        if (!currentChapter) return null;
        const currentLesson = currentChapter.lessons.find(les => les.id === parseInt(id));
        if (!currentLesson) return null;
        const nextLessonOrder = currentLesson.order + 1;
        return currentChapter.lessons.find(les => les.order === nextLessonOrder) || null;
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

    return (
        <Fragment>
            <Sidebar chapters={chapters} activeLessonId={parseInt(id)} completedLessons={completedLessons} />
            <div className="md:mr-64 xl:mr-96">
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
            </div>
            <ActionBar 
                previousLesson={previousLesson} 
                nextLesson={nextLesson} 
                onPrevious={handlePreviousLesson} 
                onNext={handleNextLesson} 
            />
        </Fragment>
    );
};

export default Lesson;
