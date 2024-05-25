import { useState, useEffect } from 'react';
import gradeApi from '~/api/gradeApi';
import GradeCard from './GradeCard';

const shuffleArray = (array) => {
    let currentIndex = array.length, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

const GradeGrid = () => {
    const [gradeData, setGradeData] = useState([]);

    useEffect(() => {
        const fetchGrades = async () => {
            try {
                const data = await gradeApi.getAll();
                setGradeData(data);
            } catch (error) {
                console.error('Failed to fetch grade data', error);
            }
        };

        fetchGrades();
    }, []);

    const bgColors = ["bg-red-400", "bg-yellow-300", "bg-blue-500", "bg-teal-400", "bg-green-400", "bg-pink-500"];
    const uniqueColors = shuffleArray([...bgColors]);
    const gridCols = `grid-cols-${(gradeData.length > 6) ? "6" : `${gradeData.length}`}`;

    return (
        <div className={`classBlock mx-auto my-4 -mt-12 relative z-50 grid ${gridCols} gap-2`}>
            {gradeData.map((classInfo, index) => (
                <GradeCard 
                    key={classInfo.id} 
                    title={classInfo.name} 
                    grade={classInfo.grade} 
                    subjects={classInfo.subjects.map(subject => ({ id: subject.id, name: subject.name }))} 
                    bgColor={gradeData.length <= 6 ? uniqueColors[index % uniqueColors.length] : bgColors[index % bgColors.length]}
                />
            ))}
        </div>
    );
};

export default GradeGrid;
