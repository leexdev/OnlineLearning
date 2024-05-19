import { faClock, faHandPointRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const News = () => {
    return (
        <div className="new-container py-20 bg-emerald-50">
            <div className="container">
                <div className="header mb-6">
                    <h1 className="uppercase font-bold text-4xl">Góc học tập</h1>
                </div>
                <div className="content grid sm:grid-cols-2 gap-4">
                    <div className="news-item">
                        <a href="#" className="title font-bold uppercase text-xl">
                            ĐÁP ÁN SỰ KIỆN TRUY TÌM NHÀ THÔNG THÁI LỚP 3 - TUẦN 2 THÁNG 5
                        </a>
                        <div className="text-gray-400 mb-2">
                            <FontAwesomeIcon className="mr-1" icon={faClock} />
                            12/5/2024 22:43
                        </div>
                        <div className="description text-gray-600 line-clamp-3">
                            Các bạn học sinh lớp 2 ơi! Các bạn đã tham gia sự kiện Truy tìm nhà thông thái tuần 2 tháng
                            5 diễn ra vào ngày 12/05 vừa qua chưa? Các bạn làm đúng bao nhiêu câu trên tổng số 15 câu
                            nhỉ? Giờ chúng mình hãy cùng đối chiếu đáp án nhé!
                        </div>
                    </div>
                    <div className="news-item mb-4">
                        <a href="#" className="title font-bold uppercase text-xl">
                            ĐÁP ÁN SỰ KIỆN TRUY TÌM NHÀ THÔNG THÁI LỚP 3 - TUẦN 2 THÁNG 5
                        </a>
                        <div className="text-gray-400 mb-2">
                            <FontAwesomeIcon className="mr-1" icon={faClock} />
                            12/5/2024 22:43
                        </div>
                        <div className="description text-gray-600 line-clamp-3">
                            Các bạn học sinh lớp 2 ơi! Các bạn đã tham gia sự kiện Truy tìm nhà thông thái tuần 2 tháng
                            5 diễn ra vào ngày 12/05 vừa qua chưa? Các bạn làm đúng bao nhiêu câu trên tổng số 15 câu
                            nhỉ? Giờ chúng mình hãy cùng đối chiếu đáp án nhé!
                        </div>
                    </div>
                    <div className="news-item mb-4">
                        <a href="#" className="title font-bold uppercase text-xl">
                            ĐÁP ÁN SỰ KIỆN TRUY TÌM NHÀ THÔNG THÁI LỚP 3 - TUẦN 2 THÁNG 5
                        </a>
                        <div className="text-gray-400 mb-2">
                            <FontAwesomeIcon className="mr-1" icon={faClock} />
                            12/5/2024 22:43
                        </div>
                        <div className="description text-gray-600 line-clamp-3">
                            Các bạn học sinh lớp 2 ơi! Các bạn đã tham gia sự kiện Truy tìm nhà thông thái tuần 2 tháng
                            5 diễn ra vào ngày 12/05 vừa qua chưa? Các bạn làm đúng bao nhiêu câu trên tổng số 15 câu
                            nhỉ? Giờ chúng mình hãy cùng đối chiếu đáp án nhé!
                        </div>
                    </div>
                    <div className="news-item mb-4">
                        <a href="#" className="title font-bold uppercase text-xl">
                            ĐÁP ÁN SỰ KIỆN TRUY TÌM NHÀ THÔNG THÁI LỚP 3 - TUẦN 2 THÁNG 5
                        </a>
                        <div className="text-gray-400 mb-2">
                            <FontAwesomeIcon className="mr-1" icon={faClock} />
                            12/5/2024 22:43
                        </div>
                        <div className="description text-gray-600 line-clamp-3">
                            Các bạn học sinh lớp 2 ơi! Các bạn đã tham gia sự kiện Truy tìm nhà thông thái tuần 2 tháng
                            5 diễn ra vào ngày 12/05 vừa qua chưa? Các bạn làm đúng bao nhiêu câu trên tổng số 15 câu
                            nhỉ? Giờ chúng mình hãy cùng đối chiếu đáp án nhé!
                        </div>
                    </div>
                </div>
            </div>
            <div className="get-all text-center ">
                <a href="#!" className='text-sky-600'>
                    <FontAwesomeIcon className='mr-2' icon={faHandPointRight} />
                    <span>Xem tất cả</span>
                </a>
            </div>
        </div>
    );
};

export default News;
