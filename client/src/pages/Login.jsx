import React from 'react'
import {Lock,Mail,User2Icon} from 'lucide-react'
import api from '../configs/api'
import { useDispatch } from 'react-redux'
import { login } from '../app/features/authSlice'
import toast from 'react-hot-toast'


const Login = () => {
    const dispatch=useDispatch()
   const query=new URLSearchParams(window.location.search)
   const urlstate=query.get('state')
    const [state, setState] = React.useState(urlstate || "login")

    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        password: ''
    })

 const handleSubmit = async (e) => {
    e.preventDefault()

    try {
        const payload =
            state === "login"
                ? {
                    email: formData.email,
                    password: formData.password
                  }
                : formData

        console.log(payload)

        const { data } = await api.post(`/api/users/${state}`, payload)

        dispatch(login(data))
        localStorage.setItem('token', data.token)
        toast.success(data.message)

    } catch (error) {
        toast(error?.response?.data?.message || error.message)
    }
}

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-50'>
      <form
            onSubmit={handleSubmit}
            className="sm:w-87.5 w-full text-center bg-white border border-gray-400 rounded-2xl px-8">
            <h1 className="text-black text-3xl mt-10 font-medium">
                {state === "login" ? "Login" : "Sign up"}
            </h1>

            <p className="text-gray-400 text-sm mt-2">Please {state} to continue</p>

            {state !== "login" && (
                <div className="flex items-center mt-6 w-full bg-gray-50 border border-gray-300 h-12 rounded-full overflow-hidden pl-6 gap-2 ">
                   <User2Icon size={16} color='#6B7280'/>
                    <input type="text" name="name" placeholder="Name" className="w-full bg-transparent text-white placeholder-gray-400 border-none outline-none " value={formData.name} onChange={handleChange} required />
                </div>
            )}

            <div className="flex items-center w-full mt-4 bg-gray-50 border border-gray-300 h-12 rounded-full overflow-hidden pl-6 gap-2 ">
               <Mail size={13} color='#6B7280'/>
                <input type="email" name="email" placeholder="Email id" className="w-full bg-transparent text-white placeholder-gray-400 border-none outline-none " value={formData.email} onChange={handleChange} required />
            </div>

            <div className=" flex items-center mt-4 w-full bg-gray-50 border border-gray-300 h-12 rounded-full overflow-hidden pl-6 gap-2 ">
                <Lock size={13} color='#6B7280'/>
                <input type="password" name="password" placeholder="Password" className="w-full bg-transparent text-white placeholder-gray-400 border-none outline-none" value={formData.password} onChange={handleChange} required />
            </div>

            <div className="mt-4 text-left">
                <button className="text-sm text-green-400 hover:underline">
                    Forget password?
                </button>
            </div>

            <button type="submit" className="mt-2 w-full h-11 rounded-full text-white bg-green-600 hover:bg-green-500 transition " >
                {state === "login" ? "Login" : "Sign up"}
            </button>

            <p onClick={() => setState(prev => prev === "login" ? "register" : "login") } className="text-gray-400 text-sm mt-3 mb-11 cursor-pointer" >
                {state === "login" ? "Don't have an account?" : "Already have an account?"}
                <span className="text-green-400 hover:underline ml-1">click here</span>
            </p>
        </form>
    </div>
  )
}

export default Login
