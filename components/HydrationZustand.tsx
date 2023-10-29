"use client"

import { useEffect, useState } from "react"
//Fixing hydration error w/ persistent storage
interface ZustandProps {
    children: React.ReactNode
}

const HydrationZustand: React.FC<ZustandProps> = ({
    children
}) => {
    const [isHydrated, setIsHydrated] = useState(false)

    // Wait till Next.js rehydration completes
    useEffect(() => {
        setIsHydrated(true)
    }, [])

    return <>{isHydrated ? <div>{children}</div> : null}</>
}

export default HydrationZustand