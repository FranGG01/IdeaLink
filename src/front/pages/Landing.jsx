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
      <div className='fixed inset-0 flex flex-col items-center justify-center bg-black z-50 text-center p-4'>
        <h1 className='text-3xl sm:text-4xl md:text-5xl font-black text-gray-200 mb-2'>
          CREATIVE
        </h1>
        <span className='text-xl sm:text-2xl md:text-3xl bg-cyan-600 text-white px-3 py-1 sm:py-2 rounded-lg'>
          <RotatingText
            texts={['Components!', 'Thinking!', 'Coding!', 'Desings!', 'Webs!', 'Applications!']}
            mainClassName="overflow-hidden justify-center"
            staggerFrom="last"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-120%" }}
            staggerDuration={0.025}
            splitLevelClassName="overflow-hidden"
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            rotationInterval={2000}
          />
        </span>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#f2f2f2] px-4 py-6 overflow-y-auto md:overflow-y-hidden lg:overflow-y-hidden">
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 max-w-6xl w-full">
        <div className="w-full md:w-1/2 flex justify-center">
          <Login />
        </div>
        <div className="w-full md:w-1/2 flex justify-center">
          <Carousel />
        </div>
      </div>
    </div>

  );
};

export default Landing;
