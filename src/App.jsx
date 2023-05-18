

import './App.css'
import Home from './pages/Home';
import Details from './pages/Details';
import { createBrowserRouter } from 'react-router-dom';



export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/details/:id",
    element: <Details />
  }
]);
