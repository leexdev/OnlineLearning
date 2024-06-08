import Course from '~/pages/Course';
import Home from '~/pages/Home';
import Lesson from '~/pages/Lesson';
import Subject from '~/pages/Subject';
import CustomLayout from '~/components/Layouts/CustomLayout';
import Profile from '~/pages/Profile';
import MyCourse from '~/pages/MyCourse';
import Payment from '~/pages/Payment';
import PaymentSuccess from '~/pages/PaymentSuccess';
import PaymentFailure from '~/pages/PaymentFailure';
import Question from '~/pages/Question';
import MyProcess from '~/pages/MyProcess';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/subject/:id', component: Subject },
    { path: '/lesson/:id', component: Lesson, layout: CustomLayout },
    { path: '/course/:id', component: Course },
    { path: '/profile', component: Profile },
    { path: '/my-course', component: MyCourse },
    { path: '/my-course/my-process', component: MyProcess },
    { path: '/payment/:id', component: Payment },
    { path: '/lesson/:id/questions', component: Question },
    { path: '/payment-success', component: PaymentSuccess },
    { path: '/payment-failure', component: PaymentFailure },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
