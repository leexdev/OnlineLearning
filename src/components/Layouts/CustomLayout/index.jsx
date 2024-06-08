import { Fragment } from 'react';
import Header from '~/components/Header';
import ScrollToTopButton from '~/components/ScrollToTopButton';

// eslint-disable-next-line react/prop-types
const DefaultLayout = ({ children }) => {
    return (
        <Fragment>
            <div className="header overflow-hidden">
                <Header />
            </div>
            <div className="content mt-[56px] min-h-screen bg-content">{children}</div>
            <ScrollToTopButton />
        </Fragment>
    );
};

export default DefaultLayout;
