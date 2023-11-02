"use client"
import Header from "@/components/Header";
import UserDetails from "@/components/UserDetails";
import usePlayer from "@/hooks/usePlayer";
import { useUser } from "@/hooks/useUser";
import { Playlist, User } from "@/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";


export default function ProfilePage() {
    const user = useUser();
    const player = usePlayer();
    //call api to get user details  
    const [userDetails, setUserDetails] = useState<User[]>();
    const router = useRouter();


    useEffect(() => {
        axios.get<User[]>(`/api/user?user_id=${user.userId}`)
            .then(response => {

                if (response.data) {
                    setUserDetails(response.data);
                }

            })
            .catch(error => {
                alert("error fetching data");
            })

    }, [user.userId]);





    return (

        <div
            className={twMerge(`
            h-fit 
            bg-gradient-to-b 
            from-red-800 to-30%
            p-6
          `,
                player.activeId && 'h-[calc(100%-80px)]'
            )}
        >
            <div className="w-full h-full mb-4 flex-col items-center">

                <Header title="Profile" description="User Details"></Header>






            </div >
            {userDetails ? <UserDetails userDetails={userDetails[0]} profilePage={true} /> : null}


        </div >
    )
}