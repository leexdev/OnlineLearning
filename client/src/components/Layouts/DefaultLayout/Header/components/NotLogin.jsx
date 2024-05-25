import { faUser, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "../../components/Modal";
import RegisterForm from "../../components/RegisterForm";
import LoginForm from "../../components/LoginForm";
import { useState } from "react";

const NotLogin = () => {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isRegister, setIsRegister] = useState(false);

    const toggleModal = () => {
        setIsLoginOpen(!isLoginOpen);
        if (!isLoginOpen) {
            setIsRegister(false); // Reset to login form when reopening modal
        }
    };

    const switchToRegister = () => {
        setIsRegister(true);
    };

    const switchToLogin = () => {
        setIsRegister(false);
    };

    const closeModal = () => {
        setIsLoginOpen(false);
    };

    return (
        <div>
            <button
                data-modal-target="authentication-modal"
                data-modal-toggle="authentication-modal"
                className="block text-white bg-peach font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                type="button"
                onClick={toggleModal}
            >
                <FontAwesomeIcon className="mr-2 text-lg" icon={faUser} />
                <span>Đăng nhập</span>
            </button>
            {isLoginOpen && (
                <Modal isOpen={isLoginOpen} onClose={closeModal}>
                    <div className="relative md:w-[450px] bg-white rounded-lg shadow">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                            <h3 className="text-2xl text-gray-900 uppercase font-bold">
                                {isRegister ? 'Đăng ký' : 'Đăng nhập'}
                            </h3>
                            <button
                                type="button"
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                                onClick={closeModal}
                            >
                                <FontAwesomeIcon icon={faX} />
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div className="p-4 md:p-5">
                            {isRegister ? (
                                <RegisterForm switchToLogin={switchToLogin} onClose={closeModal} />
                            ) : (
                                <LoginForm switchToRegister={switchToRegister} onClose={closeModal} />
                            )}
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default NotLogin;
