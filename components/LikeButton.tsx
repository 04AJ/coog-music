"use client"
import { useUser } from '@/hooks/useUser';
import { useRouter } from 'next/navigation';
import { getLiked, likeTrack, unlikeTrack } from '@/db';
import React, { useEffect, useState } from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import toast from 'react-hot-toast';

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
        const fetchData = async () => {
            const data = await getLiked(trackId, user.userId);

            if (data) {
                setIsLiked(true);
            }
        };
        fetchData();
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
            const affected = await unlikeTrack(trackId, user.userId);

            if (affected) {
                setIsLiked(false);
                toast.success("Liked!")
            }


        }
        else {
            const affected = await likeTrack(trackId, user.userId);
            if (affected) {
                setIsLiked(true);
            }
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