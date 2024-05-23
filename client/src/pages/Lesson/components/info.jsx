import PropTypes from 'prop-types';
import { faCirclePlay, faComment, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';

const formatDuration = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;

    const hDisplay = h > 0 ? h + (h === 1 ? ' giờ ' : ' giờ ') : '';
    const mDisplay = m > 0 ? m + (m === 1 ? ' phút ' : ' phút ') : '';
    const sDisplay = s > 0 ? s + (s === 1 ? ' giây' : ' giây') : '';

    return hDisplay + mDisplay + sDisplay || '0 giây';
};

const Info = ({ duration, rating, totalReviews }) => {
    const handleRatingChange = (newRating) => {
        // gửi api rating cho server
        console.log(newRating);
    };

    const filledStars = Math.floor(rating);
    const emptyStars = 5 - filledStars;

    return (
        <div className="px-5 md:px-10 xl:px-64 py-2">
            <h4 className="title text-2xl font-bold mb-2">Bài toán xúc xắc (tiết 2)</h4>
            <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="info flex">
                    <div className="time">
                        <FontAwesomeIcon className="mr-1" icon={faCirclePlay} />
                        <span>{formatDuration(duration)}</span>
                    </div>
                    <div className="comment ml-3">
                        <FontAwesomeIcon className="mr-1" icon={faComment} />
                        <span>246</span>
                    </div>
                </div>
                <div className="rating mt-3 lg:mt-0">
                    <div className="star">
                        <div className="flex lg:justify-end space-x-2">
                            <div className="flex space-x-1">
                                {[...Array(filledStars)].map((_, index) => (
                                    <FontAwesomeIcon
                                        key={index}
                                        icon={solidStar}
                                        className="text-orange-500 h-6 w-6"
                                        onClick={() => handleRatingChange(index + 1)}
                                    />
                                ))}
                                {[...Array(emptyStars)].map((_, index) => (
                                    <FontAwesomeIcon
                                        key={index}
                                        icon={regularStar}
                                        className="text-gray-300 h-6 w-6"
                                        onClick={() => handleRatingChange(filledStars + index + 1)}
                                    />
                                ))}
                            </div>
                            <span className="text-lg text-gray-900">
                                {rating} | {totalReviews} đánh giá
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center lg:mt-10">
                <a href="#!" className='bg-peach px-16 py-2 rounded-xl shadow-md text-white font-bold text-xl'>
                    <span>Bài tập</span>
                    <FontAwesomeIcon className='ml-2' icon={faPenToSquare}/>
                </a>
            </div>
            <div className="mt-5">
                <h4 className='text-xl font-bold mb-3'>Mô tả bài học</h4>
                <div className="description">
                    bài học 1
                </div>
            </div>
        </div>
    );
};

Info.propTypes = {
    duration: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    totalReviews: PropTypes.number.isRequired,
};

export default Info;
