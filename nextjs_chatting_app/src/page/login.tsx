import { useState } from "react";
import Button from "../components/button";
import { BASE_URL } from "../constance/secret";
import { useAuth } from "../provider/AuthProvider";
import { useNavigate } from "react-router";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false)
  const {setUserData} = useAuth()
  const navigate = useNavigate()
  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const formData = new FormData(e.currentTarget);
      const email = formData.get('email');
      const password = formData.get('password');

      setIsLoading(true)
      const res = await fetch(`${BASE_URL}/login`, {
        method:"POST",
        headers: {
          "Content-Type": "application/json"
        },
        body:JSON.stringify({email, password})
      })
      
      if(res.ok){
        const result = await res.json()
        setUserData({isLogin: true, token: result?.token || "", email: result?.email||"", name: result?.name || "", id: result?.id || ""})
        navigate("/");
      }
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.log(error);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <form className="bg-white p-6 rounded shadow-md w-full max-w-sm space-y-4" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          Email
        </label>
        <input
          id="email"
          type="email"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter your email"
          required
          name="email"
          autoComplete="current-email"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium mb-1">
          Password
        </label>
        <input
          id="password"
          type="password"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter your password"
          required
          name="password"
          autoComplete="current-password"
        />
      </div>
      <Button text="Login" isLoading={isLoading}/>
    </form>
  </div>
  )
}
