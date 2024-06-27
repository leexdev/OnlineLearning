import ArticleCard from './components/ArticleCard';
import Sidebar from './components/Sidebar';

const News = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex">
                <div className="w-3/4 pr-4">
                    <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
                        <h1 className="text-3xl font-bold mb-4">Góc học tập</h1>
                        <p className="text-gray-500">26/06/2024</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <ArticleCard
                            image="path/to/image1.jpg"
                            title="Quan hệ giữa góc và cạnh đối diện trong một tam giác"
                            author="Hoàng Uyên"
                            date="15:25 26/06/2024"
                            views="7"
                            description="Giữa góc và cạnh đối diện trong một tam giác có quan hệ gì đặc biệt? Mời bạn cùng theo dõi bài học quan hệ giữa góc và cạnh đối diện trong một tam giác toán 7 chương trình mới."
                        />
                        <ArticleCard
                            image="path/to/image2.jpg"
                            title='ĐÁP ÁN SỰ KIỆN "TRUY TÌM NHÀ THÔNG THÁI" LỚP 7 - TUẦN 4 THÁNG 6'
                            author="BTV GIA SƯ"
                            date="15:04 26/06/2024"
                            views="8"
                            description="Các bạn học sinh lớp 7 ơi! Các bạn đã tham gia sự kiện 'Truy tìm nhà thông thái' tuần 4 tháng 6 diễn ra vào ngày 23/06 vừa qua chưa? Các bạn làm đúng bao nhiêu câu trên tổng số 15 câu nhỉ? Giờ chúng mình hãy cùng đối chiếu đáp án nhé!"
                        />
                    </div>
                </div>
                <div className="w-1/4">
                    <Sidebar />
                </div>
            </div>
        </div>
    );
};

export default News;
