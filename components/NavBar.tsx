"use client"

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { BiHomeAlt2 } from "react-icons/bi"
import { AiFillUnlock, AiOutlineSearch } from "react-icons/ai"
import { CgProfile } from "react-icons/cg"
import { BiSolidGroup } from "react-icons/bi"
import { RiAdminLine } from "react-icons/ri"
import { twMerge } from "tailwind-merge";
import Library from "./Library";
import Box from "./Box";
import NavBarItem from "./NavBarItem";
import { useUser } from "@/hooks/useUser";


interface NavBarProps {
    children: React.ReactNode;
}
const NavBar: React.FC<NavBarProps> = ({
    children
}) => {
    //nextjs hook
    const pathname = usePathname();

    const user = useUser();



    const routes = useMemo(() => [
        {
            icon: BiHomeAlt2,
            label: 'Home',
            active: pathname === '/',
            href: '/',
            visible: true
        },
        {
            icon: AiFillUnlock,
            label: 'Login',
            active: pathname === '/login',
            href: '/login',
            visible: true

        },
        {
            icon: AiOutlineSearch,
            label: 'Search',
            active: pathname === '/search',
            href: '/search',
            visible: true

        },
        {
            icon: CgProfile,
            label: 'Profile',
            active: pathname === '/profile',
            href: (!user.userId || user.userRole === 'na') ? '/login' : '/profile',
            visible: true

        },
        {
            icon: BiSolidGroup,
            label: 'Explore',
            active: pathname === '/explore',
            href: '/explore',
            visible: true

        },
        {
            icon: RiAdminLine,
            label: 'Admin',
            active: pathname === '/admin',
            href: '/admin',
            visible: (user.userRole === 'admin') ? true : false

        }
    ], [pathname, user.userRole]);

    return (
        <div
            className={twMerge(`
            flex 
            h-full
            z-50
            `,

            )}
        >
            <div
                className="
                
              hidden 
              md:flex 
              flex-col 
              gap-y-2 
              bg-black 
              min-h-full 
              w-[300px] 
              p-2
              z-1

            "
            >
                <Box>
                    <div className="flex flex-col gap-y-4 px-5 py-4">
                        {routes.map((item) => (

                            <NavBarItem key={item.label} {...item} />

                        ))}
                    </div>
                </Box>
                <Box className="overflow-y-auto h-full">
                    <Library />
                </Box>
            </div>
            <main className="h-full flex-1 overflow-y-auto py-2">
                {children}
            </main>
        </div>
    );
}

export default NavBar