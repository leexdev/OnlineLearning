import ClassGrid from './components/GradeGrid';
import SearchBar from './components/SearchBar';

const Banner = () => {
    return (
        <div className="banner-container container">
            <ClassGrid />
            <SearchBar />
        </div>
    );
};

export default Banner;
