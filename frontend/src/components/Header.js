import React, { useContext, useState } from "react";
import Logo from "./Logo";
import { IoSearchSharp } from "react-icons/io5";
import { PiUserCircleDuotone } from "react-icons/pi";
import { BsCartFill } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SummaryApi from "../common/index";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import ROLE from "../common/role";
import "../btn.css";
import Context from "../context";

const Header = () => {
  const user = useSelector((state) => state?.user?.user);
  const [menuDisplay, setmenuDisplay] = useState(false);
  const dispatch = useDispatch();
  const context = useContext(Context);
  const navigate = useNavigate();
  const searchInput = useLocation();
  const URLSearch = new URLSearchParams(searchInput?.search);
  const searchQuery = URLSearch.getAll("q");
  const [search, setsearch] = useState(searchQuery);
  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: "include",
    });

    const data = await fetchData.json();

    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      navigate("/");
    }

    if (data.error) {
      toast.error(data.message);
    }
  };

  const handleSearch = (e) => {
    const { value } = e.target;

    setsearch(value);

    if (value) {
      navigate(`/search?q=${value}`);
    } else {
      navigate("/search");
    }
  };

  return (
    <header className="h-16 shadow-2xl bg-white fixed w-full z-40">
      <div className="h-full container mx-auto flex justify-between px-4 items-center">
        <div>
          <Link to={"/"}>
            <Logo />
          </Link>
        </div>

        <div className="flex gap-7 items-center">
          <div className="relative flex justify-center">
            {user?._id && (
              <div
                className="text-3xl cursor-pointer relative flex justify-center"
                onClick={() => {
                  setmenuDisplay((preve) => !preve);
                }}
              >
                {user?.profilePic ? (
                  <img
                    src={user.profilePic}
                    className="w-10 h-10 rounded-full"
                    alt={user?.name}
                  />
                ) : (
                  <PiUserCircleDuotone />
                )}
              </div>
            )}
            {menuDisplay && (
              <div className="absolute bottom-0 top-11 h-fit shadow-lg rounded bg-white p-2">
                <nav>
                  {user?.role === ROLE.EMPLOYEE && (
                    <Link
                      to={"/admin-panel/all-products"}
                      className="whitespace-nowrap hidden md:block hover:bg-slate-100 p-2"
                      onClick={() => {
                        setmenuDisplay((preve) => !preve);
                      }}
                    >
                      Admin Panel
                    </Link>
                  )}
                </nav>
              </div>
            )}
          </div>

          <div className="hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow-md pl-3">
            <input
              id="searchbox"
              type="text"
              placeholder="search category here..."
              className="w-full outline-none"
              onChange={handleSearch}
              value={search}
            />

            <div className="bg-blue-500 text-lg min-w-[50px] h-8 flex items-center justify-center rounded-r-full text-white">
              <IoSearchSharp />
            </div>
          </div>

          {/* {user?._id && (
            <Link to={"/cart"} className="text-4xl relative">
              <span>
                <BsCartFill />
              </span>
              <div className="bg-red-600 text-white h-5 w-5 p-1 rounded-full flex items-center justify-center absolute -top-2 right-0">
                <p className="text-sm">{context?.ProductCount}</p>
              </div>
            </Link>
          )} */}

          <div>
            {user?._id ? (
              <button onClick={handleLogout} className="StylingBtn">
                Logout
              </button>
            ) : (
              <Link to={"/login"}>
                <button className="StylingBtn">Login</button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
