import PropTypes from 'prop-types';
import GradeCard from './GradeCard';
import classNames from 'classnames';

const shuffleArray = (array) => {
    let currentIndex = array.length,
        randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
};

const gridColsClasses = {
    1: 'md:grid-cols-1',
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4',
    5: 'md:grid-cols-5',
    6: 'md:grid-cols-6',
};

const GradeGrid = ({ gradeData }) => {
    const bgColors = ['bg-red-400', 'bg-yellow-300', 'bg-blue-500', 'bg-teal-400', 'bg-green-400', 'bg-pink-500'];
    const uniqueColors = shuffleArray([...bgColors]);
    const numCols = gradeData.length > 6 ? 6 : gradeData.length;
    const gridColsClass = gridColsClasses[numCols] || 'md:grid-cols-1';

    return (
        <div className={classNames('classBlock mx-auto my-4 -mt-12 relative z-50 grid grid-cols-2', gridColsClass)}>
            {gradeData.map((grade, index) => (
                <GradeCard
                    key={grade.id}
                    title={grade.name}
                    subjects={grade.subjects.map((subject) => ({ id: subject.id, name: subject.name }))}
                    bgColor={
                        gradeData.length <= 6
                            ? uniqueColors[index % uniqueColors.length]
                            : bgColors[index % bgColors.length]
                    }
                />
            ))}
        </div>
    );
};

GradeGrid.propTypes = {
    gradeData: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            name: PropTypes.string.isRequired,
            subjects: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
                    name: PropTypes.string.isRequired,
                }),
            ).isRequired,
        }),
    ).isRequired,
};

export default GradeGrid;
