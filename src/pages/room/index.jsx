import { useState, Fragment, useCallback, useEffect } from "react";
import { AxiosError, isAxiosError } from "axios";
import { Card } from "src/components/card";
import { HttpServices } from "src/services";
import { Images } from "src/utility/images";
import { toaster } from "src/utility/toaster";
import { NoContent } from "src/components/404";
import { useNavigate } from "react-router-dom";
import { HiOutlinePlusSmall } from "react-icons/hi2";
import { PrimaryModal } from "src/components/modals";
import { PrimaryButton } from "src/components/button";
import { SomethingGoingWrong } from "src/components/501";
import { networkErrorHandler } from "src/utility/helper";
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
      <div className="container">
        <div className="w-full md:max-w-2xl mx-auto pt-10 lg:pt-20">
          <Card>
            <Card.Header className="!p-5">
              <div className="flex justify-between items-center">
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
            </Card.Header>
            <Card.Body className="!p-0">
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
            </Card.Body>
          </Card>
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
