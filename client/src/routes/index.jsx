import Home from '~/pages/Home';
import Lesson from '~/pages/Lesson';
import Course from '~/pages/Course';

//public routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/course', component: Course },
    { path: '/lesson', component: Lesson},
];

//private routes
const privateRoutes = [];

export { publicRoutes, privateRoutes };
