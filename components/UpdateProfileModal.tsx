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
import useUpdateProfileModal from '@/hooks/useUpdateProfileModal';
import { useUser } from '@/hooks/useUser';
import { User } from '@/types';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { FormControl, InputLabel } from '@mui/material';



interface UpdateProfileProps {
    user_info: User
}

const UpdateProfileModal: React.FC<UpdateProfileProps> = ({
    user_info
}) => {

    const [isLoading, setIsLoading] = useState(false);

    const user = useUser();


    //custom hook to change modal visibility  state
    const profileModal = useUpdateProfileModal();

    const router = useRouter();

    const { register,
        handleSubmit,
        control,
        reset } = useForm<FieldValues>({
            defaultValues: {
                gender: user_info.gender_name,
                race: user_info.race_name,
                ethnicity: user_info.ethnicity_name
            }
        })
    //triggered anytime 'x' or bg if clicked
    const onChange = (open: boolean) => {
        if (!open) {
            //reset form
            reset();
            profileModal.onClose();
        }
    }

    const handleChange = (event: SelectChangeEvent) => {
    };


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



            // PATCH REQUEST
            axios.patch('/api/signup', {
                userId: user_info.user_id,
                birthdate: values.birthdate,
                race_id: values.race,
                ethnicity_id: values.ethnicity,
                gender_id: values.gender

            }
            ).then(() => {
                router.refresh();
                setIsLoading(false);
                toast.success('Playlist Created!')
                reset();
                profileModal.onClose();


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
                title='Update your profile'
                description='Change the following attributes to your profile'
                isOpen={profileModal.isOpen}
                onChange={onChange}
            >
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-y-4 color-white"
                >



                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                        <Controller
                            render={({ field }) => (
                                <Select {...field}
                                    onChange={handleChange}
                                >
                                    <MenuItem value={1}>male</MenuItem>
                                    <MenuItem value={2}>female</MenuItem>
                                </Select>
                            )}
                            name="gender"
                            control={control}

                        />
                    </FormControl>
                    <FormControl fullWidth>

                        <InputLabel id="demo-simple-select-label">Race</InputLabel>
                        <Controller
                            render={({ field }) => (
                                <Select {...field}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                >
                                    <MenuItem value={1}>white</MenuItem>
                                    <MenuItem value={2}>black</MenuItem>
                                    <MenuItem value={3}>asian</MenuItem>
                                    <MenuItem value={4}>american indian</MenuItem>
                                    <MenuItem value={5}>hispanic</MenuItem>

                                </Select>
                            )}
                            name="race"
                            control={control}
                        />
                    </FormControl>


                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Ethnicity</InputLabel>
                        <Controller
                            render={({ field }) => (
                                <Select {...field}>
                                    <MenuItem value={1}>asian</MenuItem>
                                    <MenuItem value={2}>hispanic</MenuItem>
                                    <MenuItem value={3}>african american</MenuItem>
                                    <MenuItem value={4}>white</MenuItem>
                                </Select>
                            )}
                            name="ethnicity"
                            control={control}
                        />

                    </FormControl>


                    <Button disabled={isLoading} type="submit">
                        Update
                    </Button>
                </form>
            </Modal>
        </>

    )


}

export default UpdateProfileModal;