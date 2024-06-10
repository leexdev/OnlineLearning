import Course from '~/pages/Public/Course';
import Home from '~/pages/Public/Home';
import Lesson from '~/pages/Public/Lesson';
import Subject from '~/pages/Public/Subject';
import CustomLayout from '~/components/Common/Layouts/CustomLayout';
import Profile from '~/pages/Public/Profile';
import MyCourse from '~/pages/Public/MyCourse';
import Payment from '~/pages/Public/Payment';
import PaymentSuccess from '~/pages/Public/PaymentSuccess';
import PaymentFailure from '~/pages/Public/PaymentFailure';
import Question from '~/pages/Public/Question';
import MyProcess from '~/pages/Public/MyProcess';
import AdviseFrom from '~/pages/Public/Course/components/AdviseFrom';
import Chat from '~/pages/Public/Chat';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/subject/:id', component: Subject },
    { path: '/lesson/:id', component: Lesson, layout: CustomLayout },
    { path: '/course/:id', component: Course },
    { path: '/profile', component: Profile },
    { path: '/AdviseFrom', component: AdviseFrom },
    { path: '/my-course', component: MyCourse },
    { path: '/my-course/my-process', component: MyProcess },
    { path: '/payment/:id', component: Payment },
    { path: '/lesson/:id/questions', component: Question },
    { path: '/payment-success', component: PaymentSuccess },
    { path: '/payment-failure', component: PaymentFailure },
    { path: '/chat', component: Chat, layout: CustomLayout },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
