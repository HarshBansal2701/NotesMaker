import logo from './logo.svg';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Pastes from './components/Pastes';
import ViewPaste from './components/ViewPaste';
import { ToastContainer } from 'react-toastify';

const router = createBrowserRouter([
  {
    path: '/',
    element: 
    <div className="">
      <NavBar/>
      <Home/>
    </div>
  },
  {
    path: '/pastes',
    element:
    <div className="">
      <NavBar/>
      <Pastes/>
    </div>
  },
  {
    path: '/pastes/:id',
    element:
    <div className="">
        <NavBar/>
        <ViewPaste/>
    </div>
  },
  {
    path:'*',
    element:
    <div className="">
      Not Found
    </div>
  }
  
]);

function App() {
  
  return (
    <div className="App">
      <RouterProvider router={router}/>
      <ToastContainer />
    </div>
  );
}

export default App;
