"use client"
import DeleteModal from "@/components/DeleteModal";
import Header from "@/components/Header";
import UpdateModal from "@/components/UpdateModal";
import UploadProfileButton from "@/components/UpdateProfileButton";
import UpdateProfileModal from "@/components/UpdateProfileModal";
import UserDetails from "@/components/UserDetails";
import usePlayer from "@/hooks/usePlayer";
import { useUser } from "@/hooks/useUser";
import { Playlist, User } from "@/types";
import { InputLabel, Select, MenuItem, Box, NativeSelect } from "@mui/material";
import FormControl from "@mui/material/FormControl/FormControl";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { twMerge } from "tailwind-merge";


export default function ProfilePage() {
    const user = useUser();
    const player = usePlayer();
    const [update, setUpdate] = useState(0);

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

    }, [user.userId, update]);


    const { register,
        handleSubmit,
        control,
        reset } = useForm<FieldValues>({
            defaultValues: {
                gender: 2,
                race: 30,
                ethnicity: 1
            }
        })


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
            <UpdateModal isHomePage={true} update={update} setUpdate={setUpdate} />
            <DeleteModal isHomePage={true} update={update} setUpdate={setUpdate} />

            State: {update}
            {userDetails ? <UpdateProfileModal user_info={userDetails[0]} isProfile={true} setUpdate={setUpdate} setUserDetails={setUserDetails} update={update} /> : null}

            <div className="w-full h-full mb-4 flex-col items-center">

                <Header title="Profile" description="User Details"></Header>
                <UploadProfileButton />






            </div >
            {userDetails ? <UserDetails userDetails={userDetails[0]} profilePage={true} update={update} setUpdate={setUpdate} /> : null}








        </div >
    )
}