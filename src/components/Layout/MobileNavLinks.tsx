import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { useAuth0 } from "@auth0/auth0-react";

type MobileNavLinksProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const MobileNavLinks = ({ setIsOpen }: MobileNavLinksProps) => {
  const { logout } = useAuth0();
  const location = useLocation(); // Get the url location

  const getLinkClass = (path: string) =>
    `flex bg-white items-center font-bold hover:text-orange-500  ${
      location.pathname === path ? "text-orange-500" : ""
    }`;
  
  return (
    <>
      <Link
        to="/order-status"
        className={getLinkClass("/order-status")}
        onClick={() => setIsOpen(false)}
      >
        Orders
      </Link>

      <Link
        to="/manage-restaurant"
        className={getLinkClass("/manage-restaurant")}
        onClick={() => setIsOpen(false)}
      >
        My Restaurant
      </Link>

      <Link
        to="/user-profile"
        className={getLinkClass("/user-profile")}
        onClick={() => setIsOpen(false)}
      >
        User Profile
      </Link>

      <Button
        onClick={() => {
          sessionStorage.clear();
          logout({
            logoutParams: {
              returnTo: window.location.origin
            }
          })
        }}
        className="flex items-center px-3 font-bold hover:bg-gray-500"
      >
        Log Out
      </Button>
    </>
  );
};

export default MobileNavLinks;