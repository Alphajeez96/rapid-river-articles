import { createBrowserRouter, type RouteObject } from 'react-router-dom';
import Home from './pages/Home';
import NewArticle from './pages/NewArticle';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
    errorElement: <div>Not Found</div>,
  },

  {
    path: '/new',
    element: <NewArticle />,
  },
];

const router = createBrowserRouter(routes);
export default router;
