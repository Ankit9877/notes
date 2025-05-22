import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Note from './components/Note';
// import Viewnote from './components/Viewnotes';
import Viewnotes from './components/Viewnotes';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Navbar />
        <Home />
      </div>
    ),
  },
  {
    path: "/notes",
    element: (
      <div>
        <Navbar />
        <Note />
      </div>
    ),
  },
  {
    path: "/notes/:id",
    element: (
      <div>
        <Navbar />
        <Viewnotes />
      </div>
    ),
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
