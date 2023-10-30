"use client"
import { User } from "@/types";

interface UserDetailsProps {
    user: User | null
}
const UserDetails: React.FC<UserDetailsProps> = ({
    user
}) => {



    return (

        <div className="flex flex-col">
            <h1>Display user details here</h1>

            <h1>Display user playlists and or albums</h1>


        </div>
    )
}

export default UserDetails;