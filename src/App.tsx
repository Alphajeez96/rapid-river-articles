import { RouterProvider } from 'react-router-dom';
import router from './routes';
import './assets/styles/app.scss';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return <RouterProvider router={router} />;
}

export default App;
