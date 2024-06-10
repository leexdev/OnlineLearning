import React, { useState, useContext, Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { vi } from 'date-fns/locale';
import { useForm } from 'react-hook-form';
import commentApi from '~/api/commentApi';
import AuthContext from '~/context/AuthContext';
import MessageModal from '~/components/Common/MessageModal';
import images from '~/assets/images';
import FormFieldError from '~/components/Common/FormFieldError';

const Comment = ({
    totalComments: initialTotalComments,
    initialComments,
    fetchMoreComments,
    lessonId,
    onNewComment,
}) => {
    const { user } = useContext(AuthContext);
    const [comments, setComments] = useState(initialComments || []);
    const [totalComments, setTotalComments] = useState(initialTotalComments);
    const [hasMore, setHasMore] = useState(
        Array.isArray(initialComments) && initialComments.length < initialTotalComments,
    );
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        const fetchInitialComments = async () => {
            try {
                const newComments = await fetchMoreComments(1);
                setComments(newComments);
                setHasMore(newComments.length < initialTotalComments);
            } catch (error) {
                console.error('Error fetching initial comments:', error);
            }
        };

        fetchInitialComments();
    }, [lessonId, fetchMoreComments, initialTotalComments]);

    const fetchData = async () => {
        try {
            const newComments = await fetchMoreComments(currentPage + 1);
            if (newComments.length === 0) {
                setHasMore(false);
            } else {
                const uniqueNewComments = newComments.filter(
                    (newComment) => !comments.some((existingComment) => existingComment.id === newComment.id),
                );
                setComments((prevComments) => [...prevComments, ...uniqueNewComments]);
                setCurrentPage((prevPage) => prevPage + 1);
                setHasMore(totalComments > comments.length + uniqueNewComments.length);
            }
        } catch (error) {
            console.error('Error fetching more comments:', error);
            setHasMore(false);
        }
    };

    const onSubmit = async (data) => {
        if (!user) {
            setError('Bạn cần đăng nhập để bình luận');
            return;
        }
        try {
            const param = {
                content: data.commentContent,
                lessonId: lessonId,
            };
            const response = await commentApi.add(param);
            setComments((prevComments) => [response, ...prevComments]);
            setTotalComments((prevTotal) => prevTotal + 1);
            reset();
            onNewComment(response);
        } catch (error) {
            console.error('Lỗi khi gửi bình luận:', error);
        }
    };

    return (
        <Fragment>
            {error && <MessageModal message={error} title="Lỗi" image={images.sadcat} onClose={() => setError(null)} />}
            <section className="bg-content py-8 lg:py-16 antialiased">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg lg:text-2xl font-bold text-gray-900">Bình luận ({totalComments})</h2>
                    </div>
                    <form className="mb-6" onSubmit={handleSubmit(onSubmit)}>
                        <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200">
                            <label htmlFor="comment" className="sr-only">
                                Bình luận của tôi
                            </label>
                            <textarea
                                id="comment"
                                rows={6}
                                className={`px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none ${
                                    errors.commentContent ? 'border-red-500' : ''
                                }`}
                                placeholder="Viết bình luận của bạn..."
                                {...register('commentContent', {
                                    required: 'Bình luận không được để trống',
                                    maxLength: {
                                        value: 100,
                                        message: 'Bình luận không được vượt quá 100 ký tự',
                                    },
                                })}
                            ></textarea>
                        </div>
                        {errors.commentContent && <FormFieldError message={errors.commentContent.message} />}
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-peach rounded-lg focus:ring-4 focus:ring-peach hover:bg-peach"
                            >
                                Gửi bình luận
                            </button>
                        </div>
                    </form>
                    <InfiniteScroll
                        dataLength={comments.length}
                        next={fetchData}
                        hasMore={hasMore}
                        loader={<h4 className="text-center">Đang tải thêm...</h4>}
                        endMessage={<p className="text-center">Không còn bình luận nào nữa</p>}
                    >
                        {comments.map((comment, index) => (
                            <article key={index} className="p-6 mb-6 text-base bg-white rounded-lg">
                                <footer className="flex justify-between items-center mb-2">
                                    <div className="flex items-center">
                                        <p className="inline-flex items-center mr-3 text-sm text-gray-900">
                                            <img
                                                className="mr-2 w-6 h-6 rounded-full"
                                                src={comment.userDto.avatar ? comment.userDto.avatar : images.user}
                                                alt={comment.userDto.name}
                                            />
                                            {comment.userDto.name}
                                        </p>
                                        <p className="text-xs text-gray-600">
                                            <time>
                                                {formatDistanceToNow(parseISO(comment.createdAt), {
                                                    addSuffix: true,
                                                    locale: vi,
                                                })}
                                            </time>
                                        </p>
                                    </div>
                                </footer>
                                <p className="text-gray-500">{comment.content}</p>
                            </article>
                        ))}
                    </InfiniteScroll>
                </div>
            </section>
        </Fragment>
    );
};

Comment.propTypes = {
    totalComments: PropTypes.number.isRequired,
    initialComments: PropTypes.arrayOf(
        PropTypes.shape({
            userDto: PropTypes.shape({
                avatar: PropTypes.string,
                name: PropTypes.string.isRequired,
            }).isRequired,
            createdAt: PropTypes.string.isRequired,
            content: PropTypes.string.isRequired,
            id: PropTypes.number.isRequired,
        }),
    ).isRequired,
    fetchMoreComments: PropTypes.func.isRequired,
    lessonId: PropTypes.number.isRequired,
    onNewComment: PropTypes.func.isRequired,
};

export default Comment;
