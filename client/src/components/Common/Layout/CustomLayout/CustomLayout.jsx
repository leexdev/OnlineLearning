import { Fragment } from 'react';
import Header from '~/components/Common/Header/Header';
import ScrollToTopButton from '~/components/Common/ScrollToTopButton';

// eslint-disable-next-line react/prop-types
const CustomLayout = ({ children }) => {
    return (
        <Fragment>
            <div className="header overflow-hidden">
                <Header />
            </div>
            <div className="content mt-[56px] bg-content" style={{ height: 'calc(100vh - 56px)' }}>
                {children}
            </div>
            <ScrollToTopButton />
        </Fragment>
    );
};

export default CustomLayout;
