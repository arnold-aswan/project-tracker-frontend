import { NavLink } from "react-router-dom";
import {
  FaInstagram,
  FaSquareXTwitter,
  FaPinterest,
  FaSquareFacebook,
} from "react-icons/fa6";

function Footer() {
  return (
    <footer
      className="mt-[2rem] text-[.95rem] mx-2 py-10 rounded-md flex flex-wrap flex-col
    "
    >
      <ul className="flex items-start justify-around flex-wrap flex-col-1 pb-5">
        <li className="footer-li items-center text-center md:text-start">
          <span className="foot-head">
            <span className="text-blue-500 font-semibold ">Our Mission</span>
          </span>
          <div className="md:w-[22rem] pt-4">
            <p className="">
              Our mission is to provide teams and individuals with a seamless
              platform that empowers them to plan, organize, and execute
              projects with precision. We believe that every project, no matter
              its size, deserves a tool that ensures success from start to
              finish.
            </p>
          </div>
        </li>

        <li className="mt-4 md:mt-0">
          <span className="font-semibold text-blue-500">Quick Links</span>
          <ul className=" flex flex-wrap flex-col pt-3 items-center basis-full">
            <NavLink
              to={"/"}
              className="hover:bg-blue-500 hover:text-white text-black mx-3 p-2  rounded-lg"
            >
              Home
            </NavLink>
            <NavLink
              to={"/about"}
              className="hover:bg-blue-500 hover:text-white text-black mx-3 p-2  rounded-lg"
            >
              About
            </NavLink>
            <NavLink
              to={"/contact"}
              className="hover:bg-blue-500 hover:text-white text-black mx-3 p-2  rounded-lg"
            >
              Contacts
            </NavLink>
            <NavLink
              to={"/login"}
              className="hover:bg-blue-500 hover:text-white text-black mx-3 p-2  rounded-lg"
            >
              Login
            </NavLink>
          </ul>
        </li>

        <li className=" flex flex-col gap-y-[1rem]">
          <div className="md:w-[22rem] ">
            <form
              //   onSubmit={handleSubmit}
              className="flex flex-wrap  items-center gap-2 py-3"
            >
              <input
                className="border-b-2 border-black py-1 outline-none basis-full "
                type="email"
                // onChange={(e) => setEmail(e.target.value)}
                // value={email}
                placeholder="Enter Email"
                // required
              />
              <button
                type="submit"
                className="border-2 border-black p-2
                bg-black text-white font-medium
                 hover:bg-white hover:text-black 
                 transition-all ease-in-out duration-300 basis-full mt-3
                 "
              >
                Subscribe
              </button>
            </form>
            <div className="flex gap-5 justify-center">
              <FaInstagram className="text-2xl hover:text-blue-500 cursor-pointer" />
              <FaSquareXTwitter className="text-2xl hover:text-blue-500 cursor-pointer" />
              <FaPinterest className="text-2xl hover:text-blue-500 cursor-pointer" />
              <FaSquareFacebook className="text-2xl hover:text-blue-500 cursor-pointer" />
            </div>
          </div>
        </li>
      </ul>
      <hr />
      <small className="text-xs grid grid-cols-1 place-items-center pt-5">
        &#169; 2023 All rights reserved.
      </small>
    </footer>
  );
}

export default Footer;
