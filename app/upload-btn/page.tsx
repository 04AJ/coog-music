"use client";

import Image from "next/image";
import { UploadDropzone, Uploader } from "../../src/utils/uploadthing";
import { useState } from "react";
import Link from "next/link";

export default function Home() {
    const [images, setImages] = useState<{
        fileUrl: string;
        fileKey: string;
    }[]>([])

    const tile = images.length ? (
        <>
            <p>Upload Complete</p>
            <p className="mt-2">{images.length} files</p>
        </>
    ) : null;

    const imgList = (
        <>
            {tile}
            <ul>
                {images.map(image => (
                    <li key={image.fileUrl} className="mt">
                        {/* <Link href={image.fileUrl} target="_blank">
                            {image.fileUrl}
                        </Link> */}
                        <img src={image.fileUrl} alt="uploaded img" width={500}
                            height={500}
                        />
                    </li>
                ))}
            </ul>
        </>
    )

    return (
        <main className="flex min-h-screen flex-col items-center justify-start p-24">
            <UploadDropzone
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                    // Do something with the response
                    if (res) {
                        setImages(res);
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
            {imgList}
        </main>
    );
}