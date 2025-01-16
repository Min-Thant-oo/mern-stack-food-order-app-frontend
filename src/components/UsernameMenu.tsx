import { useAuth0 } from "@auth0/auth0-react";
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { CircleUserRound } from "lucide-react"
import { DropdownMenuContent } from "./ui/dropdown-menu";
import { Link, useLocation } from "react-router-dom";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { useState } from "react";

const UsernameMenu = () => {
    const { user, logout } = useAuth0();
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation(); // Get the url location

    const getLinkClass = (path: string) =>
      `flex font-bold hover:text-orange-500 px-4 py-2 mb-1 hover:bg-orange-50 w-full  ${
        location.pathname === path ? "text-orange-500 bg-orange-50" : ""
      }`;

    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger className="flex items-center px-4 py-2 rounded-md transition-colors font-bold hover:text-orange-500 gap-2 focus:outline-none focus:ring-0">
                <CircleUserRound className="text-orange-500" />
                {user?.email}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64 p-2">
                <DropdownMenuItem className="focus:outline-none focus:ring-0" onClick={() => setIsOpen(false)}>
                    <Link to='/manage-restaurant' className={getLinkClass("/manage-restaurant")} >
                        Manage Restaurant
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="focus:outline-none focus:ring-0" onClick={() => setIsOpen(false)}>
                    <Link to='/user-profile' className={getLinkClass("/user-profile")} >
                        User Profile
                    </Link>
                </DropdownMenuItem>

                <Separator className="my-2" />

                <DropdownMenuItem className="flex flex-1 justify-center items-center pt-2 pb-1 focus:outline-none focus:ring-0">
                    <Button 
                        className=" w-full font-bold bg-orange-500 hover:bg-orange-600 transition-colors" 
                        onClick={() => logout({
                            logoutParams: {
                              returnTo: window.location.origin
                            }
                          })
                        }
                    >
                        Log Out
                    </Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UsernameMenu