import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import userAnswerApi from '~/api/userAnswerApi';
import Spinner from '~/components/Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';
import { format } from 'date-fns';

const RecentWrongAnswers = ({ courseId }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const pageSize = 3;

    const fetchData = async (pageNumber, pageSize) => {
        try {
            const response = await userAnswerApi.getRecentUncorrectedWrongAnswers(courseId, pageNumber, pageSize);
            console.log('response:', response);

            if (response.length === 0 || response.length < pageSize) {
                setHasMore(false);
            }

            setData((prevData) => [...prevData, ...response]);
        } catch (error) {
            setError('Đã xảy ra lỗi khi tải dữ liệu.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(page, pageSize);
    }, [page]);

    const fetchMoreData = () => {
        console.log('Fetching more data...');
        setPage((prevPage) => prevPage + 1);
    };

    if (loading) return <Spinner />;
    if (error) return <div>{error}</div>;

    return (
        <div className="mt-8 overflow-auto">
            {/* Đặt chiều cao tối thiểu */}
            {data.length === 0 ? (
                <p className="text-center mt-2">
                    <b>Bạn chưa làm sai câu nào</b>
                </p>
            ) : (
                <InfiniteScroll
                    dataLength={data.length} // Cập nhật dataLength là độ dài của data
                    next={fetchMoreData}
                    hasMore={hasMore}
                    endMessage={
                        <p className="text-center mt-2">
                            <b>Bạn đã xem hết tất cả câu trả lời sai gần đây</b>
                        </p>
                    }
                >
                    <div className="bg-white rounded-lg">
                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        #
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Ngày
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Bài học
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Câu hỏi
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item, index) => (
                                    <tr key={item.id}>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{index + 1}</td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            {format(new Date(item.createdAt), 'dd/MM/yyyy, HH:mm')}
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm ">
                                            <Link
                                                to={`/lesson/${item.lessonId}`}
                                                className="text-blue-700 hover:text-blue-800 whitespace-no-wrap"
                                            >
                                                {item.lessonTitle}
                                            </Link>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <span>{item.questionContent}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </InfiniteScroll>
            )}
        </div>
    );
};

export default RecentWrongAnswers;
