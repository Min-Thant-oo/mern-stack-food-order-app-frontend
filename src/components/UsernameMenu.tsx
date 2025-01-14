import { useAuth0 } from "@auth0/auth0-react";
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { CircleUserRound } from "lucide-react"
import { DropdownMenuContent } from "./ui/dropdown-menu";
import { Link } from "react-router-dom";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { useState } from "react";

const UsernameMenu = () => {
    const { user, logout } = useAuth0();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger className="flex items-center px-4 py-2 rounded-md transition-colors font-bold hover:text-orange-500 gap-2">
                <CircleUserRound className="text-orange-500" />
                {user?.email}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64 p-2">
                <DropdownMenuItem onClick={() => setIsOpen(false)}>
                    <Link to='/manage-restaurant' className="flex font-bold hover:text-orange-500 px-4 py-2 hover:bg-orange-50 w-full">
                        Manage Restaurant
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setIsOpen(false)}>
                    <Link to='/user-profile' className="flex font-bold hover:text-orange-500 px-4 py-2 hover:bg-orange-50 w-full">
                        User Profile
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setIsOpen(false)}>
                    <Link to='/user-profile' className="flex font-bold hover:text-orange-500 px-4 py-2 hover:bg-orange-50 w-full">
                        User Profile
                    </Link>
                </DropdownMenuItem>

                <Separator className="my-2" />

                <DropdownMenuItem className="flex flex-1 justify-center items-center pt-2 pb-1">
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