import Course from '~/pages/Public/Course/Course';
import Home from '~/pages/Public/Home/Home';
import Lesson from '~/pages/Public/Lesson/Lesson';
import Profile from '~/pages/Public/Profile/Profile';
import MyCourse from '~/pages/Public/MyCourse/MyCourse';
import Payment from '~/pages/Public/Payment/Payment';
import MyProcess from '~/pages/Public/MyProcess/MyProcess';
import NotFound from '~/components/Common/NotFound';
import Subject from '~/pages/Public/Subject/Subject';
import CustomLayout from '~/components/Common/Layout/CustomLayout/CustomLayout';
import Question from '~/pages/Public/Question/Question';
import PaymentSuccess from '~/components/Common/PaymentSuccess';
import PaymentFailure from '~/components/Common/PaymentFailure';
import Chat from '~/pages/Public/Chat/Chat';
import AdminLayout from '~/components/Admin/Layout/AdminLayout';
import DashboardAdmin from '~/pages/Admin/Dashboard/Dashboard';
import BannerAdmin from '~/pages/Admin/Banner/Banner';
import GradeAdmin from '~/pages/Admin/Grade/Grade';
import SubjectAdmin from './../pages/Admin/Subject/Subject';
import CourseAdmin from './../pages/Admin/Course/Course';
import CreateCourseWizard from '~/pages/Admin/Course/components/CreateCourseWizard';
import EditCourseWizard from '~/pages/Admin/Course/components/EditCourseWizard';
import UserAdmin from '~/pages/Admin/User/User';
import PaymentAdmin from '~/pages/Admin/Payment/Payment';
import ListAdvise from '~/pages/Public/Advise/ListAdvise';
import News from '~/pages/Public/News/News';

const publicRoutes = [
    { path: '*', component: NotFound },
    { path: '/', component: Home },
    { path: '/subject/:id', component: Subject },
    { path: '/lesson/:id', component: Lesson, layout: CustomLayout },
    { path: '/course/:id', component: Course },
    { path: '/profile', component: Profile },
    { path: '/news', component: News },
    { path: '/my-course', component: MyCourse },
    { path: '/my-course/my-process', component: MyProcess },
    { path: '/payment/:id', component: Payment },
    { path: '/lesson/:id/questions', component: Question },
    { path: '/payment-success', component: PaymentSuccess },
    { path: '/payment-failure', component: PaymentFailure },
];

const privateRoutes = [
    { path: '/chat', component: Chat, layout: CustomLayout, roles: ['Teacher', 'User'] },
    { path: '/my-advise', component: ListAdvise, roles: ['Teacher'] },
    { path: '/admin/home', component: DashboardAdmin, layout: AdminLayout, roles: ['Admin'] },
    { path: '/admin/banner', component: BannerAdmin, layout: AdminLayout, roles: ['Admin'] },
    { path: '/admin/grade', component: GradeAdmin, layout: AdminLayout, roles: ['Admin'] },
    { path: '/admin/subject', component: SubjectAdmin, layout: AdminLayout, roles: ['Admin'] },
    { path: '/admin/course', component: CourseAdmin, layout: AdminLayout, roles: ['Admin'] },
    { path: '/admin/course/create', component: CreateCourseWizard, layout: AdminLayout, roles: ['Admin'] },
    { path: '/admin/course/edit/:courseId', component: EditCourseWizard, layout: AdminLayout, roles: ['Admin'] },
    { path: '/admin/user', component: UserAdmin, layout: AdminLayout, roles: ['Admin'] },
    { path: '/admin/payment', component: PaymentAdmin, layout: AdminLayout, roles: ['Admin'] },
];

export { publicRoutes, privateRoutes };
