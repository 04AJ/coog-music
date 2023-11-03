"use client";

import { AiOutlineStar } from "react-icons/ai";

import useUploadTrackModal from "@/hooks/useUploadTrackModal";
import { useUser } from "@/hooks/useUser";
import { useEffect, useState } from "react";
import axios from "axios";
import { SuperUser } from "@/types";
import { useRouter } from "next/navigation";



const Library: React.FC = () => {
    const uploadModal = useUploadTrackModal();
    const [followers, setFollowers] = useState<SuperUser[]>();

    const user = useUser();
    const router = useRouter();


    useEffect(() => {
        if (user.userRole === 'listener') {
            axios.get<SuperUser[]>(`api/followers?listener_id=${user.listenerId}`)
                .then(response => {
                    if (response.data) {
                        setFollowers(response.data);
                    }

                })
                .catch(error => {
                    alert("error fetching data");
                })
        }
        else if (user.userRole === 'artist') {
            axios.get<SuperUser[]>(`api/followers?artist_id=${user.artistId}`)
                .then(response => {

                    if (response.data) {
                        setFollowers(response.data);
                    }

                })
                .catch(error => {
                    alert("error fetching data");
                })
        }



    }, [user.userId, user.artistId, user.listenerId, user.userRole]);

    const onClick = () => {

        return uploadModal.onOpen();
    }

    return (
        <div className="flex flex-col">
            <div className="flex items-center justify-between px-5 pt-4">
                <div className="inline-flex items-center gap-x-2">
                    <AiOutlineStar className="text-neutral-400" size={26} />
                    <p className="text-neutral-400 font-medium text-md">
                        Followers
                    </p>
                </div>

            </div>

            <div className="flex items-center justify-between px-5 pt-4">
                {(user.userRole === 'listener' || user.userRole === 'artist') ?
                    <div className="text-neutral-200">
                        {(followers) ?
                            <div>
                                {followers.map((follower) => <ul key={follower.user_id} className="cursor-pointer" onClick={() => { user.setActiveUser(follower); router.push('/userProfile') }}>{follower.user_name}</ul>)}
                            </div> : null}
                    </div>
                    : null
                }
            </div>

        </div>
    );
}

export default Library;