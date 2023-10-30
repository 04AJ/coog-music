
import Button from "@/components/Button";
import Header from "@/components/Header";
import './admin.css';

export default function AdminPage() {
    
    return (
        <div>
            <Header title="Admin Center" description="Data reports"></Header>
            <div>
                <h1 className="text-3xl text-white font-semibold mt-5">going to blow my brains out </h1>
                <button type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 my-10">
                    Artist Activity
                </button>

            </div>
        </div>
    )
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