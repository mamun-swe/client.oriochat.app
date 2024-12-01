import { ChatLayout } from "src/layouts/chat.layout";
import { Room } from "src/pages/room";
import { RoomShow } from "src/pages/room/show";
import { getToken } from "src/utility/helper";

const routes = [
  {
    path: "chat",
    element: <ChatLayout />,
    children: [
      {
        index: true,
        element: <Room />,
      },
      {
        path: "room/:id",
        element: <RoomShow />,
      },
    ],
  },
];

export const privateRoutes = () => {
  const token = getToken();
  if (token) {
    return routes;
  }

  return [];
};
