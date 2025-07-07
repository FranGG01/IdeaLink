import { Dialog, DialogBody } from "@material-tailwind/react";
import ChatApp from "../components/ChatApp";

export default function ModalChat({ open, onClose, currentUser, friend }) {
    return (
        <Dialog
            open={open}
            handler={onClose}
            size="xl"
            className="fixed bottom-6 right-4 flex flex-col items-center justify-center
                 w-full max-w-[450px] bg-[#1e293b] rounded-2xl p-4"
        >
            <DialogBody className="w-full p-0">
                {friend ? (
                    <ChatApp currentUser={currentUser} friend={friend} />
                ) : (
                    <p className="text-white text-center py-8">Selecciona un amigo</p>
                )}
            </DialogBody>
        </Dialog>
    );
}
