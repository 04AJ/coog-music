"use client"

import { useEffect, useState } from 'react';
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import useUploadTrackModal from '@/hooks/useUploadTrackModal'

import Modal from './Modal';
import Input from './Input';
import Button from './Button';
import { useUser } from '@/hooks/useUser';
import { User } from '@/types';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Box, FormControl, InputLabel, NativeSelect } from '@mui/material';
import { useDeleteModal } from '@/hooks/useDeleteModal';
import UpdateModal from './UpdateModal';




interface DeleteModalProps {
    isHomePage: Boolean
}

const DeleteModal: React.FC<DeleteModalProps> = ({
    isHomePage
}) => {

    const [isLoading, setIsLoading] = useState(false);
    const user = useUser();
    const deleteModal = useDeleteModal();




    //custom hook to change modal visibility  state

    const router = useRouter();

    const { register,
        handleSubmit,
        control,
        reset } = useForm<FieldValues>({
            defaultValues: {
                confirm: 1,


            }
        })



    //triggered anytime 'x' or bg if clicked
    const onChange = (open: boolean) => {
        if (!open) {
            //reset form
            reset();
            deleteModal.onClose();
        }
    }



    //ASYNC onSubmit
    const onSubmit: SubmitHandler<FieldValues> = async (values) => {

        //upload to MySQL
        try {
            setIsLoading(true);




            if (deleteModal.type === 'track') {
                // archive track
                axios.patch('/api/createdTracks', {
                    track_id: deleteModal.id,
                    archive: 1

                }
                ).then(() => {
                    router.refresh();
                    setIsLoading(false);
                    toast.success('Deleted Track')
                    reset();
                    deleteModal.onClose();
                    if (isHomePage) {
                        window.location.href = "/";

                    }
                    else {
                        window.location.href = "/search";

                    }


                })
            }
            else if (deleteModal.type === 'album') {
                // archive album
                axios.patch('/api/album', {
                    album_id: deleteModal.id,
                    archive: 1

                }
                ).then(() => {
                    router.refresh();
                    setIsLoading(false);
                    toast.success('Deleted ALbum')
                    reset();
                    deleteModal.onClose();
                    if (deleteModal.isAdmin) {
                        window.location.href = "/userProfile";

                    }
                    else {
                        window.location.href = "/profile";

                    }


                })


            }
            else if (deleteModal.type === 'playlist') {
                // archive album
                axios.patch('/api/playlistTracks', {
                    playlist_id: deleteModal.id,
                    archive: 1

                }
                ).then(() => {
                    router.refresh();
                    setIsLoading(false);
                    toast.success('Deleted Playlist')
                    reset();
                    deleteModal.onClose();
                    if (deleteModal.isAdmin) {
                        window.location.href = "/userProfile";

                    }
                    else {
                        window.location.href = "/profile";

                    }


                })

            }
            else if (deleteModal.type === 'track from album') {

                //remove track from album
                axios.delete(`/api/albumTracks?track_id=${deleteModal.id}&album_id=${deleteModal.id2}`)
                    .then(() => {

                        router.refresh();
                        setIsLoading(false);
                        toast.success('Removed track from album')
                        reset();
                        deleteModal.onClose();

                        window.location.href = "/tracks";


                    })
                    .catch(Error => console.error(Error))

            }
            else if (deleteModal.type === 'track from playlist') {
                //remove track from album
                axios.delete(`/api/playlistTracks?track_id=${deleteModal.id}&playlist_id=${deleteModal.id2}`)
                    .then(() => {

                        router.refresh();
                        setIsLoading(false);
                        toast.success('Removed track from playlist')
                        reset();
                        deleteModal.onClose();

                        window.location.href = "/tracks";


                    })
                    .catch(Error => console.error(Error))

            }
            else if (deleteModal.type === 'user') {
                // archive album
                axios.patch('/api/user', {
                    user_id: deleteModal.id,
                    archive: 1

                }
                ).then(() => {
                    router.refresh();
                    setIsLoading(false);
                    toast.success('Deleted User')
                    reset();
                    deleteModal.onClose();
                    window.location.href = "/explore";





                })

            }
        }


        catch (error) {
            toast.error("Something went wrong")
        } finally {
            setIsLoading(false);
        }

    }


    return (

        <>
            <div><Toaster /></div>
            <Modal
                title={(deleteModal.remove) ? "Remove " + deleteModal.type : "Delete " + deleteModal.type}
                description={(deleteModal.remove) ? "Do you want to remove " + deleteModal.name + " " + deleteModal.type + "?" : "Do you want to delete " + deleteModal.name + "?"}
                isOpen={deleteModal.isOpen}
                onChange={onChange}

            >
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-y-4 color-white"

                >

                    <Button disabled={isLoading} onClick={() => { reset(); deleteModal.onClose() }} style={{ backgroundColor: 'grey' }}>
                        No
                    </Button>

                    <Button disabled={isLoading} type="submit">
                        Yes
                    </Button>
                </form>
            </Modal >

        </>

    )


}

export default DeleteModal;