import PropTypes from 'prop-types';
const Course = (props) => {
    return (
        <div className="course container pt-20">
            <div className="header mb-6">
                <h1 className="uppercase font-bold text-4xl">{props.title}</h1>
            </div>
            <div className="content">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    <div className="max-w-sm bg-white rounded-lg shadow">
                        <a href="#">
                            <img
                                className="rounded-t-lg"
                                src="https://xcdn-cf.vuihoc.vn/upload/5c209fe6176b0/2024/01/29/8844_t10.png"
                                alt=""
                            />
                        </a>
                        <div className="p-5">
                            <a href="#">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                                    Khóa học Toán 2 - Chân trời sáng tạo
                                </h5>
                            </a>
                            <p className="mb-3 font-normal text-gray-700 line-clamp-3 md:line-clamp-5">
                                Khoá học theo chương trình sách Chân Trời Sáng Tạo giúp truyền cảm hứng để con sáng tạo,
                                phát triển mọi tiềm năng của bản thân thông qua môn
                            </p>
                            <a
                                href="#"
                                className="inline-flex float-right items-center px-3 py-2 text-sm font-medium text-center text-white bg-lime-500 rounded-lg hover:bg-lime-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
                            >
                                Xem thêm
                                <svg
                                    className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 14 10"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M1 5h12m0 0L9 1m4 4L9 9"
                                    />
                                </svg>
                            </a>
                        </div>
                    </div>
                    <div className="max-w-sm bg-white rounded-lg shadow">
                        <a href="#">
                            <img
                                className="rounded-t-lg"
                                src="https://xcdn-cf.vuihoc.vn/upload/5c209fe6176b0/2024/01/29/8844_t10.png"
                                alt=""
                            />
                        </a>
                        <div className="p-5">
                            <a href="#">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                                    Khóa học Toán 2 - Chân trời sáng tạo
                                </h5>
                            </a>
                            <p className="mb-3 font-normal text-gray-700 line-clamp-3 md:line-clamp-5">
                                Khoá học theo chương trình sách Chân Trời Sáng Tạo giúp truyền cảm hứng để con sáng tạo,
                                phát triển mọi tiềm năng của bản thân thông qua môn
                            </p>
                            <a
                                href="#"
                                className="inline-flex float-right items-center px-3 py-2 text-sm font-medium text-center text-white bg-lime-500 rounded-lg hover:bg-lime-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
                            >
                                Xem thêm
                                <svg
                                    className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 14 10"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M1 5h12m0 0L9 1m4 4L9 9"
                                    />
                                </svg>
                            </a>
                        </div>
                    </div>
                    <div className="max-w-sm bg-white rounded-lg shadow">
                        <a href="#">
                            <img
                                className="rounded-t-lg"
                                src="https://xcdn-cf.vuihoc.vn/upload/5c209fe6176b0/2024/01/29/8844_t10.png"
                                alt=""
                            />
                        </a>
                        <div className="p-5">
                            <a href="#">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                                    Khóa học Toán 2 - Chân trời sáng tạo
                                </h5>
                            </a>
                            <p className="mb-3 font-normal text-gray-700 line-clamp-3 md:line-clamp-5">
                                Khoá học theo chương trình sách Chân Trời Sáng Tạo giúp truyền cảm hứng để con sáng tạo,
                                phát triển mọi tiềm năng của bản thân thông qua môn
                            </p>
                            <a
                                href="#"
                                className="inline-flex float-right items-center px-3 py-2 text-sm font-medium text-center text-white bg-lime-500 rounded-lg hover:bg-lime-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
                            >
                                Xem thêm
                                <svg
                                    className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 14 10"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M1 5h12m0 0L9 1m4 4L9 9"
                                    />
                                </svg>
                            </a>
                        </div>
                    </div>
                    <div className="max-w-sm bg-white rounded-lg shadow">
                        <a href="#">
                            <img
                                className="rounded-t-lg"
                                src="https://xcdn-cf.vuihoc.vn/upload/5c209fe6176b0/2024/01/29/8844_t10.png"
                                alt=""
                            />
                        </a>
                        <div className="p-5">
                            <a href="#">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                                    Khóa học Toán 2 - Chân trời sáng tạo
                                </h5>
                            </a>
                            <p className="mb-3 font-normal text-gray-700 line-clamp-3 md:line-clamp-5">
                                Khoá học theo chương trình sách Chân Trời Sáng Tạo giúp truyền cảm hứng để con sáng tạo,
                                phát triển mọi tiềm năng của bản thân thông qua môn
                            </p>
                            <a
                                href="#"
                                className="inline-flex float-right items-center px-3 py-2 text-sm font-medium text-center text-white bg-lime-500 rounded-lg hover:bg-lime-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
                            >
                                Xem thêm
                                <svg
                                    className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 14 10"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M1 5h12m0 0L9 1m4 4L9 9"
                                    />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

Course.propTypes = {
    title: PropTypes.string.isRequired,
};

export default Course;
