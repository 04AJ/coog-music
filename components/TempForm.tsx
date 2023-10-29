"use client"
import { useUser } from "@/hooks/useUser";

const TempForm = () => {
    const user = useUser();



    return (

        <div>
            <button onClick={() => {
                user.setUserId(2);
                user.setUserRole('admin')
            }}>Click Me</button>
            <div>User ID is {user.userId}</div>
            <div>User Role is {user.userRole}</div>

        </div>
    )
}

export default TempForm;