
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import AppLayout from './layouts/app-layout'
import Home from './pages/home'
import Category from './pages/category'
import Search from './pages/search'
import GifPage from './pages/single-gif'
import Favourites from './pages/favourites'
import GifProvider from './context/gif-context'

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <div>404 Not Found</div>,
    children:[
      {
        path: '/',
        element:<Home/>
      },
      {
        path: '/:category',
        element:<Category/>
      },
      {
        path: '/search/:query',
        element:<Search/>
      },
      {
        path: '/:type/:slug',
        element:<GifPage/>
      },
      {
        path: '/favourites',
        element:<Favourites/>
      },
    ]
  }

])

function App() {
  return (
    <GifProvider>
    <RouterProvider router={router}/>

    
    </GifProvider>
  )
}

export default App
