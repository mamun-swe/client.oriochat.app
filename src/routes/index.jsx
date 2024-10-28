import { Home } from "src/pages/home";
import { Room } from "src/pages/room";
import { RoomShow } from "src/pages/room/show";
import { NotFound } from "src/pages/404";

export const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/room",
    element: <Room />,
  },
  {
    path: "/room/:id",
    element: <RoomShow />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];
