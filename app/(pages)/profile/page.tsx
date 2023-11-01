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
          flex-col
          h-full
          `,
                player.activeId && 'h-[calc(100%-80px)]'
            )}
        >
            <div className="pl-10 bg-neutral-900/80 flex min-h-screen flex-col items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-red-500 before:dark:opacity-10 after:dark:from-red-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">

                <Header title="Profile" description="User Details"></Header>
                <button className="border" onClick={() => { user.setUserId(4); user.setListenerId(3); user.setUserRole("listener") }
                }>Login as Listener</button>
                <button className="border" onClick={() => { user.setUserId(1); user.setArtistId(1); user.setUserRole('artist') }
                }>Login as Artist</button>
                <div>UserID: {user.userId} | UserRole: {user.userRole}</div>
                {(user.userRole === 'listener') ? <p>ListenerID: {user.listenerId}</p> : <p>ArtistID: {user.artistId}</p>}


                {userDetails ? <UserDetails userDetails={userDetails[0]} profilePage={true} /> : null}


            </div >

        </div >
    )
}