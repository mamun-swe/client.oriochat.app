import { Fragment } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Dialog, Transition, DialogBackdrop } from "@headlessui/react";

export const PrimaryModal = ({ show, children, title = "", onHide }) => {
  return (
    <Transition.Root show={show} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-50 inset-0 overflow-y-auto"
        onClose={onHide}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          {/* The backdrop, rendered as a fixed sibling to the panel container */}
          <DialogBackdrop className="fixed inset-0 bg-black/30" />

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-screen sm:max-w-xl sm:w-full">
              <div className="px-4 lg:px-6 pt-4 lg:pt-6 flex justify-between items-center">
                <div />
                <div>
                  <p className="text-lg text-center font-semibold text-black">
                    {title}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onHide}
                  className="text-primary bg-none p-2.5 rounded-full transition-all hover:bg-primary/5 hover:text-primary"
                >
                  <AiOutlineClose size={20} />
                </button>
              </div>
              <div className="p-4 lg:p-6">{children}</div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
