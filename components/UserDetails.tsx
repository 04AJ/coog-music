"use client"
import { User } from "@/types";

interface UserDetailsProps {
    userDetails: User
}
const UserDetails: React.FC<UserDetailsProps> = ({
    userDetails
}) => {



    return (

        <div className="flex flex-col w-3/4 ">


            <div className="flex flex-row">
                <p className="w-1/4 border">Username</p>
                <p className="w-3/4 border">{userDetails.user_name}</p>
            </div>


            <div className="flex flex-row">
                <p className="w-1/4 border">Password</p>
                <p className="w-3/4 border">{userDetails.password}</p>
            </div>
            <div className="flex flex-row">
                <p className="w-1/4 border">Email</p>
                <p className="w-3/4 border">{userDetails.email}</p>
            </div>
            <div className="flex flex-row">
                <p className="w-1/4 border">Gender</p>
                <p className="w-3/4 border">{userDetails.gender_name}</p>
            </div>
            <div className="flex flex-row">
                <p className="w-1/4 border">Race</p>
                <p className="w-3/4 border">{userDetails.race_name}</p>
            </div>
            <div className="flex flex-row">
                <p className="w-1/4 border">Ethnicity</p>
                <p className="w-3/4 border">{userDetails.ethnicity_name}</p>
            </div>

            <h1>Display user playlists and or albums</h1>


        </div>
    )
}

export default UserDetails;