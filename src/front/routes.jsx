// Import necessary components and functions from react-router-dom.

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import Login from "./components/Login";
import Register from "./components/Register";

export const router = createBrowserRouter(
  createRoutesFromElements(

    // Root Route: All navigation will start from here.
    <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >
      <Route index element={<Login />} /> 
      <Route path="register" element={<Register />} /> 
    </Route>
  )
);