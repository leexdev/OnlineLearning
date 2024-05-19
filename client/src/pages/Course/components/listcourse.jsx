import { faClock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import images from '~/assets/images';

const ListCourse = () => {
    return (
        <div className="course-container container">
            <div className="head-title">
                <h1 className="text-center text-4xl md:text-5xl font-extrabold text-cyan-900 p-14">Toán học lớp 1</h1>
            </div>
            <div className="content">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="course-item relative top-0">
                        <div className="content absolute w-3/4 right-0">
                            <div className="box bg-header border rounded-3xl p-1 shadow-lg xl:-bottom-16 xl:left-36 xl:right-36">
                                <div className="title text-white text-lg px-5 py-2 text-center">
                                    Khóa Toán nâng cao theo chuyên đề lớp 2
                                </div>
                                <div className="content bg-white line-clamp-5 px-5 py-2 rounded-b-3xl">
                                    Khóa học nâng cao giúp con đi sâu vào từng chuyên đề, chinh phục các dạng bài khó
                                    trong các kỳ thi học sinh giỏi.
                                    <div className="grid grid-cols-2">
                                        <div className="time">
                                            <FontAwesomeIcon className="mr-1 text-gray-500" icon={faClock} />
                                            <span className="text-sm text-end">Chỉ còn 2 ngày</span>
                                        </div>
                                        <div className="price text-right">
                                            <div className="old-price line-through text-xl font-bold">2.900.000đ</div>
                                            <div className="new-price">
                                                <span className="mr-2">Chỉ còn</span>
                                                <span className="font-bold text-2xl text-header">2.600.000đ</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <img
                                src={images.cat}
                                alt=""
                                className="cat-act h-20vh absolute xl:-bottom-32 xl:-left-32"
                            />
                        </div>
                    </div>
                    <div className="img-course hidden md:block">
                        <img src="https://xcdn-cf.vuihoc.vn/upload/5c209fe6176b0/2024/01/29/b91e_t12.png" alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListCourse;
