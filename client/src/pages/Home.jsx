import { useSelector } from "react-redux";
import Lottie from "lottie-react";
import animationData from "../assets/proTracker.json";
import { useNavigate } from "react-router-dom";

function Home() {
  const user = useSelector((state) => state.users);

  const { isLoggedIn } = user;
  const navigate = useNavigate();

  const handleStart = () => {
    if (isLoggedIn) {
      navigate("/add-project");
    } else {
      navigate("/login");
    }
  };
  return (
    <div>
      <div className="mt-[5rem] mb-7">
        <h1 className="text-[3rem] text-center font-semibold">
          The platform for smarter project tracking and management
        </h1>
        <p className="text-2xl text-center pt-5">
          Welcome to our Project Tracking and Management system where we provide
          you a platform that make it easier to track all projects done with
          various teams...
        </p>
      </div>
      <Lottie
        animationData={animationData}
        className="w-fit object-fill mx-auto md:w-[40rem]"
      />
      <div className="w-fit mx-auto">
        <button
          className="bg-blue-500 text-white text-2xl py-3 px-5 rounded-full"
          onClick={handleStart}>
          Get Started &#10228;
        </button>
      </div>
    </div>
  );
}

export default Home;
