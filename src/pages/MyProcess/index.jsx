import { Fragment, useContext } from 'react';
import SidebarUser from '~/components/SidebarUser';
import AuthContext from '~/context/AuthContext';
import Spinner from '~/components/Spinner';
import Process from './components/Process';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const MyProcess = () => {
    const location = useLocation();
    const { courseId, courseName } = location.state;
    const { user, loading } = useContext(AuthContext);

    if (loading) return <Spinner />;
    if (!user) return <div>Process not found</div>;

    return (
        <Fragment>
            <Helmet>
                <title>Tiến độ học tập</title>
            </Helmet>
            <div className="container md:p-10 text-center">
                <div className="md:grid lg:grid-cols-3 md:gap-6">
                    <SidebarUser user={user} />
                    <div className="profile lg:col-span-2">
                        <Process courseId={courseId} courseName={courseName} />
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default MyProcess;
