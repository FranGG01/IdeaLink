import Tarjeta from "./feed_central/Tarjeta_feed";
const User_perfil = () => {

    return (

        <>
            <div className="flex flex-col items-center bg-[#1e293b] text-white p-6 rounded-2xl w-full max-w-4xl mx-auto h-[50vh]
">
                <div className="w-full bg-gradient-to-r from-pink-500 to-purple-500 h-39 rounded-t-2xl relative">
                    <img
                        src="https://ui-avatars.com/api/?name=Emma+D.&background=0D8ABC&color=fff&size=128"
                        alt="Fran G."
                        className="w-35 h-35 rounded-full border-4 border-white absolute -bottom-12 left-1/2 transform -translate-x-1/2"
                    />
                </div>
                <div className="grid justify-center mt-16 px-6 w-full">
                    <h2 className=" flex justify-center text-3xl font-bold">Francisco Garcia</h2>
                    <p className="flex justify-center text-sm text-gray-400">Web Developer</p>
                    <p className="flex justify-center mt-2 text-sm">
                        Passionate about clean, minimalist design and creating impactful
                        visual experiences.
                    </p>


                    <div className="flex justify-center  gap-6 mt-4 text-sm text-gray-400">
                        <span>📧 g.garciafran201@gmail.com</span>
                        <span>📍 Madrid, España</span>
                    </div>
                </div>

            </div>
            <div className="flex gap-6 mt-6 border-b border-gray-700 w-full px-6">
                <button className="pb-2 border-b-2 border-white">Mis Ideas</button>
                <button className="pb-2 text-gray-400 hover:text-white">Favoritos</button>
            </div>
            <div className="mt-8 space-y-4 px-4 flex flex-col items-center">
                <Tarjeta />
                <Tarjeta />
            </div>
        </>
    );

}

export default User_perfil