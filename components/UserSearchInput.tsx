"use client";

import qs from "query-string";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import useDebounce from "@/hooks/useDebounce";

import Input from "./Input";

const UserSearchInput = () => {
    const router = useRouter();
    const [value, setValue] = useState<string>('');
    const debouncedValue = useDebounce<string>(value, 500);

    useEffect(() => {
        const query = {
            title: debouncedValue,
        };

        const url = qs.stringifyUrl({
            url: '/explore',
            query
        });

        router.push(url);
    }, [debouncedValue, router]);

    return (
        <Input
            placeholder="Who do you want to search?"
            value={value}
            onChange={(e) => setValue(e.target.value)}
        />
    );
}

export default UserSearchInput;