import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Games from '../pages/Games';
import Search from '../pages/Search';

const routes = [
    {  
        component: Home,
        exact: true,
        path: '/',

    },
    {
        component: Login,
        exact: true,
        path: '/login',
    },
    {
        component: Register,
        exact: true,
        path: '/register',
    },
    {
        component: Games,
        exact: false,
        path: '/games/:id',
    },
    {
        component: Search,
        exact: false,
        path: '/search/:search',
    },
];

export default routes;