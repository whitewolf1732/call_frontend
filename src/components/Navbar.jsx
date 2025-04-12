import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User, Phone } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const location = useLocation();

  const hideUserOptions =
    location.pathname === "/" ||
    location.pathname === "/call" ||
    location.pathname === "/list";

  return (
    <header className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/80">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Left Side Logo or App Name (optional) */}
        <div className="flex items-center sm:hidden">
          <Link to="/" className="btn btn-sm">
            Home
          </Link>
        </div>

        {/* Center - Navigation Links */}
        <div
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-4
          absolute left-1/2 transform -translate-x-1/2"
        >
          <Link to="/" className="btn btn-sm gap-2">
            <span className="hidden sm:inline">Home</span>
          </Link>

          <Link to="/list" className="btn btn-sm gap-2">
            <User className="size-5" />
            <span className="hidden sm:inline">Listener</span>
          </Link>

          <Link to="/call" className="btn btn-sm gap-2">
            <Phone className="size-5" />
            <span className="hidden sm:inline">Call</span>
          </Link>

          <Link to="/home" className="btn btn-sm gap-2">
            <MessageSquare className="size-5" />
            <span className="hidden sm:inline">Chatty</span>
          </Link>
        </div>

        {/* Right Side - Profile, Settings & Logout */}
        <div className="flex items-center gap-2">
          {!hideUserOptions && (
            <>
              <Link to="/settings" className="btn btn-sm gap-2">
                <Settings className="size-5" />
                <span className="hidden sm:inline">Settings</span>
              </Link>

              {authUser && (
                <>
                  <Link to="/profile" className="btn btn-sm gap-2">
                    <User className="size-5" />
                    <span className="hidden sm:inline">Profile</span>
                  </Link>

                  <button
                    onClick={logout}
                    className="btn btn-sm gap-2 bg-red-500 text-white hover:bg-red-600"
                  >
                    <LogOut className="size-5" />
                    <span className="hidden sm:inline">Logout</span>
                  </button>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
