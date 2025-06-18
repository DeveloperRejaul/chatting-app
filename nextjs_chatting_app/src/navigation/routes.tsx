
import Protector from "../components/protector";
import App from "../page/app";
import Login from "../page/login";
import {
    createBrowserRouter,
  } from "react-router";


export  const router = createBrowserRouter([
    {
      path: "/",
      element: <Protector> <App/> </Protector>,
    },
    {
      path: "/login",
      element: <Login/>
    },
  ]);
