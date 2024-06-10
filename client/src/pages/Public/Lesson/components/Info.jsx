import React, { Fragment, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { faCirclePlay, faComment, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AuthContext from '~/context/AuthContext';
import userCourseApi from '~/api/userCourseApi';
import questionApi from '~/api/questionApi';
import MessageModal from '~/components/Common/MessageModal';
import images from '~/assets/images';
import { Helmet } from 'react-helmet';

const formatDuration = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;

    const hDisplay = h > 0 ? h + ' giờ ' : '';
    const mDisplay = m > 0 ? m + ' phút ' : '';
    const sDisplay = s > 0 ? s + ' giây' : '';

    return hDisplay + mDisplay + sDisplay || '0 giây';
};

const Info = ({ title, description, duration, comments = [], lessonId, courseId }) => {
    const safeDescription = description || 'Không có mô tả';
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [error, setError] = useState(null);

    const handleNavigateToQuestions = async () => {
        try {
            const accessResponse = await userCourseApi.hasAccess(courseId);
            if (!accessResponse.hasAccess) {
                setError(`Bạn chưa mua khóa học này. Hãy đăng ký khóa học để làm bài tập!`);
                return;
            }

            const exercises = await questionApi.getByLessonId(lessonId);
            if (!exercises || exercises.length === 0) {
                setError('Bài học này chưa có bài tập.');
                return;
            }

            navigate(`/lesson/${lessonId}/questions`, { state: { lessonId, courseId } });
        } catch (error) {
            setError('Có lỗi xảy ra. Vui lòng thử lại sau.');
            console.error('Error checking access or fetching exercises:', error);
        }
    };

    return (
        <Fragment>
            {error && <MessageModal title="Lỗi" image={images.sadcat} message={error} onClose={() => setError(null)} />}
            <div className="px-5 md:px-10 xl:px-64 py-2">
                <h4 className="title text-2xl font-bold mb-2">{title}</h4>
                <div className="info flex">
                    <div className="time">
                        <FontAwesomeIcon className="mr-1" icon={faCirclePlay} />
                        <span>{formatDuration(duration)}</span>
                    </div>
                    <div className="comment ml-3">
                        <FontAwesomeIcon className="mr-1" icon={faComment} />
                        <span>{comments.length}</span>
                    </div>
                </div>
                <div className="flex justify-center mt-3 lg:mt-10">
                    <button
                        onClick={handleNavigateToQuestions}
                        className="bg-peach px-16 p-2 rounded-xl shadow-md text-white font-bold text-xl"
                    >
                        <span>Bài tập</span>
                        <FontAwesomeIcon className="ml-2" icon={faPenToSquare} />
                    </button>
                </div>
                <div className="mt-5">
                    <h4 className="text-xl font-bold mb-3">Mô tả bài học</h4>
                    <div className="description">{safeDescription}</div>
                </div>
            </div>
        </Fragment>
    );
};

Info.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    comments: PropTypes.array,
    lessonId: PropTypes.number.isRequired,
    courseId: PropTypes.number.isRequired,
};

Info.defaultProps = {
    comments: [],
};

export default Info;
