"use client";

import qs from "query-string";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import useDebounce from "@/hooks/useDebounce";

import Input from "./Input";

interface props {
    setUpdate: (i: number) => void,
    update: number

}

const SearchInput: React.FC<props> = ({
    setUpdate,
    update

}) => {
    const router = useRouter();
    const [value, setValue] = useState<string>('');
    const debouncedValue = useDebounce<string>(value, 500);

    useEffect(() => {
        const query = {
            title: debouncedValue,
        };

        const url = qs.stringifyUrl({
            url: '/search',
            query
        });

        router.push(url);
    }, [debouncedValue, router, update]);

    return (

        <Input
            placeholder="What do you want to listen to?"
            value={value}
            onChange={(e) => setValue(e.target.value)}
        />

    );
}

export default SearchInput;