import { type ReactNode } from 'react'
import { useAuth } from '../provider/AuthProvider';
import { Navigate } from 'react-router';

export default function Protector({children}:Readonly<{children:ReactNode}>) {
    const {userData:{isLogin}} = useAuth();

    if(!isLogin) {
        return <Navigate to={"/login"}/>
    } 
    if(isLogin) return children
 
}
