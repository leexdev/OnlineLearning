import { Fragment } from 'react';
import Header from '../../Header';
import Footer from './Footer';
import ScrollToTopButton from '~/components/ScrollToTopButton';

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
