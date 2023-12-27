import { lazy } from "react";
import { Navigate } from "react-router-dom";
import { RouteObject } from "react-router";
import SidebarLayout from "src/layouts/SidebarLayout";
import PrivateProvider from "./providers/PrivateProvider";
import PublicProvider from "./providers/PublicProvider";
import Loader from "./Loader";

const Products = Loader(lazy(() => import("src/content/applications/Products")));
const Cards = Loader(lazy(() => import("src/content/pages/Details")));
const CreateForms = Loader(lazy(() => import("src/content/pages/Forms/CreateForm")));
const UpdateForms = Loader(lazy(() => import("src/content/pages/Forms/UpdateForm")));
const Login = Loader(lazy(() => import("src/content/pages/Login")));
const Register = Loader(lazy(() => import("src/content/pages/Register")));

const routes: RouteObject[] = [
  {
    path: "",
    element: <Navigate to="login" replace />,
  },
  {
    path: "management",
    element: (
      <PrivateProvider>
        <SidebarLayout />
      </PrivateProvider>
    ),
    children: [
      {
        path: "",
        element: <Navigate to="products" replace />,
      },
      {
        path: "products",
        element: <Products />,
      }
    ],
  },
  {
    path: "/form",
    element: (
      <PrivateProvider>
        <SidebarLayout />
      </PrivateProvider>
    ),
    children: [
      {
        path: "create-form",
        element: <CreateForms />,
      },
      {
        path: "update-form/:car_id",
        element: <UpdateForms />,
      },
    ],
  },
  {
    path: "detail",
    element: (
      <PrivateProvider>
        <SidebarLayout />
      </PrivateProvider>
    ),
    children: [
      {
        path: ":car_id",
        element: (
          <PrivateProvider>
            <Cards />
          </PrivateProvider>
        ),
      }
    ],
  },
  {
    path: "login",
    element: (
      <PublicProvider>
        <Login />
      </PublicProvider>
    ),
  },
  {
    path: "register",
    element: (
      <PublicProvider>
        <Register />
      </PublicProvider>
    ),
  },
];

export default routes;
