import { useState } from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

const Comment = ({ totalComments, initialComments, fetchMoreComments }) => {
    const [comments, setComments] = useState(initialComments);
    const [hasMore, setHasMore] = useState(true);

    const fetchData = async () => {
        const page = Math.floor(comments.length / 5) + 1;

        const newComments = await fetchMoreComments(page);
        if (newComments.length === 0) {
            setHasMore(false);
        } else {
            setComments([...comments, ...newComments]);
        }
    };

    return (
        <section className="bg-content py-8 lg:py-16 antialiased">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg lg:text-2xl font-bold text-gray-900">Bình luận ({totalComments})</h2>
                </div>
                <form className="mb-6">
                    <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200">
                        <label htmlFor="comment" className="sr-only">
                            Bình luận của tôi
                        </label>
                        <textarea
                            id="comment"
                            rows={6}
                            className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none"
                            placeholder="Viết bình luận của bạn..."
                            required
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-peach rounded-lg focus:ring-4 focus:ring-primary-200 hover:bg-primary-800"
                    >
                        Gửi bình luận
                    </button>
                </form>
                <InfiniteScroll
                    dataLength={comments.length}
                    next={fetchData}
                    hasMore={hasMore}
                    loader={<h4 className='text-center'>Đang tải thêm...</h4>}
                    endMessage={<p className='text-center'>Không còn bình luận nào nữa</p>}
                >
                    {comments.map((comment, index) => (
                        <article key={index} className="p-6 mb-6 text-base bg-white rounded-lg">
                            <footer className="flex justify-between items-center mb-2">
                                <div className="flex items-center">
                                    <p className="inline-flex items-center mr-3 text-sm text-gray-900">
                                        <img
                                            className="mr-2 w-6 h-6 rounded-full"
                                            src={comment.userDto.avatar}
                                            alt={comment.userDto.name}
                                        />
                                        {comment.userDto.name}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        <time>{comment.createdAt}</time>
                                    </p>
                                </div>
                            </footer>
                            <p className="text-gray-500">{comment.content}</p>
                        </article>
                    ))}
                </InfiniteScroll>
            </div>
        </section>
    );
};

Comment.propTypes = {
    totalComments: PropTypes.number.isRequired,
    initialComments: PropTypes.arrayOf(
        PropTypes.shape({
            userDto: PropTypes.shape({
                avatar: PropTypes.string.isRequired,
                name: PropTypes.string.isRequired,
            }).isRequired,
            createdAt: PropTypes.string.isRequired,
            content: PropTypes.string.isRequired,
        })
    ).isRequired,
    fetchMoreComments: PropTypes.func.isRequired,
};

export default Comment;
