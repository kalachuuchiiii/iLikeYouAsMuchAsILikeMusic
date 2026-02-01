import { useAppSelector } from "@src/hooks/useRedux"
import type { JSX } from "react";
import { Navigate } from "react-router-dom";


export const AuthGuard = ({ children }:{children: JSX.Element}) => {
    const { user, accessToken, isSessionPending } = useAppSelector(state => state.auth);
 
    if(isSessionPending){
        return <></>
    }
    return (!!accessToken && user?.username && !isSessionPending) ? children : <Navigate to={'/sign-in'} />
}