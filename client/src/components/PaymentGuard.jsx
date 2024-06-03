import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentGuard = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const paymentStatus = sessionStorage.getItem('paymentStatus');
        if (!paymentStatus) {
            navigate('/'); // Redirect to home if payment status is not in session storage
        }
    }, [navigate]);

    return children;
};

export default PaymentGuard;
