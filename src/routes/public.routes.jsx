import { MainLayout } from "src/layouts/main.layout";
import { Home } from "src/pages/home";
import { SignIn } from "src/pages/auth/signin";
import { SignUp } from "src/pages/auth/signup";

export const publicRoutes = [
  {
    path: "",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/signin",
        element: <SignIn />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
    ],
  },
];
