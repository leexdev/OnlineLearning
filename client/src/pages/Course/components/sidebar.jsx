import { faClock, faUserPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Sidebar = () => {
    return (
        <div className="w-full lg:w-1/3 float-right grid grid-cols-1 mb-10 lg:z-50 top-16 lg:sticky">
            <div className="px-1">
                <div className="bg-white rounded-md pb-5">
                    <div className="thumbnail p-2">
                        <img src="https://xcdn-cf.vuihoc.vn/upload/5c209fe6176b0/2024/01/29/2d4f_t7.png" alt="" />
                    </div>
                    <div className="content xs:px-2 md:px-7 text-right">
                        <div className="line-through text-2xl">
                            <span className="old-price">2.900.000₫</span>
                        </div>
                        <div className="text-sm font-bold">
                            <span className="mr-2">Chỉ còn</span>
                            <span className="new-price text-5xl">2.600.000</span>
                        </div>
                        <div className="text-peach">
                            <FontAwesomeIcon className="mr-1" icon={faClock} />
                            <span>Chỉ còn 2 ngày</span>
                        </div>
                        <a
                            href="!#"
                            className="action-btn mt-2 flex justify-center items-center text-white bg-peach py-2 md:px-10 rounded-xl shadow-lg font-bold uppercase text-md md:text-xl"
                        >
                            <FontAwesomeIcon className="mr-2 md:mr-4" icon={faUserPen}></FontAwesomeIcon>
                            <span>Đăng ký học</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
