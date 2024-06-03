import { Fragment } from 'react';
import Header from '~/components/Header';

// eslint-disable-next-line react/prop-types
const DefaultLayout = ({ children }) => {
    return (
        <Fragment>
            <div className="header overflow-hidden">
                <Header />
            </div>
            <div className="content mt-[60px] min-h-screen bg-content">{children}</div>
        </Fragment>
    );
};

export default DefaultLayout;
