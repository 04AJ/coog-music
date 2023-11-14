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
import { Box, FormControl, InputLabel, NativeSelect } from '@mui/material';



interface UpdateProfileProps {
    user_info: User
}

const UpdateProfileModal: React.FC<UpdateProfileProps> = ({
    user_info
}) => {

    const [isLoading, setIsLoading] = useState(false);

    const user = useUser();

    // creating maps 
    const genderMap = new Map([
        ["male", 1],
        ["female", 2]
    ])

    const raceMap = new Map([
        ["white", 1],
        ["black", 2],
        ["asian", 3],
        ["a. indian", 4],
        ["hispanic", 5]
    ])

    const ethnicityMap = new Map([
        ["asian", 1],
        ["hispanic", 2],
        ["african american", 3],
        ["white", 4]
    ])

    //custom hook to change modal visibility  state
    const profileModal = useUpdateProfileModal();

    const router = useRouter();

    const { register,
        handleSubmit,
        control,
        reset } = useForm<FieldValues>({
            defaultValues: {
                gender: genderMap.get(user_info.gender_name.toLowerCase()),
                race: raceMap.get(user_info.race_name.toLowerCase()),
                ethnicity: ethnicityMap.get(user_info.ethnicity_name.toLowerCase())
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



    //ASYNC onSubmit
    const onSubmit: SubmitHandler<FieldValues> = async (values) => {
        //upload to MySQL
        try {
            setIsLoading(true);

            const gender = values.gender;
            const race = values.race;
            const ethnicity = values.ethnicity;


            if (!gender || !race || !ethnicity) {
                toast.error('Missing fields');
                return;
            }




            // PATCH REQUEST
            axios.patch('/api/signup', {
                userId: user_info.user_id,
                race_id: race,
                ethnicity_id: ethnicity,
                gender_id: gender

            }
            ).then(() => {
                router.refresh();
                setIsLoading(false);
                toast.success('Updated Profile')
                reset();
                profileModal.onClose();
                window.location.href = "/profile";


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
                        <InputLabel variant="standard" htmlFor="uncontrolled-native" sx={{ color: 'white' }}>Gender</InputLabel>
                        <Controller

                            render={({ field }) => (
                                <NativeSelect {...field}
                                    sx={{ color: 'grey' }}
                                    inputProps={{
                                        name: 'gender',
                                        id: 'uncontrolled-native',
                                    }}
                                >
                                    <option value={1} style={{ color: 'black' }}>male</option>
                                    <option value={2} style={{ color: 'black' }}>female</option>

                                </NativeSelect>
                            )}
                            name="gender"
                            control={control}

                        />
                    </FormControl>




                    <FormControl fullWidth>
                        <InputLabel variant="standard" htmlFor="uncontrolled-native" sx={{ color: 'white' }}>Race</InputLabel>
                        <Controller

                            render={({ field }) => (
                                <NativeSelect {...field}
                                    sx={{ color: 'grey' }}
                                    inputProps={{
                                        name: 'race',
                                        id: 'uncontrolled-native',
                                    }}
                                >
                                    <option value={1} style={{ color: 'black' }}>white</option>
                                    <option value={2} style={{ color: 'black' }}>black</option>
                                    <option value={3} style={{ color: 'black' }}>asian</option>
                                    <option value={4} style={{ color: 'black' }}>american indian</option>
                                    <option value={5} style={{ color: 'black' }}>hispanic</option>


                                </NativeSelect>
                            )}
                            name="race"
                            control={control}

                        />
                    </FormControl>






                    <FormControl fullWidth>
                        <InputLabel variant="standard" htmlFor="uncontrolled-native" sx={{ color: 'white' }}>Ethnicity</InputLabel>
                        <Controller

                            render={({ field }) => (
                                <NativeSelect {...field}
                                    sx={{ color: 'grey' }}
                                    inputProps={{
                                        name: 'ethnicity',
                                        id: 'uncontrolled-native',
                                    }}
                                >
                                    <option value={1} style={{ color: 'black' }}>asian</option>
                                    <option value={2} style={{ color: 'black' }}>hispanic</option>
                                    <option value={3} style={{ color: 'black' }}>african american</option>
                                    <option value={4} style={{ color: 'black' }}>white</option>


                                </NativeSelect>
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