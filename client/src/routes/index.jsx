import Course from '~/pages/Course';
import Home from '~/pages/Home';
import Lesson from '~/pages/Lesson';
import Subject from '~/pages/Subject';
import CustomLayout from '~/components/Layouts/CustomLayout'; // Giả sử bạn có một layout khác
import Profile from '~/pages/Profile';

//public routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/subject/:subjectId', component: Subject},
    { path: '/subject', component: Subject },
    { path: '/lesson/:id', component: Lesson, layout: CustomLayout },
    { path: '/course/:id', component: Course},
    { path: '/my-profile', component: Profile},
];

//private routes
const privateRoutes = [];

export { publicRoutes, privateRoutes };
