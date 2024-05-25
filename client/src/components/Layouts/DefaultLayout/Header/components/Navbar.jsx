import { faBook, faMessage, faSquarePen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
    const location = useLocation();
    return (
        <div
            className="items-center justify-between hidden w-full md:flex md:w-auto bg-cobalt md:bg-peach md:order-1"
            id="navbar-user"
        >
            <ul className="flex flex-col font-bold p-4 md:p-0 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
                <li
                    className={`hidden md:flex md:hover:opacity-100 ${
                        location.pathname === '/' ? 'md:opacity-100' : 'md:opacity-70'
                    }`}
                >
                    <Link to="/" className="py-2 px-3 uppercase rounded md:p-0 flex items-center" aria-current="page">
                        <FontAwesomeIcon className="text-xl mr-1" icon={faBook} />
                        <span>Tự ôn luyện</span>
                    </Link>
                </li>
                <li
                    className={`hover:bg-peach rounded md:bg-transparent md:hover:opacity-100 ${
                        location.pathname === '/course' ? 'md:opacity-100' : 'md:opacity-70'
                    }`}
                >
                    <Link
                        to="/subject"
                        className="py-2 px-3 uppercase rounded md:p-0 flex items-center"
                        aria-current="page"
                    >
                        <FontAwesomeIcon className="text-xl mr-1" icon={faSquarePen} />
                        Góc học tập
                    </Link>
                </li>
                <li
                    className={`hover:bg-peach rounded md:bg-transparent md:hover:opacity-100 ${
                        location.pathname === '/lesson' ? 'md:opacity-100' : 'md:opacity-70'
                    }`}
                >
                    <Link to="/course" className="py-2 px-3 uppercase md:p-0 flex items-center " aria-current="page">
                        <FontAwesomeIcon className="text-xl mr-1" icon={faMessage} />
                        Hỏi đáp
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Navbar;
