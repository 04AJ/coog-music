"use client"
import React, { useEffect, useState } from 'react'
import Button from './Button'
import router from 'next/navigation'
import { useUser } from '@/hooks/useUser'
import { User } from '@/types'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { Underdog } from 'next/font/google'
import NotificationDropdown from './NotificationDropdown'

const Logout = () => {

    const user = useUser();
    const router = useRouter();
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

    const onClickLogout = () => {
        user.setUserId(undefined);
        user.setUserRole('na')
        router.refresh();

    }

    const onClickLogin = () => {
        router.push('/login');

    }

    return (

        <div className="flex fixed top-2 right-2 z-500 bg-black gap-1 border rounded-md p-2">
            <div>
                <NotificationDropdown />
            </div>
            <div className='flex flex-col '>
                <div>
                    {(userDetails && userDetails[0]) ? userDetails[0].user_name : null}

                </div>

                {(user.userId) ? <button onClick={onClickLogout} className="text-red-200 hover:text-red-600">
                    Logout</button>
                    :
                    <button onClick={onClickLogin} className="text-green-200 hover:text-green-600">
                        Login</button>
                }

            </div>


        </div>


    );
}

export default Logout