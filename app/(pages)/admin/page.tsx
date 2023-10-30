"use client"

import Header from "@/components/Header";
import ReactDOM from "react-dom"
import { useForm, SubmitHandler } from "react-hook-form"


import "./styles.css";

interface IFormInput {
    firstName: string;
    lastName: string;
    age: number;
    example: string;
}

export default function AdminPage() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm<IFormInput>();

    const onSubmit = (data: IFormInput) => {
        alert("Hello! " + data.firstName)
        alert(JSON.stringify(data));
    }; // your form submit function which will invoke after successful validation

    console.log(watch("example")); // you can watch individual input by pass the name of the input

    return (

        <div className="bg-neutral-900/80 flex min-h-screen flex-col items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-red-500 before:dark:opacity-10 after:dark:from-red-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">

            <Header title="Admin Center" description="For admins only"></Header>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>First Name</label>
                <input
                    {...register("firstName", {
                        required: true,
                        maxLength: 20,
                        pattern: /^[A-Za-z]+$/i
                    })}
                />
                {errors?.firstName?.type === "required" && <p>This field is required</p>}
                {errors?.firstName?.type === "maxLength" && (
                    <p>First name cannot exceed 20 characters</p>
                )}
                {errors?.firstName?.type === "pattern" && (
                    <p>Alphabetical characters only</p>
                )}
                <label>Laste Name</label>
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

