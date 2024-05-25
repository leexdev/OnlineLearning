import React from 'react';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import images from '~/assets/images';

const CourseCard = ({ course }) => {
    return (
        <div className="relative top-0 flex justify-center">
            <div className="content xl:absolute w-3/4 right-0 bottom-24">
                <div className="box bg-peach border rounded-3xl p-1 shadow-md">
                    <div className="title text-white text-lg px-5 py-2 text-center">{course.title}</div>
                    <div className="content bg-white md:line-clamp-5 px-5 py-2 rounded-b-3xl">
                        <span className="line-clamp-5">{course.description}</span>
                        <div className="grid grid-cols-1 md:grid-cols-2">
                            <div className="time">
                                <FontAwesomeIcon className="mr-1 text-gray-500" icon={faClock} />
                                <span className="text-sm text-end">Chỉ còn 2 ngày</span>
                            </div>
                            {course.newPrice !== null ? (
                                <div className="price text-right">
                                    <div className="old-price line-through md:text-md xl:text-xl font-bold">
                                        {course.price.toLocaleString('vi-VN')}đ
                                    </div>
                                    <div className="new-price">
                                        <span className="mr-2">Chỉ còn</span>
                                        <span className="font-bold md:text-lg xl:text-2xl text-peach">
                                            {course.newPrice.toLocaleString('vi-VN')}đ
                                        </span>
                                    </div>
                                </div>
                            ) : (
                                course.price !== null && (
                                    <div className="price text-right">
                                        <div className="new-price">
                                            <span className="mr-2">Giá chỉ</span>
                                            <span className="font-bold md:text-lg xl:text-2xl text-peach">
                                                {course.price.toLocaleString('vi-VN')}đ
                                            </span>
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                        <div className="action text-center mt-5 text-white text-xl block sm:flex sm:justify-center">
                            <a
                                href="#!"
                                className="mr-3 mb-3 md:mb-0 shadow-md block bg-gray-300 p-2 xl:py-2 xl:px-5 rounded-xl"
                            >
                                Xem thêm
                            </a>
                            <a href="#!" className="mr-3 shadow-md block bg-orange-600 p-2 xl:py-2 xl:px-7 rounded-xl">
                                Đăng ký
                            </a>
                        </div>
                    </div>
                </div>
                <img
                    src={images.cat}
                    alt={course.title}
                    className="cat-act hidden xl:block xl:h-20vh absolute xl:-bottom-16 xl:-left-32"
                />
            </div>
        </div>
    );
};

export default CourseCard;
