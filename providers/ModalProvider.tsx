"use client"

import CreateAlbumModal from "@/components/CreateAlbumModal";
import CreatePlaylistModal from "@/components/CreatePlaylistModal";
import Modal from "@/components/Modal";
import UploadTrackModal from "@/components/UploadTrackModal";
import { useEffect, useState } from "react";


const ModalProvider = () => {

    const [isMounted, setIsMounted] = useState(false);
    const [update, setUpdate] = useState(0);

    //this is prevent that modals don't cause hydration errors (server side rendering)
    //NEVER want to render modal if it is server side rendering

    //if this useEffect loads, that means we are already in client so it is safe to render modal
    useEffect(() => {
        setIsMounted(true);

    }, []);

    if (!isMounted) {
        return null;
    }

    //else return modal in client side
    return (
        <>


        </>
    )
}

export default ModalProvider