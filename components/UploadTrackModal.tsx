"use client"

import { useState } from 'react';
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from 'next/navigation';
import axios from 'axios';

import useUploadTrackModal from '@/hooks/useUploadTrackModal'

import Modal from './Modal';
import Input from './Input';
import Button from './Button';
import { UploadButton } from '@uploadthing/react';
import { OurFileRouter } from '@/app/api/uploadthing/core';
import { useUser } from '@/hooks/useUser';
import Select from "react-select";




interface trackRequest {
    title: string,
    genre_id: number,
    artist_id: number,
    audio_url: string,
    image_url: string
}



const UploadTrackModal = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [image, setImage] = useState<{
        fileUrl: string;
        fileKey: string;
    }[]>([])
    const [audio, setAudio] = useState<{
        fileUrl: string;
        fileKey: string;
    }[]>([])

    //calling custom hook (allows us to change modal state)
    const uploadModal = useUploadTrackModal();
    const user = useUser();
    const router = useRouter();

    const { register,
        handleSubmit,
        control,
        reset } = useForm<FieldValues>({
            defaultValues: {
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
            uploadModal.onClose();
        }
    }

    //ASYNC onSubmit
    const onSubmit: SubmitHandler<FieldValues> = async (values) => {

        //upload to MySQL
        try {
            setIsLoading(true);

            const title = values.title;
            const genre = values.genre_id;
            const imageFile = values.image?.[0];
            const songFile = values.song?.[0];

            // console.log(title, author, image[0], audio[0]);

            if (!title || !audio[0] || !image[0]) {

                toast.error('Missing fields');
                return;
            }




            // POST REQUEST
            axios.post('/api/upload', {
                title: values.title,
                genre_id: values.genre.value,
                artist_id: user.artistId,
                audio_url: audio[0].fileUrl,
                image_url: image[0].fileUrl
            }
            ).then(() => {
                router.refresh();
                setIsLoading(false);
                toast.success('Track Successfully uploaded!')
                reset();
                uploadModal.onClose();

            })


            // const tracks = postTracks(input);

            router.refresh();
            setIsLoading(false);
            toast.success('Track Successfully uploaded!')
            reset();
            uploadModal.onClose();
            window.location.href = "/";


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
                title='Add a track'
                description='Upload an mp3 and image for your track'
                isOpen={uploadModal.isOpen}
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
                        placeholder="Track title"
                    />



                    <Controller
                        render={({ field }) => (
                            <Select
                                placeholder="Select a genre:"
                                theme={(theme) => ({
                                    ...theme,
                                    borderRadius: 0,
                                    colors: {
                                        ...theme.colors,
                                        primary: 'grey  ',
                                    },

                                })}
                                styles={{
                                    control: (baseStyles, state) => ({
                                        ...baseStyles,
                                        background: 'darkgrey',



                                    }),
                                }}
                                {...field}
                                options={
                                    [
                                        {
                                            value: 1,
                                            label: "hiphop"
                                        },
                                        {
                                            value: 2,
                                            label: "pop"
                                        },
                                        {
                                            value: 3,
                                            label: "country"
                                        },
                                        {
                                            value: 4,
                                            label: "rock"
                                        },
                                        {
                                            value: 5,
                                            label: "indie"
                                        },
                                        {
                                            value: 6,
                                            label: "r&b"
                                        },
                                        {
                                            value: 7,
                                            label: "jazz"
                                        },
                                        {
                                            value: 8,
                                            label: "metal"
                                        },
                                        {
                                            value: 9,
                                            label: "classical"
                                        },
                                        {
                                            value: 10,
                                            label: "funk"
                                        }
                                    ]
                                }
                                isClearable
                            />
                        )}
                        name="genre"
                        control={control}
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

                    <UploadButton<OurFileRouter>
                        className="mt-4 ut-button:bg-red-500/50 ut-button:ut-readying:bg-red-500 ut-button:ut-uploading:bg-red-500/100"

                        endpoint="audioUploader"
                        onClientUploadComplete={(res) => {
                            // Do something with the response
                            if (res) {
                                setAudio(res);
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

export default UploadTrackModal