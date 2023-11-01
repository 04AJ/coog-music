"use client"
import { Playlist, SuperUser, Track } from "@/types";
import { useUser } from "@/hooks/useUser";
import axios from "axios";
import { useRouter } from "next/navigation";
import { MdVerified } from 'react-icons/md'



interface UserSearchContentProps {
    listeners: SuperUser[];
    artists: SuperUser[];

}

const UserSearchContent: React.FC<UserSearchContentProps> = ({
    listeners, artists
}) => {

    const user = useUser();
    const router = useRouter();






    if (listeners.length === 0 && artists.length === 0) {
        return (
            <div
                className="
          flex 
          flex-col 
          gap-y-2 
          w-full 
          px-6 
          text-neutral-400
        "
            >
                No users found.
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-y-2 w-full px-6 cursor-poniter">
            {artists.length > 0 ? <h1 className="text-2xl font-bold">Artists</h1> : null}
            {artists.map((artist: SuperUser) => (
                <div
                    key={artist.artist_id}
                    className="flex items-center gap-x-4 w-full cursor-pointer"
                >
                    <div className="flex flex-row flex-1 cursor-poniter gap-2" onClick={() => { user.setActiveUser(artist); router.push('/userProfile') }}>
                        {artist.user_name} <MdVerified color='#72bcd4' />
                    </div>

                </div>
            ))}
            {listeners.length > 0 ? <h1 className="text-2xl font-bold">Listeners</h1> : null}
            {listeners.map((listener: SuperUser) => (
                <div
                    key={listener.listener_id}
                    className="flex items-center gap-x-4 w-full cursor-poniter"
                >
                    <div className="flex-1 cursor-poniter" onClick={() => { user.setActiveUser(listener); router.push('/userProfile') }}>
                        {listener.user_name}

                    </div>

                </div>
            ))}
        </div>
    );
}

export default UserSearchContent;