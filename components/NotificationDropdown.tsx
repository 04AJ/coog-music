"use client"

import { useEffect, useState } from "react";
import Dropdown from "./Dropdown";
import { Notification } from "@/types";
import { VscBell, VscBellDot } from "react-icons/vsc"
import axios from "axios";
import toast from "react-hot-toast";



const NotificationDropdown = () => {

    const [notifications, setNotifications] = useState<Notification[]>();

    useEffect(() => {


        axios.get<Notification[]>(`/api/notifications`)
            .then(response => {


                if (response.data) {
                    setNotifications(response.data);
                }

            })
            .catch(error => {
                alert("error fetching data");
            })



    }, [])

    const handleSubmit = async () => {


        // axios.post(`/api/playlist?track_id=${track_id}&playlist_id=${playlist_id}`)
        //     .then(() => {

        //         toast.success("Added to playlist!");

        //     })
        //     .catch(error => toast.error("Track already exists in playlist"))
    }

    return (
        <div className="z-500 ">
            <header className=" border-gray-100">
                <Dropdown>
                    <Dropdown.Button>{(notifications) ? <VscBellDot /> : <VscBell />}</Dropdown.Button>

                    <Dropdown.Menu >
                        <p className="text-red-900">Notifications:</p>
                        {(notifications) ?
                            notifications.map((notification) =>
                                <Dropdown.MenuItem key={notification.n_id} onSelect={() => handleSubmit()}>
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