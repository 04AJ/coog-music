"use client"

import Header from "@/components/Header";
import ArtistSearchForm from './ArtistSearchForm';
import UserDemographics from './UserDemographics';
import MostLikedSongs from './MostLikedSongs';
import UserCreationActivity from './UserCreationActivity';

export default function AdminPage() {
    
    return (
        <div>
            <Header title="Admin Center" description="Data reports"></Header>
            <div className="flex flex-row space-x-7 my-7">
                <ArtistSearchForm/>
                <MostLikedSongs/>
                <UserCreationActivity/>
            </div>
            <div>
                <UserDemographics/>
            </div>
        </div>
    );
}

//first div's className. I put it down here because it was horrible to look at
/*className="bg-neutral-900/80 flex min-h-screen flex-col 
         before:absolute before:-translate-x-1/2 before:rounded-full
          before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-['']
           after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic
            after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-['']
             before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-red-500
              before:dark:opacity-10 after:dark:from-red-900 after:dark:via-[#0141ff] 
              after:dark:opacity-40 before:lg:h-[360px] z-[-1]"*/
              
//"use client"

// import Header from "@/components/Header";
// import ReactDOM from "react-dom"
// import { useForm, SubmitHandler } from "react-hook-form"
// import DataForm from './DataForm';


// import "./styles.css";

// interface IFormInput {
//     firstName: string;
//     lastName: string;
//     age: number;
//     example: string;
// }

// export default function AdminPage() {
//     return (

//         <div className="">

//             <Header title="Admin Center" description="For admins only"></Header>
//             <div className="my-10">
//                 <DataForm inputOne='swag'/>
//             </div>
//             <div className="my-10">
//                 <DataForm inputOne='idiot name'/>
//             </div>

//         </div>
//     );
// }