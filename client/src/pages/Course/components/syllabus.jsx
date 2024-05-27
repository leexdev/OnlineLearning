import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FreeLessons from './FreeLessons';
import ChapterList from './ChapterList';

const Syllabus = ({ chapters, onLessonClick, completedLessons }) => {
    const freeLessons = chapters.flatMap(chapter => chapter.lessons.filter(lesson => lesson.isFree));

    return (
        <div id="course-syllabus">
            <div className="header block lg:flex lg:justify-between mb-3">
                <div className="title text-4xl font-bold mb-5 lg:mb-0 text-center lg:text-start">Chương trình học</div>
                <form>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <FontAwesomeIcon className="text-gray-400" icon={faSearch} />
                        </div>
                        <input
                            type="search"
                            id="default-search"
                            className="w-full p-3 ps-10 text-lg text-gray-900 border font-bold border-gray-200 rounded-lg bg-white focus:ring-cyan-500 focus:border-cyan-500"
                            placeholder="Tìm kiếm bài học"
                            required
                        />
                    </div>
                </form>
            </div>
            <div className="box rounded-b-lg border-cyan-500 bg-white">
                <FreeLessons lessons={freeLessons} onLessonClick={onLessonClick} />
                <ChapterList chapters={chapters} onLessonClick={onLessonClick} completedLessons={completedLessons} />
            </div>
        </div>
    );
};

export default Syllabus;
