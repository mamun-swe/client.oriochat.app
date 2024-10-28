import { Fragment } from "react";
import { routes } from "src/routes";
import { Toaster } from "react-hot-toast";
import { useRoutes } from "react-router-dom";

export const App = () => {
  const routing = useRoutes([...routes]);

  return (
    <Fragment>
      <Toaster />
      {routing}
    </Fragment>
  );
};
