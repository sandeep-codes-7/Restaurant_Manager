import { createBrowserRouter } from "react-router-dom"
import App from "../App"
import Home from "../pages/Home"
import Admin from "../pages/Admin"
import OrderPage from "../pages/OrderPage"
import Orders from "../pages/Orders"
// import Card from "../components/Card"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,   // ← THIS IS CRITICAL
        element: <Home />,
        
      },
    ],
  },
  {
    path: "/admin",
    element: <App />,
    children: [
      {
        index: true,   // ← THIS IS CRITICAL
        element: <Admin />,
        
      },
    ],
  },
  {
    path: "/OrderPage",
    element: <App />,
    children: [
      {
        index: true,   // ← THIS IS CRITICAL
        element: <OrderPage />,
        
      },
    ],
  },
  {
    path: "/Orders",
    element: <App />,
    children: [
      {
        index: true,   // ← THIS IS CRITICAL
        element: <Orders />,
        
      },
    ],
  },
])

export default router
