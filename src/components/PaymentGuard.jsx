import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const PaymentGuard = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const paymentStatus = sessionStorage.getItem('paymentStatus');
        console.log(paymentStatus);
        const currentPath = location.pathname;
        if (!paymentStatus && currentPath !== '/payment-failure') {
            navigate('/');
        }
    }, [navigate, location]);

    return children;
};

export default PaymentGuard;
