"use client"

import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Toaster, toast } from "react-hot-toast";

import useUploadTrackModal from '@/hooks/useUploadTrackModal'

import Modal from './Modal';
import Input from './Input';
import Button from './Button';
import { PrismaClient } from '@prisma/client';
import { UploadButton } from '@uploadthing/react';
import { OurFileRouter } from '@/app/api/uploadthing/core';
import { error } from 'console';

const axios = require('axios');

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

    // const makeApiCall = async () => {
    //     await fetch('/api/upload', {
    //         method: 'POST'
    //     })
    // }


    //react hook form
    const { register,
        handleSubmit,
        reset } = useForm<FieldValues>({
            defaultValues: {
                author: '',
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
            const author = values.author;
            const imageFile = values.image?.[0];
            const songFile = values.song?.[0];

            if (!title || !author || !audio[0] || !image[0]) {
                alert("Failed")
                toast.error('Missing fields');
                return;
            }


            //POST REQUEST
            axios.post('/api/upload', {
                title: values.title,
                artist: values.artist,
                audio_url: audio[0].fileUrl,
                image_url: image[0].fileUrl
            }
            ).then(() => {
                toast.success('Successfully uploaded!')

            })


        } catch (error) {
            toast.error("Something went wrong")
        } finally {
            setIsLoading(false);
            setImage([]);
            setAudio([]);
        }

    }

    return (

        <>
            <div><Toaster /></div>

            <Modal
                title='Add a track'
                description='Upload an mp3 file'
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
                        placeholder="Song title"
                    />
                    <Input
                        id="author"
                        disabled={isLoading}
                        {...register('author', { required: true })}
                        placeholder="Song author"
                    />
                    {/* <div>
            <div className="pb-1">
                Select a song file
            </div>
            <Input
                placeholder="test"
                disabled={isLoading}
                type="file"
                accept=".mp3"
                id="song"
                {...register('song', { required: true })}
            />
        </div>
        <div>
            <div className="pb-1">
                Select an image
            </div>
            <Input
                placeholder="test"
                disabled={isLoading}
                type="file"
                accept="image/*"
                id="image"
                {...register('image', { required: true })}
            />
        </div> */}

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