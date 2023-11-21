"use client";

import { PrismaClient } from "@prisma/client";
import { useUser } from "@/hooks/useUser";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Track } from "@/types";
import Carousel from "./Carousel";

const LikedTracks = () => {
  const user = useUser();
  const router = useRouter();

  const [likedTracks, setLikedTracks] = useState<Track[]>();
  //CAREFUL: setting state inside useEffect = infinite loop. Need to use dependency array[]


  //consume likedTracks api endpoint
  useEffect(() => {

    if (user.userRole !== 'admin') {
      axios
        .get<Track[]>(`/api/likedTracks?user_id=${user.userId}`)
        .then((response) => {
          if (response.data) {
            setLikedTracks(response.data);
          }
        })
        .catch((error) => {
          alert("error fetching data");
        });
    }

  }, [user.userId]);

  if (user.userRole === 'admin') {
    return null;
  }

  return (
    <div>


      {likedTracks ?
        <div >
          <h1 className="text-2xl mt-5">
            Liked Tracks
          </h1>
          <Carousel tracks={likedTracks} albums={[]} />
        </div>

        : null}
    </div>
  );
};

export default LikedTracks;
