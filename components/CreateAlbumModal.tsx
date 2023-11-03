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
import { UploadButton } from '@uploadthing/react';
import { OurFileRouter } from '@/app/api/uploadthing/core';
import useCreateAlbumModal from '@/hooks/useCreateAlbumModal';
import { useUser } from '@/hooks/useUser';



interface albumRequest {
    title: string,
    artist_id: number,
    image_url: string
}


const CreateAlbumModal = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [image, setImage] = useState<{
        fileUrl: string;
        fileKey: string;
    }[]>([])

    //calling custom hook (allows us to change modal state)
    const albumModal = useCreateAlbumModal();
    const user = useUser();
    const router = useRouter();

    const { register,
        handleSubmit,
        reset } = useForm<FieldValues>({
            defaultValues: {
                artist: '',
                title: '',
                song: null,
                image: null,
            }
        })


    //triggered anytime 'x' or bg if clicked
    const onChange = (open: boolean) => {
        if (!open) {
            //reset form
            reset();
            albumModal.onClose();
        }
    }

    //ASYNC onSubmit
    const onSubmit: SubmitHandler<FieldValues> = async (values) => {
        //upload to MySQL
        try {
            setIsLoading(true);

            const title = values.title;
            const imageFile = values.image?.[0];

            // console.log(title, author, image[0], audio[0]);

            if (!title || !image[0]) {

                toast.error('Missing fields');
                return;
            }


            // POST REQUEST
            axios.post('/api/uploadAlbum', {
                title: values.title,
                artist_id: user.artistId,
                image_url: image[0].fileUrl
            }
            ).then(() => {
                router.refresh();
                setIsLoading(false);
                toast.success('Album Successfully created!')
                reset();
                albumModal.onClose();

            })


            // const tracks = postTracks(input);

            // router.refresh();
            // setIsLoading(false);
            // toast.success('Track Successfully uploaded!')
            // reset();
            // uploadModal.onClose();


        } catch (error) {
            toast.error("Something went wrong")
        } finally {
            setIsLoading(false);
            // setImage([]);
            // setAudio([]);
        }

    }

    return (

        <>
            <div><Toaster /></div>

            <Modal
                title='Create an Album'
                description='Upload an album cover'
                isOpen={albumModal.isOpen}
                onChange={onChange}
            >
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-y-4"
                >
                    <Input
                        id="title"
                        disabled={isLoading}
                        {...register('title', { required: true })}
                        placeholder="Album title"
                    />



                    <UploadButton<OurFileRouter>
                        className="mt-4 ut-button:bg-red-500/50 ut-button:ut-readying:bg-red-500 ut-button:ut-uploading:bg-red-500/100"
                        endpoint="imageUploader"
                        onClientUploadComplete={(res) => {
                            // Do something with the response
                            if (res) {
                                setImage(res);
                                const json = JSON.stringify(res);
                                console.log(json);

                            }
                        }}
                        onUploadError={(error: Error) => {
                            // Do something with the error.
                            alert(`ERROR! ${error.message}`);
                        }}

                    />


                    <Button disabled={isLoading} type="submit">
                        Create
                    </Button>
                </form>
            </Modal>
        </>

    )
}

export default CreateAlbumModal