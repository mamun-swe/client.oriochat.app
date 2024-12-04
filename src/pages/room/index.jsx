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
import { PreviewPreloader } from "src/components/preloader/preview.preloader";
import { ProfilePreloader } from "src/components/preloader/profile.preloader";

export const Room = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isCreateLoading, setCreateLoading] = useState(false);
  const [proifleData, setProfileData] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [serverError, setServerError] = useState(false);

  // Get profile information
  const fetchProfile = useCallback(async () => {
    try {
      const response = await HttpServices.profileService.getProfile();
      if (response && response.status === 200) {
        setProfileData(response.data);
      }

      setProfileLoading(false);
    } catch (error) {
      setProfileLoading(false);
      setServerError(true);
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

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

  // handle join to room
  const joinToRoom = (room) => {
    navigate(`/chat/room/${room.roomId}`);
  };

  return (
    <Fragment>
      <div className="container min-h-screen border-x py-5 lg:py-10">
        {/* Profile preloader preview */}
        {profileLoading && !proifleData && !serverError && <ProfilePreloader />}

        {/* Server error preview */}
        {!profileLoading && !proifleData && serverError && (
          <div className="flex justify-center items-center h-[80vh]">
            <SomethingGoingWrong />
          </div>
        )}

        {/* Profile information container */}
        {!profileLoading && !serverError && proifleData && (
          <Fragment>
            {/* Profile information container */}
            <div className="flex justify-between items-center lg:pl-5 pb-5 lg:pb-10 border-b">
              <div className="w-full lg:flex gap-4 items-center space-y-3 lg:space-y-0">
                <div className="flex justify-between items-center">
                  <div className="w-20 h-20 lg:w-24 lg:h-24 flex justify-center items-center rounded-full bg-primary/40">
                    <p className="uppercase font-bold text-3xl lg:text-4xl">
                      {getIconName(proifleData?.name)}
                    </p>
                  </div>
                  <LogoutButton className="block lg:hidden" />
                </div>
                <div className="flex-grow">
                  <p className="text-xl lg:text-2xl font-semibold capitalize">
                    {proifleData?.name}
                  </p>
                  <p className="lowercase text-sm">{proifleData?.username}</p>
                  <p className="lowercase text-sm">{proifleData?.email}</p>
                </div>
              </div>

              <LogoutButton className="hidden lg:block" />
            </div>

            {/* Room creation header */}
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

              {/* List of rooms preview */}
              {data.length > 0 &&
                !isLoading &&
                !serverError &&
                data.map((room, i) => (
                  <ListItem
                    key={room.roomId}
                    title={room.name}
                    border_bottom={i + 1 < data.length}
                    onClick={() => joinToRoom(room)}
                  />
                ))}
            </div>
          </Fragment>
        )}
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
