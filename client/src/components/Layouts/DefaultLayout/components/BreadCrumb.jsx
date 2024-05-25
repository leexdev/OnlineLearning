import { faAngleRight, faHouse } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import gradeApi from '~/api/gradeApi';

const BreadCrumb = () => {
    const location = useLocation();
    const { subjectId } = useParams();
    const [mapping, setMapping] = useState({});
    const [breadcrumbs, setBreadcrumbs] = useState([]);

    // Static mapping for fixed paths
    const staticMapping = {
        subject: "Khóa học",
    };

    useEffect(() => {
        const fetchMapping = async () => {
            const data = await gradeApi.getAll();
            const newMapping = {};

            data.forEach(grade => {
                newMapping[grade.id] = grade.name;
                grade.subjects.forEach(subject => {
                    newMapping[subject.id] = subject.name + " " + grade.name.toLowerCase();
                });
            });

            setMapping(newMapping);
        };

        fetchMapping();
    }, []);

    useEffect(() => {
        const pathnames = location.pathname.split('/').filter(x => x);
        const newBreadcrumbs = pathnames.map((value, index) => {
            const to = `/${pathnames.slice(0, index + 1).join('/')}`;

            const name = mapping[value] || staticMapping[value] || value;
            return { name, to, isLast: index === pathnames.length - 1 };
        });
        setBreadcrumbs(newBreadcrumbs);
    }, [location, mapping]);

    return (
        <nav className="breadcrumb bg-emerald-50 flex py-4" aria-label="Breadcrumb">
            <div className="container">
                <div className="inline-flex items-center space-x-1 md:space-x-2">
                    <div className="inline-flex items-center">
                        <Link
                            to="/"
                            className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-peach dark:text-gray-400 dark:hover:text-white"
                        >
                            <FontAwesomeIcon className="text-xl mr-1" icon={faHouse} />
                            Trang chủ
                        </Link>
                    </div>
                    {breadcrumbs.map(({ name, to, isLast }) => (
                        isLast ? (
                            <div key={to} aria-current="page">
                                <div className="flex items-center">
                                    <FontAwesomeIcon icon={faAngleRight} />
                                    <span className="ms-1 text-sm font-bold">{decodeURIComponent(name)}</span>
                                </div>
                            </div>
                        ) : (
                            <div key={to}>
                                <div className="flex items-center">
                                    <FontAwesomeIcon icon={faAngleRight} />
                                    <Link to={to} className="ms-1 text-sm font-medium text-gray-700 hover:text-peach md:ms-2">
                                        {decodeURIComponent(name)}
                                    </Link>
                                </div>
                            </div>
                        )
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default BreadCrumb;
