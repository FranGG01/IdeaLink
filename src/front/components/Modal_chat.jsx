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

            <Button
                onClick={() => setOpen(true)}
                variant="filled"
                className="rounded-md bg-gray-600 mx-2 py-2 px-4 text-white text-sm
                     shadow-sm hover:bg-blue-600 hover:shadow-lg"
            >
                CHAT
            </Button>


            <Dialog
                open={open}
                handler={setOpen}
                size="xl"
                className=" fixed bottom-2 right-6 -
             flex flex-col items-center justify-center
             w-full max-w-[450px] h-[]
             p-4 bg-white dark:bg-[#1e293b]
             text-gray-900 dark:text-white
             rounded-[1vw]  overflow-visible shadow-none bg-[#1e293b]"
            >
                <DialogBody className="flex flex-col items-center justify-center w-full p-2">
                    <div className="w-full">
                        <ChatApp />
                    </div>
                </DialogBody>

                <DialogFooter className="w-full flex justify-center mt-2 ">

                </DialogFooter>
            </Dialog>

        </>
    );
};

export default ModalChat;