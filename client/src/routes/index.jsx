import Course from '~/pages/Course';
import Home from '~/pages/Home';
import Lesson from '~/pages/Lesson';
import Subject from '~/pages/Subject';

//public routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/subject', component: Subject },
    { path: '/lesson', component: Lesson},
    { path: '/course', component: Course},
];

//private routes
const privateRoutes = [];

export { publicRoutes, privateRoutes };
