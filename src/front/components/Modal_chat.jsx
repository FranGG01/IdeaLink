import {
    Dialog,
    DialogBody,
    DialogFooter,
    Button,
} from "@material-tailwind/react";
import { useState } from "react";
import ChatApp from "../components/ChatApp";

const ModalChat = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* Botón que abre el modal */}
            <Button
                onClick={() => setOpen(true)}
                variant="filled"
                className="rounded-md bg-purple-700 mb-1 py-2 px-4 text-white text-sm
                     shadow-sm hover:bg-purple-500 hover:shadow-lg"
            >
                CHAT
            </Button>

            {/* Modal sin límites de altura */}
            <Dialog
                open={open}
                handler={setOpen}
                size="xl"
                className=" fixed bottom-6 right-4 -
             flex flex-col items-center justify-center
             w-full max-w-[450px] h-[]
             p-4 bg-white dark:bg-[#1e293b]
             text-gray-900 dark:text-white
             rounded-[1vw]  overflow-visible shadow-none"
            >
                <DialogBody className="flex flex-col items-center justify-center w-full p-2">
                    <div className="w-full">
                        <ChatApp />
                    </div>
                </DialogBody>


            </Dialog>

        </>
    );
};

export default ModalChat;