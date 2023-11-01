"use client"
import Header from "@/components/Header";
import UserDetails from "@/components/UserDetails";
import usePlayer from "@/hooks/usePlayer";
import { useUser } from "@/hooks/useUser";
import { Playlist, User } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";


export default function ProfilePage() {
    const user = useUser();
    const player = usePlayer();
    //call api to get user details  
    const [userDetails, setUserDetails] = useState<User[]>();


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

                <div className="flex gap-5 p-4">
                    <button className="border" onClick={() => { user.setUserId(4); user.setListenerId(3); user.setUserRole("listener") }
                    }>Login as Listener</button>
                    <button className="border" onClick={() => { user.setUserId(2); user.setArtistId(2); user.setUserRole('artist') }
                    }>Login as Artist</button>
                </div>

                <div>UserID: {user.userId} | UserRole: {user.userRole}</div>
                {(user.userRole === 'listener') ? <p>ListenerID: {user.listenerId}</p> : <p>ArtistID: {user.artistId}</p>}


                {userDetails ? <UserDetails userDetails={userDetails[0]} profilePage={true} /> : null}


            </div >

        </div >
    )
}