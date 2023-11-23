"use client"

import Header from "@/components/Header";
import ArtistSearchForm from './ArtistSearchForm';
import UserDemographics from './UserDemographics';
import MostLikedSongs from './MostLikedSongs';
import UserCreationActivity from './UserCreationActivity';
import PopularTracks from './PopularTracks';
import ListenerHabits from './ListenerHabits'
import { useState } from "react";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";

export default function AdminPage() {

    const user = useUser();
    const router = useRouter();
    if (!user.userId) {
        router.push("/login");
    }

    const [showingArtistSearch, setShowingArtistSearch] = useState(false);

    const [showingDemographics, setShowingDemographics] = useState(false);
    const [showingPopularTracks, setShowingPopularTracks] = useState(false);
    const [showingListenerHabits, setShowingListenerHabits] = useState(false);
    const [showingUserCreation, setShowingUserCreation] = useState(false);
    //an embarrassing and shit solution, but im tired
    const showArtistSearch = () => {
        setShowingArtistSearch(true);
        setShowingDemographics(false);

    }
    const showDemographics = () => {
        setShowingDemographics(true);
        setShowingPopularTracks(false);
        setShowingListenerHabits(false);
        setShowingUserCreation(false);

    }
    const showPopularTracks = () => {
        setShowingDemographics(false);
        setShowingPopularTracks(true);
        setShowingListenerHabits(false);
        setShowingUserCreation(false);

    }
    const showListenerHabits = () => {
        setShowingDemographics(false);
        setShowingPopularTracks(false);
        setShowingListenerHabits(true);
        setShowingUserCreation(false);
    }
    const showUserCreation = () => {
        setShowingDemographics(false);
        setShowingPopularTracks(false);
        setShowingListenerHabits(false);
        setShowingUserCreation(true);
    }

    return (
        <div className=" h-screen bg-neutral-900/80">
            <Header title="Admin Center" description=""></Header>
            {/* <div className="my-11">
                <ArtistSearchForm/>
            </div> */}

            <h1 className="flex mt-11 justify-center text-white text-3xl font-semibold">Data Reports</h1>

            <div className="flex my-6 justify-center">
                <button onClick={showDemographics} className="bg-red-500 py-1 px-4 mx-4 text-white hover:bg-red-800 rounded">Demographics of Artist&apos;s Followers</button>
                <button onClick={showPopularTracks} className="bg-red-500 py-1 px-4 mx-4 text-white hover:bg-red-800 rounded">Popular Tracks Based on Artist</button>
                <button onClick={showListenerHabits} className="bg-red-500 py-1 px-4 mx-4 text-white hover:bg-red-800 rounded">Listener Habits</button>
                <button onClick={showUserCreation} className="bg-red-500 py-1 px-4 mx-4 text-white hover:bg-red-800 rounded">User Creation Activity</button>
            </div>

            <div>
                {showingDemographics && <UserDemographics />}
                {showingPopularTracks && <PopularTracks />}
                {showingListenerHabits && <ListenerHabits />}
                {showingUserCreation && <UserCreationActivity />}
            </div>
            <div className='h-[80px]'></div>

        </div>
    );
}

//OLD ADMIN PAGE. keeping here while i remodel
// <div>
//             <Header title="Admin Center" description="hi hello :DDD hiii hii heyy hii"></Header>
//             <div className="flex flex-row space-x-7 my-7">
//                 <ArtistSearchForm/>
//                 {/* <MostLikedSongs/> */}
//                 <UserCreationActivity/>
//             </div>
//             <div className="flex flex-row space-x-7 my-7">
//                 <UserDemographics/>
//                 <ListenerHabits/>
//             </div>
//             <div className="flex flex-row space-x-7 my-7">
//                 <PopularTracks/>
//             </div>
//     </div>