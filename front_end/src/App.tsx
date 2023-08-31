import Header from "./Components/Pages/Header";

import { RouterProvider } from "react-router-dom";
import router from "./router/router";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

export default function App() {
  return (
    <div>
      <Header />
      <ToastContainer />
      <RouterProvider router={router} />
    
    </div>
  );
}
 