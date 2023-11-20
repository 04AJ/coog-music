"use client"

import { useEffect, useState } from "react";
import Dropdown from "./Dropdown";
import { Notification } from "@/types";
import { VscBell, VscBellDot } from "react-icons/vsc"
import axios from "axios";
import toast from "react-hot-toast";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";



const NotificationDropdown = () => {
    const user = useUser();
    const [notifications, setNotifications] = useState<Notification[]>();
    const router = useRouter();
    const [update, setUpdate] = useState(0);

    useEffect(() => {

        axios.get<Notification[]>(`/api/notifications?isAdmin=${(user.userRole === 'admin') ? 1 : 0}&isArtist=${(user.userRole === 'artist') ? 1 : 0}&listener_id=${user.listenerId}`)
            .then(response => {
                if (response.data) {
                    setNotifications(response.data);
                }
            })
            .catch(error => {
                alert("error fetching data");
            })
    }, [update])





    const handleSubmit = async (id: number) => {

        if (user.userRole === 'admin') {
            //remove track from album
            axios.delete(`/api/notifications?NotificationID=${id}`)
                .then(() => {

                    router.refresh();
                    toast.success('Deleted notification')
                    // window.location.href = "/";
                    setUpdate(update + 1);


                })
                .catch(Error => console.error(Error))
        }

    }

    return (
        <div className="z-500 ">
            <header className=" border-gray-100">
                <Dropdown>
                    {(user.userRole !== 'na') ?


                        <Dropdown.Button> {(notifications) ? <VscBellDot color='red' /> : <VscBell />}</Dropdown.Button>
                        :

                        null
                    }
                    <Dropdown.Menu >
                        <p className="text-red-900">Notifications:</p>
                        {(notifications) ?
                            notifications.map((notification) =>
                                <Dropdown.MenuItem key={notification.NotificationID} onSelect={() => handleSubmit(notification.NotificationID)}>
                                    {notification.Message}
                                </Dropdown.MenuItem>
                            ) : null}

                    </Dropdown.Menu>
                </Dropdown>
            </header>

        </div>

    );
}

export default NotificationDropdown;