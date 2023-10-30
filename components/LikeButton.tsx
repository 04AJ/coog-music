"use client"
import { useUser } from '@/hooks/useUser';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import toast from 'react-hot-toast';
import prisma from '@/client';
import axios from 'axios';

interface LikeButtonProps {
    trackId: number;
}



const LikeButton: React.FC<LikeButtonProps> = ({
    trackId
}) => {
    const user = useUser();
    const router = useRouter();

    const [isLiked, setIsLiked] = useState(false);

    //test if track has been liked already
    useEffect(() => {
        if (!user?.userId) {
            return;
        }
        //WONT WORK - since this is a client-side component
        // const fetchData = async () => {
        //     const data = await getLiked(trackId, user.userId);


        //     if (data) {
        //         setIsLiked(true);
        //     }
        // };
        // fetchData();

        axios.get<boolean>(`/api/like?user_id=${user.userId}&track_id=${trackId}`)
            .then(response => {

                if (response.data) {
                    setIsLiked(true);

                }
            })
            .catch(Error => console.error(Error))
    },
        //dependency array in useEffect: when these values change, useEffect is reexecuted
        [trackId, user?.userId]);

    const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

    const handleLike = async () => {
        if (!user) {
            alert("No User - show auth modal");
            return;
        }
        if (isLiked) {
            // const affected = await unlikeTrack(trackId, user.userId);
            axios.delete(`/api/like?user_id=${user.userId}&track_id=${trackId}`)
                .then(() => {

                    setIsLiked(false);
                })
                .catch(Error => console.error(Error))


        }
        else {
            axios.post(`/api/like?user_id=${user.userId}&track_id=${trackId}`)
                .then(() => {

                    toast.success("Liked!");

                    setIsLiked(true);
                })
                .catch(Error => console.error(Error))
        }

        router.refresh();
    }

    return (
        <button
            onClick={handleLike}
            className='hover:opacity-75 transition'>
            <Icon color={isLiked ? 'red' : 'white'}></Icon>
        </button>
    )
}

export default LikeButton