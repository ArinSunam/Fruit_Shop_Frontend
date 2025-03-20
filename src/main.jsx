import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootLayout from './Layout/RootLayout.jsx'
import Home from './Pages/Home.jsx'
import About from './Pages/About.jsx'
import Header from './components/Header.jsx'
import Contact from './Pages/Contact.jsx'
import Shop from './Pages/Shop.jsx'
import { Provider } from 'react-redux'
import { store } from './features/store.js'
import Login from './Pages/auth/Login.jsx'
import ShopDetail from './Pages/ShopDetail.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: "about",
        element: <About />
      },
      {
        path: "contact",
        element: <Contact />
      },
      {
        path: "shop",
        element: <Shop />
      },
      {
        path: "shop/:id",
        element: <ShopDetail />
      },
      {
        path: "login",
        element: <Login />
      },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
