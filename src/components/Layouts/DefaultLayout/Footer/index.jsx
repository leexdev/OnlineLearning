const Footer = () => {
    return (
        <footer className="text-center">
            <div className="py-10 container md:text-left">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 text-sm">
                    <div className="item">
                        <div className="mb-4 font-semibold uppercase md:justify-start">
                            <span className="uppercase text-xl text-sky-700">CHĂM SÓC KHÁCH HÀNG</span>
                        </div>
                        <p className="mb-2">
                            <a href="#!">
                                <b>Trung tâm trợ giúp</b>
                            </a>
                        </p>
                        <p className="mb-2">
                            <a href="#!">
                                <span className="text-gray-500">Email: </span>
                                <a href="mailto:hotro@vuihoc.vn">hotro@vuihoc.vn</a>
                            </a>
                        </p>
                        <p className="mb-2">
                            <a href="#!">
                                <span className="text-gray-500">Sđt: </span>
                                <a href="tel:0987654321">0987 654 321</a>
                            </a>
                        </p>
                    </div>
                    <div className="item">
                        <h6 className="mb-4 flex items-center justify-center font-semibold uppercase md:justify-start">
                            <span className="uppercase text-xl text-sky-700">CHÍNH SÁCH CỦA CHÚNG TÔI</span>
                        </h6>
                        <p className="mb-2">
                            <a href="!#">Chính sách bảo mật</a>
                        </p>
                    </div>
                    <div className="item">
                        <h6 className="mb-4 flex items-center justify-center font-semibold uppercase md:justify-start">
                            <span className="uppercase text-xl text-sky-700">VỀ CHÚNG TÔI</span>
                        </h6>
                        <p className="mb-2">
                            <a href="!#">Giới thiệu</a>
                        </p>
                        <p className="mb-2">
                            <a href="!#">Liên hệ</a>
                        </p>
                    </div>
                    <div className="item">
                        <h6 className="mb-4 flex items-center justify-center font-semibold uppercase md:justify-start">
                            <span className="uppercase text-xl text-sky-700">HỎI ĐÁP</span>
                        </h6>
                        <p className="mb-2">
                            <a href="#!">Bảng tin</a>
                        </p>
                        <p className="mb-2">
                            <a href="#!">Hỏi bài & Chữa bài</a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
