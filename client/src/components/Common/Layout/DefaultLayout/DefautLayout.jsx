import { Fragment } from 'react';
import Footer from './Footer';
import ScrollToTopButton from '~/components/Common/ScrollToTopButton';
import Header from '~/components/Common/Header/Header';

// eslint-disable-next-line react/prop-types
const DefaultLayout = ({ children }) => {
    return (
        <Fragment>
            <div className="header overflow-hidden">
                <Header />
            </div>
            <div className="content mt-[56px] lg:min-h-screen bg-content">{children}</div>
            <div className="footer">
                <Footer />
            </div>
            <ScrollToTopButton />
        </Fragment>
    );
};

export default DefaultLayout;
