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
            <DropdownMenuTrigger className="flex items-center px-3 font-bold hover:text-orange-500 gap-2">
                <CircleUserRound className="text-orange-500" />
                {user?.name}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[150px]">
                <DropdownMenuItem onClick={() => setIsOpen(false)}>
                    <Link to='/user-profile' className="flex justify-center font-bold hover:text-orange-500 py-1">
                        User Profile
                    </Link>
                </DropdownMenuItem>

                <Separator />

                <DropdownMenuItem className="flex flex-1 justify-center items-center pt-2 pb-1">
                    <Button 
                        className=" font-bold bg-orange-500" 
                        onClick={() => logout()}
                    >
                        Log Out
                    </Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UsernameMenu