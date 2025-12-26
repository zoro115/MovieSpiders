import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './index.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from './components/Home/Home';
import App from './App';
import { Login } from './components/Login/Login';
import { Register } from './components/Register/Register';
import { Details } from './components/TvDetails/Details';
import { Tv } from './components/TV/Tv';
import { Upcoming } from './components/UpcomingMovies/Upcoming';
import { MoviesDetails } from './components/MoviesDetails/MoviesDetails';


// routes and nasted routes
// const router = createBrowserRouter([
//   {
//     path: '',
//     element: <App />,
//     children: [
//       { path: '/home', element: <Home /> },
//       {
//         path: '/project',
//         element: <Project />,
//         children: [
//           {
//             path: 'web',
//             element: (
//               <>
//                 <h1>Web Projects</h1>
//               </>
//             ),
//           },
//           {
//             path: 'mobile',
//             element: (
//               <>
//                 <h1>Mobile Projects</h1>
//               </>
//             ),
//           },
//           {
//             path: 'desktop',
//             element: (
//               <>
//                 <h1>Desktop Projects</h1>
//               </>
//             ),
//           },
//         ],
//       },
//       { path: '/about', element: <About /> },
//       { path: '/gallary', element: <Gallary /> },
//       // sending props in functional component is here 
//       { path: '/Test', element: <Test ibrahim="himida" /> },
//       { path: '/main', element: <Main /> },
//       {
//         path: '/*',
//         element: (
//           <>
//             <h1>404 Not Found</h1>
//           </>
//         ),
//       },
//     ],
//   },
// ]);

const router = createBrowserRouter([
  {path:'',element:<App />,children:[
    {path:'home',element:<Home />},
    {path:'login',element:<Login />},
    {path:'register',element:<Register />},
    {path:'tv',element:<Tv />},
    {path:'tv/:id', element:<Details />},
    {path:'upcoming/:id', element:<MoviesDetails />},
    {path:'upcoming',element:<Upcoming />},
    {path:'home/:id', element:<MoviesDetails />}
  ]},
  {path:'*',element:<App />}



]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // in devolpment mode to detecet problems
  // <React.StrictMode>
  //   <RouterProvider router={router} />
  // </React.StrictMode>
  <RouterProvider router={router} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
