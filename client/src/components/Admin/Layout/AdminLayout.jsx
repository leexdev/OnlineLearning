import { Fragment } from 'react';
import Sidebar from './Sidebar';

const AdminLayout = ({ children }) => {
    return (
        <Fragment>
            <div className="content">
                <Sidebar />
                <div className="p-4 sm:ml-64 bg-gray-50 h-screen">
                    <div className="content p-4">{children}</div>
                </div>
            </div>
        </Fragment>
    );
};

export default AdminLayout;
