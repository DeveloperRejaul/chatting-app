import { createContext, useContext,  useState, type ReactNode } from "react";

interface IUserData {
    isLogin:boolean,
    token:string,
    name:string;
    email:string;
    id:string
}
interface IContext {
    setUserData: React.Dispatch<React.SetStateAction<IUserData>>
    userData:IUserData
}


export const AuthContext = createContext<IContext>({} as IContext)

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider ({children}:Readonly<{children:ReactNode}>) {
    const [userData, setUserData] = useState<IUserData>({
        isLogin:false,
        token:"",
        name:"",
        email:"",
        id:""
    } as IUserData);

    return <AuthContext.Provider value={{userData, setUserData}}>{children}</AuthContext.Provider>
}

