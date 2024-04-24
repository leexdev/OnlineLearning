import { Fragment } from 'react';
import Header from './Header';
import { Footer } from 'flowbite-react';

const DefaultLayout = ({ children }) => {
    return (
        <Fragment>
            <div className="header">
                <Header />
            </div>
            <div className="content">
                {children}
            </div>
            <div className="footer">
                <Footer />
            </div>
        </Fragment>
    );
};

export default DefaultLayout;
