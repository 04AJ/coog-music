"use client"
import Header from "@/components/Header";
import UserDetails from "@/components/UserDetails";
import { useUser } from "@/hooks/useUser";


export default function ProfilePage() {
    const user = useUser();

    return (
        <div className="bg-neutral-900/80 flex min-h-screen flex-col items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-red-500 before:dark:opacity-10 after:dark:from-red-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">

            <Header title="Profile" description="User Details"></Header>
            <div>UserID: {user.userId}</div>
            <div>UserRole: {user.userRole}</div>
            {(user.listenerId) ? <p>ListenerID: {user.listenerId}</p> : <p>ListenerID: null</p>}
            <UserDetails user={null} />

            <button className="border" onClick={() => { user.setUserId(4); user.setListenerId(3); user.setUserRole("listener") }
            }>Click me</button>
        </div >
    )
}