import Home from '~/pages/Home';
import Lesson from '~/pages/Lesson';
import Source from '~/pages/Source';

//public routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/source', component: Source },
    { path: '/lesson', component: Lesson},
];

//private routes
const privateRoutes = [];

export { publicRoutes, privateRoutes };
