import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import "./App.css";
import Navbar from "./page/Navbar.jsx";
import Home from "./page/Home.jsx";
import Product from "./page/Product.jsx";
import ProductDetail from "./page/ProductDetail.jsx";
import CheckOut from "./page/CheckOut.jsx";
import Login from "./page/Login.jsx";
import Cart from "./page/Cart.jsx";
import { Outlet } from "react-router-dom"; // Import Outlet for nested routing

import { Provider } from "react-redux";
import store from "./rdx/store/store.js";

const Layout = () => (
  <div>
    <Navbar />
    <Outlet />
  </div>
);

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="category/:slug" element={<Product />} />
        <Route path="P/:slug" element={<ProductDetail />} />
        <Route path="cart" element={<Cart />} />
        <Route path="login" element={<Login />} />
        <Route path="checkout" element={<CheckOut />} />
      </Route>,
    ),
  );
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};
// const App = () => {
//   const router = createBrowserRouter([
//     {
//       element: <Layout />,
//       children: [
//         {
//           path: "/",
//           element: <Home />,
//         },
//         {
//           path: "/product/:slug",
//           element: <Product />,
//         },
//         {
//           path: "/cart",
//           element: <Cart />,
//         },
//         {
//           path: "/login",
//           element: <Login />,
//         },
//       ],
//     },
//   ]);
//
// return <RouterProvider router={router} />;
// };
//
export default App; // Ensure this line is present for default export
