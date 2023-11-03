"use client"

import { twMerge } from "tailwind-merge";

interface HeaderProps {
    title: string,
    description: string,
    children?: React.ReactNode;

}

const Header: React.FC<HeaderProps> = ({
    title,
    description,
    children,
}) => {
    return (
        <div className="text-center">
            <h1 className="
            text-white
            text-6xl font-semibold
            ">{title}</h1>
            <h2>{description}</h2>
            {children}
        </div>

    )
}

export default Header