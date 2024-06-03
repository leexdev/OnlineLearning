import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Slider = () => {
    return (
        <div id="default-carousel" className="relative w-full" data-carousel="slide">
            <div className="relative overflow-hidden rounded-lg h-30vh xs:h-40vh xl:h-90vh">
                <div className="hidden duration-700 ease-in-out" data-carousel-item="">
                    <img
                        src="https://xcdn-cf.vuihoc.vn/upload/5c209fe6176b0/2024/01/04/ec6d_banner-3c_2-web--283-29.png"
                        className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 h-full"
                        alt="..."
                    />
                </div>
            </div>
            <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
                <button
                    type="button"
                    className="w-3 h-3 rounded-full"
                    aria-current="true"
                    aria-label="Slide 1"
                    data-carousel-slide-to={0}
                />
                <button
                    type="button"
                    className="w-3 h-3 rounded-full"
                    aria-current="false"
                    aria-label="Slide 2"
                    data-carousel-slide-to={1}
                />
                <button
                    type="button"
                    className="w-3 h-3 rounded-full"
                    aria-current="false"
                    aria-label="Slide 3"
                    data-carousel-slide-to={2}
                />
                <button
                    type="button"
                    className="w-3 h-3 rounded-full"
                    aria-current="false"
                    aria-label="Slide 4"
                    data-carousel-slide-to={3}
                />
                <button
                    type="button"
                    className="w-3 h-3 rounded-full"
                    aria-current="false"
                    aria-label="Slide 5"
                    data-carousel-slide-to={4}
                />
            </div>
            <button
                type="button"
                className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                data-carousel-prev=""
            >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                    <FontAwesomeIcon icon={faAngleLeft} />
                    <span className="sr-only">Previous</span>
                </span>
            </button>
            <button
                type="button"
                className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                data-carousel-next=""
            >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                    <FontAwesomeIcon icon={faAngleRight} />
                    <span className="sr-only">Next</span>
                </span>
            </button>
        </div>
    );
};

export default Slider;
