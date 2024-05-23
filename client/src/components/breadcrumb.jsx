import { faAngleRight, faHouse } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const BreadCrumb = () => {
    return (
        <nav className="breadcrumb bg-emerald-50 flex py-4" aria-label="Breadcrumb">
            <div className="container">
                <div className="inline-flex items-center space-x-1 md:space-x-2">
                    <div className="inline-flex items-center">
                        <Link
                            to="/"
                            className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-peach dark:text-gray-400 dark:hover:text-white"
                        >
                            <FontAwesomeIcon className="text-xl mr-1" icon={faHouse} />
                            Trang chủ
                        </Link>
                    </div>
                    <div>
                        <div className="flex items-center">
                            <FontAwesomeIcon icon={faAngleRight} />
                            <Link to="#!" className="ms-1 text-sm font-medium text-gray-700 hover:text-peach md:ms-2">
                                Lớp 1
                            </Link>
                        </div>
                    </div>
                    <div aria-current="page">
                        <div className="flex items-center">
                            <FontAwesomeIcon icon={faAngleRight} />
                            <span className="ms-1 text-sm font-bold">Toán học lớp 1</span>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default BreadCrumb;
