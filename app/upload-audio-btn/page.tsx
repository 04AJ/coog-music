"use client";

import Image from "next/image";
import { UploadDropzone, Uploader } from "../../src/utils/uploadthing";
import { useState } from "react";
import Link from "next/link";

export default function Home() {
    const [tracks, setTracks] = useState<{
        fileUrl: string;
        fileKey: string;
    }[]>([])

    const tile = tracks.length ? (
        <>
            <p>Upload Complete</p>
            <p className="mt-2">{tracks.length} files</p>
        </>
    ) : null;

    const audioList = (
        <>
            {tile}
            <ul>
                {tracks.map(track => (
                    <li key={track.fileUrl} className="mt">

                        <audio controls src={track.fileUrl} />
                    </li>
                ))}
            </ul>
        </>
    )

    return (
        <main className="flex min-h-screen flex-col items-center justify-start p-24">
            <UploadDropzone
                endpoint="audioUploader"
                onClientUploadComplete={(res) => {
                    // Do something with the response
                    if (res) {
                        setTracks(res);
                        const json = JSON.stringify(res);
                        console.log(json);

                    }
                    // alert("Upload Completed");
                }}
                onUploadError={(error: Error) => {
                    // Do something with the error.
                    alert(`ERROR! ${error.message}`);
                }}
            />
            {audioList}
        </main>
    );
}