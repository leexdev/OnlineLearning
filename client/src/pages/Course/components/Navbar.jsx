const Navbar = () => {
    return (
        <div className="hidden bg-white lg:grid lg:grid-cols-2 mb-10 z-10 top-16 sticky">
            <a
                href="#course-info"
                className="uppercase font-bold text-xl text-center hover:bg-peach hover:text-white py-3 rounded-l-lg border"
            >
                Thông tin khóa học
            </a>
            <a
                href="#course-syllabus"
                className="uppercase font-bold text-xl text-center hover:bg-peach hover:text-white py-3 rounded-r-lg border"
            >
                Chương trình học
            </a>
        </div>
    );
};

export default Navbar;
