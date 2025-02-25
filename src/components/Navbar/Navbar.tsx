import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import { CartContext } from "../../Context/CartContext";
import { FaHeart } from "react-icons/fa";

interface UserContextType {
  userLogin: string | null;
  setUserLogin: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function Navbar() {
  const { userLogin, setUserLogin } = useContext<UserContextType | undefined>(
    UserContext
  )!;
  const { setCart } = useContext(CartContext)!;
  const navigate = useNavigate();

  const Logout = () => {
    localStorage.removeItem("userToken");
    setUserLogin(null);
    setCart([]); // Clear cart on logout
    navigate("/login");
  };

  return (
    <nav className="bg-gray-100 fixed top-0 right-0 left-0 z-50">
      <div className="container items-center flex justify-between mx-auto py-4">
        <div className="flex">
          {/* <img src={logo} width={120} alt="fresh cart logo" /> */}
          <ul className="flex flex-col lg:flex-row justify-around m-0 p-0 pl-10">
            {userLogin !== null ? (
              <>
                <li className="text-md mx-4 text-slate-900 font-normal">
                  <NavLink to={"/"}>Home</NavLink>
                </li>
                <li className="text-md mx-4 text-slate-900 font-normal">
                  <NavLink to={"/about"}>About</NavLink>
                </li>
                <li className="text-md mx-4 text-slate-900 font-normal">
                  <NavLink to={"/categories"}>Categories</NavLink>
                </li>
                <li className="text-md mx-4 text-slate-900 font-normal">
                  <NavLink to={"/brands"}>Brands</NavLink>
                </li>
                <li className="text-md mx-4 text-slate-900 font-normal">
                  <NavLink to={"/products"}>Products</NavLink>
                </li>
              </>
            ) : null}
          </ul>
        </div>
        <div className="flex">
          <ul className="flex flex-col lg:flex-row justify-around m-0 p-0 pl-10">
            {userLogin !== null && (
              <>
                <li className="text-md mx-4 text-slate-900 font-normal">
                  <NavLink to={"/cart"}>
                    <i className="fa-solid fa-cart-shopping"></i>
                  </NavLink>
                </li>
                <li className="text-md mx-4 text-slate-900 font-normal">
                  <NavLink
                    to={"/wishlist"}
                    className="hover:text-red-500 transition-colors"
                  >
                    Wishlist
                  </NavLink>
                </li>
              </>
            )}
          </ul>
          <ul className="flex flex-col lg:flex-row justify-around m-0 p-0">
            {userLogin == null ? (
              <>
                <li className="text-md mx-4 text-slate-900 font-normal">
                  <NavLink to={"/login"}>Login</NavLink>
                </li>
                <li className="text-md mx-4 text-slate-900 font-normal">
                  <NavLink to={"/register"}>Register</NavLink>
                </li>
              </>
            ) : (
              <li
                onClick={Logout}
                className="text-md mx-4 text-slate-900 font-normal"
              >
                <span className="mx-2 py-4 cursor-pointer">Logout</span>
              </li>
            )}
            {/* <li className="text-md mx-4 text-slate-900 font-normal flex justify-between items-center">
            <i className="fab fa-facebook mx-2 fa-sm"></i>
            <i className="fab fa-twitter mx-2 fa-sm"></i>
            <i className="fab fa-tiktok mx-2 fa-sm"></i>
            <i className="fab fa-instagram mx-2 fa-sm"></i>
            <i className="fab fa-youtube mx-2 fa-sm"></i>
          </li> */}
          </ul>
        </div>
      </div>
    </nav>
  );
}
