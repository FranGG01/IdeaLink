import Login from "../components/Login";
import Carousel from "../components/carrusel";
import './Landing.css'
const Landing = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-[#f2f2f2] px-4">
      <div className="flex flex-col md:flex-row items-center justify-center max-w-6xl w-full m-6">
        <div className="flex-1 flex justify-center">
          <Login />
        </div>
        <div className="flex-1 flex justify-center">
          <Carousel />
        </div>
      </div>
    </div>
  );
};

export default Landing;
