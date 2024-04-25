const Slider = () => {
    return (
        <div
            id="controls-carousel"
            className="relative h-40 xs:h-52 sm:h-80 lg:h-96 w-full xl:h-32.8 xxl:h-48.6"
            data-carousel="static"
        >
            <div className="relative h-full overflow-hidden">
                <div className="hidden duration-700 ease-in-out" data-carousel-item="">
                    <img
                        src="https://xcdn-cf.vuihoc.vn/upload/5c209fe6176b0/2024/01/05/e069_banner-thay-co-v2.png"
                        className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                        alt="..."
                    />
                </div>
                <div className="hidden duration-700 ease-in-out" data-carousel-item="active">
                    <img
                        src="https://xcdn-cf.vuihoc.vn/upload/5c209fe6176b0/2024/04/13/d904_13.04.24_huongnt9_banner-download-app-android.ai.png"
                        className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                        alt="..."
                    />
                </div>
                <div className="hidden duration-700 ease-in-out" data-carousel-item="">
                    <img
                        src="https://xcdn-cf.vuihoc.vn/upload/5c209fe6176b0/2024/01/05/e069_banner-thay-co-v2.png"
                        className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                        alt="..."
                    />
                </div>
                <div className="hidden duration-700 ease-in-out" data-carousel-item="">
                    <img
                        src="https://xcdn-cf.vuihoc.vn/upload/5c209fe6176b0/2024/01/05/e069_banner-thay-co-v2.png"
                        className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                        alt="..."
                    />
                </div>
                <div className="hidden duration-700 ease-in-out" data-carousel-item="">
                    <img
                        src="https://xcdn-cf.vuihoc.vn/upload/5c209fe6176b0/2024/01/05/e069_banner-thay-co-v2.png"
                        className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                        alt="..."
                    />
                </div>
            </div>
            <button
                type="button"
                className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer"
                data-carousel-prev=""
            >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 hover:bg-white/50">
                    <svg
                        className="w-4 h-4 text-white rtl:rotate-180"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 6 10"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 1 1 5l4 4"
                        />
                    </svg>
                    <span className="sr-only">Previous</span>
                </span>
            </button>
            <button
                type="button"
                className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group"
                data-carousel-next=""
            >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 hover:bg-white/50">
                    <svg
                        className="w-4 h-4 text-white rtl:rotate-180"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 6 10"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="m1 9 4-4-4-4"
                        />
                    </svg>
                    <span className="sr-only">Next</span>
                </span>
            </button>
        </div>
    );
};

export default Slider;
