const Info = ({ course }) => {
    return (
        <div id="course-info" className="mb-10">
            <div className="title text-2xl font-semibold mb-2">Thông tin khóa học</div>
            <div className="info border py-5 px-10 rounded-lg bg-white">
                <div className="content">
                    {course.description}
                </div>
            </div>
        </div>
    );
};

export default Info;
