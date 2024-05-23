import { faClock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import images from '~/assets/images';

const ListCourse = () => {
    return (
        <div className="course-container container">
            <div className="head-title">
                <h1 className="text-center text-xl md:text-2xl lg:text-5xl font-extrabold text-cyan-900 p-14">
                    Toán học lớp 1
                </h1>
            </div>
            <div className="content">
                <div className="grid course-item grid-cols-1 md:grid-cols-2 gap-5 mb-10">
                    <div className="relative top-0 flex justify-center">
                        <div className="content xl:absolute w-3/4 right-0 bottom-24">
                            <div className="box bg-peach border rounded-3xl p-1 shadow-md">
                                <div className="title text-white text-lg px-5 py-2 text-center">
                                    Khóa Toán nâng cao theo chuyên đề lớp 2
                                </div>
                                <div className="content bg-white md:line-clamp-5 px-5 py-2 rounded-b-3xl">
                                    <span className="line-clamp-5">
                                        Khóa học nâng cao giúp con đi sâu vào từng chuyên đề, chinh phục các dạng bài
                                        khó trong các kỳ thi học sinh giỏi.
                                    </span>
                                    <div className="grid grid-cols-1 md:grid-cols-2">
                                        <div className="time">
                                            <FontAwesomeIcon className="mr-1 text-gray-500" icon={faClock} />
                                            <span className="text-sm text-end">Chỉ còn 2 ngày</span>
                                        </div>
                                        <div className="price text-right">
                                            <div className="old-price line-through md:text-md xl:text-xl font-bold">
                                                2.900.000đ
                                            </div>
                                            <div className="new-price">
                                                <span className="mr-2">Chỉ còn</span>
                                                <span className="font-bold md:text-lg xl:text-2xl text-peach">
                                                    2.600.000đ
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="action text-center mt-5 text-white text-xl block sm:flex sm:justify-center">
                                        <a
                                            href="#!"
                                            className="mr-3 mb-3 md:mb-0 shadow-md block bg-gray-300 p-2 xl:py-2 xl:px-5 rounded-xl"
                                        >
                                            Xem thêm
                                        </a>
                                        <a
                                            href="#!"
                                            className="mr-3 shadow-md block bg-orange-600 p-2 xl:py-2 xl:px-7 rounded-xl"
                                        >
                                            Đăng ký
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <img
                                src={images.cat}
                                alt="Cat"
                                className="cat-act hidden xl:block xl:h-20vh absolute xl:-bottom-16 xl:-left-32"
                            />
                        </div>
                    </div>
                    <div className="img-course hidden md:block">
                        <img
                            src="https://xcdn-cf.vuihoc.vn/upload/5c209fe6176b0/2024/01/29/b91e_t12.png"
                            alt="Course Image"
                        />
                    </div>
                </div>
                <div className="grid course-item grid-cols-1 md:grid-cols-2 gap-5 mb-10">
                    <div className="relative top-0 flex justify-center">
                        <div className="content xl:absolute w-3/4 right-0 bottom-24">
                            <div className="box bg-peach border rounded-3xl p-1 shadow-md">
                                <div className="title text-white text-lg px-5 py-2 text-center">
                                    Khóa Toán nâng cao theo chuyên đề lớp 2
                                </div>
                                <div className="content bg-white md:line-clamp-5 px-5 py-2 rounded-b-3xl">
                                    <span className="line-clamp-5">
                                        Khóa học nâng cao giúp con đi sâu vào từng chuyên đề, chinh phục các dạng bài
                                        khó trong các kỳ thi học sinh giỏi.
                                    </span>
                                    <div className="grid grid-cols-1 md:grid-cols-2">
                                        <div className="time">
                                            <FontAwesomeIcon className="mr-1 text-gray-500" icon={faClock} />
                                            <span className="text-sm text-end">Chỉ còn 2 ngày</span>
                                        </div>
                                        <div className="price text-right">
                                            <div className="old-price line-through md:text-md xl:text-xl font-bold">
                                                2.900.000đ
                                            </div>
                                            <div className="new-price">
                                                <span className="mr-2">Chỉ còn</span>
                                                <span className="font-bold md:text-lg xl:text-2xl text-peach">
                                                    2.600.000đ
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="action text-center mt-5 text-white text-xl block sm:flex sm:justify-center">
                                        <a
                                            href="#!"
                                            className="mr-3 mb-3 md:mb-0 shadow-md block bg-gray-300 p-2 xl:py-2 xl:px-5 rounded-xl"
                                        >
                                            Xem thêm
                                        </a>
                                        <a
                                            href="#!"
                                            className="mr-3 shadow-md block bg-orange-600 p-2 xl:py-2 xl:px-7 rounded-xl"
                                        >
                                            Đăng ký
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <img
                                src={images.cat}
                                alt="Cat"
                                className="cat-act hidden xl:block xl:h-20vh absolute xl:-bottom-16 xl:-left-32"
                            />
                        </div>
                    </div>
                    <div className="img-course hidden md:block">
                        <img
                            src="https://xcdn-cf.vuihoc.vn/upload/5c209fe6176b0/2024/01/29/b91e_t12.png"
                            alt="Course Image"
                        />
                    </div>
                </div>
                <div className="grid course-item grid-cols-1 md:grid-cols-2 gap-5 mb-10">
                    <div className="relative top-0 flex justify-center">
                        <div className="content xl:absolute w-3/4 right-0 bottom-24">
                            <div className="box bg-peach border rounded-3xl p-1 shadow-md">
                                <div className="title text-white text-lg px-5 py-2 text-center">
                                    Khóa Toán nâng cao theo chuyên đề lớp 2
                                </div>
                                <div className="content bg-white md:line-clamp-5 px-5 py-2 rounded-b-3xl">
                                    <span className="line-clamp-5">
                                        Khóa học nâng cao giúp con đi sâu vào từng chuyên đề, chinh phục các dạng bài
                                        khó trong các kỳ thi học sinh giỏi.
                                    </span>
                                    <div className="grid grid-cols-1 md:grid-cols-2">
                                        <div className="time">
                                            <FontAwesomeIcon className="mr-1 text-gray-500" icon={faClock} />
                                            <span className="text-sm text-end">Chỉ còn 2 ngày</span>
                                        </div>
                                        <div className="price text-right">
                                            <div className="old-price line-through md:text-md xl:text-xl font-bold">
                                                2.900.000đ
                                            </div>
                                            <div className="new-price">
                                                <span className="mr-2">Chỉ còn</span>
                                                <span className="font-bold md:text-lg xl:text-2xl text-peach">
                                                    2.600.000đ
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="action text-center mt-5 text-white text-xl block sm:flex sm:justify-center">
                                        <a
                                            href="#!"
                                            className="mr-3 mb-3 md:mb-0 shadow-md block bg-gray-300 p-2 xl:py-2 xl:px-5 rounded-xl"
                                        >
                                            Xem thêm
                                        </a>
                                        <a
                                            href="#!"
                                            className="mr-3 shadow-md block bg-orange-600 p-2 xl:py-2 xl:px-7 rounded-xl"
                                        >
                                            Đăng ký
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <img
                                src={images.cat}
                                alt="Cat"
                                className="cat-act hidden xl:block xl:h-20vh absolute xl:-bottom-16 xl:-left-32"
                            />
                        </div>
                    </div>
                    <div className="img-course hidden md:block">
                        <img
                            src="https://xcdn-cf.vuihoc.vn/upload/5c209fe6176b0/2024/01/29/b91e_t12.png"
                            alt="Course Image"
                        />
                    </div>
                </div>
                <div className="grid course-item grid-cols-1 md:grid-cols-2 gap-5 mb-10">
                    <div className="relative top-0 flex justify-center">
                        <div className="content xl:absolute w-3/4 right-0 bottom-24">
                            <div className="box bg-peach border rounded-3xl p-1 shadow-md">
                                <div className="title text-white text-lg px-5 py-2 text-center">
                                    Khóa Toán nâng cao theo chuyên đề lớp 2
                                </div>
                                <div className="content bg-white md:line-clamp-5 px-5 py-2 rounded-b-3xl">
                                    <span className="line-clamp-5">
                                        Khóa học nâng cao giúp con đi sâu vào từng chuyên đề, chinh phục các dạng bài
                                        khó trong các kỳ thi học sinh giỏi.
                                    </span>
                                    <div className="grid grid-cols-1 md:grid-cols-2">
                                        <div className="time">
                                            <FontAwesomeIcon className="mr-1 text-gray-500" icon={faClock} />
                                            <span className="text-sm text-end">Chỉ còn 2 ngày</span>
                                        </div>
                                        <div className="price text-right">
                                            <div className="old-price line-through md:text-md xl:text-xl font-bold">
                                                2.900.000đ
                                            </div>
                                            <div className="new-price">
                                                <span className="mr-2">Chỉ còn</span>
                                                <span className="font-bold md:text-lg xl:text-2xl text-peach">
                                                    2.600.000đ
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="action text-center mt-5 text-white text-xl block sm:flex sm:justify-center">
                                        <a
                                            href="#!"
                                            className="mr-3 mb-3 md:mb-0 shadow-md block bg-gray-300 p-2 xl:py-2 xl:px-5 rounded-xl"
                                        >
                                            Xem thêm
                                        </a>
                                        <a
                                            href="#!"
                                            className="mr-3 shadow-md block bg-orange-600 p-2 xl:py-2 xl:px-7 rounded-xl"
                                        >
                                            Đăng ký
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <img
                                src={images.cat}
                                alt="Cat"
                                className="cat-act hidden xl:block xl:h-20vh absolute xl:-bottom-16 xl:-left-32"
                            />
                        </div>
                    </div>
                    <div className="img-course hidden md:block">
                        <img
                            src="https://xcdn-cf.vuihoc.vn/upload/5c209fe6176b0/2024/01/29/b91e_t12.png"
                            alt="Course Image"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListCourse;
