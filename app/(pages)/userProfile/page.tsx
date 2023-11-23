"use client"
import Header from "@/components/Header";
import UserDetails from "@/components/UserDetails";
import usePlayer from "@/hooks/usePlayer";
import { useUser } from "@/hooks/useUser";
import { Playlist, SuperUser, User } from "@/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { RxCaretLeft } from "react-icons/rx"
import { MdVerified } from "react-icons/md";
import toast from "react-hot-toast";
import UpdateProfileButton from "@/components/UpdateProfileButton";
import UpdateProfileModal from "@/components/UpdateProfileModal";
import { setuid } from "process";

interface response {
    streams: number
}

export default function UserProfilePage() {
    const user = useUser();
    const player = usePlayer();
    const router = useRouter();

    const [update, setUpdate] = useState(0);
    const [userDetails, setUserDetails] = useState<User[]>();
    const [isFollowing, setIsFollowing] = useState(false);
    const [streamCount, setStreamCount] = useState(0);
    const [followers, setFollowers] = useState<SuperUser[]>();

    if (!user.userId) {
        router.push("/login");
    }

    //test if track has been liked already
    //get request
    useEffect(() => {
        //get streams

        axios.get<User[]>(`/api/user?user_id=${user.activeUser.user_id}`)
            .then(response => {

                if (response.data) {
                    setUserDetails(response.data);
                }

            })
            .catch(error => {
                alert("error fetching data");
            })

        if (user.activeUser.is_artist === 1) {
            axios.get<response>(`/api/stream?artist_id=${user.activeUser.artist_id}`)
                .then(response => {
                    if (response.data.streams) {
                        setStreamCount(response.data.streams);
                    }
                    else {
                        setStreamCount(0);
                    }
                })
                .catch(Error => console.error(Error))

        }
        //listener follows listener
        if (user.userRole === 'listener' && user.activeUser.is_artist === 0) {
            axios.get<boolean>(`/api/followRecursive?listener_id1=${user.activeUser.listener_id}&listener_id2=${user.listenerId}`)
                .then(response => {
                    if (response.data) {
                        setIsFollowing(true);

                    }
                })
                .catch(Error => console.error(Error))

        }
        //listener forllows artist
        else if (user.userRole === 'listener' && user.activeUser.is_artist === 1) {

            axios.get<boolean>(`/api/follow?listener_id=${user.listenerId}&artist_id=${user.activeUser.artist_id}`)
                .then(response => {
                    if (response.data) {
                        setIsFollowing(true);

                    }
                })
                .catch(Error => console.error(Error))


        }


        if (user.activeUser.is_artist === 0) {
            axios.get<SuperUser[]>(`api/followers?listener_id=${user.activeUser.listener_id}`)
                .then(response => {
                    if (response.data) {
                        setFollowers(response.data);
                    }

                })
                .catch(error => {
                    alert("error fetching data");
                })
        }
        else if (user.activeUser.is_artist === 1) {
            axios.get<SuperUser[]>(`api/followers?artist_id=${user.activeUser.artist_id}`)
                .then(response => {

                    if (response.data) {
                        setFollowers(response.data);
                    }

                })
                .catch(error => {
                    alert("error fetching data");
                })
        }


    }, [user.userId, user.activeUser, user.activeUser.is_artist, user.activeUser.listener_id, user.listenerId, user.userRole, update])



    const handleFollow = async () => {
        //if !isFollow
        //call post request
        if (!isFollowing) {
            if (user.userRole === 'listener' && user.activeUser.is_artist === 0) {
                axios.post(`/api/followRecursive?listener_id1=${user.activeUser.listener_id}&listener_id2=${user.listenerId}`)
                    .then(() => {
                        setUpdate(update + 1);
                        toast.success("Following!");

                        setIsFollowing(true);
                    })
                    .catch(Error => console.error(Error))
            }
            //listener forllows artist
            else if (user.userRole === 'listener' && user.activeUser.is_artist === 1) {
                axios.post(`/api/follow?listener_id=${user.listenerId}&artist_id=${user.activeUser.artist_id}`)
                    .then(() => {
                        setUpdate(update + 1)
                        toast.success("Following!");

                        setIsFollowing(true);
                    })
                    .catch(Error => console.error(Error))
            }

        }
        //if isFollow
        //call DELETE request
        else {
            if (user.userRole === 'listener' && user.activeUser.is_artist === 0) {
                axios.delete(`/api/followRecursive?listener_id1=${user.activeUser.listener_id}&listener_id2=${user.listenerId}`)
                    .then(() => {
                        setUpdate(update + 1);
                        toast.success("Unfollowed");

                        setIsFollowing(false);
                    })
                    .catch(Error => console.error(Error))
            }
            //listener forllows artist
            else if (user.userRole === 'listener' && user.activeUser.is_artist === 1) {
                axios.delete(`/api/follow?listener_id=${user.listenerId}&artist_id=${user.activeUser.artist_id}`)
                    .then(() => {
                        setUpdate(update + 1);
                        toast.success("Unfollowed");

                        setIsFollowing(false);
                    })
                    .catch(Error => console.error(Error))
            }

        }
    }


    return (

        <div
            className={twMerge(`
            h-fit 
        bg-gradient-to-b 
        from-purple-800 to-30%
        p-6
          `
            )}
        >
            {userDetails ? <UpdateProfileModal user_info={userDetails[0]} isProfile={false} setUserDetails={setUserDetails} update={update} setUpdate={setUpdate} /> : null}

            <div className="w-full h-full mb-4 flex-col items-center">

                <button
                    onClick={() => router.back()}
                    className="
              rounded-full 
              bg-black 
              flex 
              items-center 
              justify-center 
              cursor-pointer 
              hover:opacity-75 
              transition
            "
                >
                    <RxCaretLeft className="text-white" size={35} />
                </button>

                <div className="text-center mb-10">
                    {user.activeUser.is_artist ?

                        <div className="flex justify-center">
                            <p>Verified Artist</p>
                            <MdVerified color='#72bcd4' size='1.5rem' />


                        </div>


                        : null}

                    <div className="text-6xl font-bold gap-2 justify-center flex flex-row mb-2">


                        {userDetails ? userDetails[0].user_name : null}


                    </div>
                    <div>
                        {(user.activeUser.is_artist) ? <div className="text-lg">Streams: {streamCount}</div>
                            : null}
                    </div>
                    <div>
                        {(followers) ? followers.length : 0} Followers
                    </div>
                    {(user.userRole === 'listener') ?
                        <button className="border p-1 rounded-md hover:bg-sky-600"
                            onClick={handleFollow}
                        >{(isFollowing) ? "Unfollow" : "Follow"}</button>
                        : null
                    }


                </div>


                {(user.userRole === 'admin') ? <UpdateProfileButton /> : null}
                <p className="text-3xl font-bold">User Info</p>
                {userDetails ? <UserDetails userDetails={userDetails[0]} profilePage={false} update={update} setUpdate={setUpdate} /> : null}


            </div >
            <div className='h-[80px]'></div>

        </div >
    )
}