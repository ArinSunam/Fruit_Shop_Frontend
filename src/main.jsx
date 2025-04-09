import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootLayout from './Layout/RootLayout.jsx'
import Home from './Pages/Home.jsx'
import About from './Pages/About.jsx'
import Contact from './Pages/Contact.jsx'
import Shop from './Pages/Shop.jsx'
import { Provider } from 'react-redux'
import { store } from './features/store.js'
import Login from './Pages/auth/Login.jsx'
import ShopDetail from './Pages/ShopDetail.jsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import UserRoutes from './auth/UserRoutes.jsx'

import CartPage from './Pages/UserPages/CartPage.jsx'
import AdminRoutes from './auth/AdminRoutes.jsx'
import ProductList from './Pages/AdminPages/ProductList.jsx'
import AddProduct from './Pages/AdminPages/AddProduct.jsx'
import UpdateProduct from './Pages/AdminPages/UpdateProduct.jsx'


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
        element: <UserRoutes />,
        children: [
          {
            path: "login",
            element: <Login />
          }
        ]
      },
      {
        // element: <AdminRoutes />,
        // path: "admin",
        // children: [
        //   {
        path: "product-list",
        element: <ProductList />
        //   }
        // ]
      },
      {
        path: "add-product",
        element: <AddProduct />
      },
      {
        path: "update-product/:id",
        element: <UpdateProduct />
      },
      {
        element: <CartPage />,
        path: '/cart'
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ToastContainer autoClose={1000} />
    <RouterProvider router={router} />
  </Provider>
)
