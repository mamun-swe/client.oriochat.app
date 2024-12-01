import { Fragment } from "react";
import { Toaster } from "react-hot-toast";
import { useRoutes } from "react-router-dom";
import { publicRoutes } from "src/routes/public.routes";
import { privateRoutes } from "src/routes/private.routes";

export const App = () => {
  const routing = useRoutes([...publicRoutes, ...privateRoutes()]);

  return (
    <Fragment>
      <Toaster />
      {routing}
    </Fragment>
  );
};
