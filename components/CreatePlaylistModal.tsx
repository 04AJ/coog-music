"use client"

import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import useUploadTrackModal from '@/hooks/useUploadTrackModal'
import { FaCheck } from "react-icons/fa";

import Modal from './Modal';
import Input from './Input';
import Button from './Button';
import useCreatePlaylistModal from '@/hooks/useCreatePlaylistModal';
import { useUser } from '@/hooks/useUser';
import { Icon } from '@mui/material';

interface playlistRequest {
    setUpdate: (i: number) => void;
    update: number;
}

const CreatePlaylistModal: React.FC<playlistRequest> = ({
    setUpdate, update
}) => {
    const [isLoading, setIsLoading] = useState(false);

    const user = useUser();


    //custom hook to change modal visibility  state
    const playlistModal = useCreatePlaylistModal();

    const router = useRouter();

    const { register,
        handleSubmit,
        reset } = useForm<FieldValues>({
            defaultValues: {
                playlistName: ''
            }
        })
    //triggered anytime 'x' or bg if clicked
    const onChange = (open: boolean) => {
        if (!open) {
            //reset form
            reset();
            playlistModal.onClose();
            // window.location.href = "/";

        }
    }


    //ASYNC onSubmit
    const onSubmit: SubmitHandler<FieldValues> = async (values) => {
        //upload to MySQL
        try {
            setIsLoading(true);

            const name = values.name;

            if (!name) {
                toast.error('Missing fields');
                return;
            }



            // POST REQUEST
            axios.post('/api/uploadPlaylist', {
                title: values.name,
                listener_id: user.listenerId

            }
            ).then(() => {
                router.refresh();
                setIsLoading(false);
                toast('Playlist Created! \nGo to Search page and click the + button next to tracks you want added to your playlist',
                    {
                        duration: 10000,
                        position: 'top-center',

                        // Styling
                        style: {
                            background: 'white'
                        },
                        className: '',

                        // Custom Icon
                        icon: <FaCheck color='green' size='3rem' />,

                        // Change colors of success/error/loading icon
                        iconTheme: {
                            primary: 'green',
                            secondary: 'green',
                        },

                        // Aria
                        ariaProps: {
                            role: 'status',
                            'aria-live': 'polite',
                        },
                    }
                );
                reset();
                playlistModal.onClose();
                setUpdate(update + 1);

            })



        } catch (error) {
            toast.error("Something went wrong")
        } finally {
            setIsLoading(false);
        }

    }


    return (

        <>
            <div><Toaster /></div>

            <Modal
                title='Create a playlist'
                description='Add songs to your playlist later'
                isOpen={playlistModal.isOpen}
                onChange={onChange}
            >
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-y-4"
                >
                    <Input
                        id="name"
                        disabled={isLoading}
                        {...register('name', { required: true })}
                        placeholder="Playlist name"
                    />


                    <Button disabled={isLoading} type="submit">
                        Create
                    </Button>
                </form>
            </Modal>
        </>

    )


}

export default CreatePlaylistModal;