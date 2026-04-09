'use client';
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogOut } from "lucide-react";
import NavItems from "./NavItems";
import { signOut } from "@/lib/actions/auth.actions";

const UserDropdown = ({user}:{user:User}) => {
    const router = useRouter();

    const handleSignOut = async () => {
        await signOut();
        router.push("/sign-in");
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-3 text-gray-4 hover:text-yellow">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src="https://media.licdn.com/dms/image/v2/D4D03AQHBaganf2tvJg/profile-displayphoto-shrink_800_800/B4DZT2a8zkG4Ac-/0/1739301048998?e=1774483200&v=beta&t=HrNUt6k5KFBtYvZv3rLzdQMsrUF-dXDNfL2i0hgD7Bk" />
                        <AvatarFallback className="bg-yellow-500 text-yelow-900 text-sm font-bold">
                            {user.name[0]}
                        </AvatarFallback>
                    </Avatar>
                <div className="hidden md-flex flex-col items-start">
                    <span className="text-base font-medium text-gray-400">
                        {user.name}
                    </span>
                </div>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="text-gray-400">
                <DropdownMenuLabel>
                    <div className="flex relative items-center gap-3 py-2">
                        <Avatar className="h-10 w-10">
                            <AvatarImage src="https://media.licdn.com/dms/image/v2/D4D03AQHBaganf2tvJg/profile-displayphoto-shrink_800_800/B4DZT2a8zkG4Ac-/0/1739301048998?e=1774483200&v=beta&t=HrNUt6k5KFBtYvZv3rLzdQMsrUF-dXDNfL2i0hgD7Bk" />
                            <AvatarFallback className="bg-yellow-500 text-yelow-900 text-sm font-bold">
                                {user.name[0]}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                            <span className="text-base font-medium text-gray-400">
                                {user.name}
                            </span>
                            <span className="text-sm text-gray-500">
                                {user.email}
                            </span>
                        </div>  
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-600"/>
                <DropdownMenuItem onClick={handleSignOut} className="text-gray-100 text-md font-medium focus:bg-transparent focus:text-yellow-500 transition-colors cursor-pointer">
                    <LogOut className="h-4 w-4 mr-2 hidden sm:block"/>
                    LogOut
                </DropdownMenuItem>
                <DropdownMenuSeparator className="hidden sm:block bg-gray-600"/>
                <nav className="sm:hidden">
                    <NavItems/>
                </nav>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserDropdown