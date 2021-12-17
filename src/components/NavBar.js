import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";

const NavBar = (props) => {
  const { user, LogOut } = useContext(UserContext)
  return (
    <div>
      <nav className="shadow-lg">
        <div className="w-full  px-4">
          <div className="flex justify-between">
            <div>
              <Link to={"/dashboard"} className="font-extrabold flex items-center justify-between my-2 text-2xl p-4">DCBOOK</Link>
            </div>
            <div className="flex items-center justify-between my-2 mx-4 col-span-ful gap-2">
              <Link to={"/book"} ><FontAwesomeIcon size="2x" className="text-blue-400 outline-black m-1 cursor-pointer" icon={faBookmark} /></Link>
              <span className="bg-blue-400 p-1 text-white rounded cursor-pointer" onClick={LogOut}>Logout</span>
              <p>{user.name}</p>
              <img alt="" className="h-8 w-8 rounded-full" src={user.photoURL} />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
