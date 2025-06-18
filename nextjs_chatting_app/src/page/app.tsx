import { useEffect, useRef, useState } from "react";
import { BASE_URL } from "../constance/secret";
import Intro from "../components/intro";
import {io, Socket} from 'socket.io-client'
import { useAuth } from "../provider/AuthProvider";
import FileIcon from "../assets/file-icon";
import { downloadFile } from "../utils/files";


type Message = {
  sender: "Me" | "Them";
  text: string;
  files?: File[]
};
interface IReceiveDataType  {
  message:string,
  id:number, 
  senderId:number,
  files?:File[]
}
export default function App() {
  const [isLoading,setIsLoading] = useState(false);
  const [users, setUsers] = useState<{id:number, name:string}[]>([])
  const [chats, setChats] = useState<Record<number, Message[]>>({});
  const [selectedUser, setSelectedUser] = useState<{name:string, id:number} | null>(null);
  const {userData} = useAuth();
  const [files, setFiles] = useState<File[]>([] as File[]);
  const socket = useRef<Socket | null>(null);
  const attestmentRef = useRef<HTMLInputElement|null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null);


  useEffect(()=>{
    // connect socket
    if(!socket.current) {
      socket.current = io(BASE_URL, {
        transports: ["websocket"],
        auth:{token: userData.token}
      })
    }

    const handleConnect = () => {
      console.log("user connect");
    }
    const handleDisconnect = () => {
      console.log("user disconnect");
    }

    // receive data
    const handleReceiveMessage = (data:IReceiveDataType) => {
      const newMessage: Message = { sender: "Them", text: data.message , files: data.files};
      setChats((prev) => ({
        ...prev,
        [data.senderId]: [...(prev[data.senderId] || []), newMessage],
      }));
    }

    // socket listeners
    socket.current.on("connect", handleConnect)
    socket.current.on("disconnect", handleDisconnect)
    socket.current.on("send",handleReceiveMessage )


   // get users
   const getUsers=async()=>{
    try {
      setIsLoading(true)
      const res = await fetch(`${BASE_URL}/users`);
      const result = await res.json()
      setUsers(result)
      setIsLoading(false)
    } catch (error) {
      console.log(error);
    }
   }
   getUsers()

   return () =>{
    socket.current?.off("connect", handleConnect)
    socket.current?.off("disconnect", handleDisconnect)
    socket.current?.off("send", handleReceiveMessage)
   }
  },[])


  // send data
  const handleSend = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const data = formData.get('input')?.toString().trim();
  
      const processedFiles = await Promise.all(
        files.map((file) => {
          return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = () => {
              resolve({
                name: file.name,
                type: file.type,
                size: file.size,
                data: reader.result,
              });
            };
            reader.readAsDataURL(file);
          });
        })
      );
    

      if(!data) return
      const newMessage: Message = { sender: "Me", text: data.trim() , files:processedFiles as File[]};
      socket.current?.emit("send", {message: data.trim(), id: selectedUser?.id, senderId:userData?.id || "", files:processedFiles})
  
      if(selectedUser?.id) {
        setChats((prev) => ({
          ...prev,
          [selectedUser?.id]: [...(prev[selectedUser?.id] || []), newMessage],
        }));
        if(fileInputRef.current){
          fileInputRef.current.value = ""
        }
        setFiles([])
      }
    } catch (error) {
      console.log(error);
    }
  };

  const messages = selectedUser?.id?  chats[selectedUser?.id] || [] : []

  if(isLoading) return <h1>Loading...</h1>
  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* User List */}
      <div className="md:w-1/3 lg:w-1/4 bg-gray-100 border-r overflow-y-auto">
        <h2 className="text-xl font-semibold p-4 border-b">Users</h2>
        <ul>
          {users.filter(u=> u.name !== userData.name).map((user) => (
            <li
              key={user?.id}
              onClick={() => setSelectedUser(user)}
              className={`p-4 cursor-pointer hover:bg-gray-200 ${selectedUser?.id === user?.id ? "bg-gray-300" : ""}`}
            >
              {user?.name}
            </li>
          ))}
        </ul>
      </div>

      
      {/* Chat Area */}

     {selectedUser ?  <div className="flex-1 flex flex-col">
        <div className="flex justify-between items-center border-b p-4 bg-white shadow">
          <h2 className="text-xl font-semibold">{selectedUser?.name}</h2>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`max-w-xs p-3 rounded-lg ${
                msg.sender === "Me"
                  ? "ml-auto bg-blue-500 text-white"
                  : "mr-auto bg-gray-300 text-black"
              }`}
            >
              {msg.text}
              {msg.files && msg.files.map(f=> <p onClick={()=>{
                if(msg.sender === "Them"){
                  downloadFile({name:f.name, type:f.type, data:f.data})
                }
              }}>{f.name}</p>)}
            </div>
          ))}
        </div>

        {/* input part  */}
        <form
          className="flex p-4 border-t bg-white"
          onSubmit={handleSend}
        > 
          <input 
           type="file" 
           name="image" 
           id="image" 
           className="opacity-0 hidden"
           ref={attestmentRef}
           onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (file) {
              setFiles(pre=>[...pre, file])
            }
          }}
          />
          {/* Abetments */}
          <div className="flex justify-center items-center px-2">
            <FileIcon size={30} color="#0251c7" className="cursor-pointer" onClick={() => attestmentRef.current?.click()}/>
          </div>
          <div className="border flex flex-1 rounded-lg overflow-hidden">
            <div className="p-2">
              {files.map((f)=><div>{f.name}</div>)}
            </div>
            <input
              type="text"
              placeholder={`Message ${selectedUser?.name}`}
              className="flex flex-1 px-4 py-2 focus:outline-none"
              name="input"
              ref={fileInputRef}
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 rounded-r hover:bg-blue-600"
            >
              Send
            </button>
          </div>
        </form>
      </div> : <Intro/>}
    </div>
  );
}