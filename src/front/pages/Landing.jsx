import { useState, useEffect } from 'react';
import { useLoading } from '../../context/LoadingContext';
import RotatingText from '../components/Loader/RotatingText';
import Login from "../components/Login";
import Carousel from "../components/carrusel";
const Landing = () => {
  const [initialLoading, setInitialLoading] = useState(true);
  const { isLoading } = useLoading();


  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 5500);

    return () => clearTimeout(timer);
  }, []);

  if (initialLoading || isLoading) {
    return (
      <div className='fixed inset-0 flex items-center justify-center bg-black z-50'>
        <h1 className='text-5xl font-black text-gray-200'>CREATIVE </h1>
        <span className='ml-4 text-white text-4xl py-1 rounded-lg'>
          <RotatingText
            texts={['Components!', 'Thinking!', 'Coding!', 'Desings!', 'Webs!', 'Applications!']}
            mainClassName="px-2 sm:px-2 md:px-3 bg-cyan-600 text-white overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
            staggerFrom={"last"}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-120%" }}
            staggerDuration={0.025}
            splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            rotationInterval={2000} />
        </span>
      </div>
    )
  }
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
