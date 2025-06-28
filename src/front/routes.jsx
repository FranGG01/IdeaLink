import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import Landing from "./pages/Landing"; // nuevo
import Register from "./components/Register";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>}>
      <Route index element={<Landing />} />  
      <Route path="register" element={<Register />} />
    </Route>
  )
);
