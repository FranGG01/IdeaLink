import { Dialog, DialogBody, IconButton } from "@material-tailwind/react";
import ChatApp from "./ChatApp";

export default function ModalChat({ open, onClose, friend }) {
    return (
        <Dialog
            open={open}
            handler={onClose}
            className={`
                fixed 
                sm:bottom-0 sm:right-4 sm:left-auto sm:top-auto
                w-full sm:w-auto
                max-w-full sm:max-w-[450px]
                h-full sm:h-[500px] sm:max-h-[90vh]
                bg-[#1e293b]
                rounded-none sm:rounded-2xl
                p-2 sm:py-5 m-0
                shadow-none 
                bg-tranparent
                me-11
            `}
        >
            <IconButton
                size="sm"
                color="blue-gray"
                onClick={onClose}
                className="!absolute top-2 right-2 mt-5 me-3 bg-gray-700 text-white z-50 cursor-pointer border-none"
            >
                ✕
            </IconButton>

            <DialogBody className="p-0 h-full overflow-hidden">
                {friend ? (
                    <ChatApp friend={friend} />
                ) : (
                    <div className="text-white text-center py-10">
                        Selecciona un amigo para chatear
                    </div>
                )}
            </DialogBody>
        </Dialog>
    );
}
