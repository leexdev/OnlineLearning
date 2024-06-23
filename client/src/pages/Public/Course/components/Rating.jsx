import React, { useState, useEffect } from 'react';
import StarRatings from 'react-star-ratings';
import ratingApi from '~/api/ratingApi'; // Đảm bảo đường dẫn chính xác tới ratingApi

const RatingComponent = ({ courseId, hasPurchased, setError, setSuccess }) => {
    const [averageRating, setAverageRating] = useState(0);
    const [totalRatings, setTotalRatings] = useState(0);
    const [ratings, setRatings] = useState([]);

    useEffect(() => {
        fetchRating();
    }, [courseId]);

    const fetchRating = async () => {
        try {
            const ratingsData = await ratingApi.getByCourse(courseId);
            setRatings(ratingsData);
            if (ratingsData.length > 0) {
                const total = ratingsData.reduce((acc, curr) => acc + curr.score, 0);
                setAverageRating(total / ratingsData.length);
                setTotalRatings(ratingsData.length);
            } else {
                setAverageRating(0);
                setTotalRatings(0);
            }
        } catch (error) {
            console.error('Error fetching ratings:', error);
        }
    };

    const handleRating = async (newRating) => {
        if (!hasPurchased) {
            setError('Bạn cần đăng ký khóa học để có thể đánh giá.');
            return;
        }

        try {
            const ratingData = {
                courseId,
                score: newRating,
            };
            await ratingApi.add(ratingData);
            setSuccess('Cảm ơn bạn đã đánh giá');
            fetchRating();
        } catch (error) {
            console.error('Error submitting rating:', error);
            setError('Có lỗi xảy ra khi gửi đánh giá.');
        }
    };

    return (
        <div className="border border-gray-300 bg-white rounded-lg p-5 mt-5 md:mt-10">
            <h2 className="text-2xl font-semibold">Đánh giá khóa học</h2>
            <div className="flex justify-between items-center mt-3">
                <StarRatings
                    rating={averageRating || 0}
                    starRatedColor="orange"
                    changeRating={handleRating}
                    numberOfStars={5}
                    name="rating"
                    starDimension="30px"
                    starSpacing="5px"
                />
                <p className="ml-2 text-gray-700 font-bold">
                    {averageRating.toFixed(1)} | {totalRatings} đánh giá
                </p>
            </div>
        </div>
    );
};

export default RatingComponent;
