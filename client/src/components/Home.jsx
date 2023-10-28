import Lottie from "lottie-react";
import animationData from "../assets/proTracker.json";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="mt-[5rem] mb-7">
        <h1 className="text-[3rem] text-center font-semibold">
          The platform for smarter project management
        </h1>
        <p className="text-2xl text-center pt-5">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio,
          ullam.
        </p>
      </div>
      <Lottie
        animationData={animationData}
        className="w-fit object-fill mx-auto md:w-[40rem]"
      />
      <div className="w-fit mx-auto">
        <button
          className="bg-blue-500 text-white text-2xl py-3 px-5 rounded-full"
          onClick={() => navigate("/add-project")}
        >
          Get Started &#10228;
        </button>
      </div>
    </div>
  );
}

export default Home;
