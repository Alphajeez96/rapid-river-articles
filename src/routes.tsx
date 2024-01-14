import { createBrowserRouter, RouteObject } from 'react-router-dom';
import Home from './pages/Home';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
    errorElement: <div>Not Found</div>,
  },
];

const router = createBrowserRouter(routes);
export default router;
