"use client"

import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import useUploadTrackModal from '@/hooks/useUploadTrackModal'

import Modal from './Modal';
import Input from './Input';
import Button from './Button';
import useCreatePlaylistModal from '@/hooks/useCreatePlaylistModal';
import { useUser } from '@/hooks/useUser';

interface playlistRequest {
    playlistName: string,
    listenerId: number

}

const CreatePlaylistModal = () => {
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
            axios.post('/api/playlist', {
                playlistName: values.name,
                listenerId: user.listenerId

            }
            ).then(() => {
                router.refresh();
                setIsLoading(false);
                toast.success('Playlist Created!')
                reset();
                playlistModal.onClose();


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