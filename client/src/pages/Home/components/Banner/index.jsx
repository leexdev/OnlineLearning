import { useState, useEffect } from 'react';
import GradeGrid from './components/GradeGrid';
import SearchBar from './components/SearchBar';
import gradeApi from '~/api/gradeApi';
import Spinner from '~/components/Spinner';

const Banner = () => {
    const [gradeData, setGradeData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGrades = async () => {
            try {
                const data = await gradeApi.getAll();
                setGradeData(data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch grade data', error);
                setError('Failed to fetch grade data');
                setLoading(false);
            }
        };

        fetchGrades();
    }, []);

    if (loading) {
        return <Spinner />;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="banner-container container">
            <GradeGrid gradeData={gradeData} />
            <SearchBar gradeData={gradeData} />
        </div>
    );
};

export default Banner;
