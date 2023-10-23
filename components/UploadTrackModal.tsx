"use client"

import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from "react-hot-toast";

import useUploadTrackModal from '@/hooks/useUploadTrackModal'

import Modal from './Modal';
import Input from './Input';
import Button from './Button';
import { PrismaClient } from '@prisma/client';
import { UploadButton } from '@uploadthing/react';
import { OurFileRouter } from '@/app/api/uploadthing/core';
import { error } from 'console';

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

    //prisma client to modify mysql db
    const prisma = new PrismaClient();


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

            const imageFile = values.image?.[0];
            const songFile = values.song?.[0];

            if (!imageFile || !songFile) {
                toast.error('Missing fields');
                return;
            }

            console.log("audio file url is", audio[0]?.fileUrl);
            console.log("img file url is", image[0]?.fileUrl);



        } catch (error) {
            toast.error("Something went wrong")
        } finally {
            setIsLoading(false);
        }

    }

    return (
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
    )
}

export default UploadTrackModal