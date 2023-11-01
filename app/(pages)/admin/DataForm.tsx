"use client"
import { useForm, SubmitHandler } from "react-hook-form"



export default function DataForm() {
    
    interface IFormInput {
        inputOne: string;
        lastName: string;
        age: number;
        example: string;
    }
    
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm<IFormInput>();

    const onSubmit = (data: IFormInput) => {
        alert("Hello! " + data.inputOne)
        alert(JSON.stringify(data));
    }; // your form submit function which will invoke after successful validation

    

    return (

        <div className="">
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>First name</label>
                <input
                    {...register("inputOne", {
                        required: true,
                        maxLength: 20,
                        pattern: /^[A-Za-z]+$/i
                    })}
                />
                {errors?.inputOne?.type === "required" && <p>This field is required</p>}
                {errors?.inputOne?.type === "maxLength" && (
                    <p>First name cannot exceed 20 characters</p>
                )}
                {errors?.inputOne?.type === "pattern" && (
                    <p>Alphabetical characters only</p>
                )}
                <label>Last Name</label>
                <input {...register("lastName", { pattern: /^[A-Za-z]+$/i })} />
                {errors?.lastName?.type === "pattern" && (
                    <p>Alphabetical characters only</p>
                )}
                <label>Age</label>
                <input {...register("age", { min: 18, max: 99 })} />
                {errors.age && (
                    <p>You Must be older then 18 and younger then 99 years old</p>
                )}
                <input type="submit" />
            </form>
        </div>
    );
}