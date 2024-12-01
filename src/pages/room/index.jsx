import { useState, Fragment, useCallback, useEffect } from "react";
import { AxiosError, isAxiosError } from "axios";
import { CiLogout } from "react-icons/ci";
import { HttpServices } from "src/services";
import { Images } from "src/utility/images";
import { toaster } from "src/utility/toaster";
import { NoContent } from "src/components/404";
import { useNavigate } from "react-router-dom";
import { HiOutlinePlusSmall } from "react-icons/hi2";
import { PrimaryModal } from "src/components/modals";
import { PrimaryButton } from "src/components/button";
import { SomethingGoingWrong } from "src/components/501";
import { getIconName, networkErrorHandler } from "src/utility/helper";
import { RoomForm } from "src/components/forms/room.form";
import { JoinRoomForm } from "src/components/forms/join-room.form";
import { PreviewPreloader } from "src/components/preloader/preview.preloader";

export const Room = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [serverError, setServerError] = useState(false);
  const [isCreateLoading, setCreateLoading] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [roomJoinModal, setRoomJoinModal] = useState(false);
  const [isRoomJoinLoading, setRoomJoinLoading] = useState(false);

  // Get list of rooms
  const fetchRooms = useCallback(async () => {
    try {
      const response = await HttpServices.roomService.getRooms();
      if (response && response.status === 200) {
        setData(response.data?.data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setServerError(true);
      if (error instanceof AxiosError) {
        console.log(error.response?.data);
      }
    }
  }, []);

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  // handle open & close modal
  const handleOpen = () => setOpen(!open);

  // handle form submission
  const handleFormSubmit = async (formData) => {
    try {
      setCreateLoading(true);
      const response = await HttpServices.roomService.createRoom(formData);
      if (response && response.status === 200) {
        toaster.success(response.data?.message);
        setCreateLoading(false);
        setOpen(false);
        fetchRooms();
      }
    } catch (error) {
      setCreateLoading(false);
      if (isAxiosError(error)) {
        networkErrorHandler(error);
      } else {
        toaster.error("An unexpected error occurred.");
      }
    }
  };

  // handle room selection
  const handleRoomSelection = (room) => {
    setSelectedRoom(room);
    setRoomJoinModal(true);
  };

  // handle join room
  const handleJoinRoom = async (data) => {
    setRoomJoinLoading(true);
    const formData = {
      sender: data.userid,
      name: data.username,
      room: selectedRoom.roomId,
      room_name: selectedRoom.name,
    };

    setTimeout(() => {
      setRoomJoinLoading(false);
      const searchParams = new URLSearchParams(formData).toString();
      navigate(`/room/${selectedRoom.id}?${searchParams}`);
    }, 1000);
  };

  return (
    <Fragment>
      <div className="container min-h-screen border-x py-5 lg:py-10">
        {/* Profile information container */}
        <div className="flex justify-between items-center lg:pl-5 pb-5 lg:pb-10 border-b">
          <div className="w-full lg:flex gap-4 items-center space-y-3 lg:space-y-0">
            <div className="flex justify-between items-center">
              <div className="w-20 h-20 lg:w-24 lg:h-24 flex justify-center items-center rounded-full bg-primary/40">
                <p className="uppercase font-bold text-3xl lg:text-4xl">
                  {getIconName("Abdullah al Mamun")}
                </p>
              </div>
              <LogoutButton className="block lg:hidden" />
            </div>
            <div className="flex-grow">
              <p className="text-xl lg:text-2xl font-semibold capitalize">
                Abdullah Al Mamun
              </p>
              <p className="lowercase text-sm">
                abdullah-al-mamun-1733048867143
              </p>
              <p className="lowercase text-sm">mamun.swe.277@gmail.com</p>
            </div>
          </div>

          <LogoutButton className="hidden lg:block" />
        </div>

        {/* Room header */}
        <div className="flex justify-between items-center py-5 border-b">
          <p className="text-xl font-semibold">Available Rooms</p>
          <PrimaryButton
            type="button"
            buttonType="circle"
            className="!p-2"
            onClick={handleOpen}
          >
            <HiOutlinePlusSmall size={17} />
          </PrimaryButton>
        </div>

        {/* Room list body container */}
        <div className="py-5">
          {/* Preview data loading */}
          {isLoading && !serverError && !data.length && (
            <div className="p-4 lg:p-6">
              <PreviewPreloader />
            </div>
          )}

          {/* Data not available preview */}
          {!isLoading && !serverError && !data.length && (
            <div className="p-4 lg:p-6">
              <NoContent message="No rooms available!" />
            </div>
          )}

          {/* Server error preview */}
          {!isLoading && !data.length && serverError && (
            <div className="p-4 lg:p-6">
              <SomethingGoingWrong />
            </div>
          )}

          {/* List of rooms preview */}
          {data.length > 0 &&
            !isLoading &&
            !serverError &&
            data.map((room, i) => (
              <ListItem
                key={room.id}
                title={room.name}
                border_bottom={i + 1 < data.length}
                onClick={() => handleRoomSelection(room)}
              />
            ))}
        </div>
      </div>

      {/* Create room modal */}
      <PrimaryModal show={open} title="Create Room" onHide={handleOpen}>
        <RoomForm
          data={null}
          formType="create"
          loading={isCreateLoading}
          onSubmit={handleFormSubmit}
        />
      </PrimaryModal>

      {/* Join room modal */}
      <PrimaryModal
        show={roomJoinModal}
        title={`Join to ${selectedRoom?.name}`}
        onHide={() => setRoomJoinModal(false)}
      >
        <JoinRoomForm loading={isRoomJoinLoading} onSubmit={handleJoinRoom} />
      </PrimaryModal>
    </Fragment>
  );
};

// List component for room
const ListItem = (props) => {
  return (
    <div
      className={`flex justify-between items-center p-4 group cursor-pointer ${
        props.border_bottom && "border-b border-neutral-200"
      }`}
      onClick={props.onClick}
    >
      <div>
        <p className="text-sm font-medium text-primary">{props.title}</p>
      </div>
      <img
        src={Images.Plus}
        alt="Go right"
        className="w-8 h-8 opacity-0 group-hover:opacity-100"
      />
    </div>
  );
};

// Logout button
const LogoutButton = ({ className = "" }) => {
  const navigate = useNavigate();

  // Logout handler
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <button
      type="button"
      className={`p-2 transition-all rounded-full bg-primary/5 hover:bg-primary/20 ${className}`}
      onClick={handleLogout}
    >
      <CiLogout size={23} />
    </button>
  );
};
