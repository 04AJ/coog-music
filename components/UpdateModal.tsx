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
import { useUpdateModal } from '@/hooks/useUpdateModal.tsx';




interface UpdateModalProps {
    isHomePage: Boolean
    setUpdate: (i: number) => void;
    update: number;
}

const UpdateModal: React.FC<UpdateModalProps> = ({
    isHomePage, setUpdate, update
}) => {


    const [isLoading, setIsLoading] = useState(false);
    const user = useUser();
    const updateModal = useUpdateModal();





    //custom hook to change modal visibility  state

    const router = useRouter();

    const { register,
        handleSubmit,
        control,
        reset } = useForm<FieldValues>({
            defaultValues: {
                // title: updateModal.name,
                // genre: updateModal.genre,

            }
        })



    //triggered anytime 'x' or bg if clicked
    const onChange = (open: boolean) => {
        if (!open) {
            //reset form
            reset();
            updateModal.onClose();
        }
    }



    //ASYNC onSubmit
    const onSubmit: SubmitHandler<FieldValues> = async (values) => {

        //upload to MySQL
        try {
            setIsLoading(true);

            const title = values.title;
            let genre = values.genre;

            if (updateModal.type !== 'track') {
                genre = '';
            }

            if (!title) {
                toast.error('Missing updated title');
                return;
            }
            if (!genre) {
                toast.error('Missing updated genre');
                return;
            }

            if (updateModal.type === 'track') {
                // Patch tracks
                axios.patch(`/api/upload?track_id=${updateModal.id}&track_name=${title}&genre_id=${genre}`)
                    .then(() => {
                        router.refresh();
                        setIsLoading(false);
                        toast.success('Track Successfully updated!')
                        reset();
                        updateModal.onClose();
                        if (isHomePage) {
                            // window.location.href = "/";
                            setUpdate(update + 1);

                        }
                        else {
                            window.location.href = "/search";

                        }


                    })
            }
            else if (updateModal.type === 'album') {
                // Patch album
                axios.patch(`/api/uploadAlbum?album_id=${updateModal.id}&album_name=${title}`)
                    .then(() => {
                        router.refresh();
                        setIsLoading(false);
                        toast.success('Album Successfully updated!')
                        reset();
                        updateModal.onClose();
                        if (updateModal.isAdmin) {
                            // window.location.href = "/userProfile";
                            router.push("/userProfile");

                        }
                        else {
                            router.push("/profile");
                            // window.location.href = "/profile";

                        }


                    })

            }
            else if (updateModal.type === 'playlist') {
                // Patch playlist
                axios.patch(`/api/uploadPlaylist?playlist_id=${updateModal.id}&playlist_name=${title}`)
                    .then(() => {
                        router.refresh();
                        setIsLoading(false);
                        toast.success('Playlist Successfully updated!')
                        reset();
                        updateModal.onClose();
                        if (updateModal.isAdmin) {
                            // window.location.href = "/userProfile";
                            router.push("/userProfile");

                        }
                        else {
                            router.push("/profile");
                            // window.location.href = "/profile";

                        }

                    })
            }


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
                title={"Update " + updateModal.type}
                description='Modify the following attributes:'
                isOpen={updateModal.isOpen}
                onChange={onChange}
            >
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-y-4 color-white"

                >
                    <div>
                        <Input
                            className='mb-1'
                            id="title"
                            disabled={isLoading}
                            {...register('title')}
                            placeholder={updateModal.name}
                        />

                        <div style={{ display: (updateModal.type === 'track') ? 'block' : 'none' }}>
                            <FormControl fullWidth>
                                <InputLabel variant="standard" htmlFor="uncontrolled-native" sx={{ color: 'white' }}>Genre</InputLabel>
                                <Controller

                                    render={({ field }) => (
                                        <NativeSelect {...field}
                                            defaultValue={updateModal.genre}
                                            sx={{ color: 'grey' }}
                                            inputProps={{
                                                name: 'genre',
                                                id: 'uncontrolled-native',
                                            }}
                                        >
                                            <option value={1} style={{ color: 'black' }}>hiphop</option>
                                            <option value={2} style={{ color: 'black' }}>pop</option>
                                            <option value={3} style={{ color: 'black' }}>country</option>
                                            <option value={4} style={{ color: 'black' }}>rock</option>
                                            <option value={5} style={{ color: 'black' }}>indie</option>
                                            <option value={6} style={{ color: 'black' }}>r&b</option>
                                            <option value={7} style={{ color: 'black' }}>jazz</option>
                                            <option value={8} style={{ color: 'black' }}>metal</option>
                                            <option value={9} style={{ color: 'black' }}>classical</option>
                                            <option value={10} style={{ color: 'black' }}>funk</option>


                                        </NativeSelect>
                                    )}
                                    name="genre"
                                    control={control}

                                />
                            </FormControl>



                        </div>


                    </div>



                    <Button disabled={isLoading} type="submit">
                        Update
                    </Button>
                </form>
            </Modal >
        </>

    )


}

export default UpdateModal;