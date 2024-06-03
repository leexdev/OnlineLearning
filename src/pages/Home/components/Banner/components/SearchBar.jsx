import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ gradeData }) => {
    const [selectedGrade, setSelectedGrade] = useState('');
    const [subjects, setSubjects] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        if (selectedGrade) {
            const selectedGradeData = gradeData.find(grade => grade.id === parseInt(selectedGrade));
            setSubjects(selectedGradeData ? selectedGradeData.subjects : []);
        } else {
            setSubjects([]);
        }
    }, [selectedGrade, gradeData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedSubject) {
            const selectedGradeData = gradeData.find(grade => grade.id === parseInt(selectedGrade));
            const selectedSubjectData = subjects.find(subject => subject.id === parseInt(selectedSubject));

            const subjectName = selectedSubjectData ? selectedSubjectData.name : '';
            const gradeName = selectedGradeData ? selectedGradeData.name : '';

            navigate(`/subject/${selectedSubject}`, {
                state: {
                    subjectName,
                    gradeName,
                    subjectId: selectedSubject
                }
            });
        }
    };

    return (
        <form className="searchBar block mt-10 mx-auto" onSubmit={handleSubmit}>
            <ul className="py-3 rounded-lg items-center bg-sky-400 sm:flex justify-center">
                <li className="text-xl font-bold text-white text-center md:text-end">Tìm bài giảng</li>
                <li className="md:mx-5 text-center md:text-end">
                    <div className="selectBox py-2 sm:py-0">
                        <select
                            className="rounded-xl border-none text-xl font-bold text-sky-600 px-7"
                            value={selectedGrade}
                            onChange={(e) => setSelectedGrade(e.target.value)}
                        >
                            <option value="">Chọn lớp</option>
                            {gradeData.map(grade => (
                                <option key={grade.id} value={grade.id}>{grade.name}</option>
                            ))}
                        </select>
                    </div>
                </li>
                <li className="sm:mr-3 md:mr-5 text-center pb-2 sm:pb-0">
                    <div className="selectBox">
                        <select
                            className="rounded-xl border-none text-xl font-bold text-sky-600 px-7"
                            value={selectedSubject}
                            onChange={(e) => setSelectedSubject(e.target.value)}
                            disabled={!selectedGrade}
                        >
                            <option value="">Chọn môn</option>
                            {subjects.map(subject => (
                                <option key={subject.id} value={subject.id}>{subject.name}</option>
                            ))}
                        </select>
                    </div>
                </li>
                <li className="rounded-2xl text-xl font-bold text-center md:text-start text-white">
                    <button type="submit" className="btn bg-peach rounded-xl p-2 px-5">
                        <FontAwesomeIcon icon={faSearch} />
                        <span className="text">Tìm kiếm</span>
                    </button>
                </li>
            </ul>
        </form>
    );
};

SearchBar.propTypes = {
    gradeData: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        name: PropTypes.string.isRequired,
        subjects: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            name: PropTypes.string.isRequired,
        })).isRequired,
    })).isRequired,
};

export default SearchBar;
